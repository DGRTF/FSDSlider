/*
    Модуль поиска точек входа js c последующим креплением к выходному HTML. Модуль для pug. Ищет все pug в заданном каталоге и задаёт js-точки входа с такими же именами.
    Например для страницы page.pug будет созданна точка входа page.js.

    Следовательно, для каждого pug-файла должен быть одноимённый файл js в этом же каталоге, в противном случае
    возможны ошибки сборки. 

    Во входном каталоге не должно быть файлов pug, не имеющих отношения к точкам входа.
    
    Основное использование:

        webpack.config.js
        
            const SearchEntry = require("./searchEntry.js");
            const merge = require('webpack-merge');

            let pagesPath = path.resolve(__dirname, "./src/pages");
            let searchEntry = new SearchEntry(pagesPath);

            module.exports ={
                entry: merge([searchEntry.entry, { index: './src/index.js' }]),
                
                output:{...},

                plugins: searchEntry.HWPluginObjectArr.concat([
                    new HtmlWebpackPlugin({
                        inject: true,
                        chunks: ['index'],
                        filename: 'index.html',
                        template: './src/index.pug',
                    }),
                    new webpack.ProvidePlugin({
                        $: 'jquery',
                        jQuery: 'jquery',
                        "window.jQuery": "jquery",
                    }),
                ]),

                module:{...},
            }
            
            В данном конфиге ,по пути "./src/pages" нет первой точки входа ({ index: './src/index.js' }), 
            поэтому она подключена отдельно.

            Свойство "searchEntry.entry" возвращает объект со всеми точками входа в виде свойств этого объекта,
            "searchEntry.HWPluginObjectArr" - массив объектов HtmlWebpackPlugin, в каждом из которых свойство 
            "chuncks" имеет значение одноимённой точки входа, например:

            new HtmlWebpackPlugin({
                        inject: true,
                        chunks: ['page'],
                        filename: 'page.html',
                        template: '....../page.pug',
                    }),

            Выходная директория для html по умолчанию: "pages/". Её можно переопределить ,задав второй 
            необязательный параметр, например:
                    
                    let pagesPath = path.resolve(__dirname, "./src/pages");
                    let searchEntry = new SearchEntry(pagesPath, "myPages/pages/");
                    Обязателен "/" в конце пути необязательного параметра.

            Что бы использовать "merge" установите плагин "webpack-merge" (npm i webpack-merge --save-dev).
            Вместо "merge" можно использовать Object.assign (читайте использование в офф документации).
            
    */


const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');



class SearchEntry {
    constructor(path, outPath = "pages/") {
        this.path = path;
        this.outPath = outPath;
        this.entryArr;
        this.HWPluginObjectArr = [];
        this.entry = {};
        if (path) {
            this._search();
        }
    }

    _search() {
        this.entryArr = this._searchPath(this.path);
        this._HWPluginObject();
        this._propertiesEntry();
    }

    _searchPath(p) {

        let jsArr = [];

        fs.readdirSync(p).map(el => {

            let file = fs.lstatSync(path.join(p, el)).isFile();
            if (file) {

                if (el.substr(el.length - 3) === "pug") {
                    let pathJ = path.join(p, el);

                    jsArr.push({
                        name: el.substr(0, el.length - 4),
                        pathJs: pathJ.substr(0, pathJ.length - 3) + "js",
                        pathPug: pathJ,
                    })

                }
            }
            else {
                let i = this._searchPath(path.join(p, el));
                jsArr = jsArr.concat(i);
            }
        })
        return jsArr;
    };

    _HWPluginObject() {
        this.entryArr.map(el => {
            this.HWPluginObjectArr.push(new HtmlWebpackPlugin({
                inject: true,
                chunks: [el.name],
                filename: this.outPath + el.name + ".html",
                template: el.pathPug,
            }));
        })
    };

    _propertiesEntry() {
        this.entryArr.map(el => {
            Object.assign(this.entry, { [el.name]: el.pathJs });
        })
    };
}

module.exports = SearchEntry;

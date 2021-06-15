// Конфигурационный файл, в котором описано как именно webpack будет собирать наш
// проект. Пока просто экспортируем из него объект с настройками:
// const webpack = require('webpack');
module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: './script',
    output: {
        filename: './build.js'
    },
    devServer: {
        // liveReload: false,
        liveReload: true,
        watchContentBase: true,
    },

}
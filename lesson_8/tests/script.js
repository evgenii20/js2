const pow = (a, n) => {
    // a –число
    // n – основание степени
    //проверка на пустоту
    if (a == null || n == null) {
        return null;
    }
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= a;
    }

    return result;
}

module.exports = {
    //  Функцию необходимо экспортировать из файла для работы с ней из других файлов, т.к. это серверный JS и особенность
    //  node.js
    pow: pow
}

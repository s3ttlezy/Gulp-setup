const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const webpHtml = require("gulp-webp-html");

// Обработка HTML
const html = () => {
   // Создаем файловый поток чтения, который потом можно будет передать дальше, делается это при помощи метода pipe
   // А поток записи уже передадим во втором методе dest
   return src(path.html.src)
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: "HTML",
            message: error.message
         }))
      }))
      .pipe(fileInclude()) // Это значит что теперь поток всех указанных файлов HTML будет сперва проходить через указанный нами плагин, а уже только потом записываться в директорию public
      .pipe(webpHtml())
      .pipe(size({ title: "До сжатия" }))
      .pipe(htmlmin(app.htmlmin))
      .pipe(size({ title: "После сжатия" }))
      .pipe(dest(path.html.dest))
   /* Метод src поддерживает специальные маски, по которым и будут искаться совпадения,
      например если нам нужно выбрать все файлы в определённой директории, то заменяем имя файла на звездочку
   Прим. - ./src/html/*.html, и расширения так же можно заменить на звездочку, если нам нужно получить все файлы,
      или в фигурных скобках перечислить нужные расширения через запятую - ./scr/html/*.{html, css}.
   Тоже самое касается и директорий ./src/{html, css}/*.{html, css};
   Для поиска всех файлов не только в текущей директории, но и во всех вложенных используется обозначение в виде **
   Прим. - .\src\**\*.* такая маска обозначет поиск всех файлов в директории src, вне зависимости от их вложенности.
   И в случае необходимости, можно указать не одну маску, а даже целый массив src([".\src\**\*.css", ".\src\**\*.js"]),
      при этом порядок обработки файлов будет строго соблюдаться. Кроме этого, благодаря массивам можно задавать и исключения,
      файлы, которые мы можем убрать из выборки, делается это при помощи символа "!" в начале маски.
   */
   
   // console.log("Обработка HTML");
   // sb(); Завершать действие задачи можно используя либо callback в функции, либо с помощью return
};

// Экспорт
module.exports = html;
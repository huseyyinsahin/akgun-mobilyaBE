"use strict";
//* UPLOAD
//' https://expressjs.com/en/resources/middleware/multer.html
//? $ npm i multer
//! multer nodule ile form-data verileri kabul edebiliriz yani dosya yükleme yapılabilir
// URL: /pizzas
const multer = require("multer"); //'projeye multeri dahil et
module.exports = multer({ //' dışa aktararak başla
  // dest: './uploads',
  storage: multer.diskStorage({ //'sunucu üzerinde diskte depolama yapacak
    destination: "./uploads", //'kayııt yapılacak hedef klasörü belirt
    filename: function (req, file, returnCallback) { //'her yüklenen dosya için dını belirlemek üzere yazılan bir fonksiyon req(istek),file  (dosya bilg içren obje),ve işlem tamamlandığında çağrılacak fonksiyon 3parametre.
      // returnCallback(error, filename) //'hata objesi ve dosya ismi
      // returnCallback(null, 'qadir.jpg') //'hata yoksa dosya adı qadir olacak
      // console.log(file) //'consolda dosya görüntüleme
      // returnCallback(null, file.originalname) //'orijinal adını koru
      returnCallback(null, Date.now() + "-" + file.originalname); //'hata yoksa orijinal adını koruyarak ve başına şuanki tarihi ekleyerek kaydedecek
    },
  }),
});
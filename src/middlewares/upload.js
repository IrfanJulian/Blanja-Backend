const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../upload')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
//     },
//     fileFilter: function (req, file, callback) {
//         var ext = path.extname(file.originalname);
//         if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//             return callback(new Error('Only images are allowed'))
//         }
//         callback(null, true)
//     }
//   })
  
//   const upload = multer({ storage: storage })

//   module.exports = upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '__dirname');
  },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    },
});

const upload = multer({
  limits: { fileSize: 10 * Math.pow(1024, 2 /* MBs*/) },
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image.jfif') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Just allowed png and jpg type'));
    }
  },
});

module.exports = upload;
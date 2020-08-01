const path = require('path')
const multer = require('multer')

const uploadPath = path.join('public', 'images')

const upload = multer({ dest: uploadPath })

module.exports = upload
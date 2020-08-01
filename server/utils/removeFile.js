const path = require('path')
const fs = require('fs')

const uploadPath = path.join('public', 'images')


module.exports = removeFile = filename => {
  return fs.unlink(path.join(uploadPath, filename), (err) => {
    if (err) throw err;
    console.log('File was deleted');
  })
}
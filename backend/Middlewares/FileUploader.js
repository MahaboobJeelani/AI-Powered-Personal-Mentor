const fsExtra = require('fs-extra')
const path = require('path')
const multer = require('multer')


const filePath = path.join(__dirname, '../uploads', 'profile')


const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        fsExtra.ensureDir(filePath)
            .then(() => { callback(null, filePath) })
            .catch(error => callback(error, filePath))
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('profile')

module.exports = upload
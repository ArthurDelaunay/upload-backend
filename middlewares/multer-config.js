const multer = require("multer")

const storageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/pictures")
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split("/")[1]
    const originalName = file.originalname.split(".")[0]
    const fileName = `${Date.now()}-${originalName}.${extension}`
    callback(null, fileName)
  },
})

module.exports = multer({
  storage: storageEngine,
})

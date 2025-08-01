import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original file name 
  }
})

const upload = multer({ storage: storage })

export { upload};   
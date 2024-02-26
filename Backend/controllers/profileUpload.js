import multer from 'multer';
import { db } from "../database.js"; 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./Uploads/profile_photos")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})
export const uploadFile = upload.single('file');

export const handleFileUpload  = async (req, res) => {
    try {
        console.log(req.file.path)
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        // Do something with the uploaded file, for example, save it to a database or process it further.
        // In this example, let's just respond with a success message.

        return res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

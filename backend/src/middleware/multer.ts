import multer from 'multer';
import path from 'path';


// Define the storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination for storing files
        cb(null, 'public/uploads'); // Save files to 'public/uploads' directory
    },
    filename: (req, file, cb) => {
        // Set the filename with a unique identifier
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Create the multer instance with the defined storage
const upload = multer({ storage });

export { upload };

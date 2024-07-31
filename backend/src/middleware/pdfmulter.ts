// pdfMulterConfig.js
import multer from 'multer';
import path from 'path';

// Define storage for resumes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/resumes'); // Directory for resumes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Filter to accept only PDF files
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed'), false);
//     }
// };

// const uploadPDF = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

const uploadPDF = multer({ storage })
export { uploadPDF };

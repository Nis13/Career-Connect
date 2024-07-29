import dotenv from "dotenv";

dotenv.config({path: __dirname + "/../.env"});

const cloudinary = require('cloudinary').v2;

const config = {
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiryMS: 6000,
        refreshTokenExpityMS: 180000,
    },
    database:{
        client: process.env.DB_CLIENT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
    cloudinary:{
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }
   
}

export default config;
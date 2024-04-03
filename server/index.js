import express from "express";
import bodyParser from "body-parser";//process the request body
//bcrypt = for password encryption
//gridfs-stream = for file upload 
//jsonwebtoken = for authentication 
import cors from "cors";//cross origin req
import mongoose from "mongoose"//mongodb access
import dotenv from "dotenv";//for environment variables
import multer from "multer";//uploaed our files locally 
import helmet from "helmet";//for req safety
import morgan from "morgan";// for login
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
 
// configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// file storage

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "public/assets");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Routes with Files
app.post("/auth/register", upload.single("picture"), register);
app.post("/auth/register", upload.single("picture"), register);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//Mongoose Setup
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(()=>{
    app.listen(6001, () => console.log(`Server Port: ${PORT}`));
}).catch((error)=>console.log(`${error} did not connect`));




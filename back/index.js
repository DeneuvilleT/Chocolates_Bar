import path from "path";
import cors from 'cors';
import express from 'express';
import router from './src/routes/index.js';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from "url";
import 'dotenv/config';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || process.env.SERVER_LOCAL_PORT;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public/images', express.static(__dirname + '/public/images/'));

app.use(router);


app.listen(PORT, () => {
   console.log(`Le serveur en ligne au http://localhost:${PORT}`);
});
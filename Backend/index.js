import express from 'express';
import cors from "cors";
import bodyParser from "body-parser"
import routes from "./routes/routes.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.static('Uploads'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

const __dirname = dirname(fileURLToPath(import.meta.url));

// Define the directory containing your static files (e.g., images)
const staticFilesDirectory = join(__dirname, 'Uploads', 'profile_photos');

// Serve static files from the specified directory
app.use('/uploads/profile_photos', express.static(staticFilesDirectory));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

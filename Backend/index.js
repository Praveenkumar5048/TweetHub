import express from 'express';
import cors from "cors";
import bodyParser from "body-parser"
import routes from "./routes/routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

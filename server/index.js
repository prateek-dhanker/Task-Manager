import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path';
import dotenv from 'dotenv'
import auth from './routes/auth.js'
import tasks from './routes/tasks.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT || 3000

dotenv.config({path:'./config.env'});
const dbURI = process.env.dbURI;

await mongoose.connect(dbURI , {
  useNewUrlParser : true,
  useUnifiedTopology : true
})
.then(()=> console.log("Mongo DB connecvted successfully"))
.catch(err => console.log("Mongo DB nopoo : ",err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'https://task-manager-1-185z.onrender.com',
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth' , auth);
app.use('/api/tasks' , tasks);

app.get('/', (req, res) => {
    res.send('hi');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
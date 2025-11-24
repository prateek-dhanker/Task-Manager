import express from 'express'
import multer  from 'multer'
import path  from 'path'
import fs  from 'fs'
import Task from '../models/tasks.js';
import User from '../models/users.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();


// Create a local uploads directory if not present
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: { files: 3 } // max 3 files
});

router.post('/add', upload.array('documents', 3), async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    const user = await User.findOne({ username: assignedTo });
    if (!user) return res.status(400).json({ message: 'Username not found' });
    
    
    // const count  = await Task.countDocuments({assignedTo:assignedTo,stutus: {$ne : "complete"}   });

    // console.log(count)
    // if(count > 10)
    //     return res.status(500).json({message : "Too many tasks allrady assigned to the user"});

    // Get uploaded file paths
    const documents = req.files?.map(file => file.path) || [];

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      documents
    });

    await newTask.save();
    return res.status(201).json({ message: 'Task created successfully', task: newTask });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to create task' });
  }
});



router.post('/delete', async(req,res) =>{
  const {title,assignedTo} = req.body;

  const task = await Task.findOne({title,assignedTo});
  if(!task)
    return res.status(400).json({ message: 'Title not found' });

  try{
    await Task.deleteOne({title,assignedTo});
    return res.status(200).json({ message: 'TAsk deleted successfully' });
  }
  catch(err){
    console.log(err);
    return res.status(400).json({ message: 'Cant delete' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'username'); // optional: populates user info
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

export default router;
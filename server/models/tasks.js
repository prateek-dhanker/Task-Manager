import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: String,
  status: String,
  priority: String,
  dueDate: Date,
  assignedTo: {type:String, required:true},
  documents: {type:[String], default:[]} 
});
taskSchema.index({title:1, assignedTo:1},{unique:true});

const Task = mongoose.model('Task', taskSchema);
export default Task;
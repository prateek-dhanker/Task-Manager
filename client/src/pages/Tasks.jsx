import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import axios from 'axios';

const Tasks = (props) => {
  let token = props.token;
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
    assignedTo: '',
    documents: []
  });
  const [oldData,setOldData] = useState({title:'',assignedTo:''});
  const [sortOption, setSortOption] = useState('dueDateAsc');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('${process.env.REACT_APP_API_URL}/api/tasks/all')
      .then(res => {
        if(token.admin)
          setTasks(res.data)
        else{
          const myTasks = res.data.filter(task => task.assignedTo === token.username);
          setTasks(myTasks);
        }
      })
      .catch(err => console.error(err));

  });
  useEffect(()=>{
    if(!token.admin)
        setFormData(prev => ({ ...prev, assignedTo: token.username }));
  },[formVisible]);

  const sortedTasks = useMemo(() => {
    const getPriorityValue = (priority) => {
      if (priority === 'High') return 3;
      if (priority === 'Medium') return 2;
      return 1;
    };

  let filtered = [...tasks];
  if (filterStatus !== 'All') {
    filtered = filtered.filter(task => task.status === filterStatus);
  }
  if (filterPriority !== 'All') {
    filtered = filtered.filter(task => task.priority === filterPriority);
  }

  switch (sortOption) {
    case 'dueDateAsc':
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      break;
    case 'dueDateDesc':
      filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      break;
    case 'priority':
      filtered.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
      break;
    case 'status':
      filtered.sort((a, b) => a.status.localeCompare(b.status));
      break;
    default:
      break;
  }

  return filtered;
  }, [filterPriority,filterStatus,sortOption, tasks]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(formData.id){
      try {
        const res = await axios.post('${process.env.REACT_APP_API_URL}/api/tasks/delete', {title:oldData.title,assignedTo:oldData.assignedTo});
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Task Addition failed';
        alert(errorMsg);
      }   
    }
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('status', formData.status);
    form.append('priority', formData.priority);
    form.append('dueDate', formData.dueDate);
    form.append('assignedTo', formData.assignedTo);

    // Append up to 3 documents
    if (formData.documents && formData.documents.length > 0) {
      formData.documents.slice(0, 3).forEach((file) => {
        form.append('documents', file);
      });
    }
    try {
      const res = await axios.post('${process.env.REACT_APP_API_URL}/api/tasks/add', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
      alert('Task added successfully');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Task Addition failed';
      alert(errorMsg);
    }      

    setFormData({
      id: null,
      title: '',
      description: '',
      status: 'Pending',
      priority: 'Medium',
      dueDate: '',
      assignedTo: '',
      documents:[]
    });
    setFormVisible(false);
  };

  const handleEdit = (task) => {
    task.id = 1;
    setFormData(task);
    setFormVisible(true);
    if(token.admin)
      setOldData({title:task.title, assignedTo:task.assignedTo})
    else 
      setOldData({title:task.title, assignedTo:token.username})
  };

  const handleDelete = async(title,assignedTo) => {
    try {
      if(confirm("wanna delete")){
        const res = await axios.post('${process.env.REACT_APP_API_URL}/api/tasks/delete', {title, assignedTo });    
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Delete failed';
      alert(errorMsg);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 min-w-175">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => {
            setFormData({
              id: null,
              title: '',
              description: '',
              status: 'Pending',
              priority: 'Medium',
              dueDate: '',
              assignedTo: '',
              documents : []
            });
            if(formVisible)
                setFormVisible(false);
            else
                setFormVisible(true);
          }}
        >
          + Add Task
        </button>
        <select
          className="bg-gray-700 text-white px-4 py-2 rounded ml-4"
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="dueDateAsc">Due Date ↑</option>
          <option value="dueDateDesc">Due Date ↓</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
        <select
          className="bg-gray-700 text-white px-4 py-2 rounded ml-4"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          className="bg-gray-700 text-white px-4 py-2 rounded ml-4"
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>


      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-xl mb-6 space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 bg-gray-700 rounded"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 bg-gray-700 rounded"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              className="p-2 bg-gray-700 rounded"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select
              className="p-2 bg-gray-700 rounded"
              value={formData.priority}
              onChange={e => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <input
            type="date"
            className="w-full p-2 bg-gray-700 rounded"
            value={formData.dueDate}
            onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
          />
          {token.admin ?
              <input
                type="text"
                placeholder="Assigned To"
                className="w-full p-2 bg-gray-700 rounded"
                value={formData.assignedTo}
                onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
              />
            : <input
                type="text"
                placeholder={token.username}
                className="w-full p-2 bg-gray-700 rounded"
                value={formData.assignedTo}
                readOnly
              />
          }
          <input
            type="file"
            className="cursor-pointer w-full p-2 bg-gray-700 rounded text-white"
            accept="application/pdf"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files).slice(0, 3); // limit to 3 PDFs
              setFormData({ ...formData, documents: files });
            }}
          />
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white cursor-pointer">
            {formData.id ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      )}

      <div id="all-tasks" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-90 gap-y-0 w-full">
        {sortedTasks.map(task => (
          <div key={task.id} className="m-4 bg-gray-800 p-6 rounded-xl shadow-lg min-w-[250px]">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Due:</strong> {task.dueDate}</p>
            <p><strong>Assigned:</strong> {task.assignedTo}</p>
            <div className="mt-4 flex gap-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-sm rounded hover:bg-yellow-600"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-sm rounded hover:bg-red-700"
                onClick={() => handleDelete(task.title, task.assignedTo)}
              >
                Delete
              </button>
            </div>
            {task.documents && task.documents.length > 0 && (
              <div className="mt-3">
                <strong>Documents:</strong>
                <ul className="list-disc ml-6 text-blue-400">
                  {task.documents.map((doc, index) => {
                    const pathIndex = doc.indexOf("uploads");
                    const relativePath = doc.substring(pathIndex);
                    
                    return (
                      <li key={index}>
                        <a
                          href={`http://localhost:3000.com/${relativePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          PDF {index + 1}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

        ))}
      </div>
    </div>
  );
};

export default Tasks;

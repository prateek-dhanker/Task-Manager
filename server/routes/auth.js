import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/users.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, admin, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Enter username and password' });
    }

    const olduser = await User.findOne({ username });
    if (olduser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({ username, admin, password });
    await user.save();

    // Simulate token response
    const token = jwt.sign(
        {username: username, admin: admin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/edit', async (req, res) => {
  try {
    const { username, newUsername, admin } = req.body;

    if (!username || !newUsername) {
      return res.status(400).json({ message: 'Enter username' });
    }

    await User.updateOne({ username: username }, { $set: { username: newUsername } });

    // Simulate token response
    const token = jwt.sign(
        {username: newUsername, admin: admin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login' , async(req , res) =>{
    const {username , password} = req.body;
    const user = await User.findOne({username});
    if(!user)
        return res.status(400).json({ message: 'UserId not found' });

    else{

        user.comparePassword(password , (err,isMatch)=>{
            if(isMatch){
                const token = jwt.sign(
                    {username: username, admin: user.admin },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                return res.status(201).json({ token });
            }
            else{
                return res.status(400).json({ message: 'Password doesnt match' });
            }
        })
    }
});

router.post('/delete' , async(req , res) =>{
    const {username} = req.body;
    const user = await User.findOne({username});
    if(!user)
        return res.status(400).json({ message: 'UserId not found' });

    try{
        await User.deleteOne({username});
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ message: 'Cant delete' });
    }
})

router.get('/all', async (req, res) => {
  try {
    const users = await User.find().populate();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});


export default router;
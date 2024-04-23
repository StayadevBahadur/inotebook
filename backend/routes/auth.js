const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const usser = require('../models/User')
const { body, validationResult } = require('express-validator');
const { check } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fethUser")

const JWT_SECRET = 'SatyadevIs#Savage';

// create user using Post "api/auth" whatever end ponit you are declearing here is your endpoint
router.post('/CreateUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isLength({ min: 5 }),
  body('password', 'Enter a valid Password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check whethere the user with this email exists already 
  let email = await usser.findOne({ email: req.body.email });
  if (email) {
    return res.status(404).json({success:false, error: "Sorry a user with this email aleready exists" })
  }
  const salt = await bcrypt.genSaltSync(10);
  const SecPass = await bcrypt.hash(req.body.password, salt);
  usser.create({
    name: req.body.name,
    email: req.body.email,
    password: SecPass,
  }).then(usser => res.json({success:true, authToken }));
  const data = {
    usser: {
      id: usser.id
    }
  }
  // .catch((error)=>{
  //   console.log(error);
  //   res.json({error:"Please enter a valid email"})
  // })

  const authToken = jwt.sign(data, JWT_SECRET);

})


// Authenticate  a user using POST "api/auth/login",
router.post('/login', [
  body('email', 'Enter a valid email for login').isEmail({ min: 3 }),
  body('password', 'Enter a valid name').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let userEmail = await usser.findOne({ email });

    console.log(userEmail)
    if (!userEmail) {
      return res.status(400).json({ error: "invalid credentail", success : false })
    }
    const passwordCompa = bcrypt.compareSync(password, userEmail.password);

    if (!passwordCompa) {
      return res.status(400).json({ error: "invalid credentail", success : false })
    }

    const payload = {
      usser: {
        id: userEmail.id
      }
    }

    const authToken = jwt.sign(payload, JWT_SECRET);
    const success = true;
    res.json({success, authToken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
    
  }
})
// Route 3: Get loged in user deatail POST "api/auth/GetUserDeatail", Login required
router.post('/GetUserData', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);
    const user = await usser.findById(userId).select("-password")
    // there is anothter way of doing this
    // const user = await usser.findOne({ _id: userId }).select("-password")
    console.log(user)
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})
module.exports = router
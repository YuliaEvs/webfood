const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function create(req, res) {
  try {
    console.log(req.body);
    // Add the user to the db
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can res.json to send back just a string
     // The client code needs to take this into consideration
    res.status(200).json(token);
  } catch (error) {
    // Probably a dup email
    res.status(400).json({ msg: error.message});
  }
}

/* Helper Functions */

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

function checkToken(req, res) {
  //req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function logIn(req, res) {
  try {
    // Find the user by their email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    // Check if the password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    //   if (!match) throw new Error();
    //   res.status(200).json( createJWT(user) );
   // } 
     if (match) {
      const token = createJWT(user);
      console.log(token);
      res.json(token);
     } 
  } catch(error) {
    console.log(error);
    res.status(400).json({ msg: error.message, reason: 'Bad Credentials' });
    }
  }


module.exports = {
  create,
  logIn,
  checkToken,
};
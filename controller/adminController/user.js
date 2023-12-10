const bcrypt = require('bcrypt');
const User = require('../../models/user');

//////////////register\\\\\\\\\\\\\\\\\
const registerUserCntrl =  async (req,res) => {
    try {
      if(!req.body) throw Error('Request body is empty');
      if(!req.body.name &&
         !req.body.password) throw Error('Request body is empty');

      const {
            name,
            password,
           } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        password:hashedPassword
    });
    const savedUserToDb = await newUser.save();

    if(!savedUserToDb) throw Error('Not able to save user, please try again later');
    res.status(200).send({
        message: "successFully registered the user"
    });
    } catch (error) {
        
        res.status(500).send({
             error: error.message, 
        });
    }
}


//////////////login\\\\\\\\\\\\\\\\\
const loginUserCntrl =  async (req,res) => {
    try {
      if(!req.body) throw Error('Request body is empty');
      if(!req.body.name && 
         !req.body.password) throw Error('Request body is empty');

      const {
            name,
            password,
           } = req.body;
    const userByEmail = await User.findOne({ name: name});
    if(!userByEmail) throw Error('user with the Given mail not found');
    const hashedPassword = await  bcrypt.compare(password, userByEmail.password)

    if(!hashedPassword) throw Error('Given password is incorrect, please try again later');
    res.status(200).send({
        message: "authentication is successfull"
    });
    } catch (error) {
        
        res.status(500).send({
             error: error.message, 
        });
    }
}



const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();
        if(!user) throw new Error('users not found');
        res.status(200).send({
            message: user
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

module.exports = {
   registerUserCntrl,
   loginUserCntrl,
   getAllUser
}

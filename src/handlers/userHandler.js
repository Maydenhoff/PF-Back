const { getUser } = require("../controllers/UserController/getUser");
const { getUSerByID } = require("../controllers/UserController/getUserById");
const { postUser } = require("../controllers/UserController/postUser");
const {deleteUser}= require("../controllers/UserController/deleteUser")
require("dotenv").config();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");


//Generar el TOKEN
function generateToken(user) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }


const postUserHandler = async (req, res) => {
    try {
        const user = await postUser(req.body);
        // Generar un token JWT para el usuario
        const token = generateToken(user);

        res.status(201).json({ message: `User Created: ${user.name}`, token });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUserHandler = async(req, res) => {
    try {
        const allUser = await getUser()
        res.status(200).json(allUser)
    } catch (error) {
        res.status(400).json({error: error.message})      
    }
}

const getUserByIDHandler = async(req, res) => {
    try {
        const userById = await getUSerByID(req.params)
        res.status(200).json(userById)
    } catch (error) {
        res.status(400).json({error: error.message})    
    }
}
const deleteUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);

        res.status(200).send("User  has deleted💥💥")
    } catch (error) {
        res.status(400).json({error: error.message})   
    }
}


module.exports = {
    postUserHandler,
    getUserHandler,
    getUserByIDHandler,
    deleteUserHandler
}
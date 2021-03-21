const router = require('express').Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Model = require("./auth-model")
const uniqueUsername = require("../middleware/uniqueUsername")
const validateCredentials = require("../middleware/validateCredentials")

router.post('/register', uniqueUsername, async (req, res, next) => {
  res.end('implement register, please!');
	try {
		const { username, password } = req.body

		if(!username || !password){
			return res.status(400).json({
				message: "username and password required"
			})
		} else {
			const newUser = await Model.add({
				username,
				password: await bcrypt.hash(password, 5)
			})
			return res.status(201).json(newUser)
		}
	} catch(err) {
		next(err)
	}
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', validateCredentials, async (req, res, next) => {
  res.end('implement login, please!');

	try{
		const { username, password } = req.body

		if (!username || !password){
			return res.status(400).json({
				message: "username and password required"
			})
		}

		const user = await Model.findBy(username)

		const checkPassword = await bcrypt.compare(password, user ? user.password : "")

		if(!user || !checkPassword){
			return res.status(401).json({
				message: "invalid credentials"
			})
		}
		res.status(200).json({
			message: `welcome, ${username}`,
			token: token
		})

		const token = jwt.sign({
			subject: user.id,
			username: user.username,
		}, "keep it secret keep it safe", {expiresIn: "1d"})

	} catch(err){
		next(err)
	}
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;

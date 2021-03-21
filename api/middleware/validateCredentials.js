const Model = require("../auth/auth-model")

const validateCredentials = async (req, res, next) => {
	try{
		const { username } = req.body

		const checkName = await Model.findBy(username)

		if (checkName.length === 0){
			res.status(401).json({
				message: "invalid credentials"
			})
		}

		next()
	} catch(err){
		next(err)
	}
}

module.exports = validateCredentials
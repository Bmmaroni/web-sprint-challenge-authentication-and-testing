const Model = require("../auth/auth-model")

const uniqueUsername = async (req, res, next) => {
	try {
		const { username } = req.body
		if (!username){
			return res.status(400).json({
				message: "username required"
			})
		}
		const checkName = await Model.findBy({ username })
		if (checkName.length !== 0){
			return res.status(401).json({
				message: "username taken"
			})
		} else {
			next()
		}
	} catch(err){
		next(err)
	}
	
}

module.exports = uniqueUsername
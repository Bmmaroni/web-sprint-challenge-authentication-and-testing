const Model = require("../auth/auth-model")

const uniqueUsername = async (req, res, next) => {
	const { username } = req.body
	const checkName = await Model.findBy(username)
	if(checkName.length !== 0){
		return res.status(401).json({
			message: "username taken"
		})
	}
	next()
}

module.exports = uniqueUsername
const db = require("../../data/dbConfig")

async function uniqueUsername(req, res, next){
	const { username } = req.body
	const checkName = await function(username){
		db("users")
		.select("*")
		.where(username)
	}
	if(!checkName.length === 0){
		return res.status(404).json({
			message: "username taken"
		})
	}
}

module.exports = uniqueUsername
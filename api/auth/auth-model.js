const db = require("../../data/dbConfig")

function find(){
	return db("users")
		.select("id", "username", "password")
}

function findBy(filter){
	console.log(filter)
	return db("users")
		.select("*")
		.where(filter)
}

function findById(id){
	return db("users")
		.select("*")
		.where({ id })
		.first()
}

async function add(user){
	const [id] = await db("users").insert(user)
	return findById(id)
}

module.exports = {
	find,
	findBy,
	findById,
	add,
}
 const { json } = require("express")
const jwt = require("jsonwebtoken") 
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
const restricted = async (req, res, next) => {
	try {
		const token = req.cookies.token
		if (!token){
			res.status(401).json({
				message: "token required"
			})
		}

		jwt.verify(token, "keep it secret keep it safe", (err, decoded) => {
			if (err){
				res.status(401).json({
					message: "token invalid"
				})
			}

			req.token = decoded
			next()
		})
	} catch(err) {
		next(err)
	}
}

module.exports = restricted
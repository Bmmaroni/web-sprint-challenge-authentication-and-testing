const supertest = require("supertest")
const server = require("./server")
const db = require("../data/dbConfig")

test('sanity', () => {
  expect(true).not.toBe(false)
})

beforeEach(async () => {
	await db.seed.run()
})

beforeAll(async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
})

afterAll(async () => {
	await db.destroy()
})

describe("auth integration tests", () => {
	it("creates a new user", async () => {
		const res = await supertest(server)
			.post("/api/auth/register")
			.send({
				username: "Bill",
				password: "abc123"
			})
		const users = await db("users")
		expect(res.statusCode).toBe(201)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.body.username).toBe("Bill")
		expect(users).toHaveLength(2)
	})

	it("won't duplicate a user", async () => {
		const res = await supertest(server)
			.post("/api/auth/register")
			.send({
				username: "John",
				password: "abc123"
			})
		expect(res.body.message).toBe("username taken")
	})

	it.only("successfully logins user", async () => {
		const res = await supertest(server)
			.post("/api/auth/login")
			.send({
				username: "John",
				password: "abc123"
			})
		expect(res.statusCode).toBe(200)
	})
})
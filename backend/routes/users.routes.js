const router = require("express").Router();
const { User, validate } = require("../models/user.model");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth.middleware");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user) return res.status(409).send({ message: "User with given email already exists!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});
// New route for getting user profile (protected, any authenticated user)
router.get("/profile", auth(), async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	res.send(user);
});

// New route for teacher-only action (create a course)
router.post("/courses", auth("teacher"), async (req, res) => {
	// Logic for creating a course
	res.send("Course created successfully");
});

module.exports = router;

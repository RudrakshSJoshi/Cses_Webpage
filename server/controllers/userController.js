/** @format */

const User = require("../models/user");
const { generateToken } = require("../config/generateToken");
const { encrypt, comparePassword } = require("../config/Password");

const registerController = async (req, res) => {
	User.init()
		.then(async () => {
			const user = new User(req.body);
			const result = await user.save();
			res.json(result);
		})
		.catch((err) => {
			res.status(400).json(err.message);
		});
};

const loginController = async (req, res) => {
	const { adm_no, password, category } = req.body;
	if (!adm_no || !password || !category) {
		return res
			.status(400)
			.send({ status: 400, message: "All required inputs not given." });
	}

	const savedUser = await User.findOne({
		adm_no: adm_no,
	});
	if (!savedUser) {
		return res.status(401).send({
			status: 401,
			message: "Incorrect Credentials.",
		});
	}

	const passMacthed = await comparePassword(password, savedUser.password);

	if (!passMacthed) {
		return res.status(401).send({
			status: 401,
			message: "Password not matched.",
		});
	}
	res.status(200).json({
		status: 200,
		adm_no: savedUser.adm_no,
		name: savedUser.name,
		category: savedUser.category,
		grad_year: savedUser.grad_year,
		token: generateToken(savedUser._id),
	});
};

const changePasswordController = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	// console.log(req.body)
	if (!oldPassword || !newPassword) {
		return res
			.status(400)
			.send({ status: 400, message: "All required inputs not given." });
	}

	try {
		const passMacthed = await comparePassword(
			oldPassword,
			req.user.password
		);

		if (!passMacthed) {
			console.log("old password is incorrect");
			return res
				.status(401)
				.send({ status: 401, message: "Old password is incorrect." });
		}
		// console.log(newPassword)
		const hashedPassword = await encrypt(newPassword);
		// console.log(hashedPassword)
		const result = await comparePassword("pa", hashedPassword);
		// console.log(req.user)

		const user = await User.findByIdAndUpdate(req.user._id, {
			password: hashedPassword,
		});
		// console.log(user)
		res.status(200).json({
			status: 200,
			message: "Password changed successfully.",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 500,
			message: "Internal Server Error",
			error,
		});
	}
};

const getUserController = async (req, res) => {
	try {
		const user_id = req.user._id;
		const user = await User.findById(user_id).select(
			"-password -_id -timeStamp -__v"
		);
		res.json(user);
	} catch (error) {
		res.status(500).json({ status: 500, error });
	}
};

module.exports = {
	registerController,
	loginController,
	changePasswordController,
	getUserController,
};

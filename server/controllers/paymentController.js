/** @format */

const Payment = require("../models/payment");
const razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const instance = new razorpay({
	key_id: process.env.KEY,
	key_secret: process.env.SECRET,
});

const checkoutController = async (req, res) => {
	const { amount, year } = req.body;
	const user_id = req.user._id;
	const payment = await Payment.findOne({ user_id, year});
	const pendingPayment = await Payment.findOne({ user_id, year, status: "pending" }); 
	try {

		if (req.user.category === 'CSES' && (payment && payment.status === "success")) {
			return res
				.status(400)
				.json({ success: false, message: "Payment already done" });
		} else if (pendingPayment) {
			const order = await instance.orders.fetch(
				pendingPayment.razorpay_order_id
			);
			res.status(200).json({
				success: true,
				order,
			});
		} else {
			const options = {
				amount: amount * 100,
				currency: "INR",
			};
			const order = await instance.orders.create(options);
			await Payment.create({
				user_id,
				year,
				amount,
				razorpay_order_id: order.id,
			});
			res.status(200).json({
				success: true,
				order,
			});
		}
	} catch (err) {
		console.error("error", err);
		res.status(500).json({
			success: false,
			message: "Server Error",
			error: err,
		});
	}
};

const paymentVerifyController = async (req, res) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
		req.body;
	const client = req.headers.origin;
	const body = razorpay_order_id + "|" + razorpay_payment_id;
	const expectedValue = crypto
		.createHmac("sha256", process.env.SECRET)
		.update(body.toString())
		.digest("hex");

	const isValid = expectedValue === razorpay_signature;
	const { amount } = await Payment.findOne({ razorpay_order_id }).select(
		"amount"
	);
	if (isValid) {
		const payment = await Payment.findOneAndUpdate(
			{ razorpay_order_id },
			{
				status: "success",
				razorpay_payment_id: razorpay_payment_id,
				razorpay_signature: razorpay_signature,
				payment_date: new Date(),
			}
		);
		console.log("verified");
		console.log("new payment received", payment);
		res.redirect(
			`${client}/payment_success?transactionId=${razorpay_payment_id}&amount=${amount}`
		);
	} else {
		console.log("failed");
		res.redirect(
			`${client}/payment_failure?transactionId=${razorpay_payment_id}&amount=${amount}`
		);
		res.status(400).json({ success: false });
	}
};

const getAllPayments = async (req, res) => {
	console.log("No req.body", req.body);
	const user_id = req.user._id;
	console.log("No user Id", user_id);
	try {
		const allPayments = await Payment.find({ user_id });
		console.log("No all payments", allPayments);
		return res.status(200).json({ success: true, allPayments });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, error });
	}
};

module.exports = {
	checkoutController,
	paymentVerifyController,
	getAllPayments,
};

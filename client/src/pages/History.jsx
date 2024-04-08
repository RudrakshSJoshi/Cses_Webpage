/** @format */

import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

// const orders = [
// 	{
// 		productName: "JavaScript Tutorial",
// 		productNumber: "85743",
// 		paymentStatus: "Due",
// 		status: "Pending",
// 	},
// 	{
// 		productName: "CSS Full Course",
// 		productNumber: "97245",
// 		paymentStatus: "Refunded",
// 		status: "Declined",
// 	},
// 	{
// 		productName: "Flex-Box Tutorial",
// 		productNumber: "36452",
// 		paymentStatus: "Paid",
// 		status: "Active",
// 	},
// ];

const History = () => {
	const [allPayments, setAllPayments] = useState([]);
	const getPayment = async () => {
		const res = await axiosInstance.get("getAllPayments");
		console.log(res);
		setAllPayments(...allPayments, res.data.allPayments);
	};
	useEffect(() => {
		getPayment();
	}, []);

	return (
		<div>
			<h1>History</h1>
			<div className="recent-orders">
				<h2>Payment History</h2>
				<table className="box">
					<thead>
						<tr>
							<th>Transaction Id</th>
							<th>Year</th>
							<th>Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{allPayments.map((order, index) => (
							<tr key={index}>
								<td>{order.razorpay_order_id}</td>
								<td>{order.year}</td>
								<td>{order.amount}</td>
								<td>{order.status}</td>
								<td className="primary">Details</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* <a href="#">Show All</a> */}
			</div>
		</div>
	);
};

export default History;

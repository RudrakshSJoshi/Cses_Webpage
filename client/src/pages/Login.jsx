/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useAuth } from "../provider/authProvider";
import { useUser } from "../provider/userProvider";
import { useAlert } from "../provider/useAlert";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";

const Login = () => {
	const { setToken } = useAuth();
	const { updateUser } = useUser();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		adm_no: "",
		category: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	function formSubmit(event) {
		event.preventDefault();
		axiosInstance
			.post("users/login", {
				adm_no: formData.adm_no,
				password: formData.password,
				category: formData.category,
			})
			.then((res) => {
				console.log(res);
				setToken(res.data.token);
				updateUser(res.data);
				showAlert("Login successfully!", "success");
				navigate("/", { replace: true });
			})
			.catch((err) => {
				console.log(err);
				if (!err.response.data || !err.response.data.message) {
					showAlert("Server Error!", "error");
				}
				showAlert(err.response.data.message, "error");
			});
	}

	return (
		<div className="login">
			<form onSubmit={formSubmit}>
				<h1>Login</h1>
				<label htmlFor="username">Admission Number</label>
				<input
					onChange={(e) => {
						setFormData({
							...formData,
							adm_no: e.target.value.toLowerCase(),
						});
					}}
					type="text"
					id="username"
					value={formData.adm_no}
				/>

				<label htmlFor="category">Category</label>
				<select
					id="category"
					required
					onChange={(e) =>
						setFormData({ ...formData, category: e.target.value })
					}
					value={formData.category}
				>
					<option value="">---Select Category---</option>
					<option value="CSES">CSES</option>
					<option value="ALUMNI">ALUMNI</option>
				</select>

				<label htmlFor="password">Password</label>
				<input
					type={showPassword ? "text" : "password"}
					value={formData.password}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
				/>

				<FormControlLabel
					control={
						<Checkbox
							onClick={() => setShowPassword(!showPassword)}
						/>
					}
					label="Show Password"
				/>

				<input type="submit" value="Login" />
			</form>
		</div>
	);
};

export default Login;

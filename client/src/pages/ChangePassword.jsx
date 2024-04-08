import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../provider/useAlert'
import {Checkbox, FormControlLabel} from "@mui/material";

const ChangePassword = () => {
	const navigate = useNavigate()
	const showAlert = useAlert()

	const [showPassword, setShowPassword] = useState(false)
	const [selectedOption, setSelectedOption] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	})
	const handleSubmit = (e) => {
		e.preventDefault()
		if (selectedOption.newPassword !== selectedOption.confirmPassword) {
			showAlert("New and confirm password doesn't match", 'info')
			return;
		}
		if (selectedOption.newPassword === selectedOption.oldPassword) {
			showAlert("New and old password is same", 'info')
			return;
		}
		axiosInstance
			.put('/users/change_pass', selectedOption)
			.then((res) => {
				console.log(res)
				navigate('/', { replace: true })
				showAlert('Password changed successfully!', 'success');
			})
			.catch((err) => {
				console.log(err)
				if (!err.response.data || !err.response.data.message) {
					showAlert('Server Error!', 'error')
				}
				showAlert(err.response.data.message, 'error');
			})
	}
	return (
		<div>
			<h1>Change Password</h1>
			<div className='recent-orders'>
				<h2>Change Your Password</h2>
				<form className='reminders box' onSubmit={handleSubmit}>
					<label htmlFor='old'>Old Password</label>
					<input
						type={showPassword ? 'text' : 'password'}
						id='old'
						value={selectedOption.oldPassword}
						onChange={(e) =>
							setSelectedOption({
								...selectedOption,
								oldPassword: e.target.value
							})
						}
					/>
					<label htmlFor='new'>New Password</label>
					<input
						type={showPassword ? 'text' : 'password'}
						id='new'
						value={selectedOption.newPassword}
						onChange={(e) => {
							setSelectedOption({
								...selectedOption,
								newPassword: e.target.value
							})
						}}
					/>
					<label htmlFor='confirm'>Confirm Password</label>
					<input
						type={showPassword ? 'text' : 'password'}
						id='confirm'
						value={selectedOption.confirmPassword}
						onChange={(e) =>
							setSelectedOption({
								...selectedOption,
								confirmPassword: e.target.value
							})
						}
					/>
					<FormControlLabel
						control={
							<Checkbox
								onClick={() => setShowPassword(!showPassword)}
							/>
						}
						label="Show All Passwords"
					/>
					<input type='submit' value='submit'/>
				</form>
			</div>
		</div>
	)
}

export default ChangePassword

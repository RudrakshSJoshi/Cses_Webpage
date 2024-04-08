import React, { useState, useEffect } from "react";
import prof1 from "../images/profile-1.jpg";
import { useUser } from "../provider/userProvider";
import open from "../images/hamburger.png"

const Navbar = ({ openSideMenu }) => {
	const [darkMode, setDarkMode] = useState(localStorage.getItem("mode") === "true");
	useEffect(() => {
		if (darkMode) {
			document.body.classList.toggle("dark-mode-variables", darkMode);
		}
	});
	const { userData } = useUser();
	return (
		<div className="nav">
			<button id="menu-btn" onClick={openSideMenu}><img style={{height:"30px"}} src={open} alt="hamburger" /></button>

			<div className="dark-mode" onClick={() => {
				document.body.classList.toggle("dark-mode-variables", !darkMode);
				localStorage.setItem("mode", !darkMode);
				setDarkMode(!darkMode);
			}}>
				<span className={`material-icons-sharp ${darkMode ? '' : 'active'}`}></span>
				<span className={`material-icons-sharp ${darkMode ? 'active' : ''}`}></span>
			</div>
			<div className="profile">
				<div className="info">
					<p>
						Welcome, <b>{userData.adm_no || 'Loading...'}</b>
					</p>
					<small className="text-muted">{userData.category || 'Not Initialisd'}</small> {/* Displaying status */}
				</div>
				<div className="profile-photo">
					<img alt="profile-1" src={prof1} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;

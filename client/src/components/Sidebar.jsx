
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import logo from "../images/logo.png";
import close from "../images/close.png";

const Sidebar = ({ isSideMenuOpen, closeSideMenu }) => {
	const navigate = useNavigate();
	const { setToken } = useAuth();
	function handleLogout() {
		setToken();
		navigate("/", { replace: true });
	}
	const items = [
		{ path: "", name: "Dashboard" },
		{ path: "/payment", name: "Payment" },
		{ path: "/history", name: "History" },
		{ path: "/change_pass", name: "Change Password" },
	];
	return (
		<aside style={{ display: isSideMenuOpen ? "block" : "none" }}>
			<div className="toggle">
				<div className="logo">
					<img alt="" src={logo} />
					<h2>
						CSE<span className="danger">SOCIETY</span>
					</h2>
				</div>
				<div className="close" id="close-btn" onClick={closeSideMenu}>
					<span className="material-icons-sharp"><img style={{height:"17px"}} src={close} alt="close" /></span>
				</div>
			</div>
			<div className="sidebar">
				{items.map((item, index) => (
					<NavLink
						to={item.path}
						key={index}
						className="sb-item"
						activeclassname="active"
					>
						{/* for icon */}
						<span className="material-icons-sharp"></span>
						<h3>{item.name}</h3>
					</NavLink>
				))}
				<div className="sb-item" onClick={handleLogout}>
					<span className="material-icons-sharp"></span>
					<h3>Logout</h3>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;

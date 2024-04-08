import React from "react";

const Reminders = () => {
	return (
		<div className="reminders">
			<div className="header">
				<h2>Our Newsletter</h2>
				<span className="material-icons-sharp"></span>
			</div>

			<div className="notification">
				<div className="icon">
					<span className="material-icons-sharp"></span>
				</div>
				<div className="content">
					<div className="info">
						<h3>CSES Launch!!</h3>
						<small className="text_muted">Launching SOON...</small>
					</div>
					<span className="material-icons-sharp"></span>
				</div>
			</div>

			<div className="notification deactive">
				<div className="icon">
					<span className="material-icons-sharp"></span>
				</div>
				<div className="content">
					<div className="info">
						<h3>CSES WebWizards!!!</h3>
						<small className="text_muted">Arriving SOON...</small>
					</div>
					<span className="material-icons-sharp"></span>
				</div>
			</div>

			<div className="notification add-reminder hello">
				<div>
					<span className="material-icons-sharp"></span>
					<h3>View More...</h3>
				</div>
			</div>
		</div>
	);
};

export default Reminders;

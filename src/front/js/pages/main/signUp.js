import React, { useContext, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [fields, handleFieldChange] = useState({
		name: "",
		last_name: "",
		username: "",
		phone_number: "",
		email: "",
		password: ""
	});
	const history = useHistory();
	async function handleSubmit(event) {
		event.preventDefault();
	}

	return (
		<div className="text-center">
			<h2>
				Welcome and thank you for choosing us!
				<br />
				Sign up so you can enjoy of our benefits <i className="far fa-thumbs-up" />
			</h2>
			<form className="mx-1 my-2" onSubmit={handleSubmit}>
				<div className="form-group mb-2">
					<input
						type="datetime"
						className="form-control"
						placeholder="First Name"
						onChange={handleFieldChange}
						value={fields.name}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Last Name"
						onChange={handleFieldChange}
						value={fields.last_name}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Phone Number"
						onChange={handleFieldChange}
						value={fields.phone_number}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Email"
						onChange={handleFieldChange}
						value={fields.email}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Username"
						onChange={handleFieldChange}
						value={fields.username}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						onChange={handleFieldChange}
						value={fields.password}
					/>
				</div>
			</form>
			<div>
				<Link to="/">
					<button type="button" className="btn btn-danger my-4 mx-2" value="Sign up">
						Cancel
					</button>
				</Link>
				{/* <Link to="/"> */}
				<button
					onClick={() => history.push("/")}
					type="submit"
					className="btn btn-info my-4 mx-2"
					value="Sign up">
					Submit
				</button>
				{/* </Link> */}
			</div>
		</div>
	);
};

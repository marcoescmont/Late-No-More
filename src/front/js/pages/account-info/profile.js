import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">Username</span> <br /> <span className="pr-5">Role</span>
						</h4>
						<h3 className="mx-2 my-2 font-weight-bold">
							Update
							<br />
							Information
						</h3>
					</div>
					<div className="d-flex flex-column mr-auto">
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Username</span>{" "}
							<input className="ml-4 form-control" type="text" />
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">First name</span>{" "}
							<input className="ml-4 form-control" type="text" />
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Last name</span>{" "}
							<input className="ml-4 form-control" type="text" />
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Email address</span>{" "}
							<input className="ml-4 form-control" type="text" />
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Password</span>{" "}
							<input className="ml-4 form-control" type="text" />
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Phone number</span>{" "}
							<input className="ml-4 form-control" type="text" />
						</div>
					</div>
					<Link to="/account/profile/update">
						<button type="submit" className="btn btn-primary mb-2 px-5 my-2" value="Log in">
							Edit
						</button>
					</Link>
				</div>
			</div>
			<div />
		</div>
	);
};
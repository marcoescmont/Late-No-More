import React, { useContext } from "react";
import userImage from "../../../img/userImage.jpg";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Roles = () => {
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
						<h2 className="ml-4 my-2 font-weight-bold">
							Manage
							<br />
							Roles
						</h2>
					</div>
					<div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Role</th>
									<th scope="col">Hourly rate</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td>Mark</td>
									<td>Otto</td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td>Jacob</td>
									<td>Thornton</td>
								</tr>
								<tr>
									<th scope="row">3</th>
									<td>Larry</td>
									<td>the Bird</td>
								</tr>
							</tbody>
						</table>
						<div className="d-flex justify-content-around">
							<Link to="/account/profile/update">
								<button type="submit" className="btn btn-primary mb-2 px-5 my-2" value="Log in">
									Edit
								</button>
							</Link>
							<Link to="/account/profile/update">
								<button type="submit" className="btn btn-primary mb-2 px-5 my-2" value="Log in">
									Create
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
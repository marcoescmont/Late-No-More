import React, { useContext } from "react";
import userImage from "../../../img/userImage.jpg";
import { myVerticalModal } from "../account-info/myVerticalModal";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Roles = () => {
	const { store, actions } = useContext(Context);
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="mr-5">
								{store.profile.employer === null ? "Employee" : store.profile.employer}
							</span>
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
									<th scope="col" />
									<th scope="col">Role</th>
									<th scope="col">Hourly rate</th>
								</tr>
							</thead>
							<tbody>
								{store.employee &&
									store.employee.map((item, index) => {
										return (
											<tr key={index}>
												<td>
													<i className="text-success far fa-edit" />{" "}
													<i
														className="text-danger far fa-trash-alt"
														onClick={() =>
															swal({
																title: "Are you sure?",
																text:
																	"Once deleted, you will not be able to recover this imaginary file!",
																icon: "warning",
																buttons: true,
																dangerMode: true
															}).then(willDelete => {
																if (willDelete) {
																	actions.deleteSingleEmployee(item.id);
																	swal("Your role has been deleted succesfully!", {
																		icon: "success"
																	});
																} else {
																	swal("Your role file is safe!");
																}
															})
														}
														//   () => actions.deleteSingleEmployee(item.id)
													/>
												</td>
												<td>{item.role}</td>
												<td>{item.hourly_rate}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
						<div className="d-flex justify-content-around">
							<button
								type="button"
								onClick={() => setModalShow(true)}
								className="btn btn-primary mb-2 px-5 my-2">
								{" "}
								Create
							</button>
						</div>
						<myVerticalModal show={true} onHide={() => setModalShow(false)} />
					</div>
				</div>
			</div>
		</div>
	);
};

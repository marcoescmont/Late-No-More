import React, { useContext } from "react";
import userImage from "../../../img/userImage.jpg";
import empty_profile from "../../../img/empty_profile.jpg";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";

export const Shifts = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<div className="text-center mb-5 pb-5">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column mb-5 pb-5">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={store.profile.employer !== null ? userImage : empty_profile} />
						<h4 className="justify-content-start mt-2 ml-3">
							<span className="">{store.profile.username}</span> <br />{" "}
							<span className="">{store.profile.employer === null ? "Employee" : "Employer"}</span>
						</h4>
						<h1 className="mx-auto my-2 font-weight-bold">Shifts</h1>
					</div>
					<div className="d-flex justify-content-around my-4">
						<Link to="/shifts/timesheet">
							<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
								Timesheet
							</button>
						</Link>
						{store.profile.employer !== null ? (
							<Link to="/shifts/create-event">
								<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
									+ Create shift
								</button>
							</Link>
						) : (
							undefined
						)}
					</div>
					<div>
						{/* <table className="table">
							<thead>
								<tr>
									<th scope="rowgroup">{moment().format("ll")}</th>
								</tr>
							</thead>
						</table> */}
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">Role</th>
									<th scope="col">S/T</th>
									<th scope="col">E/T</th>
									<th scope="col">Hrs</th>
									<th scope="col">Stts</th>
									<th scope="col" />
								</tr>
							</thead>
							<tbody>
								{store.shift.map((item, index) => {
									const starting_time = new Date(item.starting_time);
									const ending_time = new Date(item.ending_time);
									const monthST = starting_time.getUTCMonth() + 1;
									const dayST = starting_time.getUTCDate();
									const yearST = starting_time.getUTCFullYear();
									const fullDateST = monthST + "/" + dayST;
									const monthET = ending_time.getUTCMonth() + 1;
									const dayET = ending_time.getUTCDate();
									const yearET = ending_time.getUTCFullYear();
									const fullDateET = monthET + "/" + dayET;
									const hours_ending_time = ending_time.getHours() + ending_time.getMinutes() / 60;
									const hours_starting_time =
										starting_time.getHours() + starting_time.getMinutes() / 60;
									const hours = hours_ending_time - hours_starting_time;

									if (item.clock_out !== null) return undefined;
									else if (item.employer_id === store.profile.employer)
										return (
											<tr scope="row" key={index}>
												<td>
													{store.employee.map(i => {
														if (i.id === item.role_id) return i.role;
													})}
												</td>
												<td>
													{fullDateST}
													<br />
													{starting_time.getHours()}:
													{starting_time.getMinutes() < 10
														? "0" + starting_time.getMinutes()
														: starting_time.getMinutes()}
												</td>
												<td>
													{fullDateET}
													<br />
													{ending_time.getHours()}:
													{ending_time.getMinutes() < 10
														? "0" + ending_time.getMinutes()
														: ending_time.getMinutes()}
												</td>

												<td>{hours < 0 ? (hours + 24).toFixed(1) : hours.toFixed(1)}</td>
												{item.clock_in !== null ? (
													<td>
														<i className="text-success fas fa-check" />
													</td>
												) : (
													<td>
														<i className="text-gray fas fa-bed" />
													</td>
												)}
												{store.profile.employer === null ? (
													<td>
														<Link
															to={
																item.clock_in !== null
																	? "/confirm-CO/" + item.id
																	: "/confirm-CI/" + item.id
															}>
															<i className="text-success fas fa-arrow-right" />
														</Link>
													</td>
												) : (
													<td className="d-flex justify-content-around">
														<i
															onClick={() => {
																history.push("/shifts/edit-shift/" + item.id);
															}}
															className="text-success far fa-edit mx-1 icon-hover"
														/>
														<i
															className="text-danger far fa-trash-alt"
															onClick={() =>
																swal({
																	title: "Are you sure?",
																	text:
																		"Once deleted, you will not be able to recover this shift!",
																	icon: "warning",
																	buttons: true,
																	dangerMode: true
																}).then(willDelete => {
																	if (willDelete) {
																		actions.deleteSingleShift(item.id);
																		swal(
																			"Your shift has been deleted succesfully!",
																			{
																				icon: "success"
																			}
																		);
																	} else {
																		swal("Your role file is safe!");
																	}
																})
															}
														/>
													</td>
												)}
											</tr>
										);
									else if (item.profile_id == store.profile.id)
										return (
											<tr scope="row" key={index}>
												<td>
													{store.employee.map((i, ind) => {
														if (i.id === item.role_id) return i.role;
													})}
												</td>
												<td>
													{fullDateST}
													<br />
													{starting_time.getHours()}:
													{starting_time.getMinutes() < 10
														? "0" + starting_time.getMinutes()
														: starting_time.getMinutes()}
												</td>
												<td>
													{fullDateET}
													<br />
													{ending_time.getHours()}:
													{ending_time.getMinutes() < 10
														? "0" + ending_time.getMinutes()
														: ending_time.getMinutes()}
												</td>

												<td>{hours < 0 ? (hours + 24).toFixed(1) : hours.toFixed(1)}</td>
												{item.clock_in !== null ? (
													<td>
														<i className="text-success fas fa-check" />
													</td>
												) : (
													<td>
														<i className="text-gray fas fa-bed" />
													</td>
												)}
												{store.profile.employer === null ? (
													<td>
														<Link
															to={
																item.clock_in !== null
																	? "/confirm-CO/" + item.id
																	: "/confirm-CI/" + item.id
															}>
															<i className="text-success fas fa-arrow-right" />
														</Link>
													</td>
												) : (
													<td>
														<i className="text-success far fa-edit" />
														<i
															className="text-danger far fa-trash-alt"
															onClick={() =>
																swal({
																	title: "Are you sure?",
																	text:
																		"Once deleted, you will not be able to recover this shift!",
																	icon: "warning",
																	buttons: true,
																	dangerMode: true
																}).then(willDelete => {
																	if (willDelete) {
																		actions.deleteSingleShift(item.id);
																		swal(
																			"Your shift has been deleted succesfully!",
																			{
																				icon: "success"
																			}
																		);
																	} else {
																		swal("Your role file is safe!");
																	}
																})
															}
														/>
													</td>
												)}
											</tr>
										);
									else null;
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

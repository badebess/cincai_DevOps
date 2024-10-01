import unauth  from "../assets/unauth.png";
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

export function Unauthorized() {
	return (
		<div className="position-absolute top-50 start-50 translate-middle text-center">
			<h3>Oopss, you're not in login</h3>
			<img src={unauth} style={{width:"1000px"}}></img>
			<h3>Please login first 😊</h3>
			<Link to="/login">
				<button className="btn btn-primary mt-3">Login</button>
			</Link>
		</div>
	);
}

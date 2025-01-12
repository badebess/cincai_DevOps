import notFound  from "../assets/404.png";
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

export function NotFoundPage() {
	return (
		<div className="position-absolute top-50 start-50 translate-middle text-center">
			<h3>Oopss</h3>
			<img src={notFound} style={{width:"800px"}}></img>
			<h3>The page not found</h3>
			<Link to="/">
				<button className="btn btn-primary mt-3">Back Home</button>
			</Link>
		</div>
	);
}

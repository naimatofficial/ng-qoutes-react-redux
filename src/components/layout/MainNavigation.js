import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<NavLink to="/" activeClassName={classes.active}>
					NG Qoutes
				</NavLink>
			</div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink to="/quotes" activeClassName={classes.active}>
							All Qoute
						</NavLink>
					</li>
					<li>
						<NavLink to="/new-quote" activeClassName={classes.active}>
							New Qoute
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;

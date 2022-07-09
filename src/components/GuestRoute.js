import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";

const GuestRoute = ({ children, isAuth, userLoading }) => {
	if (isAuth && !userLoading) {
		return <Navigate to='/' replace />;
	}
	return <Container>{children}</Container>;
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	userLoading: state.auth.loading,
});

export default connect(mapStateToProps, {})(GuestRoute);

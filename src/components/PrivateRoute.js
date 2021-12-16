import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ({ redirectTo, auth: { isAuth, loading } }) => {
	useEffect(() => {
		console.log(isAuth);
		console.log(loading);
	}, [isAuth, loading]);
	return !isAuth && !loading ? <Navigate to={redirectTo} /> : <Outlet />;
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);

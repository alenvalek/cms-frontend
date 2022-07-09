import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, auth: { isAuth, loading } }) => {
	if (!isAuth && !loading) {
		return <Navigate to='/login' replace />;
	}
	return <Outlet />;
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);

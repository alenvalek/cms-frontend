import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ redirectTo, auth: { isAuth, loading } }) => {
	return !isAuth && !loading ? <Navigate to={redirectTo} /> : <Outlet />;
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);

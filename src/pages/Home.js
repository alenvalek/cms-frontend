import { Typography } from "@mui/material";
import { Fragment } from "react";
import { connect } from "react-redux";

const Home = ({ user, loading }) => {
	return (
		<>
			{user && !loading && (
				<Fragment>
					<Typography style={{ margin: "2rem" }} variant='h4'>
						Welcome back, {user.user.username}!
					</Typography>
					<Typography style={{ margin: "0 2rem" }} variant='h5'>
						<strong>User id:</strong> {user.user._id}!
					</Typography>
					<Typography style={{ margin: "0 2rem" }} variant='h5'>
						<strong>Email:</strong> {user.user.email}
					</Typography>
					<Typography style={{ margin: "0 2rem" }} variant='h5'>
						<strong>Role:</strong> {user.role}
					</Typography>
					<Typography style={{ margin: "0 2rem" }} variant='h5'>
						<strong>Account creation date:</strong>{" "}
						{new Date(user.user.createdAt).toDateString()}
					</Typography>
				</Fragment>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Home);

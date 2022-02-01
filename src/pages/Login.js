import {
	Paper,
	Typography,
	Grid,
	TextField,
	Button,
	Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// redux
import { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/auth";

import { Navigate } from "react-router-dom";

const useStyles = makeStyles({
	paper: {
		padding: 20,
		width: 300,
		margin: "1rem auto",
	},
	formElement: {
		marginBottom: "1rem",
	},
	grid: {
		height: "90vh",
	},
});

const Login = ({ isAuth, loginUser, user, alert }) => {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const error = alert;

	const loginHandler = async (e) => {
		loginUser(email, password);
		console.log(isAuth);
		console.log("User: ", user);
		console.log(alert);
	};

	if (isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				className={classes.grid}>
				<Paper elevation={20} className={classes.paper}>
					<Grid item align='center' className={classes.formElement}>
						{error.msg && (
							<Alert variant='filled' severity='error'>
								{error.msg}
							</Alert>
						)}
					</Grid>
					<Grid item align='center' className={classes.formElement}>
						<Typography variant='h3'>Prijava</Typography>
					</Grid>
					<Grid item align='center'>
						<TextField
							name='email'
							label='E-mail'
							fullWidth
							required
							className={classes.formElement}
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							name='password'
							label='Password'
							fullWidth
							required
							className={classes.formElement}
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>
					<Grid item align='center'>
						<Button variant='contained' color='primary' onClick={loginHandler}>
							Prijavi se
						</Button>
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	user: state.auth.user,
	alert: state.alert,
});

export default connect(mapStateToProps, { loginUser })(Login);

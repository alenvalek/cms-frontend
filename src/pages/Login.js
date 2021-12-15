import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
	paper: {
		padding: 20,
		width: 280,
		margin: "1rem auto",
	},
	formElement: {
		marginBottom: "1rem",
	},
	grid: {
		height: "90vh",
	},
});

const Login = () => {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				className={classes.grid}>
				<Paper elevation={20} className={classes.paper}>
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
						<Button variant='contained' color='primary'>
							Prijavi se
						</Button>
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};

export default Login;

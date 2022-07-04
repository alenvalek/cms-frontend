import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BackupTableIcon from "@mui/icons-material/BackupTable";

// redux
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Link } from "react-router-dom";

const Navbar = ({ auth: { isAuth, loading }, logout }) => {
	return (
		<>
			{!loading && (
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position='static'>
						<Toolbar variant='regular'>
							<IconButton
								size='large'
								edge='start'
								color='inherit'
								aria-label='menu'
								sx={{ mr: 2 }}>
								<BackupTableIcon />
							</IconButton>
							<Typography
								variant='h6'
								color='inherit'
								component='div'
								sx={{ flexGrow: 1 }}>
								CMS
							</Typography>
							{isAuth ? (
								<Button color='inherit' onClick={logout}>
									Odjava
								</Button>
							) : (
								<Link color='inherit' to='/login'>
									Prijava
								</Link>
							)}
						</Toolbar>
					</AppBar>
				</Box>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

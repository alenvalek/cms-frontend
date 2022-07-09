import {
	AppBar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import BackupTableIcon from "@mui/icons-material/BackupTable";

// redux
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const lngs = {
	en: { nativeName: "English" },
	es: { nativeName: "Español" },
	it: { nativeName: "Italiano" },
	hr: { nativeName: "Hrvatski" },
};

const Navbar = ({ auth: { isAuth, loading }, logout }) => {
	const { t, i18n } = useTranslation();

	const handleLngChg = (lng) => {
		i18n.changeLanguage(lng);
	};

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
									{t("logout")}
								</Button>
							) : (
								<Link color='inherit' to='/login'>
									{t("login")}
								</Link>
							)}
							<PopupState variant='popover'>
								{(popupState) => (
									<>
										<Button
											sx={{ marginLeft: "1rem" }}
											variant='text'
											color='inherit'
											{...bindTrigger(popupState)}>
											{t("changeLanguage")}
										</Button>
										<Menu {...bindMenu(popupState)}>
											{Object.keys(lngs).map((lng, index) => (
												<MenuItem
													key={index}
													disabled={i18n.resolvedLanguage === lng}
													onClick={(e) => {
														handleLngChg(lng);
														popupState.close();
													}}>
													{lngs[lng].nativeName}
												</MenuItem>
											))}
										</Menu>
									</>
								)}
							</PopupState>
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

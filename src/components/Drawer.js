import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import DashboardIcon from "@mui/icons-material/Dashboard";
// redux
import { connect, useDispatch } from "react-redux";
import { logout } from "../actions/auth";

// routing
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Menu, MenuItem, Divider } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const lngs = {
	en: { nativeName: "English" },
	es: { nativeName: "Español" },
	it: { nativeName: "Italiano" },
	hr: { nativeName: "Hrvatski" },
};

const drawerWidth = 240;

function ResponsiveDrawer({ window, children, user, loading }) {
	const [mobileOpen, setMobileOpen] = useState(false);

	const { t, i18n } = useTranslation();

	const handleLngChg = (lng) => {
		i18n.changeLanguage(lng);
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	const drawer = (
		<div>
			<Divider />
			<List>
				<ListItem button onClick={handleLogout}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText primary={t("logout")} />
				</ListItem>
			</List>
			<Divider />
			<List>
				<NavLink
					to='/'
					style={({ isActive }) => ({
						color: isActive ? "#1976d2" : "black",
					})}>
					<ListItem button>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary={t("dashboard")} />
					</ListItem>
				</NavLink>
				<NavLink
					to='/hoteli'
					style={({ isActive }) => ({
						color: isActive ? "#1976d2" : "black",
					})}>
					<ListItem button>
						<ListItemIcon>
							<ApartmentIcon />
						</ListItemIcon>
						<ListItemText primary={t("myChains")} />
					</ListItem>
				</NavLink>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<BackupTableIcon style={{ marginRight: "1rem" }} />
					<Typography variant='h6' noWrap component='div'>
						CMS
					</Typography>
					<PopupState variant='popover'>
						{(popupState) => (
							<>
								<Button
									sx={{ marginLeft: "auto" }}
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
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				{children}
			</Box>
		</Box>
	);
}

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(ResponsiveDrawer);

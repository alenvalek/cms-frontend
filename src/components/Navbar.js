import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BackupTableIcon from "@mui/icons-material/BackupTable";

const Navbar = () => {
	return (
		<>
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
						<Button color='inherit'>Prijava</Button>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Navbar;

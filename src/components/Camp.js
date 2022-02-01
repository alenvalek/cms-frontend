import { Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";

const useStyles = makeStyles({
	root: {
		transition: "all ease-in 500ms",
		"&:hover": {
			backgroundColor: "#35793b",
			color: "white",
			cursor: "pointer",
		},
	},
});

const Hotel = ({ name }) => {
	const classes = useStyles();

	return (
		<Grid
			container
			component={Card}
			elevation={5}
			justifyContent='center'
			alignItems='center'
			padding={2}
			className={classes.root}>
			<Grid item sm={12}>
				<HolidayVillageIcon fontSize='large' />
			</Grid>
			<Grid item sm={6}>
				<HolidayVillageIcon fontSize='large' />
			</Grid>
			<Grid item sm={6}>
				<HolidayVillageIcon fontSize='large' />
			</Grid>
			<Grid item sm={12}>
				<HolidayVillageIcon fontSize='large' />
			</Grid>
			<Grid item sm={12}>
				<Typography variant='h5'>{name}</Typography>
			</Grid>
		</Grid>
	);
};

export default Hotel;

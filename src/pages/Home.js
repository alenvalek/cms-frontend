import "../App.css";
import { Grid, Typography } from "@mui/material";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Home = ({ user }) => {
	const [objectCount, setObjectCount] = useState(0);
	const { t } = useTranslation();
	useEffect(() => {
		if (user) {
			let amountOfParcels = user.userWorkspaces.objects.length;
			setObjectCount(amountOfParcels);
		}
	}, [user]);

	return (
		<Grid container flexDirection='column' alignItems='center' spacing={2}>
			<Typography variant='h3'>{t("dashboard")}</Typography>
			<Typography variant='h5'>
				{t("allowedObj")}: {objectCount}
			</Typography>
			{/* ispod ovog ide karta ? */}
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, {})(Home);

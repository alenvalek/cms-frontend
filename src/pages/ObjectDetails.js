import { Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loadUser } from "../actions/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ObjectDetails = ({ user, loadUser }) => {
	const { kampID, hotelID, objektID } = useParams();

	const [object, setObject] = useState({});
	const navigate = useNavigate();
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const handleBack = () => {
		navigate(`/hoteli/${hotelID}/${kampID}`);
	};
	const handleDelete = async (e) => {
		try {
			await axios.delete(`http://localhost:5000/api/objects/${objektID}`);
			navigate(`/hoteli/${hotelID}/${kampID}`);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchObjectInfo = () => {
			const objectInfo = user.userWorkspaces.objects.find(
				(obj) => obj._id === objektID
			);
			setObject(objectInfo);
		};
		dispatch(loadUser);
		if (user) {
			fetchObjectInfo();
		}
	}, [user, objektID, dispatch, loadUser]);

	return (
		<Grid
			container
			textAlign='center'
			alignItems='center'
			justifyContent='center'>
			<Grid item md={1}>
				<Button
					variant='outlined'
					startIcon={<ArrowBackIcon />}
					onClick={handleBack}>
					{t("backBtn")}
				</Button>
			</Grid>
			<Button
				variant='contained'
				color='error'
				onClick={handleDelete}
				startIcon={<DeleteIcon />}>
				{" "}
				{t("deleteObjBtn")}{" "}
			</Button>
			<Grid
				container
				textAlign='center'
				alignItems='center'
				justifyContent='center'
				spacing={2}>
				{object && user && (
					<Grid item>
						<Typography variant='h5'>
							{t("name")}: {object.naziv}
						</Typography>
						<Typography variant='h5'>
							{t("area")}: {object.povrsina}m<sup>2</sup>
						</Typography>
						<Typography variant='h5'>
							{t("type")}: {object.tip}
						</Typography>
						<Typography variant='h5'>
							{t("dim")}: {object.dimenzije}
						</Typography>
						<Typography variant='h5'>
							{t("desc")}: {object && object.opis ? object.opis : "nema opisa"}
						</Typography>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(ObjectDetails);

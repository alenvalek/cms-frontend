import { Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loadUser } from "../actions/auth";

const ObjectDetails = ({ user, loadUser }) => {
	const { kampID, hotelID, objektID } = useParams();

	const [object, setObject] = useState({});
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleBack = () => {
		navigate(`/hoteli/${hotelID}/${kampID}`);
	};

	const fetchObjectInfo = () => {
		const objectInfo = user.userWorkspaces.objects.find(
			(obj) => obj._id == objektID
		);
		setObject(objectInfo);
	};

	useEffect(() => {
		dispatch(loadUser);
		if (user) {
			fetchObjectInfo();
		}
	}, [user]);

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
					Nazad
				</Button>
			</Grid>
			<Button variant='contained' color='error' startIcon={<DeleteIcon />}>
				{" "}
				Obriši objekt{" "}
			</Button>
			<Grid
				container
				textAlign='center'
				alignItems='center'
				justifyContent='center'
				spacing={2}>
				{object && user && (
					<Grid item>
						<Typography variant='h5'>Naziv: {object.naziv}</Typography>
						<Typography variant='h5'>
							Površina: {object.povrsina}m<sup>2</sup>
						</Typography>
						<Typography variant='h5'>Tip: {object.tip}</Typography>
						<Typography variant='h5'>Dimenzije: {object.dimenzije}</Typography>
						<Typography variant='h5'>
							Opis: {object && object.opis ? object.opis : "nema opisa"}
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

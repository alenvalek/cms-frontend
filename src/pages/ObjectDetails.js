import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const ObjectDetails = ({ user }) => {
	const { objektID } = useParams();

	const [object, setObject] = useState({});

	const fetchObjectInfo = () => {
		const objectInfo = user.userWorkspaces.objects.find(
			(obj) => obj._id == objektID
		);
		setObject(objectInfo);
	};

	useEffect(() => {
		if (user) {
			fetchObjectInfo();
		}
	}, [user]);

	return (
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
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, {})(ObjectDetails);

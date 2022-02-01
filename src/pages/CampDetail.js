import {
	Button,
	Grid,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CampDetail = () => {
	const { kampID } = useParams();
	const [loading, setLoading] = useState(true);
	const [campDetails, setCampDetails] = useState({});

	useEffect(() => {
		const getCampDetails = async () => {
			const res = await axios.get(`/api/camps/${kampID}`);
			setCampDetails(res.data);
			setLoading(false);
		};
		getCampDetails();
	}, []);
	const navigateToCreateForm = () => {
		console.log("brr");
	};
	return (
		<>
			{!loading && campDetails && (
				<Grid
					container
					textAlign='center'
					alignItems='center'
					justifyContent='center'
					spacing={2}>
					<Grid item sm={12} md={6}>
						<Typography variant='h2'>{campDetails.name}</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={6} marginLeft='auto'>
						<Button
							variant='contained'
							color='primary'
							onClick={navigateToCreateForm}>
							Dodaj novi objekt
						</Button>
					</Grid>
					<Grid>{kampID}</Grid>
				</Grid>
			)}
		</>
	);
};

export default CampDetail;

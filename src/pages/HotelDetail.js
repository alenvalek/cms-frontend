import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HotelDetail = () => {
	const { hotelID } = useParams();
	const [loading, setLoading] = useState(true);
	const [hotelDetails, setHotelDetails] = useState({});

	useEffect(() => {
		const getHotelDetails = async () => {
			const res = await axios.get(`/api/hotels/${hotelID}`);
			setHotelDetails(res.data);
			setLoading(false);
		};
		getHotelDetails();
	}, []);
	const navigateToCreateForm = () => {
		console.log("brr");
	};

	return (
		<>
			{!loading && hotelDetails && (
				<Grid
					container
					textAlign='center'
					alignItems='center'
					justifyContent='center'
					spacing={2}>
					<Grid item sm={12} md={6}>
						<Typography variant='h2'>{hotelDetails.name}</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={6} marginLeft='auto'>
						<Button
							variant='contained'
							color='primary'
							onClick={navigateToCreateForm}>
							Dodaj novi kamp
						</Button>
					</Grid>
					<Grid>{hotelID}</Grid>
				</Grid>
			)}
		</>
	);
};

export default HotelDetail;

import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Camp from "../components/Camp";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const HotelDetail = ({ user }) => {
	const { hotelID } = useParams();
	const [loading, setLoading] = useState(true);
	const [camps, setCamps] = useState([]);
	const [hotelDetails, setHotelDetails] = useState({});

	const navigate = useNavigate();

	const openCamp = (campID) => {
		navigate(`/hoteli/${hotelID}/${campID}`);
	};

	useEffect(() => {
		const getHotelDetails = async () => {
			const res = await axios.get(`/api/hotels/${hotelID}`);
			setHotelDetails(res.data);
			setLoading(false);
		};
		getHotelDetails();
	}, []);
	const navigateToCreateForm = () => {
		console.log(user);
	};

	const fetchCamps = () => {
		let hotelCamps = user.userWorkspaces.camps.filter(
			(camp) => camp.hotel == hotelID
		);
		setCamps(hotelCamps);
	};

	useEffect(() => {
		if (user) {
			fetchCamps();
		}
	}, [user]);

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
					<Grid item md={12}>
						{hotelID}
					</Grid>
					{camps.length > 0 &&
						camps.map((camp) => {
							return (
								<Grid
									key={camp._id}
									item
									sm={12}
									md={3}
									onClick={(e) => openCamp(camp._id)}>
									<Camp name={camp.name} />
								</Grid>
							);
						})}
				</Grid>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, {})(HotelDetail);

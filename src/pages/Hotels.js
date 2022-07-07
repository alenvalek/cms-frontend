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
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Hotel from "../components/Hotel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadUser } from "../actions/auth";

const Hotels = ({ user, loading, loadUser }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [newHotelName, setNewHotelName] = useState("");
	const [hotels, setHotels] = useState([]);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleClose = (e) => {
		setModalVisible(!modalVisible);
		setNewHotelName("");
	};

	const handleSubmit = async (e) => {
		try {
			const res = await axios.post("http://localhost:5000/api/hotels", {
				name: newHotelName,
			});
			setHotels([...hotels, res.data]);
			setModalVisible(!modalVisible);
			setNewHotelName("");
		} catch (error) {
			console.log(error);
		}
	};

	const openHotel = (id) => {
		navigate(`/hoteli/${id}`);
	};

	const fetchHotels = () => {
		setHotels(user.userWorkspaces.hotels);
	};

	useEffect(() => {
		dispatch(loadUser);
		if (user) {
			fetchHotels();
		}
	}, [user]);

	return (
		<>
			{user && (
				<Grid
					container
					textAlign='center'
					alignItems='center'
					justifyContent='center'
					spacing={2}>
					<Grid item sm={12} md={6}>
						<Typography variant='h2'>Hotelski lanci</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={6} marginLeft='auto'>
						<Button variant='contained' color='primary' onClick={handleClose}>
							Dodaj novi hotelski lanac
						</Button>
						<Dialog open={modalVisible} onClose={handleClose}>
							<DialogTitle>Dodavanje novog hotelskog lanca</DialogTitle>
							<DialogContent>
								<TextField
									autoFocus
									margin='dense'
									label='Ime novog hotelskog lanca'
									type='text'
									fullWidth
									variant='standard'
									value={newHotelName}
									onChange={(e) => setNewHotelName(e.target.value)}
								/>
							</DialogContent>
							<DialogActions>
								<Button
									variant='contained'
									color='primary'
									onClick={handleSubmit}
									fullWidth>
									Kreiraj
								</Button>
							</DialogActions>
						</Dialog>
					</Grid>
					{hotels.length > 0 &&
						hotels.map((hotel) => {
							return (
								<Grid
									key={hotel._id}
									item
									sm={12}
									md={3}
									onClick={(e) => openHotel(hotel._id)}>
									<Hotel name={hotel.name} />
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
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { loadUser })(Hotels);

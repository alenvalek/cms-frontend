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
import { connect } from "react-redux";
import Hotel from "../components/Hotel";
import Camp from "../components/Camp";
import { useNavigate } from "react-router-dom";

const Hotels = ({ user, loading }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [newHotelName, setNewHotelName] = useState("");

	const navigate = useNavigate();

	const handleClose = (e) => {
		setModalVisible(!modalVisible);
		setNewHotelName("");
	};

	const handleSubmit = (e) => {
		setModalVisible(!modalVisible);
		setNewHotelName("");
	};

	const openHotel = (id) => {
		navigate(`/hoteli/${id}`);
	};

	const fetchHotels = (e) => {
		let newArr = [];
		const userData = user.user;
		console.log(userData);
		if (userData) {
			userData.permissions.forEach((permission) => {
				if (permission.accessModel == "hotel") {
					newArr.push({
						type: permission.accessModel,
						name: permission.access.name,
						id: permission.access._id,
					});
				}
			});
		}
		setObjArray(newArr);
	};

	useEffect(() => {
		if (user) {
			fetchHotels();
		}
	}, [user]);

	const [objArray, setObjArray] = useState([]);

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
					{objArray.length > 0 &&
						objArray.map((hotel) => {
							return (
								<Grid
									key={hotel.id}
									item
									sm={12}
									md={3}
									onClick={(e) => openHotel(hotel.id)}>
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

export default connect(mapStateToProps, {})(Hotels);

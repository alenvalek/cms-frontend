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
import { useTranslation } from "react-i18next";

const Hotels = ({ user, loading, loadUser }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [newHotelName, setNewHotelName] = useState("");
	const [hotels, setHotels] = useState([]);

	const { t } = useTranslation();

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

	useEffect(() => {
		const fetchHotels = () => {
			setHotels(user.userWorkspaces.hotels);
		};
		dispatch(loadUser);
		if (user) {
			fetchHotels();
		}
	}, [user, dispatch, loadUser]);

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
						<Typography variant='h2'>{t("hotelChains")}</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={6} marginLeft='auto'>
						<Button variant='contained' color='primary' onClick={handleClose}>
							{t("addHotelBtn")}
						</Button>
						<Dialog open={modalVisible} onClose={handleClose}>
							<DialogTitle>{t("addHotelFormTitle")}</DialogTitle>
							<DialogContent>
								<TextField
									autoFocus
									margin='dense'
									label={t("addHotelFormLabel")}
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
									{t("createBtn")}
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

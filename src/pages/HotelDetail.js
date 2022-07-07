import {
	Button,
	ButtonGroup,
	Grid,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Camp from "../components/Camp";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const HotelDetail = ({ user, loading }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const { hotelID } = useParams();
	const [camps, setCamps] = useState([]);
	const [hotelDetails, setHotelDetails] = useState({});
	const [newCampName, setCampName] = useState("");

	const navigate = useNavigate();

	const handleClose = (e) => {
		setModalVisible(!modalVisible);
		setCampName("");
	};

	const handleSubmit = async (e) => {
		try {
			const res = await axios.post("http://localhost:5000/api/camps", {
				name: newCampName,
				hotel: hotelID,
			});
			setCamps([...camps, res.data]);
			setModalVisible(!modalVisible);
			setCampName("");
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = (e) => {
		try {
		} catch (error) {}
	};

	const handleBack = () => {
		navigate(`/hoteli`);
	};

	const openCamp = (campID) => {
		navigate(`/hoteli/${hotelID}/${campID}`);
	};

	useEffect(() => {
		const getHotelDetails = async () => {
			const res = await axios.get(`/api/hotels/${hotelID}`);
			setHotelDetails(res.data);
		};
		getHotelDetails();
	}, []);

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
					{" "}
					<Grid item md={1}>
						<Button
							variant='outlined'
							startIcon={<ArrowBackIcon />}
							onClick={handleBack}>
							Nazad
						</Button>
					</Grid>
					<Grid item sm={12} md={5}>
						<Typography variant='h2'>{hotelDetails.name}</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={6} marginLeft='auto'>
						<Grid container spacing={2}>
							<Grid item>
								<Button
									variant='contained'
									color='primary'
									onClick={handleClose}>
									Dodaj novi kamp
								</Button>
								<Dialog open={modalVisible} onClose={handleClose}>
									<DialogTitle>Dodavanje novog kampa</DialogTitle>
									<DialogContent>
										<TextField
											autoFocus
											margin='dense'
											label='Ime novog kampa'
											type='text'
											fullWidth
											variant='standard'
											value={newCampName}
											onChange={(e) => setCampName(e.target.value)}
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
							<Grid item>
								<Button
									variant='contained'
									color='error'
									onClick={handleDelete}
									startIcon={<DeleteIcon />}>
									{" "}
									Obriši Hotelski lanac{" "}
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item md={12}>
						{hotelID}
					</Grid>
					{user &&
						!loading &&
						camps.length > 0 &&
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
	loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(HotelDetail);

import {
	Button,
	Grid,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Camp from "../components/Camp";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Camps = ({ user, loading }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [newCampName, setNewCampName] = useState("");

	const navigate = useNavigate();

	const handleClose = (e) => {
		setModalVisible(!modalVisible);
		setNewCampName("");
	};

	const handleSubmit = (e) => {
		setModalVisible(!modalVisible);
		setNewCampName("");
	};

	const openCamp = (id) => {
		navigate(`/kampovi/${id}`);
	};

	const fetchCamps = (e) => {
		let newArr = [];
		const userData = user.user;
		console.log(userData);
		if (userData) {
			userData.permissions.forEach((permission) => {
				if (permission.accessModel == "camp") {
					newArr.push({
						type: permission.accessModel,
						name: permission.access.name,
						id: permission.access._id,
					});
				}
			});
		}
		setCampArray(newArr);
	};

	const [campArray, setCampArray] = useState([]);

	useEffect(() => {
		if (user) {
			fetchCamps();
		}
	}, [user]);

	return (
		<Grid
			container
			alignItems='center'
			justifyContent='center'
			textAlign='center'
			spacing={2}>
			<Grid item sm={12} md={6}>
				<Typography variant='h2'>Kampovi</Typography>
			</Grid>
			<Grid item sm={12} md={6}>
				<Button variant='contained' color='primary' onClick={handleClose}>
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
							onChange={(e) => setNewCampName(e.target.value)}
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
			{campArray.map((camp) => (
				<Grid
					key={camp.id}
					item
					sm={12}
					md={3}
					onClick={(e) => openCamp(camp.id)}>
					<Camp name={camp.name} />
				</Grid>
			))}
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Camps);

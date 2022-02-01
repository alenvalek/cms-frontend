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
import { useState } from "react";
import Object from "../components/Object";

const Objects = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [newObjectName, setNewObjectName] = useState("");

	const handleClose = (e) => {
		setModalVisible(!modalVisible);
		setNewObjectName("");
	};

	const handleSubmit = (e) => {
		setModalVisible(!modalVisible);
		setNewObjectName("");
	};

	const [array, setArray] = useState([
		{
			id: 1,
			name: "Testni objekt 1",
		},
		{
			id: 2,
			name: "Testni objekt 2",
		},
		{
			id: 3,
			name: "Testni objekt 3",
		},
		{
			id: 4,
			name: "Testni objekt 4",
		},
	]);

	return (
		<div>
			<Grid
				container
				alignItems='center'
				justifyContent='center'
				textAlign='center'
				spacing={2}>
				<Grid item sm={12} md={6}>
					<Typography variant='h2'>Objekti</Typography>
				</Grid>
				<Grid item sm={12} md={6}>
					<Button variant='contained' color='primary' onClick={handleClose}>
						Dodaj novi objekt
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
								value={newObjectName}
								onChange={(e) => setNewObjectName(e.target.value)}
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
				{array.map((obj) => (
					<Grid key={obj.id} item sm={12} md={3}>
						<Object name={obj.name} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Objects;

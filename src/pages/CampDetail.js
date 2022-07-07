import { Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Object from "../components/Object";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loadUser } from "../actions/auth";

const CampDetail = ({ user, loading, loadUser }) => {
	const { kampID, hotelID } = useParams();
	const [campDetails, setCampDetails] = useState({});

	const dispatch = useDispatch();

	const [objects, setObjects] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getCampDetails = async () => {
			const res = await axios.get(`/api/camps/${kampID}`);
			setCampDetails(res.data);
		};
		getCampDetails();
	}, []);

	const handleRoute = (objID) => {
		navigate(`/hoteli/${hotelID}/${kampID}/${objID}`);
	};

	const handleBack = () => {
		navigate(`/hoteli/${hotelID}`);
	};

	const fetchObjects = () => {
		let campObjects = user.userWorkspaces.objects.filter(
			(object) => object.camp == kampID
		);
		setObjects(campObjects);
	};

	useEffect(() => {
		dispatch(loadUser);
		if (user) {
			console.log(user);
			fetchObjects();
		}
	}, [user]);

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
					<Grid item md={1}>
						<Button
							variant='outlined'
							startIcon={<ArrowBackIcon />}
							onClick={handleBack}>
							Nazad
						</Button>
					</Grid>
					<Grid item sm={12} md={5}>
						<Typography variant='h2'>{campDetails.name}</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={6} marginLeft='auto'>
						<Grid container spacing={2}>
							<Grid item>
								<Button
									variant='contained'
									color='primary'
									onClick={navigateToCreateForm}>
									Dodaj novi objekt
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									color='error'
									startIcon={<DeleteIcon />}>
									{" "}
									Obriši kamp{" "}
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid md={12}>{kampID}</Grid>
					{user &&
						!loading &&
						objects &&
						objects.length > 0 &&
						objects.map((object) => {
							return (
								<Grid
									key={object._id}
									item
									sm={12}
									md={3}
									onClick={(e) => handleRoute(object._id)}>
									<Object name={object.naziv} />
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

export default connect(mapStateToProps, { loadUser })(CampDetail);

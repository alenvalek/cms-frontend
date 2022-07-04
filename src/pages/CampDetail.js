import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Object from "../components/Object";

const CampDetail = ({ user }) => {
	const { kampID, hotelID } = useParams();
	const [loading, setLoading] = useState(true);
	const [campDetails, setCampDetails] = useState({});

	const [objects, setObjects] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getCampDetails = async () => {
			const res = await axios.get(`/api/camps/${kampID}`);
			setCampDetails(res.data);
			setLoading(false);
		};
		getCampDetails();
	}, []);

	const handleRoute = (objID) => {
		navigate(`/hoteli/${hotelID}/${kampID}/${objID}`);
	};

	const fetchObjects = () => {
		let campObjects = user.userWorkspaces.objects.filter(
			(object) => object.camp == kampID
		);
		setObjects(campObjects);
	};

	useEffect(() => {
		if (user) {
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
					<Grid md={12}>{kampID}</Grid>
					{objects.length > 0 &&
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
});

export default connect(mapStateToProps, {})(CampDetail);

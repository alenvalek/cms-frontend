import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import Hotel from "../components/Hotel";

const Home = ({ user, loading }) => {
	const [array, setArray] = useState([
		{
			id: 1,
			name: "Testni hotelski lanac 1",
		},
		{
			id: 2,
			name: "Testni hotelski lanac 2",
		},
		{
			id: 3,
			name: "Testni hotelski lanac 3",
		},
		{
			id: 4,
			name: "Testni hotelski lanac 4",
		},
	]);

	return (
		<>
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
					<Button variant='contained' color='primary'>
						Dodaj novi hotelski lanac
					</Button>
				</Grid>
				{array.map((hotel) => (
					<Grid item sm={12} md={3}>
						<Hotel key={hotel.id} name={hotel.name} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Home);

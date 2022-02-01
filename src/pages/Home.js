import "../App.css";
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps";
import { Grid, Typography } from "@mui/material";

const geoUrl =
	"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Home = () => {
	return (
		<Grid container flexDirection='column' alignItems='center' spacing={2}>
			<Typography variant='h3'>Dashboard</Typography>
			<Typography variant='h5'>Broj objekata: 5</Typography>
			<div>
				<ComposableMap className='mapFrame'>
					<ZoomableGroup zoom={1}>
						<Geographies geography={geoUrl}>
							{({ geographies }) =>
								geographies.map((geo) => (
									<Geography key={geo.rsmKey} geography={geo} />
								))
							}
						</Geographies>
					</ZoomableGroup>
				</ComposableMap>
			</div>
		</Grid>
	);
};

export default Home;

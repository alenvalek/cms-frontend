import "../App.css";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// map stuff
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Home = ({ user }) => {
	const [objectCount, setObjectCount] = useState(0);
	const [mapData, setMapData] = useState([]);
	const [loading, setLoading] = useState(true);

	const { t } = useTranslation();
	useEffect(() => {
		if (user) {
			let amountOfParcels = user.userWorkspaces.objects.length;
			setObjectCount(amountOfParcels);
		}
	}, [user]);

	useEffect(() => {
		const fetchMapData = async () => {
			console.log("WTF");
			const res = await axios.get("http://localhost:5000/api/objects/mapData");
			setMapData(res.data);
			setLoading(false);
		};
		fetchMapData();
	}, []);

	const center = [45.31526882501221, 13.575999864019325];

	const onEachFeature = (obj, layer) => {
		const objInfo = `${obj.properties.id} - ${
			obj.properties.class || "unknown"
		}`;
		layer.bindPopup(objInfo);
	};

	return (
		<Grid
			className='my-leaflet-map-container'
			container
			flexDirection='column'
			alignItems='center'
			spacing={2}>
			<Typography variant='h3'>{t("dashboard")}</Typography>
			<Typography variant='h5'>
				{t("allowedObj")}: {objectCount}
			</Typography>
			{loading && (
				<>
					<Typography variant='h5'>Map data is being loaded..</Typography>
					<CircularProgress />
				</>
			)}
			<MapContainer
				style={{ height: "500px", width: "1000px" }}
				center={center}
				zoom={15}
				scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{mapData && mapData.length > 0 && (
					<GeoJSON data={mapData} onEachFeature={onEachFeature} />
				)}
			</MapContainer>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, {})(Home);

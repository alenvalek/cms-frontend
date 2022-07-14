import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { loadUser } from "../actions/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ObjectDetails = ({ user, loadUser }) => {
	const { kampID, hotelID, objektID } = useParams();

	const [object, setObject] = useState({});
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [content, setContent] = useState({});
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);

	const handleClose = (e) => {
		setModalVisible(!modalVisible);
		setContent("");
	};

	const handleBack = () => {
		navigate(`/hoteli/${hotelID}/${kampID}`);
	};

	const handleSubmit = async () => {
		try {
			const res = await axios.patch(
				`http://localhost:5000/api/objects/${objektID}`,
				{
					content,
				}
			);
			console.log(res.data);
			handleClose();
		} catch (error) {}
	};

	const handleDelete = async (e) => {
		try {
			await axios.delete(`http://localhost:5000/api/objects/${objektID}`);
			navigate(`/hoteli/${hotelID}/${kampID}`);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchObjectInfo = () => {
			const objectInfo = user.userWorkspaces.objects.find(
				(obj) => obj._id === objektID
			);
			setObject(objectInfo);
			setContent(objectInfo && objectInfo.content ? objectInfo.content : "");
		};
		dispatch(loadUser);
		if (user) {
			fetchObjectInfo();
		}
	}, [user, objektID, dispatch, loadUser]);

	return (
		<Grid
			container
			textAlign='center'
			alignItems='center'
			justifyContent='center'>
			<Grid item md={1}>
				<Button
					variant='outlined'
					startIcon={<ArrowBackIcon />}
					onClick={handleBack}>
					{t("backBtn")}
				</Button>
			</Grid>
			<Button
				variant='contained'
				color='error'
				onClick={handleDelete}
				startIcon={<DeleteIcon />}>
				{" "}
				{t("deleteObjBtn")}{" "}
			</Button>
			<Button
				sx={{ marginLeft: "1rem" }}
				variant='contained'
				color='primary'
				onClick={handleClose}
				startIcon={<TheaterComedyIcon />}>
				{" "}
				{t("addObjContent")}{" "}
			</Button>
			<Dialog fullWidth open={modalVisible} onClose={handleClose}>
				<DialogTitle>{t("addObjContentTitle")}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						label={t("addObjContentForm")}
						type='text'
						fullWidth
						variant='standard'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant='contained'
						color='primary'
						onClick={handleSubmit}
						fullWidth>
						{t("addContentBtn")}
					</Button>
				</DialogActions>
			</Dialog>
			<Grid
				container
				textAlign='left'
				justifyContent='center'
				spacing={2}
				sx={{ marginTop: "1rem" }}>
				{object && user && (
					<Grid item>
						<Typography variant='h5'>
							{t("name")}: {object.naziv}
						</Typography>
						<Typography variant='h5'>
							{t("area")}: {object.povrsina}m<sup>2</sup>
						</Typography>
						<Typography variant='h5'>
							{t("type")}: {object.tip}
						</Typography>
						<Typography variant='h5'>
							{t("dim")}: {object.dimenzije}
						</Typography>
						<Typography variant='h5'>
							{t("desc")}: {object && object.opis ? object.opis : "nema opisa"}
						</Typography>
						{object && object.contact && (
							<Typography variant='h5'>
								{t("contact")}: {object.contact}
							</Typography>
						)}
						{object && object.workHours && (
							<Typography variant='h5'>
								{t("workHours")}: {object.workHours}
							</Typography>
						)}
						{object && object.email && (
							<Typography variant='h5'>
								{t("email")}: {object.email}
							</Typography>
						)}
						{object && object.address && (
							<Typography variant='h5'>
								{t("address")}: {object.address}
							</Typography>
						)}
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(ObjectDetails);

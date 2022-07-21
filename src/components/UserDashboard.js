import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { connect } from "react-redux";

const UserDashboard = ({ user, object }) => {
	const [currentRole, setCurrentRole] = useState("admin");
	const { hotelID, objektID } = useParams();
	const [modalVisible, setModalVisible] = useState(false);
	const [users, setUsers] = useState([]);
	// form
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		await axios.patch(
			`http://localhost:5000/api/objects/${objektID}/${hotelID}`,
			{
				roleName: currentRole,
				username,
				email,
				password,
			}
		);
	};
	const fetchUsers = async () => {
		const res = await axios.get(`http://localhost:5000/api/users/${hotelID}`);
		let arr = [];
		res.data.forEach((user) => {
			arr.push(...arr, {
				id: user._id,
				username: user.username,
				role: user.role,
			});
		});
		setUsers(arr);
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	const handleSubmitUserRole = async (userID, role, params) => {
		await axios.patch(`http://localhost:5000/api/objects/setUserRole`, {
			user_id: userID,
			role: role,
		});
		fetchUsers();
	};

	const handleSetOwner = async (userID) => {
		await axios.patch(
			`http://localhost:5000/api/objects/set_owner/${object._id}`,
			{
				userID,
			}
		);
		fetchUsers();
	};

	const deleteUser = async (userID) => {
		await axios.delete(`http://localhost:5000/api/users/${userID}`);
		fetchUsers();
	};

	const { t } = useTranslation();
	const handleOpenClose = () => {
		setModalVisible(!modalVisible);
	};
	const columns = [
		{
			field: "id",
			headerName: "ID",
			type: "number",
			width: 70,
		},
		{
			field: "username",
			headerName: "Username",
			width: 130,
		},

		{
			field: "Admin",
			width: 200,
			renderCell: (params) => (
				<Button
					variant='contained'
					color='primary'
					disabled={params.row.role === "admin"}
					onClick={(e) => handleSubmitUserRole(params.id, "admin")}>
					Set role
				</Button>
			),
		},
		{
			field: "Operater",
			width: 200,
			renderCell: (params) => (
				<Button
					variant='contained'
					color='primary'
					disabled={params.row.role === "operater"}
					onClick={(e) => handleSubmitUserRole(params.id, "operater")}>
					Set role
				</Button>
			),
		},
		{
			field: "Korisnik",
			width: 200,
			renderCell: (params) => (
				<Button
					variant='contained'
					color='primary'
					disabled={params.row.role === "user"}
					onClick={(e) => handleSubmitUserRole(params.id, "user")}>
					Set role
				</Button>
			),
		},
		{
			field: "Vlasnik",
			width: 200,
			renderCell: (params) => (
				<Button
					variant='contained'
					color='primary'
					disabled={object.owner === params.id}
					onClick={(e) => handleSetOwner(params.id)}>
					Set as owner
				</Button>
			),
		},

		{
			field: "Delete",
			width: 90,
			renderCell: (params) => (
				<IconButton
					variant='contained'
					color='error'
					onClick={(e) => deleteUser(params.id)}>
					<DeleteForeverIcon />
				</IconButton>
			),
			sortable: false,
		},
	];

	const mockData = [
		{
			id: 1,
			username: "alenvalek",
		},
		{
			id: 2,
			username: "alenvalek2",
		},
		{
			id: 3,
			username: "alenvalek3",
		},
	];

	return (
		<Grid container alignItems='center' justifyContent='center'>
			<Grid item xs={12}>
				<Typography variant='h3'>User dashboard</Typography>
			</Grid>
			<Grid item xs={12} sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
				<Button
					onClick={handleOpenClose}
					variant='contained'
					startIcon={<PersonAddIcon />}>
					Add a new user
				</Button>
				<Dialog open={modalVisible} onClose={handleOpenClose}>
					<DialogTitle>{t("addUserTitle")}</DialogTitle>
					<DialogContent>
						<TextField
							margin='dense'
							sx={{ marginBottom: "1rem" }}
							label={t("username")}
							type='text'
							fullWidth
							variant='standard'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							margin='dense'
							sx={{ marginBottom: "1rem" }}
							label={t("email")}
							type='text'
							fullWidth
							variant='standard'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							margin='dense'
							sx={{ marginBottom: "1rem" }}
							label={t("password")}
							type='text'
							fullWidth
							variant='standard'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Select
							value={currentRole}
							sx={{ marginBottom: "1rem" }}
							onChange={(e) => setCurrentRole(e.target.value)}>
							<MenuItem value='admin'>Admin</MenuItem>
							<MenuItem value='operater'>Operater</MenuItem>
							<MenuItem value='user'>Korisnik</MenuItem>
						</Select>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							onClick={handleSubmit}>
							Create user
						</Button>
					</DialogContent>
				</Dialog>
			</Grid>
			<Grid
				item
				xs={6}
				style={{
					height: "25rem",
				}}>
				{users && <DataGrid disableColumnMenu rows={users} columns={columns} />}
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, {})(UserDashboard);

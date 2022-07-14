import { Button, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "axios";

const ObjectCard = ({ object, setContent }) => {
	const { t } = useTranslation();
	const { objektID } = useParams();

	const handleDeleteContent = async (content) => {
		try {
			await axios.patch(`http://localhost:5000/api/objects/${objektID}`, {
				filterContent: content,
			});
			setContent(
				object.content ? object.content.filter((cont) => cont !== content) : ""
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card elevation={3} sx={{ padding: "1rem", width: "100%" }}>
			<Typography variant='h6'>
				<strong>{t("name")}:</strong> {object?.naziv}
			</Typography>
			<Typography variant='h6'>
				<strong>{t("area")}:</strong> {object?.povrsina}m<sup>2</sup>
			</Typography>
			<Typography variant='h6'>
				<strong>{t("type")}:</strong> {object?.tip}
			</Typography>
			<Typography variant='h6'>
				<strong>{t("desc")}:</strong> {object.opis ? object.opis : "nema opisa"}
			</Typography>
			{object.contact && (
				<Typography variant='h6'>
					<strong>{t("contact")}:</strong> {object.contact}
				</Typography>
			)}
			{object.contact && (
				<Typography variant='h6'>
					<strong>{t("workHours")}:</strong> {object.workHours}
				</Typography>
			)}
			{object.contact && (
				<Typography variant='h6'>
					<strong>{t("email")}:</strong> {object.email}
				</Typography>
			)}
			{object.contact && (
				<Typography variant='h6'>
					<strong>{t("address")}:</strong> {object.address}
				</Typography>
			)}
			<Typography variant='h6'>
				<strong>{t("content")}:</strong>
			</Typography>
			{object &&
				object.content &&
				object.content.map((cont, index) => (
					<div key={index} style={{ display: "flex", margin: "1rem 0" }}>
						<Typography sx={{ marginRight: "1rem" }} variant='h6'>
							+ {cont}
						</Typography>
						<Button
							variant='contained'
							color='error'
							onClick={(e) => handleDeleteContent(cont)}>
							Delete
						</Button>
					</div>
				))}
		</Card>
	);
};

export default ObjectCard;

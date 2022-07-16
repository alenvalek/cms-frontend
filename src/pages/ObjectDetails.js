import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { loadUser } from "../actions/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ObjectCard from "../components/ObjectCard";

const ObjectDetails = ({ user, loadUser }) => {
  const { kampID, hotelID, objektID } = useParams();

  const [object, setObject] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [content, setContent] = useState({});
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [newObjectNaziv, setNewObjectNaziv] = useState("");
  const [newObjectPovrsina, setNewObjectPovrsina] = useState("");
  const [newObjectTip, setNewObjectTip] = useState("");
  const [newObjectDimenzije, setNewObjectDimenzije] = useState("");
  const [newObjectOpis, setNewObjectOpis] = useState("");
  const [phone, setPhone] = useState("");
  const [working, setWorking] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [optional, setOptional] = useState(false);
  const [objects, setObjects] = useState([]);

  const handleClose = (e) => {
    setModalVisible(!modalVisible);

    setContent(object.content ? object.content.join() : "");
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

  const handleEditClose = (e) => {
    setEditModalVisible(!editModalVisible);
  };

  const handleEdit = async (e) => {
    try {
      const newObj = {
        naziv: newObjectNaziv,
        povrsina: newObjectPovrsina,
        tip: newObjectTip,
        dimenzije: newObjectDimenzije,
        opis: newObjectOpis,
        hotel: hotelID,
        camp: kampID,
      };

      if (optional) {
        if (phone) newObj.contact = phone;
        if (working) newObj.workHours = working;
        if (email) newObj.email = email;
        if (address) newObj.address = address;
      }
      const res = await axios.patch(
        `http://localhost:5000/api/objects/${objektID}`,
        newObj
      );
      setObjects([...objects, res.data]);
      object.name = newObjectNaziv;
      setEditModalVisible(!editModalVisible);
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
    };
    dispatch(loadUser);
    if (user) {
      fetchObjectInfo();
    }
  }, [user, objektID, dispatch, loadUser]);

  return (
    <Grid
      container
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          {t("backBtn")}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="warning"
          onClick={handleEditClose}
          startIcon={<EditIcon />}
        >
          {" "}
          {t("editObjectBtn")}{" "}
        </Button>
        <Dialog open={editModalVisible} onClose={handleEditClose}>
          <DialogTitle>{t("addObjFormTitle")}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label={t("addObjFormName")}
              type="text"
              fullWidth
              variant="standard"
              value={object.naziv}
              onChange={(e) => setNewObjectNaziv(e.target.value)}
            />
            <TextField
              margin="dense"
              label={t("addObjFormArea")}
              type="text"
              fullWidth
              variant="standard"
              value={object.povrsina}
              onChange={(e) => setNewObjectPovrsina(e.target.value)}
            />
            <TextField
              margin="dense"
              label={t("addObjFormType")}
              type="text"
              fullWidth
              variant="standard"
              value={object.tip}
              onChange={(e) => setNewObjectTip(e.target.value)}
            />
            <TextField
              margin="dense"
              label={t("addObjFormDim")}
              type="text"
              fullWidth
              variant="standard"
              value={object.dimenzije}
              onChange={(e) => setNewObjectDimenzije(e.target.value)}
            />
            <TextField
              multiline
              minRows={3}
              autoFocus
              margin="dense"
              label={t("addObjFormDesc")}
              type="text"
              fullWidth
              variant="standard"
              value={object.opis}
              onChange={(e) => setNewObjectOpis(e.target.value)}
            />
            <FormControlLabel
              label={t("promptOptional")}
              control={
                <Checkbox
                  checked={optional}
                  onChange={(e) => setOptional(!optional)}
                />
              }
            ></FormControlLabel>
            {optional && (
              <>
                <TextField
                  margin="dense"
                  label={t("addContactPhone")}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={object.contact}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label={t("addWorkingHours")}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={object.workHours}
                  onChange={(e) => setWorking(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label={t("addEmailAddress")}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={object.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label={t("addAddress")}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={object.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              fullWidth
            >
              {t("saveBtn")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          {" "}
          {t("deleteObjBtn")}{" "}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          startIcon={<TheaterComedyIcon />}
        >
          {" "}
          {t("addObjContent")}{" "}
        </Button>
      </Grid>
      <Dialog fullWidth open={modalVisible} onClose={handleClose}>
        <DialogTitle>{t("addObjContentTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("addObjContentForm")}
            type="text"
            fullWidth
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            {t("addContentBtn")}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        textAlign="left"
        justifyContent="center"
        spacing={2}
        sx={{ marginTop: "1rem" }}
      >
        {object && user && (
          <ObjectCard object={object} setContent={setContent} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(ObjectDetails);

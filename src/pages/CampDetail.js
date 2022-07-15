import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Object from "../components/Object";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loadUser } from "../actions/auth";
import { useTranslation } from "react-i18next";

const CampDetail = ({ user, loading, loadUser }) => {
  const { kampID, hotelID } = useParams();
  const [campDetails, setCampDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
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
  const dispatch = useDispatch();
  const [objects, setObjects] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [camps, setCamps] = useState([]);
  const [editCampName, setEditCampName] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const getCampDetails = async () => {
      const res = await axios.get(`/api/camps/${kampID}`);
      setCampDetails(res.data);
    };
    getCampDetails();
  }, [kampID]);

  const handleRoute = (objID) => {
    navigate(`/hoteli/${hotelID}/${kampID}/${objID}`);
  };
  const handleDelete = async (e) => {
    try {
      await axios.delete(`http://localhost:5000/api/camps/${kampID}`);
      navigate(`/hoteli/${hotelID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClose = (e) => {
    setEditModalVisible(!editModalVisible);
    setEditCampName("");
  };

  const handleEdit = async (e) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/camps/${kampID}`,
        {
          name: editCampName,
          id: kampID,
        }
      );
      setCamps([...camps, res.data]);
      campDetails.name = editCampName;
      setEditModalVisible(!editModalVisible);
      setEditCampName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(`/hoteli/${hotelID}`);
  };

  const handleClose = (e) => {
    setModalVisible(!modalVisible);
    setNewObjectNaziv("");
  };

  const handleSubmit = async (e) => {
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
      const res = await axios.post("http://localhost:5000/api/objects", newObj);
      setObjects([...objects, res.data]);
      setModalVisible(!modalVisible);
      setNewObjectNaziv("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchObjects = () => {
      let campObjects = user.userWorkspaces.objects.filter(
        (object) => object.camp === kampID
      );
      setObjects(campObjects);
    };
    dispatch(loadUser);
    if (user) {
      fetchObjects();
    }
  }, [user, loadUser, dispatch, kampID]);

  return (
    <>
      {!loading && campDetails && (
        <Grid
          container
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item md={1}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
            >
              {t("backBtn")}
            </Button>
          </Grid>
          <Grid item sm={12} md={5}>
            <Typography variant="h2">{campDetails.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} marginLeft="auto">
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  {t("addObjBtn")}
                </Button>
                <Dialog open={modalVisible} onClose={handleClose}>
                  <DialogTitle>{t("addObjFormTitle")}</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label={t("addObjFormName")}
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newObjectNaziv}
                      onChange={(e) => setNewObjectNaziv(e.target.value)}
                    />
                    <TextField
                      margin="dense"
                      label={t("addObjFormArea")}
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newObjectPovrsina}
                      onChange={(e) => setNewObjectPovrsina(e.target.value)}
                    />
                    <TextField
                      margin="dense"
                      label={t("addObjFormType")}
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newObjectTip}
                      onChange={(e) => setNewObjectTip(e.target.value)}
                    />
                    <TextField
                      margin="dense"
                      label={t("addObjFormDim")}
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newObjectDimenzije}
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
                      value={newObjectOpis}
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                          margin="dense"
                          label={t("addWorkingHours")}
                          type="text"
                          fullWidth
                          variant="standard"
                          value={working}
                          onChange={(e) => setWorking(e.target.value)}
                        />
                        <TextField
                          margin="dense"
                          label={t("addEmailAddress")}
                          type="text"
                          fullWidth
                          variant="standard"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                          margin="dense"
                          label={t("addAddress")}
                          type="text"
                          fullWidth
                          variant="standard"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      fullWidth
                    >
                      {t("createBtn")}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleEditClose}
                  startIcon={<EditIcon />}
                >
                  {" "}
                  {t("editCampBtn")}{" "}
                </Button>
                <Dialog open={editModalVisible} onClose={handleEditClose}>
                  <DialogTitle>{t("editCampFormTitle")}</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label={t("editCampFormName")}
                      type="text"
                      fullWidth
                      variant="standard"
                      value={editCampName}
                      onChange={(e) => setEditCampName(e.target.value)}
                    />
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
                  {t("deleteCampBtn")}{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            {kampID}
          </Grid>
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
                  onClick={(e) => handleRoute(object._id)}
                >
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

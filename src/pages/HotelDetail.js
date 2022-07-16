import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Camp from "../components/Camp";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HotelDetail = ({ user, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { hotelID } = useParams();
  const [camps, setCamps] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hotelDetails, setHotelDetails] = useState({});
  const [newCampName, setCampName] = useState("");
  const [editHotelName, setEditHotelName] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClose = (e) => {
    setModalVisible(!modalVisible);
    setCampName("");
  };

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post("http://localhost:5000/api/camps", {
        name: newCampName,
        hotel: hotelID,
      });
      setCamps([...camps, res.data]);
      setModalVisible(!modalVisible);
      setCampName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${hotelID}`);

      navigate(`/hoteli`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClose = (e) => {
    setEditModalVisible(!editModalVisible);
    setEditHotelName("");
  };

  const handleEdit = async (e) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/hotels/${hotelID}`,
        {
          name: editHotelName,
          id: hotelID,
        }
      );
      setHotels([...hotels, res.data]);
      hotelDetails.name = editHotelName;
      setEditModalVisible(!editModalVisible);
      setEditHotelName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(`/hoteli`);
  };

  const openCamp = (campID) => {
    navigate(`/hoteli/${hotelID}/${campID}`);
  };

  useEffect(() => {
    const getHotelDetails = async () => {
      const res = await axios.get(`/api/hotels/${hotelID}`);
      setHotelDetails(res.data);
    };
    getHotelDetails();
  }, [hotelID]);

  useEffect(() => {
    const fetchCamps = () => {
      let hotelCamps = user.userWorkspaces.camps.filter(
        (camp) => camp.hotel === hotelID
      );
      setCamps(hotelCamps);
    };
    if (user) {
      fetchCamps();
    }
  }, [user, hotelID]);

  return (
    <>
      {!loading && hotelDetails && (
        <Grid
          container
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          {" "}
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
            <Typography variant="h2">{hotelDetails.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} marginLeft="auto">
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  {t("addCampBtn")}
                </Button>
                <Dialog open={modalVisible} onClose={handleClose}>
                  <DialogTitle>{t("addCampFormTitle")}</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label={t("addCampFormName")}
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newCampName}
                      onChange={(e) => setCampName(e.target.value)}
                    />
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
                  {t("editHotelBtn")}{" "}
                </Button>
                <Dialog open={editModalVisible} onClose={handleEditClose}>
                  <DialogTitle>{t("editHotelFormTitle")}</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label={t("editHotelFormName")}
                      type="text"
                      fullWidth
                      variant="standard"
                      value={hotelDetails.name}
                      onChange={(e) => setEditHotelName(e.target.value)}
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
                  {t("deleteHotelBtn")}{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            {hotelID}
          </Grid>
          {user &&
            !loading &&
            camps.length > 0 &&
            camps.map((camp) => {
              return (
                <Grid
                  key={camp._id}
                  item
                  sm={12}
                  md={3}
                  onClick={(e) => openCamp(camp._id)}
                >
                  <Camp name={camp.name} />
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

export default connect(mapStateToProps, {})(HotelDetail);

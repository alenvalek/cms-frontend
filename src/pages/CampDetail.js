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
import axios from "axios";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Object from "../components/Object";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loadUser } from "../actions/auth";

const CampDetail = ({ user, loading, loadUser }) => {
  const { kampID, hotelID } = useParams();
  const [campDetails, setCampDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newObjectNaziv, setNewObjectNaziv] = useState("");
  const [newObjectPovrsina, setNewObjectPovrsina] = useState("");
  const [newObjectTip, setNewObjectTip] = useState("");
  const [newObjectDimenzije, setNewObjectDimenzije] = useState("");
  const [newObjectOpis, setNewObjectOpis] = useState("");
  const dispatch = useDispatch();
  const [objects, setObjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCampDetails = async () => {
      const res = await axios.get(`/api/camps/${kampID}`);
      setCampDetails(res.data);
    };
    getCampDetails();
  }, []);

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

  const handleBack = () => {
    navigate(`/hoteli/${hotelID}`);
  };

  const handleClose = (e) => {
    setModalVisible(!modalVisible);
    setNewObjectNaziv("");
  };

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post("http://localhost:5000/api/objects", {
        naziv: newObjectNaziv,
        povrsina: newObjectPovrsina,
        tip: newObjectTip,
        dimenzije: newObjectDimenzije,
        opis: newObjectOpis,
        hotel: hotelID,
        camp: kampID,
      });
      setObjects([...objects, res.data]);
      setModalVisible(!modalVisible);
      setNewObjectNaziv("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchObjects = () => {
    let campObjects = user.userWorkspaces.objects.filter(
      (object) => object.camp == kampID
    );
    setObjects(campObjects);
  };

  useEffect(() => {
    dispatch(loadUser);
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
              Nazad
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
                  Dodaj novi objekt
                </Button>
                <Dialog open={modalVisible} onClose={handleClose}>
                  <DialogTitle>Dodavanje novog objekta</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Naziv novog objekta"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newObjectNaziv}
                      onChange={(e) => setNewObjectNaziv(e.target.value)}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Površina objekta"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newObjectPovrsina}
                      onChange={(e) => setNewObjectPovrsina(e.target.value)}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Tip objekta"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newObjectTip}
                      onChange={(e) => setNewObjectTip(e.target.value)}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Dimenzije objekta"
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
                      label="Opis objekta"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newObjectOpis}
                      onChange={(e) => setNewObjectOpis(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      fullWidth
                    >
                      Kreiraj
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
                  Obriši kamp{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid md={12}>{kampID}</Grid>
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

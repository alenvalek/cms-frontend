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

  const [editObjectName, setEditObjectName] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);

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
    setEditObjectName("");
  };

  const handleEdit = async (e) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/objects/${objektID}`,
        {
          name: editObjectName,
          id: kampID,
        }
      );
      setObject([...object, res.data]);
      this.objectInfo.name = editObjectName;
      setEditModalVisible(!editModalVisible);
      setEditObjectName("");
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
          <DialogTitle>{t("editObjectFormTitle")}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label={t("editObjectFormName")}
              type="text"
              fullWidth
              variant="standard"
              value={editObjectName}
              onChange={(e) => setEditObjectName(e.target.value)}
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

import "../App.css";
import { Grid, Typography } from "@mui/material";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const Home = ({ user }) => {
  const [objectCount, setObjectCount] = useState(0);

  useEffect(() => {
    if (user) {
      let amountOfParcels = user.userWorkspaces.objects.length;
      setObjectCount(amountOfParcels);
    }
  }, [user]);

  return (
    <Grid container flexDirection="column" alignItems="center" spacing={2}>
      <Typography variant="h3">Dashboard</Typography>
      <Typography variant="h5">
        Broj dopuštenih objekata: {objectCount}
      </Typography>
      {/* ispod ovog ide karta ? */}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Home);

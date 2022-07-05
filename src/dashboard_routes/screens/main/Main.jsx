import React, { useEffect } from "react";
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Container from '@mui/material/Container';
// import ChartComponent from "../../../components/ChartComponent";
// import PieChart from "../../../components/PieChart";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/users")
    document.title = "Go Healthy"
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <React.Fragment>
      {/* <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
          <Grid container spacing={3} sx={{ minWidth: 888 }}>
            <Grid item sx={{mr: 4 }}>
              <Paper
                sx={{
                  p: 2,
                  height: 400,
                  width: 500
                }}
              >
                <ChartComponent />
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  height: 320,
                  width: 300,
                }}
              >
                <PieChart />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box> */}
    </React.Fragment>
  );
};

export default Main;

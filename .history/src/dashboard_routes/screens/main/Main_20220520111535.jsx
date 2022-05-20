import React, { useEffect } from "react";
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ChartComponent from "../../../components/ChartComponent";
import PieChart from "../../../components/PieChart";

const Main = () => {
  useEffect(() => {
    document.title = "Go Healthy"
  }, [])
  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          // flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {/* make tool bar */}
        {/* <Toolbar /> */}
        <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
          <Grid container spacing={3} sx={{ minWidth: 888 }}>
            {/* Chart */}
            <Grid item sx={{mr: 4 }}>
              <Paper
                sx={{
                  p: 2,
                  height: 400,
                  width: 500
                }}
              >
                {/* chart component */}
                <ChartComponent />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  height: 320,
                  width: 300,
                }}
              >
                {/* deposit component */}
                <PieChart />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                {/* orders component */}
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Main;

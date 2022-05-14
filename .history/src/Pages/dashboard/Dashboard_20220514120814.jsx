import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { func } from "../../functions";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ListItems from "../../components/ListItems";
import Controler from "../../dashboard_routes/index";
import { FaHospital } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.userData);

  const [open, setOpen] = useState(true);
  const mdTheme = createTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  // const Drawer = styled(MuiDrawer, {
  //   shouldForwardProp: (prop) => prop !== "open",
  // })(({ theme, open }) => ({
  //   "& .MuiDrawer-paper": {
  //     position: "relative",
  //     whiteSpace: "nowrap",
  //     backgroundColor: "#5c9499",
  //     width: drawerWidth,
  //     transition: theme.transitions.create('width', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.enteringScreen,
  //     }),
  //     boxSizing: "border-box",
  //     ...(!open && {
  //       overflowX: "hidden",
  //       transition: theme.transitions.create("width", {
  //         easing: theme.transitions.easing.sharp,
  //         duration: theme.transitions.duration.leavingScreen,
  //       }),
  //       width: theme.spacing(7),
  //       [theme.breakpoints.up("sm")]: {
  //         width: theme.spacing(9),
  //       },
  //     }),
  //   },
  // }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        backgroundColor: "#5c9499",
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", zIndex: 1 }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ zIndex: 2 }}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: "teal" }} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="teal"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              color="teal"
              sx={{ fontSize: 16, textTransform: "capitalize" }}
            >
              {userDetails.access.name}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => func.deactivateUser(dispatch)}
            >
              <AccountCircleRoundedIcon
                style={{ color: "#999", fontSize: 33 }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ zIndex: 1 }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [1],
            }}
          >
            <Box
              component="div"
              sx={{ display: "flex", alignItems: "center", pl: 2 }}
            >
              <FaHospital className="__site_logo" />
              <Typography
                variant="h6"
                color="#fff"
                sx={{ ml: 1, fontSize: 16 }}
              >
                GO HEALTHY
              </Typography>
            </Box>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems />
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/* dashboard contents will be routed from this container */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Controler />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;

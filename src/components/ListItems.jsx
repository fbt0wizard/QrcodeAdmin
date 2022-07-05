import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from "react-router-dom";

const ListItems = () => {

  return (
    <React.Fragment>
      {/* <NavLink
        className={({ isActive }) => (isActive ? "__clicked" : "__not_active")}
        to="/"
      >
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </NavLink> */}
      <NavLink
        className={({ isActive }) => (isActive ? "__clicked" : "__not_active")}
        to="/users"
      >
        <ListItemButton>
          <ListItemIcon>
            <PeopleAltRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "__clicked" : "__not_active")}
        to="/products"
      >
        <ListItemButton>
          <ListItemIcon>
            <InventoryRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "__clicked" : "__not_active")}
        to="/transfer"
      >
        <ListItemButton>
          <ListItemIcon>
            <CurrencyExchangeIcon />
          </ListItemIcon>
          <ListItemText primary="Transfers" />
        </ListItemButton>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "__clicked" : "__not_active")}
        to="/qrcode"
      >
        <ListItemButton>
          <ListItemIcon>
            <QrCode2RoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Generate QR" />
        </ListItemButton>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "__clicked" : "__not_active")}
        to="/settings"
      >
        <ListItemButton>
          <ListItemIcon>
            <SettingsApplicationsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </NavLink>
    </React.Fragment>
  );
};

export default ListItems;

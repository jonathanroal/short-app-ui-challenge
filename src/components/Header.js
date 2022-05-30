import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import smolIcon from "../assets/fullSmol.png";
import "../styles/Header.css";

// Renders header text and logo
export default function Header() {
  return (
    <Grid
      className="header"
      item
      container
      xs={12}
      style={{ marginTop: "50px" }}
    >
      <Typography
        variant="h1"
        style={{ color: "#606669", fontSize: "5vw", alignSelf: "center" }}
      >
        SMOL URL Shortener
      </Typography>
      <img className="smol" src={smolIcon} alt="smol icon" />
    </Grid>
  );
}

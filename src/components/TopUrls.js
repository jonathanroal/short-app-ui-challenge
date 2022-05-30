/* eslint-disable no-unused-vars */
import { Grid, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import "../styles/TopUrls.css";
import React from "react";

const TopUrls = (props) => {
  const { topUrls } = props;

  // Renders header for the Top 100 URLs table
  const header = () => {
    return (
      <Grid
        item
        container
        xs={12}
        sx={{
          marginTop: "5px",
          padding: "5px",
          backgroundColor: "#ebeff0",
          borderRadius: "5px",
        }}
      >
        <Grid item xs={6} textAlign="center">
          <Typography noWrap>TITLE</Typography>
        </Grid>
        <Grid item xs={5} textAlign="center">
          <Typography noWrap>URL</Typography>
        </Grid>
        <Grid item xs={1} textAlign="center">
          <Typography noWrap>CLICKS</Typography>
        </Grid>
      </Grid>
    );
  };

  // Renders row elements with the given URL data
  const row = (url) => {
    const parsedUrl = JSON.parse(url);
    return (
      <Box
        component={Grid}
        item
        container
        xs={12}
        sx={{ borderBottom: 3, borderColor: "#ebeff0", marginTop: "20px" }}
      >
        <Box
          component={Grid}
          item
          xs={6}
          textAlign="left"
          sx={{ borderRight: 3, borderColor: "#ebeff0" }}
        >
          <Typography noWrap>{parsedUrl.title}</Typography>
        </Box>
        <Box
          component={Grid}
          item
          xs={5}
          textAlign="left"
          sx={{
            borderRight: 3,
            borderColor: "#ebeff0",
            paddingLeft: "5px",
          }}
        >
          <Typography noWrap>{parsedUrl.full_url}</Typography>
        </Box>
        <Box component={Grid} item xs={1} textAlign="center">
          <Typography noWrap>{parsedUrl.click_count}</Typography>
        </Box>
      </Box>
    );
  };

  // Renders table with the top 100 URLs clicked, renders placeholder text if no URLs are available
  return (
    <Grid item xs={12} style={{ marginTop: "50px", marginBottom: "50px" }}>
      <Box
        className="container"
        sx={{
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" style={{ color: "#606669" }}>
          {topUrls.length
            ? "Top 100 clicked URLs"
            : "No URLs have been shortened yet!"}
        </Typography>
        {topUrls.length > 0 && (
          <div>
            {header()}
            {React.Children.toArray(topUrls.map(row))}
          </div>
        )}
      </Box>
    </Grid>
  );
};

TopUrls.propTypes = {
  topUrls: PropTypes.array,
};

export default TopUrls;

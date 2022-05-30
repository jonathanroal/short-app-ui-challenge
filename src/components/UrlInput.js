/* eslint-disable no-unused-vars */
import { Button, ButtonBase, Grid, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import validator from "validator";
import "../styles/UrlInput.css";
import PropTypes from "prop-types";

const UrlInput = (props) => {
  const { api, fetchTop } = props;
  const [error, setError] = useState(false); // Error flag
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [urlGenerated, setUrlGenerated] = useState(false); // URL Generated flag
  const [loading, setLoading] = useState(false); // Loading animation flag
  const [urlField, setUrlField] = useState(""); // URL field variable
  const [shortUrl, setShortUrl] = useState(""); // Short URL field variable
  const [copiedMessage, setCopiedMessage] = useState("Click to copy!"); // Copy Short URL tooltip message

  // Sends POST request to generate new short URL and returns response
  const generateUrl = async () => {
    const res = await api.post("/short_urls.json", `full_url=${urlField}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res;
  };

  // Generate URL click handler
  const onShortenClick = async () => {
    // Checks the URL is valid before sending
    if (validator.isURL(urlField)) {
      setError(false); // Sets error to false in case it had been changed to true
      setErrorMessage(""); // Resets error message
      setLoading(true); // Starts loading animation for button
      const res = await generateUrl(); // Makes generate URL request
      fetchTop(); // Updates top 100 URLs with new URL
      setShortUrl(res.data.short_code); // Sets newly generated URL
      setLoading(false); // Stops loading animation
      setUrlGenerated(true); // Sets flag that indicates a URL has been generated to true
    } else {
      setError(true); // Sets error flag to true
      setErrorMessage("Invalid URL!"); // Sets error message
    }
  };

  // Handler method for URL input field
  const handleChangeUrlField = (e) => {
    setUrlField(e.target.value);
  };

  // Resets all fields
  const resetPage = () => {
    setUrlGenerated(false);
    setUrlField("");
    setShortUrl("");
    setCopiedMessage("Click to copy!");
  };

  return (
    <Grid item xs={12} style={{ marginTop: "50px" }}>
      <Box
        sx={{
          margin: "auto",
          padding: "20px",
          width: "80%",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: 3,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="top"
            justifyContent="center"
          >
            <TextField
              id="url-field"
              label="Insert your full URL here"
              variant="outlined"
              fullWidth
              style={{ marginRight: "20px" }}
              error={error}
              helperText={errorMessage}
              value={urlField}
              onChange={handleChangeUrlField}
              disabled={urlGenerated}
            />
            <LoadingButton
              disabled={urlGenerated}
              onClick={onShortenClick}
              loading={loading}
              variant="contained"
              style={{ height: "50px" }}
            >
              Shorten
            </LoadingButton>
          </Grid>
          {urlGenerated && (
            <Grid
              style={{ marginTop: "20px" }}
              item
              xs={12}
              display="flex"
              alignItems="top"
              justifyContent="space-between"
            >
              <Tooltip title={copiedMessage}>
                <ButtonBase
                  className="short-url"
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl); // Copy text to clipboard
                    setCopiedMessage("Copied!"); // Updates tooltip message
                  }}
                >
                  <Box
                    fontWeight="fontWeightBold"
                    textAlign="left"
                    sx={{
                      padding: "16px",
                      width: "100%",
                      backgroundColor: "#f2f2f2",
                      borderRadius: "10px",
                      boxShadow: 3,
                    }}
                  >
                    {shortUrl}
                  </Box>
                </ButtonBase>
              </Tooltip>

              <Button
                variant="outlined"
                onClick={resetPage}
                style={{ marginLeft: "30px", height: "50px" }}
              >
                Shorten new URL
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

UrlInput.propTypes = {
  api: PropTypes.func,
  fetchTop: PropTypes.func,
};

export default UrlInput;

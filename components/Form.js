import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const Form = ({ title, api }) => {
  const [formData, setFormData] = useState({
    title: "",
    tagNames: "",
    description: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // can be 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api, formData);

      if (response.status === 201) {
        setSnackbarMessage("Blog posted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        // Reset form
        setFormData({
          title: "",
          tagNames: "",
          description: "",
        });
      }
    } catch (error) {
      setSnackbarMessage("Error posting blog");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Title Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                value={formData.title}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    color: "#fff", // Input text color
                    border: "1px solid #fff", // White border
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff", // Label color
                  },
                }}
              />
            </Grid>

            {/* Tag Names Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tagNames"
                label="Tag Separated By Comma"
                name="tagNames"
                autoComplete="tagNames"
                value={formData.tagNames}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    color: "#fff",
                    border: "1px solid #fff",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                  },
                }}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Blog Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    color: "#fff",
                    border: "1px solid #fff",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                  },
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Snackbar for Success/Error Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Form;

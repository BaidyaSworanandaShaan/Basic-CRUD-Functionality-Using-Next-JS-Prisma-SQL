// components/ModalForm.js
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const ModalForm = ({ open, handleClose, blogData, handleUpdate }) => {
  const [formData, setFormData] = useState(
    blogData || { title: "", tagNames: "", description: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await handleUpdate(formData);
      handleClose();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Blog</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Tag Names (comma separated)"
          type="text"
          fullWidth
          name="tagNames"
          value={formData.tagNames}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;

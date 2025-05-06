import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";

const initialCourses = [
  { id: 1, name: "Computer Science", university: "ITM Dehradun", duration: "4 Years" },
  { id: 2, name: "BBA", university: "ITM Dehradun", duration: "3 Years" },
];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState({ name: "", university: "", duration: "" });

  const handleOpen = (course = null) => {
    setEditingCourse(course);
    setForm(course || { name: "", university: "", duration: "" });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setForm({ name: "", university: "", duration: "" });
    setEditingCourse(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingCourse) {
      // Edit
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...c, ...form } : c))
      );
    } else {
      // Add
      const newCourse = { id: Date.now(), ...form };
      setCourses((prev) => [...prev, newCourse]);
    }
    handleClose();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Courses</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>University</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.university}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(course)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No courses available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{editingCourse ? "Edit Course" : "Add Course"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            name="name"
            label="Course Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="university"
            label="University"
            value={form.university}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="duration"
            label="Duration"
            value={form.duration}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingCourse ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses;

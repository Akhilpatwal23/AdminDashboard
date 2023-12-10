import React from 'react'

import  { useState,useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Button,
  Dialog,

  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';



const initialFormData = {
  Student_Name: '',
  number: '',
  graduationPercentage: '',
  Status: '', 
  resumeUrl:``
};


const tasks = [
  {
    id: 15011,
    Student_Name: 'Akhil',
    number: 8767565536,
    graduationPercentage: '80',
    Status:'Unverified',
    resumeUrl:`https://drive.google.com/file/d/1xrV8y_wOD0e4ZOOKhZPvy9c7R_adZGmt/view?usp=sharing`
  },
  {
    id: 15023,
    Student_Name: 'Ankit',
    number: 8967564536,
    graduationPercentage: '90',
    Status:'Verified',
    resumeUrl:``
  },
  {
    id: 15175,
    Student_Name: 'Karan',
    number: 9267344536,
    graduationPercentage: '92',
    Status:'Unverified',
    resumeUrl:``
  },
  {
    id: 15159,
    Student_Name: 'Ayush',
    number: 8287562336,
    graduationPercentage: '85',
    Status:'',
    resumeUrl:``
  }];

const  StudentProfile= () =>  {
    const [originalData, setOriginalData] = useState(tasks);
    const [data, setData] = useState(tasks);
    const [formData, setFormData] = useState(initialFormData);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [resumeUrl, setResumeUrl] = useState('');

    const handleCreate = () => {
      const newItem = {
        id: data.length + 1,
        Student_Name: formData.Student_Name,
        number: formData.number,
        resumeUrl: formData.resumeUrl,
        graduationPercentage: formData.graduationPercentage,
        Status: formData.Status,
      };
  
      setData((prevData) => [...prevData, newItem]);
      setOriginalData((prevOriginalData) => [...prevOriginalData, newItem]);
  
      setDialogOpen(false);
      setFormData(initialFormData);
    };
  
    const handleUpdate = () => {
      const updatedItem = {
        id: selectedId,
        Student_Name: formData.Student_Name,
        number: formData.number,
        resumeUrl: formData.resumeUrl,
        graduationPercentage: formData.graduationPercentage,
        Status: formData.Status,
      };
  
      setData((prevData) =>
        prevData.map((item) => (item.id === selectedId ? updatedItem : item))
      );
  
      setOriginalData((prevOriginalData) =>
        prevOriginalData.map((item) => (item.id === selectedId ? updatedItem : item))
      );
  
      setDialogOpen(false);
      setFormData(initialFormData);
      setSelectedId(null);
    };
  
    const handleDelete = (id) => {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      setOriginalData(updatedData);
    };
  
    const handleEdit = (id) => {
      const selectedItem = data.find((item) => item.id === id);
      setFormData({
        Student_Name: selectedItem.Student_Name,
        number: selectedItem.number,
        graduationPercentage:  selectedItem.graduationPercentage,
        Status: selectedItem.Status,
      });
      setSelectedId(id);
      setDialogOpen(true);
    };
  
    const handleOpenDialog = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
      setFormData(initialFormData);
      setSelectedId(null);
    };
  
    const handleSave = () => {
      // Update the original data with the modified data
      setOriginalData([...data]);
      // Close the dialog and reset the form
      setDialogOpen(false);
      setFormData(initialFormData);
      setSelectedId(null);
    };
  
    return (
        <Box
    sx={{
      flex: 1,
      marginTop: '80px',
    
      marginLeft: '10px',
      marginRight: '10px',
      bgcolor: '#0F1924',
      height: 'auto', // Adjust the height as needed
      borderRadius: '10px',
      maxHeight:'800px',
      padding:'45px',
      display: 'flex',
      flexDirection: 'column',
      // Center content vertically
    }}
    >
      <div >
        <div style={{ marginTop: '1px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', color: 'white' }}>Student Profile</h1>
        </div>
  
        <div style={{ marginBottom: '16px' }}>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Create
          </Button>
        </div>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Roll No.</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Student Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Number </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Resume</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Graduation (%) </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {originalData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.Student_Name}</TableCell>
                  <TableCell>{row.number}</TableCell>
                          <TableCell>
                    {/* Display the file icon as a link to the resume PDF */}
                        <a href={row.resumeUrl} target="_blank" >
                        <Button startIcon={<DescriptionIcon />} color="primary">
                            Resume
                        </Button>
                        </a>
                </TableCell>
                  <TableCell>
                    {/* Editable input for Date Created */}
                      {row.graduationPercentage}
                  </TableCell>
                  <TableCell>
                    {/* Editable input for Status */}
                    <TextField
                      select
                      value={row.Status}
                      onChange={(e) => {
                        const updatedItem = { ...row, Status: e.target.value };
                        setOriginalData((prevOriginalData) =>
                          prevOriginalData.map((item) => (item.id === row.id ? updatedItem : item))
                        );
                      }}
                    >
                      <MenuItem value="Unverified">Unverified</MenuItem>
                      <MenuItem value="Verified">Verified</MenuItem>
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(row.id)} color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(row.id)} color="secondary">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Apply
          </Button>
        </div>
  
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
  <DialogTitle>{selectedId ? 'Edit Student Details' : 'Add Student Details'}</DialogTitle>
  <DialogContent style={{ margin: '20px' }}>
    <TextField style={{ marginTop: '8px' }}
      label="Student Name"
      value={formData.Student_Name}
      onChange={(e) => setFormData({ ...formData, Student_Name: e.target.value })}
      fullWidth
    />
    <TextField style={{ marginTop: '10px' }}
      label="Number"
      value={formData.number}
      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
      fullWidth
    />
    <TextField
        style={{ marginTop: '10px' }}
        label="Resume Link"
        value={formData.resumeUrl}
        onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
        fullWidth
    />
    {/* Editable input for Date Created in the dialog */}
    <TextField
        style={{ marginTop: '10px' }}
        label="Graduation (%)"
        value={formData.graduationPercentage}
        onChange={(e) => setFormData({ ...formData, graduationPercentage: e.target.value })}
        fullWidth
    />
    {/* Editable input for Status in the dialog */}
    <TextField style={{ marginTop: '10px' }}
      label="Status"
      select
      value={formData.Status}
      onChange={(e) => setFormData({ ...formData, Status: e.target.value })}
      fullWidth
    >
        <MenuItem value="Unverified">Unverified</MenuItem>
        <MenuItem value="Verified">Verified</MenuItem>
    </TextField>
    
  </DialogContent>
  <DialogActions>
    <Button onClick={selectedId ? handleUpdate : handleCreate} color="primary">
      {selectedId ? 'Update' : 'Create'}
    </Button>
    <Button onClick={handleCloseDialog} color="secondary">
      Cancel
    </Button>
  </DialogActions>
</Dialog>
      </div>

      </Box>
 );
}

export default StudentProfile;

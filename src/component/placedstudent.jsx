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


const initialFormData = {
  Student_Name: '',
  company: '',
  dateCreated: '',
  Package: '', 
};


const tasks = [
  {
    id: 15011,
    Student_Name: 'Akhil',
    company: 'HCL',
    dateCreated: new Date(),
    Package:'12 LPA'
  },
  {
    id: 15023,
    Student_Name: 'Ankit',
    company: 'Infosys',
    dateCreated: new Date(),
    Package:'19 LPA'
  },
  {
    id: 15175,
    Student_Name: 'Karan',
    company: 'Tech Mahindra',
    dateCreated: new Date(),
    Package:'18 LPA'
  },
  {
    id: 15159,
    Student_Name: 'Ayush',
    company: 'Capegemini',
    dateCreated: new Date(),
    Package:'20.8 LPA'
  }
  
];


function PlacedStudent() {
    const [originalData, setOriginalData] = useState(tasks);
    const [data, setData] = useState(tasks);
    const [formData, setFormData] = useState(initialFormData);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleCreate = () => {
      const newItem = {
        id: data.length + 1,
        Student_Name: formData.Student_Name,
        company: formData.company,
        dateCreated: new Date(formData.dateCreated),
        Package: formData.Package,
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
        company: formData.company,
        dateCreated: new Date(formData.dateCreated),
        Package: formData.Package,
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
        company: selectedItem.company,
        dateCreated: selectedItem.dateCreated.toISOString().split('T')[0],
        Package: selectedItem.Package,
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
          <h1 style={{ fontFamily: 'Poppins, sans-serif', color: 'white' }}>Placed Student</h1>
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
                <TableCell style={{ fontWeight: 'bold' }}>Company Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Date Placed </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Package</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {originalData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.Student_Name}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>
                    {/* Editable input for Date Created */}
                    <TextField
                      type="date"
                      value={row.dateCreated.toISOString().split('T')[0]}
                      onChange={(e) => {
                        const updatedDate = new Date(e.target.value + 'T00:00:00');
                        const updatedItem = { ...row, dateCreated: updatedDate };
                        setOriginalData((prevOriginalData) =>
                          prevOriginalData.map((item) => (item.id === row.id ? updatedItem : item))
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {/* Editable input for Package */}
                    {row.Package}
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
      label="Company"
      value={formData.company}
      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      fullWidth
    />
    {/* Editable input for Date Created in the dialog */}
    <TextField style={{ marginTop: '10px' }}
     
      type="date"
      value={formData.dateCreated}
      onChange={(e) => setFormData({ ...formData, dateCreated: e.target.value })}
      fullWidth
    />
    {/* Editable input for Package in the dialog */}
    <TextField style={{ marginTop: '10px' }}
      label="Package"
      value={formData.Package}
      onChange={(e) => setFormData({ ...formData, Package: e.target.value })}
      fullWidth
    />
    
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

export default PlacedStudent;

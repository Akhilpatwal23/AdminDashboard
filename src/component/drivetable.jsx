  import React from 'react'

  import  { useState,useEffect } from 'react';
  import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
    Drive_Name: '',
    role: '',
    dateCreated: '',
    status: 'Unverified', 
  };


  const tasks = [
    {
      id: 1,
      Drive_Name: 'HCL',
      role: ' Python Developer, Web Developer,Software Engineer/Developer',
      dateCreated: new Date(),
      status:'Verified'
    },
    {
      id: 2,
      Drive_Name: 'Infosys',
      role: 'SDE,Computer Systems Analyst',
      dateCreated: new Date(),
      status:'Verified'
    },
    {
      id: 3,
      Drive_Name: 'Tech Mahindra',
      role: '  Java Developer Intern ,Information Security Analyst ',
      dateCreated: new Date(),
      status:'Unverified'
    },
    {
      id: 4,
      Drive_Name: 'Capegemini',
      role: ' QA Analyst,Data Scientist',
      dateCreated: new Date(),
      status:''
    },
    {
      id: 5,
      Drive_Name: 'Wipro',
      role: 'SDE (Software Development Engineering) , SRE (Site Reliability Engineering)',
      dateCreated: new Date(),
      status:''
    },
  ];


  const Drivetable = () => {
    const [originalData, setOriginalData] = useState(tasks);
    const [data, setData] = useState(tasks);
    const [formData, setFormData] = useState(initialFormData);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleCreate = () => {
      const newItem = {
        id: data.length + 1,
        Drive_Name: formData.Drive_Name,
        role: formData.role,
        dateCreated: new Date(formData.dateCreated),
        status: formData.status,
      };
  
      setData((prevData) => [...prevData, newItem]);
      setOriginalData((prevOriginalData) => [...prevOriginalData, newItem]);
  
      setDialogOpen(false);
      setFormData(initialFormData);
    };
  
    const handleUpdate = () => {
      const updatedItem = {
        id: selectedId,
        Drive_Name: formData.Drive_Name,
        role: formData.role,
        dateCreated: new Date(formData.dateCreated),
        status: formData.status,
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
        Drive_Name: selectedItem.Drive_Name,
        role: selectedItem.role,
        dateCreated: selectedItem.dateCreated.toISOString().split('T')[0],
        status: selectedItem.status,
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
      <div >
        <div style={{ marginTop: '1px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', color: 'white' }}>Active Drive</h1>
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
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Drive Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Date </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {originalData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.Drive_Name}</TableCell>
                  <TableCell>{row.role}</TableCell>
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
                    {/* Editable input for Status */}
                    <TextField
                      select
                      value={row.status}
                      onChange={(e) => {
                        const updatedItem = { ...row, status: e.target.value };
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
  <DialogTitle>{selectedId ? 'Edit Drive Details' : 'Add Drive Details'}</DialogTitle>
  <DialogContent style={{ margin: '20px' }}>
    <TextField style={{ marginTop: '8px' }}
      label="Drive Name"
      value={formData.Drive_Name}
      onChange={(e) => setFormData({ ...formData, Drive_Name: e.target.value })}
      fullWidth
    />
    <TextField style={{ marginTop: '10px' }}
      label="Role"
      value={formData.role}
      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      fullWidth
    />
    {/* Editable input for Date Created in the dialog */}
    <TextField style={{ marginTop: '10px' }}
     
      type="date"
      value={formData.dateCreated}
      onChange={(e) => setFormData({ ...formData, dateCreated: e.target.value })}
      fullWidth
    />
    {/* Editable input for Status in the dialog */}
    <TextField style={{ marginTop: '10px' }}
      label="Status"
      select
      value={formData.status}
      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
    );
  }
  
  export default Drivetable;
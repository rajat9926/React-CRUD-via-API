import {
  Typography,
  Box,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { cyan, green, orange } from "@mui/material/colors";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const Home = () => {
  const [students, setStudent] = useState([]);
  const [studata, setStudata] = useState({});
  const [status, setStatus] = useState();
  
  useEffect(() => { getAllstudents() }, [])
  
  async function getAllstudents() {
    try {
      let students = await axios.get("http://localhost:333/students")
      setStudent(students.data);
    }
    catch (error) {
      console.log(error);
    }
  };
  
  function handleChange(e) {
    setStudata({ ...studata,[e.target.name]:e.target.value})
  }
  
  function handleSubmit(e){
    e.preventDefault()
    axios.post("http://localhost:333/students",studata)
    setStatus(true)
  }

  
  if(status){
    return <Home/>
  }
  

  async function handleDelete(id) {
    await axios.delete(`http://localhost:333/students/${id}`).then(()=>{getAllstudents()})
    
  }

  return (
    <>
      <Box sx={{ textAlign: "center", backgroundColor: cyan[400], padding: 1, margin: 1 }}>
        <Typography variant="h2">React API & MUI Project</Typography>
      </Box>

      <Grid container spacing={1} padding={1}>
        <Grid item md={6}>
          <Box sx={{ textAlign: 'center', backgroundColor: green[300], marginBottom: 1 }}>
            <Typography variant="h4">Add Students</Typography>
          </Box>
          <form onSubmit={(e)=>{handleSubmit(e)}}>
            <Grid container direction={'column'} spacing={2}>
              <Grid item>
                <TextField required onChange={(e) => handleChange(e)} variant="outlined" label="Name" fullWidth autoFocus name='name' id='stuname' />
              </Grid>
              <Grid item>
                <TextField required onChange={(e) => handleChange(e)} variant="outlined" label="Email" fullWidth autoFocus name='email' id='stuemail' />
              </Grid>
            </Grid>
            <Box textAlign={"center"} m={1}>
              <Button type="submit" variant="contained" color="primary" fullWidth>Add</Button>
            </Box>
          </form>
        </Grid>

        <Grid item md={6} >
          <Box sx={{ textAlign: 'center', backgroundColor: orange[300] }}>
            <Typography variant="h4">Students Details</Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: 'cyan' }}>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((stu, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="center">{stu.name}</TableCell>
                      <TableCell align="center">{stu.id}</TableCell>
                      <TableCell align="center">{stu.email}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="edit"><IconButton><Link to={`/edit/${stu.id}`}><EditIcon /></Link></IconButton></Tooltip>
                        <Tooltip title="show"><IconButton><Link to={`/view/${stu.id}`}><VisibilityIcon /></Link></IconButton></Tooltip>
                        <Tooltip title="delete"><IconButton onClick={()=>handleDelete(stu.id)}><Link to={`/delete/${stu.id}`}><DeleteIcon /></Link></IconButton></Tooltip>
                      </TableCell>
                    </TableRow>)
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
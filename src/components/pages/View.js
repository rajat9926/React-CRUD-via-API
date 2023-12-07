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
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { orange } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



function View() {

	const [stu,setStu] = useState([])

	let {id:o} = useParams()

	useEffect(() => {
			let a = axios.get(`http://localhost:333/students/${o}`).then((a)=>setStu(a.data)).catch((e)=>{console.log(e);})
		},[])

	return (
		<>
			<Grid container justifyContent='center'>
				<Grid item md={12} sm={12} xs={12}>
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
							</TableHead >
							<TableBody>
								<TableRow>
									<TableCell align="center">{o}</TableCell>
									<TableCell align="center">{stu.name}</TableCell>
									<TableCell align="center">{stu.email}</TableCell>
									<TableCell align="center">
										<Tooltip title="edit"><IconButton><Link to="/edit/1"><EditIcon /></Link></IconButton></Tooltip>
										<Tooltip title="delete"><IconButton><Link to="/delete/1"><DeleteIcon /></Link></IconButton></Tooltip>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</>
	);
};


export default View;
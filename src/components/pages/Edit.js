import {
	Typography,
	Box,
	Grid,
	TextField,
	Button,
} from "@mui/material";

import { cyan, green } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import Home from "./home";


function Edit() {
	// const [newdata, setnewdata] = useState({});
	const [olddata, setolddata] = useState({});
	const { id } = useParams()

	useEffect(() => {
	axios.get(`http://localhost:333/students/${id}`).then((res)=>{setolddata(res.data)}).catch((error)=>{console.log(error);})
},[])

async function handleEdit(e) {
	e.preventDefault()
	await axios.put(`http://localhost:333/students/${id}`, olddata).then(((res)=>{console.log("updated")}))
}

function handleChange(e) {
	setolddata({...olddata,[e.target.name]: e.target.value })
}

return (
	<>
		<Box sx={{ textAlign: "center", backgroundColor: cyan[400], padding: 1, margin: 1 }}>
			<Typography variant="h2">jhjhjh</Typography>
		</Box>

		<Grid container justifyContent={'center'} spacing={1} padding={1}>
			<Grid container direction={'column'} item md={6}>
				<Box sx={{ textAlign: 'center', backgroundColor: green[300], marginBottom: 1 }}>
					<Typography variant="h4">Add Students</Typography>
				</Box>
				<form noValidate>
					<Grid container direction={'column'} spacing={2}>
						<Grid item>
							<TextField variant="outlined" label="ID" fullWidth name='id' disabled id='stuid' value={id}/>
						</Grid>
						<Grid item>
							<TextField onChange={(e) => { handleChange(e) }} variant="outlined" label="Name" fullWidth autoFocus name='name' value={olddata.name} id='stuname'/>
						</Grid>
						<Grid item>
							<TextField onChange={(e) => { handleChange(e) }} variant="outlined" label="Email" fullWidth autoFocus name='email' value={olddata.email} id='stuemail' />
						</Grid>
					</Grid>
					<Box textAlign={"center"} m={1}>
						<Button type="submit" onClick={(e) => { handleEdit(e) }} variant="contained" color="primary" fullWidth>Update</Button>
					</Box>
				</form>
			</Grid>
		</Grid>
	</>
);
};


export default Edit;
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const InputForm = ({ handleChange, label, type, ...otherProps }) => {
	return (
		<Box
			// component="form"
			sx={{
				"& > :not(style)": { m: 1, width: "30ch" },
			}}
			noValidate={false}
			autoComplete="off">
			<TextField
				id="outlined-basic"
				label={label}
				type={type}
				variant="outlined"
				onChange={handleChange}
				{...otherProps}
			/>
			{/* <TextField id="filled-basic" label="Filled" variant="filled" />
			<TextField id="standard-basic" label="Standard" variant="standard" /> */}
		</Box>
	);
};

export default InputForm;

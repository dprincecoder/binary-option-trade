import * as React from "react";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

const InputCheckbox = ({ bool, color, onCheck, label }) => {
	return (
		<div>
			<Checkbox
				label={label}
				defaultChecked={bool}
				color={color}
				onChange={onCheck}
			/>
			{label}
		</div>
	);
};

export default InputCheckbox;

import React from "react";
import Button from "@mui/material/Button";

const ButtonHandler = ({
	text,
	handleClick,
	variant,
	color,
	themeColor,
	...otherProps
}) => {
	return (
		<Button
			onClick={handleClick}
			style={{ color: color }}
			color={themeColor}
			variant={variant}
			disableElevation
			{...otherProps}>
			{text}
		</Button>
	);
};

export default ButtonHandler;

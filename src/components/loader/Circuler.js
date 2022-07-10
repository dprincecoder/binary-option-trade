import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export const CircularSpiner = ({ color }) => {
  return (
    <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
      {/* <CircularProgress color="secondary" /> */}
      <CircularProgress color={color} />
      {/* <CircularProgress color="inherit" /> */}
    </Stack>
  );
};

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = ({ label, values, setValue }) => {
  const [currValue, setCurrValue] = React.useState("");

  const handleChange = (event) => {
    setCurrValue(event.target.value);
    setValue(values[event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        sx={{
          width: {
            xs: 250,
            md: 150,
            lg: 200,
            xl: 250,
          },
        }}
      >
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currValue}
          label={label}
          onChange={handleChange}
        >
          {values.map((item, index) => {
            return (
              <MenuItem value={index} key={index}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;

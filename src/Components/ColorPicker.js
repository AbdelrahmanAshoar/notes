import React, { useState } from "react";
import "./ColorPicker.css"; 

import { Button, Menu } from "./UIComponent";
import { EditOutlinedIcon } from "./icons";

const ColorPicker = ({ onColorSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [colorInput, setColorInput] = useState("white");
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const colors = [
    "#3B3B3B",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FFC233",
    "lightcyan",
    "lightskyblue",
    "lightsalmon",
    "lightseagreen",
    "lightyellow",
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color="info"
        sx={{ borderRadius: "20px" }}
        startIcon={<EditOutlinedIcon />}
      >
        Set Color
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ p: 0, m: 0 }}
      >
        <div className="color-picker">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-swatch ${selectedColor === color ? "selected" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => {
                handleColorClick(color);
                handleClose();
              }}
            ></div>
          ))}
          <div
            key={colorInput}
            className={`color-swatch ${selectedColor === colorInput ? "selected" : ""}`}
            style={{
              backgroundColor: colorInput,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              handleColorClick(colorInput);
              handleClose();
            }}
          >
            <EditOutlinedIcon fontSize="20px" />
          </div>
          <input
            type="color"
            style={{ height: "40px", flexGrow: "1" }}
            value={colorInput}
            onChange={(ev) => {
              setColorInput(ev.target.value);
            }}
          />
        </div>
      </Menu>
    </>
  );
};

export default ColorPicker;

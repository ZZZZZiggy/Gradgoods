import React from "react";
import { Person } from "@mui/icons-material";
import { Avatar } from "@mui/material";

function MyIcon() {
  return (
    <Avatar
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Person />
    </Avatar>
  );
}

export default MyIcon;

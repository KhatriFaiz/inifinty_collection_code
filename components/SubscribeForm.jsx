"use client";

import { Box, Button, InputBase } from "@mui/material";

const SubscribeForm = () => {
  return (
    <Box
      sx={{ display: "flex", gap: 2, justifyContent: "center", marginBlock: 5 }}
      component="form"
    >
      <InputBase
        sx={{
          background: "white",
          borderRadius: "8px",
          padding: "0 16px",
          height: "56px",
          maxWidth: "356px",
        }}
        placeholder="Your Email"
        type="email"
        fullWidth
      />
      <Button
        sx={{
          borderRadius: "8px",
          background: "black",
          color: "white",
          padding: "0 16px",
          height: "56px",
        }}
      >
        Subscribe
      </Button>
    </Box>
  );
};

export default SubscribeForm;

"use client";

import Image from "next/image";
import { useState } from "react";
import { Box, Stack, Grid } from "@mui/material";

const ProductImages = ({ images }) => {
  const [activeImage, setactiveImage] = useState(images[0]);

  const handleImageChange = (index) => {
    setactiveImage(images[index]);
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "500px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={activeImage}
          alt={"some dummy text"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
          fill
        ></Image>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={1}>
          {images.map((item, index) => (
            <Grid
              item
              xs={3}
              sx={{ aspectRatio: 1, position: "relative" }}
              key={index}
              onClick={() => handleImageChange(index)}
            >
              <Image
                src={item}
                alt={"some dummy text"}
                fill
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductImages;

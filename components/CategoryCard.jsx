import { Box, Typography } from "@mui/material";
import Image from "next/image";

const CategoryCard = ({ label, image }) => {
  return (
    <Box
      position="relative"
      display="grid"
      alignItems="end"
      sx={{
        "&::before": {
          width: "100%",
          height: "100%",
          position: "absolute",
          background: "linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0))",
          content: `""`,
          zIndex: -49,
        },
        aspectRatio: 1,
      }}
    >
      <Image
        src={image}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -99,
          objectFit: "cover",
        }}
        alt={label}
      />
      <Typography
        variant="subtitle1"
        sx={{ color: "white", textAlign: "center", flexShrink: 0 }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default CategoryCard;

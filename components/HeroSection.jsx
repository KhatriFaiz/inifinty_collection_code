import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import heroImage from "@/public/hero-image.jpg";

const HeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        height: "600px",
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
          zIndex: "-100",
        }}
      >
        <Image
          src={heroImage}
          priority
          alt="Homepage Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Container sx={{ paddingBlock: "40px" }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "2.75rem", sm: "3.75rem" },
          }}
          gutterBottom
        >
          Be Fashionable for
          <br />
          For Every Event
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "black",
            color: "white",
            "&:hover": { background: "white", color: "black" },
          }}
        >
          Shop Now
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;

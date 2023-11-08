import { Box, Container, Typography } from "@mui/material";
import SubscribeForm from "./SubscribeForm";

const SubscribeSection = () => {
  return (
    <Box sx={{ background: "#e1e1ff" }} component="section">
      <Container sx={{ display: "grid", paddingBlock: 8, marginTop: 8 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          component="h4"
          align="center"
          gutterBottom
        >
          Subscribe & Get 20% Off
        </Typography>
        <Typography variant="subtitle1" paragraph align="center" gutterBottom>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
          dolorem beatae excepturi perspiciatis quidem totam assumenda! Nobis
          corrupti sed consectetur eius?
        </Typography>
        <Box sx={{ dispaly: "flex", justifyContent: "center" }}>
          <SubscribeForm />
        </Box>
      </Container>
    </Box>
  );
};

export default SubscribeSection;

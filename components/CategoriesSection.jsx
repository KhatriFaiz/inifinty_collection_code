import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import cap from "@/public/cap.jpg";
import jeans from "@/public/jeans.jpg";
import shirt from "@/public/shirt.jpg";
import tshirt from "@/public/tshirt.jpg";
import shoes from "@/public/shoes.jpg";
import CategoryCard from "./CategoryCard";

const categories = [
  { label: "Cap", image: cap },
  { label: "Jeans", image: jeans },
  { label: "Shirt", image: shirt },
  { label: "T-Shirt", image: tshirt },
  { label: "Shoes", image: shoes },
];

const CategoriesSection = () => {
  return (
    <Box component="section">
      <Container sx={{ paddingBlock: 5 }}>
        <Grid container spacing={5}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={category.label}>
              <CategoryCard label={category.label} image={category.image} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoriesSection;

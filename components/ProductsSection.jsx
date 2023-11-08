import { limit } from "firebase/firestore";

import { Box, Container, Typography } from "@mui/material";
import ProductGrid from "./ProductGrid";
import { getProductsWithQuery } from "@/app/_lib/getProducts";

const ProductsSection = async () => {
  let products = await getProductsWithQuery(limit(8));

  return (
    <Box component="section">
      <Container sx={{ paddingBlock: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          textAlign={"center"}
          sx={{ marginBottom: 4 }}
          gutterBottom
        >
          Latest Products
        </Typography>
        <ProductGrid products={products} />
      </Container>
    </Box>
  );
};

export default ProductsSection;

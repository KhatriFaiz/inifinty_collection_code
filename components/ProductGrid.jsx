import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <Grid container spacing={5}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.title}>
          <ProductCard
            title={product.title}
            image={product.coverImage}
            price={product.price}
            discountPrice={product.discountPrice}
            slug={product.slug}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;

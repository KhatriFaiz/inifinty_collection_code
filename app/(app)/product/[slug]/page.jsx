import ProductGrid from "@/components/ProductGrid";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import ProductImages from "@/components/ProductImages";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getProductsWithQuery } from "@/app/_lib/getProducts";
import AddToCartButton from "@/components/AddToCartButton";

const Page = async ({ params }) => {
  //get main product of the page
  let product = {};
  let docId;

  const q = query(collection(db, "products"), where("slug", "==", params.slug));
  const productData = await getDocs(q);

  productData.forEach((doc) => {
    docId = doc.id;
    product = { ...doc.data() };
  });

  //get products for "latest products" section
  let products = await getProductsWithQuery(limit(4));

  return (
    <main>
      <Container sx={{ paddingBlock: 5 }}>
        <Grid container spacing={{ lg: 5 }} marginBottom={8}>
          <Grid item lg={6} sm={12} xs={12}>
            <ProductImages images={[product.coverImage, ...product.images]} />
          </Grid>
          <Grid item lg={6} sm={12}>
            <Typography variant="h3" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "end", gap: 3 }}>
              <Typography
                variant="h5"
                paragraph
                gutterBottom
                sx={{ color: "#ff8383" }}
              >
                {"₹" + product.discountPrice}
              </Typography>
              <Typography
                paragraph
                gutterBottom
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {"₹" + product.price}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} paddingY={3}>
              <AddToCartButton productId={docId} />
            </Stack>
            <Typography variant="h6" component="h3" gutterBottom>
              Descripiton
            </Typography>
            <Typography paragraph gutterBottom>
              {product.description}
            </Typography>
          </Grid>
        </Grid>
        <Box component="section" paddingY={5}>
          <Typography variant="h4" component="h3" gutterBottom>
            Latest Products
          </Typography>
          <ProductGrid products={products} />
        </Box>
      </Container>
    </main>
  );
};

export default Page;

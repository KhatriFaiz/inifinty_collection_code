import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Image from "next/image";
import Link from "next/link";
import { Typography } from "@mui/material";

const ProductCard = ({ discountPrice = null, title, image, price, slug }) => {
  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardActionArea component={Link} href={`/product/${slug}`}>
        <CardMedia
          sx={{
            height: "300px",
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src={image}
            style={{
              width: "100%",
              objectFit: "contain",
              objectPosition: "center",
              height: "100%",
            }}
            fill
            alt="products of this website"
          />
        </CardMedia>
        <CardContent sx={{ marginTop: 1 }}>
          <Typography
            gutterBottom
            variant="body"
            fontWeight={700}
            component="div"
          >
            {title}
          </Typography>
          {discountPrice ? (
            <>
              <Typography
                variant="subtitle1"
                component="span"
                color="#ff8383"
                sx={{ marginTop: "auto", display: "inline-block" }}
                paddingRight={1}
                fontWeight={600}
              >
                ₹{discountPrice}
              </Typography>
              <Typography
                color="text.secondary"
                variant="subtitle1"
                component="span"
                sx={{
                  textDecoration: "line-through",
                  fontSize: "14px",
                }}
              >
                ₹{price}
              </Typography>
            </>
          ) : (
            <Typography
              fontWeight={600}
              variant="subtitle1"
              component="span"
              color="#ff8383"
              sx={{ marginTop: "auto", display: "inline-block" }}
            >
              ₹{price}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

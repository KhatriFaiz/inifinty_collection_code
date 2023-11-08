import { Button, Container, Stack, Typography } from "@mui/material";
import SearchBox from "./SearchBox";
import NavDrawer from "./NavDrawer";
import AuthHandlers from "./AuthHandlers";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          alignItems="center"
          display="flex"
        >
          Infinity Collection
        </Typography>
        <SearchBox
          BoxSx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        />
        <Stack
          direction="row"
          gap={3}
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            component={Link}
            href="/cart"
            sx={{
              border: "1px solid #000",
              background: "#fff",
              color: "#000",
              "&:hover": {
                color: "#fff",
                background: "#000",
                border: "1px solid #000",
              },
            }}
          >
            Cart
          </Button>
          <AuthHandlers />
        </Stack>
        <NavDrawer />
      </Container>
      <Container
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          paddingBlock: 1,
        }}
      >
        <SearchBox fullWidth />
      </Container>
    </header>
  );
};

export default Header;

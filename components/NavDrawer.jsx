"use client";

import Link from "next/link";
import { UserContext } from "./AuthProvider";
import { useContext, useState } from "react";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { ButtonBase, Divider } from "@mui/material";

const navLinks = [
  { label: "home", href: "/" },
  { label: "My Orders", href: "/my-orders" },
];

const NavDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useContext(UserContext);
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Stack
      alignItems="center"
      direction="row"
      sx={{
        display: {
          xs: "flex",
          md: "none",
        },
      }}
      spacing={1.5}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          border: "1px solid #000",
          background: "#fff",
          color: "#000",
          "&:hover": {
            color: "#fff",
            background: "#000",
            border: "1px solid #000",
          },
          "&:hover path": {
            stroke: "#ffffff",
          },
          minWidth: "32px",
          height: "32px",
          display: "inline-block",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </Button>
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
          "&:hover path": {
            stroke: "#ffffff",
          },
          minWidth: "32px",
          height: "32px",
          display: "inline-block",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M4.78571 5H18.2251C19.5903 5 20.5542 6.33739 20.1225 7.63246L18.4558 12.6325C18.1836 13.4491 17.4193 14 16.5585 14H6.07142M4.78571 5L4.74531 4.71716C4.60455 3.73186 3.76071 3 2.76541 3H2M4.78571 5L6.07142 14M6.07142 14L6.25469 15.2828C6.39545 16.2681 7.23929 17 8.23459 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </Button>

      <Drawer
        anchor="left"
        sx={{ minWidth: "300px" }}
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        PaperProps={{
          sx: { minWidth: "230px" },
        }}
        disableScrollLock
      >
        {navLinks.map((link) => (
          <Box key={link.label}>
            <MuiLink
              component={Link}
              href={link.href}
              underline="none"
              sx={{
                paddingInline: 1,
                paddingBlock: 2,
                display: "inline-block",
                color: "#000",
              }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {link.label}
            </MuiLink>
            <Divider />
          </Box>
        ))}
        <Box
          sx={{
            paddingInline: 1,
            paddingBlock: 2,
            display: "inline-block",
          }}
        >
          {user ? (
            <ButtonBase
              sx={{ padding: "8px 16px", border: "1px solid black" }}
              onClick={handleLogout}
            >
              Logout
            </ButtonBase>
          ) : (
            <>
              <ButtonBase
                component={Link}
                href="/login"
                sx={{
                  padding: "8px 16px",
                  border: "1px solid black",
                  marginRight: 2,
                }}
              >
                Login
              </ButtonBase>
              <ButtonBase
                component={Link}
                href="/signup"
                sx={{ padding: "8px 16px", border: "1px solid black" }}
              >
                Signup
              </ButtonBase>
            </>
          )}
        </Box>
      </Drawer>
    </Stack>
  );
};

export default NavDrawer;

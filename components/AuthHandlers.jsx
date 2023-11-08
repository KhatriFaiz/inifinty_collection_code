"use client";

import { useContext, useState } from "react";
import { UserContext } from "./AuthProvider";
import { Button, ButtonBase, Menu, MenuItem } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";
import Image from "next/image";

import accountImage from "@/public/account.svg";

const UserMenu = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonBase
        sx={{
          width: "32px",
          height: "32px",
          border: "1px solid #000",
          borderRadius: "4px",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Image src={accountImage} width={24} height={24} alt="User Menu" />
      </ButtonBase>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} component={Link} href="/my-orders">
          My orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

const AuthHandlers = () => {
  const user = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth);
  };

  return user ? (
    <>
      <UserMenu handleLogout={handleLogout} />
    </>
  ) : (
    <>
      <MuiLink
        component={Link}
        href="/signup"
        sx={{
          color: "#000",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Signup
      </MuiLink>
      <MuiLink
        component={Link}
        href="/login"
        sx={{
          color: "#000",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Login
      </MuiLink>
    </>
  );
};

export default AuthHandlers;

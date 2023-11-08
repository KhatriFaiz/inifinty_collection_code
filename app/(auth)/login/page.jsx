import LoginFrom from "@/components/LoginForm";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Page = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "350px",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6">Infinty collection</Typography>
        <Typography variant="h4" fontWeight={700}>
          LOGIN
        </Typography>
      </Box>
      <LoginFrom />
      <Box
        sx={{
          width: "100%",
          maxWidth: "350px",
          textAlign: "center",
        }}
      >
        <Typography>
          Not a user? <Link href="/signup">Register</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Page;

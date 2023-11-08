import SignupForm from "@/components/SingupForm";
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
          SIGNUP
        </Typography>
      </Box>
      <SignupForm />
      <Box
        sx={{
          width: "100%",
          maxWidth: "350px",
          textAlign: "center",
        }}
      >
        <Typography>
          Already a user? <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Page;

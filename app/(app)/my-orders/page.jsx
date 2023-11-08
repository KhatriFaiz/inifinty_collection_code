import OrderCard from "@/components/OrderCard";
import OrderProductCard from "@/components/OrderProductCard";
import Orders from "@/components/Orders";
import { Container } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";

const Page = async () => {
  return (
    <Container
      sx={{
        paddingBlock: 3,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Orders />
    </Container>
  );
};

export default Page;

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const SearchBox = ({ BoxSx, fullWidth }) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 2, ...BoxSx }}
      component="form"
    >
      <TextField
        variant="outlined"
        label="Search"
        size="small"
        type="search"
        fullWidth={fullWidth}
      />
      <Button
        variant="standard"
        size="small"
        type="search"
        sx={{
          background: "#000",
          color: "#fff",
          border: "1px solid #000",
          "&:hover": { background: "#fff", color: "#000" },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBox;

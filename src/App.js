import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import NavigationBar from "./NavigationBar";
import FileGenerator from "./FileGenerator";

export default function App() {
  return (
    <Container maxWidth="lg">
      <NavigationBar />
      <Box sx={{ my: 0, mx: 0 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            display: "flex",
            py: 4,
            px: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Create files with fake data
        </Typography>
        <FileGenerator />
      </Box>
    </Container>
  );
}

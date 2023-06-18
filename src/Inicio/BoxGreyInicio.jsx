import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function BoxGreyInicio() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#F0F0F0",
          flexGrow: 1,
          padding: "20px",
          width: "100vh",
          height: "50vh",
        }}
      >
        <h1 style={{ color: "#333333", textAlign: "center" }}>
          Bem-vindo ao MecaniTech
        </h1>
        <p style={{ color: "#666666", textAlign: "center" }}>
          O seu sistema completo de gerenciamento de oficina mecânica.
        </p>
      </Box>
    </div>
  );
}

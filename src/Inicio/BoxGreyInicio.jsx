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
      <Box sx={{ backgroundColor: "#F0F0F0", flexGrow: 1, padding: "20px", width:"100vh", height:"50vh", 
}}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell>Profissional</TableCell>
                <TableCell>Data Inicio </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Aguardando</TableCell>
                <TableCell>Joao </TableCell>
                <TableCell>AAAXXXX </TableCell>
                <TableCell>Zezim </TableCell>
                <TableCell>01/01/23 </TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Em andamento</TableCell>
                <TableCell>Joao </TableCell>
                <TableCell>AAAXXXX </TableCell>
                <TableCell>Zezim </TableCell>
                <TableCell>01/01/23 </TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Concluido</TableCell>
                <TableCell>Joao </TableCell>
                <TableCell>AAAXXXX </TableCell>
                <TableCell>Zezim </TableCell>
                <TableCell>01/01/23 </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { ComponentesContext } from "../useContext";
import FormNovoCliente from "./FormNovoCliente";
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import axios from "axios";

export function BoxGreyCliente() {
  const { modalOpen, clienteSelecionado, modalOpenCliente, setModalOpenCliente, setClienteSelecionado } = useContext(ComponentesContext);
  const [clientes, setClientes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:3333/clientes")
      .then((response) => {
        setClientes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modalOpen, clienteSelecionado, modalOpenCliente]);

  const criarNovoCliente = () => {
    setModalOpenCliente(true);
    setClienteSelecionado(null);
  };

  const handleEdit = (id) => {
    const cliente = clientes.find((cliente) => cliente.id === id);
    setClienteSelecionado(cliente);
    setModalOpenCliente(true);
  };
  
  

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir o cliente?")) {
      axios
        .delete(`http://localhost:3333/clientes/${id}`)
        .then((response) => {
          console.log(response.data);
          // Atualiza a lista de clientes
          setClientes(clientes.filter((cliente) => cliente.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F0",
        flexGrow: 1,
        padding: "20px",
        width: "100vh",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="warning"
          size="small"
          sx={{ margin: "10px", marginLeft: "auto" }}
          onClick={criarNovoCliente}
        >
          Novo Cliente
        </Button>
        <FormNovoCliente />
      </Box>

      <div>
        <TableContainer>
          <Table style={{ width: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell width={40}>ID</TableCell>
                <TableCell width={100}>Ações</TableCell>
                <TableCell width={200}>Nome Cliente</TableCell>
                <TableCell>Telefone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes
                .sort((a, b) => b.id - a.id)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.id}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="editar"
                        size="small"
                        onClick={() => handleEdit(cliente.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="deletar"
                        size="small"
                        onClick={() => handleDelete(cliente.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                  </TableRow>
                ))}
              .
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={clientes.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </TableContainer>
      </div>
    </Box>
  );
}

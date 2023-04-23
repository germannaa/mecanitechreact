import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Edit, Delete, AddCircle } from "@mui/icons-material";
import { ComponentesContext } from "../useContext";
import FormNovoFuncionario from "./FormNovoFuncionario";
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

export function BoxGreyFuncionario() {
  const {
    modalOpen,
    funcionarioSelecionado,
    modalOpenFuncionario,
    setModalOpenFuncionario,
    setFuncionarioSelecionado,
  } = useContext(ComponentesContext);
  const [funcionarios, setFuncionarios] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:3333/funcionarios")
      .then((response) => {
        setFuncionarios(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modalOpen, funcionarioSelecionado, modalOpenFuncionario]);

  const criarNovoFuncionario = () => {
    setModalOpenFuncionario(true);
    setFuncionarioSelecionado(null);
  };

  const handleEdit = (id_funcionario) => {
    const funcionario = funcionarios.find((funcionario) => funcionario.id_funcionario === id_funcionario);
    setFuncionarioSelecionado(funcionario);
    setModalOpenFuncionario(true);
  };

  const handleDelete = (id_funcionario) => {
    if (window.confirm("Tem certeza que deseja excluir o funcionario?")) {
      axios
        .delete(`http://localhost:3333/funcionarios/${id_funcionario}`)
        .then((response) => {
          console.log(response.data);
          // Atualiza a lista de funcionarios
          setFuncionarioSelecionado(funcionarios.filter((funcionario) => funcionario.id_funcionario !== id_funcionario));
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
        }}>
          <Typography sx={{ fontWeight: "bold", textAlign:"center", marginLeft: "20rem", marginTop:"1rem",fontSize: 20}}> Funcionários </Typography>
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{ margin: "10px", marginLeft: "auto" }}
            startIcon = {< AddCircle />}
            onClick={criarNovoFuncionario}
          > Novo</Button>
          <FormNovoFuncionario />
      </Box>

      <div>
        <TableContainer>
          <Table style={{ width: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell width={40}>ID</TableCell>
                <TableCell width={100}>Ações</TableCell>
                <TableCell width={200}>Nome Funcionário</TableCell>
                <TableCell>Cargo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {funcionarios
                .sort((a, b) => b.id - a.id)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((funcionario) => (
                  <TableRow key={funcionario.id_funcionario}>
                    <TableCell>{funcionario.id_funcionario}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="editar"
                        size="small"
                        onClick={() => handleEdit(funcionario.id_funcionario)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="deletar"
                        size="small"
                        onClick={() => handleDelete(funcionario.id_funcionario)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell>{funcionario.nome}</TableCell>
                    <TableCell>{funcionario.cargo}</TableCell>
                  </TableRow>
                ))}
              .
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={funcionarios.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Linhas por página"
          />
        </TableContainer>
      </div>
    </Box>
  );
}

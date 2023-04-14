import { Button, IconButton, Typography } from "@mui/material";
import { Edit, Delete, AddCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";
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


export function BoxGreyServico() {
  const { modalOpen, servicoSelecionado, modalOpenServico, servicos, setModalOpenServicos, setServicoSelecionado, setServicos } = useContext(ComponentesContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:3333/servicos")
      .then((response) => {
        setServicos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modalOpen, modalOpen, servicoSelecionado, setServicos]);

  console.log("serviocos", servicos)

  const handleEditServico = (id) => {
    console.log("EDITAR SERVIÇO");
    const servico = servicos.find((servico) => servico.id === id);
    // implementar a lógica para editar um serviço
  };

  const handleDeleteServico = (id) => {
    console.log("DELETAR SERVIÇO");
    if (window.confirm("Tem certeza que deseja excluir o serviço?")) {
      axios
        .delete(`http://localhost:3333/servicos/${id}`)
        .then((response) => {
          console.log(response.data);
          // Atualiza a lista de serviços
          setServicos(servicos.filter((servico) => servico.id !== id));
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
        <Typography sx={{ fontWeight: "bold", textAlign:"center", marginLeft: "20rem", marginTop:"1rem",fontSize: 20}}> Serviços </Typography>
        <Button
          variant="contained"
          color="warning"
          size="small"
          startIcon = {< AddCircle />}
          sx={{ margin: "10px", marginLeft: "auto" }}
        > Novo</Button>
    </Box>

    <div>
  <TableContainer>
    <Table style={{ width: 700 }}>
      <TableHead>
        <TableRow>
          <TableCell width={20}>ID</TableCell>
          <TableCell width={70}>Ações</TableCell>
          <TableCell width={120}>Nome</TableCell>
          <TableCell width={140}>Descrição</TableCell>
          <TableCell  width={20}>Valor</TableCell>
          <TableCell>Peças</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {servicos
          .sort((a, b) => b.id_servico - a.id_servico)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((servico) => (
            <TableRow key={servico.id_servico}>
              <TableCell>{servico.id_servico}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="editar"
                  size="small"
                  onClick={() => handleEditServico(servico.id_servico)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="deletar"
                  size="small"
                  onClick={() => handleDeleteServico(servico.id_servico)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
              <TableCell style={{ maxWidth: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{servico.nome_servico}</TableCell>
              <TableCell style={{ maxWidth: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{servico.descricao}</TableCell>
              <TableCell>R${servico.valor_cobrado}</TableCell>
              <TableCell style={{ maxWidth: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{servico.pecas_usadas}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    <TablePagination
      component="div"
      count={servicos.length}
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

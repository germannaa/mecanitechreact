import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Edit, Delete, AddCircle } from "@mui/icons-material";
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
import FormNovoVeiculo from "./FormNovoVeiculo";

export function BoxGreyVeiculo() {

  const { modalOpen, veiculoSelecionado, modalOpenVeiculo, veiculos, setModalOpenVeiculo, setVeiculoSelecionado, setVeiculos } = useContext(ComponentesContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:3333/veiculos")
      .then((response) => {
        setVeiculos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modalOpenVeiculo, modalOpen, veiculoSelecionado, setVeiculos]);

  

const criarNovoVeiculo = () =>{
  console.log("CRIAR NOVO VEICULO")
  setModalOpenVeiculo(true);
  setVeiculoSelecionado(null);
}

const handleEditVeiculo = (placa) => {
  console.log("EDITAR VEICULO")
  const veiculo = veiculos.find((veiculo) => veiculo.placa === placa)
  setVeiculoSelecionado(veiculo);
  setModalOpenVeiculo(true);
}

const handleDeleteVeiculo = (placa) => {
  console.log("DELETAR VEICULO")
    if (window.confirm("Tem certeza que deseja excluir o veículo?")) {
      axios
        .delete(`http://localhost:3333/veiculos/${placa}`)
        .then((response) => {
          console.log(response.data);
          // Atualiza a lista de veiculos
          setVeiculos(veiculos.filter((veiculo) => veiculo.placa !== placa));
        })
        .catch((error) => {
          console.log(error);
        });
  };
}

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
          <Typography sx={{ fontWeight: "bold", textAlign:"center", marginLeft: "20rem", marginTop:"1rem",fontSize: 20}}> Veículos </Typography>
          <Button
            variant="contained"
            color="warning"
            size="small"
            startIcon = {< AddCircle />}
            sx={{ margin: "10px", marginLeft: "auto" }}
          onClick={criarNovoVeiculo}
        >
          Novo 
        </Button>
        <FormNovoVeiculo />
      </Box>

      <div>
        <TableContainer>
          <Table style={{ width: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell width={40}>Placa</TableCell>
                <TableCell width={100}>Ações</TableCell>
                <TableCell width={200}>Nome Cliente</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {veiculos
                .sort((a, b) => b.id - a.id)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((veiculo) => (
                  <TableRow key={veiculo.placa}>
                    <TableCell>{veiculo.placa}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="editar"
                        size="small"
                        onClick={() => handleEditVeiculo(veiculo.placa)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="deletar"
                        size="small"
                        onClick={() => handleDeleteVeiculo(veiculo.placa)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell>{veiculo.nome_cliente}</TableCell>
                    <TableCell>{veiculo.marca}</TableCell>
                    <TableCell>{veiculo.modelo}</TableCell>
                  </TableRow>
                ))}
              .
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={veiculos.length}
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



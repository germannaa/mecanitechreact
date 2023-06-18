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

import FormNovoOS from "./FormNovoOS";

export function BoxGreyOrdemDeServico() {
  const {
    modalOpen,
    OSSelecionado,
    modalOpenOS,
    OS,
    setModalOpenOS,
    setOSSelecionado,
    setOS,
  } = useContext(ComponentesContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const criarNovoOS = () => {
    setModalOpenOS(true);
    setOSSelecionado(null);
  };

  const [os, setOs] = useState([]);
  const [oss, setOss] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/ordensdeservico")
      .then((response) => {
        setOs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modalOpen, modalOpenOS, OSSelecionado, os]);

  const handleDelete = (id_os) => {
    if (window.confirm("Tem certeza que deseja excluir a ordem de serviço?")) {
      axios
        .delete(`http://localhost:3333/ordensdeservico/${id_os}`)
        .then((response) => {
         // console.log(response.data);
          // Atualiza a lista de ordens de serviço
          setOS(os.filter((ordem) => ordem.id_os !== id_os));
        })
        .catch((error) => {
          window.confirm(
            "Não foi possível excluir a ordem de serviço. Verifique se há dados associados."
          );
         // console.log(error);
        });
    }
  };

  const handleEdit = (id_os) => {
    const oss = os.find((oss) => oss.id_os === id_os);
    setOSSelecionado(oss);
    setModalOpenOS(true);
  };


  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F0",
        flexGrow: 1,
        padding: "20px",
        width: "100vh",
        height: "70vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginLeft: "18rem",
            marginTop: "1rem",
            fontSize: 20,
          }}
        >
          {" "}
          Ordens de Serviço{" "}
        </Typography>
        <Button
          variant="contained"
          color="warning"
          size="small"
          startIcon={<AddCircle />}
          onClick={criarNovoOS}
          sx={{ margin: "10px", marginLeft: "auto" }}
        >
          {" "}
          Novo
        </Button>
        <FormNovoOS />
      </Box>

      <div>
        <TableContainer>
          <Table style={{ width: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell width={50}>ID OS</TableCell>
                <TableCell width={70}>Ações</TableCell>
                <TableCell width={100}>Status</TableCell>
                <TableCell width={100}>Nome Cliente</TableCell>
                <TableCell width={70}>Placa</TableCell>
                <TableCell>Funcionario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {os
                .sort((a, b) => b.id_ordensdeservico - a.id_ordensdeservico)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((os) => (
                  <TableRow key={os.id_os}>
                    <TableCell>{os.id_os}</TableCell>
                    <TableCell>
                     
                      <IconButton
                        aria-label="deletar"
                        size="small"
                        onClick={() => handleDelete(os.id_os)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          os.status == "em andamento"
                            ? "yellow"
                            : os.status == "pendente"
                            ? "red"
                            : "green",
                      }}
                    >
                      {os.status}
                    </TableCell>
                    <TableCell>{os.nome_cliente}</TableCell>
                    <TableCell>{os.placa_veiculo}</TableCell>
                    <TableCell>{os.nome_funcionario}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={os.length}
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

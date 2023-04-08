import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import axios from 'axios';
import { useContext } from "react";
import { ComponentesContext } from "./useContext";

const FormNovoCliente = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const { modalOpenCliente, setModalOpenCliente } = useContext(ComponentesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3333/clientes", {
        nome: nomeCliente,
        cpf: cpf,
        email: email,
        telefone: telefone,
      })
      .then((response) => {
        console.log("Resposta do servidor:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar requisição:", error);
      });
      setModalOpenCliente(false);
  };

  const onClose = (e) => {
    setModalOpenCliente(false);
  };

  return (
    <Modal
      open={modalOpenCliente}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: 24,
          padding: "20px",
          borderRadius: "8px",
          width: "600px",
          maxWidth: "90%",
          outline: "none",
        }}
      >
        <Typography variant="h6" component="h2" alignItems="center">
          Novo Cliente
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nomeCliente"
                label="Nome do Cliente"
                variant="outlined"
                value={nomeCliente}
                onChange={(event) => setNomeCliente(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cpf"
                label="CPF"
                variant="outlined"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="telefone"
                label="Telefone"
                variant="outlined"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
              <Button variant="contained" color="inherit" onClick={onClose}>
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" type="submit">
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default FormNovoCliente;

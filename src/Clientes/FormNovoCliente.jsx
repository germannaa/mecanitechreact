import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";
import { useEffect } from "react";

const FormNovoCliente = () => {
  const [nome, setNomeCliente] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const {
    modalOpenCliente,
    clienteSelecionado,
    clientes,
    setModalOpenCliente,
    setClienteSelecionado,
    setClientes,
  } = useContext(ComponentesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (clienteSelecionado) {
      axios
        .put(`http://localhost:3333/clientes/${clienteSelecionado.id}`, {
          nome: nome,
          cpf: cpf,
          senha: "1234",
          telefone: telefone,
          email: email,
        })
        .then((response) => {
          console.log(response.data);
          const novosClientes = clientes.map((cliente) => {
            if (cliente.id === clienteSelecionado.id) {
              return { ...cliente, nome, cpf, senha, telefone, email };
            } else {
              return cliente;
            }
          });
          setClientes(novosClientes);
          setModalOpenCliente(false);
          clienteSelecionadoNull();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3333/clientes", {
          nome: nome,
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
      clienteSelecionadoNull();
    }
  };

  console.log("Cliente selecionado", clienteSelecionado);

  const onClose = (e) => {
    setModalOpenCliente(false);
    clienteSelecionadoNull();
  };
  const clienteSelecionadoNull = () => {
    setClienteSelecionado(null);
    setNomeCliente(null);
    setCpf(null);
    setSenha("");
    setTelefone(null);
    setEmail(null);
  };

  useEffect(() => {
    if (clienteSelecionado) {
      setNomeCliente(clienteSelecionado.nome);
      setCpf(clienteSelecionado.cpf);
      setSenha("");
      setTelefone(clienteSelecionado.telefone);
      setEmail(clienteSelecionado.email);
    }
  }, [clienteSelecionado]);

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
          Dados do Cliente
        </Typography>
        <Box sx={{marginTop: "15px"}}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nomeCliente"
                label="Nome do Cliente"
                variant="outlined"
                value={nome}
                InputLabelProps={{ shrink: true }} 
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
                InputLabelProps={{ shrink: true }} 
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
                InputLabelProps={{ shrink: true }} 
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
                InputLabelProps={{ shrink: true }} 
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
      </Box>
    </Modal>
  );
};

export default FormNovoCliente;

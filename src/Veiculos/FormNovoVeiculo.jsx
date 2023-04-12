import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";
import { useEffect } from "react";

const FormNovoVeiculo = () => {
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [kilometragem, setKilometragem] = useState("");
  const [cpf_cliente, setCpfCliente] = useState("");


  const {
    modalOpenVeiculo,
    veiculoSelecionado,
    veiculos,
    setModalOpenVeiculo,
    setVeiculoSelecionado,
    setVeiculos,
  } = useContext(ComponentesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (veiculoSelecionado) {
      axios
        .put(`http://localhost:3333/veiculos/${veiculoSelecionado.placa}`, {
          placa: placa, 
          marca: marca,
          modelo: modelo, 
          ano: ano, 
          kilometragem: kilometragem, 
          cpf_cliente: cpf_cliente,
        })
        .then((response) => {
          console.log(response.data);
          const novosVeiculos = veiculos.map((veiculo) => {
            if (veiculo.placa === veiculoSelecionado.placa) {
              return { ...veiculo, placa, marca, modelo, ano, kilometragem, cpf_cliente };
            } else {
              return veiculo;
            }
          });
          setVeiculos(novosVeiculos);
          setModalOpenVeiculo(false);
          veiculoSelecionadoNull();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3333/veiculos", {
          placa: placa, 
          marca: marca,
          modelo: modelo, 
          ano: ano, 
          kilometragem: kilometragem, 
          cpf_cliente: cpf_cliente,
        })
        .then((response) => {
          console.log("Resposta do servidor:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao enviar requisição:", error);
        });
      setModalOpenVeiculo(false);
      veiculoSelecionadoNull();
    }
  };

  console.log("Veiculo selecionado", veiculoSelecionado);

  const onClose = (e) => {
    setModalOpenVeiculo(false);
    veiculoSelecionadoNull();
  };
  const veiculoSelecionadoNull = () => {
    setVeiculoSelecionado(null);
    setPlaca(null);
    setMarca(null);
    setModelo(null)
    setAno(null);
    setKilometragem(null);
    setCpfCliente(null)
  };

  useEffect(() => {
    if (veiculoSelecionado) {
    setPlaca(veiculoSelecionado.placa);
    setMarca(veiculoSelecionado.marca);
    setModelo(veiculoSelecionado.modelo)
    setAno(veiculoSelecionado.ano);
    setKilometragem(veiculoSelecionado.kilometragem);
    setCpfCliente(veiculoSelecionado.cpf_cliente);
    }
  }, [veiculoSelecionado]);

  return (
    <Modal
      open={modalOpenVeiculo}
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
          Dados do Veiculo
        </Typography>
        <Box sx={{marginTop: "15px"}}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="cpfCliente"
                label="CPF do Cliente"
                variant="outlined"
                value={cpf_cliente}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setCpfCliente(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="placa"
                label="Placa"
                variant="outlined"
                value={placa}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setPlaca(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="marca"
                label="Marca"
                variant="outlined"
                value={marca}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setMarca(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="modelo"
                label="Modelo"
                variant="outlined"
                value={modelo}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setModelo(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="ano"
                label="Ano"
                variant="outlined"
                value={ano}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setAno(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="kilometragem"
                label="Kilometragem"
                variant="outlined"
                value={kilometragem}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setKilometragem(event.target.value)}
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

export default FormNovoVeiculo;

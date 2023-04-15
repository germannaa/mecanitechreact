import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";
import { useEffect } from "react";

const FormNovoServico = () => {
  const [nome_servico, setNomeServico] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor_cobrado, setValorCobrado] = useState("");
  const [pecas_usadas, setPecas] = useState("");

  const {
    modalOpenServico,
    servicoSelecionado,
    servicos,
    setModalOpenServico,
    setServicoSelecionado,
    setServicos,
  } = useContext(ComponentesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (servicoSelecionado) {
      axios
        .put(`http://localhost:3333/servicos/${servicoSelecionado.id_servico}`, {
          nome_servico: nome_servico,
          descricao: descricao,
          valor_cobrado: valor_cobrado,
          pecas_usadas: pecas_usadas,
        })
        .then((response) => {
          console.log(response.data);
          const novosServicos = servicos.map((servico) => {
            if (servico.id_servico === servicoSelecionado.id_servico) {
              return {
                ...servico,
                nome_servico,
                descricao,
                valor_cobrado,
                pecas_usadas,
              };
            } else {
              return servico;
            }
          });
          setServicos(novosServicos);
          setModalOpenServico(false);
          servicoSelecionadoNull();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3333/servicos", {
          nome_servico: nome_servico,
          descricao: descricao,
          valor_cobrado: valor_cobrado,
          pecas_usadas: pecas_usadas,
        })
        .then((response) => {
          console.log("Resposta do servidor:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao enviar requisição:", error);
        });
      setModalOpenServico(false);
      servicoSelecionadoNull();
    }
  };

  const onClose = (e) => {
    setModalOpenServico(false);
    servicoSelecionadoNull();
  };
  const servicoSelecionadoNull = () => {
    setServicoSelecionado(null);
    setNomeServico(null);
    setDescricao(null);
    setValorCobrado(null);
    setPecas(null);
  };

  useEffect(() => {
    if (servicoSelecionado) {
      setNomeServico(servicoSelecionado.nome_servico);
      setDescricao(servicoSelecionado.descricao);
      setValorCobrado(servicoSelecionado.valor_cobrado);
      setPecas(servicoSelecionado.pecas_usadas);
    }
  }, [servicoSelecionado]);

  return (
    <Modal
      open={modalOpenServico}
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
          Dados do Serviço
        </Typography>
        <Box sx={{ marginTop: "15px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="nomeServico"
                  label="Nome do Servico"
                  variant="outlined"
                  value={nome_servico}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setNomeServico(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="descricao"
                  label="Descrição"
                  variant="outlined"
                  value={descricao}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setDescricao(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="valorCobrado"
                  label="Valor Cobrado"
                  variant="outlined"
                  value={valor_cobrado}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setValorCobrado(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="pecas"
                  label="Peças Usadas"
                  variant="outlined"
                  value={pecas_usadas}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setPecas(event.target.value)}
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

export default FormNovoServico;

import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";
import { useEffect } from "react";

const FormNovoFuncionario = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cargo, setCargo] = useState("");
  const [data_admissao, setDataAdmissao] = useState("");
  const [salario, setSalario] = useState("");
  const {
    modalOpenFuncionario,
    funcionarioSelecionado,
    funcionarios,
    setModalOpenFuncionario,
    setFuncionarioSelecionado,
    setFuncionarios,
  } = useContext(ComponentesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (funcionarioSelecionado) {
      axios
        .put(`http://localhost:3333/funcionarios/${funcionarioSelecionado.id_funcionario}`, {
          nome: nome,
          cargo: cargo,
          data_admissao: data_admissao,
          salario: salario,
          cpf: cpf,
        })
        .then((response) => {
          console.log(response.data);
          const novosFuncionarios = funcionarios.map((funcionario) => {
            if (funcionario.id_funcionario === funcionarioSelecionado.id_funcionario) {
              return { ...funcionario, nome, cargo, data_admissao, salario, cpf };
            } else {
              return funcionario;
            }
          });
          setFuncionarios(novosFuncionarios);
          setModalOpenFuncionario(false);
          funcionarioSelecionadoNull();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3333/funcionarios", {
          nome: nome,
          cargo: cargo,
          data_admissao: data_admissao,
          salario: salario,
          cpf: cpf
        })
        .then((response) => {
          console.log("Resposta do servidor:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao enviar requisição:", error);
        });
      setModalOpenFuncionario(false);
      funcionarioSelecionadoNull();
    }
  };

  console.log("Funcionario selecionado", funcionarioSelecionado);

  const onClose = (e) => {
    setModalOpenFuncionario(false);
    funcionarioSelecionadoNull();
  };
  const funcionarioSelecionadoNull = () => {
    setFuncionarioSelecionado(null);
    setNome(null);
    setCpf(null);
    setCargo(null);
    setDataAdmissao(null);
    setSalario(null);
  };

  useEffect(() => {
    if (funcionarioSelecionado) {
      setNome(funcionarioSelecionado.nome);
      setCpf(funcionarioSelecionado.cpf);
      setCargo(funcionarioSelecionado.cargo);
      setDataAdmissao(funcionarioSelecionado.data_admissao);
      setSalario(funcionarioSelecionado.salario);
    }
  }, [funcionarioSelecionado]);

  return (
    <Modal
      open={modalOpenFuncionario}
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
          Dados do Funcionário
        </Typography>
        <Box sx={{marginTop: "15px"}}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nomeFuncionario"
                label="Nome do Funcionário"
                variant="outlined"
                value={nome}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setNome(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cargo"
                label="Cargo"
                variant="outlined"
                value={cargo}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setCargo(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="salario"
                label="Salário"
                variant="outlined"
                value={salario}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setSalario(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="dataAdmissao"
                label="Data de Admissão"
                variant="outlined"
                value={data_admissao}
                InputLabelProps={{ shrink: true }} 
                onChange={(event) => setDataAdmissao(event.target.value)}
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
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormNovoFuncionario;

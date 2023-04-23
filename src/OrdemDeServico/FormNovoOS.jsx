import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { Select, InputLabel, MenuItem } from "@mui/material";
import { Autocomplete } from "@mui/lab";

const FormNovoOS = () => {
  const [cpf_cliente, setCpfCliente] = useState("");
  const [placa_veiculo, setPlacaVeiculo] = useState("");
  const [id_funcionario, setIdFuncionario] = useState("");
  const [data_inicio, setDataInicio] = useState("");
  const [data_termino, setDataTermino] = useState("");
  const [valor_total, setValorTotal] = useState(0);
  const [servicos, setServicos] = useState([]);
  const [status, setStatus] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [listaServicos, setListaServicos] = useState([]);
  let nomesServicos = [];


  const {
    modalOpenOS,
    OSSelecionado,
    OS,
    setModalOpenOS,
    setOSSelecionado,
    setOS,
  } = useContext(ComponentesContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (OSSelecionado) {
      axios
        .put(`http://localhost:3333/ordensdeservico/${OSSelecionado.id_os}`, {
          cpf_cliente: cpf_cliente,
          placa_veiculo: placa_veiculo,
          id_funcionario: id_funcionario,
          data_inicio: data_inicio,
          data_termino: data_termino,
          valor_total: valor_total,
          status: status,
          servicos: [],
        })
        .then((response) => {
          console.log(response.data);
          const novaOS = OS.map((os) => {
            if (os.is_os === OSSelecionado.id_os) {
              return {
                ...os,
                cpf_cliente,
                placa_veiculo,
                id_funcionario,
                data_inicio,
                data_termino,
                valor_total,
                status,
                servicos,
              };
            } else {
              return OS;
            }
          });
          setOS(novaOS);
          setModalOpenOS(false);
          OSSelecionadoNull();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3333/ordensdeservico", {
          cpf_cliente: cpf_cliente,
          placa_veiculo: placa_veiculo,
          id_funcionario: id_funcionario,
          data_inicio: data_inicio,
          data_termino: data_termino,
          valor_total: valor_total,
          status: status,
          servicos: nomesServicos,
        })
        .then((response) => {
          console.log("Resposta do servidor:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao enviar requisição:", error);
        });
      setModalOpenOS(false);
      OSSelecionadoNull();
    }
  };

  const onClose = (e) => {
    setModalOpenOS(false);
    console.log("OS", OSSelecionado);

    OSSelecionadoNull();
  };
  const OSSelecionadoNull = () => {
    setOSSelecionado(null);
    setCpfCliente(null);
    setPlacaVeiculo(null);
    setIdFuncionario(null);
    setDataInicio(null);
    setDataTermino(null);
    setValorTotal(null);
    setStatus(null);
    setServicos(null);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    if (OSSelecionado) {
      setCpfCliente(OSSelecionado.cpf_cliente);
      setPlacaVeiculo(OSSelecionado.placa_veiculo);
      setIdFuncionario(OSSelecionado.id_funcionario);
      setDataInicio(OSSelecionado.data_inicio);
      setDataTermino(OSSelecionado.data_termino);
      setValorTotal(OSSelecionado.valor_total);
      setStatus(OSSelecionado.status);
      setServicos(OSSelecionado.servicos);
    }
  }, [OSSelecionado]);

  useEffect(() => {
    fetch("http://localhost:3333/funcionarios")
      .then((res) => res.json())
      .then((data) => setFuncionarios(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3333/servicos")
      .then((response) => {
        setListaServicos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleServicosSelecionadosChange = (event, values) => {
    setServicosSelecionados(values);
    console.log("change servicosSelecionados", servicosSelecionados);
  };
  const getNomesServicosSelecionados = () => {
    servicosSelecionados.forEach((servico) => {
      nomesServicos += servico.nome_servico + ", ";
    });
    return nomesServicos.slice(0, -2); // Remove a vírgula e o espaço no final
  };

  const calcularValorTotal = () => {
    let total = 0;
    servicosSelecionados.forEach((servico) => {
      total += parseFloat(servico.valor_cobrado);
    });
    setValorTotal(total);
  };

  useEffect(() => {
    calcularValorTotal();
  }, [servicosSelecionados]);

  return (
    <Modal
      open={modalOpenOS}
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
              <Grid item xs={12} sm={6}>
                <RadioGroup
                  row
                  aria-label="status"
                  value={status}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="pendente"
                    control={<Radio />}
                    label="Pendente"
                  />
                  <FormControlLabel
                    value="em andamento"
                    control={<Radio />}
                    label="Em andamento"
                  />
                  <FormControlLabel
                    value="concluido"
                    control={<Radio />}
                    label="Concluído"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Grid item xs={12}>
                <label>Valor total: R${valor_total.toFixed(2)}</label>
              </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="placaVeiculo"
                  label="Placa do Veículo"
                  variant="outlined"
                  value={placa_veiculo}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setPlacaVeiculo(event.target.value)}
                />
              </Grid>
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
                  id="data_inicio"
                  label="Data Inicio"
                  type="date"
                  variant="outlined"
                  value={data_inicio}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setDataInicio(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="data_termino"
                  label="Data Termino"
                  type="date"
                  variant="outlined"
                  value={data_termino}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setDataTermino(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel id="select-funcionario-label">
                  Funcionário
                </InputLabel>
                <Select
                  id="id_funcionario"
                  value={id_funcionario}
                  onChange={(event) => setIdFuncionario(event.target.value)}
                  fullWidth
                  required
                >
                  <MenuItem value="">
                    <em>Selecione um funcionário</em>
                  </MenuItem>
                  {funcionarios.map((funcionario) => (
                    <MenuItem
                      key={funcionario.id_funcionario}
                      value={funcionario.id_funcionario}
                    >
                      {funcionario.nome}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}></Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={listaServicos}
                  getOptionLabel={(option) => option.nome_servico}
                  value={servicosSelecionados}
                  onChange={handleServicosSelecionadosChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Serviços"
                      variant="outlined"
                      placeholder="Selecione os serviços"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <label>
                  Serviços selecionados: {getNomesServicosSelecionados()}
                </label>
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

export default FormNovoOS;

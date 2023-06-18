import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { Select, InputLabel, MenuItem } from "@mui/material";
import { Autocomplete } from "@mui/lab";
import { getDate, isToday } from "date-fns";

const FormNovoOS = () => {
  const [cpf_cliente, setCpfCliente] = useState("");
  const [placa_veiculo, setPlacaVeiculo] = useState("");
  const [placa_veiculos, setPlacaVeiculos] = useState([]);

  const [id_funcionario, setIdFuncionario] = useState("");
  const [data_inicio, setDataInicio] = useState("");
  const [data_termino, setDataTermino] = useState("");
  const [valor_total, setValorTotal] = useState(0);
  const [servicos, setServicos] = useState([]);
  const [status, setStatus] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [listaServicos, setListaServicos] = useState([]);
  //let listaServicos = [];
  let nomesServicos = [];
  let idServicos = [];
  const [idServicosOS, setIdServicosOs] = useState([]);

  const {
    modalOpenOS,
    OSSelecionado,
    OS,
    setModalOpenOS,
    setOSSelecionado,
    setOS,
  } = useContext(ComponentesContext);
  /*
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
  */
  const [idsServicos, setIdsServicos] = useState([]);

  const getIdsServicosSelecionados = () => {
    const ids = [];
    servicosSelecionados.forEach((servico) => {
      ids.push(servico.id_servico);
    });
    setIdsServicos(ids);
  };

  useEffect(() => {
    getIdsServicosSelecionados();
  }, [servicosSelecionados]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (OSSelecionado) {
      axios
        .put(`http://localhost:3333/ordensdeservico/${OSSelecionado.id_os}`, {
          cpf_cliente,
          placa_veiculo,
          id_funcionario,
          data_inicio,
          data_termino,
          valor_total,
          status,
          servicos: [],
        })
        .then((response) => {
          console.log(response.data);
          const novaOS = OS.map((os) => {
            if (os.id_os === OSSelecionado.id_os) {
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
              return os;
            }
          });
          setOS(novaOS);
          setModalOpenOS(false);
          OSSelecionadoNull();
          alert("Ordem de serviço atualizada com sucesso!");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3333/ordensdeservico", {
          cpf_cliente,
          placa_veiculo,
          id_funcionario,
          data_inicio,
          data_termino,
          valor_total,
          status,
          idServicos,
        })
        .then((response) => {
          console.log("Resposta do servidor:", response.data);
          alert("Ordem de serviço criada com sucesso!");
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
    //console.log("OS", OSSelecionado);
    OSSelecionadoNull();
  };
  const OSSelecionadoNull = () => {
    setOSSelecionado(null);
    setCpfCliente(null);
    setPlacaVeiculo(null);
    setIdFuncionario(null);
    setDataInicio(null);
    setDataTermino(null);
    setValorTotal(0);
    setStatus(null);
    setServicos([]);
    setServicosSelecionados([]);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
   // console.log("status: " + event.target.value);
  };

  

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
  };

  const getNomesServicosSelecionados = () => {
    idServicos = servicosSelecionados
      .map((servico) => servico.id_servico)
      .join(", ");
    const nomesServicos = servicosSelecionados
      .map((servico) => servico.nome_servico)
      .join(", ");
    return nomesServicos.slice(0); // Remove a vírgula e o espaço no final
  };

  const buscarPlacas = (cpf_cliente) => {
    fetch(`http://localhost:3333/veiculos/${cpf_cliente}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setPlacaVeiculos(data);
        } else {
          window.alert("Cliente selecionado não possui veículos cadastrados. Favor cadastrar.");
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("Ocorreu um erro ao buscar os veículos. Por favor, tente novamente.");
      });
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

  /*
  console.log(
    "OS",
    cpf_cliente,
    placa_veiculo,
    id_funcionario,
    data_inicio,
    data_termino,
    valor_total,
    status,
    idServicos
  );

  */

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
          width: "800px",
          height: "600px",
          maxWidth: "90%",
          outline: "none",
        }}
      >
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" component="h2" alignItems="center">
              Dados do Serviço
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" alignItems="center">
              Valor total: R$ {valor_total}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RadioGroup
                  row
                  aria-label="status"
                  value={status}
                  defaultValue="Pendente"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Pendente"
                    control={<Radio />}
                    label="Pendente"
                  />
                  <FormControlLabel
                    value="Em andamento"
                    control={<Radio />}
                    label="Em andamento"
                  />
                  <FormControlLabel
                    value="Concluido"
                    control={<Radio />}
                    label="Concluído"
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cpfCliente"
                  label="CPF do Cliente"
                  variant="outlined"
                  value={cpf_cliente}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setCpfCliente(event.target.value)}
                  onBlur={() => buscarPlacas(cpf_cliente)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel id="select-veiculo-label">Veículo</InputLabel>
                <Select
                  id="id_veiculo"
                  value={placa_veiculo || ""}
                  label="Selecione um veículo"
                  onChange={(event) => setPlacaVeiculo(event.target.value)}
                  fullWidth
                  required
                >
                  <MenuItem value="">
                    <em>Selecione um veículo</em>
                  </MenuItem>
                  {placa_veiculos.map((placa) => (
                    <MenuItem key={placa} value={placa}>
                      {placa}
                    </MenuItem>
                  ))}
                </Select>
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

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="data_inicio"
                  label="Data Inicio"
                  type="date"
                  variant="outlined"
                  defaultValue={isToday}
                  value={data_inicio}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setDataInicio(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="data_termino"
                  label="Data Termino/ Prevista "
                  type="date"
                  variant="outlined"
                  value={data_termino}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setDataTermino(event.target.value)}
                />
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
                      label="Serviços Disponíveis"
                      variant="outlined"
                      placeholder="Selecione os serviços"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ height: "70px" }}>
                  <label>
                    Serviços selecionados: {getNomesServicosSelecionados()}
                  </label>
                </Box>
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

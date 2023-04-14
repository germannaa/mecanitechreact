import { createContext, useState } from "react";

export const ComponentesContext = createContext();

export const ComponentesProvider = ({ children }) => {
  const [componenteAtivo, setComponenteAtivo] = useState("boxGrey");
  
  const [modalOpenCliente, setModalOpenCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState({});

  const [modalOpenVeiculo, setModalOpenVeiculo] = useState("");
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState({});


  const [modalOpenServico, setModalOpenServico] = useState("");
  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState({});

  const value = {
    componenteAtivo,
    modalOpenCliente,
    clientes,
    clienteSelecionado,
    modalOpenVeiculo,
    veiculos,
    veiculoSelecionado,
    modalOpenServico,
    servicos,
    servicoSelecionado,
    setModalOpenCliente,
    setComponenteAtivo,
    setClientes,
    setClienteSelecionado,
    setModalOpenVeiculo,
    setVeiculos,
    setVeiculoSelecionado,
    setModalOpenServico,
    setServicos,
    setServicoSelecionado
  };

  return (
    <ComponentesContext.Provider value={value}>
      {children}
    </ComponentesContext.Provider>
  );
};

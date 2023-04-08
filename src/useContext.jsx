import { createContext, useState } from "react";

export const ComponentesContext = createContext();

export const ComponentesProvider = ({ children }) => {
  const [componenteAtivo, setComponenteAtivo] = useState("boxGrey");
const [modalOpenCliente, setModalOpenCliente] = useState("");
const [clientes, setClientes] = useState([]);
const [ clienteSelecionado, setClienteSelecionado] = useState({});



  const value = {
    componenteAtivo, 
    modalOpenCliente, 
    clientes,
    clienteSelecionado,
    setModalOpenCliente,
    setComponenteAtivo,
    setClientes,
    setClienteSelecionado,
  };

  return (
    <ComponentesContext.Provider value={value}>
      {children}
    </ComponentesContext.Provider>
  );
};

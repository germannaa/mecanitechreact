import { createContext, useState } from "react";

export const ComponentesContext = createContext();

export const ComponentesProvider = ({ children }) => {
  const [componenteAtivo, setComponenteAtivo] = useState("boxGrey");
const [modalOpenCliente, setModalOpenCliente] = useState("");
const [clientes, setClientes] = useState([]);


  const value = {
    componenteAtivo, 
    modalOpenCliente, 
    clientes,
    setModalOpenCliente,
    setComponenteAtivo,
    setClientes,
  };

  return (
    <ComponentesContext.Provider value={value}>
      {children}
    </ComponentesContext.Provider>
  );
};

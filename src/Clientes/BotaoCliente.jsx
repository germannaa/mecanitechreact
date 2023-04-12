import { Button } from "@mui/material";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";


export function ButtonCliente() {
    const { setComponenteAtivo} = useContext(ComponentesContext);


    const openBoxInicio = () => {
        setComponenteAtivo("boxGrey");
        console.log("buttoninicio")
    }
    const openBoxCliente = () => {
        setComponenteAtivo("buttonCliente");
        console.log("buttonCliente")
    }
    const openBoxVeiculo = () => {
        setComponenteAtivo("buttonVeiculo");
        console.log("buttonveiculo")
    }
    const openBoxServico = () => {
        setComponenteAtivo("buttonServico");
        console.log("buttonservico")
    }
    const openBoxOrdemDeServico = () => {
        setComponenteAtivo("buttonOrdemDeServico");
        console.log("buttonordemdeServico")
    }


  return (
    <div style={{display:"flex", flexDirection:"column", alignSelf:"flex-start", maxWidth:"300px"}}>
        <Button variant="contained" color="warning" size="large" sx={{margin:"10px"}} onClick={openBoxInicio}>
        Inicio
      </Button>
      <Button variant="contained" color="warning" size="large" sx={{margin:"10px"}} onClick={openBoxCliente} >
        Cliente
      </Button>
      <Button variant="contained" color="warning" size="large" sx={{margin:"10px"}} onClick={openBoxVeiculo} >
        Veiculo
      </Button>
      <Button variant="contained" color="warning" size="large" sx={{margin:"10px"}} onClick={openBoxServico} >
        Serviço
      </Button>
      <Button variant="contained" color="warning" size="large" sx={{margin:"10px"}} onClick={openBoxOrdemDeServico} >
        Ordem de Serviço
      </Button>
    </div>
  );
}
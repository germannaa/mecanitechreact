import { useContext } from "react";
import { ComponentesContext } from "./useContext";
import { BoxGreyInicio } from "./Inicio/BoxGreyInicio";
import { BoxGreyCliente } from './Clientes/BoxGreyCliente';
import { BoxGreyVeiculo } from './Veiculos/BoxGreyVeiculo';
import { BoxGreyServico } from './Servico/BoxGreyServico';
import { BoxGreyOrdemDeServico } from './OrdemDeServico/BoxGreyOrdemDeServico';
import { BoxGreyFuncionario } from "./Funcionarios/BoxGreyFuncionario";


export function BoxGrey() {
    const { componenteAtivo } = useContext(ComponentesContext);
if (componenteAtivo === "boxGrey") {
  return (
    <BoxGreyInicio />
  );
};

if (componenteAtivo === "buttonCliente"){
    return (
        <BoxGreyCliente />
    );
}

if (componenteAtivo === "buttonVeiculo"){
    return (
        <BoxGreyVeiculo />
    );
}

if (componenteAtivo === "buttonServico"){
    return (
       < BoxGreyServico />
    );
}

if (componenteAtivo === "buttonFuncionario"){
    return (
        <BoxGreyFuncionario />
    );
}

if (componenteAtivo === "buttonOrdemDeServico"){
    return (
        <BoxGreyOrdemDeServico />
    );
}



}

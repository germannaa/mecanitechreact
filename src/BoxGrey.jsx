import { useContext } from "react";
import { ComponentesContext } from "./useContext";
import { BoxGreyInicio } from "./BoxGreyInicio";
import { BoxGreyCliente } from './BoxGreyCliente';
import { BoxGreyVeiculo } from './BoxGreyVeiculo';
import { BoxGreyServico } from './BoxGreyServico';
import { BoxGreyOrdemDeServico } from './BoxGreyOrdemDeServico';


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

if (componenteAtivo === "buttonOrdemDeServico"){
    return (
        <BoxGreyOrdemDeServico />
    );
}



}

import { Button, IconButton, Typography } from "@mui/material";
import { Edit, Delete, AddCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { ComponentesContext } from "../useContext";

import FormNovoOS from "./FormNovoOS";

export function BoxGreyOrdemDeServico() {

  const {
    modalOpen,
    OSSelecionado,
    modalOpenOS,
    OS,
    setModalOpenOS,
    setOSSelecionado,
    setOS,
  } = useContext(ComponentesContext);

  const criarNovoOS = () => {
    setModalOpenOS(true);
    setOSSelecionado(null);
  };

    return (
      <Box
      sx={{
        backgroundColor: "#F0F0F0",
        flexGrow: 1,
        padding: "20px",
        width: "100vh",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",          
        }}>
          <Typography sx={{ fontWeight: "bold", textAlign:"center", marginLeft: "18rem", marginTop:"1rem",fontSize: 20}}> Ordens de Serviço </Typography>
          <Button
            variant="contained"
            color="warning"
            size="small"
            startIcon = {< AddCircle />}
            onClick={criarNovoOS}
            sx={{ margin: "10px", marginLeft: "auto" }}
          > Novo</Button>
          < FormNovoOS />
      </Box>
      </Box>
  
    );
  }
  
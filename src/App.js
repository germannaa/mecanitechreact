import logotipo from './img/logotipo.jpg';
import { ButtonCliente } from './Clientes/BotaoCliente';
import './App.css';
import { BoxGrey } from './BoxGrey';
import { ComponentesProvider } from './useContext';

function App() {


  return (
    <ComponentesProvider>

    <div className="App">
      <header className="App-header">
        <img src={logotipo} className="App-logo" alt="logo" />
      </header>
      <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center', marginLeft:"10px", marginTop:"50px"}}>
      <div style={{ marginLeft:"20px", width:"300px"}}>
        <ButtonCliente />
        </div>
      <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center', width: '100%' }}>
   
        <BoxGrey />
     
      </div>
    </div>
    </div>
    </ComponentesProvider>

  );
}

export default App;

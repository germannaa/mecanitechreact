import axios from 'axios';



    axios.get('http://localhost:3333/clientes')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      


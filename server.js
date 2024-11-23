import express from 'express'; //importa o express
import routes from './src/routes/postRoutes.js';

//atribui a função à constante app
const app = express();
//abre acesso para arquivos estáticos.
app.use(express.static('uploads'));
routes(app);

app.listen(3000,() => { //aciona a leitura 
    console.log('Servidor escutando');
});
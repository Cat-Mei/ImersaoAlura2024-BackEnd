import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { criarPosts, listarPosts, uploadImagem, atualizarNovoPost } from '../controller/postController.js';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}
// Configura o armazenamento de arquivos enviados pelo usuário (uploads).
// No Windows, é necessário especificar um caminho completo.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define o diretório onde os arquivos serão salvos.
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Mantém o nome original do arquivo.
  }
});

// Cria um objeto de upload utilizando o armazenamento configurado.
// O multer irá salvar os arquivos no diretório especificado.
const upload = multer({ storage });

// Função que define as rotas da aplicação.
const routes = (app) => {
  // Permite que o Express entenda requisições com corpo em formato JSON.
  app.use(express.json());

  app.use(cors(corsOptions));

  // Rota para listar todos os posts.
  app.get('/posts', listarPosts);

  // Rota para criar um novo post.
  app.post('/posts', criarPosts);

  // Rota para fazer upload de uma imagem.
  // O multer irá processar o arquivo antes de chamar a função uploadImagem.
  app.post('/upload', upload.single('imagem'), uploadImagem);

  //rota atualização do upload
  app.put('/upload/:id', atualizarNovoPost);
};

export default routes;

/*
//arquivo de rotas para a pasta post
import express from 'express';
import multer from 'multer';
import { criarPosts, listarPosts, uploadImagem } from '../controller/postController.js';

//código pronto que ajusta arquivo para windows...
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
});

//cria um armazenamento para o upload que recebe a função de destino do multer.
//./uploads é o caminho padrão em back-end (convenção).
// storage refere ao código acima
const upload = multer({dest:"./uploads", storage});
//no caso de linux ou mac não é necessário a função storage, então o código original basta
//const upload = multer({dest:"./uploads"});
//no windows é necessário criar a pasta uploads na raiz do projeto, enquanto mac/linux não precisa


const routes = (app) => {
    //parse de texto para json
    app.use(express.json());
    //Rota para aquisição posts
    app.get('/posts', listarPosts);
    app.post('/posts', criarPosts);
    //Upload depende do multer e a função inserida pertence ao pacote que faz a interface dos sistemas.
    //single refere ao número de arquivos simultâneos.
    app.post('/upload',upload.single("imagem"), uploadImagem);
    //upload.single(...) é midleware (programa intermediário necessário para funcionalidade)
}



//Criar, Ler, Deletar, Atualizar entre outros
export default routes;
*/
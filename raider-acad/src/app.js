const express = require('express');
const path = require('path');
const app = express();

// Configurar o diretório 'public' para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar o diretório 'views' e o mecanismo de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar acesso ao BD (mongoose)
const mongoose = require('mongoose');
let url = 'mongodb+srv://admin:eljg123@fatec.tswzq.mongodb.net/';
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar ao MongoDB'));

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Importar rotas
const userRoute = require('./routes/userRoutes');
const indexRoutes = require('./routes/index');
app.use(userRoute);
app.use('/', indexRoutes);

// Definir porta e iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

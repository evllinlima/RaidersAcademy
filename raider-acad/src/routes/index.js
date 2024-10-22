const express = require('express');
const router = express.Router();

// Controlador HomeController
const HomeController = require('../controllers/HomeController');

// Rota para a página "Disciplinas"
router.get('/disciplinas', (req, res) => {
    res.render('disciplinas', { title: 'Disciplinas - Raiders Academy' });
  });

  router.get('/forumPerguntas', (req, res) => {
    const disciplina = req.query.disciplina;  // Captura o valor da query string
    res.render('forumPerguntas', { title: 'Fórum de Perguntas - Raiders Academy', disciplina });
  });

// Rota para a página inicial (home)
router.get('/', HomeController.index);

// Rota para a página "Sobre"
router.get('/sobre', (req, res) => {
  res.render('sobre', { title: 'Sobre - Raiders Academy' });
});

// Rota para a página "Recursos"
router.get('/recursos', (req, res) => {
  res.render('recursos', { title: 'Recursos - Raiders Academy' });
});

// Rota para a página "Como Funciona"
router.get('/como-funciona', (req, res) => {
  res.render('como-funciona', { title: 'Como Funciona - Raiders Academy' });
});

router.get('/login', (req, res) => {
  res.render('login' )
})

// Rota catch-all para redirecionar para a página inicial (home)
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;

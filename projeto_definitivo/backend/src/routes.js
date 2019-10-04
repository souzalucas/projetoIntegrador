//Retorna uma função do módulo do express, porém não a executa
var express = require('express');
var router = express.Router();
var connection = require('./connection')

const SELECT_ALL_AREAS_QUERY = 'SELECT * FROM areas_de_atividade';

//função de callback
router.get('/', function(req,res){
   res.send('Vá para /areas para ver as areas de atividade');
});
   
router.post('/teste',function(req,res){
      //req.query = Acessar query params(para filtros)
      //req.params = Acessar route params(para edição,delite) 
      //req.body = Acessar corpo da requisição(para criação e edição)
      return res.json(req.body);
});

router.get('/areas', function(req,res){
   // res.send("<html><body>Áreas de Atividades</body><html>");
   connection.query(SELECT_ALL_AREAS_QUERY, (err, results) => {
      if(err) {
         return res.send(err);
      } else {
         return res.json({
            data: results
         });
      }
   });
});

module.exports = router;
   //Retorna uma função do módulo do express, porém não a executa
   var express = require('express');
   var router = express.Router();

   //função de callback
   router.get('/', function(req,res){
      res.send("Hello World");
   });

   
   router.post('/teste',function(req,res){
        //req.query = Acessar query params(para filtros)
        //req.params = Acessar route params(para edição,delite) 
        //req.body = Acessar corpo da requisição(para criação e edição)
        return res.json(req.body);
   });

   router.get('/areas', function(req,res){
      res.send("<html><body>Áreas de Atividades</body><html>");
   });

   module.exports = router;
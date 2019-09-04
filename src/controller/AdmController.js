const express = require('express');
const router = express.Router();
const Adm = require('../models/adm');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const auth = require('../middlewares/auth');


//Funçoes Auxiliares
const createUserToken = (admId) => {
    return jwt.sign({id: admId}, 'wilkcaetano', { expiresIn: '7d'});
}

//Lista de Usuários, Só usuários autenticados
router.get('/lista-users', auth, async (req, res) =>{
    try{
        const adms = await Adm.find({});
        return res.send(adm);
    }
    catch(err){
        return res.status(500).send({error: 'Erro na consulta de usuários!'});
    }
});


//Criação de usuários
router.post('/create', async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({error: 'Dados Insuficientes!'});

    try{
        if(await Adm.findOne({email})) return res.status(400).send({error: 'Email já existente!'});
        const adm = await Adm.create(req.body);
        adm.password = undefined;
        return res.status(201).send({adm, token: createUserToken(adm.id)});
    }
    catch(err){
        return res.status(500).send({error: 'Erro ao buscar usuário!'});
    }
});


//Autenticação de usuários Será enviado um email e uma senha caso o usuário esteja cadastrado irá retornar os dados com nome email eo token
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({error: 'Dados insuficientes!'});
    try{
        const adm = await Adm.findOne({email}).select('+password');
        
         if(!adm) return res.status(400).send({error: 'Usuário e/ou senha inválidos!'});
        
        const pass_ok = await bcrypt.compare(password, adm.password);
        if(!pass_ok) return res.status(401).send({error: 'Usuário e/ou senha inválidos'});

        adm.password = undefined;
        return res.send({adm, token: createUserToken(adm.id)});
    }
    catch(err){
        return res.status(500).send({error:'Não autorizado'});
    }
});


module.exports = router;
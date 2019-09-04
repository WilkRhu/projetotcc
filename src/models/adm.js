const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');



//Model para criação do banco de dados cadastro de usuários
const AdmSchema = new Schema({
    fristname: {type: String, required: true, min:1, max:100},
    lastname: {type: String, required: true, min:1, max:100},
    functions: {type: String, required: false,},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: {type: Date, default: Date.now},
    update_adm: {type: Date}

});

//Função de Encriptção de Senha 
AdmSchema.pre('save', async function(next){
    let adm = this;
    if(!adm.isModified('password')) return next();
    
    adm.password = await bcrypt.hash(adm.password, 10);
    return next();

});



module.exports = mongoose.model('Adm', AdmSchema);
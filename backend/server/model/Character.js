'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CharacterSchema = new Schema({
    nome: String,
    sexo: String,
    idade: Number,
    cabelo: String,
    olhos: String,
    pessoasRelacionadas: {
        mae: String,
        pai: String,
        amigos: [],
        inimigos: []
    },
    origem: String,
    atividade: String,
    voz: String,
    caracteristicas: []
});

module.exports = mongoose.model('character', CharacterSchema);
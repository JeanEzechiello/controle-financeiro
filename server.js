const express = require('express')
const app = express()
const port = 3000

const transacoes = [{id:1, descricao:'Salário', valor:1200, tipo: 'receita'}]

app.get('/transacoes', (req, res) => {
    res.json(transacoes)
})

app.listen(port, () => {
    console.log('Servidor rodando')
})
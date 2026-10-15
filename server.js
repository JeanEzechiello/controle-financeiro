const express = require('express')
const app = express()
const port = 3000

const transacoes = [ 
    {id:1, descricao:'Salário', valor:1200, tipo: 'receita'}, 
    {id:2, descricao: 'Internet', valor:80, tipo: 'despesa'}
]

app.get('/transacoes', (req, res) => {
    res.json(transacoes)
})

app.listen(port, () => {
    console.log('Servidor rodando')
})
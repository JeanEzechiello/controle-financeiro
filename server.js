const express = require('express')
const app = express()
const port = 3000

const transacoes = [ 
    {id:1, descricao:'Salário', valor:1200, tipo: 'receita'}, 
    {id:2, descricao: 'Internet', valor:80, tipo: 'despesa'}
]

app.get('/', (req, res) => {
    res.send('Olá controle financeiro!')
})

app.get('/transacoes', (req, res) => {
    res.json(transacoes)
})

app.get('/transacoes/:id', (req, res) => {
    const id = Number(req.params.id)
    const transacao = transacoes.find(t => t.id === id)
    if(!transacao) {
        return res.status(404).json({erro: 'Transação não encontrada'})
    }
    res.json(transacao)
})

app.listen(port, () => {
    console.log('Servidor rodando')
})
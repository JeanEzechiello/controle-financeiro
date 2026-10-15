const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

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
app.post ('/transacoes', (req,res) => {
    const nova = req.body
    nova.id = transacoes.length + 1
    transacoes.push(nova)
    res.status(201).json(nova)
})

app.listen(port, () => {
    console.log('Servidor rodando')
})
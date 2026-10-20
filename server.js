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
   
    const {descricao, valor, tipo} = req.body
    if(!descricao || !valor || !tipo ) {
        return res.status(400).json({ erro: 'descricao, valor e tipo são obrigatórios'})
    }
    const nova = { id: transacoes.length + 1, descricao, valor, tipo }
    transacoes.push(nova)
    res.status(201).json(nova)
})

app.delete('/transacoes/:id', (req,res) => {
    const id = Number(req.params.id)
    const indice = transacoes.findIndex(t => t.id === id)
    if(indice === -1) {
        return res.status(404).json({erro: 'Transação não encontrada'})
    }
        
    transacoes.splice(indice, 1)
    res.status(204).send()
})

app.listen(port, () => {
    console.log('Servidor rodando')
})
const express = require('express')
const Database = require('better-sqlite3')
const db = new Database('financeiro.db')
db.exec(`
    CREATE TABLE IF NOT EXISTS transacoes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,   
    descricao TEXT NOT NULL,
    valor REAL NOT NULL,
    tipo TEXT NOT NULL
    )
    `)
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Olá controle financeiro!')
})

app.get('/transacoes', (req, res) => {
    const lista = db.prepare('SELECT * FROM transacoes').all()
    res.json(lista)
})

app.get('/transacoes/:id', (req, res) => {
    const id = Number(req.params.id)
    const transacao = db.prepare('SELECT * FROM transacoes WHERE id = ?').get(id)
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
    const info = db.prepare('INSERT INTO transacoes (descricao, valor, tipo) VALUES (?, ?, ?)').run(descricao, valor, tipo)
    const nova = {id: info.lastInsertRowid, descricao, valor, tipo}
    res.status(201).json(nova)
})

app.delete('/transacoes/:id', (req,res) => {
    const id = Number(req.params.id)
    const info = db.prepare('DELETE FROM transacoes WHERE id = ?').run(id)
    if(info.changes === 0 ) {
        return res.status(404).json({erro: 'Transação não encontrada'})
    }
    res.status(204).send()
})

app.put('/transacoes/:id', (req,res) => {
    const id = Number(req.params.id)
    const {descricao, valor, tipo} = req.body
    if (!descricao || !valor || !tipo) {
        return res.status(400).json({
            erro: 'descricao, valor e tipo são obrigatórios'
        })
     }
    const info = db.prepare('UPDATE transacoes SET descricao = ?, valor = ?, tipo = ? WHERE id = ?').run(descricao, valor, tipo, id)

    if(info.changes === 0) {
        return res.status(404).json({erro: 'Transação não encontrada'})
    }
    
     res.json({id, descricao, valor, tipo})
})

app.listen(port, () => {
    console.log('Servidor rodando')
})
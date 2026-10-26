# Controle Financeiro

API REST de controle financeiro pessoal, feita com Node.js e Express. Permite criar, listar, editar e apagar transações (receitas e despesas), com validação de dados e tratamento de erros.

> Projeto em desenvolvimento. Atualmente os dados ficam em memória (somem ao reiniciar o servidor).

## Tecnologias

- Node.js
- Express

## Como rodar

1. Clone o repositório:

```bash
git clone https://github.com/JeanEzechiello/controle-financeiro.git
cd controle-financeiro
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
node server.js
```

4. O servidor sobe em `http://localhost:3000`.

## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Mensagem de boas-vindas |
| GET | `/transacoes` | Lista todas as transações |
| GET | `/transacoes/:id` | Busca uma transação pelo id |
| POST | `/transacoes` | Cria uma nova transação |
| PUT | `/transacoes/:id` | Atualiza uma transação existente |
| DELETE | `/transacoes/:id` | Remove uma transação |

### Exemplo de corpo (POST e PUT)

```json
{
  "descricao": "Mercado",
  "valor": 150,
  "tipo": "despesa"
}
```

### Respostas

- `200` OK (GET e PUT)
- `201` Transação criada (POST)
- `204` Transação removida (DELETE)
- `400` Dados obrigatórios ausentes (`descricao`, `valor` e `tipo`)
- `404` Transação não encontrada

## Próximos passos

- [ ] Validar `tipo` (apenas `receita` ou `despesa`) e `valor` positivo
- [ ] Trocar o array por um banco de dados (SQLite)
- [ ] Autenticação de usuários (login com JWT)
- [ ] Front-end consumindo a API
- [ ] Dashboard com gráficos

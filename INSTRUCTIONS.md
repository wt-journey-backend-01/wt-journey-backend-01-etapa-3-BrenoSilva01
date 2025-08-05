# Instruções para rodar o projeto

## 1. Subir o banco de dados com Docker
Certifique-se de que o Docker Desktop está rodando.
Na raiz do projeto, execute:
```bash
docker-compose up -d
```
Isso irá criar e iniciar um container PostgreSQL com os dados configurados no arquivo `.env`.

---

## 2. Executar migrations
As migrations criam as tabelas no banco de dados.
Execute:
```bash
npx knex migrate:latest
```

---

## 3. Rodar seeds
As seeds inserem dados iniciais no banco de dados.
Execute:
```bash
npx knex seed:run
```

---

## 4. Rodar a aplicação
Depois que o banco estiver rodando e as tabelas populadas, inicie a API:
```bash
node server.js
```

A API ficará disponível em:
```
http://localhost:3000
```

Rotas disponíveis:
- `GET /agentes`
- `GET /casos`

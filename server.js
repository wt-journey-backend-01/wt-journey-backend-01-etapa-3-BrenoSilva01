require('dotenv').config(); // Para ler o .env
const express = require('express');
const app = express();

// Rotas
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

// Middleware para JSON
app.use(express.json());

// Rotas da API
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

//teste

app.get('/', (req, res) => {
  res.send('🚓 API do Departamento de Polícia rodando! Use /agentes ou /casos');
});


// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

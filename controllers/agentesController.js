const agentesRepository = require('../repositories/agentesRepository');

// Utilitário simples para validar data no formato YYYY-MM-DD
function isValidDate(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

// GET /agentes
async function getAllAgentes(req, res) {
  try {
    const agentes = await agentesRepository.findAll();
    res.json(agentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar agentes" });
  }
}

// GET /agentes/:id
async function getAgenteById(req, res) {
  try {
    const agente = await agentesRepository.findById(req.params.id);
    if (!agente) return res.status(404).json({ error: "Agente não encontrado" });
    res.json(agente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar agente" });
  }
}

// POST /agentes
async function createAgente(req, res) {
  try {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!nome || !dataDeIncorporacao || !cargo) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (!isValidDate(dataDeIncorporacao)) {
      return res.status(400).json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
    }

    const [novoAgente] = await agentesRepository.create({ nome, dataDeIncorporacao, cargo });
    res.status(201).json(novoAgente);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar agente" });
  }
}

// PUT /agentes/:id
async function updateAgente(req, res) {
  try {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!nome || !dataDeIncorporacao || !cargo) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (!isValidDate(dataDeIncorporacao)) {
      return res.status(400).json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
    }

    const [atualizado] = await agentesRepository.update(req.params.id, { nome, dataDeIncorporacao, cargo });

    if (!atualizado) return res.status(404).json({ error: "Agente não encontrado" });

    res.json(atualizado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar agente" });
  }
}

// PATCH /agentes/:id
async function patchAgente(req, res) {
  try {
    if (req.body.dataDeIncorporacao && !isValidDate(req.body.dataDeIncorporacao)) {
      return res.status(400).json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
    }

    const [atualizado] = await agentesRepository.update(req.params.id, req.body);

    if (!atualizado) return res.status(404).json({ error: "Agente não encontrado" });

    res.json(atualizado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar agente" });
  }
}

// DELETE /agentes/:id
async function deleteAgente(req, res) {
  try {
    const removido = await agentesRepository.remove(req.params.id);
    if (!removido) return res.status(404).json({ error: "Agente não encontrado" });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover agente" });
  }
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente,
};

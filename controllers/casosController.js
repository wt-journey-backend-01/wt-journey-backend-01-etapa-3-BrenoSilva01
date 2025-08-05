const casosRepository = require('../repositories/casosRepository');

// GET /casos
async function getAllCasos(req, res) {
  try {
    const casos = await casosRepository.findAll();
    res.json(casos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar casos" });
  }
}

// GET /casos/:id
async function getCasoById(req, res) {
  try {
    const caso = await casosRepository.findById(req.params.id);
    if (!caso) return res.status(404).json({ error: "Caso não encontrado" });
    res.json(caso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar caso" });
  }
}

// POST /casos
async function createCaso(req, res) {
  try {
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (!["aberto", "solucionado"].includes(status)) {
      return res.status(400).json({ error: 'Status inválido. Use "aberto" ou "solucionado"' });
    }

    const [novoCaso] = await casosRepository.create({ titulo, descricao, status, agente_id });
    res.status(201).json(novoCaso);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar caso" });
  }
}

// PUT /casos/:id
async function updateCaso(req, res) {
  try {
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (!["aberto", "solucionado"].includes(status)) {
      return res.status(400).json({ error: 'Status inválido. Use "aberto" ou "solucionado"' });
    }

    const [atualizado] = await casosRepository.update(req.params.id, { titulo, descricao, status, agente_id });

    if (!atualizado) return res.status(404).json({ error: "Caso não encontrado" });

    res.json(atualizado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar caso" });
  }
}

// PATCH /casos/:id
async function patchCaso(req, res) {
  try {
    if (req.body.status && !["aberto", "solucionado"].includes(req.body.status)) {
      return res.status(400).json({ error: 'Status inválido. Use "aberto" ou "solucionado"' });
    }

    const [atualizado] = await casosRepository.update(req.params.id, req.body);

    if (!atualizado) return res.status(404).json({ error: "Caso não encontrado" });

    res.json(atualizado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar caso" });
  }
}

// DELETE /casos/:id
async function deleteCaso(req, res) {
  try {
    const removido = await casosRepository.remove(req.params.id);
    if (!removido) return res.status(404).json({ error: "Caso não encontrado" });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover caso" });
  }
}

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  patchCaso,
  deleteCaso,
};

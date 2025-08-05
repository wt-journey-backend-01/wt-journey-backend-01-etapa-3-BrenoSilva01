exports.seed = async function(knex) {
  // Apaga registros existentes
  await knex('casos').del();

  // Insere casos referenciando agentes existentes
  await knex('casos').insert([
    { titulo: 'Homicídio', descricao: 'Disparos foram reportados às 22:33 no bairro União', status: 'aberto', agente_id: 1 },
    { titulo: 'Roubo', descricao: 'Assalto à mão armada na área central', status: 'solucionado', agente_id: 2 }
  ]);
};

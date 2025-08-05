exports.seed = async function(knex) {
  // Apaga todos os registros antes de inserir novamente
  await knex('casos').del(); // apaga primeiro os casos que dependem de agentes
  await knex('agentes').del();

  // Insere agentes com IDs fixos
  await knex('agentes').insert([
    { id: 1, nome: 'Rommel Carneiro', dataDeIncorporacao: '1992-10-04', cargo: 'delegado' },
    { id: 2, nome: 'Joana Lima', dataDeIncorporacao: '2017-03-15', cargo: 'inspetor' }
  ]);
};

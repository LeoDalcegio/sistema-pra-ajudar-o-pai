
exports.up = function(knex) {
    return knex.schema.createTable('movimentacao', function (table) {
        table.increments('id');
        table.integer('numero_da_nota', 50).notNullable();
        table.string('tipo', 1).notNullable();
        table.string('observacao', 600);
        table.date('data_da_movimentacao', 600).notNullable();
        table.decimal('quantidade', 600).notNullable();

        table.integer('produto_id').notNullable();
        table.integer('cliente_id').notNullable();

        table.foreign('produto_id').references('id').inTable('produto')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.foreign('cliente_id').references('id').inTable('cliente')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};
  
exports.down = function(knex) {
    knex.schema.dropTable('movimentacao');
};
  
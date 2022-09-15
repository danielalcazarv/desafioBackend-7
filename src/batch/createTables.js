import knex from "knex";
import { config } from "../utils/config.js";

const knexCli = knex(config.db);

knexCli.schema.dropTableIfExists('productos')
    .then(()=>{
        knexCli.schema.createTable('productos', table =>{
            table.increments('id').primary();
            table.string('nombre', 50).notNullable();
            table.string('descripcion', 200).notNullable();
            table.integer('codigo').notNullable().unsigned();
            table.float('precio').notNullable().unsigned();
            table.integer('stock').notNullable().unsigned();
            table.string('foto', 500).notNullable();
        })
            .then(()=>console.log('Tabla Creada'))
            .catch(err=>{
                console.log(err);
                throw err;
            })
            .finally(()=>{
                knexCli.destroy();
            });
    });
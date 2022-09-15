import knex from "knex";
import { config, config2 } from "../utils/config.js";

const knexCli = knex(config.db);
const knexCli2 = knex(config2.db);

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
            .then(()=>console.log('Tabla Productos Creada'))
            .catch(err=>{
                console.log(err);
                throw err;
            })
            .finally(()=>{
                knexCli.destroy();
            });
    });


knexCli2.schema.dropTableIfExists('historial')
    .then(()=>{
        knexCli2.schema.createTable('historial', table =>{
            table.increments('id').primary();
            table.string('email', 50).notNullable();
            table.string('time', 50).notNullable();
            table.string('mensaje', 1000).notNullable();
        })
            .then(()=>console.log('Tabla Historial Creada'))
            .catch(err=>{
                console.log(err);
                throw err;
            })
            .finally(()=>{
                knexCli2.destroy();
            });
    })
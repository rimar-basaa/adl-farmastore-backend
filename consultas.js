const { Pool } = require("pg");
const format = require('pg-format');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "rimar",
    database: "farmacia",
    port: 5432,
    allowExitOnIdle: true
});

// Agregamos la función obtenerMedicamentos
const obtenerMedicamentos = async ({ limits = 10}) => {
    const consulta = "SELECT * FROM medicamentos LIMIT $1";
    const { rows: medicamentos } = await pool.query(consulta, [limits]);
    return medicamentos;
};

module.exports = { obtenerMedicamentos }
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


const obtenerMedicamentos = async ({ order_by = 'id_ASC', limits = 10, page = 1 }) => {
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const consultaFormateada = format('SELECT * FROM medicamentos ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);    
    const { rows } = await pool.query(consultaFormateada);
    return rows;
};

//consulta parametrizada
const obtenerMedicamentosFiltrados = async ({ stock_min, precio_max }) => {
    let filtros = [];
    let values = [];

    const agregarFiltro = (campo, comparador, valor) => {
        values.push(valor);
        const { length } = filtros;
        console.log(length);
        filtros.push(`${campo} ${comparador} $${length + 1}`);
        console.log(filtros);
    }

    if (stock_min) agregarFiltro('stock', '>=', stock_min);
    if (precio_max) agregarFiltro('precio', '<=', precio_max);

    let consulta = "SELECT * FROM medicamentos";
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ");
        consulta += ` WHERE ${filtros}`;
    };
    const { rows } = await pool.query(consulta, values);
    return rows;
};

module.exports = { obtenerMedicamentos, obtenerMedicamentosFiltrados };

/*
//consulta SIN parametrizar
const obtenerMedicamentosFiltrados = async ({ stock_min, precio_max }) => {
    let filtros = [];
    if (stock_min) filtros.push(`stock >= ${stock_min}`);
    if (precio_max) filtros.push(`precio <= ${precio_max}`);

    let consulta = "SELECT * FROM medicamentos";
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ");
        consulta += ` WHERE ${filtros}`;
    };
    const { rows } = await pool.query(consulta);
    return rows;
};
*/


const express = require('express');
const app = express();
const { obtenerMedicamentos, obtenerMedicamentosFiltrados } = require('./consultas');


const crearHATEOAS = (medicamentos) => {
    const resultado = medicamentos.map((item) => {
        return {
            name: item.nombre,
            href: `medicamentos/medicamento/${item.id}`
        };
    });
    const total = medicamentos.length;
    const HATEOAS = {
        total,
        resultado
    };
    return HATEOAS;
};

app.get('/medicamentos', async (req, res) => {
    const queryStrings = req.query;
    const medicamentos = await obtenerMedicamentos(queryStrings);
    const HATEOAS = crearHATEOAS(medicamentos);
    res.status(200).json(HATEOAS);
});

app.get('/medicamentos/filtros', async (req, res) => {
    const queryStrings = req.query;
    const medicamentos = await obtenerMedicamentosFiltrados(queryStrings);
    res.status(200).json(medicamentos);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Servidor corriendo... en puerto:${PORT}`));


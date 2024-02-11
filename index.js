const express = require('express');
const app = express();
const { obtenerMedicamentos } = require('./consultas');


app.get('/medicamentos', async (req, res) => {
    const queryStrings = req.query;
    const medicamentos = await obtenerMedicamentos(queryStrings);
    res.status(200).json(medicamentos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Servidor corriendo... en puerto:${PORT}`));


const fs = require('fs')

const eliminar = (x) => {

        const eliminarJSON = JSON.parse(fs.readFileSync("Gastos.json", 'utf8'))
        eliminarJSON.gastos = eliminarJSON.gastos.filter((e) => e.id !== x)
        fs.writeFileSync('Gastos.json', JSON.stringify(eliminarJSON))
}

module.exports = {eliminar}
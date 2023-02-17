const fs = require('fs')

const modificarGasto = (req, res, x) => {
    let body
    req.on("data", (chunk) => {
        body = JSON.parse(chunk)
    })
    req.on('end', () => {
        const gastosJSON = JSON.parse(fs.readFileSync("Gastos.json", 'utf8'))
        const gastos1 = gastosJSON.gastos
        const gastosOriginal = gastos1.filter((e) => e.id !== x)
        const registro = {
            id: x,
            roommate: body.roommate,
            descripcion: body.descripcion,
            monto: body.monto

        }
        const final = {'gastos':[]}
        final.gastos = gastosOriginal
        final.gastos.push(registro)
        fs.writeFileSync('Gastos.json', JSON.stringify(final))
    })
    res.end()
}

module.exports = {modificarGasto}
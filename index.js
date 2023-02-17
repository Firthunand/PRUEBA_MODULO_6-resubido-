// importar modulos requeridos
const url = require('url')
const axios = require('axios')
const fs = require('fs')
const http = require('http')
const {v4:uuidv4} = require('uuid')
const { newRoommate, saveRoommate } = require('./roomate.js')
const { modificarGasto } = require('./gastos.js')
const { eliminar } = require('./borrar.js')
// levantar el servidor
http
    .createServer(function (req, res) {
        let id = ""
        if (req.url == ("/") && req.method == "GET") {
            res.setHeader('Content-Type', 'text/html')
            res.end(fs.readFileSync('index.html', 'utf8'))
        }
        if (req.url.startsWith("/roommate") && req.method == "POST") {
            newRoommate().then((roommate) => {
                saveRoommate(roommate)
                res.end(JSON.stringify(roommate))
            }).catch((err) => {
                res.statusCode = 500;
                res.end()
                console.log('Error al registrar un roommate', err)
            })
        }
        if (req.url.startsWith("/roommates") && req.method == "GET") {
            res.setHeader('Content-Type', 'application/json')
            res.end(fs.readFileSync('Roommates.json', 'utf8'))
        }
        if (req.url.startsWith("/gastos") && req.method == "GET") {
            res.setHeader('Content-Type', 'application/json')
            res.end(fs.readFileSync('Gastos.json', 'utf8'));
        }
        if (req.url.startsWith("/gasto") && req.method == "POST") {
            let spending = ''
            let gastosJSON = JSON.parse(fs.readFileSync("Gastos.json", 'utf8'))
            req.on('data', (chunk) => {
                spending = chunk.toString()
            })
            req.on('end', () => {
                const newGasto = JSON.parse(spending)
                const gasto = {
                    id: uuidv4().slice(30),
                    roommate: `${newGasto.roommate}`,
                    descripcion: `${newGasto.descripcion}`,
                    monto: `${newGasto.monto}`,
                }
                gastosJSON.gastos.push(gasto)
                fs.writeFile("Gastos.json", JSON.stringify(gastosJSON), (err) => {
                    if(err){
                        console.log('Ha ocurrido un problema con su request')
                    } else {
                        console.log('Resquest exitoso')
                    }
                    res.end("se han agregado los gastos")
                })
            })
        }
        if (req.url.startsWith(`/gasto?id=${id}`) && req.method == "PUT") {
            const {id} = url.parse(req.url, true).query
            modificarGasto(req, res, id)
        }
        if (req.url.startsWith(`/gasto?id=${id}`) && req.method == "DELETE") {
            const {id} = url.parse(req.url, true).query
            eliminar(id)
            res.end()
        }

    }).listen(3000, console.log('server creado accediendo al puerto 3000'));


// importacion de modulos requeridos
const axios = require('axios')
const {v4:uuidv4} = require('uuid')
const fs = require('fs')
// crear roommate con el api random
const newRoommate = async()=>{
    try {
        const {data} = await axios.get('https://randomuser.me/api/')
        const mate = data.results[0]
        const roommateNew = {
            id: uuidv4().slice(30),
            nombre: `${mate.name.first} ${mate.name.last}`,
            debe: Math.floor((Math.random()+1)*444),
            recibe: Math.floor((Math.random()+1)*666)
        };
    return roommateNew;  
    }catch(err) {
        throw err;
    }
}
// para agregar roommates a el json
const saveRoommate = (mate) => {
    const roommateJSON = JSON.parse(fs.readFileSync('Roommates.json','utf8'))
    roommateJSON.roommates.push(mate)
    fs.writeFileSync('Roommates.json', JSON.stringify(roommateJSON))
}
// exportacion de modulos al index.js
module.exports={newRoommate, saveRoommate}
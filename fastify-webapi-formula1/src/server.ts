import fastify from 'fastify'
import cors from '@fastify/cors'

const server = fastify()

server.register(cors, {
    origin: "*"
})

const teams = [ { id: 1, name: "Mercedes-AMG", base: "Brackley, UK"},
{id: 2, name: "Red Bull Racing", base: "Milton Keynes, UK"},
{id: 3, name: "Scuderia Ferrari", base: "Charles Leclerc"},
{id: 4, name: "McLaren", base: "Lando Norris"}]


const drivers = [{id:1, name: "Lewis Hamilton", team: "Mercedes-AMG" },
                {id:2, name: "Max Verstappen", team: "Red Bull Racing" },
                {id:3, name: "Charles Leclerc", team: "Ferrari" },
                {id:4, name: "Lando Norris", team: "McLaren" }
]

server.get('/teams', (req, res)=>{
    res.type('application/json').code(200)
    
    return teams
})

server.get('/drivers', (req, res)=>{
    res.type('application/json').code(200)
    return drivers
})

interface DriverFilter{
    id: string
}

server.get<{Params: DriverFilter}>('/drivers/:id', async(req,res)=>{
 const id = parseInt(req.params.id)
 const driver = drivers.find((d) => d.id === id)

 if(!driver){
    res.type('application/json').code(404)
    return { message : "Driver Not Found"}
 }else{
    res.type('application/json').code(200)
    return {driver}
 }

})

server.listen({port: 3000}, ()=>{
  console.log('server ')
})
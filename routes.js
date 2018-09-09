const { Athena } = require('./Athena')
const { ObjectID } = require('mongodb')

function attachRoutes(app) {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path} : ${Date().toString()}`)
        next()
    })
    
    app.get('/', (req, res) => {
        res.json({'message':'Hello Edison'})
    })
    
    app.get('/devices', async (req, res) => {
        const db = await Athena.getInstance()
        const collection = db.collection('devices')
        const results = collection.find()
        const devices = await results.toArray()
        res.json(devices)
    })
    
    app.get('/devices/room/:identifier', async (req, res) => {
        const db = await Athena.getInstance()
        const collection = db.collection('devices')
        const id = req.params['identifier']
        const results = collection.find({room: ObjectID(id)})
        const devices = await results.toArray()
        res.json({message: 'Query Success', devices})
    })
    
    app.get('/devices/room/:identifier/type/:type', async (req, res) => {
        const db = await Athena.getInstance()
        const collection = db.collection('devices')
        const id = req.params['identifier']
        const type = req.params['type']
        const results = collection.find({room: ObjectID(id), type: type})
        const devices = await results.toArray()
        res.json({message: 'Query Success', devices})
    })
    
    app.get('/devices/type/:identifier', async (req, res) => {
        const db = await Athena.getInstance()
        const collection = db.collection('devices')
        const id = req.params['identifier']
        const results = collection.find({type: id})
        const devices = await results.toArray()
        res.json({message: 'Query Success', devices})
    })
    
    app.get('/device/id/:identifier', async (req, res) => {
        const db = await Athena.getInstance()
        const collection = db.collection('devices')
        const id = req.params['identifier']
        const results = collection.findOne(ObjectID(id))
        const device = await results
        res.json({message: 'Query Success', device})
    })
    
    app.get('/rooms', async (req, res) => {
        const db = await Athena.getInstance()
        const collection = db.collection('rooms')
        const results = collection.find()
        const rooms = await results.toArray()
        res.json({message: 'Query Success', rooms})
    })
    
    app.get('/room/id/:identifier', async (req, res) => {
        const db = await Athena.getInstance()
        const collection = db.collection('rooms')
        const id = req.params['identifier']
        const results = collection.findOne(ObjectID(id))
        const room = await results
        res.json({message: 'Query Success', room})
    })
}

exports.attachRoutes = attachRoutes

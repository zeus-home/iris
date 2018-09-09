const { attachRoutes } = require('./routes');
const express = require('express')
const app = express()

const PORT = 3000

attachRoutes(app);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

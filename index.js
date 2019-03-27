const app = require('./server.js');
const focusbot = require('./focusbot/index');

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`\n** server is on port ${port} **\n`));

focusbot.createBot();
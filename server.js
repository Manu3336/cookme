const chalk = require('chalk');
const app = require('./app');

const PORT = process.env.PORT || 9090;


app.listen(PORT, () => {
    console.log(chalk.bold.green(`listening on ${PORT}`))
});

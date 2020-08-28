const yargs = require('yargs');
const { default: chalk } = require('chalk');
const dotenv = require('dotenv').config()

const user = process.env.FTPUSER;
const password = process.env.PASSWORD;
const host = process.env.HOST;

const error = (msg) => {
  console.log(chalk.red(msg))
  process.exit(244);
}

!user && error('Имя пользователя не найдено. Нужно добавить в .env')
!password && error('Пароль не найден. Нужно добавить в .env')
!host && error('Адрес фтп не найден. Нужно добавить в .env')

const config = { user, host, password }

yargs
  .demandCommand(2)
  .command(
    'publish',
    'Опубликовывает сайт',
    (yargs) => {
      yargs
        .positional('block', {
          describe: 'update awesome-block types',
          type: 'string',
        })
        .options({
          all: {
            alias: 'a',
            describe: 'update all blocks',
          },
        })
    },
    (argv) => {
      require('./publish').run(config)
    }
  )
  .command(
    'apply-backup',
    'Откатывает на последний бэкап',
    (argv) => {
      require('./backup').run(config)
    }
  )
  .help().argv
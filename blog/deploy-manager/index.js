const yargs = require('yargs');
const { default: chalk } = require('chalk');
require('dotenv').config()

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
  .demandCommand(1)
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
      require('./deploy-manager').publish(config)
    }
  )
  .command(
    'backup-last',
    'Откатывает на последний бэкап',
    (argv) => {
      require('./deploy-manager').applyLastBackup(config)
    }
  )
  .command(
    'backup-show',
    'Показывает список всех доступных бэкапов',
    (argv) => {
      require('./deploy-manager').showBackups(config)
    }
  )
  .command(
    'backup-apply [backup]',
    'Применяет указанный бэкап',
    (yargs) => {
      yargs
        .positional('backup', {
          describe: 'update awesome-block types',
          type: 'string',
        })
    },
    (argv) => {
      console.log(argv.backup)
      require('./deploy-manager').applyBackup(config, argv.backup)
    }
  )
  .help().argv
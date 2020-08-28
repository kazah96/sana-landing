
const chalk = require('chalk')
const config = require('./config.json')

const { getConnection, getLastBackup } = require('./utils');

const { ftpSiteDir, failedSiteDir } = config

module.exports.run = async function backup({ password, user, host }) {
  const c = await getConnection({ password, user, host })

  console.log(chalk.gray('Поиск бэкапов...'))
  const lastFound = await getLastBackup(c);
  console.log(chalk.gray(`Откатываемся на последний найденный бэкап ${lastFound}...`))

  await c.rename(ftpSiteDir, failedSiteDir);
  await c.rename(lastFound, ftpSiteDir);

  console.log(chalk.green('Готово'))

  c.end()
}

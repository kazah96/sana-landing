
const chalk = require('chalk')
const config = require('./config.json')

const { uploadDir, getConnection } = require('./utils');

const { localBuildDir, ftpSiteDir } = config

module.exports.run = async function publish({ password, user, host }) {
  const c = await getConnection({ password, user, host })

  console.log(chalk.blue('Загружаем текущий билд'))
  await uploadDir(c, localBuildDir);

  console.log(chalk.blue('Делаем backup текущего сайта'))
  const backupName = await makeBackup(c)

  console.log(chalk.blue('Заменяем'))
  await c.rename(localBuildDir, ftpSiteDir)

  c.end()

  console.log(chalk.green(`Успешно передали`))
  console.log(chalk.green(`Создан бэкап ${chalk.blue(backupName)}`))
}
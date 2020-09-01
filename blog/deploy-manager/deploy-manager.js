
const chalk = require('chalk')
const config = require('./config.json')

const { uploadDir, getConnection, makeBackup, fallbackToBackup, getBackupList } = require('./utils');

const { localBuildDir, ftpSiteDir, failedSiteDir } = config

module.exports.publish = async function publish({ password, user, host }) {
  const c = await getConnection({ password, user, host })

  console.log(chalk.blue('Загружаем текущий билд'))
  await uploadDir(c, localBuildDir);

  console.log(chalk.blue('Делаем backup текущего сайта'))
  const backupName = await makeBackup(c, ftpSiteDir)

  console.log(chalk.blue('Заменяем'))
  await c.rename(localBuildDir, ftpSiteDir)

  c.end()

  console.log(chalk.green(`Успешно передали`))
  console.log(chalk.green(`Создан бэкап ${chalk.blue(backupName)}`))
}

module.exports.showBackups = async function showBackups({ password, user, host }) {
  const c = await getConnection({ password, user, host })

  console.log(chalk.gray('Поиск бэкапов...\n-----'))
  const list = await getBackupList(c);

  list.forEach(item => {
    console.log(`name: ${chalk.blue(item.name)} date: ${item.date}`);
  })

  c.end()
}

module.exports.applyLastBackup = async function applyLastBackup({ password, user, host }) {
  const c = await getConnection({ password, user, host })

  console.log(chalk.gray('Поиск бэкапов...'))
  const lastFound = await getLastBackup(c);

  console.log(chalk.gray(`Откатываемся на последний найденный бэкап ${lastFound}...`))
  await fallbackToBackup(c, lastFound, ftpSiteDir, failedSiteDir)

  console.log(chalk.green('Готово'))
  c.end()
}

module.exports.applyBackup = async function applyBackup({ password, user, host }, backupName) {
  const c = await getConnection({ password, user, host })
  const list = await getBackupList(c);
  if(!list.some(item => item.name === backupName)) {
    console.log(`${backupName} не найден`)

    return;
  }

  console.log(chalk.gray(`Откатываемся на бэкап ${backupName}...`))

  await fallbackToBackup(c, backupName, ftpSiteDir, failedSiteDir)

  console.log(chalk.green('Готово'))
  c.end()
}
const fs = require('fs')
const chalk = require('chalk')
const path = require("path");
const { cwd } = require('process');
const Client = require('ftp');
const { promisify } = require('util')

const generateBackupName = () => {
  const hashtable = "qwertyuiopasdfghjklzxcvbnm1234567890";
  const genHash = (len) => Array(len).fill(1).map(number => hashtable[Math.floor(Math.random() * hashtable.length)]).join("")
  const hashLen = 8

  return `backup_${Date.now()}`
}

async function makeBackup(c) {
  const backupName = generateBackupName();
  await c.cwd('~/')

  try {
    await c.rename(ftpSiteDir, backupName);
  }
  catch (e) {
    console.log(chalk.red(`Директория ${ftpSiteDir} не найдена`))
  }

  return backupName;
}

async function getLastBackup(c) {
  const list = await c.list()

  const regex = /^backup_(\d+)$/;

  const lastBack = list.filter(item => regex.test(item.name)).sort((a, b) => {
    if (a.name.split('_')[1] > b.name.split('_')[1]) return 1;
    if (a.name.split('_')[1] < b.name.split('_')[1]) return -1;

    return 0
  })

  if(!lastBack.length) return null;

  return lastBack.pop().name;
}

async function uploadDir(c, localPath) {
  let CWD = '/'

  const recursiveUpload = async (currentDir) => {
    const filesInDir = fs.readdirSync(currentDir);

    try {
      await c.mkdir(path.basename(currentDir));
    }
    catch (e) {
      console.log(`Cannot create ${chalk.redBright(path.basename(currentDir))}`)
    }

    await c.cwd(path.join('~', currentDir))
    CWD = path.join('~', currentDir);

    for (file of filesInDir) {
      if (path.join('~', currentDir) !== CWD)
        await c.cwd(path.join('~', currentDir))

      const fullPath = path.join(currentDir, file)

      if (fs.lstatSync(fullPath).isDirectory()) {
        await recursiveUpload(fullPath);
      }

      else {
        await c.put(path.resolve(cwd(), fullPath), file)
        console.log(chalk.gray(`Sending ${fullPath}`))
      }
    }
  }

  await recursiveUpload(localPath);
}

async function getConnection(config) {
  return new Promise((resolve, reject) => {
    const client = new Client();

    client.mkdir = promisify(client.mkdir).bind(client)
    client.cwd = promisify(client.cwd).bind(client)
    client.put = promisify(client.put).bind(client)
    client.rename = promisify(client.rename).bind(client)
    client.list = promisify(client.list).bind(client)

    client.connect(config)
    client.on("ready", function () {
      resolve(client)
    });
    client.on("error", (e) => {
      reject(e)
    })
  })
}



module.exports.uploadDir = uploadDir
module.exports.getConnection = getConnection
module.exports.makeBackup = makeBackup
module.exports.generateBackupName = generateBackupName
module.exports.getLastBackup = getLastBackup
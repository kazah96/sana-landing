const { getLastBackup } = require("../utils");

describe('Утилита для поиска последнего бэкапа', () => {
  function getC(backups) {
    return {
      list() {
        return [...backups]
      }
    }
  }

  it("Нашёл последний бэкап", async () => {
    const backups = [
      {
        name: 'backup_12'
      },
      {
        name: 'backup_15'
      },
      {
        name: 'backup_19'
      }
    ]

    const we = await getLastBackup(getC(backups));

    expect(we).toBe("backup_19")
  })

  it("Null сли бэкапов нет", async () => {
    const backups = []
    const res = await getLastBackup(getC(backups));

    expect(res).toBeNull()
  })


})
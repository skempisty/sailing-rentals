const db = require('../connectDb')

const SettingsDao = require('../dao/SettingsDao')

exports.getSettings = async () => {
  return await getSettingsObject()
}

exports.getClassInfo = async () => {
  return await SettingsDao.getClassInfo()
}

exports.updateSettings = async (updatedSettingsObj) => {
  const settingsNames = Object.keys(updatedSettingsObj)

  /*
   * Update multiple records in one query
   * https://stackoverflow.com/a/22492375/11777006
   */
  const updateSql = [`UPDATE ${db.name}.settings SET value = CASE name`]
  const sqlArgs = []

  settingsNames.forEach((settingName) => {
    const settingValue = updatedSettingsObj[settingName]

    updateSql.push('WHEN ? THEN ?')
    sqlArgs.push(settingName, settingValue)
  })

  updateSql.push('END WHERE name IN (')

  const questionMarkArray = new Array(settingsNames.length).fill('?');

  updateSql.push(questionMarkArray.join(','))
  sqlArgs.push(...settingsNames)

  updateSql.push(')')

  await db.query(updateSql.join(' '), sqlArgs)

  return await getSettingsObject()
}

async function getSettingsObject() {
  const settingsArray = await db.query(`SELECT * FROM ${db.name}.settings`)

  // I want a settings object not an array of settings which is the way it comes
  const settingsObj = {}

  settingsArray.forEach(({ name, value }) => {
    settingsObj[name] = value
  })

  return settingsObj
}
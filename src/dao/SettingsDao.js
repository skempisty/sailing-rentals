const db = require('../connectDb')

const SETTINGS_TABLE = `${db.name}.settings`

const SettingsDao = () => {
  const getClassInfo = async () => {
    const [ class_info_html ] = await db.query(`SELECT * FROM ${SETTINGS_TABLE} WHERE name = 'class_info_html'`)
    const [ class_info_file ] = await db.query(`SELECT * FROM ${SETTINGS_TABLE} WHERE name = 'class_info_file'`)

    return {
      html: class_info_html.value,
      file: class_info_file.value
    }
  }

  return {
    getClassInfo
  }
}

module.exports = SettingsDao()

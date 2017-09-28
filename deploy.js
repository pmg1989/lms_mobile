const fs = require('fs')
const path = require('path')
const copydir = require('copy-dir')
const { version } = require('./package.json')

const removeFolder = (folderPath) => {
  let files = []
  if (fs.existsSync(folderPath)) {
    files = fs.readdirSync(folderPath)
    files.forEach((file) => {
      const curPath = `${folderPath}/${file}`
      if (fs.statSync(curPath).isDirectory()) {
        removeFolder(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(folderPath)
  }
}

const start = () => {
  const from = path.join(`${__dirname}/dist/deploy`)

  const dist = path.join(`${__dirname}/dist/${version}`)
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
  }

  copydir.sync(from, dist)

  removeFolder(from)
}

start()

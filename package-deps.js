#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')

function merge(name, a, b) {
  if (a && a != b) {
    console.error("clash [" + name + "] wants version", a, "and", b)
  }
  return b
}

program
  .version('1.0.2')
  .arguments('[files...]')
  .option('-d, --dev', 'also list dev devDependencies')
  .action(function(files) {
    const deps = new Map()
    files.forEach(function(file) {
      const json = JSON.parse(fs.readFileSync(file, 'utf8'))

      const maps = []

      maps.push(json.dependencies || {})

      if (program.dev) {
        maps.push(json.devDependencies || {})
      }

      maps.forEach(function(map) {
        Object.keys(map).forEach(function(name) {
          const version = map[name]
          deps.set(name, merge(name, deps.get(name), version))
        })
      })
    })

    deps.forEach(function(version, name) {
      console.log(name + "@" + version)
    })
  })
  .parse(process.argv);
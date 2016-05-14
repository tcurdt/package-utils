#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const stdin = process.stdin

var resolver = {}

program
  .version('1.0.4')
  .arguments('[file]')
  .action(function(file) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    resolver = json
  })
  .parse(process.argv);

const chunks = []
stdin.resume()
stdin.setEncoding('utf8')
stdin.on('data', function(chunk) {
  chunks.push(chunk)
})
stdin.on('end', function() {
  const data = chunks.join()
  const json = JSON.parse(data)

  function resolve(deps, resolver) {
    Object.keys(deps).forEach(function(name) {
      const version = deps[name]
      if (version === 'RESOLVE') {
        const resolved = resolver[name]
        // check if not resolved
        deps[name] = resolved
      }
    })
  }

  resolve(json.dependencies || {}, resolver.dependencies || {})
  resolve(json.devDependencies || {}, resolver.devDependencies || {})

  console.log(JSON.stringify(json, null, '  '))
})
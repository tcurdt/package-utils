#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')

function mergeObjects(objects, cb) {
  const r = {}
  objects.forEach(function(object) {
    Object.keys(object).forEach(function(key) {
      const current = r[key]
      const next = object[key]
      if (current) {
        if (typeof current === 'object' && typeof next === 'object') {
          r[key] = mergeObjects([ current, next ], cb)
        } else {
          if (current !== next) {
            r[key] = cb(current, next)
          }
        }
      } else {
        r[key] = next
      }
    })
  })
  return r
}

program
  .version('1.0.4')
  .arguments('[files...]')
  // .arguments('<file> [...files]')
  // .usage('[options] <file ...>')
  // .command('rmdir <dir> [otherDirs...]')
  // .command('install [name]', 'install one or more packages')
  // .option('-u, --username <username>', 'The user to authenticate as')
  .action(function(files) {
    const merged = mergeObjects(files.map(function(file) {
      return JSON.parse(fs.readFileSync(file, 'utf8'))
    }), function(a, b) {
      if (typeof a !== typeof b) {
        console.error('Not sure how to merge',
          JSON.stringify(a),
          JSON.stringify(b))
        process.exit(1)
      } else {
        return b
      }
    })
    console.log(JSON.stringify(merged, null, 2))
  })
  .parse(process.argv);
// add two numbers
function add(a, b) {
  return a + b
}

module.exports = add

// Path: app.js
const add = require('./member')
const a = 1
const b = 2
const result =
add(a, b)
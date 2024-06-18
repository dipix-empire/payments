#!/usr/bin/env node

const package = require("./package.json")
console.log(Object.keys(package.devDependencies).join(' '))

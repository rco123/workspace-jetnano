
const os = require('os')
const fs = require('fs');
const pty = require('node-pty')
const path = require('path')

//var sleep = require('sleep');
//for(i=0; i< 10; i++)
//{
//sleep.msleep(1000)
//}

//console.log(process.env)
//console.log(process.env.PWD)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

tty = pty.spawn('bash', [], { name: 'xterm-color', cols: 80, rows: 24, cwd: process.env.PWD, env: process.env });

tty.on('data', (data) => {

	console.log(data)

})

tty.write("pwd\n")

sleep(2000).then( () => { 

	tty.write("ls\n")

})


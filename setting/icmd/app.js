var os = require('os');
var fs = require('fs');
const Pty = require('node-pty')
const path = require('path');
const https = require("https");

var express = require('express');
var app = express()

const server = require('http').createServer(app);
const WebSocket = require('ws')
const wss = new WebSocket.Server({server:server});


var tty = null
wss.on('connection', function connection(ws){
    console.log('tty get connection');

    var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

    if( tty == null)
    {
        //tty = Pty.spawn(shell, [], 
	//	{ name: 'xterm-color', cols: 80, rows: 24, cwd: '/home/jetson/workspace', env: process.env });    
	tty = Pty.spawn(shell, [], { name: 'xterm-color', cols: 80, rows: 24, cwd: process.env.HOME, env: process.env });
    }

    tty.on('exit', function(code, signal){
        tty = null;
        ws.close();
    })
    tty.on('data',function(data){
        ws.send(data)
    })
    ws.on('message', function incomming(message){
        //console.log('received : %s', message);
        tty && tty.write(message)
    })
    ws.on('close', function(){
        if(tty){
            tty.kill(9)
            //tty.write("exit")
            tty = null
        }
        console.log('tty close')
    })
    //ws.send('something');
})



//포트로 서버 오픈
var portno = 8000;
server.listen(portno, function() {
    console.log("start express server on port " + portno)
})

const fserver = require('http').createServer();
//const WebSocket = require('ws')
const fwss = new WebSocket.Server({
    server:fserver,
    maxReceivedFrameSize: 0x1000000,
    maxReceivedMessageSize: 0x10000000,
    fragmentationThreshold: 0x400000
});


fserver.listen( portno+1 , function() {
    console.log("start express fserver on port " + (portno+1) )
})


fwss.on('connection', function connection(ws){
  
    console.log('file connect')
    //console.log( process.env);

    let file = '/home/jetson/workspace/run/' + 'run_code.py'
    
    console.log('current file = ')
    console.log(file)
    console.log('file get connection');

    fs.writeFileSync(file , "", function(err,data){
        if(err){
            return console.log(err);
        }
        console.log(data);
    });
    
    ws.on('message', function incomming(message){
        console.log('received : %s', message);
        fs.appendFileSync(file,message,function(err,data){
            if(err){
                return console.log(err);
            }
            console.log(data);
        });
        
    });

    ws.on('close', function() {
        console.log('fwss close')
        console.log("run program")
        cmd = 'source /home/jetson/.bashrc ; /home/jetson/workspace ; /usr/bin/python3 ' + 
		    '/home/jetson/workspace/run/run_code.py' + '\r'

        var sleep = require('sleep');
        for(i=0; i< 10; i++)
        {
	    if(tty != null){
	        tty.write(cmd)
	        break
            }
	    sleep.msleep(200)
    	}        
    })

})

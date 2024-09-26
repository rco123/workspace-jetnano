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

app.use(express.static( __dirname + '/'))
app.get('/', function(req,res){
    //console.log('run the app.get ')
    var request = require('request');
    request.get('/main.html', function (error, response, body) {
            if (!error && response.statusCode == 200) {
            var csv = body;
            //console.log(body);
            // Continue with your processing here.
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(body)
        }
    });
})

var tty = null
wss.on('connection', function connection(ws){
    console.log('tty get connection');

    var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
    //shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'bash']

    if( tty == null)
    {
        tty = Pty.spawn(shell, [], { name: 'xterm-color', cols: 80, rows: 24, cwd: process.env.PWD, env: process.env });    
        //tty = Pty.spawn(shell, [], { name: 'xterm-color', cols: 80, rows: 24, cwd: process.env.HOME, env: process.env });    
    }
    // else{
    //    tty.write('clear\r')
    // }
	 
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

    let run_mode = "blk"
    let file = '/home/jetson/workspace/' + 'run_code.py'
    
    fs = require('fs');

    const data = fs.readFileSync("/home/jetson/workspace/.local/run_mode.txt", "utf8");
    console.log(data)

    if( data.indexOf("ai") != -1 )
    {
        console.log("find ai")
        file = '/home/jetson/workspace/run_mode/ai/run_code.py'
        run_mode = "ai"
    }
    else if(data.indexOf("obj") != -1) {
        console.log("find obj")
        file = '/home/jetson/workspace/run_mode/obj/run_code.py'
        run_mode = "obj"

    }
    else if(data.indexOf("line") != -1) {
        console.log("find line")
        file = '/home/jetson/workspace/run_mode/line/run_code.py'
        run_mode = "line"
    } 
    else if(data.indexOf("navi") != -1) {
        console.log("find line")
        file = '/home/jetson/workspace/run_mode/navi/run_code.py'
        run_mode = "navi"
    }
    else
    {
        file = '/home/jetson/workspace/run_mode/blk/run_code.py'
        run_mode = "blk"
    }

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
        //console.log('received : %s', message);

        fs.appendFileSync(file,message,function(err,data){
            if(err){
                return console.log(err);
            }
            //console.log(data);
        });
        
    });
    
    ws.on('close', function() {
        console.log('fwss close')
        //console.log(process.cwd())
	    //cmd = python3 ' + process.cwd() + '/run_code.py' + '\r'
        //cmd = 'python ' + 'run_code.py' + '\r'
        //console.log(cmd)
        if( run_mode == "blk")
        {
            console.log("run program")
            cmd = 'cd ~/workspace/; python3 ' + '/home/jetson/workspace/run_mode/blk/run_code.py' + '\r'

            var sleep = require('sleep');
            for(i=0; i< 10; i++)
            {
                if(tty != null){
                    tty.write(cmd)
                    break
                }
                sleep.msleep(200)
            }        
        }
        else 
        {
            var sleep = require('sleep');
            for(i=0; i< 10; i++)
            {
                sleep.msleep(1000)
                if(tty != null){
                    tty.write("exit\r")
                    break
                }
            }

            //if(tty){
            //    tty.kill(9)
                //tty.write("exit")
            //    tty = null
            //}
            //console.log('tty close')

        }
    })

})

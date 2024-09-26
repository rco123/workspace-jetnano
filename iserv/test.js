
const http = require('http');
const WebSocket = require('ws');

// HTTP 서버 생성
const fserver = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTP!\n');
});

// WebSocket 서버 생성 및 HTTP 서버에 연결
const fwss = new WebSocket.Server({
  server: fserver,  // fserver와 연결
  maxReceivedFrameSize: 0x1000000,
  maxReceivedMessageSize: 0x10000000,
  fragmentationThreshold: 0x400000
});

// WebSocket 연결 이벤트 처리
fwss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // 클라이언트로부터 메시지 수신
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send('Hello from WebSocket server!');  // 클라이언트로 응답
  });
});

// HTTP 및 WebSocket 서버가 3000번 포트에서 동작
fserver.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/');
});




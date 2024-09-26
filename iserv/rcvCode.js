
const WebSocket = require('ws');
const fs = require('fs');
const { spawn } = require('child_process');

// WebSocket 서버 설정
const wss = new WebSocket.Server({ port: 8080 });

// WebSocket 연결 이벤트 처리
wss.on('connection', (ws) => {
  console.log('Client connected');

  let pythonProcess = null;  // 파이썬 프로세스를 추적하기 위한 변수

  // 클라이언트로부터 메시지를 수신했을 때 실행
  ws.on('message', (message) => {
    console.log('Received message:', message);

    // 파이썬 코드를 파일로 저장
    const fileName = 'received_code.py';
    fs.writeFile(fileName, message, (err) => {
      if (err) {
        ws.send('Error saving the Python script');
        console.error('Error writing file:', err);
        return;
      }

      // 파이썬 파일 실행 (spawn 사용, -u 옵션 추가로 버퍼링 비활성화)
      pythonProcess = spawn('python3', ['-u', fileName]);

      // 실행 중에 stdout에서 데이터 수신 시 클라이언트에 전송
      pythonProcess.stdout.on('data', (data) => {
        //console.log(`${data}`);
		process.stdout.write(`${data}`)
        //ws.send(`Python stdout: ${data}`);
      });

      // 실행 중에 stderr에서 데이터 수신 시 클라이언트에 전송
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
        ws.send(`Python stderr: ${data}`);
      });

      // 프로세스가 종료되었을 때
      pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        ws.send(`Python process exited with code ${code}`);
        pythonProcess = null;  // 프로세스가 종료되었으므로 null로 설정
      });
    });
  });

  // 클라이언트 연결이 종료되었을 때 처리
  ws.on('close', () => {
    console.log('Client disconnected');
    
    // 실행 중인 파이썬 프로세스가 있다면 종료
    if (pythonProcess) {
      console.log('Terminating Python process');
      pythonProcess.kill();  // 프로세스를 종료
    }
  });

  // 오류 발생 시 처리
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
    
    // 오류 발생 시에도 실행 중인 프로세스를 종료
    if (pythonProcess) {
      console.log('Terminating Python process due to error');
      pythonProcess.kill();
    }
  });
});

console.log('WebSocket server running on ws://localhost:8080');


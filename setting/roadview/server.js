const express = require('express');
const fs = require('fs');
const os = require('os')
const path = require('path');

const app = express();
const PORT = 3000;

let clientIp

app.use(express.json());

app.use((req, res, next) => {
  clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', clientIp);
  next();  // 다음 미들웨어 또는 라우트로 이동
});


// 정적 파일을 제공할 디렉토리를 'dist'로 설정
app.use(express.static(path.join(__dirname, 'dist')));


function getServerAddress() {
  const ifaces = os.networkInterfaces();
  let address = 'localhost';
  for (let dev in ifaces) {
    ifaces[dev].forEach(function(details) {
      if (details.family === 'IPv4' && details.internal === false) {
        address = details.address;

          console.log("get clientIp = ", clientIp)

          // clientIp가 undefined인지 확인
          if (!clientIp || typeof clientIp !== 'string') {
            console.error('Invalid clientIp:', clientIp);
            return address; // clientIp가 유효하지 않으면 기본값 반환
          }

        // 점(.)을 기준으로 문자열을 나누고, 첫 세 부분을 비교
        //const clientIpParts = clientIp.split('.').slice(0, 3).join('.');
        const addressParts = address.split('.').slice(0, 3).join('.');

        // 첫 세 번째 점까지의 부분이 같은지 비교
        //if (addressParts === clientIpParts) {
        //   console.log("return server address =", address)
        //  return address; // 세 번째 점까지 일치하면 해당 address 반환
        //}

        // 첫 세 번째 점까지의 부분이 같은지 비교
        if (clientIp.includes(addressParts)) {
           console.log("return server address =", address)
          return address; // 세 번째 점까지 일치하면 해당 address 반환
        }

      }
    });
  }
  return address;
}



// '/lane' 경로에서 index.html 파일 제공
app.get('/lane', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// '/mark' 경로에서 index.html 파일 제공
app.get('/mark', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.get('/server-address', (req, res) => {

  const serverAddress = getServerAddress();
  res.json({ address: serverAddress, port: PORT });
});


// 파일 존재 여부 확인 및 파일 읽기 API 엔드포인트
app.post('/read-file', (req, res) => {

  const { filePath } = req.body;

  console.log(filePath)

  const absolutePath = path.resolve(__dirname,'dist' , filePath);

  console.log(absolutePath)


  if (fs.existsSync(absolutePath)) {

    fs.readFile(absolutePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading file' });
      }
      //console.log("read data: ", data)
      res.json({ content: data });
    });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

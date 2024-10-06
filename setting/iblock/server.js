const express = require('express');
const fs = require('fs');
const os = require('os')
const path = require('path');

const app = express();
const PORT = 80;

let clientIp

app.use(express.json());


app.use((req, res, next) => {
  clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', clientIp);
  next();  // 다음 미들웨어 또는 라우트로 이동
});


// 정적 파일을 제공할 디렉토리를 'dist'로 설정
app.use(express.static(path.join(__dirname, 'dist')));


//
//function getServerAddress() {
//  const ifaces = os.networkInterfaces();
//  let address = 'localhost';
//  for (let dev in ifaces) {
//    ifaces[dev].forEach(function(details) {
//      if (details.family === 'IPv4' && details.internal === false) {
//        address = details.address;
//      }
//    });
//  }
//  return address;
//}
//
//



//
//function getServerAddress() {
//  const ifaces = os.networkInterfaces();
//  let address = 'localhost';
//
//  for (let dev in ifaces) {
//    ifaces[dev].forEach(function(details) {
//
//      if (details.family === 'IPv4' && details.internal === false) {
//          address = details.address;
//
//	  console.log("get clientIp = ", clientIp)
//
//      	  // clientIp가 undefined인지 확인
//	  if (!clientIp || typeof clientIp !== 'string') {
//	    console.error('Invalid clientIp:', clientIp);
//	    return address; // clientIp가 유효하지 않으면 기본값 반환
//	  }
//
//        const addressParts = address.split('.').slice(0, 3).join('.');
//	
//	// 첫 세 번째 점까지의 부분이 같은지 비교
//        if (clientIp.includes(addressParts)) {
//	   console.log("=>return server address =", address)
//	   return
//        }
//
//      }
//    });
//  }
//  return address;
//}
//


function getServerAddress() {
  const ifaces = os.networkInterfaces();  // 네트워크 인터페이스 정보
  let address = 'localhost';  // 기본값 설정

  // clientIp가 유효한지 확인 (전역 변수)
  if (!clientIp || typeof clientIp !== 'string') {
    console.error('Invalid clientIp:', clientIp);
    return address; // clientIp가 유효하지 않으면 기본값 반환
  }

  // 네트워크 인터페이스를 순회하며 IPv4 주소를 확인
  for (let dev in ifaces) {
    for (let i = 0; i < ifaces[dev].length; i++) {
      let details = ifaces[dev][i];

      if (details.family === 'IPv4' && details.internal === false) {
        address = details.address;
        console.log("get clientIp = ", clientIp);

        // 주소의 첫 세 번째 점까지를 비교
        const addressParts = address.split('.').slice(0, 3).join('.');

        if (clientIp.includes(addressParts)) {
          console.log("=> return server address =", address);
          return address;  // 일치하는 주소를 찾으면 반환
        }
      }
    }
  }

  return address;  // 조건에 맞는 주소가 없으면 기본값 반환
}



app.get('/server-address', (req, res) => {

  const serverAddress = getServerAddress();
  res.json({ address: serverAddress, port: PORT });

});


app.get('/lane', (req, res) => {
  const serverAddress = getServerAddress();

  console.log(`go severAddress = ${serverAddress}`)
  
  const targetPort = 3000; // 리다이렉트하려는 포트
  const redirectUrl = `http://${serverAddress}:${targetPort}/lane`;
  res.redirect(redirectUrl);
});

app.get('/mark', (req, res) => {
  
  const serverAddress = getServerAddress();

  console.log(`go severAddress = ${serverAddress}`)
  
  const targetPort = 3000; // 리다이렉트하려는 포트
  const redirectUrl = `http://${serverAddress}:${targetPort}/mark`;
  res.redirect(redirectUrl);
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

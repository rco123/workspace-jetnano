const express = require('express');
const fs = require('fs');
const os = require('os')
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// 정적 파일을 제공할 디렉토리를 'dist'로 설정
app.use(express.static(path.join(__dirname, 'dist')));

function getServerAddress() {
  const ifaces = os.networkInterfaces();
  let address = 'localhost';
  for (let dev in ifaces) {
    ifaces[dev].forEach(function(details) {
      if (details.family === 'IPv4' && details.internal === false) {
        address = details.address;
      }
    });
  }
  return address;
}

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

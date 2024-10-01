import './styles.css';

const imageGrid = document.getElementById('image-grid');
let totalImages = [];  // 서버에 있는 전체 이미지 개수
let totalImagesCnt = 0
let imageIndex = 0;   // 현재 로딩된 이미지 인덱스

let socket = null 
// WebSocket 설정
let workDir = ""


// 웹페이지가 시작될 때 실행되는 함수
document.addEventListener('DOMContentLoaded', function() {
    // rcoDirName이라는 키로 저장된 값이 있는지 확인
    if (localStorage.getItem('roadDirName')) {
        // rcoDirName 키로 저장된 값을 가져와서 _dirName 변수에 저장
        const _dirName = localStorage.getItem('roadDirName');
        // 가져온 값을 사용하여 설정 초기화
        document.getElementById("dirName").value = _dirName;
    }

});


// 웹페이지가 시작될 때 실행되는 함수
window.addEventListener('load', function() {

	document.getElementById('connect').addEventListener('click', window.func_connect , false)

})


async function getServerAddress() {
    try {
      const response = await fetch('/server-address');
      const data = await response.json();
      console.log(`${data.address}`)
      return `${data.address}`;
    } catch (error) {
      console.error('Error fetching server address:', error);
      return null;
    }
  }


window.func_connect = async ()=> {

	console.log("connect click socket ", socket)

	if(socket != null) return

	const ip = await getServerAddress();
	let skaddr = `ws://${ip}:9876`
	
	console.log("skaddr :", skaddr)
	socket = new WebSocket(skaddr);

	const _dirName = document.getElementById("dirName").value	
	localStorage.setItem('roadDirName',_dirName)

	
	// 연결이 성공적으로 열렸을 때 실행될 이벤트
	socket.onopen = function(event) {
		console.log('WebSocket is connected.');
	};

	socket.onopen = function() {

		let dirName = document.getElementById("dirName").value	
		console.log("dir name: ", dirName)	
		socket.send(JSON.stringify({ request: 'getTotalDirs', Dir: dirName }));
	};

	socket.onmessage = function(event) {
		const data = JSON.parse(event.data);
		if (data.totalImages) {
		
			totalImages = data.totalImages;  // 서버로부터 전체 이미지 개수 받기
			console.log(`totalImages = ${totalImages}`)
			initializeImages();  // 초기 이미지 로드

		} else if (data.imageBase64) {
			displayImageWithLabel(data.imageBase64, data.fname);  // 이미지 데이터로 이미지 표시

		} else if (data.dirsList){

			console.log(data.dirsList)
			let paths = data.dirsList

			const dirsList = document.getElementById('dirsList');
			
			 // 경로 목록에 대해 반복하면서 각 경로에 대한 버튼 생성
			 paths.forEach(function(path) {
				const button = document.createElement('button');
				let parts = path.split('/')
				const lastPart = parts[parts.length -1]
				button.id = path
				
				button.classList.add('bar-button');
				button.textContent = lastPart;  // 버튼의 텍스트를 경로로 설정
				button.onclick = function() {  // 클릭 이벤트 핸들러 추가
					
					// clear Grid
					imageIndex = 0
					document.getElementById("image-grid").innerHTML = ''
					
					console.log("Clicked: " + path);
					let dirName = path
					workDir = path

					// 서버에 전체 이미지 개수 요청
					socket.send(JSON.stringify({ request: 'getTotalImages', imgDir: dirName }));
				};

				dirsList.appendChild(button);  // 생성된 버튼을 div에 추가
			});
			
		}
	};

}


document.getElementById('disconnect').addEventListener('click', function() {
	if (socket) {
        socket.close();  // 웹소켓 연결 종료
    }
	document.getElementById('dirsList').innerHTML = ''  // clear all
	document.getElementById("image-grid").innerHTML = ''
	imageIndex = 0
	totalImages = 0
	socket = null

});


function displayImageWithLabel(base64Data, imageName) {
	// 이미지 컨테이너 생성
	const imageContainer = document.createElement('div');
	imageContainer.classList.add('image-container');

	console.log(imageName)

	var allNumbers = imageName.match(/-?\d+/g);  // 'g' 플래그를 추가하여 모든 일치 항목을 찾습니다.
	// 첫 번째 숫자(095)와 두 번째 숫자(-80) 처리
	var firstNumber = parseInt(allNumbers[0], 10);
	var secondNumber = parseInt(allNumbers[1], 10);

	// 캔버스 생성
	const canvas = document.createElement('canvas');
	canvas.width = 150;  // 캔버스 너비, 필요에 따라 조정
	canvas.height = 100; // 캔버스 높이, 필요에 따라 조정
	canvas.angle = secondNumber
	canvas.isDrawing = false

	const ctx = canvas.getContext('2d');
	const img = new Image();

	img.onload = function() {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 이미지를 캔버스에 맞게 그리기
		drawInitialLine(ctx, canvas.width, canvas.height, canvas.angle); // 초기 선 그리기
	};

	img.src = `data:image/jpeg;base64,${base64Data}`;
	imageContainer.appendChild(canvas);


	// 이미지 이름을 위한 버튼 생성
	const buttonContainer = document.createElement('div');
	buttonContainer.style.display = 'flex';
	buttonContainer.style.width = canvas.width + 'px';
		
	const labelButtonA = document.createElement('button');
	labelButtonA.classList.add('image-label-buttonA');
	labelButtonA.textContent = imageName;

	labelButtonA.style.flexGrow = 9; // 9:1 비율로 크기 조정
	buttonContainer.appendChild(labelButtonA);

	var separator = document.createElement("div");
	separator.className = "separator";
	buttonContainer.appendChild(separator);

	const labelButtonB = document.createElement('button');
	labelButtonB.classList.add('image-label-buttonB');
	labelButtonB.textContent = 'X';

	labelButtonB.style.flexGrow = 1; // 9:1 비율로 크기 조정
	buttonContainer.appendChild(labelButtonB);
	// labelButtonA와 labelButtonB 요소들의 크기 조정
	
	imageContainer.appendChild(buttonContainer);

	// 캔버스와 버튼에 ID 설정
	canvas.id = imageName; // 예: "canvas-abc"
	labelButtonA.id = `buttona:${imageName}`;   // 예: "buttona:000_xxx.jpg"
	labelButtonB.id = `buttonb:${imageName}`;   // 예: "buttonb:000_xxx.jpg"

	// 캔버스 클릭 이벤트 추가
	canvas.addEventListener('click', function(event) {
		let angle = redrawLine(ctx, img, canvas.width, canvas.height, event.offsetX, event.offsetY);
		//canvas.angle = angle * 20
		canvas.angle = angle
	});
	canvas.addEventListener('mousedown', function(event) {
		canvas.isDrawing = true; // 마우스를 누르면 드래그 시작
	});
	canvas.addEventListener('mousemove', function(event) {
		if (canvas.isDrawing) { // 만약 드래그 중이라면
			let angle = redrawLine(ctx, img, canvas.width, canvas.height, event.offsetX, event.offsetY);
			//canvas.angle = angle * 20
			canvas.angle = angle 
		}
	});
	canvas.addEventListener('mouseup', function() {
		canvas.isDrawing = false; // 마우스를 놓으면 드래그 종료
	});

	// 버튼 클릭 이벤트 리스너 추가
	labelButtonA.addEventListener('click', function() {
		
		const imageName = labelButtonA.id.split(':')[1]; 
		// 연관된 캔버스의 angle 값을 찾기
		const relatedCanvas = document.getElementById(imageName);
		if (relatedCanvas && relatedCanvas.angle !== undefined) {

			console.log(`Sending angle: ${relatedCanvas.angle}`);

			// 버튼 텍스트 변경
			let lastName = labelButtonA.textContent.trim()

			// ID를 세 자리 숫자로 포맷 (예: '001')
			const frontPart = imageName.split("_")[0];
			// 각도를 정수로 변환하고 부호와 함께 포맷
			let formattedAngle = ""
			if(relatedCanvas.angle >=0)
			{
				formattedAngle = Math.round(relatedCanvas.angle).toString().padStart(3, '0');
			}
			else{
				formattedAngle = Math.abs(Math.round(relatedCanvas.angle))
  				.toString()
  				.padStart(3, '0');
				formattedAngle = '-' + formattedAngle
			}

			let newName = `${frontPart}_${formattedAngle}.jpg`;

			labelButtonA.textContent = newName;
			
			console.log(`latname = ${lastName}`)
			console.log(`newName = ${labelButtonA.textContent}`)
			
			// // 웹소켓을 통해 서버로 각도 정보 전송
			socket.send(JSON.stringify({
				request: 'changeFname', 
				lastName : lastName,
				newName: newName,
				dirName: workDir
			}));


		} else {
			console.log('No angle data or canvas found.');
		}
	});

	// 버튼 클릭 이벤트 리스너 추가
	labelButtonB.addEventListener('click', function() {
		
		console.log("working dir = ",workDir)
		console.log("id b = ", labelButtonB.id)
		
		let fname = workDir + "/" + labelButtonB.id.replace(/^buttonb-/,"")
		console.log("delFname = ", fname)
		// // 웹소켓을 통해 서버로 각도 정보 전송
		socket.send(JSON.stringify({
			request: 'delFname', 
			fname : fname
		}));

		//imageContainer.parentNode.removeChild(imageContainer)
		imageGrid.removeChild(imageContainer)
	});

	// 이미지 컨테이너를 그리드에 추가
	imageGrid.appendChild(imageContainer);
	// 다음 이미지 로드를 위해 새로운 이미지 관찰
	maybeObserveNewImage(imageContainer);

}


function drawInitialLine(ctx, width, height, angle) {
  
	// 중앙에서 시작하는 선을 그립니다.
	// ctx.beginPath();
	// ctx.moveTo(width / 2, height / 2);
	// ctx.lineTo(width / 2, 0);
	// ctx.stroke();

	// 캔버스의 중앙 아래에서 시작
    const startX = width / 2;
    const startY = height; // 아래쪽 끝에서 시작

    // 선의 길이
    const length = 50;
	console.log(angle)
	//let convAngle = angle / 20 
	let convAngle = angle 
    // 각도 (예: 45도)
    const angleInDegrees = convAngle + 90; // 여기서 각도를 조정할 수 있습니다.

	console.log(angleInDegrees)
    // 각도를 라디안으로 변환
    const angleInRadians = angleInDegrees * Math.PI / 180;

    // 끝점 계산
    const endX = startX + length * Math.cos(angleInRadians);
    const endY = startY - length * Math.sin(angleInRadians); // 캔버스의 y축은 아래로 향하기 때문에 감소

	// 선 그리기
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.strokeStyle = '#be484888';
	ctx.lineWidth = 2;
	ctx.stroke();

	// 끝점에 원 그리기
    ctx.beginPath();
    ctx.arc(endX, endY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#00ff0077';
    ctx.fill();
    ctx.stroke();

    // 원 중앙에 텍스트 쓰기
    ctx.fillStyle = '#4fdd3388';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(convAngle), endX, endY - 10);
}


function redrawLine(ctx, img, width, height, x, y) {
	// 이미지를 다시 그리고 새로운 선을 그립니다.
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(img, 0, 0, width, height);

	// 캔버스의 중앙 아래에서 시작
	const startX = width / 2;
	const startY = height; // 아래쪽 끝에서 시작
	// 끝점 계산
	const endX = x
	const endY = y

    // 각도 계산
	let angle = calculateAngle(startX, startY, endX, endY);
	if(angle > 45) angle = 45
	if(angle < -45) angle = -45
	
	let convAngle = angle 

	// 선 그리기
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.strokeStyle = '#be484888';
	ctx.lineWidth = 2;
	ctx.stroke();

	// 끝점에 원 그리기
	ctx.beginPath();
	ctx.arc(endX, endY, 3, 0, 2 * Math.PI);
	ctx.fillStyle = '#00ff0077';
	ctx.fill();
	ctx.stroke();

	// 원 중앙에 텍스트 쓰기
	ctx.fillStyle = '#4fdd3388';
	ctx.font = '10px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(String(convAngle), endX, endY - 10);

	return angle
}



function calculateAngle(startX, startY, endX, endY) {
    // atan2()는 두 점 사이의 각도를 라디안으로 반환합니다.
    // 입력 파라미터는 (y좌표의 차이, x좌표의 차이)
    const angleRadians = Math.atan2(endY - startY, endX - startX);

    // 라디안 값을 도로 변환하기
    const angleDegrees = angleRadians * (180 / Math.PI) * -1;

    // 각도가 음수일 경우 360을 더하여 항상 양수값을 반환합니다.
    if (angleDegrees < 0) {
        return Math.floor(angleDegrees) - 90;
    } else {
        return Math.floor(angleDegrees) - 90;
    }
}



// 초기 이미지 로딩
function initializeImages() {
    for (let i = 0; i < 10 && imageIndex < totalImages.length; i++) {
        requestImage();
    }
}

// 이미지 요청 함수
function requestImage() {
  if (imageIndex < totalImages.length) {
    //socket.send(JSON.stringify({ request: 'fetchImage', index: imageIndex++ }));
	const imgName =  workDir + "/"+ totalImages[imageIndex++]
	socket.send(JSON.stringify({ request: 'fetchImage', imgName: imgName }));
  }
}

// 이미지 관찰 및 로드 관리
function maybeObserveNewImage(image) {
  observer.unobserve(image);  // 이전 이미지 관찰 중단
  if (imageIndex < totalImages.length) {
    observer.observe(image);  // 새로운 이미지 관찰
  }
}

// Intersection Observer 설정
let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      requestImage();  // 스크롤 시 추가 이미지 요청
    }
  });
}, { rootMargin: '200px' });


// 더미 요소로 초기 관찰 대상 설정
// const dummy = document.createElement('div');
// imageGrid.appendChild(dummy);
//observer.observe(dummy);

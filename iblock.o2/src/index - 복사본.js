import Blockly from "blockly";
import 'blockly/python';

import { Terminal } from 'xterm';
import { attach } from './js_s/attach.js'
import {saveAs} from 'file-saver'

import('./styles.css');
import('../node_modules/xterm/css/xterm.css');
import('./css_s/bootstrap.min.css');

let blocklyDiv;  // 전역 변수로 선언
let blocklyArea;  // 전역 변수로 선언
let divArea;
let con_view_area;
let demoWorkspace


import { xml_basic_head, xml_basic_tail } from './ublocks/xml_basic.js'
import { robo_blk_xml_head, robo_blk_xml_tail } from './ublocks/robo_blk/robo_blk.js'

// import { fun_ai_xml } from "./ublocks/robo_blk/ai/fun_ai.js"
// import "./ublocks/robo_blk/ai/fun_ai_lane.js"
// import "./ublocks/robo_blk/ai/fun_ai_dir.js"
// import "./ublocks/robo_blk/ai/fun_ai_light.js"
// import "./ublocks/robo_blk/ai/fun_ai_sign.js"
// import "./ublocks/robo_blk/ai/fun_ai_obj.js"
// import "./ublocks/robo_blk/ai/fun_ai_coco.js"
// import "./ublocks/robo_blk/ai/fun_ai_mark.js"

// import { fun_cam_xml } from "./ublocks/robo_blk/cam/fun_cam.js"
// import { fun_ps_xml } from "./ublocks/robo_blk/ps/fun_ps.js"
// import { fun_bt_xml } from "./ublocks/robo_blk/bt/fun_bt.js"

import { fun_net_xml } from "./ublocks/robo_blk/net/fun_net.js"
import { fun_robo_xml } from "./ublocks/robo_blk/robo/fun_robo.js"
import { fun_lane_xml } from "./ublocks/robo_blk/lane/fun_lane.js"
import { fun_mark_xml } from "./ublocks/robo_blk/mark/fun_mark.js"

import { fun_train_xml } from "./ublocks/robo_blk/train/fun_train.js"
import { fun_user_xml } from "./ublocks/robo_blk/user/fun_user.js"


//<!-- code block -->
import { code_blk_xml_head, code_blk_xml_tail } from './ublocks/code_blk/code_blk.js'
import { code_blk_robo } from './ublocks/code_blk/01.robo/code_robo.js'

import { code_blk_lane } from "./ublocks/code_blk/03.lane/code_lane.js"
import { code_blk_mark } from "./ublocks/code_blk/11.mark/code_mark.js"

// import { code_blk_bt } from "./ublocks/code_blk/02.bt/code_bt.js"
import { code_blk_dir } from "./ublocks/code_blk/04.dir/code_dir.js"
import { code_blk_light } from "./ublocks/code_blk/05.light/code_light.js"
import { code_blk_sign } from "./ublocks/code_blk/06.sign/code_sign.js"
import { code_blk_obj } from "./ublocks/code_blk/07.obj/code_obj.js"
import { code_blk_demo } from "./ublocks/code_blk/10.demo/code_demo.js"


// //const tool_blk_xml = xml_basic_head + robo_blk_xml_head +  fun_robo_xml + robo_blk_xml_tail + xml_basic_tail
const tool_blk_xml =
	xml_basic_head +
	robo_blk_xml_head +
	fun_robo_xml +
	fun_lane_xml +
	fun_mark_xml +
	fun_train_xml + fun_user_xml +
	robo_blk_xml_tail +

	code_blk_xml_head +
	code_blk_robo +
	code_blk_mark +
	code_blk_lane +
	code_blk_demo +
	code_blk_xml_tail +
	xml_basic_tail



// 전역 상태 변수
//let isCanvasView = false;

// 전역 상태 변수
let isCanvasView = false;
let resizeObserver = null;
let videoSocket = null; // WebSocket 객체
let imageInterval = null;

// 캔버스 토글 함수
async function toggleCanvasView() {
    const codeDiv = document.getElementById('code_div');

    if (!isCanvasView) {
        // 캔버스 뷰 활성화
        console.log("Activating Canvas View");

        // code_div를 split 클래스로 변경
        codeDiv.classList.add('split');

        // 캔버스 표시용 div 생성
        const canvasDiv = document.createElement('div');
        canvasDiv.classList.add('canvas_div');
        canvasDiv.id = 'canvas_div';

		// 로딩 스피너 추가
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        canvasDiv.appendChild(spinner);


        // // 캔버스 요소 생성
        // const canvas = document.createElement('canvas');
        // canvas.id = 'imageCanvas';
        // canvas.width = codeDiv.clientWidth;
        // canvas.height = (codeDiv.clientHeight) / 2; // 상단 절반 크기로 설정
        // canvas.style.border = "1px solid #000";

        // canvasDiv.appendChild(canvas);


		// 캔버스 요소 생성
        const canvas = document.createElement('canvas');
        canvas.id = 'imageCanvas';
        // width와 height는 CSS에서 100%로 설정
        canvas.style.border = "1px solid #000";
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'none'; // 이미지 로딩 후 표시

        canvasDiv.appendChild(canvas);





        // 기존 code_out textarea를 새로운 div로 이동
        const codeChildDiv = document.createElement('div');
        codeChildDiv.classList.add('code_child_div');
        codeChildDiv.id = 'code_child_div';

        const codeOut = document.getElementById('code_out');
        if (codeOut) {
            codeChildDiv.appendChild(codeOut);
        } else {
            console.error("code_out element not found!");
        }

        // code_div에 canvas_div와 code_child_div 추가
        codeDiv.appendChild(canvasDiv);
        codeDiv.appendChild(codeChildDiv);

        // 캔버스에 이미지를 그리는 함수 호출 (네트워크에서 이미지 가져오기)
        //await drawImageOnCanvas('images/aicar.png');

		// 캔버스에 영상을 그리는 함수 호출 (WebSocket을 통해 영상 스트림 가져오기)
        await initializeVideoStream('ws://192.168.0.27:8765', spinner, canvas);

		// ResizeObserver 설정하여 캔버스 크기가 변경될 때 영상 다시 그리기
        resizeObserver = new ResizeObserver(() => {
            adjustCanvasSizeAndRedraw(spinner, canvas);
        });
        resizeObserver.observe(canvasDiv);


        isCanvasView = true;
        console.log(`on isCanvasView = ${isCanvasView}`);

    } else {
        // 캔버스 뷰 비활성화
        console.log("Deactivating Canvas View");

        // split 클래스를 제거
        codeDiv.classList.remove('split');

        // 캔버스 div 제거
        const canvasDiv = document.getElementById('canvas_div');
        if (canvasDiv) {
            codeDiv.removeChild(canvasDiv);
        }

        // code_child_div에서 code_out을 다시 code_div로 이동
        const codeChildDiv = document.getElementById('code_child_div');
        const codeOut = document.getElementById('code_out');
        if (codeChildDiv && codeOut) {
            codeDiv.appendChild(codeOut);
            codeDiv.removeChild(codeChildDiv);
        } else {
            console.error("Either code_child_div or code_out is missing!");
        }

		// ResizeObserver 해제
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }

        // WebSocket 및 Interval 해제
        if (videoSocket) {
            videoSocket.close();
            videoSocket = null;
        }

		if (imageInterval) {
            clearInterval(imageInterval);
            imageInterval = null;
        }


        isCanvasView = false;
        console.log(`off isCanvasView = ${isCanvasView}`);
    }
}


// 영상 스트림 초기화 함수
async function initializeVideoStream(wsUrl, spinner, canvas) {
    return new Promise((resolve, reject) => {
        // WebSocket 객체 생성
        videoSocket = new WebSocket(wsUrl);

        // WebSocket 연결이 열렸을 때
        videoSocket.onopen = function(event) {
            console.log('WebSocket 연결이 열렸습니다.');
            resolve();
        };

        // WebSocket으로부터 메시지를 수신할 때
        videoSocket.onmessage = function(event) {
            // 수신한 메시지를 이미지 데이터로 설정
            const imageData = event.data; // base64 인코딩된 JPEG 이미지
            drawImageOnCanvas(imageData, spinner, canvas);
        };

        // WebSocket 연결이 종료되었을 때
        videoSocket.onclose = function(event) {
            console.log('WebSocket 연결이 종료되었습니다.');
        };

        // WebSocket에서 오류가 발생했을 때
        videoSocket.onerror = function(error) {
            console.error('WebSocket 오류:', error);
            reject(error);
        };
    });
}



// async function drawImageOnCanvas(imageUrl) {
// 	const canvas = document.getElementById('imageCanvas');
// 	if (!canvas) {
// 		console.error("Canvas element not found!");
// 		return;
// 	}

// 	const ctx = canvas.getContext('2d');
// 	if (!ctx) {
// 		console.error("Canvas context not available!");
// 		return;
// 	}

// 	// 이미지 로드
// 	const img = new Image();
// 	img.crossOrigin = "Anonymous"; // CORS 문제 방지를 위해 설정
// 	img.src = imageUrl;

// 	img.onload = function () {
// 		// 캔버스 크기에 맞춰 이미지 그리기
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
// 		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
// 	};

// 	img.onerror = function (error) {
// 		console.error("Error loading image:", error);
// 	};
// }


// 캔버스에 이미지 그리기 함수
function drawImageOnCanvas(imageData, spinner, canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Canvas context not available!");
        return;
    }

    // 로딩 스피너 표시
    if (spinner) {
        spinner.style.display = 'block';
    }
    if (canvas) {
        canvas.style.display = 'none';
    }

    // 이미지 객체 생성
    const img = new Image();
    img.src = 'data:image/jpeg;base64,' + imageData;

    img.onload = function () {
        // 캔버스 크기에 맞춰 이미지 그리기
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 로딩 스피너 숨기고 캔버스 표시
        if (spinner) {
            spinner.style.display = 'none';
        }
        if (canvas) {
            canvas.style.display = 'block';
        }
    };

    img.onerror = function (error) {
        console.error("Error loading image:", error);
        // 로딩 스피너 숨기기
        if (spinner) {
            spinner.style.display = 'none';
        }
    };
}

// 캔버스 크기 조정 및 이미지 다시 그리기 함수
function adjustCanvasSizeAndRedraw(spinner, canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Canvas context not available!");
        return;
    }

    // 캔버스의 실제 크기를 CSS 크기와 일치시키기
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // 현재 이미지를 다시 그리기 위해 WebSocket에서 다시 수신하도록 설정
    // 이 부분은 서버에서 새로운 이미지를 계속해서 보내고 있다고 가정
    // 만약 그렇지 않다면, 추가적인 로직이 필요할 수 있습니다.
}



function initializeWorkspace() {

	if (!window.demoWorkspace) {

		console.log("Initializing workspace...");

		demoWorkspace = Blockly.inject(blocklyDiv, {
			grid: {
				spacing: 25,
				length: 3,
				colour: '#ccc',
				snap: true
			},
			media: './media/',
			toolbox: tool_blk_xml,
			zoom: {
				controls: true,
				wheel: true
			}
		});

		// 워크스페이스가 성공적으로 초기화되었는지 확인
		if (demoWorkspace) {
			console.log("Workspace initialized:", demoWorkspace);
		}
		else {
			console.log("Workspace initialized: null", demoWorkspace);
		}

		window.demoWorkspace = demoWorkspace;

	}
}


let isInitialized = false;

window.addEventListener('load', function () {


	if (!window.demoWorkspace && !isInitialized) {
		
		console.log("load event ==================")
        console.log("Initializing workspace...");
        isInitialized = true;  // 초기화 플래그 설정
	}
	else return;	


	
	blocklyArea = document.getElementById('blocklyArea');
	console.log("blocklyAreea    ", blocklyArea)
	blocklyDiv = document.getElementById('blocklyDiv');
	divArea = document.getElementById('divArea');
	console.log("div area i = ", divArea)
	con_view_area = document.getElementById('con_view_area');

	initializeWorkspace();

	window.addEventListener('resize', onresize, false);
	onresize();
	Blockly.svgResize(window.demoWorkspace);


	// 이벤트 리스너를 워크스페이스가 완전히 초기화된 후에 등록
	if (window.demoWorkspace) {
		console.log('Workspace fully initialized');
		window.demoWorkspace.addChangeListener(demoWorkspaceChangeListener);
	} else {
		console.error("demoWorkspace is not initialized yet.");
	}


	divArea.addEventListener('mousedown', m_down, true)
	divArea.addEventListener('mouseenter', m_enter, true)
	divArea.addEventListener('mouseleave', m_leave, true)

	document.body.addEventListener('mousemove', m_move, true);
	document.body.addEventListener('mouseup', m_up, true);

	const blockClear = document.getElementById('blockClear');
	blockClear.addEventListener('click', window.func_blk_clear, false);

	const blockSave = document.getElementById('blockSave');
	blockSave.addEventListener('click', window.func_blk_save, false);

	document.getElementById('fblockSave').addEventListener('click', window.func_fblk_save, false);

	
	// Remove existing event listeners to prevent duplicates
    //fileInput.replaceWith(fileInput.cloneNode(true));
	//fblockRead.replaceWith(fblockRead.cloneNode(true));


	// Add event listener to the 'fblockRead' button
    fblockRead.addEventListener('click', () => {
        console.log('fblockRead button clicked');
        fileInput.click();  // Open the file selection window
    });
	// Add event listener to the file input
    fileInput.addEventListener('change', window.handleFileSelect);


	const blockRead = document.getElementById('blockRead');
	blockRead.addEventListener('click', window.func_blk_read, false);

	document.getElementById('code_run').addEventListener('click', window.func_code_run, false)
	document.getElementById('code_clear').addEventListener('click', window.func_clear, false)
	document.getElementById('code_copy').addEventListener('click', window.func_copy, false)
	document.getElementById('code_kill').addEventListener('click', window.sendCtrlC, false)


	// imgView 버튼 이벤트 리스너 추가
	const imgViewButton = document.getElementById('imgView');
	if (imgViewButton && !imgViewButton.dataset.listenerAdded) {
		imgViewButton.addEventListener('click', toggleCanvasView);
		imgViewButton.dataset.listenerAdded = 'true';
	}


});



function demoWorkspaceChangeListener(primaryEvent) {
	console.log("Event Type: ", primaryEvent.type); // 어떤 이벤트가 발생하는지 확인

	if (primaryEvent.type == Blockly.Events.CLICK) {
		console.log("block id =", primaryEvent.blockId);

		if (primaryEvent.blockId != null) {
			let data;
			try {
				data = demoWorkspace.getBlockById(primaryEvent.blockId);
				console.log(data);

				if (data == null) {
					console.log("null event, return");
					return;
				}
			} catch (error) {
				// 예외 발생 시 오류 처리
				console.error("An error occurred while retrieving the block data:", error);
				return; // 오류가 발생했을 경우 처리 중단
			}

			// data가 null이 아니고, data.type이 있는지 확인
			if (data && data.type && data.type.endsWith('.xml')) {
				var fname = './ublocks/code_blk/' + data.type;
				console.log('file_name : %s', fname);

				fetch('/read-file', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ filePath: fname })
				})
					.then(response => response.json())
					.then(result => {
						if (result.error) {
							console.error(result.error);
							return;
						}

						let element = document.getElementById('bottom');
						element.textContent = `power by Google => ${data.type}`;

						console.log("return result ", result.content);

						var xmlContent = result.content;
						Blockly.mainWorkspace.clear();
						var xml = Blockly.Xml.textToDom(xmlContent);
						Blockly.Xml.domToWorkspace(xml, window.demoWorkspace);
					})
					.catch(error => {
						console.error('Error:', error);
					});
			} else {
				console.log("data.type is either undefined or does not end with '.xml'");
			}
		}
	}

	if (primaryEvent instanceof Blockly.Events.Ui) {
		return;  // Don't mirror UI events.
	}


	// Blockly.Python.INFINITE_LOOP_TRAP = null;
	// Blockly.Python.INDENT = '    ';
	// var code = Blockly.Python.workspaceToCode(demoWorkspace);
	// console.log("code out", code);
	// document.getElementById('code_out').value = code;

	// 여기서 workspaceToCode 호출 전에 워크스페이스가 제대로 설정되었는지 확인
	if (window.demoWorkspace) {
		try {
			Blockly.Python.INFINITE_LOOP_TRAP = null;
			Blockly.Python.INDENT = '    ';
			var code = Blockly.Python.workspaceToCode(window.demoWorkspace);
			console.log("Generated Python code:", code);
			document.getElementById('code_out').value = code;
		} catch (error) {
			console.error("Error generating code:", error);
		}
	} else {
		console.error("Workspace is null or not ready.");
	}

}


window.func_blk_save = () => {
	var xmlDom = Blockly.Xml.workspaceToDom(window.demoWorkspace);
	var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
	console.log(xmlText)
	storage = window['localStorage'];
	var save_xml = xmlText;
	//console.log(save_xml)
	storage.setItem("save_xml", save_xml);

}

window.func_fblk_save = ()=> {
	let xmlDom = Blockly.Xml.workspaceToDom(window.demoWorkspace);
	let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
	console.log('func_fblk_save()');

	//let FileSaver = require('./FileSaver.js')
	let blob = new Blob([xmlText], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "block.xml");						
}


// 파일 선택 시 실행되는 함수
window.handleFileSelect= (event)=> {
    const file = event.target.files[0];  // 선택된 파일 가져오기
    if (!file) {
        console.error("No file selected.");
        return;
    }

    const reader = new FileReader();  // 파일 읽기 위한 FileReader 객체 생성

    // 파일이 성공적으로 읽혀지면 호출되는 함수
    reader.onload = function(e) {
        const fileContent = e.target.result;
        try {
            const xml = Blockly.Xml.textToDom(fileContent);  // XML 텍스트를 Blockly XML DOM으로 변환
            Blockly.Xml.domToWorkspace(xml, window.demoWorkspace);  // Blockly 워크스페이스에 로드
            console.log("Workspace loaded from file.");
        } catch (error) {
            console.error("Error loading workspace from XML:", error);
        }
    };

    // 파일을 텍스트 형식으로 읽기 시작
    reader.readAsText(file);
}

window.func_blk_clear = () => {
	window.demoWorkspace.clear();
}

window.func_blk_read = () => {
	console.log(window.preventTowRead)

	// if(window.preventTowRead === 1) window.preventTowRead = 0
	// else return     

	let storage = window['localStorage'];
	var save_xml = storage.getItem("save_xml");
	if (save_xml != null) {
		console.log(save_xml)
		var xml = Blockly.Xml.textToDom(save_xml);
		Blockly.Xml.domToWorkspace(xml, window.demoWorkspace);
		window.preventTowRead = 0
	}
	window.preventTowRead = 0
}

const onresize = function (e) {
	// Compute the absolute coordinates and dimensions of blocklyArea.
	console.log("onresize event")
	let element = blocklyArea;
	let x = 0;
	let y = 0;
	do {
		x += element.offsetLeft;
		y += element.offsetTop;
		element = element.offsetParent;
	} while (element);

	console.log(`offsetWidth offsetHeifht = ${x}, ${y}, ${blocklyArea.offsetWidth}, ${blocklyArea.offsetHeight} `)

	// Position blocklyDiv over blocklyArea.
	blocklyDiv.style.left = x + 'px';
	blocklyDiv.style.top = y + 'px';
	blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
	blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

	Blockly.svgResize(window.demoWorkspace);
};


//////////////////// Window Change
let bw, w1, w2, w3;
let m_sts = 'up';
let m_after_move = false;
let m_mvx = 0;

function info() {
	bw = document.body.clientWidth;
	w1 = blocklyArea.clientWidth;
	w2 = divArea.clientWidth;
	w3 = con_view_area.clientWidth;
	// var str = `width ${bw} , ${w1} , ${w2}, ${w3}`;
	// console.log(str);
	// console.log( w1 + w2 + w3 );
	onresize();
}

function m_down(event) {
	info();
	var x = event.clientX;
	var y = event.clientY;
	var str = `point = ${x}, ${y} `;
	console.log(str)
	m_sts = 'down'
}

function m_enter(event) {
	//console.log('enter')
	document.body.style.cursor = "col-resize";
}

function m_leave(event) {
	//console.log('enter')
	document.body.style.cursor = "default";

}

const m_move = (event) => {
	if (m_sts == 'down') {
		var x = event.clientX;
		var y = event.clientY;

		var str = `m_move point = ${x}, ${y} ${bw} `;
		console.log(str)

		m_mvx = x - 5;

		if (x > 200 && x < bw - 200) {
			document.getElementById('blocklyArea').style.width = `${(x - 5)}px`;
			document.getElementById('divArea').style.width = '10px';

			document.getElementById('con_view_area').style.width = `${bw - ((x + 5))}px`;
			document.getElementById('code_div').style.width = `${bw - ((x + 5))}px`;

			onresize(event);
			//window.dispatchEvent(new Event('resize'));

			m_after_move = true
		}
	}
}


function m_up(event) {

	if (m_after_move == true) {
		//console.log('up event')
		m_sts = 'up';
		document.body.style.cursor = "default";
		var x = event.clientX;
		var w1_w = Math.round((x - 5) / bw * 100)
		//console.log(w1_w)

		document.getElementById('blocklyArea').style.width = `${w1_w}%`;
		document.getElementById('divArea').style.width = '10px';
		document.getElementById('con_view_area').style.width = `calc( ${100 - w1_w}% -  10px )`;

		onresize(event);
		m_after_move = false

	}
}

////////////// term

let xterm = null
let obj_dis = null
let main_ws = null

async function getServerAddress() {
	try {
		const response = await fetch('/server-address');
		const data = await response.json();
		return `${data.address}`;
	} catch (error) {
		console.error('Error fetching server address:', error);
		return null;
	}
}

// Control-C 신호를 보내는 함수
window.sendCtrlC = function () {
	if (main_ws) {
		console.log("send kill")
		main_ws.send('\u0003'); // ASCII 코드 3은 Control-C
	}
}

window.func_code_run = async function () {

	console.log('remote connect')
	xterm = create_xterm(xterm)


	// 서버 주소를 받아와서 WebSocket 연결을 설정합니다.
	const serverAddress = await getServerAddress();
	if (!serverAddress) {
		console.error('Unable to get server address');
		return;
	}
	console.log(`Server address: ${serverAddress}`);

	if (main_ws == null) {
		main_ws = new WebSocket(`ws://${serverAddress}:8000`);

		main_ws.onopen = function () {
			new attach(xterm, main_ws);
			// command send
			//cmd = cmd + '\r'
			//ws.send(cmd);
		};

		main_ws.onclose = function () {
			//ws.close();
			main_ws = null;
		}

		main_ws.onerror = function (e) {
			console.log(e);
		};
	}

	/* Get the text field */
	var copyText = document.getElementById("code_out");
	console.log('run_code:')
	console.log(copyText.value)

	var fws = new WebSocket(`ws://${serverAddress}:8001`);
	fws.onopen = function () {
		console.log('file write open')
		fws.send(copyText.value)
		fws.close()
	};

	fws.onerror = function (e) {
		console.log(e);
	};
}


function create_xterm(i_xterm) {

	let xterm = i_xterm

	if (xterm == null) {

		console.log('create xterm')
		xterm = new Terminal({ cols: 80, rows: 16 });

		obj_dis = document.getElementById('t4')
		console.log('obj_dis = ' + obj_dis)
		xterm.open(obj_dis)
	}
	return xterm
}

window.func_clear = function () {

	console.log('doing clear')
	if (xterm) {
		xterm.clear()
	}
	if (main_ws) {
		main_ws.close()
	}
	xterm = null
	main_ws = null
	if (obj_dis) {
		obj_dis.innerHTML = ""
	}
}


window.func_copy = function () {
	/* Get the text field */
	var copyText = document.getElementById("code_out");

	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */

	/* Copy the text inside the text field */
	document.execCommand("copy");
	copyText.select()

	/* Alert the copied text */
	//alert("Copied the text: " + copyText.value);
	console.log("copy: " + copyText.value)
}

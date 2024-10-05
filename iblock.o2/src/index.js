
import Blockly from "blockly";
import 'blockly/python';

import { Terminal } from 'xterm';
import { attach } from './js_s/attach.js';
import { saveAs } from 'file-saver';

import('./styles.css');
import('../node_modules/xterm/css/xterm.css');
import('./css_s/bootstrap.min.css');

let blocklyDiv;  // 전역 변수로 선언
let blocklyArea;  // 전역 변수로 선언
let divArea;
let con_view_area;
let demoWorkspace;

// 블록 XML import
import { xml_basic_head, xml_basic_tail } from './ublocks/xml_basic.js';
import { robo_blk_xml_head, robo_blk_xml_tail } from './ublocks/robo_blk/robo_blk.js';

// 다른 블록 import...
import { fun_robo_xml } from "./ublocks/robo_blk/robo/fun_robo.js";
import { fun_lane_xml } from "./ublocks/robo_blk/lane/fun_lane.js";
import { fun_mark_xml } from "./ublocks/robo_blk/mark/fun_mark.js";
import { fun_train_xml } from "./ublocks/robo_blk/train/fun_train.js";
import { fun_user_xml } from "./ublocks/robo_blk/user/fun_user.js";

// 코드 블록 import...
import { code_blk_xml_head, code_blk_xml_tail } from './ublocks/code_blk/code_blk.js';
import { code_blk_robo } from './ublocks/code_blk/01.robo/code_robo.js';
import { code_blk_mark } from "./ublocks/code_blk/02.mark/code_mark.js";
import { code_blk_lane } from "./ublocks/code_blk/03.lane/code_lane.js";
import { code_blk_net } from "./ublocks/code_blk/04.net/code_net.js";

// 툴박스 XML 구성
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
	code_blk_net +
    code_blk_xml_tail +
    xml_basic_tail;

// Toast 알림 표시 함수
function showToast(message) {
	const toast = document.getElementById("toast");
	toast.textContent = message;
	toast.className = "toast show";
	
	// 3초 후에 알림 사라지기
	setTimeout(() => {
		toast.className = toast.className.replace("show", "");
	}, 3000);
}


// 전역 상태 변수
let isCanvasView = false;
let resizeObserver = null;
let videoSocket = null; // WebSocket 객체

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

        // 캔버스 요소 생성
        const canvas = document.createElement('canvas');
        canvas.id = 'imageCanvas';
        // width와 height는 CSS에서 100%로 설정
        canvas.style.border = "1px solid #000";
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block'; // 초기 이미지 표시를 위해 표시

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

        // 초기 이미지 로드 (image/aicar.png)
        await loadInitialImage('images/aicar.png', canvas);

        // 캔버스에 영상을 그리는 함수 호출 (WebSocket을 통해 영상 스트림 가져오기)
        //await initializeVideoStream('ws://192.168.0.27:8765', canvas);

		try {
			// 캔버스에 영상을 그리는 함수 호출 (WebSocket을 통해 영상 스트림 가져오기)
			await initializeVideoStream('ws://192.168.0.27:8765', canvas);
			console.log('영상 스트림이 성공적으로 초기화되었습니다.');
		} catch (error) {
			console.error('영상 스트림 초기화 중 오류 발생:', error);
			
			// 오류 처리: 사용자에게 알림, 재시도, 다른 후속 조치 등
			//alert('영상 스트림을 불러오는 데 실패했습니다. 다시 시도해주세요.');
			//showToast('영상 스트림을 불러오는 데 실패했습니다. 다시 시도해주세요.');
			
		}
		
        // ResizeObserver 설정하여 캔버스 크기가 변경될 때 영상 다시 그리기
        resizeObserver = new ResizeObserver(() => {
            adjustCanvasSize(canvas);
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

        // WebSocket 해제
        if (videoSocket) {
            videoSocket.close();
            videoSocket = null;
        }

        isCanvasView = false;
        console.log(`off isCanvasView = ${isCanvasView}`);
    }
}

// 초기 이미지 로드 함수
function loadInitialImage(imageUrl, canvas) {
    return new Promise((resolve, reject) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Canvas context not available!");
            reject("Canvas context not available!");
            return;
        }

        const img = new Image();
        img.src = imageUrl;
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve();
        };
        img.onerror = function (error) {
            console.error("Error loading initial image:", error);
            reject(error);
        };
    });
}



// 영상 스트림 초기화 함수
async function initializeVideoStream(wsUrl, canvas) {
    return new Promise((resolve, reject) => {
        // WebSocket 객체 생성
        videoSocket = new WebSocket(wsUrl);

        // WebSocket 연결이 열렸을 때
        videoSocket.onopen = function (event) {
            console.log('WebSocket 연결이 열렸습니다.');
            resolve();
        };

        // WebSocket으로부터 메시지를 수신할 때
        videoSocket.onmessage = function (event) {
            // 수신한 메시지를 이미지 데이터로 설정
            const imageData = event.data; // base64 인코딩된 JPEG 이미지
            drawImageOnCanvas(imageData, canvas);
        };

        // WebSocket 연결이 종료되었을 때
        videoSocket.onclose = function (event) {
            console.log('WebSocket 연결이 종료되었습니다.');
        };

        // WebSocket에서 오류가 발생했을 때
        videoSocket.onerror = function (error) {
            console.error('WebSocket 오류:', error);
            reject(error);

			showToast('영상 스트림을 불러오는 데 실패했습니다. 다시 시도해주세요.');

			 // 오류 발생 시 초기 이미지를 다시 로드하여 유지
			 loadInitialImage('images/aicar.png', canvas)
			 .then(() => {
				 console.log('초기 이미지가 다시 로드되었습니다.');
			 })
			 .catch(imgError => {
				 console.error('초기 이미지를 다시 로드하는 중 오류 발생:', imgError);
			 });


        };
    });
}

// 캔버스에 이미지 그리기 함수
function drawImageOnCanvas(imageData, canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Canvas context not available!");
        return;
    }

    // 이미지 객체 생성
    const img = new Image();
    img.src = 'data:image/jpeg;base64,' + imageData;

    img.onload = function () {
        // 캔버스 크기에 맞춰 이미지 그리기
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.onerror = function (error) {
        console.error("Error loading image from WebSocket:", error);
    };
}

// 캔버스 크기 조정 및 이미지 다시 그리기 함수
function adjustCanvasSize(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Canvas context not available!");
        return;
    }

    // 캔버스의 실제 크기를 CSS 크기와 일치시키기
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

	// 현재 이미지를 다시 그리기
    loadInitialImage('images/aicar.png', canvas)
		.then(() => {
			console.log('초기 이미지가 다시 로드되었습니다.');
		})
		.catch(imgError => {
			console.error('초기 이미지를 다시 로드하는 중 오류 발생:', imgError);
		});

    // 현재 이미지를 다시 그리기 위해 WebSocket에서 다시 수신하도록 설정
    // 이 부분은 서버에서 새로운 이미지를 계속해서 보내고 있다고 가정
    // 만약 그렇지 않다면, 추가적인 로직이 필요할 수 있습니다.
}

// 워크스페이스 초기화 함수
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

// 로드 이벤트 리스너
window.addEventListener('load', function () {
    if (!window.demoWorkspace && !isInitialized) {
        console.log("load event ==================");
        console.log("Initializing workspace...");
        isInitialized = true;  // 초기화 플래그 설정
    }
    else {
        return;
    }

    blocklyArea = document.getElementById('blocklyArea');
    console.log("blocklyArea    ", blocklyArea);
    blocklyDiv = document.getElementById('blocklyDiv');
    divArea = document.getElementById('divArea');
    console.log("div area i = ", divArea);
    con_view_area = document.getElementById('con_view_area');

    initializeWorkspace();

    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(window.demoWorkspace);

    // 워크스페이스가 성공적으로 초기화되었는지 확인 후 리스너 등록
    if (window.demoWorkspace) {
        console.log('Workspace fully initialized');
        window.demoWorkspace.addChangeListener(demoWorkspaceChangeListener);
    } else {
        console.error("demoWorkspace is not initialized yet.");
    }

    // 드래그 관련 이벤트 리스너 등록
    divArea.addEventListener('mousedown', m_down, true);
    divArea.addEventListener('mouseenter', m_enter, true);
    divArea.addEventListener('mouseleave', m_leave, true);

    document.body.addEventListener('mousemove', m_move, true);
    document.body.addEventListener('mouseup', m_up, true);

    // 버튼 이벤트 리스너 등록
    const blockClear = document.getElementById('blockClear');
    blockClear.addEventListener('click', window.func_blk_clear, false);

    const blockSave = document.getElementById('blockSave');
    blockSave.addEventListener('click', window.func_blk_save, false);

    document.getElementById('fblockSave').addEventListener('click', window.func_fblk_save, false);

    // 파일 읽기 버튼과 파일 입력 요소 참조
    const fileReadButton = document.getElementById('fblockRead');
    const fileInput = document.getElementById('fileInput');

    // 파일 읽기 버튼에 이벤트 리스너가 추가되지 않았는지 확인
    if (!fileReadButton.dataset.listenerAdded) {
        fileReadButton.addEventListener('click', () => {
            console.log('fblockRead button clicked');
            fileInput.click();  // 파일 선택 창 열기
        });
        fileReadButton.dataset.listenerAdded = 'true';  // 리스너 추가 표시
    }

    // 파일 입력 요소에 이벤트 리스너가 추가되지 않았는지 확인
    if (!fileInput.dataset.listenerAdded) {
        fileInput.addEventListener('change', window.handleFileSelect);
        fileInput.dataset.listenerAdded = 'true';  // 리스너 추가 표시
    }

    const blockRead = document.getElementById('blockRead');
    blockRead.addEventListener('click', window.func_blk_read, false);

    document.getElementById('code_run').addEventListener('click', window.func_code_run, false);
    document.getElementById('code_clear').addEventListener('click', window.func_clear, false);
    document.getElementById('code_copy').addEventListener('click', window.func_copy, false);
    document.getElementById('code_kill').addEventListener('click', window.sendCtrlC, false);

    // imgView 버튼 이벤트 리스너 추가
    const imgViewButton = document.getElementById('imgView');
    if (imgViewButton && !imgViewButton.dataset.listenerAdded) {
        imgViewButton.addEventListener('click', toggleCanvasView);
        imgViewButton.dataset.listenerAdded = 'true';
    }
});

// 워크스페이스 변경 리스너
function demoWorkspaceChangeListener(primaryEvent) {
    console.log("Event Type: ", primaryEvent.type); // 어떤 이벤트가 발생하는지 확인

    if (primaryEvent.type === Blockly.Events.CLICK) {
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
                const fname = './ublocks/code_blk/' + data.type;
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

                        const element = document.getElementById('bottom');
                        element.textContent = `power by Google => ${data.type}`;

                        console.log("return result ", result.content);

                        const xmlContent = result.content;
                        //Blockly.mainWorkspace.clear();
                        const xml = Blockly.Xml.textToDom(xmlContent);
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

    // 코드 생성 및 표시
    if (window.demoWorkspace) {
        try {
            Blockly.Python.INFINITE_LOOP_TRAP = null;
            Blockly.Python.INDENT = '    ';
            const code = Blockly.Python.workspaceToCode(window.demoWorkspace);
            console.log("Generated Python code:", code);
            document.getElementById('code_out').value = code;
        } catch (error) {
            console.error("Error generating code:", error);
        }
    } else {
        console.error("Workspace is null or not ready.");
    }
}

// 블록 저장 함수
window.func_blk_save = () => {
    const xmlDom = Blockly.Xml.workspaceToDom(window.demoWorkspace);
    const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    console.log(xmlText);
    const storage = window['localStorage'];
    const save_xml = xmlText;
    storage.setItem("save_xml", save_xml);
};

// 파일로 블록 저장 함수
window.func_fblk_save = () => {
    const xmlDom = Blockly.Xml.workspaceToDom(window.demoWorkspace);
    const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    console.log('func_fblk_save()');

    const blob = new Blob([xmlText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "block.xml");
};

// 파일 선택 시 실행되는 함수
window.handleFileSelect = (event) => {
    const file = event.target.files[0];  // 선택된 파일 가져오기
    if (!file) {
        console.error("No file selected.");
        return;
    }

    const reader = new FileReader();  // 파일 읽기 위한 FileReader 객체 생성

    // 파일이 성공적으로 읽혀지면 호출되는 함수
    reader.onload = function (e) {
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
};

// 블록 초기화 함수
window.func_blk_clear = () => {
    window.demoWorkspace.clear();
};

// 저장된 블록 불러오기 함수
window.func_blk_read = () => {
    console.log(window.preventTowRead);

    const storage = window['localStorage'];
    const save_xml = storage.getItem("save_xml");
    if (save_xml != null) {
        console.log(save_xml);
        const xml = Blockly.Xml.textToDom(save_xml);
        Blockly.Xml.domToWorkspace(xml, window.demoWorkspace);
        window.preventTowRead = 0;
    }
    window.preventTowRead = 0;
};

// 리사이즈 이벤트 핸들러
const onresize = function (e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    console.log("onresize event");
    let element = blocklyArea;
    let x = 0;
    let y = 0;
    while (element) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }

    console.log(`offsetWidth offsetHeight = ${x}, ${y}, ${blocklyArea.offsetWidth}, ${blocklyArea.offsetHeight} `);

    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

    Blockly.svgResize(window.demoWorkspace);
};

// ////////////////// Window Change
let bw, w1, w2, w3;
let m_sts = 'up';
let m_after_move = false;
let m_mvx = 0;

function info() {
    bw = document.body.clientWidth;
    w1 = blocklyArea.clientWidth;
    w2 = divArea.clientWidth;
    w3 = con_view_area.clientWidth;
    onresize();
}

function m_down(event) {
    info();
    const x = event.clientX;
    const y = event.clientY;
    const str = `point = ${x}, ${y} `;
    console.log(str);
    m_sts = 'down';
}

function m_enter(event) {
    document.body.style.cursor = "col-resize";
}

function m_leave(event) {
    document.body.style.cursor = "default";
}

const m_move = (event) => {
    if (m_sts === 'down') {
        const x = event.clientX;
        const y = event.clientY;

        const str = `m_move point = ${x}, ${y} ${bw} `;
        console.log(str);

        m_mvx = x - 5;

        if (x > 200 && x < bw - 200) {
            blocklyArea.style.width = `${(x - 5)}px`;
            divArea.style.width = '10px';

            con_view_area.style.width = `${bw - ((x + 5))}px`;
            document.getElementById('code_div').style.width = `${bw - ((x + 5))}px`;

            onresize(event);
            // window.dispatchEvent(new Event('resize'));

            m_after_move = true;
        }
    }
};

function m_up(event) {
    if (m_after_move === true) {
        m_sts = 'up';
        document.body.style.cursor = "default";
        const x = event.clientX;
        const w1_w = Math.round((x - 5) / bw * 100);

        blocklyArea.style.width = `${w1_w}%`;
        divArea.style.width = '10px';
        con_view_area.style.width = `calc(${100 - w1_w}% - 10px)`;
        document.getElementById('code_div').style.width = `${bw - ((x + 5))}px`;

        onresize(event);
        m_after_move = false;
    }
}

// ////////////////// term

let xtermInstance = null;
let obj_dis = null;
let main_ws = null;

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
        console.log("send kill");
        main_ws.send('\u0003'); // ASCII 코드 3은 Control-C
    }
};

// 코드 실행 함수
window.func_code_run = async function () {
    console.log('remote connect');
    xtermInstance = create_xterm(xtermInstance);

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
            new attach(xtermInstance, main_ws);
            // command send
            // cmd = cmd + '\r'
            // ws.send(cmd);
        };

        main_ws.onclose = function () {
            main_ws = null;
        };

        main_ws.onerror = function (e) {
            console.log(e);
        };
    }

    /* Get the text field */
    const copyText = document.getElementById("code_out");
    console.log('run_code:');
    console.log(copyText.value);

    const fws = new WebSocket(`ws://${serverAddress}:8001`);
    fws.onopen = function () {
        console.log('file write open');
        fws.send(copyText.value);
        fws.close();
    };

    fws.onerror = function (e) {
        console.log(e);
    };
};

// xterm 생성 함수
function create_xterm(existingXterm) {
    let xterm = existingXterm;

    if (xterm == null) {
        console.log('create xterm');
        xterm = new Terminal({ cols: 80, rows: 16 });

        obj_dis = document.getElementById('t4');
        console.log('obj_dis = ' + obj_dis);
        xterm.open(obj_dis);
    }
    return xterm;
}

// 클리어 함수
window.func_clear = function () {
    console.log('doing clear');
    if (xtermInstance) {
        xtermInstance.clear();
    }
    if (main_ws) {
        main_ws.close();
    }
    xtermInstance = null;
    main_ws = null;
    if (obj_dis) {
        obj_dis.innerHTML = "";
    }
};

// 복사 함수
window.func_copy = function () {
    /* Get the text field */
    const copyText = document.getElementById("code_out");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
    copyText.select();

    /* 로그에 복사된 텍스트 출력 */
    console.log("copy: " + copyText.value);
};

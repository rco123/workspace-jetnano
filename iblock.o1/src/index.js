import Blockly from "blockly";
import 'blockly/python';

import { Terminal } from 'xterm';
import { attach } from './js_s/attach.js'


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


window.addEventListener('load', function () {

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

	const blockRead = document.getElementById('blockRead');
	blockRead.addEventListener('click', window.func_blk_read, false);

	document.getElementById('code_run').addEventListener('click', window.func_code_run, false)
	document.getElementById('code_clear').addEventListener('click', window.func_clear, false)
	document.getElementById('code_copy').addEventListener('click', window.func_copy, false)

	document.getElementById('code_kill').addEventListener('click', window.sendCtrlC, false)

});


// window.addEventListener('DOMContentLoaded', (event) => {
// 	console.log('DOM fully loaded and parsed');
// 	window.demoWorkspace.addChangeListener(demoWorkspaceChangeListener)
// });

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
						Blockly.Xml.domToWorkspace(xml, demoWorkspace);
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
			var code = Blockly.Python.workspaceToCode(demoWorkspace);
			console.log("Generated Python code:", code);
			document.getElementById('code_out').value = code;
		} catch (error) {
			console.error("Error generating code:", error);
		}
	} else {
		console.error("Workspace is null or not ready.");
	}


}




// function demoWorkspaceChangeListener(primaryEvent) {

// 	console.log("Event Type: ", primaryEvent.type); // 어떤 이벤트가 발생하는지 확인

// 	if (primaryEvent.type == Blockly.Events.CLICK) {

// 		//console.log(primaryEvent);
// 		console.log("block id =", primaryEvent.blockId)

// 		if (primaryEvent.blockId != null) {

// 			try {
// 				var data = demoWorkspace.getBlockById(primaryEvent.blockId);
// 				console.log(data);
// 				if (data == null) {
// 					console.log("null event, return");
// 					return;

// 				}
// 			} catch (error) {
// 				// 예외 발생 시 오류 처리
// 				console.error("An error occurred while retrieving the block data:", error);
// 			}

// 			if (data.type.endsWith('.xml')) {
// 				var fname = './ublocks/code_blk/' + data.type;
// 				console.log('file_name : %s', fname);

// 				fetch('/read-file', {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json'
// 					},
// 					body: JSON.stringify({ filePath: fname })
// 				})
// 					.then(response => response.json())
// 					.then(result => {
// 						if (result.error) {
// 							console.error(result.error);
// 							return;
// 						}

// 						let element = document.getElementById('bottom');
// 						element.textContent = `power by Google   =>  ${data.type}`;

// 						console.log("return result ", result.content)

// 						var xmlContent = result.content;
// 						Blockly.mainWorkspace.clear();
// 						var xml = Blockly.Xml.textToDom(xmlContent);
// 						Blockly.Xml.domToWorkspace(xml, demoWorkspace);
// 					})
// 					.catch(error => {
// 						console.error('Error:', error);
// 					});

// 			}

// 		}
// 	}

// 	if (primaryEvent instanceof Blockly.Events.Ui) {
// 		return;  // Don't mirror UI events.
// 	}

// }




window.func_blk_save = () => {
	var xmlDom = Blockly.Xml.workspaceToDom(window.demoWorkspace);
	var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
	console.log(xmlText)
	storage = window['localStorage'];
	var save_xml = xmlText;
	//console.log(save_xml)
	storage.setItem("save_xml", save_xml);

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

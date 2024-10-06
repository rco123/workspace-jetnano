#!/usr/bin/python3

import asyncio
import websockets
import json

async def send_command():
    uri = "ws://localhost:8766"  # 서버 주소와 포트 설정

    async with websockets.connect(uri) as websocket:
        # JSON 명령어 생성
        command = {
            "command": "move",
            "angle": 0,  # 예: 30도 각도로 이동
            "speed": 0  # 예: 속도 100
        }

        # JSON으로 변환하여 전송
        await websocket.send(json.dumps(command))
        print(f"보낸 명령어: {command}")

        # 서버에서 수신한 메시지 출력 (옵션)
        response = await websocket.recv()
        print(f"서버 응답: {response}")

# 이벤트 루프 실행
asyncio.get_event_loop().run_until_complete(send_command())



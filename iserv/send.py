import websocket
import time

# WebSocket 연결 설정
ws = websocket.WebSocket()
ws.connect("ws://localhost:8080")

# 서버로 전송할 파이썬 코드
python_code = """

import time

print('Hello from Python code')
cnt = 0
while True:
	cnt = cnt + 1
	print(cnt)
	time.sleep(1)

"""

# 파이썬 코드를 서버로 전송
ws.send(python_code)

# 서버로부터 실행 결과를 수신
try:
	while True:
		result = ws.recv()
		if result:
			print(f"Receive from serv: {result}")
		else:
			break
except websocket.WebSocketConnectionClosedException:
	print("Connection close")

finally:
	ws.close()



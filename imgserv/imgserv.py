#!/home/pi/myenv/bin/python3

import asyncio
import websockets
import glob
import cv2
import base64


# WebSocket 서버 생성
async def send_video(websocket, path):

    # OpenCV 카메라 캡처 부분
    cap = cv2.VideoCapture(0)
    
    try:
        while cap.isOpened():

            ret, frame = cap.read()
            if not ret:
                break

            #files = glob.glob("/home/pi/share/r18/**/*.jpg")
            #file = files[1]
            #frame = cv2.imread(file)

            # JPEG로 변환
            _, buffer = cv2.imencode('.jpg', frame)

            # base64로 인코딩
            jpg_as_text = base64.b64encode(buffer).decode('utf-8')

            # WebSocket을 통해 전송
            await websocket.send(jpg_as_text)

            # 약간의 지연을 줘서 너무 빠르게 전송되지 않게 함
            await asyncio.sleep(0.1)
    finally:
        #cap.release()
        print("end program")

# WebSocket 서버 실행
start_server = websockets.serve(send_video, "0.0.0.0", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


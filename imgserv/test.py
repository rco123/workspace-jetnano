
import cv2

# 카메라 장치 번호 0번을 사용하여 카메라 연결
cap = cv2.VideoCapture(0)

# 해상도 설정
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)

#cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
#cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# 카메라 연결 상태 확인
if not cap.isOpened():
    print("cant open camera")
    exit()

# 카메라로부터 프레임 읽기
ret, frame = cap.read()

print(frame.shape)

if ret:
    # 읽어들인 프레임을 파일로 저장 (JPEG 형식)
    cv2.imwrite('captured_image.jpg', frame)
    print("captured_image.jpg")
else:
    print("read fail.")

# 카메라 자원 해제
cap.release()


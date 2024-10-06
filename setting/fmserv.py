#!/usr/bin/python3

import asyncio
import base64
import json
import os
import re
import cv2
import numpy as np

from websockets import serve

# 이미지가 저장된 디렉토리 지정
BASE_DIR = "/home/jetson/share/"
# 이미지 파일 확장자
IMAGE_EXT = '.jpg'


def list_first_level_subdirectories(base_path):
    subdirectories = [os.path.join(base_path, name) for name in os.listdir(base_path)
                      if os.path.isdir(os.path.join(base_path, name))]
    return subdirectories


async def image_server(websocket, path):

    img_dir = ""

    try:
        async for message in websocket:

            request = json.loads(message)

            if request['request'] == 'getTotalImages':

                #sub_dir = request['imgDir'] 
                #img_dir = BASE_DIR + sub_dir

                img_dir = request['imgDir'] 
                print("img_dir = ", img_dir)

                # 전체 이미지 개수 계산
#                total_images = len([
#                    name for name in os.listdir(img_dir)
#                    if re.match(r'^\d{3}_(?:-?\d{3})\.jpg$', name)
#                ])
#

                # 디렉토리에서 *.jpg 파일 이름을 읽어옵니다.
                file_names = [
                    name for name in os.listdir(img_dir)
                    if os.path.isfile(os.path.join(img_dir, name))  # 파일인지 확인
                       and name.lower().endswith('.jpg')  # 확장자가 .jpg인지 확인
                ]

                # 파일 이름을 앞자리 순으로 정렬합니다.
                file_names_sorted = sorted(file_names, key=lambda name: int(re.match(r'^(\d+)_', name).group(1)))

                # 정규식을 이용하여 앞자리 순서에 따라 필터링합니다.
                total_images = [
                    name for name in file_names_sorted
                    if re.match(r'^\d{3}_(?:-?\d{3})\.jpg$', name)
                ]

                print("total_images_len =", len(total_images))

                await websocket.send(json.dumps({'totalImages': total_images}))


            elif request['request'] == 'fetchImage':

                # 특정 이미지 데이터 전송
                image_name = request['imgName']

#                # 해당 패턴과 일치하는 파일들 찾기
#                matching_files = [
#                    name for name in os.listdir(img_dir)
#                    if re.match(fname_pattern, name)
#                ]
#                print(matching_files)
#                fname = matching_files[0]
#                image_path = img_dir + "/" + fname

                
                print(image_name)

                if os.path.exists(image_name):

                    with open(image_name, "rb") as image_file:
                        # 이미지 읽기
                        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_UNCHANGED)

                        print(image.shape)
                        
                        # 이미지 리사이즈 (예: 300x300 픽셀) (360, 640, 3)
                        resized_image = cv2.resize(image, (320, 180))

                        # 리사이즈된 이미지를 메모리에 다시 인코딩
                        _, buffer = cv2.imencode('.jpg', resized_image)

                        # Base64 인코딩
                        base64_data = base64.b64encode(buffer).decode('utf-8')

                        #base64_data = base64.b64encode(image_file.read()).decode('utf-8')

                        fname = fname = os.path.basename(image_name)

                        json_str = {'imageBase64': base64_data, 'fname' : fname }
                        await websocket.send( json.dumps(json_str) )

                else:
                    await websocket.send(json.dumps({'error': 'Image not found'}))

            elif request['request'] == 'changeFname':

                old_name= request['lastName']
                new_name = request['newName']
                dirName = request['dirName']

                print(old_name, new_name, dirName)

                files = os.listdir(dirName)

                if old_name in files:
                    os.rename(dirName + "/" + old_name, dirName + "/" + new_name)
                    print(f"from '{old_name}'to '{new_name}'")
                else:
                    print(f"'{old_name}' is not exist .")


            elif request['request'] == 'delFname':

                fname = request['fname']
                print("delfname = ", fname)

                if os.path.exists(fname):  # 파일이 존재하는지 확인
                        os.remove(fname)  # 파일 삭제
                        print(f"file {fname} deledted.")
                else:
                    print(f"file {fname} is not exist.")



            elif request['request'] == 'getTotalDirs':

                rDir = request['Dir'] 
                rDir = rDir[1:] if rDir.startswith('/') else rDir
                base_path = os.path.join('/home/jetson/share', rDir)

                print("base_path = ", base_path)

                dirs_list = list_first_level_subdirectories(base_path)
                print(dirs_list)

                #out = json.dump(dirs_list).encode('utf-8')

                await websocket.send(json.dumps({'dirsList': dirs_list}))


    except Exception as e:
        print(f"Error: {e}")

async def main():
    async with serve(image_server, "0.0.0.0", 3001):
        await asyncio.Future()  # run forever

if __name__ == '__main__':
    asyncio.run(main())




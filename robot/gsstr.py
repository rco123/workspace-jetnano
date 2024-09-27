

def gstreamer_pipeline(
                           capture_width=1280,
                           capture_height=720,
                           display_width=640,
                           display_height=360,
                           framerate=30,
                           flip_method=0):
        return (
            "nvarguscamerasrc ! "
            "video/x-raw(memory:NVMM), width=(int){}, height=(int){}, framerate=(fraction){}/1 ! "
            "nvvidconv flip-method={} ! "
            "video/x-raw, width=(int){}, height=(int){}, format=(string)BGRx ! "
            "videoconvert ! "
            "video/x-raw, format=(string)BGR ! appsink".format(
                capture_width, capture_height, framerate, flip_method, display_width, display_height))



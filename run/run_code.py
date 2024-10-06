img = None
angle = None


from robo import robot_control
from lane import lane_control
robo = robot_control()
ailane = lane_control()
ailane.load_model( )

while True:
    img = robo.get_img( )
    angle = ailane.det(img)
    print(angle)
    robo.move(angle, 3)
    robo.dis_img_ang(img, angle)
    robo.delay(0.01)

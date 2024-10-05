1.
#sudo visudo
#includedir /etc/sudoers.d
jetson ALL=(ALL) NOPASSWD: ALL

2.
#crontab -e
#@reboot /bin/bash -c "source /home/jetson/.bashrc && /bin/bash /home/jetson/startup.sh"
@reboot /bin/bash -c "source /home/jetson/.bashrc && /usr/bin/python3 /home/jetson/workspace/startup.py"



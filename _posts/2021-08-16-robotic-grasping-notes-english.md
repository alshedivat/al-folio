---
layout: post
title: "Robotic Grasping - FDU Robotics Lab Notes (English Version)"
date: 2021-08-16 00:00:00-0400
---

&copy; **2021 Zheyuan Zhang**

**If you like this note, please** [click here](https://github.com/cozheyuanzhangde) **to follow my GitHub!**

> I welcome you to read this note and I truly hope it will help you. This note was recorded when I was doing robotic grasping in the robotics lab. It contains not only knowledge about robotic grasping, but also notes on computer vision, Linux, LaTeX, and other issues. Since I did not do reorganization and error checking, the original draft may have some errors, so I hope you will just use it as a reference, but study the parts that you are not sure about, and if you can tell me the exact location of the errors, I will fix them. Thanks.

> In the first two weeks, I mainly referred to the [Fruit Grasping-Workshop](https://shimo.im/docs/6QWDWTpcQCYVrKDQ/read) notes written by my seniors. The flow of this note is more complete, so you can read this note first and then read my notes.

Installation history: Ubuntu 18.04 -> ROS -> Nvidia Driver, Cuda, cuDNN... -> ZED SDK -> Darknet/YOLO -> ...

Important: If you can't get into the system properly after installing linux there is initramf or something like command line, online tutorials will teach to fix the file system. In the past, I installed kali linux virtual machine through this method to enter the system normally. But this dual system installation does not seem to be the problem. I found out that I need to change the BIOS settings, one is to change the SATA from Raid On to AHCI, this is the most important, in addition to remove the secure boot, do not safe boot. This will allow you to enter the dual system normally. However, it is not clear whether there will be any hidden problems, have not carefully investigated.

About environment variables, if the installed software is not in local/bin or the default installation location of linux, the software can not be opened through the command line. At this point we need to add environment variables. Enter the home path, click on the three horizontal lines in the upper right corner, open Show Hidden Files, then click on .profile, copy and paste that if, then to fi statement, replace $HOME/.local/bin with the bin directory you want to add, such as /home/brian/matlab/bin. then Save and exit, CTRL+ALT+DELETE Log Out, let linux reload this .profile file to open matlab via command line, no need to cd to matlab bin directory every time and then open it.

For ROS Melodic installation, please refer to [https://blog.csdn.net/qq_41450811/article/details/99079041](https://blog.csdn.net/qq_41450811/article/details/99079041)

ROS installs all dependencies automatically: rosdep install --from-paths src --ignore-src -r -y
If catkin_make is not compiled too soon, delete the devel folder and re-catkin_make.

The host in the ROS installation file does not have to be a fixed IP address, you can use localhost

Since compiling Darknet requires Cuda and so on, so install these first.

Before compiling Darknet, change the Makefile!!! You can see the PPT of Mr. Qiu Shu
Darknet can only be called after compiling with make in the current folder. /darknet (before setting environment variables)
You need to git clone zed-ros-wrapper to continue before contacting ROS again.
Some times there will be invoke make failure, often because the clone did not add --recursive caused by missing files

A few problems encountered with AUBO robot arm control:
1. Boost library needs to be downgraded to 1.68, because 1.69 and later versions remove signal and become signal2. It is troublesome to change the code, so I directly downgrade the Boost library. 2.
2. install the aubo environment with the one provided by the senior in the network disk, otherwise there will be problems with the driver (Melodic version).
3. when controlling the connection via wifi, I encountered a problem, that is, control timeout, take too long to execute, this problem can not be solved by canceling the time limit. One of the ERRORs says that the trajectory_speed library cannot be found, so you can find the library in the directory and copy it to /usr/lib/python2.7/dist-packages, if the default Python is 3.x or other, the same operation.

The solution is to replace the path in darknet/cfg/coco.data with /home/brian(username)/darknet/data/coco. names.

It is difficult to process the point cloud because the camera can't take the whole picture of the object by scanning from top to bottom once, so we have to build the complete 3D model by shooting from multiple angles and then split it to find the center of mass, but it is more difficult. This method is abandoned for the time being.

There are a few points to note in the software of the "Yolo", one is: change cqsfdu to your own path.
Another is: all three files should be run: 1. pcdrgb_publisher, 2. pcdrgb_yolo_publisher, 3. zhixiang_label_detector
There is one more thing: before each capture, you need to take a picture in pcdrgb_publisher, not in real time! Otherwise the signal of callback can not be captured.

The difficult part of the whole demo is the hand-eye calibration, coordinate transformation (TF). Since there are multiple coordinate systems in the robot, the coordinates of the objects recognized by the camera are not relative to the base coordinates. So at least two conversions are needed, the first conversion is hand-eye conversion, by hand-eye calibration of the matrix, processing? afterwards into a rotation matrix. This converts the eye coordinates into hand coordinates (handeye_matrix). But it is not enough, it is also necessary to convert the hand coordinates into base coordinates before the robot can complete the grasp. This is done by looking at the Flange (normal wheel) and converting Rx,Ry,Rz (Euler's angle) into a rotation matrix (note that this can be done through MatLab, but it is best to use the steps sent by the senior to do down, using MatLab comes with angle2dcm may produce a transposed matrix, of course, you can also transpose it back, but you still have to manually calculate (You can also transpose it back yourself, but you still have to do the math manually to make sure it's right. The rotation matrix is 3x3, we need to convert it to 4x4, so the rightmost column from top to bottom is x,y,z of Fallon disk, and the bottom row is 0,0,0,1, so that the handbase_matrix is completed. matrix is the transpose of [x, y, z, 1]. Then how do you get the transformed_matrix which is the coordinates relative to the base coordinates? Just calculate a transforming_matrix = handbase_matrix * handeye_matrix. then transformed_matrix = transforming_matrix * position_matrix. so that trans_x, trans _y, trans_z = position_matrix[0], position_matrix[1], position_matrix[2]. The actual robotic gripping process will have errors because the matrix algorithm above will have the problem of information loss due to about fractions. One solution is to calculate the matrix dynamically by directly reading the dynamic Flange value of the robotic arm. There is also a less robust solution is to add and subtract trans_x,y,z according to the error of a position by itself. i am using this temporary approach because reading the parameters of the robotic arm is a bit troublesome. Another important thing is to calculate the quaternion, the quaternion can be converted to quaternion by Matlab's dcm2quat, the rotation matrix. Of course, if the dynamic acquisition can also be done through the Python library, but there may be a prompt for the input matrix is not othogonal matrix, this situation requires manual adjustment of the allowable range in the library to solve. One note: do not get the order wrong, the order of the quaternion is [w,x,y,z], do not get it wrong, otherwise you do not know where the problem lies. Many conversion formulas on the Internet are wrong, remember! This way we have the whole coordinate conversion and robotic posture conversion to solve.

There is a robot_tf_setup tf_broadcaster.cpp in the first broadcaster is the hand-eye calibration of things, because the above already have, so here fill in 0,0,0,1 and 0,0,0 on the line. But the following should be changed to 0,0,0,1 and 0,0,0.502. This can be seen by tf monitor, tf echo directly after opening the robot arm's Rviz program.
But this part I myself do not know if it is necessary to fill in, my intuition is that this part is not needed, when the time comes, you can test whether it is needed or not.

The current position of the robot can be obtained via ROS without calling the robot arm's API:'
[https://blog.csdn.net/qq_39201531/article/details/108166673](https://blog.csdn.net/qq_39201531/article/details/108166673)

To calculate the rotation matrix by quaternions, you can use the following method from [https://automaticaddison.com/how-to-convert-a-quaternion-to-a-rotation-matrix](https://automaticaddison.com/how-to-convert-a-quaternion-to-a-rotation-matrix), the results of which will be problematic with Python's library (it doesn't seem to be a transposition problem either):

```
import numpy as np
 
def quaternion_rotation_matrix(Q):
    """
    Covert a quaternion into a full three-dimensional rotation matrix.
 
    Input
    :param Q: A 4 element array representing the quaternion (q0,q1,q2,q3) 
 
    Output
    :return: A 3x3 element matrix representing the full 3D rotation matrix. 
             This rotation matrix converts a point in the local reference 
             frame to a point in the global reference frame.
    """
    # Extract the values from Q
    q0 = Q[0]
    q1 = Q[1]
    q2 = Q[2]
    q3 = Q[3]
     
    # First row of the rotation matrix
    r00 = 2 * (q0 * q0 + q1 * q1) - 1
    r01 = 2 * (q1 * q2 - q0 * q3)
    r02 = 2 * (q1 * q3 + q0 * q2)
     
    # Second row of the rotation matrix
    r10 = 2 * (q1 * q2 + q0 * q3)
    r11 = 2 * (q0 * q0 + q2 * q2) - 1
    r12 = 2 * (q2 * q3 - q0 * q1)
     
    # Third row of the rotation matrix
    r20 = 2 * (q1 * q3 - q0 * q2)
    r21 = 2 * (q2 * q3 + q0 * q1)
    r22 = 2 * (q0 * q0 + q3 * q3) - 1
     
    # 3x3 rotation matrix
    rot_matrix = np.array([[r00, r01, r02],
                           [r10, r11, r12],
                           [r20, r21, r22]])
                            
    return rot_matrix
```

The initial settings of the software for hand-eye calibration of the image can easily lead to overexposure and failure to calibrate. The solution is to use the threshold of the depth camera in 3DViewer and increase the threshold to solve the problem.

The final demo has 8 windows, so consider writing a shell script to open and run the windows automatically.

The calibration result is hardly accurate, so you need to do error-fitting compensation. Using Matlab's CFTools, a set of x's and y's have to be determined.
Trans_x, trans_y and trans_z are calculated by yolo.
Then the robot arm will move to this position. But the actual position will be different.
So X is trans(trans_x,y,z) and Y is the actual position (actual_x,y,z). This will give you three sets of functions that can be brought in for accurate crawling.

Make sure that yolo publish a non-000 coordinate before each capture. This time, the point cloud was not generated correctly due to overexposure and the coordinates of 000 were published every time. I never saw it so I wasted a long time.

Some links for reference.
[https://blog.csdn.net/qq_39201531/article/details/108166673](https://blog.csdn.net/qq_39201531/article/details/108166673)

[https://answers.ros.org/question/299287/bimanual-pick-and-place](https://answers.ros.org/question/299287/bimanual-pick-and-place)

[https://blog.csdn.net/Kalenee/article/details/80818658](https://blog.csdn.net/Kalenee/article/details/80818658)

[https://blog.csdn.net/u014205023/article/details/108766994](https://blog.csdn.net/u014205023/article/details/108766994)

[https://blog.csdn.net/shenxiaolu1984/article/details/50639298](https://blog.csdn.net/shenxiaolu1984/article/details/50639298)

Review:

ROS: List of running nodes.
rosnode list
List of running topics.
rostopic list
Print the topic content (some topics need to be revived to be displayed).
rostopic echo "topic name"
View topic type and other information
rostopic info "topic name"

BIG MISTAKE:

I used to think that the reason why I couldn't capture overlapping objects was because the point cloud counted two apples or more overlapping objects as a whole when it counted the center of mass. But it's actually not possible. The 3D-RGB-D camera can only capture one surface of the fruit from top to bottom, which means that there is no problem as mentioned before. So what is the problem? I did the following experiments: 1. tried to capture a fruit and recorded the position of the camera point cloud center of mass and the last actual location to be reached, and the capture was successful. 2. tried to capture two overlapping fruits (two identical apples, same as above) and recorded the position of the camera point cloud center of mass and the last actual location to be reached, but before the actual capture, moved the two fruits apart because I wanted to see where it would actually I wanted to see where it would actually move to. It turned out that the final location was the same both times! Then I looked at the position of the center of mass of the camera point cloud, but the z-axis was different by 0.07, which is exactly the height of an apple. Then I found out that after multiplying the rotation matrix twice, the original big difference in the z-axis became a very small difference of 0.0001 level. As for why, it is possible that the results of the hand-eye calibration is not allowed and so on, but I do not know why x, y is accurate only z-axis problems. So I plan to use the original point cloud center of mass position to calculate the final position directly, that is, without multiplying by the rotation matrix. Because we are fixed position capture, and there is no real-time object position detection. So this crude method is OK. But then we run into a new problem, that is, the grab height of two apples is lower than the grab height of one apple, which is definitely problematic. So the solution is to take the negative value + a certain fixed value. Since I observed that the actual grabbing position of one apple is about 0.0, so I just add 0.414 will be -0.414 (the z-axis of one apple takes a negative value), that -0.34 (the z-axis of two apples takes a negative value) plus 0.414 is about 0.07, which is just the grabbing position of two apples. In addition, I can go to a location where the bucket is placed and record the value of each joint of the robot arm, so that the robot arm grabs the fruit and then drops the fruit into the bucket.

Actually, I have already done this overlapping grasping project. But Dr.Li asked me to make a more generalized version based on 2D RGB image analysis. That is, not through YOLO neural network and point cloud segmentation. The 2D image alone is used to determine the roundness, squareness, size, etc. and then the depth information from the depth camera is used to achieve the capture. This is equivalent to overturning the previous vision module. So the vision piece has to be redone:

First step:
My idea is to implement an algorithm that can recognize a complete circle first. But the hough circle transform on OpenCV will automatically complete some non-complete circles, and many internal implementations can't be adjusted. So for now, I am considering to write an algorithm for recognizing circles by hand.

IMPORTANT LOG:
If there is a problem running the previous capture program later, it may be that I changed zhixiang_yolo_pcd.cpp today because make -j8 -l8 failed so I looked at the two places before there are somehow two more things like comments but did not add the comment symbol to cause compilation failure. But it is possible that I deleted something by mistake. If I have problems in the future, I will ask my senior for another copy of zhixiang_yolo_pcd.cpp.

The proportion of Hough Circle Transform and Edge in the circle can be calculated whether it is a complete circle, for example, the proportion of 30-50% can filter out most of the non-complete circles. Then by depth judgment, each time just grab the highest on the line, that is, the largest z value. The extraction of circle center and circle radius on RGB image has been achieved so far. But the biggest problem is how to map RGB x,y to point cloud or world coordinates x,y,z. We are still stuck here. The main problem is the BoundingBox, which is theoretically obtained by processing 2D images with yolo, so the principle should be similar to the radius of the circle after I get it here. Anyway, now I need to turn the circle into a boundingbox and use the code I already have to accomplish this task.

By rewriting the yolo-based segmentation point cloud to approximate the coordinates above the target object in zhixiang_yolo_pcd.cpp (because I found that yolo also only handles 2D images and segmentation, so the principle is the same. I just need to convert the circle into a rectangular BoundingBox), based on the 2D image OpenCV analysis, the task of capturing without relying on YOLO has been completed. However, I found that the OpenCV-based version is less effective in dealing with complex stacking environments. I am still exploring where the problem lies. In addition, it does not work for more complex tree objects, the whole picture is full of circles. It seems that the only way to grab tree objects is to use yolo.

This afternoon, I tried to rewrite the previous capture code to complete the capture of the hanging tree objects. The result is quite successful, although the accuracy needs to be improved by further error fitting, and the multi-target capture has not been completed. The main change is to add a listener (subscriber) to listen to the object name output of yolo. Then locate the coordinates of the apple to achieve the capture. Since there are two listener and they can't run at the same time, I let the bound_name that listens to the yolo object name do it first, because it ends soon, and then let the listener that listens to center_median start later, because this is the main program and needs to wait by camera, which is very slow.

Today, because the original YOLO is very poor at identifying fake apples, I plan to train YOLO myself. along the way again, there are various problems. How to train, first we have to take at least 20 photos of apples from various angles and situations (stacking, blocking) (actually it takes 500-2000 photos normally, I'll be lazy first.) The full tutorial is available at [https://github.com/AlexeyAB/darknet#how-to-train-to-detect-your-custom-objects](https://github.com/AlexeyAB/darknet#how-to-train-to-detect-your-custom-objects) This method is much simpler than the traditional Labelmg+VOCdevkit folder+python script method. But there are quite a few points to note: obj folder, obj.names, obj.data, train.txt should not be placed in his x64 directory (I guess his example is based on Windows, it is said that the windows darknet is in the x64 folder), directly into the darknet root directory of data and that's it. In addition, the obj folder stores images and .txt markup files (generated by Yolo_mark (AlexeyAB's own GUI software, which can be run under windows or linux environment). (if the amount of data is not very large). Then run in the darknet root directory. /darknet detector train data/obj.data yolo-obj.cfg yolov4.conv.137, put both the conv file and the cfg file in the darknet root directory. Other than that just follow the tutorial. In addition, I began to train when the computer always power off and restart, the reason is that the voltage is not enough, because my laptop has two power cables, 330V I did not plug, so the power supply is not enough, such as this situation to increase the power supply on the line (within the manufacturer's regulations). batch size set to 16 on it, 64 will explode the memory, unless your computer video memory is very large (I am the laptop version of the RTX 2080, for reference). After all the training is complete, find the final weights in the backup folder, put it into the root directory, and type in the command line: . /darknet detector test cfg/appleyolo.data yolo-obj.cfg apple_yolo_final.weights picture.jpg to start recognition. Note a few points: (very important) cfg file can no longer use the original yolov4-pre-trained that cfg, or recognition can not be identified. In addition, if you identify all the person, because coco.names in the index marked the first (0) is the person. to solve this problem, you need to change the config file (.data file, which contains the address of the .names file, in fact, according to the index (0,1,2,3,4,5 ...) names). In addition, you can not directly read the original obj.data, get obj.names, the path should be changed to an absolute path! In this case, we finished training our own YOLOv4.

ROS encountered a problem, two subscribers, only the first one was called up the second time, the second one seemed to be blocked and could not be called up. It is possible that it is a problem with queue_size. I'll look into it tomorrow. Today I did the fitting first.

The fit was unsuccessful in the end, it seems that this kind of non-planar capture is particularly difficult to fit (I may plan to use easy_handeye to redo the hand-eye calibration, but since it is a camera that knows the image, it may be more troublesome. (This as a final solution). I also encountered several problems, although the YOLO performance is much better, but there are often leaves blocking the fruit center of mass resulting in unsuccessful capture. There are two solutions, one is to redo the training of YOLO, so that YOLO only recognizes the exposed (not covered part) part of the fruit, so that it can capture a small part and also catch it. Another way is more problematic, which is to change the angle. It is to use YOLO to identify the incomplete fruit into two kinds (1. complete fruit. 2. incomplete fruit), first grab the complete fruit, if the rest of the fruit are incomplete, try to change the angle of the robot until the complete fruit is captured and then grabbed. There are several difficulties: one is not sure how to move in order to shoot the complete fruit (or the mechanism is very complicated). Another is that if the surrounding area is covered by leaves, then the robot arm will be in constant movement, not good control. There is also a hardware level problem, that is, the Aubo-i5 and Zhixiang camera is too big, when the capture, often touch the branches and leaves lead to the original position shifted.

I plan to take some more pictures to redo the yolo training and do another fitting.

The linear fit was not very successful, so it seems to be a hand-eye calibration problem. But the next fruit grabbing will be done on another robotic arm and RealSense camera. (No need to use aubo-i5 and know elephant) So next, we will test the calibration of RealSense and UR5 robotic arm first, and get familiar with the Easy_Handeye calibration process.

Start installation: Since we already have Aruco and EasyHandeye, we only need to install UR5 & UR_Modern_driver, Vision_visp/Visp_handeye_calibration this time. When you install Visp, you can't find the Visp package, in fact, not only should you have vision_visp in catkin/src, you should also install it via apt install: sudo apt-get install ros-melodic-vision-visp and it's OK. All such cases can be done via ros-rosversion-xxxxxx.

I accidentally used Linux Autoremove for the second time to delete a bunch of my associated packages, but fortunately there are big guys on the Internet who give solutions to easily restore all the deleted packages:

```
echo '#! /bin/bash' > restore
echo sudo apt-get install `grep Remove /var/log/apt/history.log | tail -1 | sed -e 's|Remove: ||g' -e 's|([^)]*)||g' -e 's|:[^ ]* ||g' -e 's|,||g'` >> restore
chmod +x restore 
. /restore
```

Note that you need to use git clone -b kinetic-devel [https://github.com/ros-industrial/ur_modern_driver.git](https://github.com/ros-industrial/ur_modern_driver.git) when installing ur_modern_driver
Here kinetic-devel is required and the kinetic version is available for Indigo, kinetic, melodic.
Regarding ur_modern_driver, this is actually the driver for the UR robot that is no longer used by deprecated (actually, it's version 2, three versions in total). About the first version of ur_driver, this is very early, now ur robots are not used. ur_modern_driver is used up to v1.8.x. The latest ur_robot_driver is used for v3.x and v5.x. Although I read that this ur5 is 3.4, there is also documentation that says 3.7+ is suitable for ur_robot_driver. In short, these three drivers are not clear in many places, so I'll restate them here. One more thing, if you use the first oldest ur_driver, you don't need to install it separately, it's already integrated in the universal_robot folder.
An improved version of the latest driver about a famuch is mentioned in the ur_robot_driver documentation. If you are installing the latest driver, you must remember to read the documentation. Although the documentation is also feeling very vague and unclear, but directly clone will definitely be wrong. (I tested it by myself)

Three command lines are required to run UR5 Rviz MoveIt.

```
roslaunch ur_modern_driver ur5_bringup.launch limited:=true robot_ip:=192.168.31.124
roslaunch ur5_moveit_config ur5_moveit_planning_execution.launch limited:=true
roslaunch ur5_moveit_config moveit_rviz.launch config:=true
```

Hand-eye calibration tread record:
0. handeye calibration launch: roslaunch easy_handeye eye_to_hand_calibration.launch
For details, please refer to: [https://zhuanlan.zhihu.com/p/92339362](https://zhuanlan.zhihu.com/p/92339362)
1. about rqt can not find plugin.xml but rqt_virtual_joystick has plugin.xml solution: careful observation of the error path will find that in fact is not the package rqt_virtual_joystick but rqt_virtual_joy, so the solution is to change the name, because So the solution is to change the name, because ubuntu does not support rename, so you can use mv "path/old_name" "path/new_name" to solve.
2. [https://blog.csdn.net/a2824256/article/details/113127740](https://blog.csdn.net/a2824256/article/details/113127740) rqt doesn't show menu so you can't open image view, open another window and use rosrun image_view image_view image:=/aruco_tracker/result tracker/result
3. [https://chev.me/arucogen](https://chev.me/arucogen) Print the Marker and make sure it is the size you specified before, for example 100mm or 10cm or 0.1m, because some printer functions will scale it.
4. robot_base_frame and end_effector_frame should be determined and then filled in the launch file.

Today I will delete the folder aubo_robot in catkin_ws/src to move it back if something goes wrong with aubo later. For now, it will be in Robotics/Others/Auboi5-Zhixiang-Rootiq. Update: I moved it back and recompiled it.

I was just checking this red error alone at first, but I couldn't find a solution online. Later, I really can not help but also try to find the yellow warning in front of the problem is to appear on the warning, it can be said that there is a warning necessarily lead to the latter error (in fact, the official should change the warning into the error red). The reason in: Joint "..." from the starting state is outside bounds... I suspect that it is some kind of security strategy considerations. But it causes the robot arm to skip the starting state, so of course the starting planning tree cannot be generated. The solution is very simple: when running the previous two commands, change limited to false, originally true, now: limited:=false. I don't know if there are any potential pitfalls in doing this, but it solves the problem for now. Later checked, it turns out that MoveIt and this option conflict, the specific details are as follows:

NOTE:
As MoveIt! seems to have difficulties with finding plans for the UR with full joint limits [-2pi, 2pi], there is a joint_limited version using joint limits restricted to [-pi,pi]. In order to use this joint limited version, simply use the launch file arguments 'limited'...

Today I mainly worked on hand-eye calibration and the BoundingBox center point release for Realsense cameras and YOLO and ROS adaptations. The hand-eye calibration was done easily with Easy_handeye, but it should be noted that if the camera can't find the Aruco marker point, you have to manually change the position of the robot arm with the trainer so that it can be successfully calibrated.

By reusing some code in the zhixiang_yolo_label written by Qiushu, we can get the image of yolo smoothly, but the problem is that the camera is uninterrupted to get the photo and publish it, and the subscribed node keeps receiving the photo and calling the function. The subscribed node keeps receiving photos and calling the function resulting in memory overflow once there is a for loop, because the for is not over and the next photo comes again plus the yolo analysis leads to memory overflow. So I had to make the Realsense camera and the previous camera click and take a picture and then publish a picture enough. But Realsense doesn't have this feature officially, and I can't do anything on the subscription node to achieve this effect. Because even the rate can't be adjusted. (Only for publisher node) So I came up with the idea of using a relay to accept Realsense photos, and publish them after raw_input(), so I can control the camera to publish one image at a time, and then I can subscribe to this node. But one problem I ran into in between was that the python global variables could not be assigned by the ROS subscription callback function, making it impossible to publish. It turned out that --- no wonder it was all python classes before, the only way to assign global variables within such classes was through python class's self. So changing the code to python's class and limiting each Publisher with raw_input in init worked. I also learned how to use Cv_bridge while going around the bend, no less.

If I go to the lab tomorrow, I'll continue to finish converting the coordinates of the center point of the picture box to world coordinates. It is estimated that the depth and the internal reference matrix will be used.

Actually, converting box center point 2D coordinates to world 3D coordinates is supported by Realsense's API. Focus on the function: rs2_deproject_pixel_to_point(). Note: 2D mapping (map) to 3D is Deprojection, mapping from 3D coordinates to 2D is Projection. this function has both python and c++ versions. Since python is easy to use and you don't have to write CMakeLists.txt, so I'll be lazy and use the python version. Note: This function requires the camera's intrinsic reference matrix, the 2D Pixel coordinates (that is, the center point), and depth.

This depth information and a lot of detours, the following are a few important pit.
1. The camera launch file should be rs_aligned_depth.launch, otherwise the depth map and RGB map size is not the same will lead to mapping trouble. This rs_aligned_depth.launch will automatically start the size of 480 * 640 stream (RGB and Depth)
2. The depth map of cv_bridge processing: (this passthrough is very important, do not change, is the format of data)

```
cv_image = self.bridge2.imgmsg_to_cv2(data, "passthrough")
np_image = np.array(cv_image, dtype=np.float32)
np_image = np_image / 1000        //because scale is in mm, so convert to meters
im = plt.imshow(np_image)
plt.show()
```

The camera internal reference matrix can be obtained by rostopic echo /camera/depth/camera_info, as it is also output without interruption and the internal reference matrix is constant. We don't need to copy and paste the internal reference matrix directly through the subscribe method, the result is as follows:

```
camera_intrinsics = rs.intrinsics()
camera_intrinsics.width = 640
camera_intrinsics.height = 480
camera_intrinsics.ppx = 323.193115234375
camera_intrinsics.ppy = 239.38677978515625
camera_intrinsics.fx = 387.6018981933594
camera_intrinsics.fy = 387.6018981933594
camera_intrinsics.model = rs.distortion.none
camera_intrinsics.coeffs = [0.0, 0.0, 0.0, 0.0, 0.0]

point3d = rs.rs2_deproject_pixel_to_point(camera_intrinsics, [this_center2d_x, this_center2d_y], this_center_depth)
```
Note: The official API of realsense is called here: rs2_deproject_pixel_to_point, which passes in the internal matrix, center point (in the form of array [x,y]), and depth in turn, and it will give you x,y,z automatically. As for the need to do conversion, then see the official documentation. Here is a reference to write the method of:

[https://medium.com/@yasuhirachiba/converting-2d-image-coordinates-to-3d-coordinates-using-ros-intel-realsense-d435-kinect-88621e8e733a](https://medium.com/@yasuhirachiba/converting-2d-image-coordinates-to-3d-coordinates-using-ros-intel-realsense-d435-kinect-88621e8e733a)

Also here rs is import pyrealsense2 as rs.

UR5+Realsense a hand-eye calibration error! First, where to calibrate to is determined by what the parent node of camera_frame is. (This can be done by connecting the robot arm to Rviz by clicking on the Frame under TF in the upper left corner to see who the parent is.) It is not tool0_controller, but tool0, another big mistake, I should say a bigger mistake is that the base coordinate system is base_link instead of base. is wrong, not to mention the accuracy. It needs to be recalibrated.

The results of the handeye calibration are saved under ~/.ros/easy_handeye.

The handeye calibration keeps failing, I don't know what the cause of the problem is. I'll talk about it later, but first I'll use the previous calibration results, which work fine.

Since Moveit is basically universal, the only problem is that the jaws are no longer Robotiq, but a home-made one controlled by level, which is said to use TCP communication. But fortunately there is an API (control_ur.cpp) for the long screen computer location: home/ros2_ur5_ws/src/ros2_grasp_library/grasp_utils/robot_interface/src/control_ur.cpp. Since the previous moveit was written via python. So I need to do something to prepare python to call the c++ functions. Because control_ur.cpp has functions to control the jaws (open and close).

It took almost a day to solve this jaw control after numerous detours. In fact, it is particularly simple, but I still intend to talk about the whole process. In fact, at the beginning, Dr.Li mentioned that the jaws were connected via TCP. But I thought it would be fine to call the API written by some senior at that time. The point is that the control of the jaw is controlled by the ModBus, or digital output, of the UR robot arm. And this output is only True or False, true when off, false when on. And I have been thinking about rt_commander_->setDigitalOut(0,true); here rt_commander, so I ported some programs, of course it is not running, because many programs are running in ROS2 environment, to do a good porting is very laborious. In addition, even if I succeeded in calling these functions, it would be extremely difficult. Here I will not mention the whole process of exploring the UR driver, which can be said to have wasted a huge amount of time. This time the savior came, is URScript, this must be remembered! Modbus and other functions of the UR is on it. In fact, URScript is a piece of code (the code language called URScript, in fact, the main function are some functions) + carriage return to the operating system of the robot arm to let it go to the execution of this code. But how to pass it? Many places do not speak clearly. A total of two ways: 1. through the ROS publish to /ur_driver/URScript this topic for the ROS to pass. There is another way is TCP, pass this code through the socket. The first method, in CB3 + ur_modern_driver on the pro test does not work, it is said that the driver is too old to match the CB3 hardware reasons. Python implementation, the code is very simple (C++ is also perfectly fine, in fact I think any mainstream language is fine, as long as it supports socket programming), as follows:

```
import socket
PORT = 30002  
HOST = #IP OF YOUR UR Robot, here is 192.168.31.124
def close_gripper():
    s = socket.socket()
    s.connect((HOST, PORT))
    command = 'set_digital_out(0, True)\n' # here, the focus is this function set_digital_out(), 0 represents pin pin 0 place set to True, in fact, is through the binary 0 and 1 operation gripper open and close chant, in addition to the last \n is very important, but we can also see that the delivery of this code is really very "primitive".
    s.send(command)
    received_data = s.recv(1024)
    s.close()
if __name__ == '__main__':
    close_gripper()
```

URScript has many more functions and so on: see [https://s3-eu-west-1.amazonaws.com/ur-support-site/32554/scriptManual-3.5.4.pdf](https://s3-eu-west-1.amazonaws.com/ur-support-site/32554/scriptManual-3.5.4.pdf) for specific documentation, I also plan to download a copy to avoid the site one day can not open.

Today's progress is very little, but found that moveit can not correctly take the rotation vector Rotation Vector Rx,Ry,Rz. So the subsequent use of URScript to take:

```
host_port = ("192.168.31.124", 30003)
dataSocket = socket.socket()
dataSocket.connect(host_port)
data = bytes(dataSocket.recv(1060))
x, y, z = struct.unpack('!ddd', data[444:468])
rx, ry, rz = struct.unpack('!ddd', data[468:492])
```

Note that here rx,ry,rz are taken differently from the result on the demonstrator, but they represent the same bit pose. It can be converted into quaternions or rotation matrices to know that it is the same.
Then use the Scipy package scipy.spatial.transform import Rotation as R, convert to quaternion, and then use the method of converting quaternion to rotation matrix that I found before to convert to rotation matrix. But although the problem was solved, there was still a problem with the final capture position. I will continue to study it tomorrow.

Template Matching Grasping:
For time reasons, I paused my research on UR5 and Realsense. I switched to Template Matching Grasping on Aubo-i5 and Zhixiang Camera. The grasping was done on Aubo-i5 and Zhixiang Camera, and it went smoothly with OpenCV's own library algorithm for template matching and a small GUI using OpenCV's mouse events. The next step is to capture more kinds of objects and test them. Then port it to Raspberry Pi. There is also the comparison of parameters and matching effects of 6 different template matches. One note.
The images converted by OpenCV Bridge are BGR, so if you find that the images are distorted in color, convert them to RGB:

The first method:

```
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
```

Second method:

```
b,g,r = cv2.split(image)
rgb_image = cv2.merge([r, g, b])
```

For the boundingbox conversion of the image camera, refer to the following:

```
for i in range(0, number_of_objects):
    starting_index = 4*i
    bounding_boxes[starting_index] = int(top_left_x + 25) #1
    bounding_boxes[starting_index + 1] = int(top_left_y - 4) #2
    bounding_boxes[starting_index + 2] = int(width + 10) #3
    bounding_boxes[starting_index + 3] = int(height + 10) #4
if bounding_boxes[starting_index + 1] < 0:
    bounding_boxes[starting_index + 1] = 0
bounding_boxes[4*num_boxes] = 640 #width of zhixiang camera image
bounding_boxes[4*num_boxes+1] = 400 #height of zhixiang camera image
```

Today I officially started to write the paper. I ran into a problem: Something's wrong--perhaps a missing \item.\end{thebibliography}. But: there is no problem in tex, and no problem in bib. Solution: Close the tex file, delete the .bbl file, and recompile. Note that if you want to use bibtex, the compilation order is: pdflatex->biblatex->pdflatex->pdflatex->viewpdf. this can be configured in the options texmaker's quick build option to select the second.

Found a problem, that is, I do not know how to control the Aubo's joint6 movement through Moveit, while moving the robot arm to 3D coordinates at once. The current plan is to do it in two steps. First change the GPD, then move it.

Today look rs2_deproject_pixel_to_point found before realsense and ur5 bug, may be distortion problem. If you have more time to look at distortion. currently is none, but it is possible that there is distortion.

Before there has been a bug that caused the addition of GPD after the capture is not accurate. It was later found that there was a problem with getting the quaternion and bit pose after GPD first. Then bringing this into the calculation would lead to inaccuracy later. So the current solution is not to rotate joint6, but to move it to the x,y,0.2 position first, 0.2 is the z-axis, which is equivalent to being directly above the grasped object. Then move the GPD, and finally change only the z-axis to trans_z, without moving x and y.

The porting of the capture program to the Raspberry Pi was not successful, because the Raspberry Pi is an ARM architecture, and it seems that the compilation architecture of Aubo_driver caused the problem of not being able to catkin_make properly.

LaTeX sometimes no error but can not compile bibtex is required to delete the local .aux file.
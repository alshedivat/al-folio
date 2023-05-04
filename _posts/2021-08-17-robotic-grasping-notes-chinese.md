---
layout: post
title: "机械臂抓取 - 复旦大学机器人实验室笔记 (中文版)"
date: 2021-08-16 00:00:00-0400
---

&copy; **2021 Zheyuan Zhang**

**如果你喜欢这个笔记，请** [点击此处](https://github.com/cozheyuanzhangde) **关注我的GitHub!**

> 欢迎阅读这篇笔记，我真心希望它能帮助到你。这篇笔记是我在机器人实验室里做机械臂抓取时记录的。它不仅包含了机械臂抓取相关的知识，还包括计算机视觉、Linux、LaTeX和其他问题的笔记。由于我没有查错和整理，原稿可能会有一些错误，所以建议各位把这篇笔记作为参考，但对于不确定的部分需要再研究。如果能告诉我错误的位置，我会修正它们。谢谢。

> 在开始的两周中，我主要参考了学长写的[水果抓取-Workshop](https://shimo.im/docs/6QWDWTpcQCYVrKDQ/read)。这个笔记流程上比较完整和清晰，建议先看这个笔记，然后再阅读我的笔记。

安装历程：Ubuntu18.04 -> ROS -> Nvidia Driver, Cuda, cuDNN... -> ZED SDK -> Darknet/YOLO -> ...

重要：如果安装linux后无法正常进入系统出现initramf啥的类似于命令行的东西，网上的教程都会教修复文件系统。以前我在安装kali linux虚拟机的时候通过这个办法正常进入系统了。但这次双系统的安装似乎不是这个问题。弄了半天最后发现是需要改BIOS设置，一个是把SATA从Raid On改成AHCI，这个是最重要的，另外把secure boot去掉，不要安全启动。这样就可以正常进入双系统了。不过不清楚会不会有什么隐患，没有仔细调查过。

关于环境变量，如果安装的软件不在local/bin或linux默认的安装位置，软件是无法通过命令行打开的。此时我们需要添加环境变量。进入home路径，右上角的三条横线点一下，打开Show Hidden Files，然后点击.profile，复制粘贴那个if，then到fi的语句，将$HOME/.local/bin换成你要添加的bin目录，比如/home/brian/matlab/bin。然后保存退出，CTRL+ALT+DELETE 退出登录(Log Out)，让linux重新加载这个.profile文件即可通过命令行打开matlab，不需要每次cd到matlab bin目录再打开了。

ROS Melodic安装， 可以参考[https://blog.csdn.net/qq_41450811/article/details/99079041](https://blog.csdn.net/qq_41450811/article/details/99079041)

ROS自动安装所有依赖: rosdep install --from-paths src --ignore-src -r -y
如果catkin_make过快没有编译，删除devel文件夹，重新catkin_make。

ROS安装文件里的host不一定要用一个固定的IP地址，可以用localhost

由于编译Darknet需要Cuda等所以先把这些装好。

编译Darknet之前要改Makefile!!! 具体可以看秋澍学长的PPT
Darknet使用make编译完成后只能在当前文件夹下才可以调用./darknet（未设置环境变量前）
再联系ROS前需要git clone zed-ros-wrapper才能继续
有些时候会出现invoke make failure，往往是因为clone时没有加--recursive导致文件缺失

AUBO机械臂控制碰到的几个问题
1. Boost库需降级到1.68，因为1.69及之后的版本把signal移除，变成signal2了。改代码麻烦所以直接降级Boost库。
2. 安装aubo环境用学长提供的网盘里的那个安装，不然会出驱动上的问题（Melodic版本）。
3. 通过wifi控制连接的时候碰到一个问题， 就是说control timeout，take too long to execute，这个问题无法用取消时间限制解决。必须解决所有的红色ERROR。其中一个ERROR说找不到trajectory_speed库，解决方法可以将这个库在目录下找到，复制到/usr/lib/python2.7/dist-packages，如果默认Python为3.x或其他的，一样的操作。

Darknet yolo编译的时候可能会碰到couldn't open file data/coco.names，解决办法是把darknet/cfg/coco.data中的路径替换成/home/brian(username)/darknet/data/coco.names。

点云处理很难，因为相机从上至下扫描一次不能将物体的全貌拍出来，所以要通过多角度拍摄将完整的3D模型建出来然后再分割找质心，但是难度比较大。此方法暂时弃用。

秋澍学长写的知象yolo的软件有几个注意点，一个是：要把cqsfdu更改为自己的路径。
另一个是：三个文件都要运行：1. pcdrgb_publisher, 2. pcdrgb_yolo_publisher, 3. zhixiang_label_detector
还有一个是：每次抓取前，都需要在pcdrgb_publisher里拍一次照，不是实时的！不然捕捉不到callback的信号。

整个demo中难的部分是手眼标定，坐标转换(TF)。由于机器人中有多个坐标系，摄像头所识别到的物体的坐标不是相对于基坐标的。所以至少需要两次转换，第一次转换是手眼转换，通过手眼标定的矩阵，加工？之后变成旋转矩阵。这样就可以把眼的坐标转换成手的坐标(handeye_matrix)。但是还不够，还需要把手的坐标转换成基坐标，机器人才能够完成抓取。这就需要通过看Flange（法轮盘），把Rx,Ry,Rz（欧拉角）转换成旋转矩阵（注意这个可以通过MatLab完成，但是最好是用学长发给的步骤往下做，用MatLab自带的angle2dcm可能会产生一个转置的矩阵，当然也可以自己把它转置回去，不过还是得手动算一下确保是对的。），此时旋转矩阵是3x3的，我们需要转换成4x4的，所以最右一列从上至下是法伦盘的x,y,z，最下面一行是0，0，0，1，这样就完成了handbase_matrix。另外深度相机所识别到的坐标也要加点东西，假设这个坐标是(x,y,z)，那position_matrix 就是[x, y, z, 1]的转置。然后怎么得到transformed_matrix也就是相对于基坐标的坐标呢？只需要先算一个transforming_matrix = handbase_matrix * handeye_matrix。然后transformed_matrix = transforming_matrix * position_matrix。这样trans_x,trans_y, trans_z = position_matrix[0], position_matrix[1], position_matrix[2]。实际机械手抓取的过程中会有误差，因为上面的矩阵算法会有约小数导致的信息损失的问题，一种解决办法是通过直接读取机械臂的动态Flange值，动态算矩阵。还有一种鲁棒性较差的方案是自己根据一个位置的误差，加加减减trans_x,y,z。我是用的这种临时的办法，因为读取机械臂的参数有点麻烦。另外还有一个很重要的是要算四元数，四元数可以通过Matlab的dcm2quat，将旋转矩阵转换成四元数。当然如果是动态获取也可以通过Python的库完成，不过有可能会出现提示输入矩阵不是othogonal matrix的情况，这种情况需要手动调节库里的允许范围才能解决。有一个注意点：不要弄错顺序，算出来的四元数顺序是[w,x,y,z]，千万不要弄错，不然都不知道问题出在哪了。网上很多转换的公式都是错的，切记！！！这样我们就把整个坐标转换以及机械手位姿的转换给解决了。

还有一个robot_tf_setup里的tf_broadcaster.cpp里的第一个broadcaster是手眼标定的东西，因为上面已经有了，所以这里填写0,0,0,1和0,0,0就行了。但下面的要改成0,0,0,1和0,0,0.502。这个可以通过 tf monitor，tf echo在打开机械臂的Rviz程序之后直接看到。
不过这个部分我自己也不知道是不是必须要填，我的直觉是这个部分不需要，到时候可以测试一下到底需不需要。

机器人当前的位姿可以通过ROS获取，不需要调用机械臂的API：
[https://blog.csdn.net/qq_39201531/article/details/108166673](https://blog.csdn.net/qq_39201531/article/details/108166673)

通过四元数计算旋转矩阵，可以用下面这个方法，来自于[https://automaticaddison.com/how-to-convert-a-quaternion-to-a-rotation-matrix](https://automaticaddison.com/how-to-convert-a-quaternion-to-a-rotation-matrix)，用Python的库的结果会有问题（好像也不是转置的问题）：

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

知象的手眼标定的软件，初始的设置很容易导致曝光过度没法标定。解决方法是通过使用3DViewer里的深度相机的阀值，提高阀值即可解决问题。

最后的demo一共有8个窗口，可以考虑写一个shell script自动打开窗口并运行。

标定的结果很难是准确的，所以需要做误差拟合补偿。用Matlab的CFTools。得确定一组x和一组y。
通过yolo算出来trans_x，trans_y和trans_z。
然后机械臂会移动到这个位置。但实际位置会不一样。
所以X是trans(trans_x,y,z)，Y是实际位置(actual_x,y,z)。这样就会有三组函数，带入进去即可精准抓取。
每次抓取之前得确保yolo publish了一个非000的坐标。这次因为曝光过度导致点云生成不正确，每次都发布000的坐标。一直没看出来所以浪费了很久的时间。

一些可供参考的链接：
[https://blog.csdn.net/qq_39201531/article/details/108166673](https://blog.csdn.net/qq_39201531/article/details/108166673)

[https://answers.ros.org/question/299287/bimanual-pick-and-place](https://answers.ros.org/question/299287/bimanual-pick-and-place)

[https://blog.csdn.net/Kalenee/article/details/80818658](https://blog.csdn.net/Kalenee/article/details/80818658)

[https://blog.csdn.net/u014205023/article/details/108766994](https://blog.csdn.net/u014205023/article/details/108766994)

[https://blog.csdn.net/shenxiaolu1984/article/details/50639298](https://blog.csdn.net/shenxiaolu1984/article/details/50639298)

回顾：

ROS：列出正在运行的节点：
rosnode list
列出正在运行的话题：
rostopic list
打印话题内容（有些话题需要再次唤起才能显示）：
rostopic echo "topic name"
查看话题类型等信息
rostopic info "topic name"

大错误：

我曾经一直以为之所以没法抓取重叠物体是因为点云算质心的时候把两个苹果或多个重叠物体算成一个整体了。但实际上这是不可能的。因为3D-RGB-D相机从上至下拍摄只能拍到水果的一个表面，也就说根本不存在之前所说的问题。那么问题在哪里呢？我做了以下实验：1. 尝试抓取一个水果，并记录相机点云质心的位置和最后实际要到达的位置，最后抓取成功。2. 尝试抓取重叠的两个水果（两个一样的苹果，跟上面的一样），并记录相机点云质心的位置和最后实际要到达的位置， 但在实际抓取之前，把两个水果挪开，因为我想看到它到底会移动到哪里。结果两次最后到达的位置是一样的！然后我看了相机点云的质心的位置，z轴却相差0.07，这刚好是一个苹果的高度。之后发现是乘了两次旋转矩阵之后导致z轴原本很大的区别变成0.0001级别的很小区别。至于为什么，有可能是手眼标定的结果不准等等原因但我也不知道为什么x，y是准确的就只有z轴有问题。于是我打算直接用原始的点云质心位置来计算最后的位置， 即不乘以旋转矩阵。因为我们是固定位置抓取，也没有实时的物体位置检测。所以用这种粗暴的方法是可以的。但是又碰到一个新的问题，即两个苹果的抓取高度比一个苹果的抓取高度还要低，这肯定是有问题的。所以解决方法就是取负值+某一个定值。由于我观察到一个苹果实际的抓取位置是0.0左右，所以我只要加0.414将-0.414（一个苹果的z轴取负值），那-0.34（两个苹果的z轴取负值）加0.414就是0.07左右，刚好是两个苹果的抓取位置。另外，我可以到一个放桶的位置记录机械臂的每个关节的值，让机械臂抓取水果之后把水果丢到桶中。

其实已经做完了这个重叠抓取的项目。但是李博让我做一个更加泛化的基于2D RGB图像分析的版本。也就是说不通过YOLO神经网络和点云分割。单纯通过2D图像判断圆形方形，大小等然后通过深度相机的深度信息实现抓取。这相当于是推翻了之前的视觉模块。所以视觉这块要重新做了：

第一步：
我的想法是先实现一个可以识别完整圆的算法。但OpenCV上的hough circle transform会自动补全一些非完整圆，而内部实现的很多也没法调整。所以目前考虑手写一个识别圆的算法。

重要记录：
如果以后再运行之前的抓取程序有问题，可能是我今天改了zhixiang_yolo_pcd.cpp导致的因为make -j8 -l8 failed所以我看了下之前有两个地方莫名其妙多出来两个像注释一样的东西但又没有加注释符号导致编译失败。不过也有可能是我误删了某个东西。要是以后出现问题，问学长再要一份zhixiang_yolo_pcd.cpp。

通过Hough Circle Transform 和 Edge 在圆中的比例可以算出是否是一个完整的圆，比如比例在30-50%就可以过滤掉大部分的非完整圆。然后再通过深度判断，每次只要抓最高的就行了，也就是z值最大的。目前已经实现了对圆心和圆半径在RGB图像上的提取。但是最大的难点又变成如何将RGB的x，y映射到点云或者说世界坐标的x,y,z。目前还是卡在这里。主要的问题是BoundingBox。理论上来说，boundingbox是通过yolo处理2D图像获取到的，所以应该原理和我这里获取圆之后的圆心半径差不多。总之现在我需要把圆变成boundingbox然后用之前就有的代码完成这个任务。

通过改写基于yolo的分割点云近似取到目标物体上方的坐标的程序 zhixiang_yolo_pcd.cpp（因为我发现yolo也只是处理2D图像并分割，所以原理是一样的。我只不过需要把圆转换成矩形的BoundingBox），基于2D图像OpenCV分析，不依赖YOLO的抓取任务已经完成了。不过我发现在处理复杂堆叠环境下, 基于OpenCV的版本效果比较差。目前还在探究问题到底出现在哪里了。另外在更复杂的抓取挂树物体上就更加行不通了，整张图全是圆圈。看来挂树物体抓取只能用yolo了。

今天下午，我尝试了改写之前的抓取代码来完成挂树物体的抓取。结果还算成功，虽然精准性需要通过进一步的误差拟合来提高，另外多目标抓取还没有完成。主要改的就是增加一个listener(subscriber)来监听yolo的物体名称输出。然后定位到苹果的坐标实现抓取。由于这下有两个listener而他们不能同时运行，我就让监听yolo物体名称的bound_name先进行，因为很快就结束了，然后再让监听center_median的listener后开始，因为这个是主程序，需要按相机等待，非常慢。

今天，由于原来的YOLO在识别假苹果的时候效果很差，我就打算自己训练YOLO。一路上又是各种问题。如何训练，首先我们得先拍摄至少20张各种角度各种情况（堆叠，遮挡）的苹果照片（其实正常情况下要500-2000张，我先偷个懒。）完整的教程在[https://github.com/AlexeyAB/darknet#how-to-train-to-detect-your-custom-objects](https://github.com/AlexeyAB/darknet#how-to-train-to-detect-your-custom-objects) 这个方法比传统的Labelmg+VOCdevkit文件夹+python脚本的方法简单的多。不过有不少个要注意的点：obj文件夹,obj.names,obj.data,train.txt不要放到他那个x64的目录下（估计他那个例子是基于Windows的，据说windows的darknet是在x64文件夹下的），直接放到darknet根目录的data里即可。另外obj文件夹里存放图片和.txt的标注文件（通过Yolo_mark(AlexeyAB自己做的GUI软件，可在windows或linux环境下运行)生成的.txt位置标注文本文档）另外obj.data里的train和valid都可以用同一组数据（如果数据量不是很大的话）。然后在darknet根目录下运行./darknet detector train data/obj.data yolo-obj.cfg yolov4.conv.137，把conv文件和cfg文件都放在darknet根目录下即可。其他只要遵循教程就可以了。另外我一开始在训练的时候电脑老是断电重启，原因是电压不够，因为我的笔记本电脑有两根电源线，330V的我没插，所以供电不足，如出现这个情况把供电增加就行了（厂家规定范围内）。batch size设成16就可以了，64会爆内存，除非你电脑显存很大（我是笔记本版的RTX 2080，供参考）。全部训练完成之后在backup文件夹中找到final的weights，把它放进根目录下，命令行输入：./darknet detector test cfg/appleyolo.data yolo-obj.cfg apple_yolo_final.weights picture.jpg即可开始识别。注意几点：（很重要）cfg文件不能再用原本yolov4-pre-trained那个cfg了，不然识别不出的。另外如果识别出全是person，是因为coco.names里的索引标注的第一个(0)就是person。要解决这个问题，需要改config文件(就是.data文件，里面包含了.names文件的地址，实际上是根据索引(0,1,2,3,4,5...)判断的)。另外不能直接读取原本的obj.data，获取obj.names，路径要改成绝对路径！这样的话，我们就训练完成了自己的YOLOv4。

ROS碰到一个问题，两个subscriber，第二次唤起的时候只有第一个被唤起，第二个像是被阻塞了无法被唤起。有可能是queue_size的问题。明天调查一下。今天先做拟合。

拟合最后是不成功的，似乎这种非平面的抓取特别难以拟合（可能打算用easy_handeye重新做手眼标定，不过由于是知象的相机，可能会比较麻烦。这个作为最后的方案）。另外还碰到几个问题，虽然YOLO表现的好多了，但是经常有树叶挡住水果质心的情况导致抓取不成功。目前有两种解决方案，一种是重新做yolo的训练，让yolo只把露出（不被遮盖的部分）的水果部分进行识别，这样就可以抓一小部分，也能抓起来。还有一种办法比较麻烦，就是改变角度。就是用YOLO将不完整的水果识别出来，分成两种（1.完整的水果。2.不完整的水果），先抓完整的水果，如果剩下的水果都是不完整的，尝试改变机械手的角度，直到拍摄到完整的水果再进行抓取。难度有几个：一个是不知道怎么移动才能拍到完整的水果（或者说机制非常复杂）。另一个如果四周都被叶子遮挡，那就会让机械臂处于不断的移动当中，不好控制。还有一个硬件层面的问题，就是Aubo-i5和知象相机太大了，进行抓取的时候，经常会碰到枝叶导致原本的位置发生了偏移。

我打算接下来再拍一些图片重新做一次yolo的训练，另外再做一次拟合。

线性拟合不太成功，看来确实是手眼标定的问题。不过接下来的水果抓取会在另一台机械臂和RealSense相机上进行。（不用aubo-i5和知象了）所以接下来先试验一下RealSense和UR5机械臂的标定，熟悉一下Easy_Handeye的标定流程。

开始安装：由于之前已经有Aruco和EasyHandeye了，这次只需要安装UR5&UR_Modern_driver，Vision_visp/Visp_handeye_calibration就可以了。安装Visp的时候出现找不到Visp的包，其实不仅catkin/src里要有vision_visp，也要通过apt install安装：sudo apt-get install ros-melodic-vision-visp就OK了。这样的情况都可以通过ros-rosversion-xxxxxx。

一不小心使用了Linux的Autoremove第二次把我一堆关联的包全给删了，还好网上有大佬给出解决方案，可以很轻松把删掉的包全部恢复：

```
echo '#!/bin/bash' > restore
echo sudo apt-get install `grep Remove /var/log/apt/history.log | tail -1 | sed -e 's|Remove: ||g' -e 's|([^)]*)||g' -e 's|:[^ ]* ||g' -e 's|,||g'` >> restore
chmod +x restore 
./restore
```

注意，安装ur_modern_driver的时候需要用git clone -b kinetic-devel [https://github.com/ros-industrial/ur_modern_driver.git](https://github.com/ros-industrial/ur_modern_driver.git)
这里的kinetic-devel是必要的，并且kinetic版本可用于Indigo, kinetic, melodic。
关于ur_modern_driver，其实这是deprecated不再使用的UR机器人的驱动（其实是第二版，一共三版）。关于第一版ur_driver，这个是很早期的，现在的ur机器人都不用。ur_modern_driver是用于up to v1.8.x。最新的ur_robot_driver是用于v3.x和v5.x。虽然我看了这台ur5是3.4，但是也有文档说3.7+适合用ur_robot_driver。所以我还是采用了弃用版本ur_modern_driver。总之这三个驱动很多地方都说不清楚，在这里重新说一下。另外有一点，如果是用第一个最老的ur_driver，是不需要单独安装的，已经集成在universal_robot文件夹下了。
关于一个famuch的最新驱动改良版是在ur_robot_driver文档中提到。如果是安装最新的驱动，一定要记得看文档。虽然文档也是感觉非常模糊和不清楚，但直接clone一定会出错。（亲测）

运行UR5 Rviz MoveIt需要三个命令行：

```
roslaunch ur_modern_driver ur5_bringup.launch limited:=true robot_ip:=192.168.31.124
roslaunch ur5_moveit_config ur5_moveit_planning_execution.launch limited:=true
roslaunch ur5_moveit_config moveit_rviz.launch config:=true
```

手眼标定踩坑记录：
0. 手眼标定启动：roslaunch easy_handeye eye_to_hand_calibration.launch
具体可参考: [https://zhuanlan.zhihu.com/p/92339362](https://zhuanlan.zhihu.com/p/92339362)
1. 关于rqt找不到plugin.xml但rqt_virtual_joystick中有plugin.xml的解决办法：仔细观察报错路径会发现其实不是包中的rqt_virtual_joystick而是rqt_virtual_joy，所以解决办法就是变更名称，由于ubuntu不支持rename，所以可以用mv "path/old_name" "path/new_name"解决。
2. [https://blog.csdn.net/a2824256/article/details/113127740](https://blog.csdn.net/a2824256/article/details/113127740) rqt没有显示菜单所以打不开image view，另开一个窗口使用rosrun image_view image_view image:=/aruco_tracker/result
3. [https://chev.me/arucogen](https://chev.me/arucogen) 打印Marker一定要确定其大小为之前指定的大小，比如100mm即10cm或0.1m，因为有一些打印机功能会将其缩放。Marker ID也需要记录。
4. robot_base_frame和end_effector_frame要确定然后填入launch file。

今天我会在catkin_ws/src里删去aubo_robot这个文件夹，如果日后aubo出问题，要把它挪回来。暂时先放在Robotics/Others/Auboi5-Zhixiang-Robotiq里。更新：我又挪回来重新编译了。

重要重要重要：忙活了一个下午加一个晚上一直没吃饭就是因为当我想plan&execute的时候总是报错：Motion planning start tree could not be initialized。我一开始只是单独查这个红色的报错，网上怎么找都找不到解决方案。后来实在没办法也尝试了下找前面的黄色warning，发现问题就是出现在warning上，可以说有一个warning必然导致后面的error(其实官方应该把这个warning改成error红色的)。原因在：Joint "..." from the starting state is outside bounds...我怀疑是某种安全策略上的考量。但是导致了机械臂skip了starting state，那当然无法生成开始的规划树了。解决方法是很简单：运行之前那两个命令的时候，把limited改成false，原本是true，现在是: limited:=false。我不知道这样做有没有潜在的隐患，但是暂时可以解决问题。后来查了一下，原来是MoveIt和这个选项冲突，具体细节如下：

NOTE:
As MoveIt! seems to have difficulties with finding plans for the UR with full joint limits [-2pi, 2pi], there is a joint_limited version using joint limits restricted to [-pi,pi]. In order to use this joint limited version, simply use the launch file arguments 'limited'...

今天主要是搞了手眼标定和Realsense相机和YOLO以及ROS适配的BoundingBox中心点发布。手眼标定通过Easy_handeye很简单就搞定了，需要注意的是：如果碰到了相机找不到Aruco标志点，就要手动用示教器改变机械臂的位置，这样才能成功标定。

难的地方在Realsense相机和YOLO以及ROS适配的BoundingBox中心点发布，通过复用zhixiang_yolo_label里的一些代码，可以顺利获取到yolo的图像但问题在于相机是不间断获取照片并发布的，那订阅的节点不停的接收照片并调用函数导致一旦有for循环就会内存溢出，因为for还没结束下一个照片又来了加上yolo的分析导致内存溢出。所以我必须得让Realsense相机和以前的知象相机一样按一下拍一下然后发布一张图片足以。但是Realsense官方没有这个功能，而我也不能在订阅节点上做文章来达成这个效果。因为连rate都不能调整。（只适用于发布者节点）所以我想到的办法是用一个中转站接受Realsense的照片，发布的时候需要先经过raw_input()，这样我就能控制相机每次只发布一张图片，然后我再订阅这个节点即可。但是之间碰到一个问题就是python的全局变量无法被ROS的订阅回调函数所赋值，导致无法发布。结果发现---怪不得之前都是python的class，只有通过python的class的self.这种class内的全局变量才能够赋值。所以将代码改成python的class，并在__init__里用raw_input限制每次Publisher就成功了。绕弯子的时候还顺便学习了下Cv_bridge的使用，不亏了。

明天如果去实验室，继续完成图片box中心点的坐标转换到世界坐标的事。估计会用到深度以及内参矩阵。

其实转换box中心点2D坐标到世界3D坐标有Realsense的API支持。重点看一下：rs2_deproject_pixel_to_point()这个函数。注意：2D映射（map）到3D是Deprojection，从3D坐标映射到2D是Projection。这个函数有python和c++两个版本。由于python用起来方便，并且不用写CMakeLists.txt，所以就偷个懒用python的版本。注意：这个函数需要相机的intrinsic内参矩阵，2D的Pixel坐标（就是那个中心点），还有depth。Pixel坐标已经有了，所以接下来的任务就是取到内参矩阵和深度信息。

这个深度信息又绕了很多弯子，下面说几个重要的坑：
1. 相机启动文件要用rs_aligned_depth.launch，不然深度图和RGB图大小不一样会导致映射比较麻烦。这个rs_aligned_depth.launch会自动启动大小都为480*640的stream（RGB和Depth）
2. 深度图的cv_bridge处理：(这个passthrough很重要，不要改，是data的格式)

```
cv_image = self.bridge2.imgmsg_to_cv2(data, "passthrough")
np_image = np.array(cv_image, dtype=np.float32)
np_image = np_image / 1000     //因为scale是mm为单位的，所以要转换成米为单位
im = plt.imshow(np_image)
plt.show()
```

相机内参矩阵获取用rostopic echo /camera/depth/camera_info即可，由于也是不间断输出的并且其中的内参矩阵是不变的。我们不用通过subscribe的方法直接复制粘贴这个内参矩阵就行了，结果如下：

```
camera_intrinsics = rs.intrinsics()
camera_intrinsics.width = 640
camera_intrinsics.height = 480
camera_intrinsics.ppx = 323.193115234375
camera_intrinsics.ppy = 239.38677978515625
camera_intrinsics.fx = 387.6018981933594
camera_intrinsics.fy = 387.6018981933594
camera_intrinsics.model  = rs.distortion.none
camera_intrinsics.coeffs = [0.0, 0.0, 0.0, 0.0, 0.0]

point3d = rs.rs2_deproject_pixel_to_point(camera_intrinsics, [this_center2d_x, this_center2d_y], this_center_depth)
```

注意：这里调用了realsense的官方API：rs2_deproject_pixel_to_point，里面依次传入内参矩阵，中心点（用数组[x,y]的形式），深度即可，它会自动给你x,y,z的。至于还需不需要做转换，到时候再看官方文档。这里的写法参考了：

[https://medium.com/@yasuhirachiba/converting-2d-image-coordinates-to-3d-coordinates-using-ros-intel-realsense-d435-kinect-88621e8e733a](https://medium.com/@yasuhirachiba/converting-2d-image-coordinates-to-3d-coordinates-using-ros-intel-realsense-d435-kinect-88621e8e733a)

另外这里的rs是 import pyrealsense2 as rs。

UR5+Realsense一个手眼标定的错误！首先，标定到哪是由camera_frame的parent节点是什么决定的。（这个可以通过连接机械臂到Rviz通过左上角TF下的Frame依次点看查看parent是谁）不是tool0_controller，而是tool0，另一个很大的错误，应该说更大的错误在于基坐标系是base_link而不是base。这个直接导致了整个标定矩阵方向都是错的，更不用说精确度了。需要重新标定。

手眼标定的结果会保存在~/.ros/easy_handeye下。

手眼标定一直失败，不知道问题原因在哪里。以后再说吧，先用之前的标定结果，效果还可以。

由于Moveit基本上是通用的，唯一的麻烦在于夹爪不再是Robotiq而是之前学长们自制的通过电平控制的据说是用TCP通信的。不过还好有API（control_ur.cpp）长屏电脑位置：home/ros2_ur5_ws/src/ros2_grasp_library/grasp_utils/robot_interface/src/control_ur.cpp。由于之前的moveit是通过python写的。所以我需要做一些准备让python调用c++的函数。因为control_ur.cpp里有控制夹爪开关的函数（open和close）。

绕了无数个弯子，差不多花了一天才解决了这个夹爪控制。其实特别简单，但是我还是打算把整个过程说一下。其实一开始的时候，李博就提到这个夹爪是通过TCP连接的。但是我当时以为还是通过调用某个学长写好的API就可以了。但其实，确实是调用API，但不是学长们写好的API。重点在于，这个夹爪的控制是由UR机械臂的ModBus，或者说digital output控制的。而这个output只有True或False，true时关，false时开。而我一开始一直在想rt_commander_->setDigitalOut(0,true)；这里的rt_commander，所以我就移植了一些程序，当然是跑不起来的，因为很多程序都是运行在ROS2环境下，要做到很好的移植非常费力。另外就算成功了去调用这些函数也极其困难。这里就不提我整个探索UR驱动的过程了，可以说浪费了巨久的时间。这时候救星来了，就是URScript，这个一定要记住！！！用UR的Modbus等功能是就靠它了。其实URScript就是将一段代码（这个代码的语言叫URScript，其实主要的功能都是些函数）+回车传递到机械臂的操作系统上让它去执行这个代码。但如何去传递呢？很多地方讲不清楚。一共两种办法：1.通过ROS publish到/ur_driver/URScript这个topic上让ROS传递。还有一个办法就是TCP，通过Socket传递这个代码。第一种办法，在CB3+ur_modern_driver上亲测不成功，据说是驱动太老配不上CB3的硬件的原因。要重新弄ur_robot_driver驱动太麻烦，所以我使用了TCP的办法。Python实现，代码非常简单（C++也完全可以，其实我觉得任何一个主流语言都可以，只要支持Socket编程就行），如下：

```
import socket
PORT = 30002  
HOST = #IP OF YOUR UR Robot，这里为192.168.31.124
def close_gripper():
    s = socket.socket()
    s.connect((HOST, PORT))
    command = 'set_digital_out(0, True)\n' #这里说一下，重点就是这个函数set_digital_out()，0代表pin针脚为0的地方设置成True，其实就是通过二进制0和1操作夹爪开合呗，另外最后\n很重要，不过我们也能看出来这个代码的传递是真的很“原始”。
    s.send(command)
    received_data = s.recv(1024)
    s.close()
if __name__ == '__main__':
    close_gripper()
```

URScript还有很多函数等等：具体文档见：[https://s3-eu-west-1.amazonaws.com/ur-support-site/32554/scriptManual-3.5.4.pdf](https://s3-eu-west-1.amazonaws.com/ur-support-site/32554/scriptManual-3.5.4.pdf)，我也打算下载一份以避免网站有一天打不开。

今天的进展很少，不过发现moveit无法正确取到旋转矢量Rotation Vector Rx,Ry,Rz。所以后续用的是URScript取：

```
host_port = ("192.168.31.124", 30003)
dataSocket = socket.socket()
dataSocket.connect(host_port)
data = bytes(dataSocket.recv(1060))
x, y, z = struct.unpack('!ddd', data[444:468])
rx, ry, rz = struct.unpack('!ddd', data[468:492])
```

注意这里的rx,ry,rz取到的结果和示教器上有区别，但他们表示的位姿是一样的。可以转化成四元数或旋转矩阵就知道了是一样的。
然后用Scipy包scipy.spatial.transform import Rotation as R，转换成四元数quaternion,然后再用我之前找的那个四元数转换旋转矩阵的方法转换成旋转矩阵。但是虽然解决了这个问题，但最后的抓取位置还是有问题。明天继续研究。

模板匹配-抓取（Template Matching Grasping）:
由于时间原因，我暂停了UR5和Realsense的研究。转而在Aubo-i5和知象相机上进行模板匹配的抓取。比较顺利，通过OpenCV的模板匹配的自带的库算法，加上自己利用OpenCV的鼠标事件做了一个小GUI。最后也在Aubo-i5和知象相机上实现了抓取。接下来就是抓取更多种类的物体并测试。然后将其移植到树莓派上。还有就是比较6种不同的模板匹配的参数和匹配效果。有一个注意点：
OpenCV Bridge转换的图片是BGR的，如果你发现图片颜色失真，就要转换成RGB：

第一种方法：

```
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
```

第二种办法：

```
b,g,r = cv2.split(image)
rgb_image = cv2.merge([r, g, b])
```

关于知象相机的boundingbox转换参考以下：

```
for i in range(0, number_of_objects):
    starting_index  = 4*i
    bounding_boxes[starting_index] = int(top_left_x + 25)       #1
    bounding_boxes[starting_index + 1] = int(top_left_y - 4)   #2
    bounding_boxes[starting_index + 2] = int(width + 10)       #3
    bounding_boxes[starting_index + 3] = int(height + 10)      #4
if bounding_boxes[starting_index + 1] < 0:
    bounding_boxes[starting_index + 1] = 0
bounding_boxes[4*num_boxes] = 640    #width of zhixiang camera image
bounding_boxes[4*num_boxes+1] = 400  #height of zhixiang camera image
```

今天正式开始写论文了。碰到了一个问题：Something's wrong--perhaps a missing \item. \end{thebibliography}。但是：tex里没有问题，bib里也没有问题。解决方法：关闭tex文件，删除.bbl文件，然后重新编译。注意如果要用bibtex，编译顺序是：pdflatex->biblatex->pdflatex->pdflatex->viewpdf。这个可以在选项中配置texmaker的快速构建选项中选择第二个。

发现一个问题，就是不知道怎么通过Moveit控制Aubo的其中joint6的移动，同时一次性移动机械臂到3D坐标。目前打算是分两步。先更改GPD，再移动。

今天看rs2_deproject_pixel_to_point发现之前realsense和ur5的bug，可能是distortion的问题。如果有时间多可以看一下distortion。目前是none，但有可能是有distortion的。

之前一直有一个bug导致加了GPD之后抓取不准确。 后来发现是先GPD之后得到四元数和位姿有问题。然后把这个带入计算会导致后面的不准确。所以目前的解决方案是，先不旋转joint6，先移动到x,y,0.2的位置下，0.2是z轴，相当于是在被抓物体的正上方。然后移动GPD，最后只改变z轴到trans_z，不动x和y。

将抓取程序移植到树莓派并不成功，因为树莓派是ARM架构，好像因为Aubo_driver的编译架构问题导致无法正常catkin_make。由于时间问题，先进行了抓取实验。

LaTeX有时无错误但无法编译bibtex是需要删除本地.aux文件。
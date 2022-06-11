---
layout: page
title: Basic Lane Line Detection
description: Implementing Python and OpenCV to detect lane lines
img: assets\img\basic_lane_lines\whiteCarLaneSwitch.jpg
importance: 1
category: Computer Vision
github: https://github.com/evanfebrianto/FindingLaneLines
---

<!-- VIDEO LINKS
https://youtu.be/zbxr5MJNSU8 "Solid White Video Output"
https://youtu.be/vj48U4v-hig "Solid Yellow Video Output"
https://youtu.be/VJY4PSqq33M "Challenge Video Output"
 -->

OpenCV library functions such as canny edge detection and Hough lines transformation are utilized in this program to detect lane lines. In addition, we can remove extraneous information from the image by using the region of interest.

#### **Pipeline**

My pipeline included five steps. Here are the specifics:
* Image conversion from three color areas to grayscale
* Using Gaussian Blur with a kernel size of 5.
* Using a 1:3 threshold ratio for canny edge detection
* Defining vertices for masking the region of interest
* Using the Hough line transformation inside the region of interest

After connecting all of the pipelines, I was able to detect the lane lines inside the region of interest. The purpose of this project, however, is to draw a single line on the left and right lanes.

I designed the draw lines() function to extrapolate the lines in order to draw a single line on the left and right lanes. I divided the lanes into left and right based on their slopes. Then I divided them into two groups for which the linear regression equation will be constructed by running np.polyfit ()

The graphic below depicts the distribution of slopes in a single image. The right lane will have a positive slope beginning at 0.5, while the left lane will have a negative slope beginning at -0.5. As a result, any values in the middle will be ignored.

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="assets/img/basic_lane_lines/slopes_distribution.png" title="Slopes Distribution" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Slope distribution on the video input
</div>

After draw lines() returns the desired output, I rerun the pipelines on the input image, and the outcome is shown below.

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="assets\img\basic_lane_lines\solidWhiteCurve.jpg" title="Output Example" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Output Example
</div>

If I combine all of the input photographs, it will appear like this.

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="assets\img\basic_lane_lines\all_images.png" title="All Output" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    All Output Images
</div>

<!-- [![Test Video](/../../../assets/img/basic_lane_lines/test_images_output/solidWhiteRight.jpg)](https://youtu.be/zbxr5MJNSU8 "Video Output") -->

After applying the pipelines to the video input, I was able to achieve satisfactory results on the video with white color line detection and the video with yellow and white color lines.

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        <a href="https://youtu.be/zbxr5MJNSU8" title="White lines detection result">
            <img src="../../../assets/img/basic_lane_lines/out_white.png" alt="White lines detection result" class="img-fluid rounded z-depth-1"/>
        </a>
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        <a href="https://youtu.be/vj48U4v-hig" title="Yellow lines detection result">
            <img src="../../../assets/img/basic_lane_lines/out_yellow.png" alt="Yellow lines detection result" class="img-fluid rounded z-depth-1"/>
        </a>
    </div>
</div>
<div class="caption">
    Detecting white lines is flawless in the left video. There are white and yellow lines on both sides in the right clip, which is the result of detection.
</div>

#### **Potential Shortcomings with the Current Pipeline**

Because my extrapolated formula uses a linear regression, it could have a flaw if the lane was not straight.

An additional drawback could be negated if the slope range is from -0.5 to +0.5. Because the slope values in each video clip can vary, using a hardcoded cutoff doesn't seem like the ideal solution.

Adding to the problem, if the video includes a color change on the road or a shadow obscuring the lines, the algorithm will be thrown off. This is demonstrated in the video below.

<div class="col-sm mt-3 mt-md-0">
    <a href="https://youtu.be/VJY4PSqq33M" title="Detection result on lines with shadow">
        <img src="../../../assets/img/basic_lane_lines/out_challenge.png" alt="Detection result on lines with shadow" class="img-fluid rounded z-depth-1"/>
    </a>
</div>
<div class="caption">
    When the constraints aren't met, the algorithm struggles.
</div>

#### **Possible Improvements to the Current Pipeline**

Using a curve fitting lane instead of linear regression would be an improvement. An alternative to employing a hardcoded slope range threshold would be to use a filtering technique to remove some noise from within the region of interest. Color space research may be necessary to improve the algorithm's resilience in dealing with the road color changing problem.
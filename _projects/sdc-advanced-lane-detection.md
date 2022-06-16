---
layout: page
title: Advanced Lane Lines Detection
description: Advanced lane lines detection using OpenCV
img: assets/img/advanced_lane_lines/project_thumbnail.png
importance: sdc-98
category: Self-Driving Cars
github: https://github.com/evanfebrianto/AdvancedLaneLines
---

<!-- VIDEO LINKS
https://youtu.be/j5TrOewYHok "Challenge Video Output"
https://youtu.be/nZ1rhgbpDrM "Project Video Output"
https://youtu.be/c0TXPYO_6Yk "Detailed Project Video Output"
 -->

#### **Goals**

The goals / steps of this project are the following:

* Compute the camera calibration matrix and distortion coefficients given a set of chessboard images.
* Apply a distortion correction to raw images.
* Use color transforms, gradients, etc., to create a thresholded binary image.
* Apply a perspective transform to rectify binary image ("birds-eye view").
* Detect lane pixels and fit to find the lane boundary.
* Determine the curvature of the lane and vehicle position with respect to center.
* Warp the detected lane boundaries back onto the original image.
* Output visual display of the lane boundaries and numerical estimation of lane curvature and vehicle position.


#### **Camera Calibration**

The code for this step is contained in the first code cell of the IPython notebook located in "./project_submission.ipynb"

I start by preparing "object points", which will be the (x, y, z) coordinates of the chessboard corners in the world. Here I am assuming the chessboard is fixed on the (x, y) plane at z=0, such that the object points are the same for each calibration image.  Thus, `objp` is just a replicated array of coordinates, and `objpoints` will be appended with a copy of it every time I successfully detect all chessboard corners in a test image.  `imgpoints` will be appended with the (x, y) pixel position of each of the corners in the image plane with each successful chessboard detection.  

I then used the output `objpoints` and `imgpoints` to compute the camera calibration and distortion coefficients using the `cv2.calibrateCamera()` function.  I applied this distortion correction to the test image using the `cv2.undistort()` function and obtained this result: 

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/undistorted.png" title="Undistorted" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Comparison between distorted and undistorted image after camera callibration
</div>


#### **Pipeline (Single Image)**

##### 1. Applying cv2.undistort()

After obtaining the matrix for the camera distortion correction, I performed the cv2.undistort() function to each image so that I could show this step. The following is an illustration of what one of the test photographs looks like after I have applied the distortion correction:
<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/undistorted_test2.jpg" title="Transformed Frame" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Applying undistortion function to camera frame on the car
</div>

#####  2. Color Transforms, Gradients, and Thresholded Binary Image

First, I explored all possible color spaces to all images to isolate yellow lines and white lines. I took test5.jpg image as example because it has yellow lines, white lines, and different lighting conditions. Below are the original image and different color spaces.

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/01-original.png" title="Original color space from the camera frame" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Original color space from the camera frame
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/02-rgb.png" title="Each channel for RGB color space" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Each channel for RGB color space
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/03-hsv.png" title="Each channel for HSV color space" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Each channel for HSV color space
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/04-hls.png" title="Each channel for HLS color space" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Each channel for HLS color space
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/05-yuv.png" title="Each channel for YUV color space" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Each channel for YUV color space
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/06-luv.png" title="Each channel for LUV color space" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Each channel for LUV color space
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/07-lab.png" title="Each channel for LUV color space" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Each channel for LAB color space
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/08-xyz.png" title="Each channel for XYZ color space" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Each channel for XYZ color space
</div>

Based on those images, I decided to compare several options for yellow and white lines detection.

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/09-yellow-options.png" title="Color space comparison for yellow line" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Color space comparison for yellow line
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/10-white-options.png" title="Color space comparison for white line" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Color space comparison for white line
</div>

I used B channel from LAB color space to isolate yellow line and S channel from HLS to isolate white color. After applying color thresholding for yellow color, I applied sobel x gradient to detect white lines. Combining them is the final step. Below is the visualitation of thresholding contribution after applying to all test images. Green color is to detect yellow line and blue color is to detect white line. The right side is combined binary threshold.
<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/color_spaces/11-combined-threshold.png" title="Color threshold" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Color threshold
</div>

The code is titled "Thresholding" in the Jupyter notebook and the function is `calc_thresh()` which takes an image (`img`)as its input, as well as `sobelx_thresh` and `color_thresh` for threshold values.

##### 3. Perspective Transformation

The code for my perspective transform includes a function called `warp()`, which appears in "Birds Eye View" section of the IPython notebook.  The `warp()` function takes as inputs an image (`img`). I chose the hardcode the source and destination points in the following manner:

```python
src = np.float32([(575,464),
                  (707,464), 
                  (258,682), 
                  (1049,682)])
dst = np.float32([(280,0),
                  (w-280,0),
                  (280,h),
                  (w-280,h)])
```

This resulted in the following source and destination points:

<table class="table table-sm">
<thead class="thead-dark">
    <tr>
    <th scope="col">Source</th>
    <th scope="col">Destination</th>
    </tr>
</thead>
<tbody>
    <tr>
    <td>575, 464</td>
    <td>280, 0</td>
    </tr>
    <tr>
    <td>707, 464</td>
    <td>1000, 0</td>
    </tr>
    <tr>
    <td>258, 682</td>
    <td>280, 720</td>
    </tr>
    <tr>
    <td>1049, 682</td>
    <td>1000, 720</td>
    </tr>
</tbody>
</table>

I verified that my perspective transform was working as expected by drawing the `src` and `dst` points onto a test image and its warped counterpart to verify that the lines appear parallel in the warped image.

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/perspective_transform/01-birds-eye-view.png" title="Bird's eye view" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Bird's eye view transformation
</div>

##### 4. Identifying Lane Lines Pixels

I created `sliding_window_fit()` and `polyfit_tracking()` to identify lane lines and fit second order polynomial for both left and right lines. It is put under "Detection using sliding window" and "Polyfit based on previous frame" section in Jupyter Notebook.

`sliding_window_fit()` takes a warped binary image as in input. It will calculate the histogram of the bottom second third of the image. Detection for yellow line in the left side quite good so that I decided to just get the local maxima from the left half of the image. However, for the right side, I put a sliding window to detect the base line which is put under "finding rightx base" section in the function. It calculates the number of detected pixel in y direction within the window. It saves the value in a temporary array and return back the index of maximum value. This is more robust compared to finding local maxima which may lead to detect noise. The function then identifies nine windows from which to identify lane pixels, each one centered on the midpoint of the pixels from the window below. This effectively "follows" the lane lines up to the top of the binary image. I collect pixels that are inside the window and use `np.polyfit()` to get a second order polynomial equation.

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/polyfit/01-sliding-window.png" title="Sliding Window" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/polyfit/02-polyfit-tracking.png" title="Polyfit Tracking" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Sliding window (left), Polyfit tracking (right)
</div>

Once I get the result from the previous frame, I applied `polyfit_tracking()` which takes an binary warped image as an input, as well as previous fit for left and right side. This function will search nonzero pixel within 80 margin of each polynomial fit. It will speed up the process because I don't need to blindly search from beginning.


##### 5. Calculating Radius of Curvature and Position of the Vehicle with Respect to Center

The curcature measurement is written under "Determine the curvature of the lane" section in Jupyter Notebook

The radius of curvature is based upon [this website](http://www.intmath.com/applications-differentiation/8-radius-curvature.php) and calculated in the code cell titled "Radius of Curvature and Distance from Lane Center Calculation" using this line of code (altered for clarity):
```python
curve_radius = ((1 + (2*fit[0]*y_0*y_meters_per_pixel + fit[1])**2)**1.5) / np.absolute(2*fit[0])
```

`y_meters_per_pixel` is determined by eyeballing the image. Below are the constants I used for calculation.

```
ym_per_pix = 30/720
xm_per_pix = 3.7/700
```

`calc_curvature` also calculates the position of the vehicle with respect to center. Assuming the camera is in the middle of the vehicle, the position can be estimated by substracting car position, which is `binary_warped.shape[1]/2`, and  lane centre position, `(r_fit_x + l_fit_x)/2`. The result of the substraction will be scaled by `xm_per_pixel` to get meter as the unit.

##### 6. Inverse Persepective Transformation

This phase is implemented in the function `draw lane()` in the section *`"Warp the detected lane borders back onto the original image"`*. This function requires the following inputs: `original img, binary img, l fit, r fit, Minv`.

`Minv` includes an inverse matrix for transforming a twisted image back to its original state. Overlaying it with `cv2.addWeighted()` will make it appear good.

After generating the map, I used the `put curvature()` method to add the curvature and vehicle position information to the upper left of the image.

Here's an example of my output from a test image:

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/advanced_lane_lines/perspective_transform/03-invert-back.png" title="Invert back" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Invert transform and draw lane
</div>


#### **Result**

<div class="col-sm mt-3 mt-md-0">
    <a href="https://youtu.be/c0TXPYO_6Yk" title="Detection result">
        <img src="../../../assets/img/advanced_lane_lines/project_output.png" alt="Detection result" class="img-fluid rounded z-depth-1"/>
    </a>
</div>
<div class="caption">
    Pipeline result with detailed information
</div>


#### **Possible Improvements to the Current Pipeline**

The issue is that my pipeline isn't built to withstand harsh lighting, shadows, and bumpy roads. I believe that employing deep learning for image segmentation is a better method. We can then get the lines and utilize them to determine the lane.

<div class="col-sm mt-3 mt-md-0">
    <a href="https://youtu.be/j5TrOewYHok" title="Detection result on a challenging condition">
        <img src="../../../assets/img/advanced_lane_lines/challenge_output.png" alt="Detection result on a challenging condition" class="img-fluid rounded z-depth-1"/>
    </a>
</div>
<div class="caption">
    Detection result on a challenging condition
</div>

I also doubt using a bird's eye view is the best approach. I'd appreciate it if you could share any relevant articles or studies with me.
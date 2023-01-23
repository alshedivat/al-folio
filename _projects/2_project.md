---
layout: page
title: Project Orion
description: This is a software package written in C++ to simulate the 1D heat conduction in a spherical body with multiple layers of different material compositions of varying thicknesses in the radial direction.
img: assets/img/p2_1.png
importance: 1
category: Computational
---
# Project Orion
This C++ code is written by Team Nebula for Project 3 of MEEN 689 Computing Concepts course.

This code simulates the 1D heat conduction in a spherical body with multiple layers of different material compositions of varying thicknesses in the radial direction.

This code is based on the Implicit Backward in Time- Central in Space (BTCS) discretization scheme of the 1D heat equation.

$$\frac{\partial T}{\partial t } = \alpha\frac{\partial^{2} T}{\partial x^{2} }$$

$$-{\lambda T_{i+1}^{n+1}}  - \lambda T_{i-1}^{n+1} + (1 + 2\lambda)(T_{i+1}^{n}) = T_{i}^{n}$$

With Neumann Boundary conditions applied at both boundaries. 

$$ q=-k\frac{\partial T}{\partial x}$$

Discretizing the boundaries using ghost points, we get the following linear system.
$$ A*T^{n+1} = T^{n} + B$$

Matrix A has $1+2*\lambda$ on the main diagonal, then -$\lambda$ on the super and sub diagonals (except the first and last rows). For the first and last rows - which correspond to the boundary conditions - the first row has $-2*\lambda$ on the super diagonal, while the last row has $-2*\lambda$ on the sub-diagonal.

Vector B has the temperature values at all grid locations from the previous timestep. Again, the first and last element are modified to incorporate the Neumann boundary condition. 


The Linear system of equations obtained from BTCS formulation is solved using an optimized Tridiagonal Matrix Solver based on the Thomas Algorithm (TDMA).

  
## Dependencies

- Compiler: g++
- Python3
  - matplotlib
  - Numpy

## Installation

Clone the current git repository and compile using the following commands.
```bash
make all
```
This will output the following, which confirms installation
```bash
g++ -c -o main.o main.cpp
g++ -c -o setup.o setup.cpp
g++ -c -o solver.o solver.cpp
g++ -c -o data.o data.cpp
g++ -o 1dheat main.o setup.o solver.o data.o
rm -f *.o
```
If you want to keep the object files you can use
```bash
make 1dheat
```
## Usage
### Solver
To run a simulation, type in the following:
```bash
./1dheat
```
This would first prompt you to enter how verbose your terminal output would be.
```bash
Please select how verbose you would like the solver output:
```
You could enter the following values: 1, 2, 3, 4, 5
 

1: Basic information; $\lambda$ , No. of nodes , Grid size $\Delta x$ , Time step $\Delta t$ , No. of time steps , $\frac{q}{k}$*

2: Matrix A

3: Vector B 

4: Matrix A after forward elimination in TDMA

5: Vectors $T^{n+1}$ $T^{n}$ at desired time step **



*"you can choose the location to display $\frac{q}{k}$ in main.cpp"

**"You can choose time step to display $T^{n+1}$ $T^{n}$ in Push_T() function in solver.cpp"


Then you would be prompted to input the desired grid size
```bash
How many grid points would you like? (More points equals a finer mesh)
```
Following this, you would be prompted to input the time step size.
```bash
How small would you like your time step size? (seconds)
```
This is followed by asking for the simulation time in seconds.

```bash
How long would you like to run the solver? (seconds)
```

Then you are asked the frequency at which to save the time history, followed by the config file name and the layup choice along with the Boundary condition choice.
```bash
How often would you like the solver to save the data? (Save every X iterations)
What is the name of the config file containing the necessary material properties?
Which material layup would you like to check? (1-4)
What boundary condition are you testing?
BC1: Heat flux applied to one boundary.
BC2: Symmetric heat flux along the surface.
Input 1 for BC1 and 2 for BC2..
```
If you choose BC1 it would apply a heat flux on one end of the 1D domain (i.e radial) and an adiabatic condition on the other end.

If you choose BC2 it would apply a heat flux at both ends and give you an option to add insulation(felt) on both sides of the domain.

```bash
What boundary condition are you testing?
BC1: Heat flux applied to one boundary.
BC2: Symmetric heat flux along the surface.
Input 1 for BC1 and 2 for BC2...
2
Would you like to add more felt insulation? (y/n)
y
Specify the thickness of felt insulation to be added. (meters)
10.0
```
The program would output information based on verbose selection and also outputs the time(seconds) at which the temperature profile is stored in /data folder. Note: the data folder has to be created by the user manually before running the executable (1dheat).

At the end of the run, it would output the CPU time (ms) for the Thomas Algorithm solver averaged over all the time steps.
### Visualization

plot.py produces a line plot of the temperature distribution at the previously user-defined frequency for a certain layup (also defined by the user)

To run this, use the following:
```bash
./plot.py <0 or 1> <layup>
```
0: for keeping the csv files after plotting
1: for deleting the csv files after plotting

The user will then be given the opportunity to name the plot

visualize.py produces a 3D plot of the temperature distribution at a given timestep and at a layer that we choose.

To run this, use the following:
```bash
python3 visualize.py <time> <layer>
```
The two arguments that this takes are:
$<time>$: specifies the time at which the profile is visualized.

$<layer>$: specifies the layer which is visualized (layer away from the center)

## Material Configuration 
To change the material properties, MatCon.csv is used where only the values must be changed, the order of properties and the names of variables cannot be changed.

## Constraints
### I/O
-If the frequency of saving data is greater than number of time steps, no data will be saved.
- Config file name must match the input. (if not material properties would be considered to be zero.) 
- Only predefined Layups (1-4) [Define_Alpha() defaults to Layup 4 if any value other 1-3 is entered. Other functions show "layup does not exist"]
- Only predefined Boundary conditions
- Only predifined geometric compositions
- For the felt addition prompt "yes", "Y","y" allow to add felt to the domain.
## Physical
- The variation in material properties K(x), $\rho(x)$ and $C_{p}(x)$ is not considered in formulating the governing equations.
- For felt, we assume that it fails anyway, we do not consider it's crystalization when checking for glass temperature of other interior materials. 
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.


Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal its glory in the next row of images.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}
```html
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```
{% endraw %}

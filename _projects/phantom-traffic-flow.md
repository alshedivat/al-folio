---
layout: page
title: Phantom Traffic Jams
description: Writing Project for Partial Differential Equations Course
img: assets/img/traffic2.gif
importance: 1
category: fun
---

# Introduction

Traffic jams are an unavoidable inconvenience when it comes to travel.
Even more frustrating than a jam caused by an accident or a narrowing
roadway is congestion that occurs in the absence of any type of
bottleneck. These buildups without seemingly any cause are known as
phantom traffic jams, and they have been widely studied in both
mathematical and physical realms. Specifically, mathematicians have over
time developed many models simulating traffic patterns that vary in
tractability--how easy the model is to solve--and feasibility--how
accurate the model is in portraying reality. For traffic flow, there are
two main types of models, mirroring the way physicists look at gases:
particle and fluid dynamical models \[2\]. A particle model may look at
individual cars, just as one would look at individual gas molecules, in
order to learn more about how the parts interact in a system. In our
case of traffic flow, this can create a huge system of equations that is
largely complicated and not very tractable.

The fluid dynamical approach has been used since about the 1950's \[2\].
Rather than looking at individual vehicles, this model looks at the
entire system, evaluating the flow continuously rather than discretely.
This is similar to a physicist describing a gaseous system as a fluid
rather than as discrete molecules. There are many advantages of this
model, including that it is much more tractable than other approaches.
More recently, nonlinear dynamics have been applied to these models as
well to widen the scope of the patterns they can replicate \[2\]. By
better understanding traffic patterns and being able to effectively
simulate traffic dynamics, we can change the way we deal with jams,
making travel more efficient. Modeling traffic patterns can also allow
us to add provisional laws and regulations to keep drivers safe and in
fewer accidents.

# Approaches to the Traffic Flow Modeling

## Particle Models

As mentioned above, particle models imitate the way kinetic gas theory
looks at individual molecules to describe the entire system. In the view
of traffic flow, these models create systems of equations that describe
how individual drivers respond to surrounding traffic. One major example
of a particle model is car-following theory \[7\]. This model treats
each vehicle as a discrete point, indexed by a counting variable. Using
physical intuition and mathematically realized relationships, an
equation for each vehicle is crafted that explicates the motion of the
vehicle due to its response to the distance between it and the car in
front of it. These indexed ordinary differential equations produces a
large system of equations, one for each car, which can be
computationally complicated.

## Fluid Dynamical Models

The simplest model that uses fluid dynamical techniques is called the
continuum model of traffic flow, a first-order partial differential
equation model that was popularized by Lighthill and Whitham \[4\]. It
uses the idea that a one-lane roadway of traffic with discrete vehicles
traveling in one direction can be extrapolated to an unbroken flow with
continuous properties, such as density and velocity as continuous
functions of space and time. By using the continuum model as opposed to
car-following theory, mathematicians can generalize the model by
extending it to the continuum limit (thus allowing for the use of
differential calculus) for different parameters of the model. An
important insight of this model is that the individual vehicles are not
as important as the overall flow of the cars, so the traffic flow can be
viewed macroscopically rather than microscopically.

A more complicated version of this model is the Payne-Whitham model
\[9\]. It again uses partial differential equations to simulate traffic
patterns, but it is a nonlinear second order model. Payne and Whitham
added a second equation to Whitham's original model by accounting for
the acceleration of the vehicles, using physical intuition to relate
variables, so the model is a system of two differential equations.

# Continuum Model of Traffic Flow

## Formulation

The continuum model of traffic flow extrapolates the discrete variables
associated with individual variables into fields defined by continuous
functions. The simplest way to formulate this model is by imagining a
one-lane highway with all the cars moving in the same direction, and no
on-off ramps. Thus, the number of vehicles is constant, and there are no
external factors that might confound the effects of a phantom traffic
jam. We can also imagine that each car $i$ has some velocity, $v_i(t)$,
and a location $x_i(t)$ at time $t$. This coordinate of a particle
vehicle is often called the Lagrangian coordinate \[7\]. To an observer
of the entire roadway, the individual cars are not as important as the
overall flow of the cars. Thus a general principle can be used in
developing this model: the closer together the cars are, the slower they
will move \[6\]. The continuum model tells us that we can replace the
discrete objects with a moving continuum, so that the discrete
velocities associated with each car can be replaced by a ''Eulerian
velocity field ''\[7\]. This field is represented by the function
$u(x,t)$, a continuous function with a value at every point in space and
time (rather than only a value at the locations $x_i$ of each car).
However, by using this Eulerian field, we can \"go backwards\" in the
calculation and still find the velocity of a particular car by
specifying a time and location at which we would like to know the
velocity. Thus $u(x,t)=\frac{dx}{dt}$.

A second parameter we can define for this model is the traffic density,
$\rho(x,t)$, which described the average number of vehicles per unit
length of road at a specified position $(x)$ and time $(t)$ \[7\]. If
all the vehicles have the same length $L$, for example, and the space
between the cars is the distance $d$, then $\frac{1}{L+d}$ vehicles will
be present per unit length of road. Thus, in this simplistic
calculation, the density of the road is constant:
$\rho(x,t)=\frac{1}{L+d}$. Another parameter used in the continuum model
is the traffic flux, or flow of traffic, which is represented by
$q(x,t)$. This is the number of cars per unit time that cross a
specified location, and is meant to parallel the flux of a fluid through
a volume. Physics intuition allows these three variables to be related
in the model by the equation $q(x,t)=\rho(x,t) \cdot u(x,t)$ \[6\]. Thus
the rate of cars that pass a point is equal to the velocity of the cars
at that point times the density of cars that pass that location.

As is the case with mathematical models of physically realized
phenomena, physical laws can help to elucidate the relationships between
variables of the model. An important idea for deriving our partial
differential equations is the conservation of the number of vehicles
\[3\]. If the focus is placed on a certain sublength of the road between
two points (call them $x= A$ and $x=B$), it is clear that the number of
cars in this length depends on time. The flux, or traffic flow, at the
endpoints A and B affect the number of cars in the length; for example,
if the flux is greater at A than B (and more cars flow into the length),
the number will increase. More explicitly, the rate of change in the
number of vehicles in the segment is equal to the different in fluxes at
the endpoints. We also know that the number of vehicles in this length
comes from \"adding up\" the density at each point in the interval:
$$\label{1}
N_{AB}(t)= \int_A^B \rho(x,t)dx.$$ The derivative with respect to time
of this integral thus equals the flow out (flux at B) subtracted from
the flow in (flux at A): $$\label{2}
\frac{d}{dt} \int_A^B \rho(x,t)dx=\int_A^B \frac{\partial \rho}{\partial t}dx=-q(B,t)+q(A,t).$$
This is the global conservation law for the traffic flow \[7\]. There is
another relation that we can derive from the fundamental theorem of
calculus: $$\label{3}
\int_A^B \frac{\partial q(x,t)}{\partial x}dx=q(B,t)-q(A,t).$$ The right
hand side of this equation is then the additive inverse of the right
hand side of equation $\ref{2}$, so we can add these two equations to
get $$\label{4}
\int_A^B \left ( \frac{\partial \rho(x,t)}{\partial t} + \frac{\partial q(x,t)}{\partial x} \right ) dx=0.$$

This is crucial for the continuum model. Because the interval from $x=A$
to $x=B$ can be any interval along the road, and thus the integral is 0
for whatever interval chosen, it must be true that the integrand itself
is 0 for all $x$ and $t$ on the road, according to the Vanishing Theorem
\[10\]. Thus, we arrive at our partial differential equation:
$$\label{5}
\frac{\partial \rho}{\partial t} + \frac{\partial (\rho u)}{\partial x}=0.$$

::: center
![Empirical data for velocity and density of traffic on major roadways.
(a) A Toronto highway (b) An Amsterdam freeway (c) Lincoln Tunnel and
(d) Merritt Parkway. \[8\]](Velocity_density_PRES2.png){#vd}
:::

This differential equation is the basis for the continuum model. More
information is needed for this model to accurately replicate what is
seen in reality, because right now the partial different equation has
two seemingly unrelated variables: $\rho$ and $u$. However, most
mathematical models for traffic flow make the important assumption that
velocity is only a function of density; in other words, the velocity
field is entirely dependent on the density at each location \[7\]. This
is a reasonable assumption because it is well known that the closer the
vehicles are (high density), the slower the cars move (low velocity), as
shown in figure $\ref{vd}$. Therefore equation ($\ref{5}$) is sometimes
rewritten as $$\label{6}
\frac{\partial \rho}{\partial t} + \frac{dQ(\rho)}{d\rho} \frac{\partial (\rho)}{\partial x}=0,$$
where $Q(\rho)=\rho u(\rho).$ (Often $\frac{dQ}{d\rho}$ will be written
as $c(\rho)=u_{max}(1-2\rho/\rho_{max}$, for reasons explained below.)
But how is this velocity dependent on density? We could assume a
velocity that is constant with respect to density, but this model is not
very realistic (except possibly for low densities). A common
approximation used for $u(\rho)$ is called Greenshields model:
$$\label{7}
u(\rho)=u_{max}(1-\rho/\rho_{max}),$$ with $u_{max}$ and $\rho_{max}$
equaling the upper limits on the velocity and density, respectively
\[8\]. They both must be nonnegative of course, but they must have upper
bounds as well. The maximum speed, $u_{max}$ can be restricted by a
number of things, including a speed limit or road conditions. The
maximum density, $\rho_{max}$, occurs in bumber to bumber traffic, when
the velocity of the cars is zero. If the length of the vehicles is on
average $L$, this maximum density can reasonably be $\rho_{max}=1/L$.

## Solutions to the Model

This model can help explain a variety of patterns in traffic flow.
Specifically, we are interested in this model for its application to
traffic jams. If, on a one-lane highway, the density in vehicles is some
constant of freely-flowing traffic, then there are no jams where the
density is extremely high and the velocity is close to zero. Thus we can
imagine the case where traffic density is slightly perturbed from an
equilibrium state, $\rho_0$. Thus $\rho(x,t)=\rho_0+\tilde{\rho}(x,t)$,
where $\tilde{\rho}(x,t)$ is the small addition to the equilibrium
density \[3\]. By this assumption, where $\rho_0$ is a constant, we
obtain: $$\label{12}
\frac{\partial \tilde{\rho}(x,t)}{\partial t} + (Q'(\rho_0)+\tilde{\rho}(x,t)Q''(\rho_0))\frac{\partial \tilde{\rho}(x,t)}{\partial x} =0.$$

and the equation, after keeping the linear terms in $\tilde{\rho}$,
becomes \[3\]: $$\label{8}
\frac{\partial \tilde{\rho}(x,t)}{\partial t} + Q'(\rho_0) \frac{\partial \tilde{\rho}(x,t)}{\partial x} =0.$$

By using a wave ansatz, we find the exponential solution:

$$\label{9}
\tilde{\rho}(x,t)=Ae^{ik(x-ct)}$$ with $c=Q'(\rho_0)$ \[3\]. A few
things become clear from this solution. If there is a slight
perturbation in the density of the traffic flow (such as a jam), it will
travel as a linear wave propogation of higher density through the line
of traffic (of some constant density) \[5\]. This wave, under
linearization of the equation, is stable, as the amplitude of the
distubance is constant (the wave does not grow or shrink as it travels
in time). Thus, it is sometimes possible for a traffic jam to remain
stable and thus virtually unchanged for hours. According to some models,
jams are even more stable occurences in simulations upon introduction of
key phenomena observed experimentally. For example, the concept of
inertia can be applied to traffic flow in that vehicles tend to keep the
same velocity in the presence of external disturbances (like a car
slowing down in front of them).

## Problems with the Model

As with any model detailing real-life phenomena, there are problems and
limitations to the continuum approach to traffic flow. The first problem
is evident in the name: this model is only an approximation, because
discrete traffic flow has been simulated as a flow with a continuous,
averaged density. The model also runs into complications at low
densities, where the relationship between the velocity and density
breaks down \[8\]. At low densities, when traffic flow is in a free-flow
state, small perturbations in density can easily be smoothed out, so
there is no lasting effect of a traveling wave as was a solution above.
This shows the stability of traffic flow at low densities; however, when
it reaches a critical density, the traffic flow changes to a congested
regime nonlinearly. This is demonstrated in a \"fundamental diagram,\"
which shows the relationship between flux and density for a one-lane
roadway, as in figure ($\ref{fd}$) \[3\].

::: center
![An empirical fundamental diagram using data from the German freeway
A43.\[3\]](Fundamental_diagram_STILL.png){#fd}
:::

Lastly, the model may be too restrictive in definition of velocity, and
its ability to account for external factors. Velocity may not be
linearly dependent on density, and it may be dependent on other factors
(such as the density derivatice with respect to position). The continuum
model cannot account for different numbers of lanes, merging, and on/off
ramps. It also does not take the length of the roadway into account, as
it assumes a one-directional, one-lane infinitely-long roadway. This
model is therefore very limited in scope. However, it is an attractive
starting place for more complex models, such as the Payne-Whitham Model,
because of its high tractability.

## Revised Continuum Model

The Lighthill and Whitham continuum model, detailed above, is a first
order model that restricts the traffic modeled to equilibrium states,
with small perturbations. In reality, traffic is generally observed in
disequilibrium. Thus the continuum model, though not necessarily
inaccurate, is restricted in scope and cannot fully explicate the event
of a traffic jam. The Payne-Whitham model adds another equation
alongside the first order partial differential equation in the continuum
model (equation [\[5\]](#5){reference-type="ref" reference="5"}) to
define traffic acceleration. This model approximates $u(x,t)$ by the
equilibrium velocity $u_0$, which is the \"fundamental diagram.\" The
second equation, which defines acceleration, is a momentum equation for
$u(x,t)$, giving the completed model:
$$\frac{\partial \rho}{\partial t}+ \frac{\partial (\rho u)}{\partial x}=0$$
$$\label{10}
\frac{\partial u}{\partial t} +u \frac{\partial u}{\partial x} +\frac{a(\rho)}{\rho}\frac{\partial \rho}{\partial x}= \frac{u_0(\rho)-u}{T(\rho)},$$
where $a(\rho)$ is the \"anticipation coefficient\" and $T(\rho)$
accounts for human relaxation time \[1\]. With $q=\rho u$, the model can
be rewritten as

$$\left( \begin{array}{cc}  \rho \\ q \end{array} \right )_{t}+ \left( \begin{array}{cc} q \\ \frac{q^2}{\rho}+a(\rho)\rho \end{array} \right )_{x} = \left( \begin{array}{cc} 0 \\ \frac{f_0(\rho)-q}{T(\rho)} \end{array} \right ).$$

This model can be written in a conservative form $$\label{11}
w_t+f(w)_x= s(w)$$ where $w$ is the vector $(\rho,q)$ \[9\]. The model
can be solved numerically, but we may also care to investigate the
homogeneous solution to this system of equations, where the right hand
side of the system $s(u)=0$. The continuum model of traffic flow is
actually a degenerate system of this model, and thus this model
\"absorbs\" the characteristics of the simpler continuum model \[9\].
The homogeneous system of equations can be solved with the \"frozen
characteristic speeds\" of the system, $\lambda_{1,2}$. These are the
eigenvalues of the homogeneous system, where
$\lambda_{1,2} = u \mp \sqrt{a}$ \[9\]. More complicated calculations
can be derived for the solution to the inhomogenous Payne-Whitham model.
The solutions fall into two regimes: free-flow solutions and
congested-flow solutions. When the traffic densities are low and the
velocities are approximately constant, the solution to the model falls
within the free-flow regime. Around a critical threshold density of
traffic, this solution becomes unstable, and small perturbations will
amplify and grow into travelling waves (thus, a traffic jam) \[4\].

For larger densities, the system is linearly unstable. There are two
effects on the traffic flow that influence the stability of the system
(and work against each other). The first is a stabilizing effect that
arises from preventative driving; this effect clearly would decrease the
likelihood of a compounding traffic jam. A second effect is more
destabilizing and causes the variation in traffic density to increase,
thus enlarging the jam: drivers tend to slow down when density is
higher, and there is a delay in adjustment of drivers to new conditions
\[5\]. Above the critical density threshold, the destabilizing effect
will outweigh the stabilizing effect, and the perturbation will build up
into a travelling wave. These instabilities looks like a sharp jump in
vehicle density on the side of the wave facing incoming traffic and a
smooth decay on the other side, which travel unchanged along the road.
Because each vehicle reacts the cars around it, information cannot
travel faster than the speed of the cars themselves, and the travelling
waves move at a constant velocity slower than the vehicle velocities
\[3\]. Once these jams are formed, they are relatively stable
structures, to which anyone who has sat in hours of traffic can attest.
They can only vanish by diminishing effects on the waves, such as those
of cautious drivers and and those that lower density (adding more lanes,
for example).

## Further Commentary on the Continuum Model

::: center
![The vehicles move along the circle (these pictures were taken with a
specific camera to allow for the 360 degree view). In (a), the vehicles
are moving in free flow. In (b), a jam has formed at the top of this
circle. \[11\]](Experiment_TRAFFIC_JAMS.png){#pic}
:::

The predictions that come from the Payne-Whitham model of traffic flow
regarding traffic jams are easily tested on a circular road. Using a
circular road instead of an \"infinitely long\" straight roadway allows
for conservation in number of vehicles and for the experiment to remain
localized. Sugiyama et al. conducted such an experiment in 2008 to test
the behavior of drivers that causes phantom traffic jams, and to compare
model simulations with real-life occurences \[11\]. In this experiment,
22 vehicles were told to maintain a constant speed of 30 kilometers per
hour after being spaced evenly around a 230-meter circular track. The
velocity had to be appropriately high in order to create the unstable
conditions that cause traffic jams in a parallel model simulation. The
vehicles began in the free-flow regime, and are told to maintain safety
by following the car ahead of them while still trying to remain at a
constant speed. The cars remain in this regime for some time, until it
breaks down into the congested-flow regime, as reported by Sugiyama et
al.:

> After some time, small fluctuations appeared in the headway distances
> and developed as time progressed. It takes a period of time for the
> fluctuations to grow enough to break down the free flow. The free flow
> has been disturbed and the vehicles cannot move homogeneously any
> more. Finally, several vehicles are forced to stop completely for a
> moment (figure [3](#pic){reference-type="ref" reference="pic"}(b)). A
> clear 'stop-and-go wave' is observed, and furthermore, it propagates
> in the opposite direction to the movement of vehicles, which is
> nothing but a jam. The jam cluster moves as a solitary wave and
> maintains its size and velocity \[11\].

Thus a traffic jam can be created organically by the behavior of
drivers. The effect of collective motion caused by the interaction among
vehicles creates the dynamic solution of the model and real-life
experience of traffic jams. Because traffic flow is a physical system in
disequilibrium that consists of moving particles with asymmetric
interaction, small perturbations can move the system from a state of
free-flow to one of a jam, where there are travelling clusters on low
velocity in the flow. Thus, by both the Payne-Whitham model and the
experimental evidence provided by Sugiuama et al., phantom traffic jams
are a culminating result of the small fluctuations present in traffic
density when that density is near a critical value. The free-flow state
becomes unstable, fluctuations grow steadily and the break the free
flow, and the jam is created to travel along the road without decay.

# Conclusion

When a traffic jam occurs without any dependence on a bottleneck, such
as narrowing roadways or obstacles, a phantom traffic jam is born. These
jams can be explained by a variety of models that investigate traffic
flow analogously to gas theories. Traffic can be modeled microscopically
as a system of discrete particles, with rules of interaction that define
the motion of each vehicle. A different and more recent approach is a
macroscopic view, which mirrors fluid dynamics of a many-particle
system. The individual vehicles in this system are ignored, and
generalized formulations of variables such as traffic density and flux
are modeled.

Lighthill and Whitham proposed an early model of this type, known as a
continuum model of traffic flow, which describes the dynamics of the
system with a first-order partial differential equation. This equation
can be solved given initial conditions, and can help to elucidate the
mechanism of linear traveling waves that arise from variations in
traffic density (i.e. a traffic jam formation). However, despite the
model's tractability, it is often regarded as too simplistic to describe
more complex phenomena of traffic. Thus, Whitham improved his model with
a momentum differential equation that defines traffic acceleration in
what is now the Payne-Whitham model. This second order system of
equations accounts for the complexity of driver's reactions to the
traffic around them more acutely than the continuum model. In the case
of traffic jams, this model can help explain the shape of the
higher-density congestions, and how they evolve over time. While much of
travel occurs as free flow, where density is low and velocity is high,
the solutions that fall in this regime are unstable. If the density of
traffic nears a critical value, the instability cause small fluctuations
in density to grow steadily and break the free flow, resulting in a jam.
The jam then travels along the roadway, without decaying, in a nonlinear
traveling wave. Sugiyama et al. \[11\] tested the predictions of this
model, and the predictions of the model have been verified.

# References

1.  A. Klar, R. Wegener. Kinematic Derivation of Macroscopic
    Anticipation Models for Vehicular Traffic. *SIAM Journal on Applied
    Mathematics*, 60 (2000), pp. 1749-1766.

2.  K. Nagel, M. Schreckenberg. A cellular automaton model for freeway
    traffic. *Journal de Physique I*, EDP Sciences, 2 (1992), pp.
    2221-2229.

3.  K. Nagel, P. Wagner, R. Woesler. Still flowing: approaches to
    traffic flow and traffic jam modeling. *Operations Research
    INFORMS*, 51 (2003). pp 681-710.

4.  M. Flynn, et al. Self-sustained nonlinear waves in traffic flow.
    *Physical Review E*, 79 (2009).

5.  M. Flynn, et al. Traffic modeling- Phantom traffic jams and
    traveling jamitons. Technical Report. MIT Mathematics.

6.  M. Lighthill, G. Whitham. On kinematic waves. II. A theory of
    traffic flow on long crowded roads. *Proceedings of the Royal
    Society of London*, 229 (1955). pp 317-345.

7.  S. Childress. Notes on traffic flow. Technical Report. (2005). New
    York University.

8.  S. Doboszczak, V. Forstall. Mathematical modeling by differential
    equations: Case study: Traffic flow \[Presentation Slides\]. (2013).
    Received from\
    http://www.norbertwiener.umd.edu/Education/m3cdocs/Presentation2.pdf.

9.  W. Jin, H. Zhang, 2001. Solving the Payne-Whitham traffic flow model
    as a hyperbolic system of conservation laws with relaxation.
    Technical Report. University of California, Davis.

10. W. Strauss. *Partial Differential Equations: An Introduction*. John
    Wiley & Sons, 2008.

11. Y. Sugiyama, et al. Traffc jams without bottlenecks- experimental
    evidence for the physical mechanism of the formation of a jam. *New
    Journal of Physics*, 10 (2008).

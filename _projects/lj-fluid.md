---
layout: distill
title: Soft Disk Lennard-Jones 2D Fluid
description: Numerically simulate 2D Lennard-Jones Fluid using Fortran
img: assets/img/lj_fluid/8.png
importance: 1
category: work
---

# Soft Disk Lennard-Jones 2D fluid
In this study, our objective is to simulate a soft-disk fluid composed of small particles interacting through the Lennard-Jones potential. This potential exhibits a repulsive behavior at short distances and an attractive behavior at longer distances, as defined by Equation (1):
\begin{equation}
    V\left(r\right)=4\epsilon\left[\left({\dfrac{\sigma}{r}}\right)^{12}-\left({\dfrac{\sigma}{r}}\right)^{6}\right]
    \tag{1}
\end{equation}
And the force is the gradient of the potential plus a minus sign
\begin{equation}
    F\left(r\right)=
    \dfrac{24\epsilon}{r}\dfrac{\sigma}{r}^{6}[2\left({\dfrac{\sigma}{r}}\right)^{6}-1]
    \tag{2}
\end{equation}

## Verlet and Predictor-Corrector method
In our pursuit of solving the equations of motion for this complex system, we explore two efficient and accurate methods: the Velocity Verlet method and the Predictor-Corrector method. Due to the relatively large number of particles in this system, our chosen method must strike a balance between computational efficiency and precision. Both the Verlet and Predictor-Corrector methods are widely recognized and employed for such simulations.

### Verlet Method
We begin by implementing the Velocity Verlet method and conduct convergence tests on both energy and momentum. The results are promising, especially as we decrease the time step ($$ dt $$) to values as small as $$ dt=10^{-4} $$. The reduction in error and convergence of both energy and momentum demonstrate the effectiveness of this method.

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/0.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

### Predictor-Corrector Method
Taking our simulation a step further, we introduce the Predictor-Corrector method. This method's core principle revolves around iteratively reducing the difference between predictor and corrector values until a desired tolerance is reached. The graph below illustrates the diminishing difference between predictor and corrector values after each correction step. This difference eventually reaches machine accuracy after approximately 8 iterations. In our program, we employ two criteria to evaluate the adequacy of the corrector: first, it must iterate at least 4 times, and second, the difference must fall below a defined tolerance. If the value fails to converge after 8 iterations, we halt the iteration process.

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/1.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

Furthermore, we conduct convergence tests using the Predictor-Corrector method with difference tolerance. The results indicate superior accuracy compared to the Verlet method, as depicted in the table summarizing the advantages and disadvantages of both methods.
<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/3.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/4.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

As evident from the convergence figures above, we also monitor the system's temperature, which gradually approaches equilibrium. Additionally, we analyze the probability distributions of speed, denoted as $P(v_x)$, $P(v_y)$, and $P(v)$, at various temperatures. The three columns represent different initial velocities, resulting in varying equilibrium temperatures.

## Periodic Boundary Condition
To accurately model our infinite 2D system, we implement periodic boundary conditions. This approach ensures that when a particle reaches one side of the simulated space, it seamlessly reappears on the opposite side. Consequently, we calculate the forces acting on each particle while taking into account the periodic images created by the boundary conditions. This technique allows us to simulate an effectively boundless system while preserving the physics of particle interactions.

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/5.jpg" class="img-fluid rounded" %}
  </div></center>
</div>


## Maxwell-Boltzmann distribution
As you can see,  according to Maxwell-Boltzmann distribution when the temperature are lower the distribution are more center at low speed with a higher peak, but if the temperature increase the distribution spreads out and the height also decrease. Since our system are smaller (only 49 particles), the distribution looks very discrete. If we increase the number of particles, the equilibrium temperature increase and the graph become smoother. Since the temperature also higher the distribution didn't seem much difference, but we can still see that the peak of each distribution shift to higher velocity. 
 
$$ 
NP = 49
$$

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/6.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

$$
NP = 100
$$

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/7.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

## Temperature and Pressure

The formula for measuring temperature and pressure are given below.
\begin{equation}
	k_BT = \dfrac{m}{d} \langle v^2 \rangle
    \tag{3}
\end{equation}
and
\begin{equation}
	P = \dfrac{1}{A} \left[ Nk_BT - \dfrac{1}{2} \sum_{k=1}^{N} 
		\sum_{j<k} \dfrac{dV(r)}{dr}r_{jk} \right]
        \tag{4}
\end{equation}
Using above two equation we can monitor system temperature and 
pressure at all time. Below show that after some time both
temperature and pressure goes to equilibrium.

$$
NP = 49
$$

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/8.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

$$
NP = 100
$$

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/9.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

## Heat Capacity
If we then measure the energy after equilibrium and then by varying the initial velocity using following formula we can get roughly the desire equilibrium temperature.
\begin{equation}
	v = v \sqrt{\dfrac{T_{desire}}{T_{old}}}
    \tag{5}
\end{equation}
And the heat capacity $c_v$ is given by $\dfrac{dE}{dT}$. Below left  figure show the $E(t)$ relation. The energy is negative is because it is govern by potential energy. In the case of $NP=49$ the heat capacity is roughly 58.
<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/10.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

There is an alternatively way of calculating heat capacity which is given by
\begin{equation}
	\langle T^2 \rangle - \langle T \rangle^2 = N(k_B
	\langle T \rangle)^2 [1-\dfrac{Nk_B}{c_v}].
    \tag{6}
\end{equation}
Using this formula we then measure the same system for heat capacity, the heat capacity are different by some degree when $NP=100$ . But if we look at same method for two different number
of particles, you can see that $c_v$ roughly double as the particle number double which is what we expected.

$$
NP = 49
$$

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/11.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

$$
NP = 100
$$

<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/12.jpg" class="img-fluid rounded" %}
  </div></center>
</div>

## Pair correlation of LJ fluid
<div class="row">
  <center>
  <div class="col-sm-12">
    {% include figure.html path="assets/img/lj_fluid/13.jpg" class="img-fluid rounded" %}
  </div></center>
</div>


## Code
```fortran=
!========================================================
!   purpose: MD simulation
!
!   methods: velocity verlet + predictor-corrector
!
!   input: NP, L, maxt, vmax, h
!
!   output: position, velocity, T, K, U, P, Cv
!
!       date        programer       description of change
!       ====        =========       =====================
!     11/19/20       morrisH        original code
!========================================================
program MD
    implicit none
    integer :: NP, i, n, j
    double precision :: L, maxt, h, time, tol
    double precision, dimension(:,:), allocatable :: r, v, rbef
    real :: start, finish
    double precision :: T, vmax, P
    double precision :: TF

    ! parameter
    time = 0.d0
    NP = 100
    L = 8.d0
    maxt = 2.d-1
    h = 1.d-4
    tol = 1.d-17
    vmax = 0.d0
    TF = 1000.d0
    n = nint(maxt / h)

    allocate(r(NP, 2))
    allocate(rbef(NP, 2))
    allocate(v(NP, 2))

    call init(NP, L, r, v, vmax)
    ! call output(NP, L, r, v, time, T, P)

    call cpu_time(start)
    ! move first step
    rbef(i, :) = r(i, :)
    call verlet(NP, L, r, v, h)

    do
        do i = 1, n
            ! call verlet(NP, L, r, v, h)
            call predcorr(NP, L, r, v, h, rbef, tol)
            ! call output(NP, L, r, v, time, T, P)
            call pstatus(n, i, time, T, P)
            time = time + h
        end do

        call output(NP, L, r, v, time, T, P)
        ! rescale velocity
        do j = 1, NP
            v(j, :) = dsqrt((T + 1.d1) / T) * v(j, :)
        end do
        if (T.gt.TF) then; exit; end if
    end do
    call cpu_time(finish)

    write(*, *) 'cost :', finish-start

end program MD

subroutine init(NP, L, r, v, vmax)
    implicit none
    integer :: NP, i, j, num
    double precision :: L, r(NP, 2), v(NP, 2), vmax, dx, dy

    call random_seed()

    num = int(sqrt(dble(NP)))
    dx = L / (dble(num) + 1.d0)
    dy = L / (dble(num) + 1.d0)

    ! random position
    do i = 1, num
        do j = 1, num
            r(num*(i-1)+j, 1) = dble(i) * dx
            r(num*(i-1)+j, 2) = dble(j) * dy
        end do
    end do

    ! random velocity
    call random_number(v)
    v = (v - .5d0) * 2.d0 * vmax
end subroutine init

subroutine output(NP, L, r, v, time, T, P)
    implicit none
    integer :: NP, i, j
    double precision :: r(NP, 2), v(NP, 2), L, K, U, E, Px, Py, T, P, Cv
    double precision :: r1(2), r2(2), d, dx, dy, time
    double precision :: TT

    ! conpute some physical quantity
    K = 0.d0
    U = 0.d0
    Px = 0.d0
    Py = 0.d0
    T = 0.d0
    TT = 0.d0
    P = 0.d0
    do i = 1, NP
        r1 = r(i, :)
        K = K + 0.5d0 * (v(i, 1)**2 + v(i, 2)**2)
        Px = Px + v(i, 1)
        Py = Py + v(i, 2)
        T  = T + (v(i, 1)**2 + v(i, 2)**2)
        TT = TT + (v(i, 1)**2 + v(i, 2)**2)**2
        ! calculate potential energy
        do j = 1, i
            if (i.ne.j) then
                r2 = r(j, :)
                d = dsqrt((r1(1) - r2(1))**2 + (r1(2) - r2(2))**2)
                if (d.gt.(L/2.d0)) then
                    ! find nearest image
                    dx = r2(1) - r1(1)
                    dy = r2(2) - r1(2)
                    if (dx.gt.(L/2.d0))  then; dx = dx - L; end if
                    if (dy.gt.(L/2.d0))  then; dy = dy - L; end if
                    if (dx.lt.(-L/2.d0)) then; dx = dx + L; end if
                    if (dy.lt.(-L/2.d0)) then; dy = dy + L; end if
                    d = dsqrt(dx ** 2 + dy ** 2)
                    U = U + 4.d0 * ( (1.d0 / d)**12 - (1.d0 / d)*6 )
                    P = P + 0.5d0 * (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * d
                else
                    U = U + 4.d0 * ( (1.d0 / d)**12 - (1.d0 / d)*6 )
                    P = P + 0.5d0 * (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * d
                end if
            end if
        end do
    end do
    T = T / NP
    TT = TT / NP
    E = K + U
    P = (P + NP * T) / L**2
    Cv = NP / (1.d0 - (TT - T**2) / (NP * T**2))

    ! open(66, file='data/np49/Cv/r.dat', access='append', status='unknown')
    ! write(66, '(100e40.30)') r(:, 1)
    ! write(66, '(100e40.30)') r(:, 2)
    ! close(66)
    ! open(77, file='data/np49/Cv/v.dat', access='append', status='unknown')
    ! write(77, '(100e40.30)') v(:, 1)
    ! write(77, '(100e40.30)') v(:, 2)
    ! close(77)
    open(66, file='data/np100/Cv/info_alt.dat', access='append', status='unknown')
    write(66, '(9e40.30)') time, K, U, E, Px, Py, T, P, Cv
    close(66)

end subroutine output

subroutine verlet(NP, L, r, v, h)
    implicit none
    integer :: NP, i, j
    double precision :: L, r(NP, 2), v(NP, 2), rnew(NP, 2), vnew(NP, 2)
    double precision :: a1(2), a2(2), d, dx, dy, r1(2), r2(2)
    double precision :: h

    do i = 1, NP
        r1 = r(i, :)
        ! compute a(t)
        a1 = 0.d0
        do j = 1, NP
            if (i.ne.j) then
                r2 = r(j, :)
                d = dsqrt((r1(1) - r2(1))**2 + (r1(2) - r2(2))**2)
                if (d.gt.(L/2.d0)) then
                    ! find nearest image
                    dx = r2(1) - r1(1)
                    dy = r2(2) - r1(2)
                    if (dx.gt.(L/2.d0))  then; dx = dx - L; end if
                    if (dy.gt.(L/2.d0))  then; dy = dy - L; end if
                    if (dx.lt.(-L/2.d0)) then; dx = dx + L; end if
                    if (dy.lt.(-L/2.d0)) then; dy = dy + L; end if
                    d = dsqrt(dx ** 2 + dy ** 2)
                    a1 = a1 + (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * &
                              (/ -dx, -dy /) / d
                else
                    a1 = a1 + (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * &
                              (r1 - r2) / d
                end if
            end if
        end do
        rnew(i, :) = r(i, :) + v(i, :) * h + .5d0 * a1 * h ** 2

        ! compute a(t+h)
        a2 = 0.d0
        r1 = rnew(i, :)
        do j = 1, NP
            if (i.ne.j) then
                r2 = r(j, :)
                d = dsqrt((r1(1) - r2(1))**2 + (r1(2) - r2(2))**2)
                if (d.gt.(L/2.d0)) then
                    ! find nearest image
                    dx = r2(1) - r1(1)
                    dy = r2(2) - r1(2)
                    if (dx.gt.(L/2.d0))  then; dx = dx - L; end if
                    if (dy.gt.(L/2.d0))  then; dy = dy - L; end if
                    if (dx.lt.(-L/2.d0)) then; dx = dx + L; end if
                    if (dy.lt.(-L/2.d0)) then; dy = dy + L; end if
                    d = dsqrt(dx ** 2 + dy ** 2)
                    a2 = a2 + (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * &
                         (/ -dx, -dy /) / d
                else
                    a2 = a2 + (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * &
                         (r1 - r2) / d
                end if
            end if
        end do
        vnew(i, :) = v(i, :)  + h / 2.d0 * (a1 + a2)

        ! periodic bd
        if (rnew(i, 1) > L) then
            rnew(i, 1) = rnew(i, 1) - L
        elseif (rnew(i, 1) < 0.d0) then
            rnew(i, 1) = rnew(i, 1) + L
        end if
        if (rnew(i, 2) > L) then
            rnew(i, 2) = rnew(i, 2) - L
        elseif (rnew(i, 2) < 0.d0) then
            rnew(i, 2) = rnew(i, 2) + L
        end if
    end do
    r = rnew
    v = vnew
end subroutine verlet

subroutine predcorr(NP, L, r, v, h, rbef, tol)
    implicit none
    integer :: NP, i, j, k
    double precision :: L, r(NP, 2), v(NP, 2), rnew(NP, 2), vnew(NP, 2)
    double precision :: a1(2), a2(2), d, dx, dy, r1(2), r2(2)
    double precision :: h
    double precision :: rbef(NP, 2), rp(2), rc(2), vc(2), diff, tol


    do i = 1, NP
        ! predictor
        rp = rbef(i, :) + 2.d0 * v(i, :) * h
        r1 = r(i, :)
        ! compute a(t)
        a1 = 0.d0
        do j = 1, NP
            if (i.ne.j) then
                r2 = r(j, :)
                d = dsqrt((r1(1) - r2(1))**2 + (r1(2) - r2(2))**2)
                if (d.gt.(L/2.d0)) then
                    ! find nearest image
                    dx = r2(1) - r1(1)
                    dy = r2(2) - r1(2)
                    if (dx.gt.(L/2.d0))  then; dx = dx - L; end if
                    if (dy.gt.(L/2.d0))  then; dy = dy - L; end if
                    if (dx.lt.(-L/2.d0)) then; dx = dx + L; end if
                    if (dy.lt.(-L/2.d0)) then; dy = dy + L; end if
                    d = dsqrt(dx ** 2 + dy ** 2)
                    a1 = a1 + (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * &
                              (/ -dx, -dy /) / d
                else
                    a1 = a1 + (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * &
                              (r1 - r2) / d
                end if
            end if
        end do
        ! calculate a^p
        k = 0
        do
            k = k + 1
            ! compute a(t+h)
            a2 = 0.d0
            r1 = rp
            do j = 1, NP
                if (i.ne.j) then
                    r2 = r(j, :)
                    d = dsqrt((r1(1) - r2(1))**2 + (r1(2) - r2(2))**2)
                    if (d.gt.(L/2.d0)) then
                        ! find nearest image
                        dx = r2(1) - r1(1)
                        dy = r2(2) - r1(2)
                        if (dx.gt.(L/2.d0))  then; dx = dx - L; end if
                        if (dy.gt.(L/2.d0))  then; dy = dy - L; end if
                        if (dx.lt.(-L/2.d0)) then; dx = dx + L; end if
                        if (dy.lt.(-L/2.d0)) then; dy = dy + L; end if
                        d = dsqrt(dx ** 2 + dy ** 2)
                        a2 = a2 + (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * &
                             (/ -dx, -dy /) / d
                    else
                        a2 = a2 + (24.d0 / d) * (2.d0 * (1 / d)**12 - (1 / d)**6) * &
                             (r1 - r2) / d
                    end if
                end if
            end do
            ! corrector
            vc = v(i, :) + .5d0 * h * (a1 + a2)
            rc = r(i, :) + .5d0 * h * (v(i, :) + vc)

            ! compute error
            diff = dsqrt( (rc(1) - rp(1))**2 + (rc(2) - rp(2))**2 )
            ! output diff
            ! open(66, file='data/diff.dat', access='append', status='unknown')
            ! write(66, '(2e40.30)') dble(k), diff
            ! close(66)
            ! print *, k, diff
            if ((diff.le.tol).or.(k.ge.8)) then
                exit
            else
                rp = rc
            end if
        end do
        rnew(i, :) = rc
        vnew(i, :) = vc

        ! periodic bd
        if (rnew(i, 1) > L) then
            rnew(i, 1) = rnew(i, 1) - L
        elseif (rnew(i, 1) < 0.d0) then
            rnew(i, 1) = rnew(i, 1) + L
        end if
        if (rnew(i, 2) > L) then
            rnew(i, 2) = rnew(i, 2) - L
        elseif (rnew(i, 2) < 0.d0) then
            rnew(i, 2) = rnew(i, 2) + L
        end if
    end do
    rbef = r
    r = rnew
    v = vnew
end subroutine predcorr

subroutine pstatus(n, i, time, T, P)
    implicit none
    integer :: n, i
    double precision :: time, T, P
    write(*, '(1a, 1f6.2, 1a5, 1a5, 1f4.1, 1a, 1a, 1a5, 1f6.2, 1a5, 1f8.2)') &
    't:', time, '',  'left:', dble(n-i)/dble(n)*100.d0, '%', &
    '', 'T=', T, 'P=', P
end subroutine pstatus
```


import numpy as np
import plotly.graph_objects as go
from math import exp, log, sqrt

# Input points and rope length
P1 = np.array([-0.2, 0.1])
P2 = np.array([0.3, 0.0])
L = 0.65  # total length

def cosh(z): return (exp(z)+exp(-z))/2
def sinh(z): return (exp(z)-exp(-z))/2
def tanhi(z): return 0.5*log((1+z)/(1-z))

def solve_catenary(length: float) -> tuple[np.ndarray, np.ndarray]:
    dx = P2[0] - P1[0]
    dy = P2[1] - P1[1]
    xb = (P1[0] + P2[0]) / 2.0

    if length <= np.linalg.norm(P2 - P1):
        raise ValueError("Catenary length must exceed straight-line distance between points")
    if abs(dy / length) >= 1:
        raise ValueError("Length too short for vertical separation")

    r = sqrt(length**2 - dy**2) / dx
    A = sqrt(6*(r-1)) if r < 3.0 else np.log(2*r) + np.log(np.log(2*r))
    while abs(r-sinh(A)/A) > 1e-3:
        A -= (sinh(A)-r*A)/(cosh(A-r))

    a = dx / (2 * A)
    b = xb - a * tanhi(dy / length)
    c = P1[1] - a * cosh((P1[0] - b) / a)

    x_vals = np.linspace(P1[0], P2[0], 600)
    y_vals = np.array([a * cosh((x - b) / a) + c for x in x_vals])
    return x_vals, y_vals


x_vals, y_vals = solve_catenary(L)

fig = go.Figure()

fig.add_trace(go.Scatter(x=[P1[0], P2[0]],
                         y=[P1[1], P2[1]],
                         mode="markers",
                         name="Endpoints",
                         marker=dict(size=8, color="red")))

fig.add_trace(go.Scatter(x=x_vals, y=y_vals,
                         mode="lines",
                         name="Catenary",
                         line=dict(color="blue")))
fig.update_layout(
    title=f"Catenary Between Two Points (Length = {L:.3f})",
    xaxis_title="x",
    yaxis_title="y",
    template="plotly_white",
)


min_length = np.linalg.norm(P2 - P1) + 1e-6
length_values = np.linspace(min_length, 0.8, 25)
if L not in length_values:
    length_values = np.sort(np.append(length_values, L))

steps = []
for length_value in length_values:
    x_step, y_step = solve_catenary(length_value)
    steps.append(
        dict(
            method="update",
            args=[
                {"x": [fig.data[0].x, x_step], "y": [fig.data[0].y, y_step]},
                {"title": f"Catenary Between Two Points (Length = {length_value:.3f})"},
            ],
            label=f"{length_value:.3f}",
        )
    )

sliders = [
    dict(
        active=int(np.where(length_values == L)[0][0]),
        currentvalue={"prefix": "Length: "},
        pad={"t": 50},
        steps=steps,
    )
]

fig.update_layout(sliders=sliders)

#fig.show()
fig.write_html('assets/plotly/catenary.html')
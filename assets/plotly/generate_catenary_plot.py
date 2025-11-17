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

dx = P2[0] - P1[0]
dy = P2[1] - P1[1]
xb = (P1[0] + P2[0]) / 2.0

# r*A = sinh(A) solve (original incremental approach kept)
r = sqrt(L**2 - dy**2) / dx
A = 0.01
dA = 0.0001
while r*A >= sinh(A):
    A += dA
A -= dA

a = dx / (2*A)
b = xb - a * tanhi(dy / L)
c = P1[1] - a * cosh((P1[0] - b) / a)

# Sample curve
x_vals = np.linspace(P1[0], P2[0], 600)
y_vals = [a * cosh((x - b) / a) + c for x in x_vals]

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

fig.update_layout(title="Catenary Between Two Points (Interactive Plotly)",
                  xaxis_title="x",
                  yaxis_title="y",
                  template="plotly_white")

fig.show()
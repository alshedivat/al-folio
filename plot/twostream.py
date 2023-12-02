import numpy as np
import plotly.graph_objects as go
# Based on the provided image, we will generate a plot with two Gaussian pulses located at ±5 with width 1
# and two Gaussian pulses located at ±3 with width 2.


# Re-defining the Gaussian function
def gaussian(x, mean, std_dev):
    return (1 / (std_dev * np.sqrt(2 * np.pi))) * np.exp(
        -0.5 * ((x - mean) / std_dev) ** 2
    )


# Setting up the x-axis values
x_values = np.linspace(-10, 10, 400)

# Gaussian pulses
gaussian_plus_5 = gaussian(x_values, 5, 1)
gaussian_minus_5 = gaussian(x_values, -5, 1)
gaussian_plus_3 = gaussian(x_values, 3, 2)
gaussian_minus_3 = gaussian(x_values, -3, 2)

# Create the figure
fig = go.Figure()

# Adding the Gaussian pulses to the figure
fig.add_trace(
    go.Scatter(
        x=x_values,
        y=gaussian_plus_5,
        mode="lines",
        name=r"$t=0$",
        line=dict(color="#0092CC"),
    )
)

# Add an annotation for the first line (blue)
fig.add_annotation(
    x=5,
    y=np.max(gaussian_plus_5) + 0.05,
    text=r"$t=0$",
    showarrow=False,
    yshift=10,  # Shifts the text up by 10 pixels
    font=dict(color="#0092CC", size=18),
)

fig.add_trace(
    go.Scatter(
        x=x_values,
        y=gaussian_minus_5,
        mode="lines",
        line=dict(color="#0092CC"),
    )
)

fig.add_trace(
    go.Scatter(
        x=x_values,
        y=gaussian_plus_3,
        mode="lines",
        name=r"$t>0$",
        line=dict(dash="dash", color="red"),
    )
)

# Add an annotation for the first line (blue)
fig.add_annotation(
    x=3,
    y=np.max(gaussian_plus_3) + 0.05,
    text=r"$t>0$",
    showarrow=False,
    yshift=10,  # Shifts the text up by 10 pixels
    font=dict(color="red", size=18),
)

fig.add_trace(
    go.Scatter(
        x=x_values,
        y=gaussian_minus_3,
        mode="lines",
        line=dict(dash="dash", color="red"),
        text="$t>0$",
        textposition="top center",
    )
)

fig.update_layout(
    xaxis=dict(
        title=r"$v_x$",
        title_font=dict(size=20, color="#779933"),
        showgrid=False,  # Disables x-axis grid lines
        showline=False,  # Removes the axis line
        zeroline=False,  # Removes the zero line
        tickmode="array",  # Specifies custom tick mode
        tickvals=[],  # Provides no tick values
        ticktext=[],  # Provides no tick text
        tickfont=dict(color="#779933"),
    ),
    yaxis=dict(
        title=r"$f(v_x)$",
        title_font=dict(size=20, color="#779933"),
        showgrid=False,  # Disables y-axis grid lines
        showline=False,  # Removes the axis line
        zeroline=False,  # Removes the zero line
        tickmode="array",  # Specifies custom tick mode
        tickvals=[],  # Provides no tick values
        ticktext=[],  # Provides no tick text
        tickfont=dict(color="#779933"),
    ),
    plot_bgcolor="rgba(0, 0, 0, 0)",
    paper_bgcolor="rgba(0, 0, 0, 0)",
    showlegend=False,
    margin=dict(l=0, r=0, t=30, b=0),  # Adjust margins to minimize whitespace
    font=dict(size=20),  # Set global font size
)

# Annotate the origin
fig.add_annotation(
    x=0, y=-0.02, text="0", showarrow=False, font=dict(color="#779933", size=20)
)

# Plot the figure and save as HTML
fig.show()
fig.write_html("assets/plotly/twostream.html", include_mathjax="cdn")
fig.write_image("assets/img/twostream/twostream.png")

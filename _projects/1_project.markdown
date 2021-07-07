 ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---
<head>
    <meta charset='utf-8'>
    <meta content='IE=edge' http-equiv='X-UA-Compatible'>
    <title>Stippling</title>
    <meta content='width=device-width, initial-scale=1' name='viewport'>
    <!-- Compiled and minified CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    <link href="/al-folio/assets/css/form.css" rel="stylesheet">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <style>
        .container {
            font-size: large;
        }
    </style>
</head>

<div class="container">

    <div class="row">
        <h3>Stippling of 2D Scalar Fields</h3>
        <h4>by Lukas Herzberger and Jakob Troidl</h4>
    </div>

    <div class="row">
        <div class="col s8">
            Based on the paper <a href="https://ieeexplore.ieee.org/document/8667696"><b>Stippling of 2D Scalar
            Fields</b></a> by Görtler et al., we created a web based tool to stipple 2D scalar fields.
        </div>
        <div class="col s4">
            <form action="https://stippling.herokuapp.com/">
                <input type="submit" value="Let's stipple!"/>
            </form>
        </div>
    </div>

    <div class="row">
        <div class="col s6">
            <img src="/al-folio/assets/img/E193-02.png" style="width: 100%;" alt="hello">
            <figcaption>Original image</figcaption>
        </div>
        <div class="col s6">
            <img alt="image of a heightmap" src="/al-folio/assets/img/cg-logo.png" style="width: 100%;">
            <figcaption>Stippled version of the image</figcaption>
        </div>
    </div>
    <div class="row">
        <h4>Description</h4>
        <p>Our interactive web application is designed to stipple a wide range of the 2D scalar fields and is publicly
            accessible <a href="https://stippling.herokuapp.com/">here</a>. We support two data formats.
            First, .csv or .json files are supported to stipple discrete data sets such as data with spatial context.
            For example, the image below shows a stippled representation of severe car accidents in the United States during November 2020. We also provide a detailed view for these data sets by showing the respective Voronoi
            region
            and the data points when hovering over a stipple. For such data sets, x and y (or lon/lat) attributes must be specified to render the data points correctly. </p>
        <p> The web application lets user tuned stippling parameters via the top left input panel. This panel allows setting the data set,
            adjusting the stipple size, the color map and enabling/disabling contours (mach banding).

        </p>

        <div class="col s12">
            <img alt="eggholder_machbanding" src="/al-folio/assets/img/example.PNG" style="width: 100%;">
            <figcaption>Stippled visualization of severe card accidents in the US during November 2020.
                When hovering over a specific stipple the detail view displays the individual accidents in the
                respective Voronoi region.
            </figcaption>
        </div>

    </div>

    <div class="row">
        <br>
        <p>
            Second, we stipple continuous data sets by supporting images as an input. We first convert the images to greyscale images and then use them as a density function with values on a regular grid.
            The visualization below illustrates this approach by showing a stippled version of Italy's height map.
        </p>
        <div class="col s12">
            <img alt="eggholder_machbanding" src="/al-folio/assets/img/italy.png" style="width: 100%;">
            <figcaption> Stippled visualization of a height map of italy. Red big stipples indicate a high altitude and small blue dots a low altitude. </figcaption>
        </div>
    </div>

    <div class="row">
        <br>
        <h4>Contours</h4>
        <p>To highlight the contours of 2D scalar fields, we have implemented mach banding as described in the paper.
            Below we show a comparison between a stippled visualization of the eggholder function without mach banding and with mach banding.
            The contours are clearly visible.
        </p>

    </div>

    <div class="row">
        <div class="col s6">
            <img alt="eggholder" src="/al-folio/assets/img/eggholder-stippled.png" style="width: 100%;">
            <figcaption>The eggholder function stippled without mach banding.</figcaption>
        </div>
        <div class="col s6">
            <img alt="eggholder_machbanding" src="/al-folio/assets/img/eggholder-stippled-contours.png" style="width: 100%;">
            <figcaption>The eggholder function stippled using mach banding. The contours are clearly visible.
            </figcaption>
        </div>
    </div>

    <div class="row">
        <h4>Implementation</h4>
        <p>We implemented the application using <a href="https://nodejs.org/en/"><b>Node.js</b></a>, <a href="https://d3js.org/"><b>D3.js</b></a> and <a
                href="https://www.javascript.com/"><b>JavaScript</b></a>. We have deployed our application with <a
                href="https://www.heroku.com/about"><b>Heroku</b></a>. The documentation was generated by <a
                href="https://jsdoc.app/"><b>JsDoc</b></a>.
            Data cleaning and processing was in part done in <a href="https://www.python.org/"><b>Python</b></a>.</p>

    </div>

    <div class="row">
        <h4>Links</h4>
        <p>&#128202; <a href="https://stippling.herokuapp.com/">Program</a></p>
        <p>&#128187; <a href="https://github.com/jakobtroidl/vis2">Code</a></p>
        <p>&#128203; <a href="https://jakobtroidl.github.io/vis2/">Documentation</a></p>
    </div>


    <div class="row">
        <h4>References</h4>
        <p>Görtler, J., Spicker, M., Schulz, C., Weiskopf, D. and Deussen, O., 2019. Stippling of 2D scalar fields. IEEE
            transactions on visualization and computer graphics, 25(6), pp.2193-2204. <a
                    href="https://ieeexplore.ieee.org/document/8667696">Download</a>
        </p>
        <p> Datasets:
            <a href="https://www.kaggle.com/sobhanmoosavi/us-accidents">US accidents</a>,
            <a href="https://www.kaggle.com/noaa/severe-weather-data-inventory">hail storms</a>,
            <a href="http://viewfinderpanoramas.org/">topological data</a>,
            <a href="https://www.cg.tuwien.ac.at/staff/EduardGr%C3%B6ller">Meister</a>,
            <a href="https://www.cg.tuwien.ac.at/">CG-Logo</a>
        </p>
    </div>


</div>

<html>
<head>
    <meta charset="utf-8">

    <title>Zeinalipour's Talks</title>

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <!-- Bootstrap -->
    <link href="css3/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/custom.css"/>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="../js3/html5shiv.js"></script>
    <script src="../js3/respond.min.js"></script>
    <![endif]-->

    <script>
    function backAway(){
        //if it was the first page
        if(history.length === 1){
            window.location = "../index.html"
        } else {
            window.history.back();
        }
    }
    </script>

    <script src="js3/jquery.min.js"></script>
    <script type="text/javascript" src="js3/arrow78.js"></script>
    <script type="text/javascript" src="js3/arrow79.js"></script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.isotope.min.js"></script>
    <script type="text/javascript" src="js/jquery.tipsy.js"></script>
    <script type="text/javascript" src="js/jquery.fancybox-1.3.4.pack.js"></script>
    <script type="text/javascript" src="js/custom.js"></script>
    </head>

    <body style="padding: 20px">

    <div class="container">
    <div class="row">

    <div id="publications">
    <p>
    <H2><a onClick="backAway();">Zeinalipour's</a> Talks</H2>

    <!-- Resume -->
    <div id="code">
        <div class="timeline-section-code">
            <!-- Timeline for Publications  -->

            <?php

                //error_reporting(E_ALL);
                // ini_set('display_errors', '1');

                $sortby = array('invited','english', 'greek');
                $sortbyTitle = array('Invited Talks','Other Talks', 'Talks in Greek');

                include './presentations/BibTex.php';
                /*

                Enter the location of your BibTex file

                */
                $bibTexFile = 'http://dmsl.cs.ucy.ac.cy/presentations/demo.txt';

                $bibTex = new ClassTeX_Parser();
                $bibTex->parser($file = $bibTexFile);
            ?>

        </div>
    </div>

</body>
</html>

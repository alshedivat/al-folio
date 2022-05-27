---
layout: page
permalink: /eng-102-calc/
title: Eng 102 Calculator
description: 
nav: false
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ENG 102 Grade Calculator</title>
    <!--CSS File-->
    <link rel="stylesheet" type="text/css" href="assets\css\eng102calcStyle.css">
</head>
<body>
    <div class="container">
        <div class="left-box">
            <h1>result</h1>
            <div class="p-g-t">
                <h2>percentage - <span class="per"></span></h2>
                <h2>grade - <span class="gra"></span></h2>
                <h2>total - <span class="to"></span></h2>
            </div>
        </div>
        <div class="content">
            <div class="right-box">
                <input type="number" id="libtask" placeholder="Library Skills Task (x/10) (%5)">
                <input type="number" id="essay" placeholder="Academic Essay (x/22) (%20)">
                <input type="number" id="presentation" placeholder="Oral Presentation (x/24) (%20)">
                <input type="number" id="outline" placeholder="Research Paper Outline (x/15) (%10)">
                <input type="number" id="paper" placeholder="Research Paper (x/23) (%30)">
                <input type="number" id="interview" placeholder="End of Course Interview (x/60) (%15)">
                <button type="button" onclick="show_result()">show result</button>
            </div>
        </div>
        <div class="result">
            <h2></h2>
        </div>
    </div>
    

    <!-- JS FILE -->
    <script src="assets\js\eng102calc.js"></script>
</body>
</html>
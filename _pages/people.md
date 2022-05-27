---
layout: page
permalink: /people/
title: People
description: 
nav: false
---

<head> <meta charset="utf-8"> <link rel="stylesheet" type="text/css"
href="styles.css"> <title>Center for Health Information Technology
</title> 
	<script type="text/javascript">
	function calculate()
	{
		var x=document.getElementById("result1").innerText;
		var y=document.getElementById("result2").innerText;
		var z=document.getElementById("result3").innerText;
		var a=document.getElementById("result4").innerText;
		var result1=parseFloat(x) + parseFloat(y) + parseFloat(z) 
		+ parseFloat(a); // conversion to numbers; this is necessary for +, other    operators will automatically convert 
		var result5=x%y;
		
		//build a string first and then display it all together.
		//don't forget HTML tags in your output!

		var html="<p>Your GPA is: "+result1/4+"</p>"; 
	


		
		document.getElementById("total").innerHTML=html;
	}
	
	
	</script>
</head>

<body>

<h1> <a href="http://kennesaw.edu "> <img src="images/ksu.jpg" alt="KSU
    Graphic"/> </a>CCSE Graduate Certificate in Health Information
    Technology<a href="http://kennesaw.edu "> <img src="images/ksu.jpg"
    alt="KSU Graphic"/> </a> 
</h1>

<nav> <a href="index.html">Home</a> | <a
    href="faculty.html"> Faculty</a> | <a href="third.html">
    Miscellaneous</a> 
</nav>

<p>The summer is coming and Cert HIT has some student assistant positions open. 
In order to be considered for such a position, a student has to complete the following 
4 classes and have an average grade of 3.5 or above: 
IT 3503 Foundation of HIT, IT 4153 Advanced Database, IT 5443 Web Development, & IT 5413 
Software Design and Development. Please enter the grades you have received in the four
classes.
</p>

<script language="JavaScript">

function calculateGpa (form) {
    var gpa = form.gpa1.value;

        if (gpa == "A") {
             gpa = 4;
             }
        if (gpa == "B") {
             gpa = 3;
             }
        if (gpa == "C") {
             gpa = 2;
             }
        if (gpa == "D") {
             gpa = 1;
        	}
        if (gpa == "F") {
             gpa = 0;
        	}
        if (gpa == "a") {
             gpa = 4;
             }
        if (gpa == "b") {
             gpa = 3;
             }
        if (gpa == "c") {
             gpa = 2;
             }
        if (gpa == "d") {
             gpa = 1;
        	}
        if (gpa == "f") {
             gpa = 0;
        	}
    document.getElementById("result1").innerHTML = gpa;
}
</script>


<body>

<form action="" id="it3503">Enter your grade in the form of a letter grade for class IT 3503:<br>

<input type="text" name="gpa1" value="">
<input type="button" name="button" value="Calculate" onClick="calculateGpa(this.form)">
</form>
<div id="result1"></div>


<script language="JavaScript">

function calculateGpa2 (form) {
    var gpa = form.gpa2.value;

        if (gpa == "A") {
             gpa = 4;
             }
        if (gpa == "B") {
             gpa = 3;
             }
        if (gpa == "C") {
             gpa = 2;
             }
        if (gpa == "D") {
             gpa = 1;
        	}
        if (gpa == "F") {
             gpa = 0;
        	}
        if (gpa == "a") {
             gpa = 4;
             }
        if (gpa == "b") {
             gpa = 3;
             }
        if (gpa == "c") {
             gpa = 2;
             }
        if (gpa == "d") {
             gpa = 1;
        	}
        if (gpa == "f") {
             gpa = 0;
        	}
    document.getElementById("result2").innerHTML = gpa;
}
</script>


<body>

<form action="" id="it4153">Enter your grade in the form of a letter grade for class IT 4153:<br>

<input type="text" name="gpa2" value="">
<input type="button" name="button" value="Calculate" onClick="calculateGpa2(this.form)">
</form>
<div id="result2"></div>


<script language="JavaScript">
function calculateGpa3 (form) {
    var gpa = form.gpa3.value;

        if (gpa == "A") {
             gpa = 4;
             }
        if (gpa == "B") {
             gpa = 3;
             }
        if (gpa == "C") {
             gpa = 2;
             }
        if (gpa == "D") {
             gpa = 1;
        	}
        if (gpa == "F") {
             gpa = 0;
        	}
        if (gpa == "a") {
             gpa = 4;
             }
        if (gpa == "b") {
             gpa = 3;
             }
        if (gpa == "c") {
             gpa = 2;
             }
        if (gpa == "d") {
             gpa = 1;
        	}
        if (gpa == "f") {
             gpa = 0;
        	}
    document.getElementById("result3").innerHTML = gpa;
}
</script>


<body>

<form action="" id="it5443">Enter your grade in the form of a letter grade for class IT 5443:<br>

<input type="text" name="gpa3" value="">
<input type="button" name="button" value="Calculate" onClick="calculateGpa3(this.form)">
</form>
<div id="result3"></div>


<script language="JavaScript">
function calculateGpa4(form) {
    var gpa = form.gpa4.value;

        if (gpa == "A") {
             gpa = 4;
             }
        if (gpa == "B") {
             gpa = 3;
             }
        if (gpa == "C") {
             gpa = 2;
             }
        if (gpa == "D") {
             gpa = 1;
        	}
        if (gpa == "F") {
             gpa = 0;
        	}
        if (gpa == "a") {
             gpa = 4;
             }
        if (gpa == "b") {
             gpa = 3;
             }
        if (gpa == "c") {
             gpa = 2;
             }
        if (gpa == "d") {
             gpa = 1;
        	}
        if (gpa == "f") {
             gpa = 0;
        	}
    document.getElementById("result4").innerHTML = gpa;


}
</script>


<body>

<form action="" id="it5413">Enter your grade in the form of a letter grade for class IT 5413:<br>

<input type="text" name="gpa4" value="">
<input type="button" name="button" value="Calculate" onClick="calculateGpa4(this.form)">
</form>
<div id="result4"></div>
<br>
<input type="button" id="final" name="button" value="Calculate" onClick="calculate()">






<div id="total"></div>
<br><br><br><br><br> <br><br><br><br><br><br>
<div id="result"></div>
</body>


</html>
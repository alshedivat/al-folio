function show_result(){
    let libtask = document.querySelector("#libtask").value;
    let essay = document.querySelector("#essay").value;
    let presentation = document.querySelector("#presentation").value;
    let outline = document.querySelector("#outline").value;
    let paper = document.querySelector("#paper").value;
    let interview = document.querySelector("#interview").value;

    let total = parseFloat(libtask) / 10 * 5 + parseFloat(essay) / 22 * 20 + parseFloat(presentation) / 24 * 20 + parseFloat(outline) / 15 * 10 + parseFloat(paper) / 23 * 30 + parseFloat(interview) / 60 * 15;

    if(total >= 100){
        document.querySelector(".gra").innerHTML = "shakespeare";
    }
    else if(total >= 94.5){
        document.querySelector(".gra").innerHTML = "a";
    }
    else if(total >=89.5){
        document.querySelector(".gra").innerHTML = "a-";
    }
    else if(total >=85.5){
        document.querySelector(".gra").innerHTML = "b+";
    }
    else if(total >=82.5){
        document.querySelector(".gra").innerHTML = "b";
    }
    else if(total >=77.5){
        document.querySelector(".gra").innerHTML = "b-";
    }
    else if(total >=73.5){
        document.querySelector(".gra").innerHTML = "c+";
    }
    else if(total >=69.5){
        document.querySelector(".gra").innerHTML = "c";
    }
    else if(total >=66.5){
        document.querySelector(".gra").innerHTML = "c-";
    }
    else if(total >=62.5){
        document.querySelector(".gra").innerHTML = "d+";
    }
    else if(total >=58.5){
        document.querySelector(".gra").innerHTML = "d";
    }
    else {
        document.querySelector(".gra").innerHTML = "f";
    }

    document.querySelector(".to").innerHTML = total.toFixed(2);;
    document.querySelector(".per").innerHTML = total.toFixed(2);;

    if(total >= 77.5){
        document.querySelector(".result h2").innerHTML = "CONGRAGULATIONS"
    }

}
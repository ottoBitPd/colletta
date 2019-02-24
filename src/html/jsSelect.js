// $("#general*i*").change(function(){
//     switch($(this).val()){
//         case 'A':
//
//             $("#aggettivo*i*").change(function() {
//                 $("#aggettivo*i*").show();
//                 switch($(this).val()){
//                     case 'AP':
//                         $("#genere*i*").show();
//                         $("#persona*i*").hide();
//                         $("#numero*i*").show();
//                         $("#tempo*i*").hide();
//                         break;
//                     case 'DD':
//                         $("#genere*i*").show();
//                         $("#persona*i*").hide();
//                         $("#numero*i*").show();
//                         $("#tempo*i*").hide();
//                         break;
//                     case 'DI':
//                         $("#genere*i*").show();
//                         $("#persona*i*").hide();
//                         $("#numero*i*").show();
//                         $("#tempo*i*").hide();
//                         break;
//                     case 'N':
//                         $("#genere*i*").hide();
//                         $("#persona*i*").hide();
//                         $("#numero*i*").hide();
//                         $("#tempo*i*").hide();
//                         break;
//                     case 'NO':
//                         $("#genere*i*").show();
//                         $("#persona*i*").hide();
//                         $("#numero*i*").show();
//                         $("#tempo*i*").hide();
//                         break;
//                     case 'DQ':
//                         $("#genere*i*").show();
//                         $("#persona*i*").hide();
//                         $("#numero*i*").show();
//                         $("#tempo*i*").hide();
//                         break;
//                     case 'DE':
//                         $("#genere*i*").show();
//                         $("#persona*i*").hide();
//                         $("#numero*i*").show();
//                         $("#tempo*i*").hide();
//                         break;
//                 }
//             }
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#interiezione*i*").hide();
//             $("#pronome*i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             break;
//         case 'B':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").show();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#interiezione*i*").hide();
//             $("#pronome*i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             break;
//         case 'C':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").show();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#interiezione*i*").hide();
//             $("#pronome*i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             break;
//         case 'E':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").show();
//             $("#punteggiatura*i*").hide();
//             $("#interiezione*i*").hide();
//             $("#pronome*i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             break;
//         case 'F':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").show();
//             $("#interiezione*i*").hide();
//             $("#pronome*i**i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             $("#tempo*i*").hide();
//             $("#genere*i*").show();
//             $("#numero*i*").show();
//             $("#persona*i*").hide();
//             break;
//         case 'I':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#interiezione*i*").show();
//             $("#pronome*i**i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             break;
//         case 'P':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#pronome*i*").show();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             break;
//         case 'R':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#pronome*i**i*").hide();
//             $("#articolo*i*").show();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             break;
//         case 'S':
//             $("#articolo*i*").hide();
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#pronome*i**i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").show();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             break;
//         case 'V':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#interiezione*i*").hide();
//             $("#pronome*i**i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").show();
//             $("#altro*i*").hide();
//             break;
//         case 'X':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#interiezione*i*").hide();
//             $("#pronome*i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").show();
//             break;
//         case '-':
//             $("#aggettivo*i*").hide();
//             $("#avverbio*i*").hide();
//             $("#congiunzione*i*").hide();
//             $("#preposizione*i*").hide();
//             $("#punteggiatura*i*").hide();
//             $("#interiezione*i*").hide();
//             $("#pronome*i*").hide();
//             $("#articolo*i*").hide();
//             $("#nome*i*").hide();
//             $("#verbo*i*").hide();
//             $("#altro*i*").hide();
//             $("#tempo*i*").hide();
//             $("#genere*i*").hide();
//             $("#numero*i*").hide();
//             $("#persona*i*").hide();
//             break;
//     }
// });

function show(idElement){
    document.getElementById(idElement).style.display = "block";
}
function hide(idElement){
    document.getElementById(idElement).style.display = "none";
}
function general(i){
    alert("general");
    var x = document.getElementById("general"+i).value;
    switch(x){
        case 'A':
            show("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'B':
            hide("aggettivo"+i);
            show("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'C':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            show("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'E':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            show("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'F':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            show("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'P':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            show("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'R':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            show("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
        case 'S':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            show("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'V':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            show("verbo"+i);
            show("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'X':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        default:
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
    }
}
function aggettivo(i){
    alert("aggettivo");
    var x = document.getElementById("aggettivo"+i).value;
    switch(x){
        case 'N':
            hide("genere"+i);
            hide("numero"+i);
            break;
        default:
            show("genere"+i);
            show("numero"+i);
            break;
    }
}
function preposizione(){
    alert("preposizione");
    var x = document.getElementById("preposizione"+i).value;
    switch(x){
        case 'E':
            hide("genere"+i);
            hide("numero"+i);
            break;
        default:
            show("genere"+i);
            show("numero"+i);
            break;
    }
}
function pronome(i){
    alert("pronome");
    var x = document.getElementById("pronome"+i).value;
    switch(x){
        case 'PE':
            show("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
        case 'PC':
            show("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
        default:
            hide("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
    }
}
function nome(i){
    alert("nome");
    var x = document.getElementById("nome"+i).value;
    switch(x){
        case 'S':
            show("genere"+i);
            show("numero"+i);
            break;
        default:
            hide("genere"+i);
            hide("numero"+i);
            break;
    }
}
function verbo(i){
    alert("verbo");
    var x = document.getElementById("verbo"+i).value;
    switch(x){
        case 'VA':
            var s= document.getElementById("tempo"+i);
            alert("VA: "+s.options[s.selectedIndex].value);
            hide("pp");
            document.getElementById("tempo"+i).selectedIndex=0;
            break;
        case 'VM':
            hide("pp");
            document.getElementById("tempo"+i).selectedIndex=0;
            break;
        default:
            show("pp");
            break;
    }
}
function tempo(i){
    alert("tempo");
    var x = document.getElementById("tempo"+i).value;
    switch(x){
        case 'f':
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'g':
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'pp':
            hide("persona"+i);
            hide("genere"+i);
            show("numero"+i);
            break;
        case 'ps':
            hide("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
        default:
            show("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
    }
}


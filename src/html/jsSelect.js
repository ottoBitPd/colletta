$("#general*i*").change(function(){
    switch($(this).val()){
        case 'A':

            $("#aggettivo*i*").change(function() {
                $("#aggettivo*i*").show();
                switch($(this).val()){
                    case 'AP':
                        $("#genere*i*").show();
                        $("#persona*i*").hide();
                        $("#numero*i*").show();
                        $("#tempo*i*").hide();
                        break;
                    case 'DD':
                        $("#genere*i*").show();
                        $("#persona*i*").hide();
                        $("#numero*i*").show();
                        $("#tempo*i*").hide();
                        break;
                    case 'DI':
                        $("#genere*i*").show();
                        $("#persona*i*").hide();
                        $("#numero*i*").show();
                        $("#tempo*i*").hide();
                        break;
                    case 'N':
                        $("#genere*i*").hide();
                        $("#persona*i*").hide();
                        $("#numero*i*").hide();
                        $("#tempo*i*").hide();
                        break;
                    case 'NO':
                        $("#genere*i*").show();
                        $("#persona*i*").hide();
                        $("#numero*i*").show();
                        $("#tempo*i*").hide();
                        break;
                    case 'DQ':
                        $("#genere*i*").show();
                        $("#persona*i*").hide();
                        $("#numero*i*").show();
                        $("#tempo*i*").hide();
                        break;
                    case 'DE':
                        $("#genere*i*").show();
                        $("#persona*i*").hide();
                        $("#numero*i*").show();
                        $("#tempo*i*").hide();
                        break;
                }
            }
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#interiezione*i*").hide();
            $("#pronome*i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            break;
        case 'B':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").show();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#interiezione*i*").hide();
            $("#pronome*i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            break;
        case 'C':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").show();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#interiezione*i*").hide();
            $("#pronome*i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            break;
        case 'E':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").show();
            $("#punteggiatura*i*").hide();
            $("#interiezione*i*").hide();
            $("#pronome*i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            break;
        case 'F':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").show();
            $("#interiezione*i*").hide();
            $("#pronome*i**i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            $("#tempo*i*").hide();
            $("#genere*i*").show();
            $("#numero*i*").show();
            $("#persona*i*").hide();
            break;
        case 'I':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#interiezione*i*").show();
            $("#pronome*i**i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            break;
        case 'P':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#pronome*i*").show();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            break;
        case 'R':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#pronome*i**i*").hide();
            $("#articolo*i*").show();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            break;
        case 'S':
            $("#articolo*i*").hide();
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#pronome*i**i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").show();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            break;
        case 'V':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#interiezione*i*").hide();
            $("#pronome*i**i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").show();
            $("#altro*i*").hide();
            break;
        case 'X':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#interiezione*i*").hide();
            $("#pronome*i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").show();
            break;
        case '-':
            $("#aggettivo*i*").hide();
            $("#avverbio*i*").hide();
            $("#congiunzione*i*").hide();
            $("#preposizione*i*").hide();
            $("#punteggiatura*i*").hide();
            $("#interiezione*i*").hide();
            $("#pronome*i*").hide();
            $("#articolo*i*").hide();
            $("#nome*i*").hide();
            $("#verbo*i*").hide();
            $("#altro*i*").hide();
            $("#tempo*i*").hide();
            $("#genere*i*").hide();
            $("#numero*i*").hide();
            $("#persona*i*").hide();
            break;
    }
});

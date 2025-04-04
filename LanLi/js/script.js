//All icons were derived from https://icons8.com (Icons8)
//The createTable aspect (lines 275 - 300) was inspired by the https://www.codedrome.com/creating-html-tables-with-javascript/ table function tutorial
//The exportData function (lines 437 - 443) was derived from HA Codes' video "Export HTML table to excel" -- https://www.youtube.com/watch?v=a79M3PS6-NI&ab_channel=HACodes
//sheet.js was provided by xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com



//Variables (Inputs)
var currentLog;
var currentLang = 1;
var currentList;
var columnNum;
var multiplierTemp = 0;

var temporaryListName;
var stopLocation;

//Global temporary data arrays
var headingsList = [];
var informationList = [];


//---------------------------- LOGIN ----------------------------

//Input error visibility
function errTime(){
    document.getElementById('error').setAttribute("class", "errInvis");
}

function errLinTime(){
    document.getElementById('errorLin').setAttribute("class", "errInvis");
}


//Login
function logIn(){
    establish();
    const user = document.getElementById('Username').value;
    const pass = document.getElementById('Password').value;
    const userDataLog = localStorage.getItem("userdataLS");
    const passDataLog = localStorage.getItem("passdataLS");
    var userList = userDataLog.split(',');
    var passList = passDataLog.split(',');
    
    for (var a = 0; a < userList.length; a++){
        if (user == userList[a]){
            if (pass == passList[a]){
                currentLog = user;
                document.getElementById('loginSc').style.display='none'
                document.getElementById('homeSc').style.display='block'
                userAvail();
                var temp = localStorage.getItem("colorLS");
                temp = temp.split(',')

                for (var b = 0; b<temp.length; b++){
                    if (currentLog == temp[b]){
                        document.getElementById('bod').style.backgroundColor = temp[b+1]
                        document.getElementById('bod').style.color = temp[b+2]
                        document.getElementById('borA').style.borderColor = temp[b+2]
                        document.getElementById('borB').style.borderColor = temp[b+2]
                        document.getElementById('colPickA').value = temp[b+1]
                        document.getElementById('colPickB').value = temp[b+2]
                    }
                }

                break;
            } else {
                document.getElementById("error").setAttribute("class", "errVis");
                document.getElementById('error').innerHTML = "The following password was not found, please try again :>";
                setTimeout(errTime, 2100);
                document.getElementById('Username').value =''
                document.getElementById('Password').value =''
                break;
            }
        }
        if (a == userList.length-1){
            document.getElementById("error").setAttribute("class", "errVis");
            document.getElementById('error').innerHTML = "The following user was not found, please try again :>";
            setTimeout(errTime, 2100);
            document.getElementById('Username').value =''
            document.getElementById('Password').value =''
        }
    }
}


//Account creation
function create(){
    establish();
    const newuser = document.getElementById('Username').value;
    const newpass = document.getElementById('Password').value;
    const userDataLog = localStorage.getItem("userdataLS");
    const passDataLog = localStorage.getItem("passdataLS");
    var userList = userDataLog.split(',');
    var passList = passDataLog.split(',');

    const colorDataLog = localStorage.getItem("colorLS");
    var colorList = colorDataLog.split(',');

    var existence = false;
    if (newuser != ''){

        for (var i = 0; i < userList.length; i++){            
            if (newuser == userList[i]){
                existence = true
            }
        }

        if (existence == false){
            if (newpass != ''){   
                userList.push(newuser);
                passList.push(newpass);
                colorList.push(newuser)
                colorList.push('#395959');
                colorList.push('#202020');
                localStorage.setItem('userdataLS', userList.join());
                localStorage.setItem('passdataLS', passList.join());
                localStorage.setItem('colorLS', colorList.join());
                document.getElementById('Username').value =''
                document.getElementById('Password').value =''
            } else {
                document.getElementById("error").setAttribute("class", "errVis");
                document.getElementById('error').innerHTML = "Please make sure to establish both a username and a password for your account :>";
                setTimeout(errTime, 2100);
            }
        } else {
        document.getElementById("error").setAttribute("class", "errVis");
        document.getElementById('error').innerHTML = "This username has already been taken, please select a different username";
        setTimeout(errTime, 2100);
        }
    } else {
        document.getElementById("error").setAttribute("class", "errVis");
        document.getElementById('error').innerHTML = "Please make sure to establish both a username and a password for your account :>";
        setTimeout(errTime, 2100);
    }
   
}


//---------------------------- PAGE-LINKING ----------------------------

function table_home(){
    document.getElementById('tableSc').style.display = 'none';
    document.getElementById('homeSc').style.display = 'block';
}

function create_home(){
    document.getElementById('createSc').style.display = 'none';
    document.getElementById('homeSc').style.display = 'block';
    document.getElementById('list_name_input').value =''
    document.getElementById('column_num_input').value =''
}

function headers_create(){
    document.getElementById('headersSc').style.display = 'none';
    document.getElementById('createSc').style.display = 'block';
}

function headers_home(){
    document.getElementById('headersSc').style.display = 'none';
    document.getElementById('homeSc').style.display = 'block';
}

function update_table(){
    document.getElementById('updateSc').style.display = 'none';
    document.getElementById('tableSc').style.display = 'block';
}

function table_update(){
    document.getElementById('tableSc').style.display = 'none';
    document.getElementById('updateSc').style.display = 'block';
}

function home_settings(){
    document.getElementById('homeSc').style.display = 'none';
    document.getElementById('settingsSc').style.display = 'block';
}

function settings_home(){
    document.getElementById('settingsSc').style.display = 'none';
    document.getElementById('homeSc').style.display = 'block';
}

function table_delete(){
    document.getElementById('tableSc').style.display = 'none';
    document.getElementById('deleteSc').style.display = 'block';
}

function delete_table(){
    document.getElementById('deleteSc').style.display = 'none';
    document.getElementById('tableSc').style.display = 'block';
}

function delete_warning(){
    document.getElementById('deleteSc').style.display = 'none';
    document.getElementById('warningSc').style.display = 'block';
}

function warning_delete(){
    document.getElementById('warningSc').style.display = 'none';
    document.getElementById('deleteSc').style.display = 'block';
}

function home_create(){
    document.getElementById('homeSc').style.display = 'none';
    document.getElementById('createSc').style.display = 'block';
}

function delete_lineDel(){
    document.getElementById('deleteSc').style.display = 'none';
    document.getElementById('lineDelSc').style.display = 'block';
}

function lineDel_delete(){
    document.getElementById('lineDelSc').style.display = 'none';
    document.getElementById('deleteSc').style.display = 'block';
    document.getElementById('lineNum').value =''

}

function lineDel_table(){
    document.getElementById('lineDelSc').style.display = 'none';
    document.getElementById('tableSc').style.display = 'block';
}

function warning_home(){
    document.getElementById('warningSc').style.display = 'none';
    document.getElementById('homeSc').style.display = 'block';
}

function home_table(){
    document.getElementById('homeSc').style.display = 'none';
    document.getElementById('tableSc').style.display = 'block';
}

function create_headers(){
    document.getElementById('createSc').style.display = 'none';
    document.getElementById('headersSc').style.display = 'block';
}


//---------------------------- LISTS ----------------------------

//Lists establisher
function establish(){
    if (localStorage.getItem("userdataLS") == null){
        localStorage.setItem("userdataLS", "hashi")
        localStorage.setItem("passdataLS", "jl12")
    }
    if (localStorage.getItem("genlistLS") == null){
        localStorage.setItem("genlistLS", "hashi,1,test,3,At,Bt,Ct,a,b,c,止まれ/STOP,hashi,1,SSOURCESS,3,tes1,tes2,tes3,1,2,3,止まれ/STOP");
    }
    if (localStorage.getItem("colorLS") == null){
        localStorage.setItem("colorLS", "hashi,#395959,#202020")
    }
}


//List opener
function listOpener(doc){
    home_table()

    //----- Correspondence -----
    if (doc == "sources") {
        currentList = "SSOURCESS";
        var srTest = localStorage.getItem("genlistLS");
        srTest = srTest.split(',');
        let srX = false

        for (var i = 0; i < srTest.length; i++){
            if (currentLog == srTest[i]){        
                if (currentLang == srTest[i+1]){            
                    if (currentList == srTest[i+2]){
                        srX = true
                    }
                }
            }
        }

        if (srX == false){
            var editor = localStorage.getItem("genlistLS");
            editor = editor.split(',');
            editor.push(currentLog);
            editor.push(currentLang);
            editor.push("SSOURCESS");
            editor.push("3");
            editor.push("Source")
            editor.push("Notes")
            editor.push("Price")
            editor.push("止まれ/STOP");
            localStorage.setItem("genlistLS", editor.join());
        }

    } else if (doc == "reg") {
    currentList = document.querySelector('#availLangs').value;
    }
    
    //----- All Filter -----
    var temp = localStorage.getItem("genlistLS");
    headingsList = [];
    informationList = [];

    temp = temp.split(',');

    for (var a = 0; a < temp.length; a++){
        if (currentLog == temp[a]){        
            if (currentLang == temp[a+1]){            
                if (currentList == temp[a+2]){                
                    columnNum = Number(temp[a+3]);

                    for (var b = 0; b < columnNum; b++){
                        headingsList.push(temp[a+4+b]);
                    }

                    for (var c = 0; c < temp.length; c++){
                        if (temp[a+4+columnNum+c] != "止まれ/STOP"){
                            informationList.push(temp[a+4+columnNum+c])
                        } else {
                            break;
                        }
                    }

                    break;
                }
            }
        }
    }

    //-----Create Table-----
    const information = informationList;
    const headings = headingsList;
    multiplierTemp = 0;
    var tableDis = "<table>";
    tableDis  += "<tr>";

    for (var i = 0; i <headings.length; i++){
        tableDis  += "<th>"+headings[i]+"</th>";
    }

    tableDis += "</tr>";

    for (var a = 0; a < (information.length/columnNum); a++){
        tableDis  += "<tr>";
        multiplierTemp = a*columnNum

        for (var b = 0; b < columnNum; b++){
            tableDis  += "<td>"+information[multiplierTemp+b]+"</td>";
        }

        tableDis  += "</tr>";
    }

    tableDis += "</table>";
    document.getElementById("tableDiv").innerHTML = tableDis;
}


//List updater
function listEstablisher(cho){
    //Makes a new empty list section
    if (cho == "create"){
        var temp = localStorage.getItem("genlistLS");
        temp = temp.split(',');
        temp.push(currentLog);
        temp.push(currentLang);
        temp.push(temporaryListName);
        temp.push(columnNum);

        for (var i = 1; i <= columnNum; i++){
            temp.push(document.getElementById("input_" + i).value)
        }

        temp.push("止まれ/STOP");
        localStorage.setItem("genlistLS", temp.join());
        document.getElementById('list_name_input').value =''
        document.getElementById('column_num_input').value =''
        headers_home()
        userAvail();
    }

    //Switches to update screen and adds inputs
    else if (cho == "update"){
        table_update()
        let iud = "";

        for (var i = 1; i <= columnNum; i++){
            iud += '<label for="iud_'
            iud += i
            iud +='">'
            iud += headingsList[i-1]
            iud += ': </label>'
            iud += '<input type="text" id="iud_'
            iud += i
            iud += '" autocomplete="off"><br><br>'        
        }

        document.getElementById('data_inputs').innerHTML = iud;
    }

    //Submits an update to KNOWN lists
    else if (cho == "submit"){
        //Find stop's location
        var stopTemp = localStorage.getItem("genlistLS");
        stopTemp = stopTemp.split(',');

        for (var a = 0; a < stopTemp.length; a++){
            if (currentLog == stopTemp[a]){        
                if (currentLang == stopTemp[a+1]){            
                    if (currentList == stopTemp[a+2]){

                        for (var b = 0; b < stopTemp.length; b++){
                            if (stopTemp[a+2+b] == "止まれ/STOP"){
                                stopLocation = Number(a+2+b);
                                break;
                            }
                        }

                        break;
                    }
                }
            }
        }

        //Append items behind stop's location
        for (var i = 0; i < columnNum; i++){
            stopTemp.splice(stopLocation+i, 0, document.getElementById("iud_" + Number(i+1)).value);
        }

        localStorage.setItem("genlistLS", stopTemp.join());
        if (currentList == "SSOURCESS"){
            listOpener('sources');
        } else {
            listOpener('reg');
        }
        
        update_table()
    }
}


//Create Screen: Column number adjuster and header input display
function adjuster(){
    create_headers()
    columnNum = document.getElementById('column_num_input').value;
    temporaryListName = document.getElementById('list_name_input').value; 
    if (columnNum < 1){
        columnNum = 1;
    }
    else if (columnNum > 10){
        columnNum = 10;
    }
    let inputsDisplay = "";

    for (var i = 1; i <= columnNum; i++){
        inputsDisplay += '<label for="input_'
        inputsDisplay += i
        inputsDisplay +='">Input #'
        inputsDisplay += i
        inputsDisplay += ': </label>'
        inputsDisplay += '<input type="text" id="input_'
        inputsDisplay += i
        inputsDisplay += '" autocomplete="off"><br><br>'        
    }

    document.getElementById("headers_inputs").innerHTML = inputsDisplay;
}


//Gives a LIST of available lists that a user has (inputting the options in the select element)
function userAvail(){
    currentLang = document.querySelector('#langList').value
    const list = document.querySelector('#availLangs'); 
    let temp = localStorage.getItem("genlistLS");
    temp = temp.split(',');
    let availability = [];

    while (document.getElementById('availLangs').options.length > 0) {
        list.remove(0);
    }

    for (var i = 0; i < temp.length; i++){
        if (currentLog == temp[i]){  
            if (currentLang == temp[i+1]){
                if (temp[i+2] != "SSOURCESS")       
                availability.push(temp[i+2])
            }
        }
    }

    for (var i = 0; i < availability.length; i++){
    let option = new Option(availability[i]);
    list.add(option, undefined);
    }
}


//Deleting tables and lines
function deletion(del){
    var temp = localStorage.getItem("genlistLS");
    temp = temp.split(',')

    //Line deletiong
    if (del == "line"){
        var delVal = document.getElementById('lineNum').value
        delVal = delVal.split(',')
        var allow = true;

        for (var i = 0; i < delVal.length; i++){
            if ((delVal[i] > 0) && (delVal[i] <= (informationList.length/columnNum))){}
            else {allow = false}
        }

        delVal.sort((a, b) => b-a);

        if (allow == true){
            for (var a = 0; a < temp.length; a++){
                if (currentLog == temp[a]){        
                    if (currentLang == temp[a+1]){            
                        if (currentList == temp[a+2]){

                            for (var b = 0; b < delVal.length; b++){
                                temp.splice(((a+1)+columnNum+(columnNum*(delVal[b]))), (columnNum))
                            }

                            localStorage.setItem("genlistLS", temp.join());
                            break;
                        }
                    }
                }
            }

            if (currentList == "SSOURCESS"){
                listOpener('sources');
            } else {
                listOpener('reg');
            }
            document.getElementById('lineNum').value =''
            lineDel_table()
        } else {
            document.getElementById("errorLin").setAttribute("class", "errVis");
            setTimeout(errLinTime, 2100);
        }    
    }

    //Table deletion
    else if (del == "table"){
        for (var a = 0; a < temp.length; a++){
            if (currentLog == temp[a]){        
                if (currentLang == temp[a+1]){            
                    if (currentList == temp[a+2]){
                        console.log(a)

                        for (var b = 0; b < temp.length; b++){
                            if (temp[a+2+b] == "止まれ/STOP"){
                                temp.splice(a, Number(3+b))
                                localStorage.setItem("genlistLS", temp.join());
                                break;
                            }
                        }

                        break;
                    }
                }
            }
        }

        userAvail()
        warning_home()
    }
}


//---------------------------- MISC. ----------------------------

//Background color changer
function colorChanger(){
    let newBackground = document.getElementById('colPickA').value
    let newText = document.getElementById('colPickB').value
    var temp = localStorage.getItem('colorLS')
    temp = temp.split(',')

    for (var i = 0; i < temp.length; i++){
        if (currentLog == temp[i]){
            temp.splice(i+1, 1, newBackground);
            temp.splice(i+2, 1, newText);
            localStorage.setItem("colorLS", temp.join());
        }
    }

    document.getElementById('colPickA').value = newBackground
    document.getElementById('colPickB').value = newText
    document.getElementById('bod').style.backgroundColor = newBackground
    document.getElementById('bod').style.color = newText
    document.getElementById('borA').style.borderColor = newText
    document.getElementById('borB').style.borderColor = newText
}


//Excel exporter
function exportData(type){
    const fileName = 'exported-sheet.' + type
    const table = document.getElementById("tableDiv")
    const wb = XLSX.utils.table_to_book(table)
    XLSX.writeFile(wb, fileName)
}
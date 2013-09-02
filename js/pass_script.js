//function check_step_one() {
//    f = document.forms['mainForm'];
//    f.done.disabled = ((f.iname.value == "") || (f.fname.value == ""))
//}
//
//function check_step_one2() {
//    f = document.forms['mainForm'];
//    f.done.disabled = ((f.login.value == "") || (f.iname.value == "") || (f.fname.value == ""))
//}
//
//function copyL(login) {
//document.forms["mainForm"].elements["login"].value = login;
//check_step_one2();
//return false;
//}

var passComplete = false;
function comparePasswords(first, repeate){
    if(repeate.value != first.value) {
        if(document.getElementById) {
            document.getElementById("passStatus").innerHTML = "пароли не совпадают, попробуйте еще раз";
            document.getElementById("passStatus").style.color = "red";
            repeate.style.color = "red";
        }
        passComplete = false;
    } 
    else if(repeate.value.length<6) {
        if(document.getElementById) {
            document.getElementById("passStatus").innerHTML = "пароль должен состоять минимум из 6 символов";
            document.getElementById("passStatus").style.color = "red";
            repeate.style.color = "red";
        }
        passComplete = false;
    }    
    else {
        if(document.getElementById) {
            document.getElementById("passStatus").innerHTML = "введено верно";
            document.getElementById("passStatus").style.color = "green";
            repeate.style.color = "";
        }
        passComplete = true;
    }
}

function check_pass_change() {
    f = document.forms['mainForm'];    
    if(f.done) {
        f.done.disabled = ((f.passwd.value == "") || !passComplete );
    }
        
    if(f.passOk) {
      f.passOk.value = ((f.newUserPassword.value == "") || !passComplete ) ? 'false' : 'true';
      checkForm();
    }
    
    if(f.passOk) {
      f.passOk.value = ((f.newUserPassword.value == "") || !passComplete ) ? 'false' : 'true';
      checkForm();
    }    
}

FirstIntent = true;
function checkPass(f, ffirst) {
    if (f.value != "") {
        if (!FirstIntent || (f.value.length >= ffirst.value.length )) {
            FirstIntent = false;
            comparePasswords(ffirst,f);
        }
    }
    check_pass_change();
}

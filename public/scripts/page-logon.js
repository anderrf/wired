let errorMessage = document.querySelector('.errorMessage');

let logonForm = document.getElementById('logonForm');
logonForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
});

let btnLogon = document.getElementById('btnLogon');
btnLogon.addEventListener('click', () => {
    let valid = true;
    let msg = "";
    let fields = document.querySelectorAll('.logInput');
    fields.forEach((field) => {
        if(field.value == ''){
            valid = false;
            msg = "Todos os campos devem ser preenchidos!";
        }
    });
    if(valid){
        logonForm.submit();
    }
    else{
        console.log(msg);
        errorMessage.innerText = msg;
    }
});
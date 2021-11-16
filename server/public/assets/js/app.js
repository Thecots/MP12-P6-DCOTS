const loadBar = document.querySelector('.loadBar'); 
const spanError = document.querySelector('#sessionError');
const spanErrorUsername = document.querySelector('#sessionErrorUsername');
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm") ;

const AlertIcon = '<svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>'

/* Enciender/apagar circulo de buscando -> in */
function setloadbar(e){
    if(e == true){
        loadBar.style.display = "flex";
    }else{
        loadBar.style.display = "none";
    }
}

setloadbar(false);

/* Aparece/desaparece texto de error -> in */
function error(type,e,t){
    if(type == "password" && e == true){
        spanError.innerHTML = AlertIcon+t;
        spanError.style.display = "flex";
    }else if(e == false){
        spanError.style.display = "none";
    }

    if(type == "username" && e == true){
        spanErrorUsername.innerHTML = AlertIcon+t;
        spanErrorUsername.style.display = "flex";
    }else if(e == false){
        spanErrorUsername.style.display = "none";
    }
}

/* On click  "Crear cuenta" redirect to signiup*/
const iniciarSession = () =>{
    setloadbar(true);
    restartErrors();
    let elements = document.getElementById("formIn").elements;
    let u = elements.item(0).value, p = elements.item(1).value;
    if(u == '' || p == ''){
        if(u == ''){
            error("password",true,'Campos vacios');
            usernameInput.classList.add('error');
        }
        if(p == ''){
            error("password",true,'Campos vacios');
            passwordInput.classList.add('error');
        }
        setloadbar(false);
        return 0;
    }

    var obj = {
        username: u,
        password: p
    };

    const headers = new Headers();
    headers.append("content-Type","application/x-www-form-urlencoded");
    const body = new URLSearchParams();
    body.append("username",u);
    body.append("password",p);



    fetch(
        '/login',
        {
            method: 'POST',
            headers,
            body,
        }
    )
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                const myHeaders = new Headers();
                myHeaders.append("X-Access-Token", res.token);
                console.log(myHeaders.get("X-Access-Token"));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sesión iniciada',
                    showConfirmButton: false,
                    timer: 2500
                  })
            }else{
                error("password",true,res.err.message);
                passwordInput.classList.add('error');
            }
        })

   


    setloadbar(false);
}



/* Remove all errors */
function restartErrors(){
    usernameInput.classList.remove('error');
    passwordInput.classList.remove('error');
    error("username",false);
    error("password",false);
}


/* On click "Mostrar contraseña" inputs type = password transforms in text || password*/
function showPasword(){
    if (document.getElementById('showPassword').checked) {
        document.getElementById('passwd1').type = 'text';
        document.getElementById('passwd2').type = 'text';
    }else{
        document.getElementById('passwd1').type = 'password';
        document.getElementById('passwd2').type = 'password';
    }
}

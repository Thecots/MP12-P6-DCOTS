document.querySelector('#cerrarSesion').addEventListener('click', ()=> {
    console.log(1);
    document.cookie = 'session=0';
    window.location.href =  '/';
})

/* open/close menu */
const menu = (e) =>{
    document.querySelector('#menuicon').classList.toggle("hidden");
    document.querySelector('#crossicon').classList.toggle("hidden");
    document.querySelector('#crossicon').classList.remove("menuClose");
    document.querySelector('menu').classList.toggle("menuclass");
    if(e == true){localStorage.setItem('menu', x= localStorage.getItem("menu") == 1 ? 0 : 1);}
    if(e == false){
        console.log(1);
        document.querySelector('menu').classList.add("menuClose");
    }
}
if(localStorage.getItem("menu") == 1){menu(false)}


/* event listeners */
document.querySelector('#menuicon').addEventListener('click', () => {menu(true)});
document.querySelector('#crossicon').addEventListener('click', () => {menu(true)});

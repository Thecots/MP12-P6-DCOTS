const loadBar = document.querySelector(".loadBar"),
  spanError = document.querySelector("#sessionError"),
  spanErrorUsername = document.querySelector("#sessionErrorUsername"),
  usernameInput = document.getElementById("username"),
  passwordInput = document.getElementById("password"),
  confirmInput = document.getElementById("confirm"),
  AlertIcon =
    '<svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>';

/* ----- windows.location.href = singup ----- */
const createAccount = () => {
  window.location.href = "./signup.html";
};
/* ----- windows.location.href = signin ----- */
const userHaveAccount = () => {
  window.location.href = "./signin.html";
};

/* ---- toggle on/off load bar ---- */
function setloadbar(e) {
  loadBar.style.display = e == true ? "flex" : "none";
}
setloadbar(false);
/* ---- toggle on/off error text ---- */
function error(type, e, t) {
  if (type == "password" && e == true) {
    spanError.innerHTML = AlertIcon + t;
    spanError.style.display = "flex";
  } else if (e == false) {
    spanError.style.display = "none";
  }
  if (type == "username" && e == true) {
    spanErrorUsername.innerHTML = AlertIcon + t;
    spanErrorUsername.style.display = "flex";
  } else if (e == false) {
    spanErrorUsername.style.display = "none";
  }
}
/* ---- toggle on/off show passowrd ----*/
const showPasword = () => {
  if (document.querySelector("#showPassword").checked) {
    document.querySelector("#passwd1").type = "text";
    document.querySelector("#passwd2").type = "text";
  } else {
    document.querySelector("#passwd1").type = "password";
    document.querySelector("#passwd2").type = "password";
  }
};

/* ---- remove all errors text ---- */
function restartErrors() {
  usernameInput.classList.remove("error");
  passwordInput.classList.remove("error");
  try {
    confirmInput.classList.remove("error");
  } catch (error) {}
  error("username", false);
  error("password", false);
}

/* ----- sign in -----*/
const iniciarSession = () => {
  restartErrors();
  let elements = document.getElementById("formIn").elements;
  let u = elements.item(0).value,
    p = elements.item(1).value;
  if (u == "" || p == "") {
    if (u == "") {
      error("password", true, "Campos vacios");
      usernameInput.classList.add("error");
    }
    if (p == "") {
      error("password", true, "Campos vacios");
      passwordInput.classList.add("error");
    }
    return 0;
  }
  var obj = { username: u, password: p };

  const headers = new Headers();
  headers.append("content-Type", "application/x-www-form-urlencoded");
  headers.append("X-Access-Token", localStorage.getItem("X-Access-Token"));
  var body = new URLSearchParams();
  body.append("username", u);
  body.append("password", p);

  fetch("/login", {
    method: "POST",
    headers,
    body,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.ok) {
        localStorage.setItem("X-Access-Token", JSON.stringify(res.token));
        if (res.usuari.role == "ADMIN_ROLE") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/home";
        }
      } else {
        error("password", true, res.err.message);
        passwordInput.classList.add("error");
      }
    });
  setloadbar(false);
};

/* ----- sing up ----- */
const crearCuenta = () => {
  restartErrors();
  let elements = document.getElementById("formIn").elements;
  let u = elements.item(0).value,
    p = elements.item(1).value,
    c = elements.item(2).value;
  if (u == "") {
    error("username", true, "Campos vacios");
    usernameInput.classList.add("error");
  }
  if (p != "" && c != "") {
    console.log(p != c);
    if (p != c) {
      error("password", true, "Las contraseñas no coinciden");
      confirmInput.classList.add("error");
      return 0;
    }
  } else {
    if (p == "") {
      error("password", true, "Campos vacios");
      passwordInput.classList.add("error");
    }
    if (c == "") {
      error("password", true, "Campos vacios");
      confirmInput.classList.add("error");
    }
    return 0;
  }
  var obj = { username: u, password: p };
};

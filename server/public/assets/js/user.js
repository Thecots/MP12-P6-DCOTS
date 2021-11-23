const headers = new Headers();
headers.append("content-Type", "application/x-www-form-urlencoded");
headers.append(
  "X-Access-Token",
  JSON.parse(localStorage.getItem("X-Access-Token"))
);

fetch("/home", {
  method: "POST",
  headers,
})
  .then((res) => res.json())
  .then((res) => {
    if (!res.ok) {
      window.location.href = "/";
    }
  });

document.querySelector("button").addEventListener("click", () => {
  localStorage.removeItem("X-Access-Token");
  window.location.href = "/";
});

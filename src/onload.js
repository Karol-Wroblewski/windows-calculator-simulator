console.log(document.body.clientHeight);
let element = document.createElement("div");
element.innerHTML = "Please turn out your mobile phone";
element.classList.add("warming");
document.body.appendChild(element);
if(document.body.clientHeight < 500)
  element.style.display = "block";
else
  element.style.display = "none";
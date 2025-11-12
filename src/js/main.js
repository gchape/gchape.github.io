import "../css/main.css";

for (const h2 of document.getElementsByTagName("h2")) {
  h2.id = h2.innerText.replace(/\s+/g, "-").toLocaleLowerCase();
}

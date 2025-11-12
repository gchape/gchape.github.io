document.addEventListener("DOMContentLoaded", () => {
  const idCounts = {};

  for (const h2 of document.getElementsByTagName("h2")) {
    const id = h2.innerText
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    h2.id = id;
  }
});

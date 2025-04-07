document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    new VenoBox();
  }
});

<<<<<<< HEAD
let toggleThemeSetting=()=>{let e=determineThemeSetting();"system"==e?setThemeSetting("light"):"light"==e?setThemeSetting("dark"):"dark"==e&&setThemeSetting("light")},setThemeSetting=e=>{localStorage.setItem("theme",e),document.documentElement.setAttribute("data-theme-setting",e),applyTheme()},applyTheme=()=>{let e=determineComputedTheme();transTheme(),setHighlight(e),setGiscusTheme(e),setSearchTheme(e),"undefined"!=typeof mermaid&&setMermaidTheme(e),"undefined"!=typeof Diff2HtmlUI&&setDiff2htmlTheme(e),"undefined"!=typeof echarts&&setEchartsTheme(e),"undefined"!=typeof vegaEmbed&&setVegaLiteTheme(e),document.documentElement.setAttribute("data-theme",e);let t=document.getElementsByTagName("table");for(let i=0;i<t.length;i++)"dark"==e?t[i].classList.add("table-dark"):t[i].classList.remove("table-dark");let i=document.getElementsByClassName("jupyter-notebook-iframe-container");for(let t=0;t<i.length;t++){let m=i[t].getElementsByTagName("iframe")[0].contentWindow.document.body;"dark"==e?(m.setAttribute("data-jp-theme-light","false"),m.setAttribute("data-jp-theme-name","JupyterLab Dark")):(m.setAttribute("data-jp-theme-light","true"),m.setAttribute("data-jp-theme-name","JupyterLab Light"))}"undefined"!=typeof medium_zoom&&medium_zoom.update({background:getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color")+"ee"})},setHighlight=e=>{"dark"==e?(document.getElementById("highlight_theme_light").media="none",document.getElementById("highlight_theme_dark").media=""):(document.getElementById("highlight_theme_dark").media="none",document.getElementById("highlight_theme_light").media="")},setGiscusTheme=e=>{function t(e){const t=document.querySelector("iframe.giscus-frame");t&&t.contentWindow.postMessage({giscus:e},"https://giscus.app")}t({setConfig:{theme:e}})},addMermaidZoom=(e,t)=>{d3.selectAll(".mermaid svg").each(function(){var e=d3.select(this);e.html("<g>"+e.html()+"</g>");var t=e.select("g"),i=d3.zoom().on("zoom",function(e){t.attr("transform",e.transform)});e.call(i)}),t.disconnect()},setMermaidTheme=e=>{"light"==e&&(e="default"),document.querySelectorAll(".mermaid").forEach(e=>{let t=e.previousSibling.childNodes[0].innerHTML;e.removeAttribute("data-processed"),e.innerHTML=t}),mermaid.initialize({theme:e}),window.mermaid.init(undefined,document.querySelectorAll(".mermaid"));const t=document.querySelector(".mermaid svg");if(null!==t){const e={childList:!0};new MutationObserver(addMermaidZoom).observe(t,e)}},setDiff2htmlTheme=e=>{document.querySelectorAll(".diff2html").forEach(t=>{let i=t.previousSibling.childNodes[0].innerHTML;t.innerHTML="",new Diff2HtmlUI(t,i,{colorScheme:e,drawFileList:!0,highlight:!0,matching:"lines"}).draw()})},setEchartsTheme=e=>{document.querySelectorAll(".echarts").forEach(t=>{let i=t.previousSibling.childNodes[0].innerHTML;if(echarts.dispose(t),"dark"===e)var m=echarts.init(t,"dark-fresh-cut");else m=echarts.init(t);m.setOption(JSON.parse(i))})},setVegaLiteTheme=e=>{document.querySelectorAll(".vega-lite").forEach(t=>{let i=t.previousSibling.childNodes[0].innerHTML;t.innerHTML="","dark"===e?vegaEmbed(t,JSON.parse(i),{theme:"dark"}):vegaEmbed(t,JSON.parse(i))})},setSearchTheme=e=>{const t=document.querySelector("ninja-keys");t&&("dark"===e?t.classList.add("dark"):t.classList.remove("dark"))},transTheme=()=>{document.documentElement.classList.add("transition"),window.setTimeout(()=>{document.documentElement.classList.remove("transition")},500)},determineThemeSetting=()=>{let e=localStorage.getItem("theme");return"dark"!=e&&"light"!=e&&"system"!=e&&(e="system"),e},determineComputedTheme=()=>{let e=determineThemeSetting();if("system"==e){const e=window.matchMedia;return e&&e("(prefers-color-scheme: dark)").matches?"dark":"light"}return e},initTheme=()=>{let e=determineThemeSetting();setThemeSetting(e),document.addEventListener("DOMContentLoaded",function(){document.getElementById("light-toggle").addEventListener("click",function(){toggleThemeSetting()})}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",({matches:e})=>{applyTheme()})};
=======
// Has to be in the head tag, otherwise a flicker effect will occur.

// Toggle through light, dark, and system theme settings.
let toggleThemeSetting = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting == "system") {
    setThemeSetting("light");
  } else if (themeSetting == "light") {
    setThemeSetting("dark");
  }
  else if (themeSetting == "dark") {
    setThemeSetting("light");
  }
};

// Change the theme setting and apply the theme.
let setThemeSetting = (themeSetting) => {
  localStorage.setItem("theme", themeSetting);

  document.documentElement.setAttribute("data-theme-setting", themeSetting);

  applyTheme();
};

// Apply the computed dark or light theme to the website.
let applyTheme = () => {
  let theme = determineComputedTheme();

  transTheme();
  setHighlight(theme);
  setGiscusTheme(theme);
  setSearchTheme(theme);

  // if mermaid is not defined, do nothing
  if (typeof mermaid !== "undefined") {
    setMermaidTheme(theme);
  }

  // if diff2html is not defined, do nothing
  if (typeof Diff2HtmlUI !== "undefined") {
    setDiff2htmlTheme(theme);
  }

  // if echarts is not defined, do nothing
  if (typeof echarts !== "undefined") {
    setEchartsTheme(theme);
  }

  // if vegaEmbed is not defined, do nothing
  if (typeof vegaEmbed !== "undefined") {
    setVegaLiteTheme(theme);
  }

  document.documentElement.setAttribute("data-theme", theme);

  // Add class to tables.
  let tables = document.getElementsByTagName("table");
  for (let i = 0; i < tables.length; i++) {
    if (theme == "dark") {
      tables[i].classList.add("table-dark");
    } else {
      tables[i].classList.remove("table-dark");
    }
  }

  // Set jupyter notebooks themes.
  let jupyterNotebooks = document.getElementsByClassName("jupyter-notebook-iframe-container");
  for (let i = 0; i < jupyterNotebooks.length; i++) {
    let bodyElement = jupyterNotebooks[i].getElementsByTagName("iframe")[0].contentWindow.document.body;
    if (theme == "dark") {
      bodyElement.setAttribute("data-jp-theme-light", "false");
      bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Dark");
    } else {
      bodyElement.setAttribute("data-jp-theme-light", "true");
      bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Light");
    }
  }

  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== "undefined") {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee", // + 'ee' for trasparency.
    });
  }
};

let setHighlight = (theme) => {
  if (theme == "dark") {
    document.getElementById("highlight_theme_light").media = "none";
    document.getElementById("highlight_theme_dark").media = "";
  } else {
    document.getElementById("highlight_theme_dark").media = "none";
    document.getElementById("highlight_theme_light").media = "";
  }
};

let setGiscusTheme = (theme) => {
  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }

  sendMessage({
    setConfig: {
      theme: theme,
    },
  });
};

let addMermaidZoom = (records, observer) => {
  var svgs = d3.selectAll(".mermaid svg");
  svgs.each(function () {
    var svg = d3.select(this);
    svg.html("<g>" + svg.html() + "</g>");
    var inner = svg.select("g");
    var zoom = d3.zoom().on("zoom", function (event) {
      inner.attr("transform", event.transform);
    });
    svg.call(zoom);
  });
  observer.disconnect();
};

let setMermaidTheme = (theme) => {
  if (theme == "light") {
    // light theme name in mermaid is 'default'
    // https://mermaid.js.org/config/theming.html#available-themes
    theme = "default";
  }

  /* Re-render the SVG, based on https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_includes/mermaid.html */
  document.querySelectorAll(".mermaid").forEach((elem) => {
    // Get the code block content from previous element, since it is the mermaid code itself as defined in Markdown, but it is hidden
    let svgCode = elem.previousSibling.childNodes[0].innerHTML;
    elem.removeAttribute("data-processed");
    elem.innerHTML = svgCode;
  });

  mermaid.initialize({ theme: theme });
  window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));

  const observable = document.querySelector(".mermaid svg");
  if (observable !== null) {
    var observer = new MutationObserver(addMermaidZoom);
    const observerOptions = { childList: true };
    observer.observe(observable, observerOptions);
  }
};

let setDiff2htmlTheme = (theme) => {
  document.querySelectorAll(".diff2html").forEach((elem) => {
    // Get the code block content from previous element, since it is the diff code itself as defined in Markdown, but it is hidden
    let textData = elem.previousSibling.childNodes[0].innerHTML;
    elem.innerHTML = "";
    const configuration = { colorScheme: theme, drawFileList: true, highlight: true, matching: "lines" };
    const diff2htmlUi = new Diff2HtmlUI(elem, textData, configuration);
    diff2htmlUi.draw();
  });
};

let setEchartsTheme = (theme) => {
  document.querySelectorAll(".echarts").forEach((elem) => {
    // Get the code block content from previous element, since it is the echarts code itself as defined in Markdown, but it is hidden
    let jsonData = elem.previousSibling.childNodes[0].innerHTML;
    echarts.dispose(elem);

    if (theme === "dark") {
      var chart = echarts.init(elem, "dark-fresh-cut");
    } else {
      var chart = echarts.init(elem);
    }

    chart.setOption(JSON.parse(jsonData));
  });
};

let setVegaLiteTheme = (theme) => {
  document.querySelectorAll(".vega-lite").forEach((elem) => {
    // Get the code block content from previous element, since it is the vega lite code itself as defined in Markdown, but it is hidden
    let jsonData = elem.previousSibling.childNodes[0].innerHTML;
    elem.innerHTML = "";
    if (theme === "dark") {
      vegaEmbed(elem, JSON.parse(jsonData), { theme: "dark" });
    } else {
      vegaEmbed(elem, JSON.parse(jsonData));
    }
  });
};

let setSearchTheme = (theme) => {
  const ninjaKeys = document.querySelector("ninja-keys");
  if (!ninjaKeys) return;

  if (theme === "dark") {
    ninjaKeys.classList.add("dark");
  } else {
    ninjaKeys.classList.remove("dark");
  }
};

let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500);
};

// Determine the expected state of the theme toggle, which can be "dark", "light", or
// "system". Default is "system".
let determineThemeSetting = () => {
  let themeSetting = localStorage.getItem("theme");
  if (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") {
    themeSetting = "system";
  }
  return themeSetting;
};

// Determine the computed theme, which can be "dark" or "light". If the theme setting is
// "system", the computed theme is determined based on the user's system preference.
let determineComputedTheme = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting == "system") {
    const userPref = window.matchMedia;
    if (userPref && userPref("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  } else {
    return themeSetting;
  }
};

let initTheme = () => {
  let themeSetting = determineThemeSetting();

  setThemeSetting(themeSetting);

  // Add event listener to the theme toggle button.
  document.addEventListener("DOMContentLoaded", function () {
    const mode_toggle = document.getElementById("light-toggle");

    mode_toggle.addEventListener("click", function () {
      toggleThemeSetting();
    });
  });

  // Add event listener to the system theme preference change.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
    applyTheme();
  });
};
>>>>>>> master

let buttonSettings = {
  elements: ['pre'],
  title: 'Open code in an interactive playground',
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  border: 'none',
  borderRadius: '4px',
  padding: '4px 8px',
  margin: '-4px 22px',
  cursor: 'pointer',
  zIndex: '10',
  filter: 'grayscale(100%)',
  icon: '<img src="https://cms.marimo.io/icons/favicon.svg" alt="icon" width="20" height="20">',
  url: 'https://marimo.app',
  paramName: 'code'
};

let iframeSettings = {
  elements: ['pre'],
  height: '400px',
  width: '100%',
  border: '1px solid #ddd',
  borderRadius: '4px',
  margin: '1rem 0',
  showCode: 'true',
  url: 'https://marimo.app',
  paramName: 'code'
};

/**
 * Configure interactive buttons for code blocks that open the code in a Marimo playground
 *
 * @param {Object} settings - Button customization options
 * @param {string[]} [settings.elements=['pre', 'div.highlight'] - CSS selectors for elements to add buttons to. Default: ['pre', 'div.highlight']
 * @param {string} [settings.title='Open code in an interactive playground'] - Button tooltip text
 * @param {string} [settings.position='absolute'] - CSS position property
 * @param {string} [settings.top='0.5rem'] - Distance from top of container
 * @param {string} [settings.right='0.5rem'] - Distance from right of container
 * @param {string} [settings.border='none'] - Button border style
 * @param {string} [settings.borderRadius='4px'] - Button corner radius
 * @param {string} [settings.padding='4px 8px'] - Button padding
 * @param {string} [settings.margin='-4px 22px'] - Button margin
 * @param {string} [settings.cursor='pointer'] - Mouse cursor style on hover
 * @param {string} [settings.zIndex='10'] - Button stacking order
 * @param {string} [settings.filter='grayscale(100%)'] - Default filter applied to button
 * @param {string} [settings.icon='<img src="https://cms.marimo.io/icons/favicon.svg" alt="icon" width="20" height="20">'] - HTML content for the button
 * @param {string} [settings.url='https://marimo.app'] - Base URL for the Marimo instance
 * @param {string} [settings.paramName='code'] - Query parameter name for the code
 */
function configureMarimoButtons(settings = {}) {
  buttonSettings = { ...buttonSettings, ...settings };
}

/**
 * Configure marimo iframes
 *
 * @param {Object} settings - Iframe customization options
 * @param {string[]} [settings.elements=['pre', 'div.highlight'] - CSS selectors for elements to add buttons to. Default: ['pre', 'div.highlight']
 * @param {string} [settings.height='400px'] - Height of the iframe
 * @param {string} [settings.width='100%'] - Width of the iframe
 * @param {string} [settings.border='1px solid #ddd'] - Border style of the iframe
 * @param {string} [settings.borderRadius='4px'] - Corner radius of the iframe
 * @param {string} [settings.margin='1rem 0'] - Margin around the iframe
 * @param {string} [settings.showCode='true'] - Whether to show the notebook's code
 * @param {string} [settings.url='https://marimo.app'] - Base URL for the Marimo instance
 * @param {string} [settings.paramName='code'] - Query parameter name for the code
 */
function configureMarimoIframes(settings = {}) {
  iframeSettings = { ...iframeSettings, ...settings };
}

function generateCell(code, kind="python") {

  if (kind === "python") {
    return `@app.cell
def _():
${code.split('\n').map(line => '    ' + line).join('\n')}
`;
}
    if (kind === "md") {
    return `@app.cell(hide_code=True)
def _():
    mo.md("""
${code.split('\n').map(line => '    ' + line).join('\n')}
    """)
`;
}
}

function generateNotebook(cells) {
  return `import marimo

app = marimo.App()

${cells}
`;
}

/**
 * Helper to override settings using data attributes.
 * It takes an element and a settings object and returns a new configuration,
 * where any data-* attribute (e.g. data-title or data-elements) on the element
 * will override the corresponding property in the settings.
 */
function overrideSettingsWithDataAttributes(element, settings) {
  const config = { ...settings };
  for (const key in element.dataset) {
    let value = element.dataset[key];
    // If key is "elements", assume a comma-separated list.
    if (key.toLowerCase() === "elements") {
      value = value.split(',').map(s => s.trim());
    }
    config[key] = value;
  }
  return config;
}

function createButton(codeElement, config = buttonSettings) {
  const button = document.createElement('button');
  button.className = 'url-copy-button';
  button.title = config.title;
  button.style.position = config.position;
  button.style.top = config.top;
  button.style.right = config.right;
  button.style.border = config.border;
  button.style.borderRadius = config.borderRadius;
  button.style.padding = config.padding;
  button.style.margin = config.margin;
  button.style.cursor = config.cursor;
  button.style.zIndex = config.zIndex;
  button.style.filter = config.filter;
  button.innerHTML = config.icon;

  button.addEventListener("mouseover", function() {
    button.style.filter = "grayscale(0%)";
  });
  button.addEventListener("mouseout", function() {
    button.style.filter = config.filter;
  });
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const code = generateNotebook(generateCell(codeElement.textContent));
    const encodedCode = encodeURIComponent(code);
    const url = `${config.url}?${config.paramName}=${encodedCode}`;
    window.open(url, '_blank');
  });

  return button;
}

/**
 * Adds interactive buttons to code blocks that open the code in a Marimo playground.
 * This uses any data attributes on <marimo-button> to override defaults.
 */
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('script[type="text/x-marimo-snippets-config"]').forEach(script => {
    eval(script.textContent);
  });

  const buttons = document.querySelectorAll('marimo-button');
  buttons.forEach(button => {
    // Merge data attribute config with global buttonSettings.
    const buttonConfig = overrideSettingsWithDataAttributes(button, buttonSettings);
    const preElement = button.querySelector(buttonConfig.elements.join(","));
    if (!preElement) {
      return;
    }
    // Ensure the pre element has a relative position for button placement.
    if (getComputedStyle(preElement).position === 'static') {
      preElement.style.position = 'relative';
    }
    preElement.appendChild(createButton(preElement, buttonConfig));
  });
});

/**
 * Replaces code blocks with inline marimo notebooks.
 * This uses any data attributes on <marimo-iframe> to override defaults.
 */
document.addEventListener("DOMContentLoaded", function() {
  const marimoFrames = document.querySelectorAll("marimo-iframe");
  marimoFrames.forEach(marimoFrame => {
    // Merge data attribute config with global iframeSettings.
    const iframeConfig = overrideSettingsWithDataAttributes(marimoFrame, iframeSettings);
    
    console.log("marimoFrame", marimoFrame);
    
    const cells = Array.from(marimoFrame.children).map((element) => {
      const allClassNames = Array.from(element.classList).concat(
        Array.from(element.getElementsByTagName("*")).flatMap(el => Array.from(el.classList))
      );
      const kind = allClassNames.includes("language-python") ? "python" : "md";

      return generateCell(element.textContent, kind);
    });

    const code = generateNotebook(cells.join("\n"));

    const iframe = document.createElement('iframe');
    iframe.style.height = iframeConfig.height;
    iframe.style.width = iframeConfig.width;
    iframe.style.border = iframeConfig.border;
    iframe.style.borderRadius = iframeConfig.borderRadius;
    iframe.style.margin = iframeConfig.margin;

    const encodedCode = encodeURIComponent(code);
    const mode = iframeConfig.showCode === 'false' ? 'read' : 'edit';
    const url = `${iframeConfig.url}?${iframeConfig.paramName}=${encodedCode}&embed=true&show-chrome=false&mode=${mode}&show-code=${iframeConfig.showCode}`;
    iframe.src = url;
    marimoFrame.replaceWith(iframe);
  });
});
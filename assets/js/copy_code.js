// create element for copy button in code blocks
var codeBlocks = document.querySelectorAll('pre.highlight');
codeBlocks.forEach(function (codeBlock) {
  var copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.type = 'button';
  copyButton.ariaLabel = 'Copy code to clipboard';
  copyButton.innerText = 'Copy';
  copyButton.innerHTML = '<i class="fas fa-clipboard"></i>';
  codeBlock.append(copyButton);

  // get code from code block and copy to clipboard
  copyButton.addEventListener('click', function () {
    // check if code block has line numbers
    // i.e. `kramdown.syntax_highlighter_opts.block.line_numbers` set to true in _config.yml
    if (codeBlock.querySelector('pre:not(.lineno)')) {
      // get code from code block ignoring line numbers
      var code = codeBlock.querySelector('pre:not(.lineno)').innerText.trim();
    } else {
      // get code from code block when line numbers are not displayed
      var code = codeBlock.querySelector('code').innerText.trim();
    }
    window.navigator.clipboard.writeText(code);
    copyButton.innerText = 'Copied';
    copyButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
    var waitFor = 3000;

    setTimeout(function () {
      copyButton.innerText = 'Copy';
      copyButton.innerHTML = '<i class="fas fa-clipboard"></i>';
    }, waitFor);
  });
});

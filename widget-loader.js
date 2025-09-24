(function() {
  var container = document.createElement("div");
  document.body.appendChild(container);

  var iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "320px";
  iframe.style.height = "480px";
  iframe.style.border = "0";
  iframe.style.zIndex = "999999";
  iframe.style.borderRadius = "10px";
  iframe.style.overflow = "hidden";
  container.appendChild(iframe);

  var doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`
  <html>
    <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Pikacco/FixelByteWidgets@main/floating-chat.css">
      <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/Pikacco/FixelByteWidgets@main/FloatingChatFrame.js"></script>
    </head>
    <body style="margin:0">
      <div id="root"></div>
      <script>
        ReactDOM.createRoot(document.getElementById('root')).render(
          React.createElement(FloatingChatFrame)
        );
      </script>
    </body>
  </html>
`);
  doc.close();
})();


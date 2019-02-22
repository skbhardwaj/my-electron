const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let win;

const createWindow = () => {
  //   process.argv.forEach(function(val, index, array) {
  //     console.log(index + ": " + val);
  //   });

  const filePath = process.argv[2]
    ? "app/" + process.argv[2] + "/index.html"
    : "app/00/index.html";

  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, filePath),
      protocol: "file:",
      slashes: true
    })
  );
};

app.on("ready", createWindow);

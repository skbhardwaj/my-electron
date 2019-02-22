const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");

let win;

const createWindow = () => {
    //   process.argv.forEach(function(val, index, array) {
    //     console.log(index + ": " + val);
    //   });

    let filePath = "app/00/index.html";

    const param = process.argv[2];

    if (param) {
        filePath = "app/" + param + "/index.html";
    }

    if (param === "04") {
        handle04();
    }

    win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, filePath),
            protocol: "file:",
            slashes: true
        })
    );
};

const handle04 = () => {
    ipcMain.on("openFile", (event, path) => {
        const { dialog } = require("electron");
        const fs = require("fs");
        dialog.showOpenDialog(function(fileNames) {
            // fileNames is an array that contains all the selected
            if (fileNames === undefined) {
                console.log("No file selected");
            } else {
                readFile(fileNames[0]);
            }
        });

        function readFile(filepath) {
            fs.readFile(filepath, "utf-8", (err, data) => {
                if (err) {
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }

                // handle the file content
                event.sender.send("fileData", data);
            });
        }
    });
};

app.on("ready", createWindow);

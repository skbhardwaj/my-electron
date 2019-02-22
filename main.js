const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require("electron");
const url = require("url");
const path = require("path");

let win;
const param = process.argv[2];

const createWindow = () => {
    //   process.argv.forEach(function(val, index, array) {
    //     console.log(index + ": " + val);
    //   });

    let filePath = "app/00/index.html";

    if (param) {
        filePath = "app/" + param + "/index.html";
    }

    if (param === "04") {
        app04();
    }

    if (param === "05") {
        app05();
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

const app05 = () => {
    const template = [
        {
            label: "Edit",
            submenu: [
                {
                    role: "undo"
                },
                {
                    role: "redo"
                },
                {
                    type: "separator"
                },
                {
                    role: "cut"
                },
                {
                    role: "copy"
                },
                {
                    role: "paste"
                }
            ]
        },

        {
            label: "View",
            submenu: [
                {
                    role: "reload"
                },
                {
                    role: "toggledevtools"
                },
                {
                    type: "separator"
                },
                {
                    role: "resetzoom"
                },
                {
                    role: "zoomin"
                },
                {
                    role: "zoomout"
                },
                {
                    type: "separator"
                },
                {
                    role: "togglefullscreen"
                }
            ]
        },

        {
            role: "window",
            submenu: [
                {
                    role: "minimize"
                },
                {
                    role: "close"
                }
            ]
        },

        {
            role: "help",
            submenu: [
                {
                    label: "Learn More"
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

const app04 = () => {
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

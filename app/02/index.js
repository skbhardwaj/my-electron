let $ = require("jquery");
let fs = require("fs");
let filename = "data/contacts.txt";
let sno = 0;

$("#add-to-list").on("click", () => {
    let name = $("#Name").val();
    let email = $("#Email").val();

    fs.appendFile(filename, name + "," + email + "\n", err => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

    addEntry(name, email);
});

function addEntry(name, email) {
    if (name && email) {
        sno++;
        let updateString =
            "<tr><td>" +
            sno +
            "</td><td>" +
            name +
            "</td><td>" +
            email +
            "</td></tr>";
        $("#contact-table").append(updateString);
    }
}

function loadAndDisplayContacts() {
    //Check if file exists
    if (fs.existsSync(filename)) {
        let data = fs.readFileSync(filename, "utf8").split("\n");

        data.forEach((contact, index) => {
            let [name, email] = contact.split(",");
            addEntry(name, email);
        });
    } else {
        console.log("File Doesn't Exist. Creating new file.");
        fs.writeFile(filename, "", err => {
            if (err) console.log(err);
        });
    }
}

loadAndDisplayContacts();

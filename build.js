var version = require("./package").version;
var fs = require("fs");

function replaceInFile(fileName, searchValue, replaceValue) {
    fs.writeFileSync(
        "./dist/" + fileName,
        fs.readFileSync("./" + fileName, { encoding: "utf-8"}).replace(searchValue, replaceValue)
    );
}

fs.mkdirSync('dist', { recursive: true });

replaceInFile("index.js", "$$VERSION", version);
replaceInFile("index.html", "<!-- VERSION -->", version);

let rbaVersion = version.split(".").join(", ");
replaceInFile("index.css",  "color: rgb(0, 0, 0); /** VERSION **/", "color: rgb(" + rbaVersion + ");")

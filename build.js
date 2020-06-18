var packageVersion = require("./package").version;
var fs = require("fs");
var child_process = require("child_process");

branch = child_process.execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf-8" }).trim();

let version = packageVersion;
if (branch !== "master") {
    version += "-" + branch.replace(/\//g, "-");
}

function replaceInFile(fileName, searchValue, replaceValue) {
    fs.writeFileSync(
        "./dist/" + version + "/" + fileName,
        fs.readFileSync("./" + fileName, { encoding: "utf-8"}).replace(searchValue, replaceValue)
    );
}

fs.mkdirSync('dist/' + version, { recursive: true });

replaceInFile("index.js", "$$VERSION", version);
replaceInFile("index.html", "<!-- VERSION -->", version);

let rbaVersion = packageVersion.split(".").join(", ");
replaceInFile("index.css",  "color: rgb(0, 0, 0); /** VERSION **/", "color: rgb(" + rbaVersion + ");");

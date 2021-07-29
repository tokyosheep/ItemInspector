const path = require("path");
const fs = require("fs");

(async()=>{
    const filePath = process.argv[2];
    console.log(filePath);
    const content = await fs.promises.readFile(filePath);
    console.log(content);
})();
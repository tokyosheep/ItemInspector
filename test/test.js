const fs = require("fs");
{
    (async()=>{
        const content = await fs.promises.stat("/Users/kawanoshuji/Desktop/portFolioSite/static/backImg/syutoko-136m.jpg");
        console.log(content);
        //const r = content.match(/<xmpGImg:image>(.*)<\/xmpGImg:image>/);
    })();
}
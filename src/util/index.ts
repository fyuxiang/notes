
const fs = require('fs');
const path = require('path');
console.log(__dirname)
function wirteFile(name: string, data: string) {
    var index_writer = fs.createWriteStream(name);
    
    index_writer.write(data, 'utf-8');
    index_writer.end();
    index_writer.on('finish', (e: any) => {
        console.log(e)
    });
    return index_writer;
}
function readFile (url: string): any {
    if (fs.existsSync(url)) {
        var buffer =  fs.readFileSync(url);
        return buffer;
    }
    return readFile(path.resolve(__dirname, '../404.html'))
}
function getUrl (prefix: string, url: string) {
    return url.slice(prefix.length);
}


function handleRouter (request: any, response: any) {
}
// module.exports =  {
//     wirteFile,
//     readFile,
//     getUrl,
//     handleRouter,
//     routers,
// }
export {
    wirteFile,
    readFile,
    getUrl,
    handleRouter,
};

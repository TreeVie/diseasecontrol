const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const chalk = require("chalk");
function compress(source, target) {
    let _zip = new JSZip();
    function _compress(_source, ...dirname) {
        fs.readdirSync(_source).map(name => {
            let _path = path.join(_source, name);
            fs.lstatSync(_path).isDirectory()
                ? _compress(_path, ...dirname, name)
                : /\.(html|js|css|jpg|jpeg|gif|png|bmp)$/.test(name) && dirname.reduce((pre, cur) => pre.folder(cur),_zip.folder(path.basename(source))).file(name, fs.createReadStream(_path));
        });
        return _zip;
    }
    return _compress(source)
        .generateNodeStream({ type: "nodebuffer", compression: "DEFLATE" })
        .pipe(fs.createWriteStream(target))
        .on("finish", () => console.log(chalk.black.bgGreenBright(" Packing Successfully! ")))
        .on("error", err => console.log(chalk.black.bgRedBright(" Packing Error: \n"), err));
}
module.exports = class ZipFolder {
    constructor(options = {}) {
        this.source = options.source;
        this.target = options.target;
    }
    apply(compiler) {
        compiler.plugin("done", stats => {
            let source = this.source || stats.compilation.options.output.path,
                target = this.target || `${process.cwd()}\\${path.basename(source)}.zip`;
            compress(source, target);
        });
    }
};

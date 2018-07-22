const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const archiver = require("archiver");

// 删除map文件
fs.readdirSync(path.resolve(__dirname, "../dist/css")).map(filename => {
    if (/\.map$/.test(filename)) {
        // 删除map文件
        fs.unlinkSync(path.join(__dirname, "../dist/css", filename));
    }
});
function entry(source, target, callback) {
    // 创建写入流
    let output = fs.createWriteStream(target);
    let archive = archiver("zip", { zlib: { level: 9 },gzip:true });
    archive.on("end", callback);
    archive.on("error", callback);

    // pipe archive data to the file
    archive.pipe(output);

    function compress(source, dirname) {
        fs.readdirSync(source).map(name => {
            let _path = path.join(source, name);
            // 是文件夹就递归处理
            fs.lstatSync(_path).isDirectory()
                ? compress(_path, name) //archive.directory(`${name}/`, name)
                : archive.append(fs.createReadStream(path.join(source, name)), {
                      name: dirname ? `${dirname}/${name}` : name
                  });
        });
    }
    compress(source);
    archive.finalize();
}

entry(
    path.resolve(__dirname, "../dist"),
    path.resolve(__dirname, "../dist.zip"),
    err => {
        let msg = err
            ? (console.log(JSON.stringify(err)),
              chalk.white.bgRedBright.bold(" Packing Error! "))
            : chalk.black.bgWhiteBright(" Packing Successfully! ");
        console.log(msg);
    }
);

/**
 *
 * @param {PathLike} source 源文件
 * @param {PathLike} target 目标文件
 * @param {PathLike} callback 压缩后的回调
 */
// module.exports = entry;

// require("zip-folder")(
//     path.resolve(__dirname, "../dist"),
//     path.resolve(__dirname, "../dist.zip"),
//     err => {
//         let msg = err
//             ? (console.log(JSON.stringify(err)),
//               chalk.white.bgRedBright.bold(" Packing Error! "))
//             : chalk.black.bgWhiteBright(" Packing Successfully! ");
//         console.log(msg);
//     }
// );

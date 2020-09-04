const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const {transformFromAst} = require('babel-core');

let ID = 0;

// 我们首先创建一个函数,该函数将接受 文件路径 ,读取内容并提取它的依赖关系. 
// createAsset('./example/index.js');
// 传入文件路径，读取文件源码，解析import关键字
// babylon解析源码生成ast，从而得到关键信息 https://astexplorer.net
/**
 * 
 * @param {*} filename 文件路径
 * @returns 文件的信息 obj
 *  包含：
 *      id： 当前文件对应的全局标识id（每读一个文件 全局ID自增维护
 *      filename：文件路径（从当前文件目录出发的路径)
 *      dependencies：文件依赖的模块集合
 *      code：源代码
 */
function createAsset(filename) {
    // 以字符串形式读取文件的内容. 
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = babylon.parse(content, {
        sourceType: 'module',
    });

    // 保存模块依赖的模块相对路径.
    const dependencies = [];

    //   我们遍历`ast`来试着理解这个模块依赖哪些模块. 
    //   要做到这一点,我们检查`ast`中的每个 `import` 声明. ❤️
    traverse(ast, {
        // `Ecmascript`模块相当简单,因为它们是静态的. 这意味着你不能`import`一个变量,
        // 或者有条件地`import`另一个模块. 
        // 每次我们看到`import`声明时,我们都可以将其数值视为`依赖性`.
        ImportDeclaration: ({
            node
        }) => {
            // import key from value; 拿到当前文件依赖的另一个文件路径
            dependencies.push(node.source.value);
        },
    });
    // 每读取到一个文件，就自增id维护
    const id = ID++;

    // `babel-preset-env``将代码转换为浏览器可以运行的东西. 
    const {
        code
    } = transformFromAst(ast, null, {
        presets: ['env'],
    });

    // 返回有关此模块的所有信息.
    return {
        id,
        filename,
        dependencies,
        code,
    };
}

/********
 * 1、传入entry文件 得到文件信息，根据entry的依赖dfs遍历得到graph
 * 单独文件的信息：
 *      {id,filename,dependencies,code}
 * 构建过程中，不断维护 mapping字段
 */
function createGraph(entry) {
    const mainAsset = createAsset(entry);
    const queue = [mainAsset];
    for (const asset of queue) {
        // 我们的每一个 资产 都有它所依赖模块的相对路径列表. 
        // 我们将重复它们,用我们的`createAsset() `函数解析它们,并跟踪此模块在此对象中的依赖关系.
        asset.mapping = {};
        // 记录filename的作用：和dependencies里的相对路径 拼凑成绝对路径
        const dirname = path.dirname(asset.filename);

        // 我们遍历其相关路径的列表
        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);
            // 每次解析dependencies读取一个文件 就产生一个模块备份
            // 同时维护relativePath对应的全局id
            const child = createAsset(absolutePath);
            asset.mapping[relativePath] = child.id;

            // 典型的DFS
            queue.push(child);
        });
    }
    return queue;
}

function bundle(graph) {
    let modules = '';
    graph.forEach(mod => {
        modules += `${mod.id}: [
            function (require, module, exports) { ${mod.code} },
            ${JSON.stringify(mod.mapping)}, 
        ],`;
    });

    const result = `
    (function(modules) {
      function require(id) { //🌟
        const [fn, mapping] = modules[id];

        function localRequire(name) { //⏰
          return require(mapping[name]); //🌟
        }

        const module = { exports : {} };

        fn(localRequire, module, module.exports); 

        return module.exports;
      }

      require(0);
    })({${modules}})
  `;

    return result;// 返回字符串 写入bundlejs文件
}

const graph = createGraph('src/index.js');
const result = bundle(graph);

function getFilePath(filename) {
    const processDir = process.cwd(); // 当前进程执行目录
    const createDir = path.resolve(processDir); // path 从右到左依次处理，直到构造出绝对路径。
    const filePath = path.join(createDir, filename);
    return filePath;
}
// fs.writeFileSync(getFilePath('dist/graph.json'), JSON.stringify(graph));
fs.writeFileSync(getFilePath('dist/bundle.js'), result);
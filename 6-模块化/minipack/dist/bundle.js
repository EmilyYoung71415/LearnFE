
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
    })({0: [
            function (require, module, exports) { "use strict";

require("./moduleA.js");

require("./moduleB.js");

console.log('入口文件'); },
            {"./moduleA.js":1,"./moduleB.js":2}, 
        ],1: [
            function (require, module, exports) { "use strict";

console.log('A模块'); },
            {}, 
        ],2: [
            function (require, module, exports) { "use strict";

console.log('B模块'); },
            {}, 
        ],})
  
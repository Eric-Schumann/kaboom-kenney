// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/lib/objects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ['openDoor', 'lockedDoor', 'diamond', 'grass', 'BG'];
exports.default = _default;
},{}],"src/entities/background.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  return [sprite('BG'), layer('bg'), scale(3)];
};

exports.default = _default;
},{}],"src/entities/grass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  return [sprite('grass'), pos(0, 0), solid()];
};

exports.default = _default;
},{}],"src/entities/diamond.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  return [sprite('diamond'), pos(0, 0), area(vec2(15, 15), vec2(50, 50)), 'diamond'];
};

exports.default = _default;
},{}],"src/entities/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  return [sprite('player', {
    frame: 0
  }), pos(width() / 2, height() / 2), body({
    jumpForce: 640,
    maxVel: 2400
  }), scale(1), area(vec2(-25, -15), vec2(25, 50)), origin('center'), {
    speed: 200,
    diamondsCollected: 0
  }, 'player'];
};

exports.default = _default;
},{}],"src/entities/openDoor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  return [sprite('openDoor'), pos(width() - 100, height() - 144), scale(1, 1.25), 'openDoor', area(vec2(20, 0), vec2(40, 65))];
};

exports.default = _default;
},{}],"src/entities/lockedDoor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  return [sprite('lockedDoor'), pos(width() - 100, height() - 144), layer('bg'), scale(1, 1.25)];
};

exports.default = _default;
},{}],"src/game.js":[function(require,module,exports) {
"use strict";

var _objects = _interopRequireDefault(require("./lib/objects"));

var _background = _interopRequireDefault(require("./entities/background"));

var _grass = _interopRequireDefault(require("./entities/grass"));

var _diamond = _interopRequireDefault(require("./entities/diamond"));

var _player = _interopRequireDefault(require("./entities/player"));

var _openDoor = _interopRequireDefault(require("./entities/openDoor"));

var _lockedDoor = _interopRequireDefault(require("./entities/lockedDoor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

kaboom.global();
loadSound('coin', 'coin.ogg');
loadSound('win', 'achieved.ogg');
loadSprite('player', 'player.png', {
  sliceX: 4,
  sliceY: 2,
  anims: {
    idle: [0],
    walk: [2, 3],
    jump: [1],
    win: [7]
  }
});

var _iterator = _createForOfIteratorHelper(_objects.default),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var obj = _step.value;
    loadSprite(obj, "".concat(obj, ".png"));
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

init({
  width: 640,
  height: 480,
  canvas: document.querySelector('#game')
});
scene('main', function () {
  var DIAMOND_COUNT = width() / 128;
  layers(['bg', 'sprites', 'ui'], 'sprites');
  add((0, _background.default)());
  var player = add((0, _player.default)());

  for (var i = 0; i < width() / 64; i++) {
    var block = add((0, _grass.default)());
    block.pos.y = height() - 64;
    block.pos.x = i * 64;
  }

  for (var _i = 0; _i < DIAMOND_COUNT; _i++) {
    var d = add((0, _diamond.default)());
    d.pos.y = height() - 200;
    d.pos.x = _i * 128 + 32;
  }

  add((0, _lockedDoor.default)());
  player.action(function () {
    if (player.diamondsCollected === DIAMOND_COUNT) {
      add((0, _openDoor.default)());
      readd(player);
      player.diamondsCollected = 0;
    }
  });
  player.on('grounded', function () {
    player.frame = 0;
  });
  keyDown('a', function () {
    if (player.pos.x > player.area.p2.x / 2) {
      player.move(-player.speed, 0);
      player.flipX(-1);

      if (player.grounded() && player.curAnim() !== 'walk') {
        player.play('walk');
      }
    }
  });
  keyDown('d', function () {
    if (player.pos.x < width() - player.area.p2.x / 2) {
      player.flipX(1);
      player.move(player.speed, 0);

      if (player.grounded() && player.curAnim() !== 'walk') {
        player.play('walk');
      }
    }
  });
  keyRelease(['a', 'd'], function () {
    if (player.grounded()) {
      player.play('idle');
      player.stop();
    }
  });
  keyPress('space', function () {
    if (player.grounded()) {
      player.jump();

      if (player.curAnim() !== 'jump') {
        player.play('jump');
        player.stop();
      }
    }
  });
  overlaps('player', 'diamond', function (p, d) {
    p.diamondsCollected += 1;
    destroy(d);
    play('coin', {
      loop: false,
      speed: 1.25
    });
  });
  overlaps('player', 'openDoor', function (p, d) {
    play('win');
    wait(1.5, function () {
      go('gameover');
    });
  });
});
scene('gameover', function () {
  var winText = add([text('You win!'), pos(0, 0)]);
  winText.pos.x = width() / 2 - winText.area.p2.x / 2;
  winText.pos.y = height() / 2;
  var hitEnter = add([text('Press Enter'), pos(0, 0)]);
  hitEnter.pos.x = width() / 2 - hitEnter.area.p2.x / 2;
  hitEnter.pos.y = height() / 2 + winText.area.p2.y;
  keyPress('enter', function () {
    go('main');
  });
});
start('main');
},{"./lib/objects":"src/lib/objects.js","./entities/background":"src/entities/background.js","./entities/grass":"src/entities/grass.js","./entities/diamond":"src/entities/diamond.js","./entities/player":"src/entities/player.js","./entities/openDoor":"src/entities/openDoor.js","./entities/lockedDoor":"src/entities/lockedDoor.js"}],"../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50109" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","src/game.js"], null)
//# sourceMappingURL=/game.e499fc5e.js.map
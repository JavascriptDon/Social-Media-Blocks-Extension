(function () {
  window.chrome = window.chrome || {};
  chrome.runtime = chrome.runtime || {};
  if (typeof chrome.runtime.getManifest !== 'function') {
    chrome.runtime.getManifest = function () {
      return { name: 'Social Media Blocks', version: '2.1.0' };
    };
  }
  if (!chrome.storage) {
    chrome.storage = {
      local: {
        get: function (key, cb) {
          try {
            var raw = localStorage.getItem(key);
            var result = {};
            if (raw) result[key] = JSON.parse(raw);
            if (cb) cb(result);
          } catch (e) { if (cb) cb({}); }
        },
        set: function (obj, cb) {
          try {
            Object.keys(obj).forEach(function (k) {
              localStorage.setItem(k, JSON.stringify(obj[k]));
            });
          } catch (e) {}
          if (cb) cb();
        }
      }
    };
  }
})();

! function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.puplugin = {})
}(this, function (e) {
  "use strict";
  var t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

  function r(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports
  }
  var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    n = r(function (e, t) {
      e.exports = function (e) {
        function t(a) {
          if (r[a]) return r[a].exports;
          var n = r[a] = {
            exports: {},
            id: a,
            loaded: !1
          };
          return e[a].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
        }
        var r = {};
        return t.m = e, t.c = r, t.p = "", t(0)
      }([function (e, t, r) {
        var n = function () {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var a = t[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
              }
            }
            return function (t, r, a) {
              return r && e(t.prototype, r), a && e(t, a), t
            }
          }(),
          i = r(1).Pangu,
          o = function (e) {
            function t() {
              ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
              }(this, t);
              var e = function (e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != (void 0 === t ? "undefined" : a(t)) && "function" != typeof t ? e : t
              }(this, Object.getPrototypeOf(t).call(this));
              return e.topTags = /^(html|head|body|#document)$/i, e.ignoreTags = /^(script|code|pre|textarea)$/i, e.spaceSensitiveTags = /^(a|del|pre|s|strike|u)$/i, e.spaceLikeTags = /^(br|hr|i|img|pangu)$/i, e.blockTags = /^(div|h1|h2|h3|h4|h5|h6|p)$/i, e
            }
            return function (e, t) {
              if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : a(t)));
              e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0
                }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), n(t, [{
              key: "canIgnoreNode",
              value: function (e) {
                for (var t = e.parentNode; t && t.nodeName && -1 === t.nodeName.search(this.topTags);) {
                  if (t.nodeName.search(this.ignoreTags) >= 0 || t.isContentEditable || "true" === t.getAttribute("g_editable")) return !0;
                  t = t.parentNode
                }
                return !1
              }
            }, {
              key: "isFirstTextChild",
              value: function (e, t) {
                for (var r = e.childNodes, a = 0; a < r.length; a++) {
                  var n = r[a];
                  if (8 !== n.nodeType && n.textContent) return n === t
                }
                return !1
              }
            }, {
              key: "isLastTextChild",
              value: function (e, t) {
                for (var r = e.childNodes, a = r.length - 1; a > -1; a--) {
                  var n = r[a];
                  if (8 !== n.nodeType && n.textContent) return n === t
                }
                return !1
              }
            }, {
              key: "spacingNodeByXPath",
              value: function (e, t) {
                for (var r = document.evaluate(e, t, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), a = void 0, n = void 0, i = r.snapshotLength - 1; i > -1; --i)
                  if (a = r.snapshotItem(i), this.canIgnoreNode(a)) n = a;
                  else {
                    var o = this.spacing(a.data);
                    if (a.data !== o && (a.data = o), n) {
                      if (a.nextSibling && a.nextSibling.nodeName.search(this.spaceLikeTags) >= 0) {
                        n = a;
                        continue
                      }
                      var s = a.data.toString().substr(-1) + n.data.toString().substr(0, 1),
                        l = this.spacing(s);
                      if (l !== s) {
                        for (var c = n; c.parentNode && -1 === c.nodeName.search(this.spaceSensitiveTags) && this.isFirstTextChild(c.parentNode, c);) c = c.parentNode;
                        for (var u = a; u.parentNode && -1 === u.nodeName.search(this.spaceSensitiveTags) && this.isLastTextChild(u.parentNode, u);) u = u.parentNode;
                        if (u.nextSibling && u.nextSibling.nodeName.search(this.spaceLikeTags) >= 0) {
                          n = a;
                          continue
                        }
                        if (-1 === u.nodeName.search(this.blockTags))
                          if (-1 === c.nodeName.search(this.spaceSensitiveTags)) - 1 === c.nodeName.search(this.ignoreTags) && -1 === c.nodeName.search(this.blockTags) && (n.previousSibling ? -1 === n.previousSibling.nodeName.search(this.spaceLikeTags) && (n.data = " " + n.data) : this.canIgnoreNode(n) || (n.data = " " + n.data));
                          else if (-1 === u.nodeName.search(this.spaceSensitiveTags)) a.data = a.data + " ";
                        else {
                          var d = document.createElement("pangu");
                          d.innerHTML = " ", c.previousSibling ? -1 === c.previousSibling.nodeName.search(this.spaceLikeTags) && c.parentNode.insertBefore(d, c) : c.parentNode.insertBefore(d, c), d.previousElementSibling || d.parentNode && d.parentNode.removeChild(d)
                        }
                      }
                    }
                    n = a
                  }
              }
            }, {
              key: "spacingNode",
              value: function (e) {
                this.spacingNodeByXPath(".//*/text()[normalize-space(.)]", e)
              }
            }, {
              key: "spacingElementById",
              value: function (e) {
                var t = 'id("' + e + '")//text()';
                this.spacingNodeByXPath(t, document)
              }
            }, {
              key: "spacingElementByClassName",
              value: function (e) {
                var t = '//*[contains(concat(" ", normalize-space(@class), " "), "' + e + '")]//text()';
                this.spacingNodeByXPath(t, document)
              }
            }, {
              key: "spacingElementByTagName",
              value: function (e) {
                var t = "//" + e + "//text()";
                this.spacingNodeByXPath(t, document)
              }
            }, {
              key: "spacingPageTitle",
              value: function () {
                this.spacingNodeByXPath("/html/head/title/text()", document)
              }
            }, {
              key: "spacingPageBody",
              value: function () {
                for (var e = "/html/body//*/text()[normalize-space(.)]", t = ["script", "style", "textarea"], r = 0; r < t.length; r++) {
                  var a = t[r];
                  e += '[translate(name(..),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")!="' + a + '"]'
                }
                this.spacingNodeByXPath(e, document)
              }
            }, {
              key: "spacingPage",
              value: function () {
                this.spacingPageTitle(), this.spacingPageBody()
              }
            }]), t
          }(i),
          s = new o;
        (e.exports = s).Pangu = o
      }, function (e, t) {
        var r = function () {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var a = t[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
              }
            }
            return function (t, r, a) {
              return r && e(t.prototype, r), a && e(t, a), t
            }
          }(),
          a = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(["])/g,
          n = /(["])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
          i = /(["']+)(\s*)(.+?)(\s*)(["']+)/g,
          o = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])( )(')([A-Za-z])/g,
          s = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#)([A-Za-z0-9\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)(#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
          l = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#([^ ]))/g,
          c = /(([^ ])#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
          u = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\+\-\*\/=&\\|<>])([A-Za-z0-9])/g,
          d = /([A-Za-z0-9])([\+\-\*\/=&\\|<>])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
          h = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c]+(.*?)[\)\]\}>\u201d]+)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
          f = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c>])/g,
          p = /([\)\]\}>\u201d<])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
          g = /([\(\[\{<\u201c]+)(\s*)(.+?)(\s*)([\)\]\}>\u201d]+)/,
          m = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([~!;:,\.\?\u2026])([A-Za-z0-9])/g,
          _ = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([A-Za-z0-9`\$%\^&\*\-=\+\\\|\/@\u00a1-\u00ff\u2022\u2027\u2150-\u218f])/g,
          b = /([A-Za-z0-9`~\$%\^&\*\-=\+\\\|\/!;:,\.\?\u00a1-\u00ff\u2022\u2026\u2027\u2150-\u218f])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
          v = function () {
            function e() {
              ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
              }(this, e)
            }
            return r(e, [{
              key: "spacing",
              value: function (e) {
                var t = e,
                  r = t = (t = (t = (t = (t = (t = (t = (t = (t = t.replace(a, "$1 $2")).replace(n, "$1 $2")).replace(i, "$1$3$5")).replace(o, "$1$3$4")).replace(s, "$1 $2$3$4 $5")).replace(l, "$1 $2")).replace(c, "$1 $3")).replace(u, "$1 $2 $3")).replace(d, "$1 $2 $3"),
                  v = t.replace(h, "$1 $2 $4");
                return t = v, r === v && (t = (t = t.replace(f, "$1 $2")).replace(p, "$1 $2")), t = (t = (t = (t = t.replace(g, "$1$3$5")).replace(m, "$1$2 $3")).replace(_, "$1 $2")).replace(b, "$1 $2")
              }
            }, {
              key: "spacingText",
              value: function (e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? function () {} : arguments[1];
                try {
                  var r = this.spacing(e);
                  t(null, r)
                } catch (e) {
                  t(e)
                }
              }
            }]), e
          }(),
          w = new v;
        (e.exports = w).Pangu = v
      }])
    });
  n.pangu;

  function i(e, t) {
    for (var r = 0, a = e.length - 1; a >= 0; a--) {
      var n = e[a];
      "." === n ? e.splice(a, 1) : ".." === n ? (e.splice(a, 1), r++) : r && (e.splice(a, 1), r--)
    }
    if (t)
      for (; r--; r) e.unshift("..");
    return e
  }
  var o = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
    s = function (e) {
      return o.exec(e).slice(1)
    };

  function l() {
    for (var e = "", t = !1, r = arguments.length - 1; r >= -1 && !t; r--) {
      var a = r >= 0 ? arguments[r] : "/";
      if ("string" != typeof a) throw new TypeError("Arguments to path.resolve must be strings");
      a && (e = a + "/" + e, t = "/" === a.charAt(0))
    }
    return e = i(_(e.split("/"), function (e) {
      return !!e
    }), !t).join("/"), (t ? "/" : "") + e || "."
  }

  function c(e) {
    var t = u(e),
      r = "/" === b(e, -1);
    return (e = i(_(e.split("/"), function (e) {
      return !!e
    }), !t).join("/")) || t || (e = "."), e && r && (e += "/"), (t ? "/" : "") + e
  }

  function u(e) {
    return "/" === e.charAt(0)
  }

  function d() {
    return c(_(Array.prototype.slice.call(arguments, 0), function (e, t) {
      if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
      return e
    }).join("/"))
  }

  function h(e, t) {
    function r(e) {
      for (var t = 0; t < e.length && "" === e[t]; t++);
      for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
      return t > r ? [] : e.slice(t, r - t + 1)
    }
    e = l(e).substr(1), t = l(t).substr(1);
    for (var a = r(e.split("/")), n = r(t.split("/")), i = Math.min(a.length, n.length), o = i, s = 0; s < i; s++)
      if (a[s] !== n[s]) {
        o = s;
        break
      } var c = [];
    for (s = o; s < a.length; s++) c.push("..");
    return (c = c.concat(n.slice(o))).join("/")
  }

  function f(e) {
    var t = s(e),
      r = t[0],
      a = t[1];
    return r || a ? (a && (a = a.substr(0, a.length - 1)), r + a) : "."
  }

  function p(e, t) {
    var r = s(e)[2];
    return t && r.substr(-1 * t.length) === t && (r = r.substr(0, r.length - t.length)), r
  }

  function g(e) {
    return s(e)[3]
  }
  var m = {
    extname: g,
    basename: p,
    dirname: f,
    sep: "/",
    delimiter: ":",
    relative: h,
    join: d,
    isAbsolute: u,
    normalize: c,
    resolve: l
  };

  function _(e, t) {
    if (e.filter) return e.filter(t);
    for (var r = [], a = 0; a < e.length; a++) t(e[a], a, e) && r.push(e[a]);
    return r
  }
  var b = "b" === "ab".substr(-1) ? function (e, t, r) {
      return e.substr(t, r)
    } : function (e, t, r) {
      return t < 0 && (t = e.length + t), e.substr(t, r)
    },
    v = Object.freeze({
      resolve: l,
      normalize: c,
      isAbsolute: u,
      join: d,
      relative: h,
      sep: "/",
      delimiter: ":",
      dirname: f,
      basename: p,
      extname: g,
      default: m
    }),
    w = function (e, t) {
      for (var r = [], a = 0; a < e.length; a++) {
        var n = t(e[a], a);
        y(n) ? r.push.apply(r, n) : r.push(n)
      }
      return r
    },
    y = Array.isArray || function (e) {
      return "[object Array]" === Object.prototype.toString.call(e)
    },
    k = E;

  function E(e, t, r) {
    e instanceof RegExp && (e = T(e, r)), t instanceof RegExp && (t = T(t, r));
    var a = x(e, t, r);
    return a && {
      start: a[0],
      end: a[1],
      pre: r.slice(0, a[0]),
      body: r.slice(a[0] + e.length, a[1]),
      post: r.slice(a[1] + t.length)
    }
  }

  function T(e, t) {
    var r = t.match(e);
    return r ? r[0] : null
  }

  function x(e, t, r) {
    var a, n, i, o, s, l = r.indexOf(e),
      c = r.indexOf(t, l + 1),
      u = l;
    if (l >= 0 && c > 0) {
      for (a = [], i = r.length; u >= 0 && !s;) u == l ? (a.push(u), l = r.indexOf(e, u + 1)) : 1 == a.length ? s = [a.pop(), c] : ((n = a.pop()) < i && (i = n, o = c), c = r.indexOf(t, u + 1)), u = l < c && l >= 0 ? l : c;
      a.length && (s = [i, o])
    }
    return s
  }
  E.range = x;
  var N = function (e) {
      if (!e) return [];
      "{}" === e.substr(0, 2) && (e = "\\{\\}" + e.substr(2));
      return function e(t, r) {
        var a = [];
        var n = k("{", "}", t);
        if (!n || /\$$/.test(n.pre)) return [t];
        var i = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(n.body);
        var o = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(n.body);
        var s = i || o;
        var l = n.body.indexOf(",") >= 0;
        if (!s && !l) return n.post.match(/,.*\}/) ? (t = n.pre + "{" + n.body + S + n.post, e(t)) : [t];
        var c;
        if (s) c = n.body.split(/\.\./);
        else if (1 === (c = function e(t) {
            if (!t) return [""];
            var r = [];
            var a = k("{", "}", t);
            if (!a) return t.split(",");
            var n = a.pre;
            var i = a.body;
            var o = a.post;
            var s = n.split(",");
            s[s.length - 1] += "{" + i + "}";
            var l = e(o);
            o.length && (s[s.length - 1] += l.shift(), s.push.apply(s, l));
            r.push.apply(r, s);
            return r
          }(n.body)).length && 1 === (c = e(c[0], !1).map(M)).length) {
          var u = n.post.length ? e(n.post, !1) : [""];
          return u.map(function (e) {
            return n.pre + c[0] + e
          })
        }
        var d = n.pre;
        var u = n.post.length ? e(n.post, !1) : [""];
        var h;
        if (s) {
          var f = j(c[0]),
            p = j(c[1]),
            g = Math.max(c[0].length, c[1].length),
            m = 3 == c.length ? Math.abs(j(c[2])) : 1,
            _ = I,
            b = p < f;
          b && (m *= -1, _ = O);
          var v = c.some(B);
          h = [];
          for (var y = f; _(y, p); y += m) {
            var E;
            if (o) "\\" === (E = String.fromCharCode(y)) && (E = "");
            else if (E = String(y), v) {
              var T = g - E.length;
              if (T > 0) {
                var x = new Array(T + 1).join("0");
                E = y < 0 ? "-" + x + E.slice(1) : x + E
              }
            }
            h.push(E)
          }
        } else h = w(c, function (t) {
          return e(t, !1)
        });
        for (var N = 0; N < h.length; N++)
          for (var C = 0; C < u.length; C++) {
            var A = d + h[N] + u[C];
            (!r || s || A) && a.push(A)
          }
        return a
      }(function (e) {
        return e.split("\\\\").join(C).split("\\{").join(A).split("\\}").join(S).split("\\,").join(P).split("\\.").join(L)
      }(e), !0).map(z)
    },
    C = "\0SLASH" + Math.random() + "\0",
    A = "\0OPEN" + Math.random() + "\0",
    S = "\0CLOSE" + Math.random() + "\0",
    P = "\0COMMA" + Math.random() + "\0",
    L = "\0PERIOD" + Math.random() + "\0";

  function j(e) {
    return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0)
  }

  function z(e) {
    return e.split(C).join("\\").split(A).join("{").split(S).join("}").split(P).join(",").split(L).join(".")
  }

  function M(e) {
    return "{" + e + "}"
  }

  function B(e) {
    return /^-?0\d/.test(e)
  }

  function I(e, t) {
    return e <= t
  }

  function O(e, t) {
    return e >= t
  }
  var H = v && m || v,
    R = Y;
  Y.Minimatch = Q;
  var D = {
    sep: "/"
  };
  try {
    D = H
  } catch (e) {}
  var G = Y.GLOBSTAR = Q.GLOBSTAR = {},
    q = {
      "!": {
        open: "(?:(?!(?:",
        close: "))[^/]*?)"
      },
      "?": {
        open: "(?:",
        close: ")?"
      },
      "+": {
        open: "(?:",
        close: ")+"
      },
      "*": {
        open: "(?:",
        close: ")*"
      },
      "@": {
        open: "(?:",
        close: ")"
      }
    },
    U = "[^/]",
    F = U + "*?",
    V = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
    W = "(?:(?!(?:\\/|^)\\.).)*?",
    X = "().*{}+?[]^$\\!".split("").reduce(function (e, t) {
      return e[t] = !0, e
    }, {});
  var Z = /\/+/;

  function K(e, t) {
    e = e || {}, t = t || {};
    var r = {};
    return Object.keys(t).forEach(function (e) {
      r[e] = t[e]
    }), Object.keys(e).forEach(function (t) {
      r[t] = e[t]
    }), r
  }

  function Y(e, t, r) {
    if ("string" != typeof t) throw new TypeError("glob pattern string required");
    return r || (r = {}), !(!r.nocomment && "#" === t.charAt(0)) && ("" === t.trim() ? "" === e : new Q(t, r).match(e))
  }

  function Q(e, t) {
    if (!(this instanceof Q)) return new Q(e, t);
    if ("string" != typeof e) throw new TypeError("glob pattern string required");
    t || (t = {}), e = e.trim(), "/" !== D.sep && (e = e.split(D.sep).join("/")), this.options = t, this.set = [], this.pattern = e, this.regexp = null, this.negate = !1, this.comment = !1, this.empty = !1, this.make()
  }

  function J(e, t) {
    if (t || (t = this instanceof Q ? this.options : {}), void 0 === (e = void 0 === e ? this.pattern : e)) throw new TypeError("undefined pattern");
    return t.nobrace || !e.match(/\{.*\}/) ? [e] : N(e)
  }
  Y.filter = function (e, t) {
    return t = t || {},
      function (r, a, n) {
        return Y(r, e, t)
      }
  }, Y.defaults = function (e) {
    if (!e || !Object.keys(e).length) return Y;
    var t = Y,
      r = function (r, a, n) {
        return t.minimatch(r, a, K(e, n))
      };
    return r.Minimatch = function (r, a) {
      return new t.Minimatch(r, K(e, a))
    }, r
  }, Q.defaults = function (e) {
    return e && Object.keys(e).length ? Y.defaults(e).Minimatch : Q
  }, Q.prototype.debug = function () {}, Q.prototype.make = function () {
    if (this._made) return;
    var e = this.pattern,
      t = this.options;
    if (!t.nocomment && "#" === e.charAt(0)) return void(this.comment = !0);
    if (!e) return void(this.empty = !0);
    this.parseNegate();
    var r = this.globSet = this.braceExpand();
    t.debug && (this.debug = console.error);
    this.debug(this.pattern, r), r = this.globParts = r.map(function (e) {
      return e.split(Z)
    }), this.debug(this.pattern, r), r = r.map(function (e, t, r) {
      return e.map(this.parse, this)
    }, this), this.debug(this.pattern, r), r = r.filter(function (e) {
      return -1 === e.indexOf(!1)
    }), this.debug(this.pattern, r), this.set = r
  }, Q.prototype.parseNegate = function () {
    var e = this.pattern,
      t = !1,
      r = 0;
    if (this.options.nonegate) return;
    for (var a = 0, n = e.length; a < n && "!" === e.charAt(a); a++) t = !t, r++;
    r && (this.pattern = e.substr(r));
    this.negate = t
  }, Y.braceExpand = function (e, t) {
    return J(e, t)
  }, Q.prototype.braceExpand = J, Q.prototype.parse = function (e, t) {
    if (e.length > 65536) throw new TypeError("pattern is too long");
    var r = this.options;
    if (!r.noglobstar && "**" === e) return G;
    if ("" === e) return "";
    var a, n = "",
      i = !!r.nocase,
      o = !1,
      s = [],
      l = [],
      c = !1,
      u = -1,
      d = -1,
      h = "." === e.charAt(0) ? "" : r.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)",
      f = this;

    function p() {
      if (a) {
        switch (a) {
          case "*":
            n += F, i = !0;
            break;
          case "?":
            n += U, i = !0;
            break;
          default:
            n += "\\" + a
        }
        f.debug("clearStateChar %j %j", a, n), a = !1
      }
    }
    for (var g, m = 0, _ = e.length; m < _ && (g = e.charAt(m)); m++)
      if (this.debug("%s\t%s %s %j", e, m, n, g), o && X[g]) n += "\\" + g, o = !1;
      else switch (g) {
        case "/":
          return !1;
        case "\\":
          p(), o = !0;
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          if (this.debug("%s\t%s %s %j <-- stateChar", e, m, n, g), c) {
            this.debug("  in class"), "!" === g && m === d + 1 && (g = "^"), n += g;
            continue
          }
          f.debug("call clearStateChar %j", a), p(), a = g, r.noext && p();
          continue;
        case "(":
          if (c) {
            n += "(";
            continue
          }
          if (!a) {
            n += "\\(";
            continue
          }
          s.push({
            type: a,
            start: m - 1,
            reStart: n.length,
            open: q[a].open,
            close: q[a].close
          }), n += "!" === a ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", a, n), a = !1;
          continue;
        case ")":
          if (c || !s.length) {
            n += "\\)";
            continue
          }
          p(), i = !0;
          var b = s.pop();
          n += b.close, "!" === b.type && l.push(b), b.reEnd = n.length;
          continue;
        case "|":
          if (c || !s.length || o) {
            n += "\\|", o = !1;
            continue
          }
          p(), n += "|";
          continue;
        case "[":
          if (p(), c) {
            n += "\\" + g;
            continue
          }
          c = !0, d = m, u = n.length, n += g;
          continue;
        case "]":
          if (m === d + 1 || !c) {
            n += "\\" + g, o = !1;
            continue
          }
          if (c) var v, w = e.substring(d + 1, m);
          i = !0, c = !1, n += g;
          continue;
        default:
          p(), o ? o = !1 : !X[g] || "^" === g && c || (n += "\\"), n += g
      }
    c && (w = e.substr(d + 1), v = this.parse(w, ee), n = n.substr(0, u) + "\\[" + v[0], i = i || v[1]);
    for (b = s.pop(); b; b = s.pop()) {
      var y = n.slice(b.reStart + b.open.length);
      this.debug("setting tail", n, b), y = y.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (e, t, r) {
        return r || (r = "\\"), t + t + r + "|"
      }), this.debug("tail=%j\n   %s", y, y, b, n);
      var k = "*" === b.type ? F : "?" === b.type ? U : "\\" + b.type;
      i = !0, n = n.slice(0, b.reStart) + k + "\\(" + y
    }
    p(), o && (n += "\\\\");
    var E = !1;
    switch (n.charAt(0)) {
      case ".":
      case "[":
      case "(":
        E = !0
    }
    for (var T = l.length - 1; T > -1; T--) {
      var x = l[T],
        N = n.slice(0, x.reStart),
        C = n.slice(x.reStart, x.reEnd - 8),
        A = n.slice(x.reEnd - 8, x.reEnd),
        S = n.slice(x.reEnd);
      A += S;
      var P = N.split("(").length - 1,
        L = S;
      for (m = 0; m < P; m++) L = L.replace(/\)[+*?]?/, "");
      var j = "";
      "" === (S = L) && t !== ee && (j = "$");
      var z = N + C + S + j + A;
      n = z
    }
    "" !== n && i && (n = "(?=.)" + n);
    E && (n = h + n);
    if (t === ee) return [n, i];
    if (!i) return e.replace(/\\(.)/g, "$1");
    var $ = r.nocase ? "i" : "";
    try {
      var M = new RegExp("^" + n + "$", $)
    } catch (e) {
      return new RegExp("$.")
    }
    return M._glob = e, M._src = n, M
  };
  var ee = {};
  Y.makeRe = function (e, t) {
    return new Q(e, t || {}).makeRe()
  }, Q.prototype.makeRe = function () {
    if (this.regexp || !1 === this.regexp) return this.regexp;
    var e = this.set;
    if (!e.length) return this.regexp = !1, this.regexp;
    var t = this.options,
      r = t.noglobstar ? F : t.dot ? V : W,
      a = t.nocase ? "i" : "",
      n = e.map(function (e) {
        return e.map(function (e) {
          return e === G ? r : "string" == typeof e ? e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : e._src
        }).join("\\/")
      }).join("|");
    n = "^(?:" + n + ")$", this.negate && (n = "^(?!" + n + ").*$");
    try {
      this.regexp = new RegExp(n, a)
    } catch (e) {
      this.regexp = !1
    }
    return this.regexp
  }, Y.match = function (e, t, r) {
    var a = new Q(t, r = r || {});
    return e = e.filter(function (e) {
      return a.match(e)
    }), a.options.nonull && !e.length && e.push(t), e
  }, Q.prototype.match = function (e, t) {
    if (this.debug("match", e, this.pattern), this.comment) return !1;
    if (this.empty) return "" === e;
    if ("/" === e && t) return !0;
    var r = this.options;
    "/" !== D.sep && (e = e.split(D.sep).join("/"));
    e = e.split(Z), this.debug(this.pattern, "split", e);
    var a, n, i = this.set;
    for (this.debug(this.pattern, "set", i), n = e.length - 1; n >= 0 && !(a = e[n]); n--);
    for (n = 0; n < i.length; n++) {
      var o = i[n],
        s = e;
      r.matchBase && 1 === o.length && (s = [a]);
      var l = this.matchOne(s, o, t);
      if (l) return !!r.flipNegate || !this.negate
    }
    return !r.flipNegate && this.negate
  }, Q.prototype.matchOne = function (e, t, r) {
    var a = this.options;
    this.debug("matchOne", {
      this: this,
      file: e,
      pattern: t
    }), this.debug("matchOne", e.length, t.length);
    for (var n = 0, i = 0, o = e.length, s = t.length; n < o && i < s; n++, i++) {
      this.debug("matchOne loop");
      var l, c = t[i],
        u = e[n];
      if (this.debug(t, c, u), !1 === c) return !1;
      if (c === G) {
        this.debug("GLOBSTAR", [t, c, u]);
        var d = n,
          h = i + 1;
        if (h === s) {
          for (this.debug("** at the end"); n < o; n++)
            if ("." === e[n] || ".." === e[n] || !a.dot && "." === e[n].charAt(0)) return !1;
          return !0
        }
        for (; d < o;) {
          var f = e[d];
          if (this.debug("\nglobstar while", e, d, t, h, f), this.matchOne(e.slice(d), t.slice(h), r)) return this.debug("globstar found match!", d, o, f), !0;
          if ("." === f || ".." === f || !a.dot && "." === f.charAt(0)) {
            this.debug("dot detected!", e, d, t, h);
            break
          }
          this.debug("globstar swallow a segment, and continue"), d++
        }
        return !(!r || (this.debug("\n>>> no match, partial?", e, d, t, h), d !== o))
      }
      if ("string" == typeof c ? (l = a.nocase ? u.toLowerCase() === c.toLowerCase() : u === c, this.debug("string match", c, u, l)) : (l = u.match(c), this.debug("pattern match", c, u, l)), !l) return !1
    }
    if (n === o && i === s) return !0;
    if (n === o) return r;
    if (i === s) return n === o - 1 && "" === e[n];
    throw new Error("wtf?")
  };
  var te = [];
  var re = Object.freeze({
      before: function (e, t) {
        te = [], "zhuanlan.zhihu.com" == e && t.find("a[data-draft-type]").map(function (e, t) {
          var r = $(t.outerHTML);
          r.find(".LinkCard-meta svg").remove(), te[e] = r[0].outerHTML, $(t).replaceWith("<sr-blocks></sr-blocks>")
        }), "sspai.com" == e && t.find(".ssApp").map(function (e, t) {
          var r = $($("body").find(".ss-app-card")[e].outerHTML);
          r.find(".code_box").remove(), te[e] = r[0].outerHTML, $(t).replaceWith("<sr-blocks></sr-blocks>")
        }), "question.zhihu.com" == e && t.find(".RichText-MCNLinkCardContainer").map(function (e, t) {
          var r = $($("body").find(".RichText-MCNLinkCardContainer")[e].outerHTML);
          te[e] = r[0].outerHTML, $(t).replaceWith("<sr-blocks></sr-blocks>")
        }), "post.smzdm.com" == e && t.find(".embed-card").map(function (e, t) {
          var r = $($("body").find(".embed-card")[e].outerHTML);
          te[e] = r[0].outerHTML, $(t).parent().replaceWith("<sr-blocks></sr-blocks>")
        })
      },
      specbeautify: function (e, t) {
        switch (e) {
          case "sspai.com":
            t.find(".relation-apps").remove(), t.find(".ss-app-card").remove();
            break;
          case "post.smzdm.com":
            t.find("img.face").addClass("sr-rd-content-nobeautify"), t.find(".insert-outer img").addClass("sr-rd-content-nobeautify");
            break;
          case "infoq.com":
            t.find("img").map(function (e, t) {
              "left" == $(t).css("float") && $(t).addClass("sr-rd-content-nobeautify")
            }), t.find("script").remove();
            break;
          case "appinn.com":
          case "hacpai.com":
            t.find(".emoji").addClass("sr-rd-content-nobeautify");
            break;
          case "douban.com":
            t.find(".review-content").children().unwrap(), t.find("table").addClass("sr-rd-content-center"), t.find("p").css({
              "white-space": "pre-wrap"
            }), t.find(".cc").removeClass();
            break;
          case "qdaily.com":
            t.find("img").map(function (e, t) {
              var r = $(t);
              0 == Number.parseInt(r.css("height")) && r.remove()
            }), t.find(".com-insert-images").map(function (e, t) {
              var r = $(t),
                a = r.find("img").map(function (e, t) {
                  return "<div>" + t.outerHTML + "</div>"
                }).get().join("");
              r.empty().removeAttr("class").append(a)
            }), t.find(".com-insert-embed").remove();
            break;
          case "news.mtime.com":
            t.find(".newspictool").map(function (e, t) {
              var r = $(t),
                a = r.find("img"),
                n = r.find("p:last");
              r.removeAttr("class").addClass("sr-rd-content-center").empty().append(a).append(n)
            });
            break;
          case "blog.csdn.net":
            t.find(".save_code").remove(), t.find(".pre-numbering").remove(), t.find("pre").removeAttr("style").removeAttr("class"), t.find("code").removeAttr("style"), t.find(".dp-highlighter").map(function (e, t) {
              $(t).find(".bar .tools").remove(), $(t).next().is("pre") && $(t).next().remove()
            });
            break;
          case "news.sohu.com":
            t.find(".conserve-photo").remove(), t.find("table").addClass("sr-rd-content-center");
            break;
          case "qq.com":
            t.find(".rv-root-v2, #backqqcom").remove();
            break;
          case "azofreeware.com":
            t.find("iframe").remove();
            break;
          case "apprcn.com":
            t.find("img").map(function (e, t) {
              var r = $(t),
                a = r.attr("src");
              a && a.includes("Apprcn_Wechat_Small.jpeg") && r.parent().remove()
            }), t.find("a").map(function (e, t) {
              var r = $(t);
              "来自反斗软件" == r.text() && r.parent().remove()
            });
            break;
          case "tieba.baidu.com":
            t.find(".BDE_Smiley").addClass("sr-rd-content-nobeautify"), t.find(".replace_div").removeAttr("class").removeAttr("style"), t.find(".replace_tip").remove(), t.find(".d_post_content, .j_d_post_content, .post_bubble_top, .post_bubble_middle, .post_bubble_bottom").map(function (e, t) {
              $(t).removeAttr("class").removeAttr("style")
            }), $("body").find(".p_author_face").map(function (e, t) {
              var r = $(t).find("img"),
                a = r.attr("data-tb-lazyload"),
                n = r.attr("username");
              a && $("sr-rd-mult-avatar").find("span").map(function (e, t) {
                var r = $(t);
                r.text() == n && r.parent().find("img").attr("src", a)
              })
            });
            break;
          case "jingyan.baidu.com":
            t.find(".exp-image-wraper").removeAttr("class").removeAttr("href");
            break;
          case "question.zhihu.com":
            t.find(".zu-edit-button").remove(), t.find("a.external").map(function (e, t) {
              $(t).removeAttr("class").attr("style", "border: none;")
            }), t.find(".VagueImage").map(function (e, t) {
              var r = $(t),
                a = r.attr("data-src");
              r.replaceWith('<img class="sr-rd-content-img" src="' + a + '" style="zoom: 0.6;">')
            });
            break;
          case "chiphell.com":
            t.find("img").map(function (e, t) {
              var r = $(t),
                a = r.parent(),
                n = r.attr("src"),
                i = r.attr("smilieid");
              a.is("ignore_js_op") && r.unwrap(), i && n && n.includes("static/image/smiley") && r.addClass("sr-rd-content-nobeautify").attr("style", "width: 50px;")
            }), t.find(".quote").remove();
            break;
          case "jiemian.com":
            t.find("script").remove();
            break;
          case "36kr.com":
            t.find(".load-html-img").removeAttr("class");
            break;
          case "cnblogs.com":
            t.find(".cnblogs_code").removeClass(), t.find(".cnblogs_code_hide").removeClass().removeAttr("style"), t.find(".cnblogs_code_toolbar").remove(), t.find(".code_img_opened").remove(), t.find(".code_img_closed").remove();
            break;
          case "news.cnblogs.com":
            t.find(".topic_img").remove();
            break;
          case "g-cores.com":
            t.find(".swiper-slide-active").find("img").map(function (e, t) {
              var r = $(t);
              r.parent().parent().parent().parent().parent().parent().removeAttr("class").removeAttr("style").html(r)
            });
            break;
          case "feng.com":
          case "young.ifeng.com":
            t.find("span").removeAttr("style");
            break;
          case "ftchinese.com":
            t.find("script").remove();
            break;
          case "segmentfault.com":
            t.find(".widget-codetool").remove();
            break;
          case "mp.weixin.qq.com":
            t.find('section[powered-by="xiumi.us"]').find("img").map(function (e, t) {
              var r = $(t),
                a = r.attr("data-src");
              r.addClass("sr-rd-content-nobeautify").attr("src", a)
            });
            break;
          case "ruby-china.org":
            t.find(".twemoji").remove();
            break;
          case "w3cplus.com":
            t.find("iframe").addClass("sr-rd-content-nobeautify");
            break;
          case "zuojj.com":
            t.find(".syntaxhighlighter .Brush").attr("style", "font-size: .7em !important;");
            break;
          case "aotu.io":
            t.find(".highlight table").map(function (e, t) {
              var r = $(t),
                a = r.find("pre"),
                n = r.find("table");
              r.html(a[1]), n.unwrap()
            }), t.find("table").addClass("sr-rd-content-center");
            break;
          case "colobu.com":
            t.find(".highlight table").map(function (e, t) {
              var r = $(t),
                a = r.find("pre");
              r.html(a[1]), r.unwrap()
            });
            break;
          case "hao.caibaojian.com":
            t.find(".tlink").map(function (e, t) {
              $(t).html("<link>")
            });
            break;
          case "wkee.net":
            t.find("script").remove();
            break;
          case "linux.cn":
            t.find("pre").attr("style", "background-color: #161b20; background-image: none;"), t.find("code").attr("style", "background-color: transparent; background-image: none;");
            break;
          case "zhuanlan.zhihu.com":
            t.find("div[data-src]").map(function (e, t) {
              var r = $(t),
                a = r.attr("data-src");
              r.replaceWith('<div class="sr-rd-content-center"><img src="' + a + '"></div>')
            }), $("body img").each(function (e, t) {
              var r = $(t),
                a = r.parent();
              if ("column-gif" == r.attr("class") && "GifPlayer" == a.attr("class")) {
                var n = a.parent().prev();
                if (n.is("noscript")) {
                  var i = n.html(),
                    o = $(i),
                    s = o.attr("src"),
                    l = o.attr("data-thumbnail");
                  $('sr-read img[src="' + l + '"]').attr("src", s)
                }
              }
            }), setTimeout(function () {
              t.find("img").each(function (e, t) {
                $(t).attr("src").endsWith(".gif") && $(t).parent().next().is("svg") && $(t).parent().next().remove()
              })
            }, 500);
            break;
          case "jianshu.com":
            t.find(".image-package").map(function (e, t) {
              var r = $(t),
                a = r.find("img");
              r.html(a)
            });
            break;
          case "medium.com":
            t.find("figure").map(function (e, t) {
              var r = $(t),
                a = r.find("img");
              r.replaceWith('<div class="sr-rd-content-center"><img class="sr-rd-content-nobeautify" src="' + a.attr("data-src") + '" style="max-width:100%"></div>')
            });
            break;
          case "worldcup.fifa.com":
            t.find("iframe").css({
              width: "790px",
              height: "450px"
            }), t.find("div").removeClass()
        }
      },
      removeSpareTag: function (e, t) {
        var r = !1,
          a = "";
        ["lib.csdn.net", "huxiu.com", "my.oschina.net", "caixin.com", "163.com", "steachs.com", "hacpai.com", "apprcn.com", "mp.weixin.qq.com"].includes(e) ? (r = !0, a = "p") : ["nationalgeographic.com.cn", "dgtle.com", "news.mtime.com"].includes(e) ? (r = !0, a = "div") : ["chiphell.com"].includes(e) && (r = !0, a = "font"), r && t.find(a).map(function (e, t) {
          var r = $(t).text().toLowerCase().trim();
          0 == $(t).find("img").length && "" == r && $(t).remove()
        })
      },
      htmlbeautify: function (e) {
        try {
          e.html(function (e, t) {
            return t.trim().replace(/<\/?blockquote/g, function (e) {
              return "/" == e[1] ? "</sr-blockquote" : "<sr-blockquote"
            }).replace(/<br>\n?<br>(\n?<br>)*/g, "<br>").replace(/\/(div|p)>\n*(<br>\n)+/g, function (e) {
              return e.replace("<br>", "")
            })
          })
        } catch (t) {
          return e.html()
        }
      },
      commbeautify: function (e, t) {
        t.find("img:not(.sr-rd-content-nobeautify)").map(function (e, t) {
          var r = $(t),
            a = (r.parent(), $("<img class='sr-rd-content-img-load'>")),
            n = r.attr("src"),
            i = r.attr("data-src"),
            o = r.attr("data-original"),
            s = r.attr("original"),
            l = r.attr("data-original-src"),
            c = r.attr("data-lazy-src"),
            u = r.attr("real_src"),
            d = function () {
              a.removeClass("sr-rd-content-img-load"), a[0].clientWidth < 300 && a[0].clientHeight < 300 ? a.parent().removeClass("sr-rd-content-center").addClass("sr-rd-content-center-small") : a[0].clientWidth > 1e3 ? a.css("zoom", "0.6") : a[0].clientHeight > 620 && /win|mac/i.test(navigator.platform) && (a.attr("height", 620), a[0].clientWidth < $("sr-rd-content").width() && a.css({
                width: "auto"
              })), a[0].clientWidth > $("sr-rd-content").width() && a.addClass("sr-rd-content-img")
            },
            h = function () {
              a.addClass("simpread-hidden"), a.parent().hasClass("sr-rd-content-center") && a.parent().removeAttr("class").addClass("simpread-hidden")
            },
            f = void 0;
          r.parent()[0].tagName.toLowerCase(), f = s || n, f = i || f, f = o || f, f = l || f, f = u || f, !(f = c || f) || f.startsWith("http") || f.startsWith("data") || (f = function e(t, r) {
            if ("string" != typeof t || !t) return null;
            if (t.match(/^[a-z]+\:\/\//i)) return t;
            if (t.match(/^\/\//)) return "http:" + t;
            if (t.match(/^[a-z]+\:/i)) return t;
            var a;
            if ("string" != typeof r) return (a = document.createElement("a")).href = t, a.pathname ? "http://" + t : null;
            if (null === (r = e(r))) return null;
            (a = document.createElement("a")).href = r, "/" === t[0] ? r = [] : (r = a.pathname.split("/")).pop(), t = t.split("/");
            for (var n = 0; n < t.length; ++n)
              if ("." !== t[n])
                if (".." === t[n]) {
                  if (void 0 === r.pop() || 0 === r.length) return null
                } else r.push(t[n]);
            return a.protocol + "//" + a.hostname + r.join("/")
          }(f, location.href)), a.attr("src", f).replaceAll(r).wrap("<div class='sr-rd-content-center'></div>"), /win|mac/i.test(navigator.platform) ? a.one("load", function () {
            return d()
          }).one("error", function () {
            return h()
          }) : a.on("load", function () {
            return d()
          }).on("error", function () {
            return h()
          })
        }), t.find("sr-blockquote").map(function (t, r) {
          var a = $(r),
            n = a.parent();
          a.removeAttr("style").removeAttr("class"), "dgtle.com" == e && n.removeClass("quote")
        }), t.find("iframe:not(.sr-rd-content-nobeautify), embed:not(.sr-rd-content-nobeautify)").map(function (e, t) {
          $(t).wrap("<div class='sr-rd-content-center'></div>")
        }), t.find("hr").map(function (e, t) {
          $(t).addClass("simpread-hidden")
        }), t.find("pre").map(function (e, t) {
          $(t).find("code").removeAttr("class")
        }), t.find("pre").removeAttr("class"), t.find("a").removeAttr("style"), t.find("sr-blocks").map(function (e, t) {
          t.outerHTML = $(te[e]).addClass("simpread-blocks")[0].outerHTML
        })
      },
      cleanHTML: function (e, t, r) {
        t && e.find(".crayon-syntax .crayon-plain-wrap textarea").map(function (e, t) {
          $(t).parent().parent().replaceWith('<pre class="sr-rd-content-nobeautify">' + t.innerHTML + "</pre>")
        }), t && e.find(".syntaxhighlighter").map(function (e, t) {
          var r = "";
          $(t).find(".container div").map(function (e, t) {
            r += t.innerText + "\n"
          }), $(t).replaceWith('<pre class="sr-rd-content-nobeautify">' + r + "</pre>")
        }), t && e.find("table pre").length > 0 && e.find("table").map(function (e, t) {
          var r = $(t);
          if (2 == r.find("pre").length) {
            var a = r.find("td pre")[1].outerText.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").trim();
            r.replaceWith('<pre class="sr-rd-content-nobeautify">' + a + "</pre>")
          }
        }), t && e.find("pre:not(.sr-rd-content-nobeautify)").each(function (e, t) {
          var r = "",
            a = !1,
            n = !1;
          1 == $(t).find("code").length && $(t).find("li").length > 0 && $(t).find("code").each(function (e, t) {
            a = !0, n = !0, r += t.outerText.replace(/</gi, "&lt;").replace(/>/gi, "&gt;")
          }), 0 == a && 0 == n && $(t).find("li").each(function (e, n) {
            $(t).find("code").length > 0 && (a = !0), "" != n.outerText.trim() && (r += n.outerText.replace(/\n/gi, "").replace(/</gi, "&lt;").replace(/>/gi, "&gt;") + "\n")
          }), 0 == a && $(t).find("code").each(function (e, t) {
            n = !0, "" != t.outerText.trim() && (r += t.outerText.replace(/</gi, "&lt;").replace(/>/gi, "&gt;") + "\n")
          }), a || n || (r = t.outerText.replace(/</gi, "&lt;").replace(/>/gi, "&gt;") + "\n"), $(t).removeAttr("style").removeAttr("class").removeAttr("id").html(r)
        });
        var a, n, i = e.html();
        "readability-page-1" == $(e.children()).attr("id") && 1 == e.children().children().length ? i = e.children().children().html() : 1 == e.children().length && (i = e.children().html()), i = i.replace(/<!--[\S ]+-->/gi, ""), e.html((a = i, n = "", $.parseHTML(a).forEach(function (e, a) {
          var i = e.tagName,
            o = e.outerText,
            s = e.outerHTML;
          void 0 == i ? n += "<p>" + e.textContent.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/^\n|\n$/gi, "").trim() + "</p>" : "PRE" == i ? n += s : "sr-blocks" == i.toLowerCase() ? n += s : ("" != o || s.includes("<img")) && (n += t && 0 == r ? s.replace(/ (style|id|class)="[\w ;%@#!-:(),\u4e00-\u9fa5]*"/gi, "") : s)
        }), n)), t && e.find("p").each(function (e, t) {
          t.tagName;
          var r = t.outerText,
            a = t.outerHTML;
          "" != r.trim() || a.includes("<img") || (t.outerText = "")
        })
      }
    }),
    ae = "background-color",
    ne = ".simpread-focus-root",
    ie = "-1";

  function oe(e) {
    var t = e ? e.match(/[0-9]+, /gi) : [];
    return t.length > 0 ? t.join("").replace(/, $/, "") : null
  }

  function se(e, t) {
    var r = Object.keys(t).map(function (e) {
      return t[e] && e.replace(/[A-Z]/, function (e) {
        return "-" + e.toLowerCase()
      }) + ": " + t[e] + ";"
    }).join("");
    switch (e) {
      case "title":
        r = "sr-rd-title {" + r + "}";
        break;
      case "desc":
        r = "sr-rd-desc {" + r + "}";
        break;
      case "art":
        r = "sr-rd-content *, sr-rd-content p, sr-rd-content div {" + r + "}";
        break;
      case "pre":
        r = "sr-rd-content pre {" + r + "}";
        break;
      case "code":
        r = "sr-rd-content pre code, sr-rd-content pre code * {" + r + "}"
    }
    var a = $("head").find("style#simpread-custom-" + e);
    0 == a.length ? $("head").append('<style type="text/css" id="simpread-custom-' + e + '">' + r + "</style>") : a.html(r)
  }

  function le(e, t) {
    var r = $("head").find("style#simpread-custom-" + e);
    0 == r.length ? $("head").append('<style type="text/css" id="simpread-custom-' + e + '">' + t + "</style>") : r.html(t)
  }
  var ce = Object.freeze({
    GetColor: oe,
    BgColor: function (e, t) {
      var r = "rgba(" + oe(e) + ", " + t / 100 + ")";
      return $(ne).css(ae, r), r
    },
    Opacity: function (e) {
      var t = oe($(ne).css(ae)),
        r = "rgba(" + t + ", " + e / 100 + ")";
      return t ? ($(ne).css(ae, r), r) : null
    },
    FontFamily: function (e) {
      alert(e)
      $("sr-read").css("font-family", "default" == e ? "" : e)
      $("sr-read *").css("font-family", "default" == e ? "" : e + '!important')
    },
    FontSize: function (e) {
      "-1" == ie && void 0 == (ie = $("html").attr("style")) && (ie = ""), e ? $("html").attr("style", "font-size: " + e + "!important;" + ie) : $("html").attr("style", ie)
    },
    Layout: function (e) {
      $("sr-read").css("margin", e ? "20px " + e : "")
    },
    SiteCSS: function (e) {
      e ? $("head").append('<style type="text/css" id="simpread-site-css">' + e + "</style>") : $("#simpread-site-css").remove()
    },
    Preview: function (e) {
      Object.keys(e).forEach(function (t) {
        "css" != t && se(t, e[t])
      }), le("css", e.css)
    },
    Custom: se,
    CSS: le,
    VerifyCustom: function (e, t) {
      switch (e) {
        case "layout":
        case "margin":
        case "fontfamily":
        case "custom":
          return "" != t.css;
        case "fontsize":
          return "" != t.title.fontSize || "" != t.desc.fontSize || "" != t.art.fontSize || "" != t.css;
        case "theme":
          return -1 != t.css.search("simpread-theme-root")
      }
    }
  });

  function ue(e, t) {
    if (t && t.documentElement) e = t, t = arguments[2];
    else if (!e || !e.documentElement) throw new Error("First argument to Readability constructor should be a document object.");
    var r;
    t = t || {}, this._doc = e, this._articleTitle = null, this._articleByline = null, this._articleDir = null, this._articleSiteName = null, this._attempts = [], this._wrap = null, this._debug = !!t.debug, this._maxElemsToParse = t.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE, this._nbTopCandidates = t.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES, this._charThreshold = t.charThreshold || this.DEFAULT_CHAR_THRESHOLD, this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(t.classesToPreserve || []), this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY, this._debug ? (r = function (e) {
      var t = e.nodeName + " ";
      if (e.nodeType == e.TEXT_NODE) return t + '("' + e.textContent + '")';
      var r = e.className && "." + e.className.replace(/ /g, "."),
        a = "";
      return e.id ? a = "(#" + e.id + r + ")" : r && (a = "(" + r + ")"), t + a
    }, this.log = function () {
      if ("undefined" != typeof dump) {
        var e = Array.prototype.map.call(arguments, function (e) {
          return e && e.nodeName ? r(e) : e
        }).join(" ");
        dump("Reader: (Readability) " + e + "\n")
      } else if ("undefined" != typeof console)["Reader: (Readability) "].concat(arguments)
    }) : this.log = function () {}
  }
  ue.prototype = {
    FLAG_STRIP_UNLIKELYS: 1,
    FLAG_WEIGHT_CLASSES: 2,
    FLAG_CLEAN_CONDITIONALLY: 4,
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    DEFAULT_MAX_ELEMS_TO_PARSE: 0,
    DEFAULT_N_TOP_CANDIDATES: 5,
    DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),
    DEFAULT_CHAR_THRESHOLD: 500,
    REGEXPS: {
      unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|foot|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
      okMaybeItsACandidate: /and|article|body|column|main|shadow/i,
      positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
      negative: /hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
      extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
      byline: /byline|author|dateline|writtenby|p-author/i,
      replaceFonts: /<(\/?)font[^>]*>/gi,
      normalize: /\s{2,}/g,
      videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
      nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
      prevLink: /(prev|earl|old|new|<|«)/i,
      whitespace: /^\s*$/,
      hasContent: /\S$/
    },
    DIV_TO_P_ELEMS: ["A", "BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL", "SELECT"],
    ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],
    PRESENTATIONAL_ATTRIBUTES: ["align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace"],
    DEPRECATED_SIZE_ATTRIBUTE_ELEMS: ["TABLE", "TH", "TD", "HR", "PRE"],
    PHRASING_ELEMS: ["ABBR", "AUDIO", "B", "BDO", "BR", "BUTTON", "CITE", "CODE", "DATA", "DATALIST", "DFN", "EM", "EMBED", "I", "IMG", "INPUT", "KBD", "LABEL", "MARK", "MATH", "METER", "NOSCRIPT", "OBJECT", "OUTPUT", "PROGRESS", "Q", "RUBY", "SAMP", "SCRIPT", "SELECT", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "TEXTAREA", "TIME", "VAR", "WBR"],
    CLASSES_TO_PRESERVE: ["page"],
    _postProcessContent: function (e) {
      this._fixRelativeUris(e), this._cleanClasses(e)
    },
    _removeNodes: function (e, t) {
      for (var r = e.length - 1; r >= 0; r--) {
        var a = e[r],
          n = a.parentNode;
        n && (t && !t.call(this, a, r, e) || n.removeChild(a))
      }
    },
    _replaceNodeTags: function (e, t) {
      for (var r = e.length - 1; r >= 0; r--) {
        var a = e[r];
        this._setNodeTag(a, t)
      }
    },
    _forEachNode: function (e, t) {
      Array.prototype.forEach.call(e, t, this)
    },
    _someNode: function (e, t) {
      return Array.prototype.some.call(e, t, this)
    },
    _everyNode: function (e, t) {
      return Array.prototype.every.call(e, t, this)
    },
    _concatNodeLists: function () {
      var e = Array.prototype.slice,
        t = e.call(arguments).map(function (t) {
          return e.call(t)
        });
      return Array.prototype.concat.apply([], t)
    },
    _getAllNodesWithTag: function (e, t) {
      return e.querySelectorAll ? e.querySelectorAll(t.join(",")) : [].concat.apply([], t.map(function (t) {
        var r = e.getElementsByTagName(t);
        return Array.isArray(r) ? r : Array.from(r)
      }))
    },
    _cleanClasses: function (e) {
      var t = this._classesToPreserve,
        r = (e.getAttribute("class") || "").split(/\s+/).filter(function (e) {
          return -1 != t.indexOf(e)
        }).join(" ");
      for (r ? e.setAttribute("class", r) : e.removeAttribute("class"), e = e.firstElementChild; e; e = e.nextElementSibling) this._cleanClasses(e)
    },
    _fixRelativeUris: function (e) {
      var t = this._doc.baseURI,
        r = this._doc.documentURI;

      function a(e) {
        if (t == r && "#" == e.charAt(0)) return e;
        try {
          return new URL(e, t).href
        } catch (e) {}
        return e
      }
      var n = this._getAllNodesWithTag(e, ["a"]);
      this._forEachNode(n, function (e) {
        var t = e.getAttribute("href");
        if (t)
          if (0 === t.indexOf("javascript:")) {
            var r = this._doc.createTextNode(e.textContent);
            e.parentNode.replaceChild(r, e)
          } else e.setAttribute("href", a(t))
      });
      var i = this._getAllNodesWithTag(e, ["img"]);
      this._forEachNode(i, function (e) {
        var t = e.getAttribute("src");
        t && e.setAttribute("src", a(t))
      })
    },
    _getArticleTitle: function () {
      var e = this._doc,
        t = "",
        r = "";
      try {
        "string" != typeof (t = r = e.title.trim()) && (t = r = this._getInnerText(e.getElementsByTagName("title")[0]))
      } catch (e) {}
      var a = !1;

      function n(e) {
        return e.split(/\s+/).length
      }
      if (/ [\|\-\\\/>»] /.test(t)) a = / [\\\/>»] /.test(t), n(t = r.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1")) < 3 && (t = r.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1"));
      else if (-1 !== t.indexOf(": ")) {
        var i = this._concatNodeLists(e.getElementsByTagName("h1"), e.getElementsByTagName("h2")),
          o = t.trim();
        this._someNode(i, function (e) {
          return e.textContent.trim() === o
        }) || (n(t = r.substring(r.lastIndexOf(":") + 1)) < 3 ? t = r.substring(r.indexOf(":") + 1) : n(r.substr(0, r.indexOf(":"))) > 5 && (t = r))
      } else if (t.length > 150 || t.length < 15) {
        var s = e.getElementsByTagName("h1");
        1 === s.length && (t = this._getInnerText(s[0]))
      }
      var l = n(t = t.trim().replace(this.REGEXPS.normalize, " "));
      return l <= 4 && (!a || l != n(r.replace(/[\|\-\\\/>»]+/g, "")) - 1) && (t = r), t
    },
    _prepDocument: function () {
      var e = this._doc;
      this._removeNodes(e.getElementsByTagName("style")), e.body && this._replaceBrs(e.body), this._replaceNodeTags(e.getElementsByTagName("font"), "SPAN")
    },
    _nextElement: function (e) {
      for (var t = e; t && t.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(t.textContent);) t = t.nextSibling;
      return t
    },
    _replaceBrs: function (e) {
      this._forEachNode(this._getAllNodesWithTag(e, ["br"]), function (e) {
        for (var t = e.nextSibling, r = !1;
          (t = this._nextElement(t)) && "BR" == t.tagName;) {
          r = !0;
          var a = t.nextSibling;
          t.parentNode.removeChild(t), t = a
        }
        if (r) {
          var n = this._doc.createElement("p");
          for (e.parentNode.replaceChild(n, e), t = n.nextSibling; t;) {
            if ("BR" == t.tagName) {
              var i = this._nextElement(t.nextSibling);
              if (i && "BR" == i.tagName) break
            }
            if (!this._isPhrasingContent(t)) break;
            var o = t.nextSibling;
            n.appendChild(t), t = o
          }
          for (; n.lastChild && this._isWhitespace(n.lastChild);) n.removeChild(n.lastChild);
          "P" === n.parentNode.tagName && this._setNodeTag(n.parentNode, "DIV")
        }
      })
    },
    _setNodeTag: function (e, t) {
      if (this.log("_setNodeTag", e, t), e.__JSDOMParser__) return e.localName = t.toLowerCase(), e.tagName = t.toUpperCase(), e;
      for (var r = e.ownerDocument.createElement(t); e.firstChild;) r.appendChild(e.firstChild);
      e.parentNode.replaceChild(r, e), e.readability && (r.readability = e.readability);
      for (var a = 0; a < e.attributes.length; a++) try {
        r.setAttribute(e.attributes[a].name, e.attributes[a].value)
      } catch (e) {}
      return r
    },
    _prepArticle: function (e) {
      this._cleanStyles(e), this._markDataTables(e), this._cleanConditionally(e, "form"), this._cleanConditionally(e, "fieldset"), this._clean(e, "object"), this._clean(e, "embed"), this._clean(e, "h1"), this._clean(e, "footer"), this._clean(e, "link"), this._clean(e, "aside");
      var t = this.DEFAULT_CHAR_THRESHOLD;
      this._forEachNode(e.children, function (e) {
        this._cleanMatchedNodes(e, function (e, r) {
          return /share/.test(r) && e.textContent.length < t
        })
      });
      var r = e.getElementsByTagName("h2");
      if (1 === r.length) {
        var a = (r[0].textContent.length - this._articleTitle.length) / this._articleTitle.length;
        if (Math.abs(a) < .5) {
          (a > 0 ? r[0].textContent.includes(this._articleTitle) : this._articleTitle.includes(r[0].textContent)) && this._clean(e, "h2")
        }
      }
      this._clean(e, "iframe"), this._clean(e, "input"), this._clean(e, "textarea"), this._clean(e, "select"), this._clean(e, "button"), this._cleanHeaders(e), this._cleanConditionally(e, "table"), this._cleanConditionally(e, "ul"), this._cleanConditionally(e, "div"), this._removeNodes(e.getElementsByTagName("p"), function (e) {
        return 0 === e.getElementsByTagName("img").length + e.getElementsByTagName("embed").length + e.getElementsByTagName("object").length + e.getElementsByTagName("iframe").length && !this._getInnerText(e, !1)
      }), this._forEachNode(this._getAllNodesWithTag(e, ["br"]), function (e) {
        var t = this._nextElement(e.nextSibling);
        t && "P" == t.tagName && e.parentNode.removeChild(e)
      }), this._forEachNode(this._getAllNodesWithTag(e, ["table"]), function (e) {
        var t = this._hasSingleTagInsideElement(e, "TBODY") ? e.firstElementChild : e;
        if (this._hasSingleTagInsideElement(t, "TR")) {
          var r = t.firstElementChild;
          if (this._hasSingleTagInsideElement(r, "TD")) {
            var a = r.firstElementChild;
            a = this._setNodeTag(a, this._everyNode(a.childNodes, this._isPhrasingContent) ? "P" : "DIV"), e.parentNode.replaceChild(a, e)
          }
        }
      })
    },
    _initializeNode: function (e) {
      switch (e.readability = {
        contentScore: 0
      }, e.tagName) {
        case "DIV":
          e.readability.contentScore += 5;
          break;
        case "PRE":
        case "TD":
        case "BLOCKQUOTE":
          e.readability.contentScore += 3;
          break;
        case "ADDRESS":
        case "OL":
        case "UL":
        case "DL":
        case "DD":
        case "DT":
        case "LI":
        case "FORM":
          e.readability.contentScore -= 3;
          break;
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
        case "TH":
          e.readability.contentScore -= 5
      }
      e.readability.contentScore += this._getClassWeight(e)
    },
    _removeAndGetNext: function (e) {
      var t = this._getNextNode(e, !0);
      return e.parentNode.removeChild(e), t
    },
    _getNextNode: function (e, t) {
      if (!t && e.firstElementChild) return e.firstElementChild;
      if (e.nextElementSibling) return e.nextElementSibling;
      do {
        e = e.parentNode
      } while (e && !e.nextElementSibling);
      return e && e.nextElementSibling
    },
    _checkByline: function (e, t) {
      if (this._articleByline) return !1;
      if (void 0 !== e.getAttribute) var r = e.getAttribute("rel"),
        a = e.getAttribute("itemprop");
      return !(!("author" === r || a && -1 !== a.indexOf("author") || this.REGEXPS.byline.test(t)) || !this._isValidByline(e.textContent)) && (this._articleByline = e.textContent.trim(), !0)
    },
    _getNodeAncestors: function (e, t) {
      t = t || 0;
      for (var r = 0, a = []; e.parentNode && (a.push(e.parentNode), !t || ++r !== t);) e = e.parentNode;
      return a
    },
    _grabArticle: function (e) {
      this.log("**** grabArticle ****");
      var t = this._doc,
        r = null !== e;
      if (!(e = e || this._doc.body)) return this.log("No body found in document. Abort."), null;
      for (var a = e.innerHTML;;) {
        for (var n = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS), i = [], o = this._doc.documentElement; o;) {
          var s = o.className + " " + o.id;
          if (this._isProbablyVisible(o))
            if (this._checkByline(o, s)) o = this._removeAndGetNext(o);
            else if (!n || !this.REGEXPS.unlikelyCandidates.test(s) || this.REGEXPS.okMaybeItsACandidate.test(s) || this._hasAncestorTag(o, "table") || "BODY" === o.tagName || "A" === o.tagName)
            if ("DIV" !== o.tagName && "SECTION" !== o.tagName && "HEADER" !== o.tagName && "H1" !== o.tagName && "H2" !== o.tagName && "H3" !== o.tagName && "H4" !== o.tagName && "H5" !== o.tagName && "H6" !== o.tagName || !this._isElementWithoutContent(o)) {
              if (-1 !== this.DEFAULT_TAGS_TO_SCORE.indexOf(o.tagName) && i.push(o), "DIV" === o.tagName) {
                for (var l = null, c = o.firstChild; c;) {
                  var u = c.nextSibling;
                  if (this._isPhrasingContent(c)) null !== l ? l.appendChild(c) : this._isWhitespace(c) || (l = t.createElement("p"), o.replaceChild(l, c), l.appendChild(c));
                  else if (null !== l) {
                    for (; l.lastChild && this._isWhitespace(l.lastChild);) l.removeChild(l.lastChild);
                    l = null
                  }
                  c = u
                }
                if (this._hasSingleTagInsideElement(o, "P") && this._getLinkDensity(o) < .25) {
                  var d = o.children[0];
                  o.parentNode.replaceChild(d, o), o = d, i.push(o)
                } else this._hasChildBlockElement(o) || (o = this._setNodeTag(o, "P"), i.push(o))
              }
              o = this._getNextNode(o)
            } else o = this._removeAndGetNext(o);
          else this.log("Removing unlikely candidate - " + s), o = this._removeAndGetNext(o);
          else this.log("Removing hidden node - " + s), o = this._removeAndGetNext(o)
        }
        var h = [];
        this._forEachNode(i, function (e) {
          if (e.parentNode && void 0 !== e.parentNode.tagName) {
            var t = this._getInnerText(e);
            if (!(t.length < 25)) {
              var r = this._getNodeAncestors(e, 3);
              if (0 !== r.length) {
                var a = 0;
                a += 1, a += t.split(",").length, a += Math.min(Math.floor(t.length / 100), 3), this._forEachNode(r, function (e, t) {
                  if (e.tagName && e.parentNode && void 0 !== e.parentNode.tagName) {
                    if (void 0 === e.readability && (this._initializeNode(e), h.push(e)), 0 === t) var r = 1;
                    else r = 1 === t ? 2 : 3 * t;
                    e.readability.contentScore += a / r
                  }
                })
              }
            }
          }
        });
        for (var f = [], p = 0, g = h.length; p < g; p += 1) {
          var m = h[p],
            _ = m.readability.contentScore * (1 - this._getLinkDensity(m));
          m.readability.contentScore = _, this.log("Candidate:", m, "with score " + _);
          for (var b = 0; b < this._nbTopCandidates; b++) {
            var v = f[b];
            if (!v || _ > v.readability.contentScore) {
              f.splice(b, 0, m), f.length > this._nbTopCandidates && f.pop();
              break
            }
          }
        }
        var w, y = f[0] || null,
          k = !1;
        if (null === y || "BODY" === y.tagName) {
          y = t.createElement("DIV"), k = !0;
          for (var E = e.childNodes; E.length;) this.log("Moving child out:", E[0]), y.appendChild(E[0]);
          e.appendChild(y), this._initializeNode(y)
        } else if (y) {
          for (var T = [], x = 1; x < f.length; x++) f[x].readability.contentScore / y.readability.contentScore >= .75 && T.push(this._getNodeAncestors(f[x]));
          if (T.length >= 3)
            for (w = y.parentNode;
              "BODY" !== w.tagName;) {
              for (var N = 0, C = 0; C < T.length && N < 3; C++) N += Number(T[C].includes(w));
              if (N >= 3) {
                y = w;
                break
              }
              w = w.parentNode
            }
          y.readability || this._initializeNode(y), w = y.parentNode;
          for (var A = y.readability.contentScore, S = A / 3;
            "BODY" !== w.tagName;)
            if (w.readability) {
              var P = w.readability.contentScore;
              if (P < S) break;
              if (P > A) {
                y = w;
                break
              }
              A = w.readability.contentScore, w = w.parentNode
            } else w = w.parentNode;
          for (w = y.parentNode;
            "BODY" != w.tagName && 1 == w.children.length;) w = (y = w).parentNode;
          y.readability || this._initializeNode(y)
        }
        var L = t.createElement("DIV");
        r && (L.id = "readability-content");
        for (var j = Math.max(10, .2 * y.readability.contentScore), z = (w = y.parentNode).children, $ = 0, M = z.length; $ < M; $++) {
          var B = z[$],
            I = !1;
          if (this.log("Looking at sibling node:", B, B.readability ? "with score " + B.readability.contentScore : ""), this.log("Sibling has score", B.readability ? B.readability.contentScore : "Unknown"), B === y) I = !0;
          else {
            var O = 0;
            if (B.className === y.className && "" !== y.className && (O += .2 * y.readability.contentScore), B.readability && B.readability.contentScore + O >= j) I = !0;
            else if ("P" === B.nodeName) {
              var H = this._getLinkDensity(B),
                R = this._getInnerText(B),
                D = R.length;
              D > 80 && H < .25 ? I = !0 : D < 80 && D > 0 && 0 === H && -1 !== R.search(/\.( |$)/) && (I = !0)
            }
          }
          I && (this.log("Appending node:", B), -1 === this.ALTER_TO_DIV_EXCEPTIONS.indexOf(B.nodeName) && (this.log("Altering sibling:", B, "to div."), B = this._setNodeTag(B, "DIV")), L.appendChild(B), $ -= 1, M -= 1)
        }
        if (this._debug && this.log("Article content pre-prep: " + L.innerHTML), this._prepArticle(L), this._debug && this.log("Article content post-prep: " + L.innerHTML), k) y.id = "readability-page-1", y.className = "page";
        else {
          var G = t.createElement("DIV");
          G.id = "readability-page-1", G.className = "page";
          var q = L.childNodes;
          for (this._wrap = L.childNodes[0].outerHTML.replace(L.childNodes[0].innerHTML, ""); q.length;) G.appendChild(q[0]);
          L.appendChild(G)
        }
        this._debug && this.log("Article content after paging: " + L.innerHTML);
        var U = !0,
          F = this._getInnerText(L, !0).length;
        if (F < this._charThreshold)
          if (U = !1, e.innerHTML = a, this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) this._removeFlag(this.FLAG_STRIP_UNLIKELYS), this._attempts.push({
            articleContent: L,
            textLength: F
          });
          else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) this._removeFlag(this.FLAG_WEIGHT_CLASSES), this._attempts.push({
          articleContent: L,
          textLength: F
        });
        else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY), this._attempts.push({
          articleContent: L,
          textLength: F
        });
        else {
          if (this._attempts.push({
              articleContent: L,
              textLength: F
            }), this._attempts.sort(function (e, t) {
              return t.textLength - e.textLength
            }), !this._attempts[0].textLength) return null;
          L = this._attempts[0].articleContent, U = !0
        }
        if (U) {
          var V = [w, y].concat(this._getNodeAncestors(w));
          return this._someNode(V, function (e) {
            if (!e.tagName) return !1;
            var t = e.getAttribute("dir");
            return !!t && (this._articleDir = t, !0)
          }), L
        }
      }
    },
    _isValidByline: function (e) {
      return ("string" == typeof e || e instanceof String) && ((e = e.trim()).length > 0 && e.length < 100)
    },
    _getArticleMetadata: function () {
      var e = {},
        t = {},
        r = this._doc.getElementsByTagName("meta"),
        a = /\s*(dc|dcterm|og|twitter)\s*:\s*(author|creator|description|title|site_name)\s*/gi,
        n = /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;
      return this._forEachNode(r, function (e) {
        var r = e.getAttribute("name"),
          i = e.getAttribute("property"),
          o = e.getAttribute("content");
        if (o) {
          var s = null,
            l = null;
          if (i && (s = i.match(a)))
            for (var c = s.length - 1; c >= 0; c--) l = s[c].toLowerCase().replace(/\s/g, ""), t[l] = o.trim();
          !s && r && n.test(r) && (l = r, o && (l = l.toLowerCase().replace(/\s/g, "").replace(/\./g, ":"), t[l] = o.trim()))
        }
      }), e.title = t["dc:title"] || t["dcterm:title"] || t["og:title"] || t["weibo:article:title"] || t["weibo:webpage:title"] || t.title || t["twitter:title"], e.title || (e.title = this._getArticleTitle()), e.byline = t["dc:creator"] || t["dcterm:creator"] || t.author, e.excerpt = t["dc:description"] || t["dcterm:description"] || t["og:description"] || t["weibo:article:description"] || t["weibo:webpage:description"] || t.description || t["twitter:description"], e.siteName = t["og:site_name"], e
    },
    _removeScripts: function (e) {
      this._removeNodes(e.getElementsByTagName("script"), function (e) {
        return e.nodeValue = "", e.removeAttribute("src"), !0
      }), this._removeNodes(e.getElementsByTagName("noscript"))
    },
    _hasSingleTagInsideElement: function (e, t) {
      return 1 == e.children.length && e.children[0].tagName === t && !this._someNode(e.childNodes, function (e) {
        return e.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(e.textContent)
      })
    },
    _isElementWithoutContent: function (e) {
      return e.nodeType === this.ELEMENT_NODE && 0 == e.textContent.trim().length && (0 == e.children.length || e.children.length == e.getElementsByTagName("br").length + e.getElementsByTagName("hr").length)
    },
    _hasChildBlockElement: function (e) {
      return this._someNode(e.childNodes, function (e) {
        return -1 !== this.DIV_TO_P_ELEMS.indexOf(e.tagName) || this._hasChildBlockElement(e)
      })
    },
    _isPhrasingContent: function (e) {
      return e.nodeType === this.TEXT_NODE || -1 !== this.PHRASING_ELEMS.indexOf(e.tagName) || ("A" === e.tagName || "DEL" === e.tagName || "INS" === e.tagName) && this._everyNode(e.childNodes, this._isPhrasingContent)
    },
    _isWhitespace: function (e) {
      return e.nodeType === this.TEXT_NODE && 0 === e.textContent.trim().length || e.nodeType === this.ELEMENT_NODE && "BR" === e.tagName
    },
    _getInnerText: function (e, t) {
      t = void 0 === t || t;
      var r = e.textContent.trim();
      return t ? r.replace(this.REGEXPS.normalize, " ") : r
    },
    _getCharCount: function (e, t) {
      return t = t || ",", this._getInnerText(e).split(t).length - 1
    },
    _cleanStyles: function (e) {
      if (e && "svg" !== e.tagName.toLowerCase()) {
        for (var t = 0; t < this.PRESENTATIONAL_ATTRIBUTES.length; t++) e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[t]); - 1 !== this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) && (e.removeAttribute("width"), e.removeAttribute("height"));
        for (var r = e.firstElementChild; null !== r;) this._cleanStyles(r), r = r.nextElementSibling
      }
    },
    _getLinkDensity: function (e) {
      var t = this._getInnerText(e).length;
      if (0 === t) return 0;
      var r = 0;
      return this._forEachNode(e.getElementsByTagName("a"), function (e) {
        r += this._getInnerText(e).length
      }), r / t
    },
    _getClassWeight: function (e) {
      if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) return 0;
      var t = 0;
      return "string" == typeof e.className && "" !== e.className && (this.REGEXPS.negative.test(e.className) && (t -= 25), this.REGEXPS.positive.test(e.className) && (t += 25)), "string" == typeof e.id && "" !== e.id && (this.REGEXPS.negative.test(e.id) && (t -= 25), this.REGEXPS.positive.test(e.id) && (t += 25)), t
    },
    _clean: function (e, t) {
      var r = -1 !== ["object", "embed", "iframe"].indexOf(t);
      this._removeNodes(e.getElementsByTagName(t), function (e) {
        if (r) {
          for (var t = 0; t < e.attributes.length; t++)
            if (this.REGEXPS.videos.test(e.attributes[t].value)) return !1;
          if ("object" === e.tagName && this.REGEXPS.videos.test(e.innerHTML)) return !1
        }
        return !0
      })
    },
    _hasAncestorTag: function (e, t, r, a) {
      r = r || 3, t = t.toUpperCase();
      for (var n = 0; e.parentNode;) {
        if (r > 0 && n > r) return !1;
        if (e.parentNode.tagName === t && (!a || a(e.parentNode))) return !0;
        e = e.parentNode, n++
      }
      return !1
    },
    _getRowAndColumnCount: function (e) {
      for (var t = 0, r = 0, a = e.getElementsByTagName("tr"), n = 0; n < a.length; n++) {
        var i = a[n].getAttribute("rowspan") || 0;
        i && (i = parseInt(i, 10)), t += i || 1;
        for (var o = 0, s = a[n].getElementsByTagName("td"), l = 0; l < s.length; l++) {
          var c = s[l].getAttribute("colspan") || 0;
          c && (c = parseInt(c, 10)), o += c || 1
        }
        r = Math.max(r, o)
      }
      return {
        rows: t,
        columns: r
      }
    },
    _markDataTables: function (e) {
      for (var t = e.getElementsByTagName("table"), r = 0; r < t.length; r++) {
        var a = t[r];
        if ("presentation" != a.getAttribute("role"))
          if ("0" != a.getAttribute("datatable"))
            if (a.getAttribute("summary")) a._readabilityDataTable = !0;
            else {
              var n = a.getElementsByTagName("caption")[0];
              if (n && n.childNodes.length > 0) a._readabilityDataTable = !0;
              else {
                if (["col", "colgroup", "tfoot", "thead", "th"].some(function (e) {
                    return !!a.getElementsByTagName(e)[0]
                  })) this.log("Data table because found data-y descendant"), a._readabilityDataTable = !0;
                else if (a.getElementsByTagName("table")[0]) a._readabilityDataTable = !1;
                else {
                  var i = this._getRowAndColumnCount(a);
                  i.rows >= 10 || i.columns > 4 ? a._readabilityDataTable = !0 : a._readabilityDataTable = i.rows * i.columns > 10
                }
              }
            }
        else a._readabilityDataTable = !1;
        else a._readabilityDataTable = !1
      }
    },
    _cleanConditionally: function (e, t) {
      if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
        var r = "ul" === t || "ol" === t;
        this._removeNodes(e.getElementsByTagName(t), function (e) {
          var a = function (e) {
            return e._readabilityDataTable
          };
          if ("table" === t && a(e)) return !1;
          if (this._hasAncestorTag(e, "table", -1, a)) return !1;
          var n = this._getClassWeight(e);
          if (this.log("Cleaning Conditionally", e), n + 0 < 0) return !0;
          if (this._getCharCount(e, ",") < 10) {
            for (var i = e.getElementsByTagName("p").length, o = e.getElementsByTagName("img").length, s = e.getElementsByTagName("li").length - 100, l = e.getElementsByTagName("input").length, c = 0, u = this._concatNodeLists(e.getElementsByTagName("object"), e.getElementsByTagName("embed"), e.getElementsByTagName("iframe")), d = 0; d < u.length; d++) {
              for (var h = 0; h < u[d].attributes.length; h++)
                if (this.REGEXPS.videos.test(u[d].attributes[h].value)) return !1;
              if ("object" === u[d].tagName && this.REGEXPS.videos.test(u[d].innerHTML)) return !1;
              c++
            }
            var f = this._getLinkDensity(e),
              p = this._getInnerText(e).length;
            return o > 1 && i / o < .5 && !this._hasAncestorTag(e, "figure") || !r && s > i || l > Math.floor(i / 3) || !r && p < 25 && (0 === o || o > 2) && !this._hasAncestorTag(e, "figure") || !r && n < 25 && f > .2 || n >= 25 && f > .5 || 1 === c && p < 75 || c > 1
          }
          return !1
        })
      }
    },
    _cleanMatchedNodes: function (e, t) {
      for (var r = this._getNextNode(e, !0), a = this._getNextNode(e); a && a != r;) a = t(a, a.className + " " + a.id) ? this._removeAndGetNext(a) : this._getNextNode(a)
    },
    _cleanHeaders: function (e) {
      for (var t = 1; t < 3; t += 1) this._removeNodes(e.getElementsByTagName("h" + t), function (e) {
        return this._getClassWeight(e) < 0
      })
    },
    _flagIsActive: function (e) {
      return (this._flags & e) > 0
    },
    _removeFlag: function (e) {
      this._flags = this._flags & ~e
    },
    _isProbablyVisible: function (e) {
      return !(e.style && "none" == e.style.display || e.hasAttribute("hidden"))
    },
    parse: function () {
      if (this._maxElemsToParse > 0) {
        var e = this._doc.getElementsByTagName("*").length;
        if (e > this._maxElemsToParse) throw new Error("Aborting parsing document; " + e + " elements found")
      }
      this._removeScripts(this._doc), this._prepDocument();
      var t = this._getArticleMetadata();
      this._articleTitle = t.title;
      var r = this._grabArticle();
      if (!r) return null;
      if (this.log("Grabbed: " + r.innerHTML), this._postProcessContent(r), !t.excerpt) {
        var a = r.getElementsByTagName("p");
        a.length > 0 && (t.excerpt = a[0].textContent.trim())
      }
      var n = r.textContent;
      return {
        title: this._articleTitle,
        byline: t.byline || this._articleByline,
        dir: this._articleDir,
        content: r.innerHTML,
        wrap: this._wrap,
        textContent: n,
        length: n.length,
        excerpt: t.excerpt,
        siteName: t.siteName || this._articleSiteName
      }
    }
  };
  var de = Object.freeze({
      Readability: ue
    }),
    he = r(function (e) {
      (function () {
        function t(e) {
          var t = {
            omitExtraWLInCodeBlocks: {
              defaultValue: !1,
              describe: "Omit the default extra whiteline added to code blocks",
              type: "boolean"
            },
            noHeaderId: {
              defaultValue: !1,
              describe: "Turn on/off generated header id",
              type: "boolean"
            },
            prefixHeaderId: {
              defaultValue: !1,
              describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
              type: "string"
            },
            rawPrefixHeaderId: {
              defaultValue: !1,
              describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
              type: "boolean"
            },
            ghCompatibleHeaderId: {
              defaultValue: !1,
              describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
              type: "boolean"
            },
            rawHeaderId: {
              defaultValue: !1,
              describe: "Remove only spaces, ' and \" from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids",
              type: "boolean"
            },
            headerLevelStart: {
              defaultValue: !1,
              describe: "The header blocks level start",
              type: "integer"
            },
            parseImgDimensions: {
              defaultValue: !1,
              describe: "Turn on/off image dimension parsing",
              type: "boolean"
            },
            simplifiedAutoLink: {
              defaultValue: !1,
              describe: "Turn on/off GFM autolink style",
              type: "boolean"
            },
            excludeTrailingPunctuationFromURLs: {
              defaultValue: !1,
              describe: "Excludes trailing punctuation from links generated with autoLinking",
              type: "boolean"
            },
            literalMidWordUnderscores: {
              defaultValue: !1,
              describe: "Parse midword underscores as literal underscores",
              type: "boolean"
            },
            literalMidWordAsterisks: {
              defaultValue: !1,
              describe: "Parse midword asterisks as literal asterisks",
              type: "boolean"
            },
            strikethrough: {
              defaultValue: !1,
              describe: "Turn on/off strikethrough support",
              type: "boolean"
            },
            tables: {
              defaultValue: !1,
              describe: "Turn on/off tables support",
              type: "boolean"
            },
            tablesHeaderId: {
              defaultValue: !1,
              describe: "Add an id to table headers",
              type: "boolean"
            },
            ghCodeBlocks: {
              defaultValue: !0,
              describe: "Turn on/off GFM fenced code blocks support",
              type: "boolean"
            },
            tasklists: {
              defaultValue: !1,
              describe: "Turn on/off GFM tasklist support",
              type: "boolean"
            },
            smoothLivePreview: {
              defaultValue: !1,
              describe: "Prevents weird effects in live previews due to incomplete input",
              type: "boolean"
            },
            smartIndentationFix: {
              defaultValue: !1,
              description: "Tries to smartly fix indentation in es6 strings",
              type: "boolean"
            },
            disableForced4SpacesIndentedSublists: {
              defaultValue: !1,
              description: "Disables the requirement of indenting nested sublists by 4 spaces",
              type: "boolean"
            },
            simpleLineBreaks: {
              defaultValue: !1,
              description: "Parses simple line breaks as <br> (GFM Style)",
              type: "boolean"
            },
            requireSpaceBeforeHeadingText: {
              defaultValue: !1,
              description: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
              type: "boolean"
            },
            ghMentions: {
              defaultValue: !1,
              description: "Enables github @mentions",
              type: "boolean"
            },
            ghMentionsLink: {
              defaultValue: "https://github.com/{u}",
              description: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
              type: "string"
            },
            encodeEmails: {
              defaultValue: !0,
              description: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
              type: "boolean"
            },
            openLinksInNewWindow: {
              defaultValue: !1,
              description: "Open all links in new windows",
              type: "boolean"
            },
            backslashEscapesHTMLTags: {
              defaultValue: !1,
              description: "Support for HTML Tag escaping. ex: <div>foo</div>",
              type: "boolean"
            },
            emoji: {
              defaultValue: !1,
              description: "Enable emoji support. Ex: `this is a :smile: emoji`",
              type: "boolean"
            },
            underline: {
              defaultValue: !1,
              description: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
              type: "boolean"
            },
            completeHTMLDocument: {
              defaultValue: !1,
              description: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
              type: "boolean"
            },
            metadata: {
              defaultValue: !1,
              description: "Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",
              type: "boolean"
            },
            splitAdjacentBlockquotes: {
              defaultValue: !1,
              description: "Split adjacent blockquote blocks",
              type: "boolean"
            }
          };
          if (!1 === e) return JSON.parse(JSON.stringify(t));
          var r = {};
          for (var a in t) t.hasOwnProperty(a) && (r[a] = t[a].defaultValue);
          return r
        }

        function r(e, t) {
          var r = t ? "Error in " + t + " extension->" : "Error in unnamed extension",
            n = {
              valid: !0,
              error: ""
            };
          i.helper.isArray(e) || (e = [e]);
          for (var o = 0; o < e.length; ++o) {
            var s = r + " sub-extension " + o + ": ",
              l = e[o];
            if ("object" != (void 0 === l ? "undefined" : a(l))) return n.valid = !1, n.error = s + "must be an object, but " + (void 0 === l ? "undefined" : a(l)) + " given", n;
            if (!i.helper.isString(l.type)) return n.valid = !1, n.error = s + 'property "type" must be a string, but ' + a(l.type) + " given", n;
            var c = l.type = l.type.toLowerCase();
            if ("language" === c && (c = l.type = "lang"), "html" === c && (c = l.type = "output"), "lang" !== c && "output" !== c && "listener" !== c) return n.valid = !1, n.error = s + "type " + c + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', n;
            if ("listener" === c) {
              if (i.helper.isUndefined(l.listeners)) return n.valid = !1, n.error = s + '. Extensions of type "listener" must have a property called "listeners"', n
            } else if (i.helper.isUndefined(l.filter) && i.helper.isUndefined(l.regex)) return n.valid = !1, n.error = s + c + ' extensions must define either a "regex" property or a "filter" method', n;
            if (l.listeners) {
              if ("object" != a(l.listeners)) return n.valid = !1, n.error = s + '"listeners" property must be an object but ' + a(l.listeners) + " given", n;
              for (var u in l.listeners)
                if (l.listeners.hasOwnProperty(u) && "function" != typeof l.listeners[u]) return n.valid = !1, n.error = s + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + u + " must be a function but " + a(l.listeners[u]) + " given", n
            }
            if (l.filter) {
              if ("function" != typeof l.filter) return n.valid = !1, n.error = s + '"filter" must be a function, but ' + a(l.filter) + " given", n
            } else if (l.regex) {
              if (i.helper.isString(l.regex) && (l.regex = new RegExp(l.regex, "g")), !(l.regex instanceof RegExp)) return n.valid = !1, n.error = s + '"regex" property must either be a string or a RegExp object, but ' + a(l.regex) + " given", n;
              if (i.helper.isUndefined(l.replace)) return n.valid = !1, n.error = s + '"regex" extensions must implement a replace string or function', n
            }
          }
          return n
        }

        function n(e, t) {
          return "¨E" + t.charCodeAt(0) + "E"
        }
        var i = {},
          o = {},
          s = {},
          l = t(!0),
          c = "vanilla",
          u = {
            github: {
              omitExtraWLInCodeBlocks: !0,
              simplifiedAutoLink: !0,
              excludeTrailingPunctuationFromURLs: !0,
              literalMidWordUnderscores: !0,
              strikethrough: !0,
              tables: !0,
              tablesHeaderId: !0,
              ghCodeBlocks: !0,
              tasklists: !0,
              disableForced4SpacesIndentedSublists: !0,
              simpleLineBreaks: !0,
              requireSpaceBeforeHeadingText: !0,
              ghCompatibleHeaderId: !0,
              ghMentions: !0,
              backslashEscapesHTMLTags: !0,
              emoji: !0,
              splitAdjacentBlockquotes: !0
            },
            original: {
              noHeaderId: !0,
              ghCodeBlocks: !1
            },
            ghost: {
              omitExtraWLInCodeBlocks: !0,
              parseImgDimensions: !0,
              simplifiedAutoLink: !0,
              excludeTrailingPunctuationFromURLs: !0,
              literalMidWordUnderscores: !0,
              strikethrough: !0,
              tables: !0,
              tablesHeaderId: !0,
              ghCodeBlocks: !0,
              tasklists: !0,
              smoothLivePreview: !0,
              simpleLineBreaks: !0,
              requireSpaceBeforeHeadingText: !0,
              ghMentions: !1,
              encodeEmails: !0
            },
            vanilla: t(!0),
            allOn: function () {
              var e = t(!0),
                r = {};
              for (var a in e) e.hasOwnProperty(a) && (r[a] = !0);
              return r
            }()
          };
        i.helper = {}, i.extensions = {}, i.setOption = function (e, t) {
          return l[e] = t, this
        }, i.getOption = function (e) {
          return l[e]
        }, i.getOptions = function () {
          return l
        }, i.resetOptions = function () {
          l = t(!0)
        }, i.setFlavor = function (e) {
          if (!u.hasOwnProperty(e)) throw Error(e + " flavor was not found");
          i.resetOptions();
          var t = u[e];
          for (var r in c = e, t) t.hasOwnProperty(r) && (l[r] = t[r])
        }, i.getFlavor = function () {
          return c
        }, i.getFlavorOptions = function (e) {
          if (u.hasOwnProperty(e)) return u[e]
        }, i.getDefaultOptions = function (e) {
          return t(e)
        }, i.subParser = function (e, t) {
          if (i.helper.isString(e)) {
            if (void 0 === t) {
              if (o.hasOwnProperty(e)) return o[e];
              throw Error("SubParser named " + e + " not registered!")
            }
            o[e] = t
          }
        }, i.extension = function (e, t) {
          if (!i.helper.isString(e)) throw Error("Extension 'name' must be a string");
          if (e = i.helper.stdExtName(e), i.helper.isUndefined(t)) {
            if (!s.hasOwnProperty(e)) throw Error("Extension named " + e + " is not registered!");
            return s[e]
          }
          "function" == typeof t && (t = t()), i.helper.isArray(t) || (t = [t]);
          var a = r(t, e);
          if (!a.valid) throw Error(a.error);
          s[e] = t
        }, i.getAllExtensions = function () {
          return s
        }, i.removeExtension = function (e) {
          delete s[e]
        }, i.resetExtensions = function () {
          s = {}
        }, i.validateExtension = function (e) {
          var t = r(e, null);
          return !!t.valid || !1
        }, i.hasOwnProperty("helper") || (i.helper = {}), i.helper.isString = function (e) {
          return "string" == typeof e || e instanceof String
        }, i.helper.isFunction = function (e) {
          return e && "[object Function]" === {}.toString.call(e)
        }, i.helper.isArray = function (e) {
          return Array.isArray(e)
        }, i.helper.isUndefined = function (e) {
          return void 0 === e
        }, i.helper.forEach = function (e, t) {
          if (i.helper.isUndefined(e)) throw new Error("obj param is required");
          if (i.helper.isUndefined(t)) throw new Error("callback param is required");
          if (!i.helper.isFunction(t)) throw new Error("callback param must be a function/closure");
          if ("function" == typeof e.forEach) e.forEach(t);
          else if (i.helper.isArray(e))
            for (var r = 0; r < e.length; r++) t(e[r], r, e);
          else {
            if ("object" != (void 0 === e ? "undefined" : a(e))) throw new Error("obj does not seem to be an array or an iterable object");
            for (var n in e) e.hasOwnProperty(n) && t(e[n], n, e)
          }
        }, i.helper.stdExtName = function (e) {
          return e.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase()
        }, i.helper.escapeCharactersCallback = n, i.helper.escapeCharacters = function (e, t, r) {
          var a = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
          r && (a = "\\\\" + a);
          var i = new RegExp(a, "g");
          return e.replace(i, n)
        }, i.helper.unescapeHTMLEntities = function (e) {
          return e.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        };
        var d = function (e, t, r, a) {
          var n, i, o, s, l, c = a || "",
            u = c.indexOf("g") > -1,
            d = new RegExp(t + "|" + r, "g" + c.replace(/g/g, "")),
            h = new RegExp(t, c.replace(/g/g, "")),
            f = [];
          do {
            for (n = 0; o = d.exec(e);)
              if (h.test(o[0])) n++ || (s = (i = d.lastIndex) - o[0].length);
              else if (n && !--n) {
              l = o.index + o[0].length;
              var p = {
                left: {
                  start: s,
                  end: i
                },
                match: {
                  start: i,
                  end: o.index
                },
                right: {
                  start: o.index,
                  end: l
                },
                wholeMatch: {
                  start: s,
                  end: l
                }
              };
              if (f.push(p), !u) return f
            }
          } while (n && (d.lastIndex = i));
          return f
        };
        i.helper.matchRecursiveRegExp = function (e, t, r, a) {
          for (var n = d(e, t, r, a), i = [], o = 0; o < n.length; ++o) i.push([e.slice(n[o].wholeMatch.start, n[o].wholeMatch.end), e.slice(n[o].match.start, n[o].match.end), e.slice(n[o].left.start, n[o].left.end), e.slice(n[o].right.start, n[o].right.end)]);
          return i
        }, i.helper.replaceRecursiveRegExp = function (e, t, r, a, n) {
          if (!i.helper.isFunction(t)) {
            var o = t;
            t = function () {
              return o
            }
          }
          var s = d(e, r, a, n),
            l = e,
            c = s.length;
          if (c > 0) {
            var u = [];
            0 !== s[0].wholeMatch.start && u.push(e.slice(0, s[0].wholeMatch.start));
            for (var h = 0; h < c; ++h) u.push(t(e.slice(s[h].wholeMatch.start, s[h].wholeMatch.end), e.slice(s[h].match.start, s[h].match.end), e.slice(s[h].left.start, s[h].left.end), e.slice(s[h].right.start, s[h].right.end))), h < c - 1 && u.push(e.slice(s[h].wholeMatch.end, s[h + 1].wholeMatch.start));
            s[c - 1].wholeMatch.end < e.length && u.push(e.slice(s[c - 1].wholeMatch.end)), l = u.join("")
          }
          return l
        }, i.helper.regexIndexOf = function (e, t, r) {
          if (!i.helper.isString(e)) throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          if (t instanceof RegExp == 0) throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
          var a = e.substring(r || 0).search(t);
          return a >= 0 ? a + (r || 0) : a
        }, i.helper.splitAtIndex = function (e, t) {
          if (!i.helper.isString(e)) throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          return [e.substring(0, t), e.substring(t)]
        }, i.helper.encodeEmailAddress = function (e) {
          var t = [function (e) {
            return "&#" + e.charCodeAt(0) + ";"
          }, function (e) {
            return "&#x" + e.charCodeAt(0).toString(16) + ";"
          }, function (e) {
            return e
          }];
          return e.replace(/./g, function (e) {
            if ("@" === e) e = t[Math.floor(2 * Math.random())](e);
            else {
              var r = Math.random();
              e = r > .9 ? t[2](e) : r > .45 ? t[1](e) : t[0](e)
            }
            return e
          })
        }, i.helper.padEnd = function (e, t, r) {
          return t >>= 0, r = String(r || " "), e.length > t ? String(e) : ((t -= e.length) > r.length && (r += r.repeat(t / r.length)), String(e) + r.slice(0, t))
        }, "undefined" == typeof console && (console = {
          warn: function (e) {
            alert(e)
          },
          log: function (e) {
            alert(e)
          },
          error: function (e) {
            throw e
          }
        }), i.helper.regexes = {
          asteriskDashAndColon: /([*_:~])/g
        }, i.helper.emojis = {
          "+1": "👍",
          "-1": "👎",
          100: "💯",
          1234: "🔢",
          "1st_place_medal": "🥇",
          "2nd_place_medal": "🥈",
          "3rd_place_medal": "🥉",
          "8ball": "🎱",
          a: "🅰️",
          ab: "🆎",
          abc: "🔤",
          abcd: "🔡",
          accept: "🉑",
          aerial_tramway: "🚡",
          airplane: "✈️",
          alarm_clock: "⏰",
          alembic: "⚗️",
          alien: "👽",
          ambulance: "🚑",
          amphora: "🏺",
          anchor: "⚓️",
          angel: "👼",
          anger: "💢",
          angry: "😠",
          anguished: "😧",
          ant: "🐜",
          apple: "🍎",
          aquarius: "♒️",
          aries: "♈️",
          arrow_backward: "◀️",
          arrow_double_down: "⏬",
          arrow_double_up: "⏫",
          arrow_down: "⬇️",
          arrow_down_small: "🔽",
          arrow_forward: "▶️",
          arrow_heading_down: "⤵️",
          arrow_heading_up: "⤴️",
          arrow_left: "⬅️",
          arrow_lower_left: "↙️",
          arrow_lower_right: "↘️",
          arrow_right: "➡️",
          arrow_right_hook: "↪️",
          arrow_up: "⬆️",
          arrow_up_down: "↕️",
          arrow_up_small: "🔼",
          arrow_upper_left: "↖️",
          arrow_upper_right: "↗️",
          arrows_clockwise: "🔃",
          arrows_counterclockwise: "🔄",
          art: "🎨",
          articulated_lorry: "🚛",
          artificial_satellite: "🛰",
          astonished: "😲",
          athletic_shoe: "👟",
          atm: "🏧",
          atom_symbol: "⚛️",
          avocado: "🥑",
          b: "🅱️",
          baby: "👶",
          baby_bottle: "🍼",
          baby_chick: "🐤",
          baby_symbol: "🚼",
          back: "🔙",
          bacon: "🥓",
          badminton: "🏸",
          baggage_claim: "🛄",
          baguette_bread: "🥖",
          balance_scale: "⚖️",
          balloon: "🎈",
          ballot_box: "🗳",
          ballot_box_with_check: "☑️",
          bamboo: "🎍",
          banana: "🍌",
          bangbang: "‼️",
          bank: "🏦",
          bar_chart: "📊",
          barber: "💈",
          baseball: "⚾️",
          basketball: "🏀",
          basketball_man: "⛹️",
          basketball_woman: "⛹️&zwj;♀️",
          bat: "🦇",
          bath: "🛀",
          bathtub: "🛁",
          battery: "🔋",
          beach_umbrella: "🏖",
          bear: "🐻",
          bed: "🛏",
          bee: "🐝",
          beer: "🍺",
          beers: "🍻",
          beetle: "🐞",
          beginner: "🔰",
          bell: "🔔",
          bellhop_bell: "🛎",
          bento: "🍱",
          biking_man: "🚴",
          bike: "🚲",
          biking_woman: "🚴&zwj;♀️",
          bikini: "👙",
          biohazard: "☣️",
          bird: "🐦",
          birthday: "🎂",
          black_circle: "⚫️",
          black_flag: "🏴",
          black_heart: "🖤",
          black_joker: "🃏",
          black_large_square: "⬛️",
          black_medium_small_square: "◾️",
          black_medium_square: "◼️",
          black_nib: "✒️",
          black_small_square: "▪️",
          black_square_button: "🔲",
          blonde_man: "👱",
          blonde_woman: "👱&zwj;♀️",
          blossom: "🌼",
          blowfish: "🐡",
          blue_book: "📘",
          blue_car: "🚙",
          blue_heart: "💙",
          blush: "😊",
          boar: "🐗",
          boat: "⛵️",
          bomb: "💣",
          book: "📖",
          bookmark: "🔖",
          bookmark_tabs: "📑",
          books: "📚",
          boom: "💥",
          boot: "👢",
          bouquet: "💐",
          bowing_man: "🙇",
          bow_and_arrow: "🏹",
          bowing_woman: "🙇&zwj;♀️",
          bowling: "🎳",
          boxing_glove: "🥊",
          boy: "👦",
          bread: "🍞",
          bride_with_veil: "👰",
          bridge_at_night: "🌉",
          briefcase: "💼",
          broken_heart: "💔",
          bug: "🐛",
          building_construction: "🏗",
          bulb: "💡",
          bullettrain_front: "🚅",
          bullettrain_side: "🚄",
          burrito: "🌯",
          bus: "🚌",
          business_suit_levitating: "🕴",
          busstop: "🚏",
          bust_in_silhouette: "👤",
          busts_in_silhouette: "👥",
          butterfly: "🦋",
          cactus: "🌵",
          cake: "🍰",
          calendar: "📆",
          call_me_hand: "🤙",
          calling: "📲",
          camel: "🐫",
          camera: "📷",
          camera_flash: "📸",
          camping: "🏕",
          cancer: "♋️",
          candle: "🕯",
          candy: "🍬",
          canoe: "🛶",
          capital_abcd: "🔠",
          capricorn: "♑️",
          car: "🚗",
          card_file_box: "🗃",
          card_index: "📇",
          card_index_dividers: "🗂",
          carousel_horse: "🎠",
          carrot: "🥕",
          cat: "🐱",
          cat2: "🐈",
          cd: "💿",
          chains: "⛓",
          champagne: "🍾",
          chart: "💹",
          chart_with_downwards_trend: "📉",
          chart_with_upwards_trend: "📈",
          checkered_flag: "🏁",
          cheese: "🧀",
          cherries: "🍒",
          cherry_blossom: "🌸",
          chestnut: "🌰",
          chicken: "🐔",
          children_crossing: "🚸",
          chipmunk: "🐿",
          chocolate_bar: "🍫",
          christmas_tree: "🎄",
          church: "⛪️",
          cinema: "🎦",
          circus_tent: "🎪",
          city_sunrise: "🌇",
          city_sunset: "🌆",
          cityscape: "🏙",
          cl: "🆑",
          clamp: "🗜",
          clap: "👏",
          clapper: "🎬",
          classical_building: "🏛",
          clinking_glasses: "🥂",
          clipboard: "📋",
          clock1: "🕐",
          clock10: "🕙",
          clock1030: "🕥",
          clock11: "🕚",
          clock1130: "🕦",
          clock12: "🕛",
          clock1230: "🕧",
          clock130: "🕜",
          clock2: "🕑",
          clock230: "🕝",
          clock3: "🕒",
          clock330: "🕞",
          clock4: "🕓",
          clock430: "🕟",
          clock5: "🕔",
          clock530: "🕠",
          clock6: "🕕",
          clock630: "🕡",
          clock7: "🕖",
          clock730: "🕢",
          clock8: "🕗",
          clock830: "🕣",
          clock9: "🕘",
          clock930: "🕤",
          closed_book: "📕",
          closed_lock_with_key: "🔐",
          closed_umbrella: "🌂",
          cloud: "☁️",
          cloud_with_lightning: "🌩",
          cloud_with_lightning_and_rain: "⛈",
          cloud_with_rain: "🌧",
          cloud_with_snow: "🌨",
          clown_face: "🤡",
          clubs: "♣️",
          cocktail: "🍸",
          coffee: "☕️",
          coffin: "⚰️",
          cold_sweat: "😰",
          comet: "☄️",
          computer: "💻",
          computer_mouse: "🖱",
          confetti_ball: "🎊",
          confounded: "😖",
          confused: "😕",
          congratulations: "㊗️",
          construction: "🚧",
          construction_worker_man: "👷",
          construction_worker_woman: "👷&zwj;♀️",
          control_knobs: "🎛",
          convenience_store: "🏪",
          cookie: "🍪",
          cool: "🆒",
          policeman: "👮",
          copyright: "©️",
          corn: "🌽",
          couch_and_lamp: "🛋",
          couple: "👫",
          couple_with_heart_woman_man: "💑",
          couple_with_heart_man_man: "👨&zwj;❤️&zwj;👨",
          couple_with_heart_woman_woman: "👩&zwj;❤️&zwj;👩",
          couplekiss_man_man: "👨&zwj;❤️&zwj;💋&zwj;👨",
          couplekiss_man_woman: "💏",
          couplekiss_woman_woman: "👩&zwj;❤️&zwj;💋&zwj;👩",
          cow: "🐮",
          cow2: "🐄",
          cowboy_hat_face: "🤠",
          crab: "🦀",
          crayon: "🖍",
          credit_card: "💳",
          crescent_moon: "🌙",
          cricket: "🏏",
          crocodile: "🐊",
          croissant: "🥐",
          crossed_fingers: "🤞",
          crossed_flags: "🎌",
          crossed_swords: "⚔️",
          crown: "👑",
          cry: "😢",
          crying_cat_face: "😿",
          crystal_ball: "🔮",
          cucumber: "🥒",
          cupid: "💘",
          curly_loop: "➰",
          currency_exchange: "💱",
          curry: "🍛",
          custard: "🍮",
          customs: "🛃",
          cyclone: "🌀",
          dagger: "🗡",
          dancer: "💃",
          dancing_women: "👯",
          dancing_men: "👯&zwj;♂️",
          dango: "🍡",
          dark_sunglasses: "🕶",
          dart: "🎯",
          dash: "💨",
          date: "📅",
          deciduous_tree: "🌳",
          deer: "🦌",
          department_store: "🏬",
          derelict_house: "🏚",
          desert: "🏜",
          desert_island: "🏝",
          desktop_computer: "🖥",
          male_detective: "🕵️",
          diamond_shape_with_a_dot_inside: "💠",
          diamonds: "♦️",
          disappointed: "😞",
          disappointed_relieved: "😥",
          dizzy: "💫",
          dizzy_face: "😵",
          do_not_litter: "🚯",
          dog: "🐶",
          dog2: "🐕",
          dollar: "💵",
          dolls: "🎎",
          dolphin: "🐬",
          door: "🚪",
          doughnut: "🍩",
          dove: "🕊",
          dragon: "🐉",
          dragon_face: "🐲",
          dress: "👗",
          dromedary_camel: "🐪",
          drooling_face: "🤤",
          droplet: "💧",
          drum: "🥁",
          duck: "🦆",
          dvd: "📀",
          "e-mail": "📧",
          eagle: "🦅",
          ear: "👂",
          ear_of_rice: "🌾",
          earth_africa: "🌍",
          earth_americas: "🌎",
          earth_asia: "🌏",
          egg: "🥚",
          eggplant: "🍆",
          eight_pointed_black_star: "✴️",
          eight_spoked_asterisk: "✳️",
          electric_plug: "🔌",
          elephant: "🐘",
          email: "✉️",
          end: "🔚",
          envelope_with_arrow: "📩",
          euro: "💶",
          european_castle: "🏰",
          european_post_office: "🏤",
          evergreen_tree: "🌲",
          exclamation: "❗️",
          expressionless: "😑",
          eye: "👁",
          eye_speech_bubble: "👁&zwj;🗨",
          eyeglasses: "👓",
          eyes: "👀",
          face_with_head_bandage: "🤕",
          face_with_thermometer: "🤒",
          fist_oncoming: "👊",
          factory: "🏭",
          fallen_leaf: "🍂",
          family_man_woman_boy: "👪",
          family_man_boy: "👨&zwj;👦",
          family_man_boy_boy: "👨&zwj;👦&zwj;👦",
          family_man_girl: "👨&zwj;👧",
          family_man_girl_boy: "👨&zwj;👧&zwj;👦",
          family_man_girl_girl: "👨&zwj;👧&zwj;👧",
          family_man_man_boy: "👨&zwj;👨&zwj;👦",
          family_man_man_boy_boy: "👨&zwj;👨&zwj;👦&zwj;👦",
          family_man_man_girl: "👨&zwj;👨&zwj;👧",
          family_man_man_girl_boy: "👨&zwj;👨&zwj;👧&zwj;👦",
          family_man_man_girl_girl: "👨&zwj;👨&zwj;👧&zwj;👧",
          family_man_woman_boy_boy: "👨&zwj;👩&zwj;👦&zwj;👦",
          family_man_woman_girl: "👨&zwj;👩&zwj;👧",
          family_man_woman_girl_boy: "👨&zwj;👩&zwj;👧&zwj;👦",
          family_man_woman_girl_girl: "👨&zwj;👩&zwj;👧&zwj;👧",
          family_woman_boy: "👩&zwj;👦",
          family_woman_boy_boy: "👩&zwj;👦&zwj;👦",
          family_woman_girl: "👩&zwj;👧",
          family_woman_girl_boy: "👩&zwj;👧&zwj;👦",
          family_woman_girl_girl: "👩&zwj;👧&zwj;👧",
          family_woman_woman_boy: "👩&zwj;👩&zwj;👦",
          family_woman_woman_boy_boy: "👩&zwj;👩&zwj;👦&zwj;👦",
          family_woman_woman_girl: "👩&zwj;👩&zwj;👧",
          family_woman_woman_girl_boy: "👩&zwj;👩&zwj;👧&zwj;👦",
          family_woman_woman_girl_girl: "👩&zwj;👩&zwj;👧&zwj;👧",
          fast_forward: "⏩",
          fax: "📠",
          fearful: "😨",
          feet: "🐾",
          female_detective: "🕵️&zwj;♀️",
          ferris_wheel: "🎡",
          ferry: "⛴",
          field_hockey: "🏑",
          file_cabinet: "🗄",
          file_folder: "📁",
          film_projector: "📽",
          film_strip: "🎞",
          fire: "🔥",
          fire_engine: "🚒",
          fireworks: "🎆",
          first_quarter_moon: "🌓",
          first_quarter_moon_with_face: "🌛",
          fish: "🐟",
          fish_cake: "🍥",
          fishing_pole_and_fish: "🎣",
          fist_raised: "✊",
          fist_left: "🤛",
          fist_right: "🤜",
          flags: "🎏",
          flashlight: "🔦",
          fleur_de_lis: "⚜️",
          flight_arrival: "🛬",
          flight_departure: "🛫",
          floppy_disk: "💾",
          flower_playing_cards: "🎴",
          flushed: "😳",
          fog: "🌫",
          foggy: "🌁",
          football: "🏈",
          footprints: "👣",
          fork_and_knife: "🍴",
          fountain: "⛲️",
          fountain_pen: "🖋",
          four_leaf_clover: "🍀",
          fox_face: "🦊",
          framed_picture: "🖼",
          free: "🆓",
          fried_egg: "🍳",
          fried_shrimp: "🍤",
          fries: "🍟",
          frog: "🐸",
          frowning: "😦",
          frowning_face: "☹️",
          frowning_man: "🙍&zwj;♂️",
          frowning_woman: "🙍",
          middle_finger: "🖕",
          fuelpump: "⛽️",
          full_moon: "🌕",
          full_moon_with_face: "🌝",
          funeral_urn: "⚱️",
          game_die: "🎲",
          gear: "⚙️",
          gem: "💎",
          gemini: "♊️",
          ghost: "👻",
          gift: "🎁",
          gift_heart: "💝",
          girl: "👧",
          globe_with_meridians: "🌐",
          goal_net: "🥅",
          goat: "🐐",
          golf: "⛳️",
          golfing_man: "🏌️",
          golfing_woman: "🏌️&zwj;♀️",
          gorilla: "🦍",
          grapes: "🍇",
          green_apple: "🍏",
          green_book: "📗",
          green_heart: "💚",
          green_salad: "🥗",
          grey_exclamation: "❕",
          grey_question: "❔",
          grimacing: "😬",
          grin: "😁",
          grinning: "😀",
          guardsman: "💂",
          guardswoman: "💂&zwj;♀️",
          guitar: "🎸",
          gun: "🔫",
          haircut_woman: "💇",
          haircut_man: "💇&zwj;♂️",
          hamburger: "🍔",
          hammer: "🔨",
          hammer_and_pick: "⚒",
          hammer_and_wrench: "🛠",
          hamster: "🐹",
          hand: "✋",
          handbag: "👜",
          handshake: "🤝",
          hankey: "💩",
          hatched_chick: "🐥",
          hatching_chick: "🐣",
          headphones: "🎧",
          hear_no_evil: "🙉",
          heart: "❤️",
          heart_decoration: "💟",
          heart_eyes: "😍",
          heart_eyes_cat: "😻",
          heartbeat: "💓",
          heartpulse: "💗",
          hearts: "♥️",
          heavy_check_mark: "✔️",
          heavy_division_sign: "➗",
          heavy_dollar_sign: "💲",
          heavy_heart_exclamation: "❣️",
          heavy_minus_sign: "➖",
          heavy_multiplication_x: "✖️",
          heavy_plus_sign: "➕",
          helicopter: "🚁",
          herb: "🌿",
          hibiscus: "🌺",
          high_brightness: "🔆",
          high_heel: "👠",
          hocho: "🔪",
          hole: "🕳",
          honey_pot: "🍯",
          horse: "🐴",
          horse_racing: "🏇",
          hospital: "🏥",
          hot_pepper: "🌶",
          hotdog: "🌭",
          hotel: "🏨",
          hotsprings: "♨️",
          hourglass: "⌛️",
          hourglass_flowing_sand: "⏳",
          house: "🏠",
          house_with_garden: "🏡",
          houses: "🏘",
          hugs: "🤗",
          hushed: "😯",
          ice_cream: "🍨",
          ice_hockey: "🏒",
          ice_skate: "⛸",
          icecream: "🍦",
          id: "🆔",
          ideograph_advantage: "🉐",
          imp: "👿",
          inbox_tray: "📥",
          incoming_envelope: "📨",
          tipping_hand_woman: "💁",
          information_source: "ℹ️",
          innocent: "😇",
          interrobang: "⁉️",
          iphone: "📱",
          izakaya_lantern: "🏮",
          jack_o_lantern: "🎃",
          japan: "🗾",
          japanese_castle: "🏯",
          japanese_goblin: "👺",
          japanese_ogre: "👹",
          jeans: "👖",
          joy: "😂",
          joy_cat: "😹",
          joystick: "🕹",
          kaaba: "🕋",
          key: "🔑",
          keyboard: "⌨️",
          keycap_ten: "🔟",
          kick_scooter: "🛴",
          kimono: "👘",
          kiss: "💋",
          kissing: "😗",
          kissing_cat: "😽",
          kissing_closed_eyes: "😚",
          kissing_heart: "😘",
          kissing_smiling_eyes: "😙",
          kiwi_fruit: "🥝",
          koala: "🐨",
          koko: "🈁",
          label: "🏷",
          large_blue_circle: "🔵",
          large_blue_diamond: "🔷",
          large_orange_diamond: "🔶",
          last_quarter_moon: "🌗",
          last_quarter_moon_with_face: "🌜",
          latin_cross: "✝️",
          laughing: "😆",
          leaves: "🍃",
          ledger: "📒",
          left_luggage: "🛅",
          left_right_arrow: "↔️",
          leftwards_arrow_with_hook: "↩️",
          lemon: "🍋",
          leo: "♌️",
          leopard: "🐆",
          level_slider: "🎚",
          libra: "♎️",
          light_rail: "🚈",
          link: "🔗",
          lion: "🦁",
          lips: "👄",
          lipstick: "💄",
          lizard: "🦎",
          lock: "🔒",
          lock_with_ink_pen: "🔏",
          lollipop: "🍭",
          loop: "➿",
          loud_sound: "🔊",
          loudspeaker: "📢",
          love_hotel: "🏩",
          love_letter: "💌",
          low_brightness: "🔅",
          lying_face: "🤥",
          m: "Ⓜ️",
          mag: "🔍",
          mag_right: "🔎",
          mahjong: "🀄️",
          mailbox: "📫",
          mailbox_closed: "📪",
          mailbox_with_mail: "📬",
          mailbox_with_no_mail: "📭",
          man: "👨",
          man_artist: "👨&zwj;🎨",
          man_astronaut: "👨&zwj;🚀",
          man_cartwheeling: "🤸&zwj;♂️",
          man_cook: "👨&zwj;🍳",
          man_dancing: "🕺",
          man_facepalming: "🤦&zwj;♂️",
          man_factory_worker: "👨&zwj;🏭",
          man_farmer: "👨&zwj;🌾",
          man_firefighter: "👨&zwj;🚒",
          man_health_worker: "👨&zwj;⚕️",
          man_in_tuxedo: "🤵",
          man_judge: "👨&zwj;⚖️",
          man_juggling: "🤹&zwj;♂️",
          man_mechanic: "👨&zwj;🔧",
          man_office_worker: "👨&zwj;💼",
          man_pilot: "👨&zwj;✈️",
          man_playing_handball: "🤾&zwj;♂️",
          man_playing_water_polo: "🤽&zwj;♂️",
          man_scientist: "👨&zwj;🔬",
          man_shrugging: "🤷&zwj;♂️",
          man_singer: "👨&zwj;🎤",
          man_student: "👨&zwj;🎓",
          man_teacher: "👨&zwj;🏫",
          man_technologist: "👨&zwj;💻",
          man_with_gua_pi_mao: "👲",
          man_with_turban: "👳",
          tangerine: "🍊",
          mans_shoe: "👞",
          mantelpiece_clock: "🕰",
          maple_leaf: "🍁",
          martial_arts_uniform: "🥋",
          mask: "😷",
          massage_woman: "💆",
          massage_man: "💆&zwj;♂️",
          meat_on_bone: "🍖",
          medal_military: "🎖",
          medal_sports: "🏅",
          mega: "📣",
          melon: "🍈",
          memo: "📝",
          men_wrestling: "🤼&zwj;♂️",
          menorah: "🕎",
          mens: "🚹",
          metal: "🤘",
          metro: "🚇",
          microphone: "🎤",
          microscope: "🔬",
          milk_glass: "🥛",
          milky_way: "🌌",
          minibus: "🚐",
          minidisc: "💽",
          mobile_phone_off: "📴",
          money_mouth_face: "🤑",
          money_with_wings: "💸",
          moneybag: "💰",
          monkey: "🐒",
          monkey_face: "🐵",
          monorail: "🚝",
          moon: "🌔",
          mortar_board: "🎓",
          mosque: "🕌",
          motor_boat: "🛥",
          motor_scooter: "🛵",
          motorcycle: "🏍",
          motorway: "🛣",
          mount_fuji: "🗻",
          mountain: "⛰",
          mountain_biking_man: "🚵",
          mountain_biking_woman: "🚵&zwj;♀️",
          mountain_cableway: "🚠",
          mountain_railway: "🚞",
          mountain_snow: "🏔",
          mouse: "🐭",
          mouse2: "🐁",
          movie_camera: "🎥",
          moyai: "🗿",
          mrs_claus: "🤶",
          muscle: "💪",
          mushroom: "🍄",
          musical_keyboard: "🎹",
          musical_note: "🎵",
          musical_score: "🎼",
          mute: "🔇",
          nail_care: "💅",
          name_badge: "📛",
          national_park: "🏞",
          nauseated_face: "🤢",
          necktie: "👔",
          negative_squared_cross_mark: "❎",
          nerd_face: "🤓",
          neutral_face: "😐",
          new: "🆕",
          new_moon: "🌑",
          new_moon_with_face: "🌚",
          newspaper: "📰",
          newspaper_roll: "🗞",
          next_track_button: "⏭",
          ng: "🆖",
          no_good_man: "🙅&zwj;♂️",
          no_good_woman: "🙅",
          night_with_stars: "🌃",
          no_bell: "🔕",
          no_bicycles: "🚳",
          no_entry: "⛔️",
          no_entry_sign: "🚫",
          no_mobile_phones: "📵",
          no_mouth: "😶",
          no_pedestrians: "🚷",
          no_smoking: "🚭",
          "non-potable_water": "🚱",
          nose: "👃",
          notebook: "📓",
          notebook_with_decorative_cover: "📔",
          notes: "🎶",
          nut_and_bolt: "🔩",
          o: "⭕️",
          o2: "🅾️",
          ocean: "🌊",
          octopus: "🐙",
          oden: "🍢",
          office: "🏢",
          oil_drum: "🛢",
          ok: "🆗",
          ok_hand: "👌",
          ok_man: "🙆&zwj;♂️",
          ok_woman: "🙆",
          old_key: "🗝",
          older_man: "👴",
          older_woman: "👵",
          om: "🕉",
          on: "🔛",
          oncoming_automobile: "🚘",
          oncoming_bus: "🚍",
          oncoming_police_car: "🚔",
          oncoming_taxi: "🚖",
          open_file_folder: "📂",
          open_hands: "👐",
          open_mouth: "😮",
          open_umbrella: "☂️",
          ophiuchus: "⛎",
          orange_book: "📙",
          orthodox_cross: "☦️",
          outbox_tray: "📤",
          owl: "🦉",
          ox: "🐂",
          package: "📦",
          page_facing_up: "📄",
          page_with_curl: "📃",
          pager: "📟",
          paintbrush: "🖌",
          palm_tree: "🌴",
          pancakes: "🥞",
          panda_face: "🐼",
          paperclip: "📎",
          paperclips: "🖇",
          parasol_on_ground: "⛱",
          parking: "🅿️",
          part_alternation_mark: "〽️",
          partly_sunny: "⛅️",
          passenger_ship: "🛳",
          passport_control: "🛂",
          pause_button: "⏸",
          peace_symbol: "☮️",
          peach: "🍑",
          peanuts: "🥜",
          pear: "🍐",
          pen: "🖊",
          pencil2: "✏️",
          penguin: "🐧",
          pensive: "😔",
          performing_arts: "🎭",
          persevere: "😣",
          person_fencing: "🤺",
          pouting_woman: "🙎",
          phone: "☎️",
          pick: "⛏",
          pig: "🐷",
          pig2: "🐖",
          pig_nose: "🐽",
          pill: "💊",
          pineapple: "🍍",
          ping_pong: "🏓",
          pisces: "♓️",
          pizza: "🍕",
          place_of_worship: "🛐",
          plate_with_cutlery: "🍽",
          play_or_pause_button: "⏯",
          point_down: "👇",
          point_left: "👈",
          point_right: "👉",
          point_up: "☝️",
          point_up_2: "👆",
          police_car: "🚓",
          policewoman: "👮&zwj;♀️",
          poodle: "🐩",
          popcorn: "🍿",
          post_office: "🏣",
          postal_horn: "📯",
          postbox: "📮",
          potable_water: "🚰",
          potato: "🥔",
          pouch: "👝",
          poultry_leg: "🍗",
          pound: "💷",
          rage: "😡",
          pouting_cat: "😾",
          pouting_man: "🙎&zwj;♂️",
          pray: "🙏",
          prayer_beads: "📿",
          pregnant_woman: "🤰",
          previous_track_button: "⏮",
          prince: "🤴",
          princess: "👸",
          printer: "🖨",
          purple_heart: "💜",
          purse: "👛",
          pushpin: "📌",
          put_litter_in_its_place: "🚮",
          question: "❓",
          rabbit: "🐰",
          rabbit2: "🐇",
          racehorse: "🐎",
          racing_car: "🏎",
          radio: "📻",
          radio_button: "🔘",
          radioactive: "☢️",
          railway_car: "🚃",
          railway_track: "🛤",
          rainbow: "🌈",
          rainbow_flag: "🏳️&zwj;🌈",
          raised_back_of_hand: "🤚",
          raised_hand_with_fingers_splayed: "🖐",
          raised_hands: "🙌",
          raising_hand_woman: "🙋",
          raising_hand_man: "🙋&zwj;♂️",
          ram: "🐏",
          ramen: "🍜",
          rat: "🐀",
          record_button: "⏺",
          recycle: "♻️",
          red_circle: "🔴",
          registered: "®️",
          relaxed: "☺️",
          relieved: "😌",
          reminder_ribbon: "🎗",
          repeat: "🔁",
          repeat_one: "🔂",
          rescue_worker_helmet: "⛑",
          restroom: "🚻",
          revolving_hearts: "💞",
          rewind: "⏪",
          rhinoceros: "🦏",
          ribbon: "🎀",
          rice: "🍚",
          rice_ball: "🍙",
          rice_cracker: "🍘",
          rice_scene: "🎑",
          right_anger_bubble: "🗯",
          ring: "💍",
          robot: "🤖",
          rocket: "🚀",
          rofl: "🤣",
          roll_eyes: "🙄",
          roller_coaster: "🎢",
          rooster: "🐓",
          rose: "🌹",
          rosette: "🏵",
          rotating_light: "🚨",
          round_pushpin: "📍",
          rowing_man: "🚣",
          rowing_woman: "🚣&zwj;♀️",
          rugby_football: "🏉",
          running_man: "🏃",
          running_shirt_with_sash: "🎽",
          running_woman: "🏃&zwj;♀️",
          sa: "🈂️",
          sagittarius: "♐️",
          sake: "🍶",
          sandal: "👡",
          santa: "🎅",
          satellite: "📡",
          saxophone: "🎷",
          school: "🏫",
          school_satchel: "🎒",
          scissors: "✂️",
          scorpion: "🦂",
          scorpius: "♏️",
          scream: "😱",
          scream_cat: "🙀",
          scroll: "📜",
          seat: "💺",
          secret: "㊙️",
          see_no_evil: "🙈",
          seedling: "🌱",
          selfie: "🤳",
          shallow_pan_of_food: "🥘",
          shamrock: "☘️",
          shark: "🦈",
          shaved_ice: "🍧",
          sheep: "🐑",
          shell: "🐚",
          shield: "🛡",
          shinto_shrine: "⛩",
          ship: "🚢",
          shirt: "👕",
          shopping: "🛍",
          shopping_cart: "🛒",
          shower: "🚿",
          shrimp: "🦐",
          signal_strength: "📶",
          six_pointed_star: "🔯",
          ski: "🎿",
          skier: "⛷",
          skull: "💀",
          skull_and_crossbones: "☠️",
          sleeping: "😴",
          sleeping_bed: "🛌",
          sleepy: "😪",
          slightly_frowning_face: "🙁",
          slightly_smiling_face: "🙂",
          slot_machine: "🎰",
          small_airplane: "🛩",
          small_blue_diamond: "🔹",
          small_orange_diamond: "🔸",
          small_red_triangle: "🔺",
          small_red_triangle_down: "🔻",
          smile: "😄",
          smile_cat: "😸",
          smiley: "😃",
          smiley_cat: "😺",
          smiling_imp: "😈",
          smirk: "😏",
          smirk_cat: "😼",
          smoking: "🚬",
          snail: "🐌",
          snake: "🐍",
          sneezing_face: "🤧",
          snowboarder: "🏂",
          snowflake: "❄️",
          snowman: "⛄️",
          snowman_with_snow: "☃️",
          sob: "😭",
          soccer: "⚽️",
          soon: "🔜",
          sos: "🆘",
          sound: "🔉",
          space_invader: "👾",
          spades: "♠️",
          spaghetti: "🍝",
          sparkle: "❇️",
          sparkler: "🎇",
          sparkles: "✨",
          sparkling_heart: "💖",
          speak_no_evil: "🙊",
          speaker: "🔈",
          speaking_head: "🗣",
          speech_balloon: "💬",
          speedboat: "🚤",
          spider: "🕷",
          spider_web: "🕸",
          spiral_calendar: "🗓",
          spiral_notepad: "🗒",
          spoon: "🥄",
          squid: "🦑",
          stadium: "🏟",
          star: "⭐️",
          star2: "🌟",
          star_and_crescent: "☪️",
          star_of_david: "✡️",
          stars: "🌠",
          station: "🚉",
          statue_of_liberty: "🗽",
          steam_locomotive: "🚂",
          stew: "🍲",
          stop_button: "⏹",
          stop_sign: "🛑",
          stopwatch: "⏱",
          straight_ruler: "📏",
          strawberry: "🍓",
          stuck_out_tongue: "😛",
          stuck_out_tongue_closed_eyes: "😝",
          stuck_out_tongue_winking_eye: "😜",
          studio_microphone: "🎙",
          stuffed_flatbread: "🥙",
          sun_behind_large_cloud: "🌥",
          sun_behind_rain_cloud: "🌦",
          sun_behind_small_cloud: "🌤",
          sun_with_face: "🌞",
          sunflower: "🌻",
          sunglasses: "😎",
          sunny: "☀️",
          sunrise: "🌅",
          sunrise_over_mountains: "🌄",
          surfing_man: "🏄",
          surfing_woman: "🏄&zwj;♀️",
          sushi: "🍣",
          suspension_railway: "🚟",
          sweat: "😓",
          sweat_drops: "💦",
          sweat_smile: "😅",
          sweet_potato: "🍠",
          swimming_man: "🏊",
          swimming_woman: "🏊&zwj;♀️",
          symbols: "🔣",
          synagogue: "🕍",
          syringe: "💉",
          taco: "🌮",
          tada: "🎉",
          tanabata_tree: "🎋",
          taurus: "♉️",
          taxi: "🚕",
          tea: "🍵",
          telephone_receiver: "📞",
          telescope: "🔭",
          tennis: "🎾",
          tent: "⛺️",
          thermometer: "🌡",
          thinking: "🤔",
          thought_balloon: "💭",
          ticket: "🎫",
          tickets: "🎟",
          tiger: "🐯",
          tiger2: "🐅",
          timer_clock: "⏲",
          tipping_hand_man: "💁&zwj;♂️",
          tired_face: "😫",
          tm: "™️",
          toilet: "🚽",
          tokyo_tower: "🗼",
          tomato: "🍅",
          tongue: "👅",
          top: "🔝",
          tophat: "🎩",
          tornado: "🌪",
          trackball: "🖲",
          tractor: "🚜",
          traffic_light: "🚥",
          train: "🚋",
          train2: "🚆",
          tram: "🚊",
          triangular_flag_on_post: "🚩",
          triangular_ruler: "📐",
          trident: "🔱",
          triumph: "😤",
          trolleybus: "🚎",
          trophy: "🏆",
          tropical_drink: "🍹",
          tropical_fish: "🐠",
          truck: "🚚",
          trumpet: "🎺",
          tulip: "🌷",
          tumbler_glass: "🥃",
          turkey: "🦃",
          turtle: "🐢",
          tv: "📺",
          twisted_rightwards_arrows: "🔀",
          two_hearts: "💕",
          two_men_holding_hands: "👬",
          two_women_holding_hands: "👭",
          u5272: "🈹",
          u5408: "🈴",
          u55b6: "🈺",
          u6307: "🈯️",
          u6708: "🈷️",
          u6709: "🈶",
          u6e80: "🈵",
          u7121: "🈚️",
          u7533: "🈸",
          u7981: "🈲",
          u7a7a: "🈳",
          umbrella: "☔️",
          unamused: "😒",
          underage: "🔞",
          unicorn: "🦄",
          unlock: "🔓",
          up: "🆙",
          upside_down_face: "🙃",
          v: "✌️",
          vertical_traffic_light: "🚦",
          vhs: "📼",
          vibration_mode: "📳",
          video_camera: "📹",
          video_game: "🎮",
          violin: "🎻",
          virgo: "♍️",
          volcano: "🌋",
          volleyball: "🏐",
          vs: "🆚",
          vulcan_salute: "🖖",
          walking_man: "🚶",
          walking_woman: "🚶&zwj;♀️",
          waning_crescent_moon: "🌘",
          waning_gibbous_moon: "🌖",
          warning: "⚠️",
          wastebasket: "🗑",
          watch: "⌚️",
          water_buffalo: "🐃",
          watermelon: "🍉",
          wave: "👋",
          wavy_dash: "〰️",
          waxing_crescent_moon: "🌒",
          wc: "🚾",
          weary: "😩",
          wedding: "💒",
          weight_lifting_man: "🏋️",
          weight_lifting_woman: "🏋️&zwj;♀️",
          whale: "🐳",
          whale2: "🐋",
          wheel_of_dharma: "☸️",
          wheelchair: "♿️",
          white_check_mark: "✅",
          white_circle: "⚪️",
          white_flag: "🏳️",
          white_flower: "💮",
          white_large_square: "⬜️",
          white_medium_small_square: "◽️",
          white_medium_square: "◻️",
          white_small_square: "▫️",
          white_square_button: "🔳",
          wilted_flower: "🥀",
          wind_chime: "🎐",
          wind_face: "🌬",
          wine_glass: "🍷",
          wink: "😉",
          wolf: "🐺",
          woman: "👩",
          woman_artist: "👩&zwj;🎨",
          woman_astronaut: "👩&zwj;🚀",
          woman_cartwheeling: "🤸&zwj;♀️",
          woman_cook: "👩&zwj;🍳",
          woman_facepalming: "🤦&zwj;♀️",
          woman_factory_worker: "👩&zwj;🏭",
          woman_farmer: "👩&zwj;🌾",
          woman_firefighter: "👩&zwj;🚒",
          woman_health_worker: "👩&zwj;⚕️",
          woman_judge: "👩&zwj;⚖️",
          woman_juggling: "🤹&zwj;♀️",
          woman_mechanic: "👩&zwj;🔧",
          woman_office_worker: "👩&zwj;💼",
          woman_pilot: "👩&zwj;✈️",
          woman_playing_handball: "🤾&zwj;♀️",
          woman_playing_water_polo: "🤽&zwj;♀️",
          woman_scientist: "👩&zwj;🔬",
          woman_shrugging: "🤷&zwj;♀️",
          woman_singer: "👩&zwj;🎤",
          woman_student: "👩&zwj;🎓",
          woman_teacher: "👩&zwj;🏫",
          woman_technologist: "👩&zwj;💻",
          woman_with_turban: "👳&zwj;♀️",
          womans_clothes: "👚",
          womans_hat: "👒",
          women_wrestling: "🤼&zwj;♀️",
          womens: "🚺",
          world_map: "🗺",
          worried: "😟",
          wrench: "🔧",
          writing_hand: "✍️",
          x: "❌",
          yellow_heart: "💛",
          yen: "💴",
          yin_yang: "☯️",
          yum: "😋",
          zap: "⚡️",
          zipper_mouth_face: "🤐",
          zzz: "💤",
          octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
          showdown: "<span style=\"font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;\">S</span>"
        }, i.Converter = function (e) {
          function t(e, t) {
            if (t = t || null, i.helper.isString(e)) {
              if (t = e = i.helper.stdExtName(e), i.extensions[e]) return void
              function (e, t) {
                "function" == typeof e && (e = e(new i.Converter)), i.helper.isArray(e) || (e = [e]);
                var a = r(e, t);
                if (!a.valid) throw Error(a.error);
                for (var n = 0; n < e.length; ++n) switch (e[n].type) {
                  case "lang":
                    d.push(e[n]);
                    break;
                  case "output":
                    h.push(e[n]);
                    break;
                  default:
                    throw Error("Extension loader error: Type unrecognized!!!")
                }
              }(i.extensions[e], e);
              if (i.helper.isUndefined(s[e])) throw Error('Extension "' + e + '" could not be loaded. It was either not found or is not a valid extension.');
              e = s[e]
            }
            "function" == typeof e && (e = e()), i.helper.isArray(e) || (e = [e]);
            var a = r(e, t);
            if (!a.valid) throw Error(a.error);
            for (var o = 0; o < e.length; ++o) {
              switch (e[o].type) {
                case "lang":
                  d.push(e[o]);
                  break;
                case "output":
                  h.push(e[o])
              }
              if (e[o].hasOwnProperty("listeners"))
                for (var l in e[o].listeners) e[o].listeners.hasOwnProperty(l) && n(l, e[o].listeners[l])
            }
          }

          function n(e, t) {
            if (!i.helper.isString(e)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + (void 0 === e ? "undefined" : a(e)) + " given");
            if ("function" != typeof t) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + (void 0 === t ? "undefined" : a(t)) + " given");
            f.hasOwnProperty(e) || (f[e] = []), f[e].push(t)
          }
          var o = {},
            d = [],
            h = [],
            f = {},
            p = c,
            g = {
              parsed: {},
              raw: "",
              format: ""
            };
          ! function () {
            for (var r in e = e || {}, l) l.hasOwnProperty(r) && (o[r] = l[r]);
            if ("object" != (void 0 === e ? "undefined" : a(e))) throw Error("Converter expects the passed parameter to be an object, but " + (void 0 === e ? "undefined" : a(e)) + " was passed instead.");
            for (var n in e) e.hasOwnProperty(n) && (o[n] = e[n]);
            o.extensions && i.helper.forEach(o.extensions, t)
          }(), this._dispatch = function (e, t, r, a) {
            if (f.hasOwnProperty(e))
              for (var n = 0; n < f[e].length; ++n) {
                var i = f[e][n](e, t, this, r, a);
                i && void 0 !== i && (t = i)
              }
            return t
          }, this.listen = function (e, t) {
            return n(e, t), this
          }, this.makeHtml = function (e) {
            if (!e) return e;
            var t = {
              gHtmlBlocks: [],
              gHtmlMdBlocks: [],
              gHtmlSpans: [],
              gUrls: {},
              gTitles: {},
              gDimensions: {},
              gListLevel: 0,
              hashLinkCounts: {},
              langExtensions: d,
              outputModifiers: h,
              converter: this,
              ghCodeBlocks: [],
              metadata: {
                parsed: {},
                raw: "",
                format: ""
              }
            };
            return e = (e = (e = (e = (e = e.replace(/¨/g, "¨T")).replace(/\$/g, "¨D")).replace(/\r\n/g, "\n")).replace(/\r/g, "\n")).replace(/\u00A0/g, "&nbsp;"), o.smartIndentationFix && (e = function (e) {
              var t = e.match(/^\s*/)[0].length,
                r = new RegExp("^\\s{0," + t + "}", "gm");
              return e.replace(r, "")
            }(e)), e = "\n\n" + e + "\n\n", e = (e = i.subParser("detab")(e, o, t)).replace(/^[ \t]+$/gm, ""), i.helper.forEach(d, function (r) {
              e = i.subParser("runExtension")(r, e, o, t)
            }), e = i.subParser("metadata")(e, o, t), e = i.subParser("hashPreCodeTags")(e, o, t), e = i.subParser("githubCodeBlocks")(e, o, t), e = i.subParser("hashHTMLBlocks")(e, o, t), e = i.subParser("hashCodeTags")(e, o, t), e = i.subParser("stripLinkDefinitions")(e, o, t), e = i.subParser("blockGamut")(e, o, t), e = i.subParser("unhashHTMLSpans")(e, o, t), e = (e = (e = i.subParser("unescapeSpecialChars")(e, o, t)).replace(/¨D/g, "$$")).replace(/¨T/g, "¨"), e = i.subParser("completeHTMLDocument")(e, o, t), i.helper.forEach(h, function (r) {
              e = i.subParser("runExtension")(r, e, o, t)
            }), g = t.metadata, e
          }, this.makeMarkdown = this.makeMd = function (e, t) {
            if (e = (e = (e = e.replace(/\r\n/g, "\n")).replace(/\r/g, "\n")).replace(/>[ \t]+</, ">¨NBSP;<"), !t) {
              if (!window || !window.document) throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
              t = window.document
            }
            var r = t.createElement("div");
            r.innerHTML = e;
            var a = {
              preList: function (e) {
                for (var t = e.querySelectorAll("pre"), r = [], a = 0; a < t.length; ++a)
                  if (1 === t[a].childElementCount && "code" === t[a].firstChild.tagName.toLowerCase()) {
                    var n = t[a].firstChild.innerHTML.trim(),
                      o = t[a].firstChild.getAttribute("data-language") || "";
                    if ("" === o)
                      for (var s = t[a].firstChild.className.split(" "), l = 0; l < s.length; ++l) {
                        var c = s[l].match(/^language-(.+)$/);
                        if (null !== c) {
                          o = c[1];
                          break
                        }
                      }
                    n = i.helper.unescapeHTMLEntities(n), r.push(n), t[a].outerHTML = '<precode language="' + o + '" precodenum="' + a.toString() + '"></precode>'
                  } else r.push(t[a].innerHTML), t[a].innerHTML = "", t[a].setAttribute("prenum", a.toString());
                return r
              }(r)
            };
            ! function e(t) {
              for (var r = 0; r < t.childNodes.length; ++r) {
                var a = t.childNodes[r];
                3 === a.nodeType ? /\S/.test(a.nodeValue) ? (a.nodeValue = a.nodeValue.split("\n").join(" "), a.nodeValue = a.nodeValue.replace(/(\s)+/g, "$1")) : (t.removeChild(a), --r) : 1 === a.nodeType && e(a)
              }
            }(r);
            for (var n = r.childNodes, o = "", s = 0; s < n.length; s++) o += i.subParser("makeMarkdown.node")(n[s], a);
            return o
          }, this.setOption = function (e, t) {
            o[e] = t
          }, this.getOption = function (e) {
            return o[e]
          }, this.getOptions = function () {
            return o
          }, this.addExtension = function (e, r) {
            t(e, r = r || null)
          }, this.useExtension = function (e) {
            t(e)
          }, this.setFlavor = function (e) {
            if (!u.hasOwnProperty(e)) throw Error(e + " flavor was not found");
            var t = u[e];
            for (var r in p = e, t) t.hasOwnProperty(r) && (o[r] = t[r])
          }, this.getFlavor = function () {
            return p
          }, this.removeExtension = function (e) {
            i.helper.isArray(e) || (e = [e]);
            for (var t = 0; t < e.length; ++t) {
              for (var r = e[t], a = 0; a < d.length; ++a) d[a] === r && d[a].splice(a, 1);
              for (; 0 < h.length; ++a) h[0] === r && h[0].splice(a, 1)
            }
          }, this.getAllExtensions = function () {
            return {
              language: d,
              output: h
            }
          }, this.getMetadata = function (e) {
            return e ? g.raw : g.parsed
          }, this.getMetadataFormat = function () {
            return g.format
          }, this._setMetadataPair = function (e, t) {
            g.parsed[e] = t
          }, this._setMetadataFormat = function (e) {
            g.format = e
          }, this._setMetadataRaw = function (e) {
            g.raw = e
          }
        }, i.subParser("anchors", function (e, t, r) {
          var a = function (e, a, n, o, s, l, c) {
            if (i.helper.isUndefined(c) && (c = ""), n = n.toLowerCase(), e.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) o = "";
            else if (!o) {
              if (n || (n = a.toLowerCase().replace(/ ?\n/g, " ")), o = "#" + n, i.helper.isUndefined(r.gUrls[n])) return e;
              o = r.gUrls[n], i.helper.isUndefined(r.gTitles[n]) || (c = r.gTitles[n])
            }
            var u = '<a href="' + (o = o.replace(i.helper.regexes.asteriskDashAndColon, i.helper.escapeCharactersCallback)) + '"';
            return "" !== c && null !== c && (u += ' title="' + (c = (c = c.replace(/"/g, "&quot;")).replace(i.helper.regexes.asteriskDashAndColon, i.helper.escapeCharactersCallback)) + '"'), t.openLinksInNewWindow && !/^#/.test(o) && (u += ' target="¨E95Eblank"'), u + ">" + a + "</a>"
          };
          return e = (e = (e = (e = (e = r.converter._dispatch("anchors.before", e, t, r)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, a)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a)).replace(/\[([^\[\]]+)]()()()()()/g, a), t.ghMentions && (e = e.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gim, function (e, r, a, n, o) {
            if ("\\" === a) return r + n;
            if (!i.helper.isString(t.ghMentionsLink)) throw new Error("ghMentionsLink option must be a string");
            var s = t.ghMentionsLink.replace(/\{u}/g, o),
              l = "";
            return t.openLinksInNewWindow && (l = ' target="¨E95Eblank"'), r + '<a href="' + s + '"' + l + ">" + n + "</a>"
          })), r.converter._dispatch("anchors.after", e, t, r)
        });
        var h = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
          f = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
          p = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
          g = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gim,
          m = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
          _ = function (e) {
            return function (t, r, a, n, o, s, l) {
              var c = a = a.replace(i.helper.regexes.asteriskDashAndColon, i.helper.escapeCharactersCallback),
                u = "",
                d = "",
                h = r || "",
                f = l || "";
              return /^www\./i.test(a) && (a = a.replace(/^www\./i, "http://www.")), e.excludeTrailingPunctuationFromURLs && s && (u = s), e.openLinksInNewWindow && (d = ' target="¨E95Eblank"'), h + '<a href="' + a + '"' + d + ">" + c + "</a>" + u + f
            }
          },
          b = function (e, t) {
            return function (r, a, n) {
              var o = "mailto:";
              return a = a || "", n = i.subParser("unescapeSpecialChars")(n, e, t), e.encodeEmails ? (o = i.helper.encodeEmailAddress(o + n), n = i.helper.encodeEmailAddress(n)) : o += n, a + '<a href="' + o + '">' + n + "</a>"
            }
          };
        i.subParser("autoLinks", function (e, t, r) {
          return e = (e = (e = r.converter._dispatch("autoLinks.before", e, t, r)).replace(p, _(t))).replace(m, b(t, r)), r.converter._dispatch("autoLinks.after", e, t, r)
        }), i.subParser("simplifiedAutoLinks", function (e, t, r) {
          return t.simplifiedAutoLink ? (e = r.converter._dispatch("simplifiedAutoLinks.before", e, t, r), e = (e = t.excludeTrailingPunctuationFromURLs ? e.replace(f, _(t)) : e.replace(h, _(t))).replace(g, b(t, r)), e = r.converter._dispatch("simplifiedAutoLinks.after", e, t, r)) : e
        }), i.subParser("blockGamut", function (e, t, r) {
          return e = r.converter._dispatch("blockGamut.before", e, t, r), e = i.subParser("blockQuotes")(e, t, r), e = i.subParser("headers")(e, t, r), e = i.subParser("horizontalRule")(e, t, r), e = i.subParser("lists")(e, t, r), e = i.subParser("codeBlocks")(e, t, r), e = i.subParser("tables")(e, t, r), e = i.subParser("hashHTMLBlocks")(e, t, r), e = i.subParser("paragraphs")(e, t, r), r.converter._dispatch("blockGamut.after", e, t, r)
        }), i.subParser("blockQuotes", function (e, t, r) {
          e = r.converter._dispatch("blockQuotes.before", e, t, r), e += "\n\n";
          var a = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
          return t.splitAdjacentBlockquotes && (a = /^ {0,3}>[\s\S]*?(?:\n\n)/gm), e = e.replace(a, function (e) {
            return e = (e = (e = e.replace(/^[ \t]*>[ \t]?/gm, "")).replace(/¨0/g, "")).replace(/^[ \t]+$/gm, ""), e = i.subParser("githubCodeBlocks")(e, t, r), e = (e = (e = i.subParser("blockGamut")(e, t, r)).replace(/(^|\n)/g, "$1  ")).replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (e, t) {
              var r = t;
              return (r = r.replace(/^  /gm, "¨0")).replace(/¨0/g, "")
            }), i.subParser("hashBlock")("<blockquote>\n" + e + "\n</blockquote>", t, r)
          }), r.converter._dispatch("blockQuotes.after", e, t, r)
        }), i.subParser("codeBlocks", function (e, t, r) {
          return e = r.converter._dispatch("codeBlocks.before", e, t, r), e = (e = (e += "¨0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g, function (e, a, n) {
            var o = a,
              s = n,
              l = "\n";
            return o = i.subParser("outdent")(o, t, r), o = i.subParser("encodeCode")(o, t, r), o = (o = (o = i.subParser("detab")(o, t, r)).replace(/^\n+/g, "")).replace(/\n+$/g, ""), t.omitExtraWLInCodeBlocks && (l = ""), o = "<pre><code>" + o + l + "</code></pre>", i.subParser("hashBlock")(o, t, r) + s
          })).replace(/¨0/, ""), r.converter._dispatch("codeBlocks.after", e, t, r)
        }), i.subParser("codeSpans", function (e, t, r) {
          return void 0 === (e = r.converter._dispatch("codeSpans.before", e, t, r)) && (e = ""), e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (e, a, n, o) {
            var s = o;
            return s = (s = s.replace(/^([ \t]*)/g, "")).replace(/[ \t]*$/g, ""), s = a + "<code>" + (s = i.subParser("encodeCode")(s, t, r)) + "</code>", i.subParser("hashHTMLSpans")(s, t, r)
          }), r.converter._dispatch("codeSpans.after", e, t, r)
        }), i.subParser("completeHTMLDocument", function (e, t, r) {
          if (!t.completeHTMLDocument) return e;
          e = r.converter._dispatch("completeHTMLDocument.before", e, t, r);
          var a = "html",
            n = "<!DOCTYPE HTML>\n",
            i = "",
            o = '<meta charset="utf-8">\n',
            s = "",
            l = "";
          for (var c in void 0 !== r.metadata.parsed.doctype && (n = "<!DOCTYPE " + r.metadata.parsed.doctype + ">\n", "html" !== (a = r.metadata.parsed.doctype.toString().toLowerCase()) && "html5" !== a || (o = '<meta charset="utf-8">')), r.metadata.parsed)
            if (r.metadata.parsed.hasOwnProperty(c)) switch (c.toLowerCase()) {
              case "doctype":
                break;
              case "title":
                i = "<title>" + r.metadata.parsed.title + "</title>\n";
                break;
              case "charset":
                o = "html" === a || "html5" === a ? '<meta charset="' + r.metadata.parsed.charset + '">\n' : '<meta name="charset" content="' + r.metadata.parsed.charset + '">\n';
                break;
              case "language":
              case "lang":
                s = ' lang="' + r.metadata.parsed[c] + '"', l += '<meta name="' + c + '" content="' + r.metadata.parsed[c] + '">\n';
                break;
              default:
                l += '<meta name="' + c + '" content="' + r.metadata.parsed[c] + '">\n'
            }
          return e = n + "<html" + s + ">\n<head>\n" + i + o + l + "</head>\n<body>\n" + e.trim() + "\n</body>\n</html>", r.converter._dispatch("completeHTMLDocument.after", e, t, r)
        }), i.subParser("detab", function (e, t, r) {
          return e = (e = (e = (e = (e = (e = r.converter._dispatch("detab.before", e, t, r)).replace(/\t(?=\t)/g, "    ")).replace(/\t/g, "¨A¨B")).replace(/¨B(.+?)¨A/g, function (e, t) {
            for (var r = t, a = 4 - r.length % 4, n = 0; n < a; n++) r += " ";
            return r
          })).replace(/¨A/g, "    ")).replace(/¨B/g, ""), r.converter._dispatch("detab.after", e, t, r)
        }), i.subParser("ellipsis", function (e, t, r) {
          return e = (e = r.converter._dispatch("ellipsis.before", e, t, r)).replace(/\.\.\./g, "…"), r.converter._dispatch("ellipsis.after", e, t, r)
        }), i.subParser("emoji", function (e, t, r) {
          return t.emoji ? (e = (e = r.converter._dispatch("emoji.before", e, t, r)).replace(/:([\S]+?):/g, function (e, t) {
            return i.helper.emojis.hasOwnProperty(t) ? i.helper.emojis[t] : e
          }), r.converter._dispatch("emoji.after", e, t, r)) : e
        }), i.subParser("encodeAmpsAndAngles", function (e, t, r) {
          return e = (e = (e = (e = (e = r.converter._dispatch("encodeAmpsAndAngles.before", e, t, r)).replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;")).replace(/<(?![a-z\/?$!])/gi, "&lt;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;"), r.converter._dispatch("encodeAmpsAndAngles.after", e, t, r)
        }), i.subParser("encodeBackslashEscapes", function (e, t, r) {
          return e = (e = (e = r.converter._dispatch("encodeBackslashEscapes.before", e, t, r)).replace(/\\(\\)/g, i.helper.escapeCharactersCallback)).replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, i.helper.escapeCharactersCallback), r.converter._dispatch("encodeBackslashEscapes.after", e, t, r)
        }), i.subParser("encodeCode", function (e, t, r) {
          return e = (e = r.converter._dispatch("encodeCode.before", e, t, r)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, i.helper.escapeCharactersCallback), r.converter._dispatch("encodeCode.after", e, t, r)
        }), i.subParser("escapeSpecialCharsWithinTagAttributes", function (e, t, r) {
          return e = (e = (e = r.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", e, t, r)).replace(/<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, function (e) {
            return e.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, i.helper.escapeCharactersCallback)
          })).replace(/<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi, function (e) {
            return e.replace(/([\\`*_~=|])/g, i.helper.escapeCharactersCallback)
          }), r.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", e, t, r)
        }), i.subParser("githubCodeBlocks", function (e, t, r) {
          return t.ghCodeBlocks ? (e = r.converter._dispatch("githubCodeBlocks.before", e, t, r), e = (e = (e += "¨0").replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function (e, a, n, o) {
            var s = t.omitExtraWLInCodeBlocks ? "" : "\n";
            return o = i.subParser("encodeCode")(o, t, r), o = (o = (o = i.subParser("detab")(o, t, r)).replace(/^\n+/g, "")).replace(/\n+$/g, ""), o = "<pre><code" + (n ? ' class="' + n + " language-" + n + '"' : "") + ">" + o + s + "</code></pre>", o = i.subParser("hashBlock")(o, t, r), "\n\n¨G" + (r.ghCodeBlocks.push({
              text: e,
              codeblock: o
            }) - 1) + "G\n\n"
          })).replace(/¨0/, ""), r.converter._dispatch("githubCodeBlocks.after", e, t, r)) : e
        }), i.subParser("hashBlock", function (e, t, r) {
          return e = (e = r.converter._dispatch("hashBlock.before", e, t, r)).replace(/(^\n+|\n+$)/g, ""), e = "\n\n¨K" + (r.gHtmlBlocks.push(e) - 1) + "K\n\n", r.converter._dispatch("hashBlock.after", e, t, r)
        }), i.subParser("hashCodeTags", function (e, t, r) {
          return e = r.converter._dispatch("hashCodeTags.before", e, t, r), e = i.helper.replaceRecursiveRegExp(e, function (e, a, n, o) {
            var s = n + i.subParser("encodeCode")(a, t, r) + o;
            return "¨C" + (r.gHtmlSpans.push(s) - 1) + "C"
          }, "<code\\b[^>]*>", "</code>", "gim"), r.converter._dispatch("hashCodeTags.after", e, t, r)
        }), i.subParser("hashElement", function (e, t, r) {
          return function (e, t) {
            var a = t;
            return a = (a = (a = a.replace(/\n\n/g, "\n")).replace(/^\n/, "")).replace(/\n+$/g, ""), "\n\n¨K" + (r.gHtmlBlocks.push(a) - 1) + "K\n\n"
          }
        }), i.subParser("hashHTMLBlocks", function (e, t, r) {
          e = r.converter._dispatch("hashHTMLBlocks.before", e, t, r);
          var a = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"],
            n = function (e, t, a, n) {
              var i = e;
              return -1 !== a.search(/\bmarkdown\b/) && (i = a + r.converter.makeHtml(t) + n), "\n\n¨K" + (r.gHtmlBlocks.push(i) - 1) + "K\n\n"
            };
          t.backslashEscapesHTMLTags && (e = e.replace(/\\<(\/?[^>]+?)>/g, function (e, t) {
            return "&lt;" + t + "&gt;"
          }));
          for (var o = 0; o < a.length; ++o)
            for (var s, l = new RegExp("^ {0,3}(<" + a[o] + "\\b[^>]*>)", "im"), c = "<" + a[o] + "\\b[^>]*>", u = "</" + a[o] + ">"; - 1 !== (s = i.helper.regexIndexOf(e, l));) {
              var d = i.helper.splitAtIndex(e, s),
                h = i.helper.replaceRecursiveRegExp(d[1], n, c, u, "im");
              if (h === d[1]) break;
              e = d[0].concat(h)
            }
          return e = e.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, i.subParser("hashElement")(e, t, r)), e = (e = i.helper.replaceRecursiveRegExp(e, function (e) {
            return "\n\n¨K" + (r.gHtmlBlocks.push(e) - 1) + "K\n\n"
          }, "^ {0,3}\x3c!--", "--\x3e", "gm")).replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, i.subParser("hashElement")(e, t, r)), r.converter._dispatch("hashHTMLBlocks.after", e, t, r)
        }), i.subParser("hashHTMLSpans", function (e, t, r) {
          function a(e) {
            return "¨C" + (r.gHtmlSpans.push(e) - 1) + "C"
          }
          return e = (e = (e = (e = (e = r.converter._dispatch("hashHTMLSpans.before", e, t, r)).replace(/<[^>]+?\/>/gi, function (e) {
            return a(e)
          })).replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (e) {
            return a(e)
          })).replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (e) {
            return a(e)
          })).replace(/<[^>]+?>/gi, function (e) {
            return a(e)
          }), r.converter._dispatch("hashHTMLSpans.after", e, t, r)
        }), i.subParser("unhashHTMLSpans", function (e, t, r) {
          e = r.converter._dispatch("unhashHTMLSpans.before", e, t, r);
          for (var a = 0; a < r.gHtmlSpans.length; ++a) {
            for (var n = r.gHtmlSpans[a], i = 0;
              /¨C(\d+)C/.test(n);) {
              var o = RegExp.$1;
              if (n = n.replace("¨C" + o + "C", r.gHtmlSpans[o]), 10 === i) break;
              ++i
            }
            e = e.replace("¨C" + a + "C", n)
          }
          return r.converter._dispatch("unhashHTMLSpans.after", e, t, r)
        }), i.subParser("hashPreCodeTags", function (e, t, r) {
          return e = r.converter._dispatch("hashPreCodeTags.before", e, t, r), e = i.helper.replaceRecursiveRegExp(e, function (e, a, n, o) {
            var s = n + i.subParser("encodeCode")(a, t, r) + o;
            return "\n\n¨G" + (r.ghCodeBlocks.push({
              text: e,
              codeblock: s
            }) - 1) + "G\n\n"
          }, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim"), r.converter._dispatch("hashPreCodeTags.after", e, t, r)
        }), i.subParser("headers", function (e, t, r) {
          function a(e) {
            var a, n;
            if (t.customizedHeaderId) {
              var o = e.match(/\{([^{]+?)}\s*$/);
              o && o[1] && (e = o[1])
            }
            return a = e, n = i.helper.isString(t.prefixHeaderId) ? t.prefixHeaderId : !0 === t.prefixHeaderId ? "section-" : "", t.rawPrefixHeaderId || (a = n + a), a = t.ghCompatibleHeaderId ? a.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase() : t.rawHeaderId ? a.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "¨").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase() : a.replace(/[^\w]/g, "").toLowerCase(), t.rawPrefixHeaderId && (a = n + a), r.hashLinkCounts[a] ? a = a + "-" + r.hashLinkCounts[a]++ : r.hashLinkCounts[a] = 1, a
          }
          e = r.converter._dispatch("headers.before", e, t, r);
          var n = isNaN(parseInt(t.headerLevelStart)) ? 1 : parseInt(t.headerLevelStart),
            o = t.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
            s = t.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
          e = (e = e.replace(o, function (e, o) {
            var s = i.subParser("spanGamut")(o, t, r),
              l = t.noHeaderId ? "" : ' id="' + a(o) + '"',
              c = "<h" + n + l + ">" + s + "</h" + n + ">";
            return i.subParser("hashBlock")(c, t, r)
          })).replace(s, function (e, o) {
            var s = i.subParser("spanGamut")(o, t, r),
              l = t.noHeaderId ? "" : ' id="' + a(o) + '"',
              c = n + 1,
              u = "<h" + c + l + ">" + s + "</h" + c + ">";
            return i.subParser("hashBlock")(u, t, r)
          });
          var l = t.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
          return e = e.replace(l, function (e, o, s) {
            var l = s;
            t.customizedHeaderId && (l = s.replace(/\s?\{([^{]+?)}\s*$/, ""));
            var c = i.subParser("spanGamut")(l, t, r),
              u = t.noHeaderId ? "" : ' id="' + a(s) + '"',
              d = n - 1 + o.length,
              h = "<h" + d + u + ">" + c + "</h" + d + ">";
            return i.subParser("hashBlock")(h, t, r)
          }), r.converter._dispatch("headers.after", e, t, r)
        }), i.subParser("horizontalRule", function (e, t, r) {
          e = r.converter._dispatch("horizontalRule.before", e, t, r);
          var a = i.subParser("hashBlock")("<hr />", t, r);
          return e = (e = (e = e.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, a)).replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, a)).replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, a), r.converter._dispatch("horizontalRule.after", e, t, r)
        }), i.subParser("images", function (e, t, r) {
          function a(e, t, a, n, o, s, l, c) {
            var u = r.gUrls,
              d = r.gTitles,
              h = r.gDimensions;
            if (a = a.toLowerCase(), c || (c = ""), e.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) n = "";
            else if ("" === n || null === n) {
              if ("" !== a && null !== a || (a = t.toLowerCase().replace(/ ?\n/g, " ")), n = "#" + a, i.helper.isUndefined(u[a])) return e;
              n = u[a], i.helper.isUndefined(d[a]) || (c = d[a]), i.helper.isUndefined(h[a]) || (o = h[a].width, s = h[a].height)
            }
            t = t.replace(/"/g, "&quot;").replace(i.helper.regexes.asteriskDashAndColon, i.helper.escapeCharactersCallback);
            var f = '<img src="' + (n = n.replace(i.helper.regexes.asteriskDashAndColon, i.helper.escapeCharactersCallback)) + '" alt="' + t + '"';
            return c && i.helper.isString(c) && (f += ' title="' + (c = c.replace(/"/g, "&quot;").replace(i.helper.regexes.asteriskDashAndColon, i.helper.escapeCharactersCallback)) + '"'), o && s && (f += ' width="' + (o = "*" === o ? "auto" : o) + '"', f += ' height="' + (s = "*" === s ? "auto" : s) + '"'), f + " />"
          }
          return e = (e = (e = (e = (e = (e = r.converter._dispatch("images.before", e, t, r)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, a)).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, function (e, t, r, n, i, o, s, l) {
            return a(e, t, r, n = n.replace(/\s/g, ""), i, o, 0, l)
          })).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, a)).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, a)).replace(/!\[([^\[\]]+)]()()()()()/g, a), r.converter._dispatch("images.after", e, t, r)
        }), i.subParser("italicsAndBold", function (e, t, r) {
          function a(e, t, r) {
            return t + e + r
          }
          return e = r.converter._dispatch("italicsAndBold.before", e, t, r), e = t.literalMidWordUnderscores ? (e = (e = e.replace(/\b___(\S[\s\S]*?)___\b/g, function (e, t) {
            return a(t, "<strong><em>", "</em></strong>")
          })).replace(/\b__(\S[\s\S]*?)__\b/g, function (e, t) {
            return a(t, "<strong>", "</strong>")
          })).replace(/\b_(\S[\s\S]*?)_\b/g, function (e, t) {
            return a(t, "<em>", "</em>")
          }) : (e = (e = e.replace(/___(\S[\s\S]*?)___/g, function (e, t) {
            return /\S$/.test(t) ? a(t, "<strong><em>", "</em></strong>") : e
          })).replace(/__(\S[\s\S]*?)__/g, function (e, t) {
            return /\S$/.test(t) ? a(t, "<strong>", "</strong>") : e
          })).replace(/_([^\s_][\s\S]*?)_/g, function (e, t) {
            return /\S$/.test(t) ? a(t, "<em>", "</em>") : e
          }), e = t.literalMidWordAsterisks ? (e = (e = e.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function (e, t, r) {
            return a(r, t + "<strong><em>", "</em></strong>")
          })).replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function (e, t, r) {
            return a(r, t + "<strong>", "</strong>")
          })).replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function (e, t, r) {
            return a(r, t + "<em>", "</em>")
          }) : (e = (e = e.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (e, t) {
            return /\S$/.test(t) ? a(t, "<strong><em>", "</em></strong>") : e
          })).replace(/\*\*(\S[\s\S]*?)\*\*/g, function (e, t) {
            return /\S$/.test(t) ? a(t, "<strong>", "</strong>") : e
          })).replace(/\*([^\s*][\s\S]*?)\*/g, function (e, t) {
            return /\S$/.test(t) ? a(t, "<em>", "</em>") : e
          }), r.converter._dispatch("italicsAndBold.after", e, t, r)
        }), i.subParser("lists", function (e, t, r) {
          function a(e, a) {
            r.gListLevel++, e = e.replace(/\n{2,}$/, "\n");
            var n = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
              o = /\n[ \t]*\n(?!¨0)/.test(e += "¨0");
            return t.disableForced4SpacesIndentedSublists && (n = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm), e = (e = e.replace(n, function (e, a, n, s, l, c, u) {
              u = u && "" !== u.trim();
              var d = i.subParser("outdent")(l, t, r),
                h = "";
              return c && t.tasklists && (h = ' class="task-list-item" style="list-style-type: none;"', d = d.replace(/^[ \t]*\[(x|X| )?]/m, function () {
                var e = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                return u && (e += " checked"), e + ">"
              })), d = d.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (e) {
                return "¨A" + e
              }), a || d.search(/\n{2,}/) > -1 ? (d = i.subParser("githubCodeBlocks")(d, t, r), d = i.subParser("blockGamut")(d, t, r)) : (d = (d = i.subParser("lists")(d, t, r)).replace(/\n$/, ""), d = (d = i.subParser("hashHTMLBlocks")(d, t, r)).replace(/\n\n+/g, "\n\n"), d = o ? i.subParser("paragraphs")(d, t, r) : i.subParser("spanGamut")(d, t, r)), "<li" + h + ">" + (d = d.replace("¨A", "")) + "</li>\n"
            })).replace(/¨0/g, ""), r.gListLevel--, a && (e = e.replace(/\s+$/, "")), e
          }

          function n(e, t) {
            if ("ol" === t) {
              var r = e.match(/^ *(\d+)\./);
              if (r && "1" !== r[1]) return ' start="' + r[1] + '"'
            }
            return ""
          }

          function o(e, r, i) {
            var o = t.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
              s = t.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
              l = "ul" === r ? o : s,
              c = "";
            if (-1 !== e.search(l)) ! function t(u) {
              var d = u.search(l),
                h = n(e, r); - 1 !== d ? (c += "\n\n<" + r + h + ">\n" + a(u.slice(0, d), !!i) + "</" + r + ">\n", l = "ul" == (r = "ul" === r ? "ol" : "ul") ? o : s, t(u.slice(d))) : c += "\n\n<" + r + h + ">\n" + a(u, !!i) + "</" + r + ">\n"
            }(e);
            else {
              var u = n(e, r);
              c = "\n\n<" + r + u + ">\n" + a(e, !!i) + "</" + r + ">\n"
            }
            return c
          }
          return e = r.converter._dispatch("lists.before", e, t, r), e += "¨0", e = (e = r.gListLevel ? e.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function (e, t, r) {
            return o(t, r.search(/[*+-]/g) > -1 ? "ul" : "ol", !0)
          }) : e.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function (e, t, r, a) {
            return o(r, a.search(/[*+-]/g) > -1 ? "ul" : "ol", !1)
          })).replace(/¨0/, ""), r.converter._dispatch("lists.after", e, t, r)
        }), i.subParser("metadata", function (e, t, r) {
          function a(e) {
            r.metadata.raw = e, (e = (e = e.replace(/&/g, "&amp;").replace(/"/g, "&quot;")).replace(/\n {4}/g, " ")).replace(/^([\S ]+): +([\s\S]+?)$/gm, function (e, t, a) {
              return r.metadata.parsed[t] = a, ""
            })
          }
          return t.metadata ? (e = (e = (e = (e = r.converter._dispatch("metadata.before", e, t, r)).replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (e, t, r) {
            return a(r), "¨M"
          })).replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (e, t, n) {
            return t && (r.metadata.format = t), a(n), "¨M"
          })).replace(/¨M/g, ""), e = r.converter._dispatch("metadata.after", e, t, r)) : e
        }), i.subParser("outdent", function (e, t, r) {
          return e = (e = (e = r.converter._dispatch("outdent.before", e, t, r)).replace(/^(\t|[ ]{1,4})/gm, "¨0")).replace(/¨0/g, ""), r.converter._dispatch("outdent.after", e, t, r)
        }), i.subParser("paragraphs", function (e, t, r) {
          for (var a = (e = (e = (e = r.converter._dispatch("paragraphs.before", e, t, r)).replace(/^\n+/g, "")).replace(/\n+$/g, "")).split(/\n{2,}/g), n = [], o = a.length, s = 0; s < o; s++) {
            var l = a[s];
            l.search(/¨(K|G)(\d+)\1/g) >= 0 ? n.push(l) : l.search(/\S/) >= 0 && (l = (l = i.subParser("spanGamut")(l, t, r)).replace(/^([ \t]*)/g, "<p>"), l += "</p>", n.push(l))
          }
          for (o = n.length, s = 0; s < o; s++) {
            for (var c = "", u = n[s], d = !1;
              /¨(K|G)(\d+)\1/.test(u);) {
              var h = RegExp.$1,
                f = RegExp.$2;
              c = (c = "K" === h ? r.gHtmlBlocks[f] : d ? i.subParser("encodeCode")(r.ghCodeBlocks[f].text, t, r) : r.ghCodeBlocks[f].codeblock).replace(/\$/g, "$$$$"), u = u.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, c), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(u) && (d = !0)
            }
            n[s] = u
          }
          return e = (e = (e = n.join("\n")).replace(/^\n+/g, "")).replace(/\n+$/g, ""), r.converter._dispatch("paragraphs.after", e, t, r)
        }), i.subParser("runExtension", function (e, t, r, a) {
          if (e.filter) t = e.filter(t, a.converter, r);
          else if (e.regex) {
            var n = e.regex;
            n instanceof RegExp || (n = new RegExp(n, "g")), t = t.replace(n, e.replace)
          }
          return t
        }), i.subParser("spanGamut", function (e, t, r) {
          return e = r.converter._dispatch("spanGamut.before", e, t, r), e = i.subParser("codeSpans")(e, t, r), e = i.subParser("escapeSpecialCharsWithinTagAttributes")(e, t, r), e = i.subParser("encodeBackslashEscapes")(e, t, r), e = i.subParser("images")(e, t, r), e = i.subParser("anchors")(e, t, r), e = i.subParser("autoLinks")(e, t, r), e = i.subParser("simplifiedAutoLinks")(e, t, r), e = i.subParser("emoji")(e, t, r), e = i.subParser("underline")(e, t, r), e = i.subParser("italicsAndBold")(e, t, r), e = i.subParser("strikethrough")(e, t, r), e = i.subParser("ellipsis")(e, t, r), e = i.subParser("hashHTMLSpans")(e, t, r), e = i.subParser("encodeAmpsAndAngles")(e, t, r), t.simpleLineBreaks ? /\n\n¨K/.test(e) || (e = e.replace(/\n+/g, "<br />\n")) : e = e.replace(/  +\n/g, "<br />\n"), r.converter._dispatch("spanGamut.after", e, t, r)
        }), i.subParser("strikethrough", function (e, t, r) {
          return t.strikethrough && (e = (e = r.converter._dispatch("strikethrough.before", e, t, r)).replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (e, a) {
            return function (e) {
              return t.simplifiedAutoLink && (e = i.subParser("simplifiedAutoLinks")(e, t, r)), "<del>" + e + "</del>"
            }(a)
          }), e = r.converter._dispatch("strikethrough.after", e, t, r)), e
        }), i.subParser("stripLinkDefinitions", function (e, t, r) {
          var a = function (e, a, n, o, s, l, c) {
            return a = a.toLowerCase(), n.match(/^data:.+?\/.+?;base64,/) ? r.gUrls[a] = n.replace(/\s/g, "") : r.gUrls[a] = i.subParser("encodeAmpsAndAngles")(n, t, r), l ? l + c : (c && (r.gTitles[a] = c.replace(/"|'/g, "&quot;")), t.parseImgDimensions && o && s && (r.gDimensions[a] = {
              width: o,
              height: s
            }), "")
          };
          return (e = (e = (e += "¨0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm, a)).replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, a)).replace(/¨0/, "")
        }), i.subParser("tables", function (e, t, r) {
          function a(e) {
            return /^:[ \t]*--*$/.test(e) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(e) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(e) ? ' style="text-align:center;"' : ""
          }

          function n(e, a) {
            var n = "";
            return e = e.trim(), (t.tablesHeaderId || t.tableHeaderId) && (n = ' id="' + e.replace(/ /g, "_").toLowerCase() + '"'), "<th" + n + a + ">" + (e = i.subParser("spanGamut")(e, t, r)) + "</th>\n"
          }

          function o(e, a) {
            return "<td" + a + ">" + i.subParser("spanGamut")(e, t, r) + "</td>\n"
          }

          function s(e) {
            var s, l = e.split("\n");
            for (s = 0; s < l.length; ++s) /^ {0,3}\|/.test(l[s]) && (l[s] = l[s].replace(/^ {0,3}\|/, "")), /\|[ \t]*$/.test(l[s]) && (l[s] = l[s].replace(/\|[ \t]*$/, "")), l[s] = i.subParser("codeSpans")(l[s], t, r);
            var c = l[0].split("|").map(function (e) {
                return e.trim()
              }),
              u = l[1].split("|").map(function (e) {
                return e.trim()
              }),
              d = [],
              h = [],
              f = [],
              p = [];
            for (l.shift(), l.shift(), s = 0; s < l.length; ++s) "" !== l[s].trim() && d.push(l[s].split("|").map(function (e) {
              return e.trim()
            }));
            if (c.length < u.length) return e;
            for (s = 0; s < u.length; ++s) f.push(a(u[s]));
            for (s = 0; s < c.length; ++s) i.helper.isUndefined(f[s]) && (f[s] = ""), h.push(n(c[s], f[s]));
            for (s = 0; s < d.length; ++s) {
              for (var g = [], m = 0; m < h.length; ++m) i.helper.isUndefined(d[s][m]), g.push(o(d[s][m], f[m]));
              p.push(g)
            }
            return function (e, t) {
              for (var r = "<table>\n<thead>\n<tr>\n", a = e.length, n = 0; n < a; ++n) r += e[n];
              for (r += "</tr>\n</thead>\n<tbody>\n", n = 0; n < t.length; ++n) {
                r += "<tr>\n";
                for (var i = 0; i < a; ++i) r += t[n][i];
                r += "</tr>\n"
              }
              return r + "</tbody>\n</table>\n"
            }(h, p)
          }
          return t.tables ? (e = (e = (e = (e = r.converter._dispatch("tables.before", e, t, r)).replace(/\\(\|)/g, i.helper.escapeCharactersCallback)).replace(/^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, s)).replace(/^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm, s), r.converter._dispatch("tables.after", e, t, r)) : e
        }), i.subParser("underline", function (e, t, r) {
          return t.underline ? (e = r.converter._dispatch("underline.before", e, t, r), e = (e = t.literalMidWordUnderscores ? (e = e.replace(/\b___(\S[\s\S]*?)___\b/g, function (e, t) {
            return "<u>" + t + "</u>"
          })).replace(/\b__(\S[\s\S]*?)__\b/g, function (e, t) {
            return "<u>" + t + "</u>"
          }) : (e = e.replace(/___(\S[\s\S]*?)___/g, function (e, t) {
            return /\S$/.test(t) ? "<u>" + t + "</u>" : e
          })).replace(/__(\S[\s\S]*?)__/g, function (e, t) {
            return /\S$/.test(t) ? "<u>" + t + "</u>" : e
          })).replace(/(_)/g, i.helper.escapeCharactersCallback), e = r.converter._dispatch("underline.after", e, t, r)) : e
        }), i.subParser("unescapeSpecialChars", function (e, t, r) {
          return e = (e = r.converter._dispatch("unescapeSpecialChars.before", e, t, r)).replace(/¨E(\d+)E/g, function (e, t) {
            var r = parseInt(t);
            return String.fromCharCode(r)
          }), r.converter._dispatch("unescapeSpecialChars.after", e, t, r)
        }), i.subParser("makeMarkdown.blockquote", function (e, t) {
          var r = "";
          if (e.hasChildNodes())
            for (var a = e.childNodes, n = a.length, o = 0; o < n; ++o) {
              var s = i.subParser("makeMarkdown.node")(a[o], t);
              "" !== s && (r += s)
            }
          return "> " + (r = r.trim()).split("\n").join("\n> ")
        }), i.subParser("makeMarkdown.codeBlock", function (e, t) {
          var r = e.getAttribute("language"),
            a = e.getAttribute("precodenum");
          return "```" + r + "\n" + t.preList[a] + "\n```"
        }), i.subParser("makeMarkdown.codeSpan", function (e) {
          return "`" + e.innerHTML + "`"
        }), i.subParser("makeMarkdown.emphasis", function (e, t) {
          var r = "";
          if (e.hasChildNodes()) {
            r += "*";
            for (var a = e.childNodes, n = a.length, o = 0; o < n; ++o) r += i.subParser("makeMarkdown.node")(a[o], t);
            r += "*"
          }
          return r
        }), i.subParser("makeMarkdown.header", function (e, t, r) {
          var a = new Array(r + 1).join("#"),
            n = "";
          if (e.hasChildNodes()) {
            n = a + " ";
            for (var o = e.childNodes, s = o.length, l = 0; l < s; ++l) n += i.subParser("makeMarkdown.node")(o[l], t)
          }
          return n
        }), i.subParser("makeMarkdown.hr", function () {
          return "---"
        }), i.subParser("makeMarkdown.image", function (e) {
          var t = "";
          return e.hasAttribute("src") && (t += "![" + e.getAttribute("alt") + "](", t += "<" + e.getAttribute("src") + ">", e.hasAttribute("width") && e.hasAttribute("height") && (t += " =" + e.getAttribute("width") + "x" + e.getAttribute("height")), e.hasAttribute("title") && (t += ' "' + e.getAttribute("title") + '"'), t += ")"), t
        }), i.subParser("makeMarkdown.links", function (e, t) {
          var r = "";
          if (e.hasChildNodes() && e.hasAttribute("href")) {
            var a = e.childNodes,
              n = a.length;
            r = "[";
            for (var o = 0; o < n; ++o) r += i.subParser("makeMarkdown.node")(a[o], t);
            r += "](", r += "<" + e.getAttribute("href") + ">", e.hasAttribute("title") && (r += ' "' + e.getAttribute("title") + '"'), r += ")"
          }
          return r
        }), i.subParser("makeMarkdown.list", function (e, t, r) {
          var a = "";
          if (!e.hasChildNodes()) return "";
          for (var n = e.childNodes, o = n.length, s = e.getAttribute("start") || 1, l = 0; l < o; ++l) void 0 !== n[l].tagName && "li" === n[l].tagName.toLowerCase() && (a += ("ol" === r ? s.toString() + ". " : "- ") + i.subParser("makeMarkdown.listItem")(n[l], t), ++s);
          return (a += "\n\x3c!-- --\x3e\n").trim()
        }), i.subParser("makeMarkdown.listItem", function (e, t) {
          for (var r = "", a = e.childNodes, n = a.length, o = 0; o < n; ++o) r += i.subParser("makeMarkdown.node")(a[o], t);
          return /\n$/.test(r) ? r = r.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n") : r += "\n", r
        }), i.subParser("makeMarkdown.node", function (e, t, r) {
          r = r || !1;
          var a = "";
          if (3 === e.nodeType) return i.subParser("makeMarkdown.txt")(e, t);
          if (8 === e.nodeType) return "\x3c!--" + e.data + "--\x3e\n\n";
          if (1 !== e.nodeType) return "";
          switch (e.tagName.toLowerCase()) {
            case "h1":
              r || (a = i.subParser("makeMarkdown.header")(e, t, 1) + "\n\n");
              break;
            case "h2":
              r || (a = i.subParser("makeMarkdown.header")(e, t, 2) + "\n\n");
              break;
            case "h3":
              r || (a = i.subParser("makeMarkdown.header")(e, t, 3) + "\n\n");
              break;
            case "h4":
              r || (a = i.subParser("makeMarkdown.header")(e, t, 4) + "\n\n");
              break;
            case "h5":
              r || (a = i.subParser("makeMarkdown.header")(e, t, 5) + "\n\n");
              break;
            case "h6":
              r || (a = i.subParser("makeMarkdown.header")(e, t, 6) + "\n\n");
              break;
            case "p":
              r || (a = i.subParser("makeMarkdown.paragraph")(e, t) + "\n\n");
              break;
            case "blockquote":
              r || (a = i.subParser("makeMarkdown.blockquote")(e, t) + "\n\n");
              break;
            case "hr":
              r || (a = i.subParser("makeMarkdown.hr")(e, t) + "\n\n");
              break;
            case "ol":
              r || (a = i.subParser("makeMarkdown.list")(e, t, "ol") + "\n\n");
              break;
            case "ul":
              r || (a = i.subParser("makeMarkdown.list")(e, t, "ul") + "\n\n");
              break;
            case "precode":
              r || (a = i.subParser("makeMarkdown.codeBlock")(e, t) + "\n\n");
              break;
            case "pre":
              r || (a = i.subParser("makeMarkdown.pre")(e, t) + "\n\n");
              break;
            case "table":
              r || (a = i.subParser("makeMarkdown.table")(e, t) + "\n\n");
              break;
            case "code":
              a = i.subParser("makeMarkdown.codeSpan")(e, t);
              break;
            case "em":
            case "i":
              a = i.subParser("makeMarkdown.emphasis")(e, t);
              break;
            case "strong":
            case "b":
              a = i.subParser("makeMarkdown.strong")(e, t);
              break;
            case "del":
              a = i.subParser("makeMarkdown.strikethrough")(e, t);
              break;
            case "a":
              a = i.subParser("makeMarkdown.links")(e, t);
              break;
            case "img":
              a = i.subParser("makeMarkdown.image")(e, t);
              break;
            default:
              a = e.outerHTML + "\n\n"
          }
          return a
        }), i.subParser("makeMarkdown.paragraph", function (e, t) {
          var r = "";
          if (e.hasChildNodes())
            for (var a = e.childNodes, n = a.length, o = 0; o < n; ++o) r += i.subParser("makeMarkdown.node")(a[o], t);
          return r.trim()
        }), i.subParser("makeMarkdown.pre", function (e, t) {
          var r = e.getAttribute("prenum");
          return "<pre>" + t.preList[r] + "</pre>"
        }), i.subParser("makeMarkdown.strikethrough", function (e, t) {
          var r = "";
          if (e.hasChildNodes()) {
            r += "~~";
            for (var a = e.childNodes, n = a.length, o = 0; o < n; ++o) r += i.subParser("makeMarkdown.node")(a[o], t);
            r += "~~"
          }
          return r
        }), i.subParser("makeMarkdown.strong", function (e, t) {
          var r = "";
          if (e.hasChildNodes()) {
            r += "**";
            for (var a = e.childNodes, n = a.length, o = 0; o < n; ++o) r += i.subParser("makeMarkdown.node")(a[o], t);
            r += "**"
          }
          return r
        }), i.subParser("makeMarkdown.table", function (e, t) {
          var r, a, n = "",
            o = [
              [],
              []
            ],
            s = e.querySelectorAll("thead>tr>th"),
            l = e.querySelectorAll("tbody>tr");
          for (r = 0; r < s.length; ++r) {
            var c = i.subParser("makeMarkdown.tableCell")(s[r], t),
              u = "---";
            if (s[r].hasAttribute("style")) switch (s[r].getAttribute("style").toLowerCase().replace(/\s/g, "")) {
              case "text-align:left;":
                u = ":---";
                break;
              case "text-align:right;":
                u = "---:";
                break;
              case "text-align:center;":
                u = ":---:"
            }
            o[0][r] = c.trim(), o[1][r] = u
          }
          for (r = 0; r < l.length; ++r) {
            var d = o.push([]) - 1,
              h = l[r].getElementsByTagName("td");
            for (a = 0; a < s.length; ++a) {
              var f = " ";
              void 0 !== h[a] && (f = i.subParser("makeMarkdown.tableCell")(h[a], t)), o[d].push(f)
            }
          }
          var p = 3;
          for (r = 0; r < o.length; ++r)
            for (a = 0; a < o[r].length; ++a) {
              var g = o[r][a].length;
              g > p && (p = g)
            }
          for (r = 0; r < o.length; ++r) {
            for (a = 0; a < o[r].length; ++a) 1 === r ? ":" === o[r][a].slice(-1) ? o[r][a] = i.helper.padEnd(o[r][a].slice(-1), p - 1, "-") + ":" : o[r][a] = i.helper.padEnd(o[r][a], p, "-") : o[r][a] = i.helper.padEnd(o[r][a], p);
            n += "| " + o[r].join(" | ") + " |\n"
          }
          return n.trim()
        }), i.subParser("makeMarkdown.tableCell", function (e, t) {
          var r = "";
          if (!e.hasChildNodes()) return "";
          for (var a = e.childNodes, n = a.length, o = 0; o < n; ++o) r += i.subParser("makeMarkdown.node")(a[o], t, !0);
          return r.trim()
        }), i.subParser("makeMarkdown.txt", function (e) {
          var t = e.nodeValue;
          return t = (t = t.replace(/ +/g, " ")).replace(/¨NBSP;/g, " "), (t = (t = (t = (t = (t = (t = (t = (t = i.helper.unescapeHTMLEntities(t)).replace(/([*_~|`])/g, "\\$1")).replace(/^(\s*)>/g, "\\$1>")).replace(/^#/gm, "\\#")).replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3")).replace(/^( {0,3}\d+)\./gm, "$1\\.")).replace(/^( {0,3})([+-])/gm, "$1\\$2")).replace(/]([\s]*)\(/g, "\\]$1\\(")).replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:")
        }), e.exports ? e.exports = i : this.showdown = i
      }).call(t)
    }),
    fe = {
      pangu: n,
      minimatch: R,
      beautify: re,
      style: ce,
      rdability: de,
      markdown: Object.freeze({
        default: he,
        __moduleExports: he
      })
    };
  e.Plugin = function (e) {
    return void 0 == e ? fe : fe[e]
  }, Object.defineProperty(e, "__esModule", {
    value: !0
  })
});
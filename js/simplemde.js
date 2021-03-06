/**
 * simplemde v1.10.1
 * Copyright Next Step Webs, Inc.
 * @link https://github.com/NextStepWebs/simplemde-markdown-editor
 * @license MIT
 */
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.SimpleMDE = e()
    }
}(function() {
    var e;
    return function t(e, n, r) {
        function i(l, a) {
            if (!n[l]) {
                if (!e[l]) {
                    var s = "function" == typeof require && require;
                    if (!a && s) return s(l, !0);
                    if (o) return o(l, !0);
                    var c = new Error("Cannot find module '" + l + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[l] = {
                    exports: {}
                };
                e[l][0].call(u.exports, function(t) {
                    var n = e[l][1][t];
                    return i(n ? n : t)
                }, u, u.exports, t, e, n, r)
            }
            return n[l].exports
        }
        for (var o = "function" == typeof require && require, l = 0; l < r.length; l++) i(r[l]);
        return i
    }({
        1: [function(e, t, n) {
            (function(n) {
                Typo = n.Typo = e("D:\\My Web Sites\\simplemde-markdown-editor\\node_modules\\codemirror-spell-checker\\src\\js\\typo.js"), CodeMirror = n.CodeMirror = e("codemirror");
                (function(e, t, n) {
                    var r, i = 0,
                        o = !1,
                        l = !1,
                        a = "",
                        s = "";
                    CodeMirror.defineMode("spell-checker", function(e, t) {
                        if (!o) {
                            o = !0;
                            var n = new XMLHttpRequest;
                            n.open("GET", "", !0), n.onload = function(e) {
                                4 === n.readyState && 200 === n.status && (a = n.responseText, i++, 2 == i && (r = new Typo("en_US", a, s, {
                                    platform: "any"
                                })))
                            }, n.send(null)
                        }
                        if (!l) {
                            l = !0;
                            var c = new XMLHttpRequest;
                            c.open("GET", "", !0), c.onload = function(e) {
                                4 === c.readyState && 200 === c.status && (s = c.responseText, i++, 2 == i && (r = new Typo("en_US", a, s, {
                                    platform: "any"
                                })))
                            }, c.send(null)
                        }
                        var u = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',
                            d = {
                                token: function(e, t) {
                                    var n = e.peek(),
                                        i = "";
                                    if (u.includes(n)) return e.next(), null;
                                    for (; null != (n = e.peek()) && !u.includes(n);) i += n, e.next();
                                    return r && !r.check(i) ? "spell-error" : null
                                }
                            },
                            h = CodeMirror.getMode(e, e.backdrop || "text/plain");
                        return CodeMirror.overlayMode(h, d, !0)
                    }), String.prototype.includes || (String.prototype.includes = function() {
                        "use strict";
                        return -1 !== String.prototype.indexOf.apply(this, arguments)
                    })
                }).call(n, t, void 0, void 0)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "D:\\My Web Sites\\simplemde-markdown-editor\\node_modules\\codemirror-spell-checker\\src\\js\\typo.js": 2,
            codemirror: 7
        }],
        2: [function(e, t, n) {
            (function(e) {
                (function(e, t, n, r, i) {
                    "use strict";
                    var o = function(e, t, n, r) {
                        if (r = r || {}, this.platform = r.platform || "chrome", this.dictionary = null, this.rules = {}, this.dictionaryTable = {}, this.compoundRules = [], this.compoundRuleCodes = {}, this.replacementTable = [], this.flags = r.flags || {}, e) {
                            if (this.dictionary = e, "chrome" == this.platform) t || (t = this._readFile(chrome.extension.getURL("lib/typo/dictionaries/" + e + "/" + e + ".aff"))), n || (n = this._readFile(chrome.extension.getURL("lib/typo/dictionaries/" + e + "/" + e + ".dic")));
                            else {
                                var i = r.dictionaryPath || "";
                                t || (t = this._readFile(i + "/" + e + "/" + e + ".aff")), n || (n = this._readFile(i + "/" + e + "/" + e + ".dic"))
                            }
                            this.rules = this._parseAFF(t), this.compoundRuleCodes = {};
                            for (var o = 0, l = this.compoundRules.length; l > o; o++)
                                for (var a = this.compoundRules[o], s = 0, c = a.length; c > s; s++) this.compoundRuleCodes[a[s]] = [];
                            "ONLYINCOMPOUND" in this.flags && (this.compoundRuleCodes[this.flags.ONLYINCOMPOUND] = []), this.dictionaryTable = this._parseDIC(n);
                            for (var o in this.compoundRuleCodes) 0 == this.compoundRuleCodes[o].length && delete this.compoundRuleCodes[o];
                            for (var o = 0, l = this.compoundRules.length; l > o; o++) {
                                for (var u = this.compoundRules[o], d = "", s = 0, c = u.length; c > s; s++) {
                                    var h = u[s];
                                    d += h in this.compoundRuleCodes ? "(" + this.compoundRuleCodes[h].join("|") + ")" : h
                                }
                                this.compoundRules[o] = new RegExp(d, "i")
                            }
                        }
                        return this
                    };
                    o.prototype = {
                        load: function(e) {
                            for (var t in e) this[t] = e[t];
                            return this
                        },
                        _readFile: function(e, t) {
                            t || (t = "ISO8859-1");
                            var n = new XMLHttpRequest;
                            return n.open("GET", e, !1), n.overrideMimeType && n.overrideMimeType("text/plain; charset=" + t), n.send(null), n.responseText
                        },
                        _parseAFF: function(e) {
                            var t = {};
                            e = this._removeAffixComments(e);
                            for (var n = e.split("\n"), r = 0, i = n.length; i > r; r++) {
                                var o = n[r],
                                    l = o.split(/\s+/),
                                    a = l[0];
                                if ("PFX" == a || "SFX" == a) {
                                    for (var s = l[1], c = l[2], u = parseInt(l[3], 10), d = [], h = r + 1, f = r + 1 + u; f > h; h++) {
                                        var o = n[h],
                                            p = o.split(/\s+/),
                                            m = p[2],
                                            g = p[3].split("/"),
                                            v = g[0];
                                        "0" === v && (v = "");
                                        var y = this.parseRuleCodes(g[1]),
                                            x = p[4],
                                            b = {};
                                        b.add = v, y.length > 0 && (b.continuationClasses = y), "." !== x && ("SFX" === a ? b.match = new RegExp(x + "$") : b.match = new RegExp("^" + x)), "0" != m && ("SFX" === a ? b.remove = new RegExp(m + "$") : b.remove = m), d.push(b)
                                    }
                                    t[s] = {
                                        type: a,
                                        combineable: "Y" == c,
                                        entries: d
                                    }, r += u
                                } else if ("COMPOUNDRULE" === a) {
                                    for (var u = parseInt(l[1], 10), h = r + 1, f = r + 1 + u; f > h; h++) {
                                        var o = n[h],
                                            p = o.split(/\s+/);
                                        this.compoundRules.push(p[1])
                                    }
                                    r += u
                                } else if ("REP" === a) {
                                    var p = o.split(/\s+/);
                                    3 === p.length && this.replacementTable.push([p[1], p[2]])
                                } else this.flags[a] = l[1]
                            }
                            return t
                        },
                        _removeAffixComments: function(e) {
                            return e = e.replace(/#.*$/gm, ""), e = e.replace(/^\s\s*/m, "").replace(/\s\s*$/m, ""), e = e.replace(/\n{2,}/g, "\n"), e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                        },
                        _parseDIC: function(e) {
                            function t(e, t) {
                                e in r && "object" == typeof r[e] || (r[e] = []), r[e].push(t)
                            }
                            e = this._removeDicComments(e);
                            for (var n = e.split("\n"), r = {}, i = 1, o = n.length; o > i; i++) {
                                var l = n[i],
                                    a = l.split("/", 2),
                                    s = a[0];
                                if (a.length > 1) {
                                    var c = this.parseRuleCodes(a[1]);
                                    "NEEDAFFIX" in this.flags && -1 != c.indexOf(this.flags.NEEDAFFIX) || t(s, c);
                                    for (var u = 0, d = c.length; d > u; u++) {
                                        var h = c[u],
                                            f = this.rules[h];
                                        if (f)
                                            for (var p = this._applyRule(s, f), m = 0, g = p.length; g > m; m++) {
                                                var v = p[m];
                                                if (t(v, []), f.combineable)
                                                    for (var y = u + 1; d > y; y++) {
                                                        var x = c[y],
                                                            b = this.rules[x];
                                                        if (b && b.combineable && f.type != b.type)
                                                            for (var w = this._applyRule(v, b), k = 0, C = w.length; C > k; k++) {
                                                                var S = w[k];
                                                                t(S, [])
                                                            }
                                                    }
                                            }
                                        h in this.compoundRuleCodes && this.compoundRuleCodes[h].push(s)
                                    }
                                } else t(s.trim(), [])
                            }
                            return r
                        },
                        _removeDicComments: function(e) {
                            return e = e.replace(/^\t.*$/gm, "")
                        },
                        parseRuleCodes: function(e) {
                            if (!e) return [];
                            if (!("FLAG" in this.flags)) return e.split("");
                            if ("long" === this.flags.FLAG) {
                                for (var t = [], n = 0, r = e.length; r > n; n += 2) t.push(e.substr(n, 2));
                                return t
                            }
                            return "num" === this.flags.FLAG ? textCode.split(",") : void 0
                        },
                        _applyRule: function(e, t) {
                            for (var n = t.entries, r = [], i = 0, o = n.length; o > i; i++) {
                                var l = n[i];
                                if (!l.match || e.match(l.match)) {
                                    var a = e;
                                    if (l.remove && (a = a.replace(l.remove, "")), "SFX" === t.type ? a += l.add : a = l.add + a, r.push(a), "continuationClasses" in l)
                                        for (var s = 0, c = l.continuationClasses.length; c > s; s++) {
                                            var u = this.rules[l.continuationClasses[s]];
                                            u && (r = r.concat(this._applyRule(a, u)))
                                        }
                                }
                            }
                            return r
                        },
                        check: function(e) {
                            var t = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                            if (this.checkExact(t)) return !0;
                            if (t.toUpperCase() === t) {
                                var n = t[0] + t.substring(1).toLowerCase();
                                if (this.hasFlag(n, "KEEPCASE")) return !1;
                                if (this.checkExact(n)) return !0
                            }
                            var r = t.toLowerCase();
                            if (r !== t) {
                                if (this.hasFlag(r, "KEEPCASE")) return !1;
                                if (this.checkExact(r)) return !0
                            }
                            return !1
                        },
                        checkExact: function(e) {
                            var t = this.dictionaryTable[e];
                            if ("undefined" == typeof t) {
                                if ("COMPOUNDMIN" in this.flags && e.length >= this.flags.COMPOUNDMIN)
                                    for (var n = 0, r = this.compoundRules.length; r > n; n++)
                                        if (e.match(this.compoundRules[n])) return !0;
                                return !1
                            }
                            for (var n = 0, r = t.length; r > n; n++)
                                if (!this.hasFlag(e, "ONLYINCOMPOUND", t[n])) return !0;
                            return !1
                        },
                        hasFlag: function(e, t, n) {
                            if (t in this.flags) {
                                if ("undefined" == typeof n) var n = Array.prototype.concat.apply([], this.dictionaryTable[e]);
                                if (n && -1 !== n.indexOf(this.flags[t])) return !0
                            }
                            return !1
                        },
                        alphabet: "",
                        suggest: function(e, t) {
                            function n(e) {
                                for (var t = [], n = 0, r = e.length; r > n; n++) {
                                    for (var i = e[n], o = [], l = 0, a = i.length + 1; a > l; l++) o.push([i.substring(0, l), i.substring(l, i.length)]);
                                    for (var s = [], l = 0, a = o.length; a > l; l++) {
                                        var u = o[l];
                                        u[1] && s.push(u[0] + u[1].substring(1))
                                    }
                                    for (var d = [], l = 0, a = o.length; a > l; l++) {
                                        var u = o[l];
                                        u[1].length > 1 && d.push(u[0] + u[1][1] + u[1][0] + u[1].substring(2))
                                    }
                                    for (var h = [], l = 0, a = o.length; a > l; l++) {
                                        var u = o[l];
                                        if (u[1])
                                            for (var f = 0, p = c.alphabet.length; p > f; f++) h.push(u[0] + c.alphabet[f] + u[1].substring(1))
                                    }
                                    for (var m = [], l = 0, a = o.length; a > l; l++) {
                                        var u = o[l];
                                        if (u[1])
                                            for (var f = 0, p = c.alphabet.length; p > f; f++) h.push(u[0] + c.alphabet[f] + u[1])
                                    }
                                    t = t.concat(s), t = t.concat(d), t = t.concat(h), t = t.concat(m)
                                }
                                return t
                            }

                            function r(e) {
                                for (var t = [], n = 0; n < e.length; n++) c.check(e[n]) && t.push(e[n]);
                                return t
                            }

                            function i(e) {
                                function i(e, t) {
                                    return e[1] < t[1] ? -1 : 1
                                }
                                for (var o = n([e]), l = n(o), a = r(o).concat(r(l)), s = {}, u = 0, d = a.length; d > u; u++) a[u] in s ? s[a[u]] += 1 : s[a[u]] = 1;
                                var h = [];
                                for (var u in s) h.push([u, s[u]]);
                                h.sort(i).reverse();
                                for (var f = [], u = 0, d = Math.min(t, h.length); d > u; u++) c.hasFlag(h[u][0], "NOSUGGEST") || f.push(h[u][0]);
                                return f
                            }
                            if (t || (t = 5), this.check(e)) return [];
                            for (var o = 0, l = this.replacementTable.length; l > o; o++) {
                                var a = this.replacementTable[o];
                                if (-1 !== e.indexOf(a[0])) {
                                    var s = e.replace(a[0], a[1]);
                                    if (this.check(s)) return [s]
                                }
                            }
                            var c = this;
                            return c.alphabet = "abcdefghijklmnopqrstuvwxyz", i(e)
                        }
                    }, i("undefined" != typeof o ? o : window.Typo)
                }).call(e, void 0, void 0, void 0, void 0, function(e) {
                    t.exports = e
                })
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        3: [function(t, n, r) {
            ! function(i) {
                "object" == typeof r && "object" == typeof n ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror)
            }(function(e) {
                "use strict";

                function t(e) {
                    var t = e.getWrapperElement();
                    e.state.fullScreenRestore = {
                        scrollTop: window.pageYOffset,
                        scrollLeft: window.pageXOffset,
                        width: t.style.width,
                        height: t.style.height
                    }, t.style.width = "", t.style.height = "auto", t.className += " CodeMirror-fullscreen", document.documentElement.style.overflow = "hidden", e.refresh()
                }

                function n(e) {
                    var t = e.getWrapperElement();
                    t.className = t.className.replace(/\s*CodeMirror-fullscreen\b/, ""), document.documentElement.style.overflow = "";
                    var n = e.state.fullScreenRestore;
                    t.style.width = n.width, t.style.height = n.height, window.scrollTo(n.scrollLeft, n.scrollTop), e.refresh()
                }
                e.defineOption("fullScreen", !1, function(r, i, o) {
                    o == e.Init && (o = !1), !o != !i && (i ? t(r) : n(r))
                })
            })
        }, {
            "../../lib/codemirror": 7
        }],
        4: [function(t, n, r) {
            ! function(i) {
                "object" == typeof r && "object" == typeof n ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror)
            }(function(e) {
                function t(e) {
                    e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null)
                }

                function n(e) {
                    t(e);
                    var n = e.state.placeholder = document.createElement("pre");
                    n.style.cssText = "height: 0; overflow: visible", n.className = "CodeMirror-placeholder";
                    var r = e.getOption("placeholder");
                    "string" == typeof r && (r = document.createTextNode(r)), n.appendChild(r), e.display.lineSpace.insertBefore(n, e.display.lineSpace.firstChild)
                }

                function r(e) {
                    o(e) && n(e)
                }

                function i(e) {
                    var r = e.getWrapperElement(),
                        i = o(e);
                    r.className = r.className.replace(" CodeMirror-empty", "") + (i ? " CodeMirror-empty" : ""), i ? n(e) : t(e)
                }

                function o(e) {
                    return 1 === e.lineCount() && "" === e.getLine(0)
                }
                e.defineOption("placeholder", "", function(n, o, l) {
                    var a = l && l != e.Init;
                    if (o && !a) n.on("blur", r), n.on("change", i), n.on("swapDoc", i), i(n);
                    else if (!o && a) {
                        n.off("blur", r), n.off("change", i), n.off("swapDoc", i), t(n);
                        var s = n.getWrapperElement();
                        s.className = s.className.replace(" CodeMirror-empty", "")
                    }
                    o && !n.hasFocus() && r(n)
                })
            })
        }, {
            "../../lib/codemirror": 7
        }],
        5: [function(t, n, r) {
            ! function(i) {
                "object" == typeof r && "object" == typeof n ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror)
            }(function(e) {
                "use strict";
                var t = /^(\s*)(>[> ]*|[*+-]\s|(\d+)([.)]))(\s*)/,
                    n = /^(\s*)(>[> ]*|[*+-]|(\d+)[.)])(\s*)$/,
                    r = /[*+-]\s/;
                e.commands.newlineAndIndentContinueMarkdownList = function(i) {
                    if (i.getOption("disableInput")) return e.Pass;
                    for (var o = i.listSelections(), l = [], a = 0; a < o.length; a++) {
                        var s = o[a].head,
                            c = i.getStateAfter(s.line),
                            u = c.list !== !1,
                            d = 0 !== c.quote,
                            h = i.getLine(s.line),
                            f = t.exec(h);
                        if (!o[a].empty() || !u && !d || !f) return void i.execCommand("newlineAndIndent");
                        if (n.test(h)) i.replaceRange("", {
                            line: s.line,
                            ch: 0
                        }, {
                            line: s.line,
                            ch: s.ch + 1
                        }), l[a] = "\n";
                        else {
                            var p = f[1],
                                m = f[5],
                                g = r.test(f[2]) || f[2].indexOf(">") >= 0 ? f[2] : parseInt(f[3], 10) + 1 + f[4];
                            l[a] = "\n" + p + g + m
                        }
                    }
                    i.replaceSelections(l)
                }
            })
        }, {
            "../../lib/codemirror": 7
        }],
        6: [function(t, n, r) {
            ! function(i) {
                "object" == typeof r && "object" == typeof n ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror)
            }(function(e) {
                "use strict";
                e.overlayMode = function(t, n, r) {
                    return {
                        startState: function() {
                            return {
                                base: e.startState(t),
                                overlay: e.startState(n),
                                basePos: 0,
                                baseCur: null,
                                overlayPos: 0,
                                overlayCur: null,
                                streamSeen: null
                            }
                        },
                        copyState: function(r) {
                            return {
                                base: e.copyState(t, r.base),
                                overlay: e.copyState(n, r.overlay),
                                basePos: r.basePos,
                                baseCur: null,
                                overlayPos: r.overlayPos,
                                overlayCur: null
                            }
                        },
                        token: function(e, i) {
                            return (e != i.streamSeen || Math.min(i.basePos, i.overlayPos) < e.start) && (i.streamSeen = e, i.basePos = i.overlayPos = e.start), e.start == i.basePos && (i.baseCur = t.token(e, i.base), i.basePos = e.pos), e.start == i.overlayPos && (e.pos = e.start, i.overlayCur = n.token(e, i.overlay), i.overlayPos = e.pos), e.pos = Math.min(i.basePos, i.overlayPos), null == i.overlayCur ? i.baseCur : null != i.baseCur && i.overlay.combineTokens || r && null == i.overlay.combineTokens ? i.baseCur + " " + i.overlayCur : i.overlayCur
                        },
                        indent: t.indent && function(e, n) {
                            return t.indent(e.base, n)
                        },
                        electricChars: t.electricChars,
                        innerMode: function(e) {
                            return {
                                state: e.base,
                                mode: t
                            }
                        },
                        blankLine: function(e) {
                            t.blankLine && t.blankLine(e.base), n.blankLine && n.blankLine(e.overlay)
                        }
                    }
                }
            })
        }, {
            "../../lib/codemirror": 7
        }],
        7: [function(t, n, r) {
            ! function(t) {
                if ("object" == typeof r && "object" == typeof n) n.exports = t();
                else {
                    if ("function" == typeof e && e.amd) return e([], t);
                    (this || window).CodeMirror = t()
                }
            }(function() {
                "use strict";

                function e(n, r) {
                    if (!(this instanceof e)) return new e(n, r);
                    this.options = r = r ? Fi(r) : {}, Fi(Jo, r, !1), f(r);
                    var i = r.value;
                    "string" == typeof i && (i = new Cl(i, r.mode, null, r.lineSeparator)), this.doc = i;
                    var o = new e.inputStyles[r.inputStyle](this),
                        l = this.display = new t(n, i, o);
                    l.wrapper.CodeMirror = this, c(this), a(this), r.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), r.autofocus && !Ao && l.input.focus(), v(this), this.state = {
                        keyMaps: [],
                        overlays: [],
                        modeGen: 0,
                        overwrite: !1,
                        delayingBlurEvent: !1,
                        focused: !1,
                        suppressEdits: !1,
                        pasteIncoming: !1,
                        cutIncoming: !1,
                        selectingText: !1,
                        draggingText: !1,
                        highlight: new Oi,
                        keySeq: null,
                        specialChars: null
                    };
                    var s = this;
                    xo && 11 > bo && setTimeout(function() {
                        s.display.input.reset(!0)
                    }, 20), _t(this), Xi(), bt(this), this.curOp.forceUpdate = !0, Yr(this, i), r.autofocus && !Ao || s.hasFocus() ? setTimeout(zi(vn, this), 20) : yn(this);
                    for (var u in el) el.hasOwnProperty(u) && el[u](this, r[u], tl);
                    k(this), r.finishInit && r.finishInit(this);
                    for (var d = 0; d < ol.length; ++d) ol[d](this);
                    kt(this), wo && r.lineWrapping && "optimizelegibility" == getComputedStyle(l.lineDiv).textRendering && (l.lineDiv.style.textRendering = "auto")
                }

                function t(e, t, n) {
                    var r = this;
                    this.input = n, r.scrollbarFiller = _i("div", null, "CodeMirror-scrollbar-filler"), r.scrollbarFiller.setAttribute("cm-not-content", "true"), r.gutterFiller = _i("div", null, "CodeMirror-gutter-filler"), r.gutterFiller.setAttribute("cm-not-content", "true"), r.lineDiv = _i("div", null, "CodeMirror-code"), r.selectionDiv = _i("div", null, null, "position: relative; z-index: 1"), r.cursorDiv = _i("div", null, "CodeMirror-cursors"), r.measure = _i("div", null, "CodeMirror-measure"), r.lineMeasure = _i("div", null, "CodeMirror-measure"), r.lineSpace = _i("div", [r.measure, r.lineMeasure, r.selectionDiv, r.cursorDiv, r.lineDiv], null, "position: relative; outline: none"), r.mover = _i("div", [_i("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative"), r.sizer = _i("div", [r.mover], "CodeMirror-sizer"), r.sizerWidth = null, r.heightForcer = _i("div", null, null, "position: absolute; height: " + El + "px; width: 1px;"), r.gutters = _i("div", null, "CodeMirror-gutters"), r.lineGutter = null, r.scroller = _i("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll"), r.scroller.setAttribute("tabIndex", "-1"), r.wrapper = _i("div", [r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror"), xo && 8 > bo && (r.gutters.style.zIndex = -1, r.scroller.style.paddingRight = 0), wo || go && Ao || (r.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(r.wrapper) : e(r.wrapper)), r.viewFrom = r.viewTo = t.first, r.reportedViewFrom = r.reportedViewTo = t.first, r.view = [], r.renderedView = null, r.externalMeasured = null, r.viewOffset = 0, r.lastWrapHeight = r.lastWrapWidth = 0, r.updateLineNumbers = null, r.nativeBarWidth = r.barHeight = r.barWidth = 0, r.scrollbarsClipped = !1, r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null, r.alignWidgets = !1, r.cachedCharWidth = r.cachedTextHeight = r.cachedPaddingH = null, r.maxLine = null, r.maxLineLength = 0, r.maxLineChanged = !1, r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null, r.shift = !1, r.selForContextMenu = null, r.activeTouch = null, n.init(r)
                }

                function n(t) {
                    t.doc.mode = e.getMode(t.options, t.doc.modeOption), r(t)
                }

                function r(e) {
                    e.doc.iter(function(e) {
                        e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
                    }), e.doc.frontier = e.doc.first, Re(e, 100), e.state.modeGen++, e.curOp && Dt(e)
                }

                function i(e) {
                    e.options.lineWrapping ? (Zl(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Yl(e.display.wrapper, "CodeMirror-wrap"), h(e)), l(e), Dt(e), at(e), setTimeout(function() {
                        y(e)
                    }, 100)
                }

                function o(e) {
                    var t = yt(e.display),
                        n = e.options.lineWrapping,
                        r = n && Math.max(5, e.display.scroller.clientWidth / xt(e.display) - 3);
                    return function(i) {
                        if (kr(e.doc, i)) return 0;
                        var o = 0;
                        if (i.widgets)
                            for (var l = 0; l < i.widgets.length; l++) i.widgets[l].height && (o += i.widgets[l].height);
                        return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t
                    }
                }

                function l(e) {
                    var t = e.doc,
                        n = o(e);
                    t.iter(function(e) {
                        var t = n(e);
                        t != e.height && ei(e, t)
                    })
                }

                function a(e) {
                    e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), at(e)
                }

                function s(e) {
                    c(e), Dt(e), setTimeout(function() {
                        w(e)
                    }, 20)
                }

                function c(e) {
                    var t = e.display.gutters,
                        n = e.options.gutters;
                    qi(t);
                    for (var r = 0; r < n.length; ++r) {
                        var i = n[r],
                            o = t.appendChild(_i("div", null, "CodeMirror-gutter " + i));
                        "CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
                    }
                    t.style.display = r ? "" : "none", u(e)
                }

                function u(e) {
                    var t = e.display.gutters.offsetWidth;
                    e.display.sizer.style.marginLeft = t + "px"
                }

                function d(e) {
                    if (0 == e.height) return 0;
                    for (var t, n = e.text.length, r = e; t = mr(r);) {
                        var i = t.find(0, !0);
                        r = i.from.line, n += i.from.ch - i.to.ch
                    }
                    for (r = e; t = gr(r);) {
                        var i = t.find(0, !0);
                        n -= r.text.length - i.from.ch, r = i.to.line, n += r.text.length - i.to.ch
                    }
                    return n
                }

                function h(e) {
                    var t = e.display,
                        n = e.doc;
                    t.maxLine = Zr(n, n.first), t.maxLineLength = d(t.maxLine), t.maxLineChanged = !0, n.iter(function(e) {
                        var n = d(e);
                        n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
                    })
                }

                function f(e) {
                    var t = Ii(e.gutters, "CodeMirror-linenumbers"); - 1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1))
                }

                function p(e) {
                    var t = e.display,
                        n = t.gutters.offsetWidth,
                        r = Math.round(e.doc.height + Ue(e.display));
                    return {
                        clientHeight: t.scroller.clientHeight,
                        viewHeight: t.wrapper.clientHeight,
                        scrollWidth: t.scroller.scrollWidth,
                        clientWidth: t.scroller.clientWidth,
                        viewWidth: t.wrapper.clientWidth,
                        barLeft: e.options.fixedGutter ? n : 0,
                        docHeight: r,
                        scrollHeight: r + $e(e) + t.barHeight,
                        nativeBarWidth: t.nativeBarWidth,
                        gutterWidth: n
                    }
                }

                function m(e, t, n) {
                    this.cm = n;
                    var r = this.vert = _i("div", [_i("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                        i = this.horiz = _i("div", [_i("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
                    e(r), e(i), Al(r, "scroll", function() {
                        r.clientHeight && t(r.scrollTop, "vertical")
                    }), Al(i, "scroll", function() {
                        i.clientWidth && t(i.scrollLeft, "horizontal")
                    }), this.checkedZeroWidth = !1, xo && 8 > bo && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
                }

                function g() {}

                function v(t) {
                    t.display.scrollbars && (t.display.scrollbars.clear(), t.display.scrollbars.addClass && Yl(t.display.wrapper, t.display.scrollbars.addClass)), t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](function(e) {
                        t.display.wrapper.insertBefore(e, t.display.scrollbarFiller), Al(e, "mousedown", function() {
                            t.state.focused && setTimeout(function() {
                                t.display.input.focus()
                            }, 0)
                        }), e.setAttribute("cm-not-content", "true")
                    }, function(e, n) {
                        "horizontal" == n ? on(t, e) : rn(t, e)
                    }, t), t.display.scrollbars.addClass && Zl(t.display.wrapper, t.display.scrollbars.addClass)
                }

                function y(e, t) {
                    t || (t = p(e));
                    var n = e.display.barWidth,
                        r = e.display.barHeight;
                    x(e, t);
                    for (var i = 0; 4 > i && n != e.display.barWidth || r != e.display.barHeight; i++) n != e.display.barWidth && e.options.lineWrapping && H(e), x(e, p(e)), n = e.display.barWidth, r = e.display.barHeight
                }

                function x(e, t) {
                    var n = e.display,
                        r = n.scrollbars.update(t);
                    n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
                }

                function b(e, t, n) {
                    var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
                    r = Math.floor(r - qe(e));
                    var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
                        o = ni(t, r),
                        l = ni(t, i);
                    if (n && n.ensure) {
                        var a = n.ensure.from.line,
                            s = n.ensure.to.line;
                        o > a ? (o = a, l = ni(t, ri(Zr(t, a)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= l && (o = ni(t, ri(Zr(t, s)) - e.wrapper.clientHeight), l = s)
                    }
                    return {
                        from: o,
                        to: Math.max(l, o + 1)
                    }
                }

                function w(e) {
                    var t = e.display,
                        n = t.view;
                    if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
                        for (var r = S(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", l = 0; l < n.length; l++)
                            if (!n[l].hidden) {
                                e.options.fixedGutter && n[l].gutter && (n[l].gutter.style.left = o);
                                var a = n[l].alignable;
                                if (a)
                                    for (var s = 0; s < a.length; s++) a[s].style.left = o
                            }
                        e.options.fixedGutter && (t.gutters.style.left = r + i + "px")
                    }
                }

                function k(e) {
                    if (!e.options.lineNumbers) return !1;
                    var t = e.doc,
                        n = C(e.options, t.first + t.size - 1),
                        r = e.display;
                    if (n.length != r.lineNumChars) {
                        var i = r.measure.appendChild(_i("div", [_i("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                            o = i.firstChild.offsetWidth,
                            l = i.offsetWidth - o;
                        return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - l) + 1, r.lineNumWidth = r.lineNumInnerWidth + l, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", u(e), !0
                    }
                    return !1
                }

                function C(e, t) {
                    return String(e.lineNumberFormatter(t + e.firstLineNumber))
                }

                function S(e) {
                    return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
                }

                function L(e, t, n) {
                    var r = e.display;
                    this.viewport = t, this.visible = b(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = Ve(e), this.force = n, this.dims = I(e), this.events = []
                }

                function T(e) {
                    var t = e.display;
                    !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = $e(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = $e(e) + "px", t.scrollbarsClipped = !0)
                }

                function M(e, t) {
                    var n = e.display,
                        r = e.doc;
                    if (t.editorIsHidden) return Ft(e), !1;
                    if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == jt(e)) return !1;
                    k(e) && (Ft(e), t.dims = I(e));
                    var i = r.first + r.size,
                        o = Math.max(t.visible.from - e.options.viewportMargin, r.first),
                        l = Math.min(i, t.visible.to + e.options.viewportMargin);
                    n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > l && n.viewTo - l < 20 && (l = Math.min(i, n.viewTo)), Po && (o = br(e.doc, o), l = wr(e.doc, l));
                    var a = o != n.viewFrom || l != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
                    Bt(e, o, l), n.viewOffset = ri(Zr(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
                    var s = jt(e);
                    if (!a && 0 == s && !t.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)) return !1;
                    var c = Gi();
                    return s > 4 && (n.lineDiv.style.display = "none"), E(e, n.updateLineNumbers, t.dims), s > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, c && Gi() != c && c.offsetHeight && c.focus(), qi(n.cursorDiv), qi(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, a && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, Re(e, 400)), n.updateLineNumbers = null, !0
                }

                function N(e, t) {
                    for (var n = t.viewport, r = !0;
                        (r && e.options.lineWrapping && t.oldDisplayWidth != Ve(e) || (n && null != n.top && (n = {
                            top: Math.min(e.doc.height + Ue(e.display) - Ke(e), n.top)
                        }), t.visible = b(e.display, e.doc, n), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && M(e, t); r = !1) {
                        H(e);
                        var i = p(e);
                        Ee(e), O(e, i), y(e, i)
                    }
                    t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
                }

                function A(e, t) {
                    var n = new L(e, t);
                    if (M(e, n)) {
                        H(e), N(e, n);
                        var r = p(e);
                        Ee(e), O(e, r), y(e, r), n.finish()
                    }
                }

                function O(e, t) {
                    e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = Math.max(t.docHeight + e.display.barHeight + $e(e), t.clientHeight) + "px"
                }

                function H(e) {
                    for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
                        var i, o = t.view[r];
                        if (!o.hidden) {
                            if (xo && 8 > bo) {
                                var l = o.node.offsetTop + o.node.offsetHeight;
                                i = l - n, n = l
                            } else {
                                var a = o.node.getBoundingClientRect();
                                i = a.bottom - a.top
                            }
                            var s = o.line.height - i;
                            if (2 > i && (i = yt(t)), (s > .001 || -.001 > s) && (ei(o.line, i), W(o.line), o.rest))
                                for (var c = 0; c < o.rest.length; c++) W(o.rest[c])
                        }
                    }
                }

                function W(e) {
                    if (e.widgets)
                        for (var t = 0; t < e.widgets.length; ++t) e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight
                }

                function I(e) {
                    for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) n[e.options.gutters[l]] = o.offsetLeft + o.clientLeft + i, r[e.options.gutters[l]] = o.clientWidth;
                    return {
                        fixedPos: S(t),
                        gutterTotalWidth: t.gutters.offsetWidth,
                        gutterLeft: n,
                        gutterWidth: r,
                        wrapperWidth: t.wrapper.clientWidth
                    }
                }

                function E(e, t, n) {
                    function r(t) {
                        var n = t.nextSibling;
                        return wo && Oo && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), n
                    }
                    for (var i = e.display, o = e.options.lineNumbers, l = i.lineDiv, a = l.firstChild, s = i.view, c = i.viewFrom, u = 0; u < s.length; u++) {
                        var d = s[u];
                        if (d.hidden);
                        else if (d.node && d.node.parentNode == l) {
                            for (; a != d.node;) a = r(a);
                            var h = o && null != t && c >= t && d.lineNumber;
                            d.changes && (Ii(d.changes, "gutter") > -1 && (h = !1), D(e, d, c, n)), h && (qi(d.lineNumber), d.lineNumber.appendChild(document.createTextNode(C(e.options, c)))), a = d.node.nextSibling
                        } else {
                            var f = q(e, d, c, n);
                            l.insertBefore(f, a)
                        }
                        c += d.size
                    }
                    for (; a;) a = r(a)
                }

                function D(e, t, n, r) {
                    for (var i = 0; i < t.changes.length; i++) {
                        var o = t.changes[i];
                        "text" == o ? R(e, t) : "gutter" == o ? j(e, t, n, r) : "class" == o ? B(t) : "widget" == o && _(e, t, r)
                    }
                    t.changes = null
                }

                function P(e) {
                    return e.node == e.text && (e.node = _i("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), xo && 8 > bo && (e.node.style.zIndex = 2)), e.node
                }

                function F(e) {
                    var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
                    if (t && (t += " CodeMirror-linebackground"), e.background) t ? e.background.className = t : (e.background.parentNode.removeChild(e.background), e.background = null);
                    else if (t) {
                        var n = P(e);
                        e.background = n.insertBefore(_i("div", null, t), n.firstChild)
                    }
                }

                function z(e, t) {
                    var n = e.display.externalMeasured;
                    return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : zr(e, t)
                }

                function R(e, t) {
                    var n = t.text.className,
                        r = z(e, t);
                    t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, B(t)) : n && (t.text.className = n)
                }

                function B(e) {
                    F(e), e.line.wrapClass ? P(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");
                    var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
                    e.text.className = t || ""
                }

                function j(e, t, n, r) {
                    if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
                        var i = P(t);
                        t.gutterBackground = _i("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"), i.insertBefore(t.gutterBackground, t.text)
                    }
                    var o = t.line.gutterMarkers;
                    if (e.options.lineNumbers || o) {
                        var i = P(t),
                            l = t.gutter = _i("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
                        if (e.display.input.setUneditable(l), i.insertBefore(l, t.text), t.line.gutterClass && (l.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = l.appendChild(_i("div", C(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o)
                            for (var a = 0; a < e.options.gutters.length; ++a) {
                                var s = e.options.gutters[a],
                                    c = o.hasOwnProperty(s) && o[s];
                                c && l.appendChild(_i("div", [c], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[s] + "px; width: " + r.gutterWidth[s] + "px"))
                            }
                    }
                }

                function _(e, t, n) {
                    t.alignable && (t.alignable = null);
                    for (var r, i = t.node.firstChild; i; i = r) {
                        var r = i.nextSibling;
                        "CodeMirror-linewidget" == i.className && t.node.removeChild(i)
                    }
                    U(e, t, n)
                }

                function q(e, t, n, r) {
                    var i = z(e, t);
                    return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), B(t), j(e, t, n, r), U(e, t, r), t.node
                }

                function U(e, t, n) {
                    if (G(e, t.line, t, n, !0), t.rest)
                        for (var r = 0; r < t.rest.length; r++) G(e, t.rest[r], t, n, !1)
                }

                function G(e, t, n, r, i) {
                    if (t.widgets)
                        for (var o = P(n), l = 0, a = t.widgets; l < a.length; ++l) {
                            var s = a[l],
                                c = _i("div", [s.node], "CodeMirror-linewidget");
                            s.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), $(s, c, n, r), e.display.input.setUneditable(c), i && s.above ? o.insertBefore(c, n.gutter || n.text) : o.appendChild(c), Si(s, "redraw")
                        }
                }

                function $(e, t, n, r) {
                    if (e.noHScroll) {
                        (n.alignable || (n.alignable = [])).push(t);
                        var i = r.wrapperWidth;
                        t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px"
                    }
                    e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
                }

                function V(e) {
                    return Fo(e.line, e.ch)
                }

                function K(e, t) {
                    return zo(e, t) < 0 ? t : e
                }

                function X(e, t) {
                    return zo(e, t) < 0 ? e : t
                }

                function Y(e) {
                    e.state.focused || (e.display.input.focus(), vn(e))
                }

                function Z(e, t, n, r, i) {
                    var o = e.doc;
                    e.display.shift = !1, r || (r = o.sel);
                    var l = e.state.pasteIncoming || "paste" == i,
                        a = o.splitLines(t),
                        s = null;
                    if (l && r.ranges.length > 1)
                        if (Ro && Ro.join("\n") == t) {
                            if (r.ranges.length % Ro.length == 0) {
                                s = [];
                                for (var c = 0; c < Ro.length; c++) s.push(o.splitLines(Ro[c]))
                            }
                        } else a.length == r.ranges.length && (s = Ei(a, function(e) {
                            return [e]
                        }));
                    for (var c = r.ranges.length - 1; c >= 0; c--) {
                        var u = r.ranges[c],
                            d = u.from(),
                            h = u.to();
                        u.empty() && (n && n > 0 ? d = Fo(d.line, d.ch - n) : e.state.overwrite && !l && (h = Fo(h.line, Math.min(Zr(o, h.line).text.length, h.ch + Wi(a).length))));
                        var f = e.curOp.updateInput,
                            p = {
                                from: d,
                                to: h,
                                text: s ? s[c % s.length] : a,
                                origin: i || (l ? "paste" : e.state.cutIncoming ? "cut" : "+input")
                            };
                        Tn(e.doc, p), Si(e, "inputRead", e, p)
                    }
                    t && !l && J(e, t), zn(e), e.curOp.updateInput = f, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1
                }

                function Q(e, t) {
                    var n = e.clipboardData && e.clipboardData.getData("text/plain");
                    return n ? (e.preventDefault(), t.isReadOnly() || t.options.disableInput || At(t, function() {
                        Z(t, n, 0, null, "paste")
                    }), !0) : void 0
                }

                function J(e, t) {
                    if (e.options.electricChars && e.options.smartIndent)
                        for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
                            var i = n.ranges[r];
                            if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
                                var o = e.getModeAt(i.head),
                                    l = !1;
                                if (o.electricChars) {
                                    for (var a = 0; a < o.electricChars.length; a++)
                                        if (t.indexOf(o.electricChars.charAt(a)) > -1) {
                                            l = Bn(e, i.head.line, "smart");
                                            break
                                        }
                                } else o.electricInput && o.electricInput.test(Zr(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = Bn(e, i.head.line, "smart"));
                                l && Si(e, "electricInput", e, i.head.line)
                            }
                        }
                }

                function ee(e) {
                    for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
                        var i = e.doc.sel.ranges[r].head.line,
                            o = {
                                anchor: Fo(i, 0),
                                head: Fo(i + 1, 0)
                            };
                        n.push(o), t.push(e.getRange(o.anchor, o.head))
                    }
                    return {
                        text: t,
                        ranges: n
                    }
                }

                function te(e) {
                    e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"),
                        e.setAttribute("spellcheck", "false")
                }

                function ne(e) {
                    this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Oi, this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null
                }

                function re() {
                    var e = _i("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"),
                        t = _i("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
                    return wo ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), No && (e.style.border = "1px solid black"), te(e), t
                }

                function ie(e) {
                    this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Oi, this.gracePeriod = !1
                }

                function oe(e, t) {
                    var n = Je(e, t.line);
                    if (!n || n.hidden) return null;
                    var r = Zr(e.doc, t.line),
                        i = Ye(n, r, t.line),
                        o = ii(r),
                        l = "left";
                    if (o) {
                        var a = co(o, t.ch);
                        l = a % 2 ? "right" : "left"
                    }
                    var s = nt(i.map, t.ch, l);
                    return s.offset = "right" == s.collapse ? s.end : s.start, s
                }

                function le(e, t) {
                    return t && (e.bad = !0), e
                }

                function ae(e, t, n) {
                    var r;
                    if (t == e.display.lineDiv) {
                        if (r = e.display.lineDiv.childNodes[n], !r) return le(e.clipPos(Fo(e.display.viewTo - 1)), !0);
                        t = null, n = 0
                    } else
                        for (r = t;; r = r.parentNode) {
                            if (!r || r == e.display.lineDiv) return null;
                            if (r.parentNode && r.parentNode == e.display.lineDiv) break
                        }
                    for (var i = 0; i < e.display.view.length; i++) {
                        var o = e.display.view[i];
                        if (o.node == r) return se(o, t, n)
                    }
                }

                function se(e, t, n) {
                    function r(t, n, r) {
                        for (var i = -1; i < (u ? u.length : 0); i++)
                            for (var o = 0 > i ? c.map : u[i], l = 0; l < o.length; l += 3) {
                                var a = o[l + 2];
                                if (a == t || a == n) {
                                    var s = ti(0 > i ? e.line : e.rest[i]),
                                        d = o[l] + r;
                                    return (0 > r || a != t) && (d = o[l + (r ? 1 : 0)]), Fo(s, d)
                                }
                            }
                    }
                    var i = e.text.firstChild,
                        o = !1;
                    if (!t || !Vl(i, t)) return le(Fo(ti(e.line), 0), !0);
                    if (t == i && (o = !0, t = i.childNodes[n], n = 0, !t)) {
                        var l = e.rest ? Wi(e.rest) : e.line;
                        return le(Fo(ti(l), l.text.length), o)
                    }
                    var a = 3 == t.nodeType ? t : null,
                        s = t;
                    for (a || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (a = t.firstChild, n && (n = a.nodeValue.length)); s.parentNode != i;) s = s.parentNode;
                    var c = e.measure,
                        u = c.maps,
                        d = r(a, s, n);
                    if (d) return le(d, o);
                    for (var h = s.nextSibling, f = a ? a.nodeValue.length - n : 0; h; h = h.nextSibling) {
                        if (d = r(h, h.firstChild, 0)) return le(Fo(d.line, d.ch - f), o);
                        f += h.textContent.length
                    }
                    for (var p = s.previousSibling, f = n; p; p = p.previousSibling) {
                        if (d = r(p, p.firstChild, -1)) return le(Fo(d.line, d.ch + f), o);
                        f += h.textContent.length
                    }
                }

                function ce(e, t, n, r, i) {
                    function o(e) {
                        return function(t) {
                            return t.id == e
                        }
                    }

                    function l(t) {
                        if (1 == t.nodeType) {
                            var n = t.getAttribute("cm-text");
                            if (null != n) return "" == n && (n = t.textContent.replace(/\u200b/g, "")), void(a += n);
                            var u, d = t.getAttribute("cm-marker");
                            if (d) {
                                var h = e.findMarks(Fo(r, 0), Fo(i + 1, 0), o(+d));
                                return void(h.length && (u = h[0].find()) && (a += Qr(e.doc, u.from, u.to).join(c)))
                            }
                            if ("false" == t.getAttribute("contenteditable")) return;
                            for (var f = 0; f < t.childNodes.length; f++) l(t.childNodes[f]);
                            /^(pre|div|p)$/i.test(t.nodeName) && (s = !0)
                        } else if (3 == t.nodeType) {
                            var p = t.nodeValue;
                            if (!p) return;
                            s && (a += c, s = !1), a += p
                        }
                    }
                    for (var a = "", s = !1, c = e.doc.lineSeparator(); l(t), t != n;) t = t.nextSibling;
                    return a
                }

                function ue(e, t) {
                    this.ranges = e, this.primIndex = t
                }

                function de(e, t) {
                    this.anchor = e, this.head = t
                }

                function he(e, t) {
                    var n = e[t];
                    e.sort(function(e, t) {
                        return zo(e.from(), t.from())
                    }), t = Ii(e, n);
                    for (var r = 1; r < e.length; r++) {
                        var i = e[r],
                            o = e[r - 1];
                        if (zo(o.to(), i.from()) >= 0) {
                            var l = X(o.from(), i.from()),
                                a = K(o.to(), i.to()),
                                s = o.empty() ? i.from() == i.head : o.from() == o.head;
                            t >= r && --t, e.splice(--r, 2, new de(s ? a : l, s ? l : a))
                        }
                    }
                    return new ue(e, t)
                }

                function fe(e, t) {
                    return new ue([new de(e, t || e)], 0)
                }

                function pe(e, t) {
                    return Math.max(e.first, Math.min(t, e.first + e.size - 1))
                }

                function me(e, t) {
                    if (t.line < e.first) return Fo(e.first, 0);
                    var n = e.first + e.size - 1;
                    return t.line > n ? Fo(n, Zr(e, n).text.length) : ge(t, Zr(e, t.line).text.length)
                }

                function ge(e, t) {
                    var n = e.ch;
                    return null == n || n > t ? Fo(e.line, t) : 0 > n ? Fo(e.line, 0) : e
                }

                function ve(e, t) {
                    return t >= e.first && t < e.first + e.size
                }

                function ye(e, t) {
                    for (var n = [], r = 0; r < t.length; r++) n[r] = me(e, t[r]);
                    return n
                }

                function xe(e, t, n, r) {
                    if (e.cm && e.cm.display.shift || e.extend) {
                        var i = t.anchor;
                        if (r) {
                            var o = zo(n, i) < 0;
                            o != zo(r, i) < 0 ? (i = n, n = r) : o != zo(n, r) < 0 && (n = r)
                        }
                        return new de(i, n)
                    }
                    return new de(r || n, n)
                }

                function be(e, t, n, r) {
                    Te(e, new ue([xe(e, e.sel.primary(), t, n)], 0), r)
                }

                function we(e, t, n) {
                    for (var r = [], i = 0; i < e.sel.ranges.length; i++) r[i] = xe(e, e.sel.ranges[i], t[i], null);
                    var o = he(r, e.sel.primIndex);
                    Te(e, o, n)
                }

                function ke(e, t, n, r) {
                    var i = e.sel.ranges.slice(0);
                    i[t] = n, Te(e, he(i, e.sel.primIndex), r)
                }

                function Ce(e, t, n, r) {
                    Te(e, fe(t, n), r)
                }

                function Se(e, t, n) {
                    var r = {
                        ranges: t.ranges,
                        update: function(t) {
                            this.ranges = [];
                            for (var n = 0; n < t.length; n++) this.ranges[n] = new de(me(e, t[n].anchor), me(e, t[n].head))
                        },
                        origin: n && n.origin
                    };
                    return Wl(e, "beforeSelectionChange", e, r), e.cm && Wl(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? he(r.ranges, r.ranges.length - 1) : t
                }

                function Le(e, t, n) {
                    var r = e.history.done,
                        i = Wi(r);
                    i && i.ranges ? (r[r.length - 1] = t, Me(e, t, n)) : Te(e, t, n)
                }

                function Te(e, t, n) {
                    Me(e, t, n), di(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n)
                }

                function Me(e, t, n) {
                    (Ni(e, "beforeSelectionChange") || e.cm && Ni(e.cm, "beforeSelectionChange")) && (t = Se(e, t, n));
                    var r = n && n.bias || (zo(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
                    Ne(e, Oe(e, t, r, !0)), n && n.scroll === !1 || !e.cm || zn(e.cm)
                }

                function Ne(e, t) {
                    t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, Mi(e.cm)), Si(e, "cursorActivity", e))
                }

                function Ae(e) {
                    Ne(e, Oe(e, e.sel, null, !1), Pl)
                }

                function Oe(e, t, n, r) {
                    for (var i, o = 0; o < t.ranges.length; o++) {
                        var l = t.ranges[o],
                            a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                            s = We(e, l.anchor, a && a.anchor, n, r),
                            c = We(e, l.head, a && a.head, n, r);
                        (i || s != l.anchor || c != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new de(s, c))
                    }
                    return i ? he(i, t.primIndex) : t
                }

                function He(e, t, n, r, i) {
                    var o = Zr(e, t.line);
                    if (o.markedSpans)
                        for (var l = 0; l < o.markedSpans.length; ++l) {
                            var a = o.markedSpans[l],
                                s = a.marker;
                            if ((null == a.from || (s.inclusiveLeft ? a.from <= t.ch : a.from < t.ch)) && (null == a.to || (s.inclusiveRight ? a.to >= t.ch : a.to > t.ch))) {
                                if (i && (Wl(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                                    if (o.markedSpans) {
                                        --l;
                                        continue
                                    }
                                    break
                                }
                                if (!s.atomic) continue;
                                if (n) {
                                    var c, u = s.find(0 > r ? 1 : -1);
                                    if ((0 > r ? s.inclusiveRight : s.inclusiveLeft) && (u = Ie(e, u, -r, u && u.line == t.line ? o : null)), u && u.line == t.line && (c = zo(u, n)) && (0 > r ? 0 > c : c > 0)) return He(e, u, t, r, i)
                                }
                                var d = s.find(0 > r ? -1 : 1);
                                return (0 > r ? s.inclusiveLeft : s.inclusiveRight) && (d = Ie(e, d, r, d.line == t.line ? o : null)), d ? He(e, d, t, r, i) : null
                            }
                        }
                    return t
                }

                function We(e, t, n, r, i) {
                    var o = r || 1,
                        l = He(e, t, n, o, i) || !i && He(e, t, n, o, !0) || He(e, t, n, -o, i) || !i && He(e, t, n, -o, !0);
                    return l ? l : (e.cantEdit = !0, Fo(e.first, 0))
                }

                function Ie(e, t, n, r) {
                    return 0 > n && 0 == t.ch ? t.line > e.first ? me(e, Fo(t.line - 1)) : null : n > 0 && t.ch == (r || Zr(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? Fo(t.line + 1, 0) : null : new Fo(t.line, t.ch + n)
                }

                function Ee(e) {
                    e.display.input.showSelection(e.display.input.prepareSelection())
                }

                function De(e, t) {
                    for (var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), l = 0; l < n.sel.ranges.length; l++)
                        if (t !== !1 || l != n.sel.primIndex) {
                            var a = n.sel.ranges[l];
                            if (!(a.from().line >= e.display.viewTo || a.to().line < e.display.viewFrom)) {
                                var s = a.empty();
                                (s || e.options.showCursorWhenSelecting) && Pe(e, a.head, i), s || Fe(e, a, o)
                            }
                        }
                    return r
                }

                function Pe(e, t, n) {
                    var r = ft(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
                        i = n.appendChild(_i("div", " ", "CodeMirror-cursor"));
                    if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", r.other) {
                        var o = n.appendChild(_i("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
                        o.style.display = "", o.style.left = r.other.left + "px", o.style.top = r.other.top + "px", o.style.height = .85 * (r.other.bottom - r.other.top) + "px"
                    }
                }

                function Fe(e, t, n) {
                    function r(e, t, n, r) {
                        0 > t && (t = 0), t = Math.round(t), r = Math.round(r), a.appendChild(_i("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == n ? u - e : n) + "px; height: " + (r - t) + "px"))
                    }

                    function i(t, n, i) {
                        function o(n, r) {
                            return ht(e, Fo(t, n), "div", d, r)
                        }
                        var a, s, d = Zr(l, t),
                            h = d.text.length;
                        return eo(ii(d), n || 0, null == i ? h : i, function(e, t, l) {
                            var d, f, p, m = o(e, "left");
                            if (e == t) d = m, f = p = m.left;
                            else {
                                if (d = o(t - 1, "right"), "rtl" == l) {
                                    var g = m;
                                    m = d, d = g
                                }
                                f = m.left, p = d.right
                            }
                            null == n && 0 == e && (f = c), d.top - m.top > 3 && (r(f, m.top, null, m.bottom), f = c, m.bottom < d.top && r(f, m.bottom, null, d.top)), null == i && t == h && (p = u), (!a || m.top < a.top || m.top == a.top && m.left < a.left) && (a = m), (!s || d.bottom > s.bottom || d.bottom == s.bottom && d.right > s.right) && (s = d), c + 1 > f && (f = c), r(f, d.top, p - f, d.bottom)
                        }), {
                            start: a,
                            end: s
                        }
                    }
                    var o = e.display,
                        l = e.doc,
                        a = document.createDocumentFragment(),
                        s = Ge(e.display),
                        c = s.left,
                        u = Math.max(o.sizerWidth, Ve(e) - o.sizer.offsetLeft) - s.right,
                        d = t.from(),
                        h = t.to();
                    if (d.line == h.line) i(d.line, d.ch, h.ch);
                    else {
                        var f = Zr(l, d.line),
                            p = Zr(l, h.line),
                            m = yr(f) == yr(p),
                            g = i(d.line, d.ch, m ? f.text.length + 1 : null).end,
                            v = i(h.line, m ? 0 : null, h.ch).start;
                        m && (g.top < v.top - 2 ? (r(g.right, g.top, null, g.bottom), r(c, v.top, v.left, v.bottom)) : r(g.right, g.top, v.left - g.right, g.bottom)), g.bottom < v.top && r(c, g.bottom, null, v.top)
                    }
                    n.appendChild(a)
                }

                function ze(e) {
                    if (e.state.focused) {
                        var t = e.display;
                        clearInterval(t.blinker);
                        var n = !0;
                        t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
                            t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden"
                        }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
                    }
                }

                function Re(e, t) {
                    e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, zi(Be, e))
                }

                function Be(e) {
                    var t = e.doc;
                    if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
                        var n = +new Date + e.options.workTime,
                            r = al(t.mode, _e(e, t.frontier)),
                            i = [];
                        t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
                            if (t.frontier >= e.display.viewFrom) {
                                var l = o.styles,
                                    a = o.text.length > e.options.maxHighlightLength,
                                    s = Er(e, o, a ? al(t.mode, r) : r, !0);
                                o.styles = s.styles;
                                var c = o.styleClasses,
                                    u = s.classes;
                                u ? o.styleClasses = u : c && (o.styleClasses = null);
                                for (var d = !l || l.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), h = 0; !d && h < l.length; ++h) d = l[h] != o.styles[h];
                                d && i.push(t.frontier), o.stateAfter = a ? r : al(t.mode, r)
                            } else o.text.length <= e.options.maxHighlightLength && Pr(e, o.text, r), o.stateAfter = t.frontier % 5 == 0 ? al(t.mode, r) : null;
                            return ++t.frontier, +new Date > n ? (Re(e, e.options.workDelay), !0) : void 0
                        }), i.length && At(e, function() {
                            for (var t = 0; t < i.length; t++) Pt(e, i[t], "text")
                        })
                    }
                }

                function je(e, t, n) {
                    for (var r, i, o = e.doc, l = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > l; --a) {
                        if (a <= o.first) return o.first;
                        var s = Zr(o, a - 1);
                        if (s.stateAfter && (!n || a <= o.frontier)) return a;
                        var c = Rl(s.text, null, e.options.tabSize);
                        (null == i || r > c) && (i = a - 1, r = c)
                    }
                    return i
                }

                function _e(e, t, n) {
                    var r = e.doc,
                        i = e.display;
                    if (!r.mode.startState) return !0;
                    var o = je(e, t, n),
                        l = o > r.first && Zr(r, o - 1).stateAfter;
                    return l = l ? al(r.mode, l) : sl(r.mode), r.iter(o, t, function(n) {
                        Pr(e, n.text, l);
                        var a = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;
                        n.stateAfter = a ? al(r.mode, l) : null, ++o
                    }), n && (r.frontier = o), l
                }

                function qe(e) {
                    return e.lineSpace.offsetTop
                }

                function Ue(e) {
                    return e.mover.offsetHeight - e.lineSpace.offsetHeight
                }

                function Ge(e) {
                    if (e.cachedPaddingH) return e.cachedPaddingH;
                    var t = Ui(e.measure, _i("pre", "x")),
                        n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
                        r = {
                            left: parseInt(n.paddingLeft),
                            right: parseInt(n.paddingRight)
                        };
                    return isNaN(r.left) || isNaN(r.right) || (e.cachedPaddingH = r), r
                }

                function $e(e) {
                    return El - e.display.nativeBarWidth
                }

                function Ve(e) {
                    return e.display.scroller.clientWidth - $e(e) - e.display.barWidth
                }

                function Ke(e) {
                    return e.display.scroller.clientHeight - $e(e) - e.display.barHeight
                }

                function Xe(e, t, n) {
                    var r = e.options.lineWrapping,
                        i = r && Ve(e);
                    if (!t.measure.heights || r && t.measure.width != i) {
                        var o = t.measure.heights = [];
                        if (r) {
                            t.measure.width = i;
                            for (var l = t.text.firstChild.getClientRects(), a = 0; a < l.length - 1; a++) {
                                var s = l[a],
                                    c = l[a + 1];
                                Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - n.top)
                            }
                        }
                        o.push(n.bottom - n.top)
                    }
                }

                function Ye(e, t, n) {
                    if (e.line == t) return {
                        map: e.measure.map,
                        cache: e.measure.cache
                    };
                    for (var r = 0; r < e.rest.length; r++)
                        if (e.rest[r] == t) return {
                            map: e.measure.maps[r],
                            cache: e.measure.caches[r]
                        };
                    for (var r = 0; r < e.rest.length; r++)
                        if (ti(e.rest[r]) > n) return {
                            map: e.measure.maps[r],
                            cache: e.measure.caches[r],
                            before: !0
                        }
                }

                function Ze(e, t) {
                    t = yr(t);
                    var n = ti(t),
                        r = e.display.externalMeasured = new It(e.doc, t, n);
                    r.lineN = n;
                    var i = r.built = zr(e, r);
                    return r.text = i.pre, Ui(e.display.lineMeasure, i.pre), r
                }

                function Qe(e, t, n, r) {
                    return tt(e, et(e, t), n, r)
                }

                function Je(e, t) {
                    if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[zt(e, t)];
                    var n = e.display.externalMeasured;
                    return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0
                }

                function et(e, t) {
                    var n = ti(t),
                        r = Je(e, n);
                    r && !r.text ? r = null : r && r.changes && (D(e, r, n, I(e)), e.curOp.forceUpdate = !0), r || (r = Ze(e, t));
                    var i = Ye(r, t, n);
                    return {
                        line: t,
                        view: r,
                        rect: null,
                        map: i.map,
                        cache: i.cache,
                        before: i.before,
                        hasHeights: !1
                    }
                }

                function tt(e, t, n, r, i) {
                    t.before && (n = -1);
                    var o, l = n + (r || "");
                    return t.cache.hasOwnProperty(l) ? o = t.cache[l] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Xe(e, t.view, t.rect), t.hasHeights = !0), o = rt(e, t, n, r), o.bogus || (t.cache[l] = o)), {
                        left: o.left,
                        right: o.right,
                        top: i ? o.rtop : o.top,
                        bottom: i ? o.rbottom : o.bottom
                    }
                }

                function nt(e, t, n) {
                    for (var r, i, o, l, a = 0; a < e.length; a += 3) {
                        var s = e[a],
                            c = e[a + 1];
                        if (s > t ? (i = 0, o = 1, l = "left") : c > t ? (i = t - s, o = i + 1) : (a == e.length - 3 || t == c && e[a + 3] > t) && (o = c - s, i = o - 1, t >= c && (l = "right")), null != i) {
                            if (r = e[a + 2], s == c && n == (r.insertLeft ? "left" : "right") && (l = n), "left" == n && 0 == i)
                                for (; a && e[a - 2] == e[a - 3] && e[a - 1].insertLeft;) r = e[(a -= 3) + 2], l = "left";
                            if ("right" == n && i == c - s)
                                for (; a < e.length - 3 && e[a + 3] == e[a + 4] && !e[a + 5].insertLeft;) r = e[(a += 3) + 2], l = "right";
                            break
                        }
                    }
                    return {
                        node: r,
                        start: i,
                        end: o,
                        collapse: l,
                        coverStart: s,
                        coverEnd: c
                    }
                }

                function rt(e, t, n, r) {
                    var i, o = nt(t.map, n, r),
                        l = o.node,
                        a = o.start,
                        s = o.end,
                        c = o.collapse;
                    if (3 == l.nodeType) {
                        for (var u = 0; 4 > u; u++) {
                            for (; a && ji(t.line.text.charAt(o.coverStart + a));) --a;
                            for (; o.coverStart + s < o.coverEnd && ji(t.line.text.charAt(o.coverStart + s));) ++s;
                            if (xo && 9 > bo && 0 == a && s == o.coverEnd - o.coverStart) i = l.parentNode.getBoundingClientRect();
                            else if (xo && e.options.lineWrapping) {
                                var d = ql(l, a, s).getClientRects();
                                i = d.length ? d["right" == r ? d.length - 1 : 0] : qo
                            } else i = ql(l, a, s).getBoundingClientRect() || qo;
                            if (i.left || i.right || 0 == a) break;
                            s = a, a -= 1, c = "right"
                        }
                        xo && 11 > bo && (i = it(e.display.measure, i))
                    } else {
                        a > 0 && (c = r = "right");
                        var d;
                        i = e.options.lineWrapping && (d = l.getClientRects()).length > 1 ? d["right" == r ? d.length - 1 : 0] : l.getBoundingClientRect()
                    }
                    if (xo && 9 > bo && !a && (!i || !i.left && !i.right)) {
                        var h = l.parentNode.getClientRects()[0];
                        i = h ? {
                            left: h.left,
                            right: h.left + xt(e.display),
                            top: h.top,
                            bottom: h.bottom
                        } : qo
                    }
                    for (var f = i.top - t.rect.top, p = i.bottom - t.rect.top, m = (f + p) / 2, g = t.view.measure.heights, u = 0; u < g.length - 1 && !(m < g[u]); u++);
                    var v = u ? g[u - 1] : 0,
                        y = g[u],
                        x = {
                            left: ("right" == c ? i.right : i.left) - t.rect.left,
                            right: ("left" == c ? i.left : i.right) - t.rect.left,
                            top: v,
                            bottom: y
                        };
                    return i.left || i.right || (x.bogus = !0), e.options.singleCursorHeightPerLine || (x.rtop = f, x.rbottom = p), x
                }

                function it(e, t) {
                    if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Ji(e)) return t;
                    var n = screen.logicalXDPI / screen.deviceXDPI,
                        r = screen.logicalYDPI / screen.deviceYDPI;
                    return {
                        left: t.left * n,
                        right: t.right * n,
                        top: t.top * r,
                        bottom: t.bottom * r
                    }
                }

                function ot(e) {
                    if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
                        for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
                }

                function lt(e) {
                    e.display.externalMeasure = null, qi(e.display.lineMeasure);
                    for (var t = 0; t < e.display.view.length; t++) ot(e.display.view[t])
                }

                function at(e) {
                    lt(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
                }

                function st() {
                    return window.pageXOffset || (document.documentElement || document.body).scrollLeft
                }

                function ct() {
                    return window.pageYOffset || (document.documentElement || document.body).scrollTop
                }

                function ut(e, t, n, r) {
                    if (t.widgets)
                        for (var i = 0; i < t.widgets.length; ++i)
                            if (t.widgets[i].above) {
                                var o = Lr(t.widgets[i]);
                                n.top += o, n.bottom += o
                            }
                    if ("line" == r) return n;
                    r || (r = "local");
                    var l = ri(t);
                    if ("local" == r ? l += qe(e.display) : l -= e.display.viewOffset, "page" == r || "window" == r) {
                        var a = e.display.lineSpace.getBoundingClientRect();
                        l += a.top + ("window" == r ? 0 : ct());
                        var s = a.left + ("window" == r ? 0 : st());
                        n.left += s, n.right += s
                    }
                    return n.top += l, n.bottom += l, n
                }

                function dt(e, t, n) {
                    if ("div" == n) return t;
                    var r = t.left,
                        i = t.top;
                    if ("page" == n) r -= st(), i -= ct();
                    else if ("local" == n || !n) {
                        var o = e.display.sizer.getBoundingClientRect();
                        r += o.left, i += o.top
                    }
                    var l = e.display.lineSpace.getBoundingClientRect();
                    return {
                        left: r - l.left,
                        top: i - l.top
                    }
                }

                function ht(e, t, n, r, i) {
                    return r || (r = Zr(e.doc, t.line)), ut(e, r, Qe(e, r, t.ch, i), n)
                }

                function ft(e, t, n, r, i, o) {
                    function l(t, l) {
                        var a = tt(e, i, t, l ? "right" : "left", o);
                        return l ? a.left = a.right : a.right = a.left, ut(e, r, a, n)
                    }

                    function a(e, t) {
                        var n = s[t],
                            r = n.level % 2;
                        return e == to(n) && t && n.level < s[t - 1].level ? (n = s[--t], e = no(n) - (n.level % 2 ? 0 : 1), r = !0) : e == no(n) && t < s.length - 1 && n.level < s[t + 1].level && (n = s[++t], e = to(n) - n.level % 2, r = !1), r && e == n.to && e > n.from ? l(e - 1) : l(e, r)
                    }
                    r = r || Zr(e.doc, t.line), i || (i = et(e, r));
                    var s = ii(r),
                        c = t.ch;
                    if (!s) return l(c);
                    var u = co(s, c),
                        d = a(c, u);
                    return null != oa && (d.other = a(c, oa)), d
                }

                function pt(e, t) {
                    var n = 0,
                        t = me(e.doc, t);
                    e.options.lineWrapping || (n = xt(e.display) * t.ch);
                    var r = Zr(e.doc, t.line),
                        i = ri(r) + qe(e.display);
                    return {
                        left: n,
                        right: n,
                        top: i,
                        bottom: i + r.height
                    }
                }

                function mt(e, t, n, r) {
                    var i = Fo(e, t);
                    return i.xRel = r, n && (i.outside = !0), i
                }

                function gt(e, t, n) {
                    var r = e.doc;
                    if (n += e.display.viewOffset, 0 > n) return mt(r.first, 0, !0, -1);
                    var i = ni(r, n),
                        o = r.first + r.size - 1;
                    if (i > o) return mt(r.first + r.size - 1, Zr(r, o).text.length, !0, 1);
                    0 > t && (t = 0);
                    for (var l = Zr(r, i);;) {
                        var a = vt(e, l, i, t, n),
                            s = gr(l),
                            c = s && s.find(0, !0);
                        if (!s || !(a.ch > c.from.ch || a.ch == c.from.ch && a.xRel > 0)) return a;
                        i = ti(l = c.to.line)
                    }
                }

                function vt(e, t, n, r, i) {
                    function o(r) {
                        var i = ft(e, Fo(n, r), "line", t, c);
                        return a = !0, l > i.bottom ? i.left - s : l < i.top ? i.left + s : (a = !1, i.left)
                    }
                    var l = i - ri(t),
                        a = !1,
                        s = 2 * e.display.wrapper.clientWidth,
                        c = et(e, t),
                        u = ii(t),
                        d = t.text.length,
                        h = ro(t),
                        f = io(t),
                        p = o(h),
                        m = a,
                        g = o(f),
                        v = a;
                    if (r > g) return mt(n, f, v, 1);
                    for (;;) {
                        if (u ? f == h || f == ho(t, h, 1) : 1 >= f - h) {
                            for (var y = p > r || g - r >= r - p ? h : f, x = r - (y == h ? p : g); ji(t.text.charAt(y));) ++y;
                            var b = mt(n, y, y == h ? m : v, -1 > x ? -1 : x > 1 ? 1 : 0);
                            return b
                        }
                        var w = Math.ceil(d / 2),
                            k = h + w;
                        if (u) {
                            k = h;
                            for (var C = 0; w > C; ++C) k = ho(t, k, 1)
                        }
                        var S = o(k);
                        S > r ? (f = k, g = S, (v = a) && (g += 1e3), d = w) : (h = k, p = S, m = a, d -= w)
                    }
                }

                function yt(e) {
                    if (null != e.cachedTextHeight) return e.cachedTextHeight;
                    if (null == Bo) {
                        Bo = _i("pre");
                        for (var t = 0; 49 > t; ++t) Bo.appendChild(document.createTextNode("x")), Bo.appendChild(_i("br"));
                        Bo.appendChild(document.createTextNode("x"))
                    }
                    Ui(e.measure, Bo);
                    var n = Bo.offsetHeight / 50;
                    return n > 3 && (e.cachedTextHeight = n), qi(e.measure), n || 1
                }

                function xt(e) {
                    if (null != e.cachedCharWidth) return e.cachedCharWidth;
                    var t = _i("span", "xxxxxxxxxx"),
                        n = _i("pre", [t]);
                    Ui(e.measure, n);
                    var r = t.getBoundingClientRect(),
                        i = (r.right - r.left) / 10;
                    return i > 2 && (e.cachedCharWidth = i), i || 10
                }

                function bt(e) {
                    e.curOp = {
                        cm: e,
                        viewChanged: !1,
                        startHeight: e.doc.height,
                        forceUpdate: !1,
                        updateInput: null,
                        typing: !1,
                        changeObjs: null,
                        cursorActivityHandlers: null,
                        cursorActivityCalled: 0,
                        selectionChanged: !1,
                        updateMaxLine: !1,
                        scrollLeft: null,
                        scrollTop: null,
                        scrollToPos: null,
                        focus: !1,
                        id: ++Go
                    }, Uo ? Uo.ops.push(e.curOp) : e.curOp.ownsGroup = Uo = {
                        ops: [e.curOp],
                        delayedCallbacks: []
                    }
                }

                function wt(e) {
                    var t = e.delayedCallbacks,
                        n = 0;
                    do {
                        for (; n < t.length; n++) t[n].call(null);
                        for (var r = 0; r < e.ops.length; r++) {
                            var i = e.ops[r];
                            if (i.cursorActivityHandlers)
                                for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
                        }
                    } while (n < t.length)
                }

                function kt(e) {
                    var t = e.curOp,
                        n = t.ownsGroup;
                    if (n) try {
                        wt(n)
                    } finally {
                        Uo = null;
                        for (var r = 0; r < n.ops.length; r++) n.ops[r].cm.curOp = null;
                        Ct(n)
                    }
                }

                function Ct(e) {
                    for (var t = e.ops, n = 0; n < t.length; n++) St(t[n]);
                    for (var n = 0; n < t.length; n++) Lt(t[n]);
                    for (var n = 0; n < t.length; n++) Tt(t[n]);
                    for (var n = 0; n < t.length; n++) Mt(t[n]);
                    for (var n = 0; n < t.length; n++) Nt(t[n])
                }

                function St(e) {
                    var t = e.cm,
                        n = t.display;
                    T(t), e.updateMaxLine && h(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new L(t, e.mustUpdate && {
                        top: e.scrollTop,
                        ensure: e.scrollToPos
                    }, e.forceUpdate)
                }

                function Lt(e) {
                    e.updatedDisplay = e.mustUpdate && M(e.cm, e.update)
                }

                function Tt(e) {
                    var t = e.cm,
                        n = t.display;
                    e.updatedDisplay && H(t), e.barMeasure = p(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Qe(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + $e(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Ve(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection())
                }

                function Mt(e) {
                    var t = e.cm;
                    null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && on(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1), e.preparedSelection && t.display.input.showSelection(e.preparedSelection), e.updatedDisplay && O(t, e.barMeasure), (e.updatedDisplay || e.startHeight != t.doc.height) && y(t, e.barMeasure), e.selectionChanged && ze(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), !e.focus || e.focus != Gi() || document.hasFocus && !document.hasFocus() || Y(e.cm)
                }

                function Nt(e) {
                    var t = e.cm,
                        n = t.display,
                        r = t.doc;
                    if (e.updatedDisplay && N(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null), null == e.scrollTop || n.scroller.scrollTop == e.scrollTop && !e.forceScroll || (r.scrollTop = Math.max(0, Math.min(n.scroller.scrollHeight - n.scroller.clientHeight, e.scrollTop)), n.scrollbars.setScrollTop(r.scrollTop), n.scroller.scrollTop = r.scrollTop), null == e.scrollLeft || n.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (r.scrollLeft = Math.max(0, Math.min(n.scroller.scrollWidth - n.scroller.clientWidth, e.scrollLeft)), n.scrollbars.setScrollLeft(r.scrollLeft), n.scroller.scrollLeft = r.scrollLeft, w(t)), e.scrollToPos) {
                        var i = En(t, me(r, e.scrollToPos.from), me(r, e.scrollToPos.to), e.scrollToPos.margin);
                        e.scrollToPos.isCursor && t.state.focused && In(t, i)
                    }
                    var o = e.maybeHiddenMarkers,
                        l = e.maybeUnhiddenMarkers;
                    if (o)
                        for (var a = 0; a < o.length; ++a) o[a].lines.length || Wl(o[a], "hide");
                    if (l)
                        for (var a = 0; a < l.length; ++a) l[a].lines.length && Wl(l[a], "unhide");
                    n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Wl(t, "changes", t, e.changeObjs), e.update && e.update.finish()
                }

                function At(e, t) {
                    if (e.curOp) return t();
                    bt(e);
                    try {
                        return t()
                    } finally {
                        kt(e)
                    }
                }

                function Ot(e, t) {
                    return function() {
                        if (e.curOp) return t.apply(e, arguments);
                        bt(e);
                        try {
                            return t.apply(e, arguments)
                        } finally {
                            kt(e)
                        }
                    }
                }

                function Ht(e) {
                    return function() {
                        if (this.curOp) return e.apply(this, arguments);
                        bt(this);
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            kt(this)
                        }
                    }
                }

                function Wt(e) {
                    return function() {
                        var t = this.cm;
                        if (!t || t.curOp) return e.apply(this, arguments);
                        bt(t);
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            kt(t)
                        }
                    }
                }

                function It(e, t, n) {
                    this.line = t, this.rest = xr(t), this.size = this.rest ? ti(Wi(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = kr(e, t)
                }

                function Et(e, t, n) {
                    for (var r, i = [], o = t; n > o; o = r) {
                        var l = new It(e.doc, Zr(e.doc, o), o);
                        r = o + l.size, i.push(l)
                    }
                    return i
                }

                function Dt(e, t, n, r) {
                    null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);
                    var i = e.display;
                    if (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) Po && br(e.doc, t) < i.viewTo && Ft(e);
                    else if (n <= i.viewFrom) Po && wr(e.doc, n + r) > i.viewFrom ? Ft(e) : (i.viewFrom += r, i.viewTo += r);
                    else if (t <= i.viewFrom && n >= i.viewTo) Ft(e);
                    else if (t <= i.viewFrom) {
                        var o = Rt(e, n, n + r, 1);
                        o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : Ft(e)
                    } else if (n >= i.viewTo) {
                        var o = Rt(e, t, t, -1);
                        o ? (i.view = i.view.slice(0, o.index), i.viewTo = o.lineN) : Ft(e)
                    } else {
                        var l = Rt(e, t, t, -1),
                            a = Rt(e, n, n + r, 1);
                        l && a ? (i.view = i.view.slice(0, l.index).concat(Et(e, l.lineN, a.lineN)).concat(i.view.slice(a.index)), i.viewTo += r) : Ft(e)
                    }
                    var s = i.externalMeasured;
                    s && (n < s.lineN ? s.lineN += r : t < s.lineN + s.size && (i.externalMeasured = null))
                }

                function Pt(e, t, n) {
                    e.curOp.viewChanged = !0;
                    var r = e.display,
                        i = e.display.externalMeasured;
                    if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
                        var o = r.view[zt(e, t)];
                        if (null != o.node) {
                            var l = o.changes || (o.changes = []); - 1 == Ii(l, n) && l.push(n)
                        }
                    }
                }

                function Ft(e) {
                    e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
                }

                function zt(e, t) {
                    if (t >= e.display.viewTo) return null;
                    if (t -= e.display.viewFrom, 0 > t) return null;
                    for (var n = e.display.view, r = 0; r < n.length; r++)
                        if (t -= n[r].size, 0 > t) return r
                }

                function Rt(e, t, n, r) {
                    var i, o = zt(e, t),
                        l = e.display.view;
                    if (!Po || n == e.doc.first + e.doc.size) return {
                        index: o,
                        lineN: n
                    };
                    for (var a = 0, s = e.display.viewFrom; o > a; a++) s += l[a].size;
                    if (s != t) {
                        if (r > 0) {
                            if (o == l.length - 1) return null;
                            i = s + l[o].size - t, o++
                        } else i = s - t;
                        t += i, n += i
                    }
                    for (; br(e.doc, n) != n;) {
                        if (o == (0 > r ? 0 : l.length - 1)) return null;
                        n += r * l[o - (0 > r ? 1 : 0)].size, o += r
                    }
                    return {
                        index: o,
                        lineN: n
                    }
                }

                function Bt(e, t, n) {
                    var r = e.display,
                        i = r.view;
                    0 == i.length || t >= r.viewTo || n <= r.viewFrom ? (r.view = Et(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = Et(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(zt(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(Et(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, zt(e, n)))), r.viewTo = n
                }

                function jt(e) {
                    for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.hidden || i.node && !i.changes || ++n
                    }
                    return n
                }

                function _t(e) {
                    function t() {
                        i.activeTouch && (o = setTimeout(function() {
                            i.activeTouch = null
                        }, 1e3), l = i.activeTouch, l.end = +new Date)
                    }

                    function n(e) {
                        if (1 != e.touches.length) return !1;
                        var t = e.touches[0];
                        return t.radiusX <= 1 && t.radiusY <= 1
                    }

                    function r(e, t) {
                        if (null == t.left) return !0;
                        var n = t.left - e.left,
                            r = t.top - e.top;
                        return n * n + r * r > 400
                    }
                    var i = e.display;
                    Al(i.scroller, "mousedown", Ot(e, Vt)), xo && 11 > bo ? Al(i.scroller, "dblclick", Ot(e, function(t) {
                        if (!Ti(e, t)) {
                            var n = $t(e, t);
                            if (n && !Qt(e, t) && !Gt(e.display, t)) {
                                Tl(t);
                                var r = e.findWordAt(n);
                                be(e.doc, r.anchor, r.head)
                            }
                        }
                    })) : Al(i.scroller, "dblclick", function(t) {
                        Ti(e, t) || Tl(t)
                    }), Eo || Al(i.scroller, "contextmenu", function(t) {
                        xn(e, t)
                    });
                    var o, l = {
                        end: 0
                    };
                    Al(i.scroller, "touchstart", function(t) {
                        if (!Ti(e, t) && !n(t)) {
                            clearTimeout(o);
                            var r = +new Date;
                            i.activeTouch = {
                                start: r,
                                moved: !1,
                                prev: r - l.end <= 300 ? l : null
                            }, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY)
                        }
                    }), Al(i.scroller, "touchmove", function() {
                        i.activeTouch && (i.activeTouch.moved = !0)
                    }), Al(i.scroller, "touchend", function(n) {
                        var o = i.activeTouch;
                        if (o && !Gt(i, n) && null != o.left && !o.moved && new Date - o.start < 300) {
                            var l, a = e.coordsChar(i.activeTouch, "page");
                            l = !o.prev || r(o, o.prev) ? new de(a, a) : !o.prev.prev || r(o, o.prev.prev) ? e.findWordAt(a) : new de(Fo(a.line, 0), me(e.doc, Fo(a.line + 1, 0))), e.setSelection(l.anchor, l.head), e.focus(), Tl(n)
                        }
                        t()
                    }), Al(i.scroller, "touchcancel", t), Al(i.scroller, "scroll", function() {
                        i.scroller.clientHeight && (rn(e, i.scroller.scrollTop), on(e, i.scroller.scrollLeft, !0), Wl(e, "scroll", e))
                    }), Al(i.scroller, "mousewheel", function(t) {
                        ln(e, t)
                    }), Al(i.scroller, "DOMMouseScroll", function(t) {
                        ln(e, t)
                    }), Al(i.wrapper, "scroll", function() {
                        i.wrapper.scrollTop = i.wrapper.scrollLeft = 0
                    }), i.dragFunctions = {
                        enter: function(t) {
                            Ti(e, t) || Nl(t)
                        },
                        over: function(t) {
                            Ti(e, t) || (tn(e, t), Nl(t))
                        },
                        start: function(t) {
                            en(e, t)
                        },
                        drop: Ot(e, Jt),
                        leave: function() {
                            nn(e)
                        }
                    };
                    var a = i.input.getField();
                    Al(a, "keyup", function(t) {
                        pn.call(e, t)
                    }), Al(a, "keydown", Ot(e, hn)), Al(a, "keypress", Ot(e, mn)), Al(a, "focus", zi(vn, e)), Al(a, "blur", zi(yn, e))
                }

                function qt(t, n, r) {
                    var i = r && r != e.Init;
                    if (!n != !i) {
                        var o = t.display.dragFunctions,
                            l = n ? Al : Hl;
                        l(t.display.scroller, "dragstart", o.start), l(t.display.scroller, "dragenter", o.enter), l(t.display.scroller, "dragover", o.over), l(t.display.scroller, "dragleave", o.leave), l(t.display.scroller, "drop", o.drop)
                    }
                }

                function Ut(e) {
                    var t = e.display;
                    t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth || (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize())
                }

                function Gt(e, t) {
                    for (var n = wi(t); n != e.wrapper; n = n.parentNode)
                        if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return !0
                }

                function $t(e, t, n, r) {
                    var i = e.display;
                    if (!n && "true" == wi(t).getAttribute("cm-not-content")) return null;
                    var o, l, a = i.lineSpace.getBoundingClientRect();
                    try {
                        o = t.clientX - a.left, l = t.clientY - a.top
                    } catch (t) {
                        return null
                    }
                    var s, c = gt(e, o, l);
                    if (r && 1 == c.xRel && (s = Zr(e.doc, c.line).text).length == c.ch) {
                        var u = Rl(s, s.length, e.options.tabSize) - s.length;
                        c = Fo(c.line, Math.max(0, Math.round((o - Ge(e.display).left) / xt(e.display)) - u))
                    }
                    return c
                }

                function Vt(e) {
                    var t = this,
                        n = t.display;
                    if (!(Ti(t, e) || n.activeTouch && n.input.supportsTouch())) {
                        if (n.shift = e.shiftKey, Gt(n, e)) return void(wo || (n.scroller.draggable = !1, setTimeout(function() {
                            n.scroller.draggable = !0
                        }, 100)));
                        if (!Qt(t, e)) {
                            var r = $t(t, e);
                            switch (window.focus(), ki(e)) {
                                case 1:
                                    t.state.selectingText ? t.state.selectingText(e) : r ? Kt(t, e, r) : wi(e) == n.scroller && Tl(e);
                                    break;
                                case 2:
                                    wo && (t.state.lastMiddleDown = +new Date), r && be(t.doc, r), setTimeout(function() {
                                        n.input.focus()
                                    }, 20), Tl(e);
                                    break;
                                case 3:
                                    Eo ? xn(t, e) : gn(t)
                            }
                        }
                    }
                }

                function Kt(e, t, n) {
                    xo ? setTimeout(zi(Y, e), 0) : e.curOp.focus = Gi();
                    var r, i = +new Date;
                    _o && _o.time > i - 400 && 0 == zo(_o.pos, n) ? r = "triple" : jo && jo.time > i - 400 && 0 == zo(jo.pos, n) ? (r = "double", _o = {
                        time: i,
                        pos: n
                    }) : (r = "single", jo = {
                        time: i,
                        pos: n
                    });
                    var o, l = e.doc.sel,
                        a = Oo ? t.metaKey : t.ctrlKey;
                    e.options.dragDrop && Jl && !e.isReadOnly() && "single" == r && (o = l.contains(n)) > -1 && (zo((o = l.ranges[o]).from(), n) < 0 || n.xRel > 0) && (zo(o.to(), n) > 0 || n.xRel < 0) ? Xt(e, t, n, a) : Yt(e, t, n, r, a)
                }

                function Xt(e, t, n, r) {
                    var i = e.display,
                        o = +new Date,
                        l = Ot(e, function(a) {
                            wo && (i.scroller.draggable = !1), e.state.draggingText = !1, Hl(document, "mouseup", l), Hl(i.scroller, "drop", l), Math.abs(t.clientX - a.clientX) + Math.abs(t.clientY - a.clientY) < 10 && (Tl(a), !r && +new Date - 200 < o && be(e.doc, n), wo || xo && 9 == bo ? setTimeout(function() {
                                document.body.focus(), i.input.focus()
                            }, 20) : i.input.focus())
                        });
                    wo && (i.scroller.draggable = !0), e.state.draggingText = l, i.scroller.dragDrop && i.scroller.dragDrop(), Al(document, "mouseup", l), Al(i.scroller, "drop", l)
                }

                function Yt(e, t, n, r, i) {
                    function o(t) {
                        if (0 != zo(g, t))
                            if (g = t, "rect" == r) {
                                for (var i = [], o = e.options.tabSize, l = Rl(Zr(c, n.line).text, n.ch, o), a = Rl(Zr(c, t.line).text, t.ch, o), s = Math.min(l, a), f = Math.max(l, a), p = Math.min(n.line, t.line), m = Math.min(e.lastLine(), Math.max(n.line, t.line)); m >= p; p++) {
                                    var v = Zr(c, p).text,
                                        y = Bl(v, s, o);
                                    s == f ? i.push(new de(Fo(p, y), Fo(p, y))) : v.length > y && i.push(new de(Fo(p, y), Fo(p, Bl(v, f, o))))
                                }
                                i.length || i.push(new de(n, n)), Te(c, he(h.ranges.slice(0, d).concat(i), d), {
                                    origin: "*mouse",
                                    scroll: !1
                                }), e.scrollIntoView(t)
                            } else {
                                var x = u,
                                    b = x.anchor,
                                    w = t;
                                if ("single" != r) {
                                    if ("double" == r) var k = e.findWordAt(t);
                                    else var k = new de(Fo(t.line, 0), me(c, Fo(t.line + 1, 0)));
                                    zo(k.anchor, b) > 0 ? (w = k.head, b = X(x.from(), k.anchor)) : (w = k.anchor, b = K(x.to(), k.head))
                                }
                                var i = h.ranges.slice(0);
                                i[d] = new de(me(c, b), w), Te(c, he(i, d), Fl)
                            }
                    }

                    function l(t) {
                        var n = ++y,
                            i = $t(e, t, !0, "rect" == r);
                        if (i)
                            if (0 != zo(i, g)) {
                                e.curOp.focus = Gi(), o(i);
                                var a = b(s, c);
                                (i.line >= a.to || i.line < a.from) && setTimeout(Ot(e, function() {
                                    y == n && l(t)
                                }), 150)
                            } else {
                                var u = t.clientY < v.top ? -20 : t.clientY > v.bottom ? 20 : 0;
                                u && setTimeout(Ot(e, function() {
                                    y == n && (s.scroller.scrollTop += u, l(t))
                                }), 50)
                            }
                    }

                    function a(t) {
                        e.state.selectingText = !1, y = 1 / 0, Tl(t), s.input.focus(), Hl(document, "mousemove", x), Hl(document, "mouseup", w), c.history.lastSelOrigin = null
                    }
                    var s = e.display,
                        c = e.doc;
                    Tl(t);
                    var u, d, h = c.sel,
                        f = h.ranges;
                    if (i && !t.shiftKey ? (d = c.sel.contains(n), u = d > -1 ? f[d] : new de(n, n)) : (u = c.sel.primary(), d = c.sel.primIndex), t.altKey) r = "rect", i || (u = new de(n, n)), n = $t(e, t, !0, !0), d = -1;
                    else if ("double" == r) {
                        var p = e.findWordAt(n);
                        u = e.display.shift || c.extend ? xe(c, u, p.anchor, p.head) : p
                    } else if ("triple" == r) {
                        var m = new de(Fo(n.line, 0), me(c, Fo(n.line + 1, 0)));
                        u = e.display.shift || c.extend ? xe(c, u, m.anchor, m.head) : m
                    } else u = xe(c, u, n);
                    i ? -1 == d ? (d = f.length, Te(c, he(f.concat([u]), d), {
                        scroll: !1,
                        origin: "*mouse"
                    })) : f.length > 1 && f[d].empty() && "single" == r && !t.shiftKey ? (Te(c, he(f.slice(0, d).concat(f.slice(d + 1)), 0), {
                        scroll: !1,
                        origin: "*mouse"
                    }), h = c.sel) : ke(c, d, u, Fl) : (d = 0, Te(c, new ue([u], 0), Fl), h = c.sel);
                    var g = n,
                        v = s.wrapper.getBoundingClientRect(),
                        y = 0,
                        x = Ot(e, function(e) {
                            ki(e) ? l(e) : a(e)
                        }),
                        w = Ot(e, a);
                    e.state.selectingText = w, Al(document, "mousemove", x), Al(document, "mouseup", w)
                }

                function Zt(e, t, n, r) {
                    try {
                        var i = t.clientX,
                            o = t.clientY
                    } catch (t) {
                        return !1
                    }
                    if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
                    r && Tl(t);
                    var l = e.display,
                        a = l.lineDiv.getBoundingClientRect();
                    if (o > a.bottom || !Ni(e, n)) return bi(t);
                    o -= a.top - l.viewOffset;
                    for (var s = 0; s < e.options.gutters.length; ++s) {
                        var c = l.gutters.childNodes[s];
                        if (c && c.getBoundingClientRect().right >= i) {
                            var u = ni(e.doc, o),
                                d = e.options.gutters[s];
                            return Wl(e, n, e, u, d, t), bi(t)
                        }
                    }
                }

                function Qt(e, t) {
                    return Zt(e, t, "gutterClick", !0)
                }

                function Jt(e) {
                    var t = this;
                    if (nn(t), !Ti(t, e) && !Gt(t.display, e)) {
                        Tl(e), xo && ($o = +new Date);
                        var n = $t(t, e, !0),
                            r = e.dataTransfer.files;
                        if (n && !t.isReadOnly())
                            if (r && r.length && window.FileReader && window.File)
                                for (var i = r.length, o = Array(i), l = 0, a = function(e, r) {
                                        if (!t.options.allowDropFileTypes || -1 != Ii(t.options.allowDropFileTypes, e.type)) {
                                            var a = new FileReader;
                                            a.onload = Ot(t, function() {
                                                var e = a.result;
                                                if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[r] = e, ++l == i) {
                                                    n = me(t.doc, n);
                                                    var s = {
                                                        from: n,
                                                        to: n,
                                                        text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
                                                        origin: "paste"
                                                    };
                                                    Tn(t.doc, s), Le(t.doc, fe(n, Qo(s)))
                                                }
                                            }), a.readAsText(e)
                                        }
                                    }, s = 0; i > s; ++s) a(r[s], s);
                            else {
                                if (t.state.draggingText && t.doc.sel.contains(n) > -1) return t.state.draggingText(e), void setTimeout(function() {
                                    t.display.input.focus()
                                }, 20);
                                try {
                                    var o = e.dataTransfer.getData("Text");
                                    if (o) {
                                        if (t.state.draggingText && !(Oo ? e.altKey : e.ctrlKey)) var c = t.listSelections();
                                        if (Me(t.doc, fe(n, n)), c)
                                            for (var s = 0; s < c.length; ++s) Wn(t.doc, "", c[s].anchor, c[s].head, "drag");
                                        t.replaceSelection(o, "around", "paste"), t.display.input.focus()
                                    }
                                } catch (e) {}
                            }
                    }
                }

                function en(e, t) {
                    if (xo && (!e.state.draggingText || +new Date - $o < 100)) return void Nl(t);
                    if (!Ti(e, t) && !Gt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.setDragImage && !Lo)) {
                        var n = _i("img", null, null, "position: fixed; left: 0; top: 0;");
                        n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", So && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), So && n.parentNode.removeChild(n)
                    }
                }

                function tn(e, t) {
                    var n = $t(e, t);
                    if (n) {
                        var r = document.createDocumentFragment();
                        Pe(e, n, r), e.display.dragCursor || (e.display.dragCursor = _i("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), Ui(e.display.dragCursor, r)
                    }
                }

                function nn(e) {
                    e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
                }

                function rn(e, t) {
                    Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, go || A(e, {
                        top: t
                    }), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbars.setScrollTop(t), go && A(e), Re(e, 100))
                }

                function on(e, t, n) {
                    (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = t, w(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
                }

                function ln(e, t) {
                    var n = Xo(t),
                        r = n.x,
                        i = n.y,
                        o = e.display,
                        l = o.scroller,
                        a = l.scrollWidth > l.clientWidth,
                        s = l.scrollHeight > l.clientHeight;
                    if (r && a || i && s) {
                        if (i && Oo && wo) e: for (var c = t.target, u = o.view; c != l; c = c.parentNode)
                            for (var d = 0; d < u.length; d++)
                                if (u[d].node == c) {
                                    e.display.currentWheelTarget = c;
                                    break e
                                }
                        if (r && !go && !So && null != Ko) return i && s && rn(e, Math.max(0, Math.min(l.scrollTop + i * Ko, l.scrollHeight - l.clientHeight))), on(e, Math.max(0, Math.min(l.scrollLeft + r * Ko, l.scrollWidth - l.clientWidth))), (!i || i && s) && Tl(t), void(o.wheelStartX = null);
                        if (i && null != Ko) {
                            var h = i * Ko,
                                f = e.doc.scrollTop,
                                p = f + o.wrapper.clientHeight;
                            0 > h ? f = Math.max(0, f + h - 50) : p = Math.min(e.doc.height, p + h + 50), A(e, {
                                top: f,
                                bottom: p
                            })
                        }
                        20 > Vo && (null == o.wheelStartX ? (o.wheelStartX = l.scrollLeft, o.wheelStartY = l.scrollTop, o.wheelDX = r, o.wheelDY = i, setTimeout(function() {
                            if (null != o.wheelStartX) {
                                var e = l.scrollLeft - o.wheelStartX,
                                    t = l.scrollTop - o.wheelStartY,
                                    n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                                o.wheelStartX = o.wheelStartY = null, n && (Ko = (Ko * Vo + n) / (Vo + 1), ++Vo)
                            }
                        }, 200)) : (o.wheelDX += r, o.wheelDY += i))
                    }
                }

                function an(e, t, n) {
                    if ("string" == typeof t && (t = cl[t], !t)) return !1;
                    e.display.input.ensurePolled();
                    var r = e.display.shift,
                        i = !1;
                    try {
                        e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != Dl
                    } finally {
                        e.display.shift = r, e.state.suppressEdits = !1
                    }
                    return i
                }

                function sn(e, t, n) {
                    for (var r = 0; r < e.state.keyMaps.length; r++) {
                        var i = dl(t, e.state.keyMaps[r], n, e);
                        if (i) return i
                    }
                    return e.options.extraKeys && dl(t, e.options.extraKeys, n, e) || dl(t, e.options.keyMap, n, e)
                }

                function cn(e, t, n, r) {
                    var i = e.state.keySeq;
                    if (i) {
                        if (hl(t)) return "handled";
                        Yo.set(50, function() {
                            e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
                        }), t = i + " " + t
                    }
                    var o = sn(e, t, r);
                    return "multi" == o && (e.state.keySeq = t), "handled" == o && Si(e, "keyHandled", e, t, n), "handled" != o && "multi" != o || (Tl(n), ze(e)), i && !o && /\'$/.test(t) ? (Tl(n), !0) : !!o
                }

                function un(e, t) {
                    var n = fl(t, !0);
                    return n ? t.shiftKey && !e.state.keySeq ? cn(e, "Shift-" + n, t, function(t) {
                        return an(e, t, !0)
                    }) || cn(e, n, t, function(t) {
                        return ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) ? an(e, t) : void 0
                    }) : cn(e, n, t, function(t) {
                        return an(e, t)
                    }) : !1
                }

                function dn(e, t, n) {
                    return cn(e, "'" + n + "'", t, function(t) {
                        return an(e, t, !0)
                    })
                }

                function hn(e) {
                    var t = this;
                    if (t.curOp.focus = Gi(), !Ti(t, e)) {
                        xo && 11 > bo && 27 == e.keyCode && (e.returnValue = !1);
                        var n = e.keyCode;
                        t.display.shift = 16 == n || e.shiftKey;
                        var r = un(t, e);
                        So && (Zo = r ? n : null, !r && 88 == n && !na && (Oo ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || fn(t)
                    }
                }

                function fn(e) {
                    function t(e) {
                        18 != e.keyCode && e.altKey || (Yl(n, "CodeMirror-crosshair"), Hl(document, "keyup", t), Hl(document, "mouseover", t))
                    }
                    var n = e.display.lineDiv;
                    Zl(n, "CodeMirror-crosshair"), Al(document, "keyup", t), Al(document, "mouseover", t)
                }

                function pn(e) {
                    16 == e.keyCode && (this.doc.sel.shift = !1), Ti(this, e)
                }

                function mn(e) {
                    var t = this;
                    if (!(Gt(t.display, e) || Ti(t, e) || e.ctrlKey && !e.altKey || Oo && e.metaKey)) {
                        var n = e.keyCode,
                            r = e.charCode;
                        if (So && n == Zo) return Zo = null, void Tl(e);
                        if (!So || e.which && !(e.which < 10) || !un(t, e)) {
                            var i = String.fromCharCode(null == r ? n : r);
                            dn(t, e, i) || t.display.input.onKeyPress(e)
                        }
                    }
                }

                function gn(e) {
                    e.state.delayingBlurEvent = !0, setTimeout(function() {
                        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, yn(e))
                    }, 100)
                }

                function vn(e) {
                    e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Wl(e, "focus", e), e.state.focused = !0, Zl(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), wo && setTimeout(function() {
                        e.display.input.reset(!0)
                    }, 20)), e.display.input.receivedFocus()), ze(e))
                }

                function yn(e) {
                    e.state.delayingBlurEvent || (e.state.focused && (Wl(e, "blur", e), e.state.focused = !1, Yl(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
                        e.state.focused || (e.display.shift = !1)
                    }, 150))
                }

                function xn(e, t) {
                    Gt(e.display, t) || bn(e, t) || Ti(e, t, "contextmenu") || e.display.input.onContextMenu(t)
                }

                function bn(e, t) {
                    return Ni(e, "gutterContextMenu") ? Zt(e, t, "gutterContextMenu", !1) : !1
                }

                function wn(e, t) {
                    if (zo(e, t.from) < 0) return e;
                    if (zo(e, t.to) <= 0) return Qo(t);
                    var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                        r = e.ch;
                    return e.line == t.to.line && (r += Qo(t).ch - t.to.ch), Fo(n, r)
                }

                function kn(e, t) {
                    for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
                        var i = e.sel.ranges[r];
                        n.push(new de(wn(i.anchor, t), wn(i.head, t)))
                    }
                    return he(n, e.sel.primIndex)
                }

                function Cn(e, t, n) {
                    return e.line == t.line ? Fo(n.line, e.ch - t.ch + n.ch) : Fo(n.line + (e.line - t.line), e.ch)
                }

                function Sn(e, t, n) {
                    for (var r = [], i = Fo(e.first, 0), o = i, l = 0; l < t.length; l++) {
                        var a = t[l],
                            s = Cn(a.from, i, o),
                            c = Cn(Qo(a), i, o);
                        if (i = a.to, o = c, "around" == n) {
                            var u = e.sel.ranges[l],
                                d = zo(u.head, u.anchor) < 0;
                            r[l] = new de(d ? c : s, d ? s : c)
                        } else r[l] = new de(s, s)
                    }
                    return new ue(r, e.sel.primIndex)
                }

                function Ln(e, t, n) {
                    var r = {
                        canceled: !1,
                        from: t.from,
                        to: t.to,
                        text: t.text,
                        origin: t.origin,
                        cancel: function() {
                            this.canceled = !0
                        }
                    };
                    return n && (r.update = function(t, n, r, i) {
                        t && (this.from = me(e, t)), n && (this.to = me(e, n)), r && (this.text = r), void 0 !== i && (this.origin = i)
                    }), Wl(e, "beforeChange", e, r), e.cm && Wl(e.cm, "beforeChange", e.cm, r), r.canceled ? null : {
                        from: r.from,
                        to: r.to,
                        text: r.text,
                        origin: r.origin
                    }
                }

                function Tn(e, t, n) {
                    if (e.cm) {
                        if (!e.cm.curOp) return Ot(e.cm, Tn)(e, t, n);
                        if (e.cm.state.suppressEdits) return
                    }
                    if (!(Ni(e, "beforeChange") || e.cm && Ni(e.cm, "beforeChange")) || (t = Ln(e, t, !0))) {
                        var r = Do && !n && sr(e, t.from, t.to);
                        if (r)
                            for (var i = r.length - 1; i >= 0; --i) Mn(e, {
                                from: r[i].from,
                                to: r[i].to,
                                text: i ? [""] : t.text
                            });
                        else Mn(e, t)
                    }
                }

                function Mn(e, t) {
                    if (1 != t.text.length || "" != t.text[0] || 0 != zo(t.from, t.to)) {
                        var n = kn(e, t);
                        ci(e, t, n, e.cm ? e.cm.curOp.id : NaN), On(e, t, n, or(e, t));
                        var r = [];
                        Xr(e, function(e, n) {
                            n || -1 != Ii(r, e.history) || (xi(e.history, t), r.push(e.history)), On(e, t, null, or(e, t))
                        })
                    }
                }

                function Nn(e, t, n) {
                    if (!e.cm || !e.cm.state.suppressEdits) {
                        for (var r, i = e.history, o = e.sel, l = "undo" == t ? i.done : i.undone, a = "undo" == t ? i.undone : i.done, s = 0; s < l.length && (r = l[s], n ? !r.ranges || r.equals(e.sel) : r.ranges); s++);
                        if (s != l.length) {
                            for (i.lastOrigin = i.lastSelOrigin = null; r = l.pop(), r.ranges;) {
                                if (hi(r, a), n && !r.equals(e.sel)) return void Te(e, r, {
                                    clearRedo: !1
                                });
                                o = r
                            }
                            var c = [];
                            hi(o, a), a.push({
                                changes: c,
                                generation: i.generation
                            }), i.generation = r.generation || ++i.maxGeneration;
                            for (var u = Ni(e, "beforeChange") || e.cm && Ni(e.cm, "beforeChange"), s = r.changes.length - 1; s >= 0; --s) {
                                var d = r.changes[s];
                                if (d.origin = t, u && !Ln(e, d, !1)) return void(l.length = 0);
                                c.push(li(e, d));
                                var h = s ? kn(e, d) : Wi(l);
                                On(e, d, h, ar(e, d)), !s && e.cm && e.cm.scrollIntoView({
                                    from: d.from,
                                    to: Qo(d)
                                });
                                var f = [];
                                Xr(e, function(e, t) {
                                    t || -1 != Ii(f, e.history) || (xi(e.history, d), f.push(e.history)), On(e, d, null, ar(e, d))
                                })
                            }
                        }
                    }
                }

                function An(e, t) {
                    if (0 != t && (e.first += t, e.sel = new ue(Ei(e.sel.ranges, function(e) {
                            return new de(Fo(e.anchor.line + t, e.anchor.ch), Fo(e.head.line + t, e.head.ch))
                        }), e.sel.primIndex), e.cm)) {
                        Dt(e.cm, e.first, e.first - t, t);
                        for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) Pt(e.cm, r, "gutter")
                    }
                }

                function On(e, t, n, r) {
                    if (e.cm && !e.cm.curOp) return Ot(e.cm, On)(e, t, n, r);
                    if (t.to.line < e.first) return void An(e, t.text.length - 1 - (t.to.line - t.from.line));
                    if (!(t.from.line > e.lastLine())) {
                        if (t.from.line < e.first) {
                            var i = t.text.length - 1 - (e.first - t.from.line);
                            An(e, i), t = {
                                from: Fo(e.first, 0),
                                to: Fo(t.to.line + i, t.to.ch),
                                text: [Wi(t.text)],
                                origin: t.origin
                            }
                        }
                        var o = e.lastLine();
                        t.to.line > o && (t = {
                            from: t.from,
                            to: Fo(o, Zr(e, o).text.length),
                            text: [t.text[0]],
                            origin: t.origin
                        }), t.removed = Qr(e, t.from, t.to), n || (n = kn(e, t)), e.cm ? Hn(e.cm, t, r) : $r(e, t, r), Me(e, n, Pl)
                    }
                }

                function Hn(e, t, n) {
                    var r = e.doc,
                        i = e.display,
                        l = t.from,
                        a = t.to,
                        s = !1,
                        c = l.line;
                    e.options.lineWrapping || (c = ti(yr(Zr(r, l.line))), r.iter(c, a.line + 1, function(e) {
                        return e == i.maxLine ? (s = !0, !0) : void 0
                    })), r.sel.contains(t.from, t.to) > -1 && Mi(e), $r(r, t, n, o(e)), e.options.lineWrapping || (r.iter(c, l.line + t.text.length, function(e) {
                        var t = d(e);
                        t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, s = !1)
                    }), s && (e.curOp.updateMaxLine = !0)), r.frontier = Math.min(r.frontier, l.line), Re(e, 400);
                    var u = t.text.length - (a.line - l.line) - 1;
                    t.full ? Dt(e) : l.line != a.line || 1 != t.text.length || Gr(e.doc, t) ? Dt(e, l.line, a.line + 1, u) : Pt(e, l.line, "text");
                    var h = Ni(e, "changes"),
                        f = Ni(e, "change");
                    if (f || h) {
                        var p = {
                            from: l,
                            to: a,
                            text: t.text,
                            removed: t.removed,
                            origin: t.origin
                        };
                        f && Si(e, "change", e, p), h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(p)
                    }
                    e.display.selForContextMenu = null
                }

                function Wn(e, t, n, r, i) {
                    if (r || (r = n), zo(r, n) < 0) {
                        var o = r;
                        r = n, n = o
                    }
                    "string" == typeof t && (t = e.splitLines(t)), Tn(e, {
                        from: n,
                        to: r,
                        text: t,
                        origin: i
                    })
                }

                function In(e, t) {
                    if (!Ti(e, "scrollCursorIntoView")) {
                        var n = e.display,
                            r = n.sizer.getBoundingClientRect(),
                            i = null;
                        if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !Mo) {
                            var o = _i("div", "​", null, "position: absolute; top: " + (t.top - n.viewOffset - qe(e.display)) + "px; height: " + (t.bottom - t.top + $e(e) + n.barHeight) + "px; left: " + t.left + "px; width: 2px;");
                            e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
                        }
                    }
                }

                function En(e, t, n, r) {
                    null == r && (r = 0);
                    for (var i = 0; 5 > i; i++) {
                        var o = !1,
                            l = ft(e, t),
                            a = n && n != t ? ft(e, n) : l,
                            s = Pn(e, Math.min(l.left, a.left), Math.min(l.top, a.top) - r, Math.max(l.left, a.left), Math.max(l.bottom, a.bottom) + r),
                            c = e.doc.scrollTop,
                            u = e.doc.scrollLeft;
                        if (null != s.scrollTop && (rn(e, s.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (o = !0)), null != s.scrollLeft && (on(e, s.scrollLeft), Math.abs(e.doc.scrollLeft - u) > 1 && (o = !0)), !o) break
                    }
                    return l
                }

                function Dn(e, t, n, r, i) {
                    var o = Pn(e, t, n, r, i);
                    null != o.scrollTop && rn(e, o.scrollTop), null != o.scrollLeft && on(e, o.scrollLeft)
                }

                function Pn(e, t, n, r, i) {
                    var o = e.display,
                        l = yt(e.display);
                    0 > n && (n = 0);
                    var a = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop,
                        s = Ke(e),
                        c = {};
                    i - n > s && (i = n + s);
                    var u = e.doc.height + Ue(o),
                        d = l > n,
                        h = i > u - l;
                    if (a > n) c.scrollTop = d ? 0 : n;
                    else if (i > a + s) {
                        var f = Math.min(n, (h ? u : i) - s);
                        f != a && (c.scrollTop = f)
                    }
                    var p = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft,
                        m = Ve(e) - (e.options.fixedGutter ? o.gutters.offsetWidth : 0),
                        g = r - t > m;
                    return g && (r = t + m), 10 > t ? c.scrollLeft = 0 : p > t ? c.scrollLeft = Math.max(0, t - (g ? 0 : 10)) : r > m + p - 3 && (c.scrollLeft = r + (g ? 0 : 10) - m), c
                }

                function Fn(e, t, n) {
                    null == t && null == n || Rn(e), null != t && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + t), null != n && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + n)
                }

                function zn(e) {
                    Rn(e);
                    var t = e.getCursor(),
                        n = t,
                        r = t;
                    e.options.lineWrapping || (n = t.ch ? Fo(t.line, t.ch - 1) : t, r = Fo(t.line, t.ch + 1)), e.curOp.scrollToPos = {
                        from: n,
                        to: r,
                        margin: e.options.cursorScrollMargin,
                        isCursor: !0
                    }
                }

                function Rn(e) {
                    var t = e.curOp.scrollToPos;
                    if (t) {
                        e.curOp.scrollToPos = null;
                        var n = pt(e, t.from),
                            r = pt(e, t.to),
                            i = Pn(e, Math.min(n.left, r.left), Math.min(n.top, r.top) - t.margin, Math.max(n.right, r.right), Math.max(n.bottom, r.bottom) + t.margin);
                        e.scrollTo(i.scrollLeft, i.scrollTop)
                    }
                }

                function Bn(e, t, n, r) {
                    var i, o = e.doc;
                    null == n && (n = "add"), "smart" == n && (o.mode.indent ? i = _e(e, t) : n = "prev");
                    var l = e.options.tabSize,
                        a = Zr(o, t),
                        s = Rl(a.text, null, l);
                    a.stateAfter && (a.stateAfter = null);
                    var c, u = a.text.match(/^\s*/)[0];
                    if (r || /\S/.test(a.text)) {
                        if ("smart" == n && (c = o.mode.indent(i, a.text.slice(u.length), a.text), c == Dl || c > 150)) {
                            if (!r) return;
                            n = "prev"
                        }
                    } else c = 0, n = "not";
                    "prev" == n ? c = t > o.first ? Rl(Zr(o, t - 1).text, null, l) : 0 : "add" == n ? c = s + e.options.indentUnit : "subtract" == n ? c = s - e.options.indentUnit : "number" == typeof n && (c = s + n), c = Math.max(0, c);
                    var d = "",
                        h = 0;
                    if (e.options.indentWithTabs)
                        for (var f = Math.floor(c / l); f; --f) h += l, d += "	";
                    if (c > h && (d += Hi(c - h)), d != u) return Wn(o, d, Fo(t, 0), Fo(t, u.length), "+input"), a.stateAfter = null, !0;
                    for (var f = 0; f < o.sel.ranges.length; f++) {
                        var p = o.sel.ranges[f];
                        if (p.head.line == t && p.head.ch < u.length) {
                            var h = Fo(t, u.length);
                            ke(o, f, new de(h, h));
                            break
                        }
                    }
                }

                function jn(e, t, n, r) {
                    var i = t,
                        o = t;
                    return "number" == typeof t ? o = Zr(e, pe(e, t)) : i = ti(t), null == i ? null : (r(o, i) && e.cm && Pt(e.cm, i, n), o)
                }

                function _n(e, t) {
                    for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
                        for (var o = t(n[i]); r.length && zo(o.from, Wi(r).to) <= 0;) {
                            var l = r.pop();
                            if (zo(l.from, o.from) < 0) {
                                o.from = l.from;
                                break
                            }
                        }
                        r.push(o)
                    }
                    At(e, function() {
                        for (var t = r.length - 1; t >= 0; t--) Wn(e.doc, "", r[t].from, r[t].to, "+delete");
                        zn(e)
                    })
                }

                function qn(e, t, n, r, i) {
                    function o() {
                        var t = a + n;
                        return t < e.first || t >= e.first + e.size ? !1 : (a = t, u = Zr(e, t))
                    }

                    function l(e) {
                        var t = (i ? ho : fo)(u, s, n, !0);
                        if (null == t) {
                            if (e || !o()) return !1;
                            s = i ? (0 > n ? io : ro)(u) : 0 > n ? u.text.length : 0
                        } else s = t;
                        return !0
                    }
                    var a = t.line,
                        s = t.ch,
                        c = n,
                        u = Zr(e, a);
                    if ("char" == r) l();
                    else if ("column" == r) l(!0);
                    else if ("word" == r || "group" == r)
                        for (var d = null, h = "group" == r, f = e.cm && e.cm.getHelper(t, "wordChars"), p = !0; !(0 > n) || l(!p); p = !1) {
                            var m = u.text.charAt(s) || "\n",
                                g = Ri(m, f) ? "w" : h && "\n" == m ? "n" : !h || /\s/.test(m) ? null : "p";
                            if (!h || p || g || (g = "s"), d && d != g) {
                                0 > n && (n = 1, l());
                                break
                            }
                            if (g && (d = g), n > 0 && !l(!p)) break
                        }
                    var v = We(e, Fo(a, s), t, c, !0);
                    return zo(t, v) || (v.hitSide = !0), v
                }

                function Un(e, t, n, r) {
                    var i, o = e.doc,
                        l = t.left;
                    if ("page" == r) {
                        var a = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
                        i = t.top + n * (a - (0 > n ? 1.5 : .5) * yt(e.display))
                    } else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
                    for (;;) {
                        var s = gt(e, l, i);
                        if (!s.outside) break;
                        if (0 > n ? 0 >= i : i >= o.height) {
                            s.hitSide = !0;
                            break
                        }
                        i += 5 * n
                    }
                    return s
                }

                function Gn(t, n, r, i) {
                    e.defaults[t] = n, r && (el[t] = i ? function(e, t, n) {
                        n != tl && r(e, t, n)
                    } : r)
                }

                function $n(e) {
                    for (var t, n, r, i, o = e.split(/-(?!$)/), e = o[o.length - 1], l = 0; l < o.length - 1; l++) {
                        var a = o[l];
                        if (/^(cmd|meta|m)$/i.test(a)) i = !0;
                        else if (/^a(lt)?$/i.test(a)) t = !0;
                        else if (/^(c|ctrl|control)$/i.test(a)) n = !0;
                        else {
                            if (!/^s(hift)$/i.test(a)) throw new Error("Unrecognized modifier name: " + a);
                            r = !0
                        }
                    }
                    return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e), e
                }

                function Vn(e) {
                    return "string" == typeof e ? ul[e] : e
                }

                function Kn(e, t, n, r, i) {
                    if (r && r.shared) return Xn(e, t, n, r, i);
                    if (e.cm && !e.cm.curOp) return Ot(e.cm, Kn)(e, t, n, r, i);
                    var o = new gl(e, i),
                        l = zo(t, n);
                    if (r && Fi(r, o, !1), l > 0 || 0 == l && o.clearWhenEmpty !== !1) return o;
                    if (o.replacedWith && (o.collapsed = !0, o.widgetNode = _i("span", [o.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
                        if (vr(e, t.line, t, n, o) || t.line != n.line && vr(e, n.line, t, n, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
                        Po = !0
                    }
                    o.addToHistory && ci(e, {
                        from: t,
                        to: n,
                        origin: "markText"
                    }, e.sel, NaN);
                    var a, s = t.line,
                        c = e.cm;
                    if (e.iter(s, n.line + 1, function(e) {
                            c && o.collapsed && !c.options.lineWrapping && yr(e) == c.display.maxLine && (a = !0), o.collapsed && s != t.line && ei(e, 0), nr(e, new Jn(o, s == t.line ? t.ch : null, s == n.line ? n.ch : null)), ++s
                        }), o.collapsed && e.iter(t.line, n.line + 1, function(t) {
                            kr(e, t) && ei(t, 0)
                        }), o.clearOnEnter && Al(o, "beforeCursorEnter", function() {
                            o.clear()
                        }), o.readOnly && (Do = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++ml, o.atomic = !0), c) {
                        if (a && (c.curOp.updateMaxLine = !0), o.collapsed) Dt(c, t.line, n.line + 1);
                        else if (o.className || o.title || o.startStyle || o.endStyle || o.css)
                            for (var u = t.line; u <= n.line; u++) Pt(c, u, "text");
                        o.atomic && Ae(c.doc), Si(c, "markerAdded", c, o)
                    }
                    return o
                }

                function Xn(e, t, n, r, i) {
                    r = Fi(r), r.shared = !1;
                    var o = [Kn(e, t, n, r, i)],
                        l = o[0],
                        a = r.widgetNode;
                    return Xr(e, function(e) {
                        a && (r.widgetNode = a.cloneNode(!0)), o.push(Kn(e, me(e, t), me(e, n), r, i));
                        for (var s = 0; s < e.linked.length; ++s)
                            if (e.linked[s].isParent) return;
                        l = Wi(o)
                    }), new vl(o, l)
                }

                function Yn(e) {
                    return e.findMarks(Fo(e.first, 0), e.clipPos(Fo(e.lastLine())), function(e) {
                        return e.parent
                    })
                }

                function Zn(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n],
                            i = r.find(),
                            o = e.clipPos(i.from),
                            l = e.clipPos(i.to);
                        if (zo(o, l)) {
                            var a = Kn(e, o, l, r.primary, r.primary.type);
                            r.markers.push(a), a.parent = r
                        }
                    }
                }

                function Qn(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t],
                            r = [n.primary.doc];
                        Xr(n.primary.doc, function(e) {
                            r.push(e)
                        });
                        for (var i = 0; i < n.markers.length; i++) {
                            var o = n.markers[i]; - 1 == Ii(r, o.doc) && (o.parent = null, n.markers.splice(i--, 1))
                        }
                    }
                }

                function Jn(e, t, n) {
                    this.marker = e, this.from = t, this.to = n
                }

                function er(e, t) {
                    if (e)
                        for (var n = 0; n < e.length; ++n) {
                            var r = e[n];
                            if (r.marker == t) return r
                        }
                }

                function tr(e, t) {
                    for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r]);
                    return n
                }

                function nr(e, t) {
                    e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
                }

                function rr(e, t, n) {
                    if (e)
                        for (var r, i = 0; i < e.length; ++i) {
                            var o = e[i],
                                l = o.marker,
                                a = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                            if (a || o.from == t && "bookmark" == l.type && (!n || !o.marker.insertLeft)) {
                                var s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                                (r || (r = [])).push(new Jn(l, o.from, s ? null : o.to))
                            }
                        }
                    return r
                }

                function ir(e, t, n) {
                    if (e)
                        for (var r, i = 0; i < e.length; ++i) {
                            var o = e[i],
                                l = o.marker,
                                a = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                            if (a || o.from == t && "bookmark" == l.type && (!n || o.marker.insertLeft)) {
                                var s = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                                (r || (r = [])).push(new Jn(l, s ? null : o.from - t, null == o.to ? null : o.to - t))
                            }
                        }
                    return r
                }

                function or(e, t) {
                    if (t.full) return null;
                    var n = ve(e, t.from.line) && Zr(e, t.from.line).markedSpans,
                        r = ve(e, t.to.line) && Zr(e, t.to.line).markedSpans;
                    if (!n && !r) return null;
                    var i = t.from.ch,
                        o = t.to.ch,
                        l = 0 == zo(t.from, t.to),
                        a = rr(n, i, l),
                        s = ir(r, o, l),
                        c = 1 == t.text.length,
                        u = Wi(t.text).length + (c ? i : 0);
                    if (a)
                        for (var d = 0; d < a.length; ++d) {
                            var h = a[d];
                            if (null == h.to) {
                                var f = er(s, h.marker);
                                f ? c && (h.to = null == f.to ? null : f.to + u) : h.to = i
                            }
                        }
                    if (s)
                        for (var d = 0; d < s.length; ++d) {
                            var h = s[d];
                            if (null != h.to && (h.to += u), null == h.from) {
                                var f = er(a, h.marker);
                                f || (h.from = u, c && (a || (a = [])).push(h))
                            } else h.from += u, c && (a || (a = [])).push(h)
                        }
                    a && (a = lr(a)), s && s != a && (s = lr(s));
                    var p = [a];
                    if (!c) {
                        var m, g = t.text.length - 2;
                        if (g > 0 && a)
                            for (var d = 0; d < a.length; ++d) null == a[d].to && (m || (m = [])).push(new Jn(a[d].marker, null, null));
                        for (var d = 0; g > d; ++d) p.push(m);
                        p.push(s)
                    }
                    return p
                }

                function lr(e) {
                    for (var t = 0; t < e.length; ++t) {
                        var n = e[t];
                        null != n.from && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1)
                    }
                    return e.length ? e : null
                }

                function ar(e, t) {
                    var n = mi(e, t),
                        r = or(e, t);
                    if (!n) return r;
                    if (!r) return n;
                    for (var i = 0; i < n.length; ++i) {
                        var o = n[i],
                            l = r[i];
                        if (o && l) e: for (var a = 0; a < l.length; ++a) {
                            for (var s = l[a], c = 0; c < o.length; ++c)
                                if (o[c].marker == s.marker) continue e;
                            o.push(s)
                        } else l && (n[i] = l)
                    }
                    return n
                }

                function sr(e, t, n) {
                    var r = null;
                    if (e.iter(t.line, n.line + 1, function(e) {
                            if (e.markedSpans)
                                for (var t = 0; t < e.markedSpans.length; ++t) {
                                    var n = e.markedSpans[t].marker;
                                    !n.readOnly || r && -1 != Ii(r, n) || (r || (r = [])).push(n)
                                }
                        }), !r) return null;
                    for (var i = [{
                            from: t,
                            to: n
                        }], o = 0; o < r.length; ++o)
                        for (var l = r[o], a = l.find(0), s = 0; s < i.length; ++s) {
                            var c = i[s];
                            if (!(zo(c.to, a.from) < 0 || zo(c.from, a.to) > 0)) {
                                var u = [s, 1],
                                    d = zo(c.from, a.from),
                                    h = zo(c.to, a.to);
                                (0 > d || !l.inclusiveLeft && !d) && u.push({
                                    from: c.from,
                                    to: a.from
                                }), (h > 0 || !l.inclusiveRight && !h) && u.push({
                                    from: a.to,
                                    to: c.to
                                }), i.splice.apply(i, u), s += u.length - 1
                            }
                        }
                    return i
                }

                function cr(e) {
                    var t = e.markedSpans;
                    if (t) {
                        for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
                        e.markedSpans = null
                    }
                }

                function ur(e, t) {
                    if (t) {
                        for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
                        e.markedSpans = t
                    }
                }

                function dr(e) {
                    return e.inclusiveLeft ? -1 : 0
                }

                function hr(e) {
                    return e.inclusiveRight ? 1 : 0
                }

                function fr(e, t) {
                    var n = e.lines.length - t.lines.length;
                    if (0 != n) return n;
                    var r = e.find(),
                        i = t.find(),
                        o = zo(r.from, i.from) || dr(e) - dr(t);
                    if (o) return -o;
                    var l = zo(r.to, i.to) || hr(e) - hr(t);
                    return l ? l : t.id - e.id
                }

                function pr(e, t) {
                    var n, r = Po && e.markedSpans;
                    if (r)
                        for (var i, o = 0; o < r.length; ++o) i = r[o], i.marker.collapsed && null == (t ? i.from : i.to) && (!n || fr(n, i.marker) < 0) && (n = i.marker);
                    return n
                }

                function mr(e) {
                    return pr(e, !0)
                }

                function gr(e) {
                    return pr(e, !1)
                }

                function vr(e, t, n, r, i) {
                    var o = Zr(e, t),
                        l = Po && o.markedSpans;
                    if (l)
                        for (var a = 0; a < l.length; ++a) {
                            var s = l[a];
                            if (s.marker.collapsed) {
                                var c = s.marker.find(0),
                                    u = zo(c.from, n) || dr(s.marker) - dr(i),
                                    d = zo(c.to, r) || hr(s.marker) - hr(i);
                                if (!(u >= 0 && 0 >= d || 0 >= u && d >= 0) && (0 >= u && (zo(c.to, n) > 0 || s.marker.inclusiveRight && i.inclusiveLeft) || u >= 0 && (zo(c.from, r) < 0 || s.marker.inclusiveLeft && i.inclusiveRight))) return !0
                            }
                        }
                }

                function yr(e) {
                    for (var t; t = mr(e);) e = t.find(-1, !0).line;
                    return e
                }

                function xr(e) {
                    for (var t, n; t = gr(e);) e = t.find(1, !0).line, (n || (n = [])).push(e);
                    return n
                }

                function br(e, t) {
                    var n = Zr(e, t),
                        r = yr(n);
                    return n == r ? t : ti(r)
                }

                function wr(e, t) {
                    if (t > e.lastLine()) return t;
                    var n, r = Zr(e, t);
                    if (!kr(e, r)) return t;
                    for (; n = gr(r);) r = n.find(1, !0).line;
                    return ti(r) + 1
                }

                function kr(e, t) {
                    var n = Po && t.markedSpans;
                    if (n)
                        for (var r, i = 0; i < n.length; ++i)
                            if (r = n[i], r.marker.collapsed) {
                                if (null == r.from) return !0;
                                if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && Cr(e, t, r)) return !0
                            }
                }

                function Cr(e, t, n) {
                    if (null == n.to) {
                        var r = n.marker.find(1, !0);
                        return Cr(e, r.line, er(r.line.markedSpans, n.marker))
                    }
                    if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
                    for (var i, o = 0; o < t.markedSpans.length; ++o)
                        if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && Cr(e, t, i)) return !0
                }

                function Sr(e, t, n) {
                    ri(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Fn(e, null, n)
                }

                function Lr(e) {
                    if (null != e.height) return e.height;
                    var t = e.doc.cm;
                    if (!t) return 0;
                    if (!Vl(document.body, e.node)) {
                        var n = "position: relative;";
                        e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), Ui(t.display.measure, _i("div", [e.node], null, n))
                    }
                    return e.height = e.node.parentNode.offsetHeight
                }

                function Tr(e, t, n, r) {
                    var i = new yl(e, n, r),
                        o = e.cm;
                    return o && i.noHScroll && (o.display.alignWidgets = !0), jn(e, t, "widget", function(t) {
                        var n = t.widgets || (t.widgets = []);
                        if (null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !kr(e, t)) {
                            var r = ri(t) < e.scrollTop;
                            ei(t, t.height + Lr(i)), r && Fn(o, null, i.height), o.curOp.forceUpdate = !0
                        }
                        return !0
                    }), i
                }

                function Mr(e, t, n, r) {
                    e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), cr(e), ur(e, n);
                    var i = r ? r(e) : 1;
                    i != e.height && ei(e, i)
                }

                function Nr(e) {
                    e.parent = null, cr(e)
                }

                function Ar(e, t) {
                    if (e)
                        for (;;) {
                            var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                            if (!n) break;
                            e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                            var r = n[1] ? "bgClass" : "textClass";
                            null == t[r] ? t[r] = n[2] : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + n[2])
                        }
                    return e
                }

                function Or(t, n) {
                    if (t.blankLine) return t.blankLine(n);
                    if (t.innerMode) {
                        var r = e.innerMode(t, n);
                        return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0
                    }
                }

                function Hr(t, n, r, i) {
                    for (var o = 0; 10 > o; o++) {
                        i && (i[0] = e.innerMode(t, r).mode);
                        var l = t.token(n, r);
                        if (n.pos > n.start) return l
                    }
                    throw new Error("Mode " + t.name + " failed to advance stream.")
                }

                function Wr(e, t, n, r) {
                    function i(e) {
                        return {
                            start: d.start,
                            end: d.pos,
                            string: d.current(),
                            type: o || null,
                            state: e ? al(l.mode, u) : u
                        }
                    }
                    var o, l = e.doc,
                        a = l.mode;
                    t = me(l, t);
                    var s, c = Zr(l, t.line),
                        u = _e(e, t.line, n),
                        d = new pl(c.text, e.options.tabSize);
                    for (r && (s = []);
                        (r || d.pos < t.ch) && !d.eol();) d.start = d.pos, o = Hr(a, d, u), r && s.push(i(!0));
                    return r ? s : i()
                }

                function Ir(e, t, n, r, i, o, l) {
                    var a = n.flattenSpans;
                    null == a && (a = e.options.flattenSpans);
                    var s, c = 0,
                        u = null,
                        d = new pl(t, e.options.tabSize),
                        h = e.options.addModeClass && [null];
                    for ("" == t && Ar(Or(n, r), o); !d.eol();) {
                        if (d.pos > e.options.maxHighlightLength ? (a = !1, l && Pr(e, t, r, d.pos), d.pos = t.length, s = null) : s = Ar(Hr(n, d, r, h), o), h) {
                            var f = h[0].name;
                            f && (s = "m-" + (s ? f + " " + s : f))
                        }
                        if (!a || u != s) {
                            for (; c < d.start;) c = Math.min(d.start, c + 5e4), i(c, u);
                            u = s
                        }
                        d.start = d.pos
                    }
                    for (; c < d.pos;) {
                        var p = Math.min(d.pos, c + 5e4);
                        i(p, u), c = p
                    }
                }

                function Er(e, t, n, r) {
                    var i = [e.state.modeGen],
                        o = {};
                    Ir(e, t.text, e.doc.mode, n, function(e, t) {
                        i.push(e, t)
                    }, o, r);
                    for (var l = 0; l < e.state.overlays.length; ++l) {
                        var a = e.state.overlays[l],
                            s = 1,
                            c = 0;
                        Ir(e, t.text, a.mode, !0, function(e, t) {
                            for (var n = s; e > c;) {
                                var r = i[s];
                                r > e && i.splice(s, 1, e, i[s + 1], r), s += 2, c = Math.min(e, r)
                            }
                            if (t)
                                if (a.opaque) i.splice(n, s - n, e, "cm-overlay " + t), s = n + 2;
                                else
                                    for (; s > n; n += 2) {
                                        var o = i[n + 1];
                                        i[n + 1] = (o ? o + " " : "") + "cm-overlay " + t
                                    }
                        }, o)
                    }
                    return {
                        styles: i,
                        classes: o.bgClass || o.textClass ? o : null
                    }
                }

                function Dr(e, t, n) {
                    if (!t.styles || t.styles[0] != e.state.modeGen) {
                        var r = _e(e, ti(t)),
                            i = Er(e, t, t.text.length > e.options.maxHighlightLength ? al(e.doc.mode, r) : r);
                        t.stateAfter = r, t.styles = i.styles, i.classes ? t.styleClasses = i.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.frontier && e.doc.frontier++
                    }
                    return t.styles
                }

                function Pr(e, t, n, r) {
                    var i = e.doc.mode,
                        o = new pl(t, e.options.tabSize);
                    for (o.start = o.pos = r || 0, "" == t && Or(i, n); !o.eol();) Hr(i, o, n), o.start = o.pos
                }

                function Fr(e, t) {
                    if (!e || /^\s*$/.test(e)) return null;
                    var n = t.addModeClass ? wl : bl;
                    return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
                }

                function zr(e, t) {
                    var n = _i("span", null, null, wo ? "padding-right: .1px" : null),
                        r = {
                            pre: _i("pre", [n], "CodeMirror-line"),
                            content: n,
                            col: 0,
                            pos: 0,
                            cm: e,
                            splitSpaces: (xo || wo) && e.getOption("lineWrapping")
                        };
                    t.measure = {};
                    for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
                        var o, l = i ? t.rest[i - 1] : t.line;
                        r.pos = 0, r.addToken = Br, Qi(e.display.measure) && (o = ii(l)) && (r.addToken = _r(r.addToken, o)), r.map = [];
                        var a = t != e.display.externalMeasured && ti(l);
                        Ur(l, r, Dr(e, l, a)), l.styleClasses && (l.styleClasses.bgClass && (r.bgClass = Vi(l.styleClasses.bgClass, r.bgClass || "")), l.styleClasses.textClass && (r.textClass = Vi(l.styleClasses.textClass, r.textClass || ""))), 0 == r.map.length && r.map.push(0, 0, r.content.appendChild(Zi(e.display.measure))), 0 == i ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}))
                    }
                    return wo && /\bcm-tab\b/.test(r.content.lastChild.className) && (r.content.className = "cm-tab-wrap-hack"), Wl(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = Vi(r.pre.className, r.textClass || "")), r
                }

                function Rr(e) {
                    var t = _i("span", "•", "cm-invalidchar");
                    return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
                }

                function Br(e, t, n, r, i, o, l) {
                    if (t) {
                        var a = e.splitSpaces ? t.replace(/ {3,}/g, jr) : t,
                            s = e.cm.state.specialChars,
                            c = !1;
                        if (s.test(t))
                            for (var u = document.createDocumentFragment(), d = 0;;) {
                                s.lastIndex = d;
                                var h = s.exec(t),
                                    f = h ? h.index - d : t.length - d;
                                if (f) {
                                    var p = document.createTextNode(a.slice(d, d + f));
                                    xo && 9 > bo ? u.appendChild(_i("span", [p])) : u.appendChild(p), e.map.push(e.pos, e.pos + f, p), e.col += f, e.pos += f
                                }
                                if (!h) break;
                                if (d += f + 1, "	" == h[0]) {
                                    var m = e.cm.options.tabSize,
                                        g = m - e.col % m,
                                        p = u.appendChild(_i("span", Hi(g), "cm-tab"));
                                    p.setAttribute("role", "presentation"), p.setAttribute("cm-text", "	"), e.col += g
                                } else if ("\r" == h[0] || "\n" == h[0]) {
                                    var p = u.appendChild(_i("span", "\r" == h[0] ? "␍" : "␤", "cm-invalidchar"));
                                    p.setAttribute("cm-text", h[0]), e.col += 1
                                } else {
                                    var p = e.cm.options.specialCharPlaceholder(h[0]);
                                    p.setAttribute("cm-text", h[0]), xo && 9 > bo ? u.appendChild(_i("span", [p])) : u.appendChild(p), e.col += 1
                                }
                                e.map.push(e.pos, e.pos + 1, p), e.pos++
                            } else {
                                e.col += t.length;
                                var u = document.createTextNode(a);
                                e.map.push(e.pos, e.pos + t.length, u), xo && 9 > bo && (c = !0), e.pos += t.length
                            }
                        if (n || r || i || c || l) {
                            var v = n || "";
                            r && (v += r), i && (v += i);
                            var y = _i("span", [u], v, l);
                            return o && (y.title = o), e.content.appendChild(y)
                        }
                        e.content.appendChild(u)
                    }
                }

                function jr(e) {
                    for (var t = " ", n = 0; n < e.length - 2; ++n) t += n % 2 ? " " : " ";
                    return t += " "
                }

                function _r(e, t) {
                    return function(n, r, i, o, l, a, s) {
                        i = i ? i + " cm-force-border" : "cm-force-border";
                        for (var c = n.pos, u = c + r.length;;) {
                            for (var d = 0; d < t.length; d++) {
                                var h = t[d];
                                if (h.to > c && h.from <= c) break
                            }
                            if (h.to >= u) return e(n, r, i, o, l, a, s);
                            e(n, r.slice(0, h.to - c), i, o, null, a, s), o = null, r = r.slice(h.to - c), c = h.to
                        }
                    }
                }

                function qr(e, t, n, r) {
                    var i = !r && n.widgetNode;
                    i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t
                }

                function Ur(e, t, n) {
                    var r = e.markedSpans,
                        i = e.text,
                        o = 0;
                    if (r)
                        for (var l, a, s, c, u, d, h, f = i.length, p = 0, m = 1, g = "", v = 0;;) {
                            if (v == p) {
                                s = c = u = d = a = "", h = null, v = 1 / 0;
                                for (var y, x = [], b = 0; b < r.length; ++b) {
                                    var w = r[b],
                                        k = w.marker;
                                    "bookmark" == k.type && w.from == p && k.widgetNode ? x.push(k) : w.from <= p && (null == w.to || w.to > p || k.collapsed && w.to == p && w.from == p) ? (null != w.to && w.to != p && v > w.to && (v = w.to, c = ""), k.className && (s += " " + k.className), k.css && (a = (a ? a + ";" : "") + k.css), k.startStyle && w.from == p && (u += " " + k.startStyle), k.endStyle && w.to == v && (y || (y = [])).push(k.endStyle, w.to), k.title && !d && (d = k.title), k.collapsed && (!h || fr(h.marker, k) < 0) && (h = w)) : w.from > p && v > w.from && (v = w.from)
                                }
                                if (y)
                                    for (var b = 0; b < y.length; b += 2) y[b + 1] == v && (c += " " + y[b]);
                                if (!h || h.from == p)
                                    for (var b = 0; b < x.length; ++b) qr(t, 0, x[b]);
                                if (h && (h.from || 0) == p) {
                                    if (qr(t, (null == h.to ? f + 1 : h.to) - p, h.marker, null == h.from), null == h.to) return;
                                    h.to == p && (h = !1)
                                }
                            }
                            if (p >= f) break;
                            for (var C = Math.min(f, v);;) {
                                if (g) {
                                    var S = p + g.length;
                                    if (!h) {
                                        var L = S > C ? g.slice(0, C - p) : g;
                                        t.addToken(t, L, l ? l + s : s, u, p + L.length == v ? c : "", d, a)
                                    }
                                    if (S >= C) {
                                        g = g.slice(C - p), p = C;
                                        break
                                    }
                                    p = S, u = ""
                                }
                                g = i.slice(o, o = n[m++]), l = Fr(n[m++], t.cm.options)
                            }
                        } else
                            for (var m = 1; m < n.length; m += 2) t.addToken(t, i.slice(o, o = n[m]), Fr(n[m + 1], t.cm.options))
                }

                function Gr(e, t) {
                    return 0 == t.from.ch && 0 == t.to.ch && "" == Wi(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
                }

                function $r(e, t, n, r) {
                    function i(e) {
                        return n ? n[e] : null
                    }

                    function o(e, n, i) {
                        Mr(e, n, i, r), Si(e, "change", e, t)
                    }

                    function l(e, t) {
                        for (var n = e, o = []; t > n; ++n) o.push(new xl(c[n], i(n), r));
                        return o
                    }
                    var a = t.from,
                        s = t.to,
                        c = t.text,
                        u = Zr(e, a.line),
                        d = Zr(e, s.line),
                        h = Wi(c),
                        f = i(c.length - 1),
                        p = s.line - a.line;
                    if (t.full) e.insert(0, l(0, c.length)), e.remove(c.length, e.size - c.length);
                    else if (Gr(e, t)) {
                        var m = l(0, c.length - 1);
                        o(d, d.text, f), p && e.remove(a.line, p), m.length && e.insert(a.line, m)
                    } else if (u == d)
                        if (1 == c.length) o(u, u.text.slice(0, a.ch) + h + u.text.slice(s.ch), f);
                        else {
                            var m = l(1, c.length - 1);
                            m.push(new xl(h + u.text.slice(s.ch), f, r)), o(u, u.text.slice(0, a.ch) + c[0], i(0)), e.insert(a.line + 1, m)
                        }
                    else if (1 == c.length) o(u, u.text.slice(0, a.ch) + c[0] + d.text.slice(s.ch), i(0)), e.remove(a.line + 1, p);
                    else {
                        o(u, u.text.slice(0, a.ch) + c[0], i(0)), o(d, h + d.text.slice(s.ch), f);
                        var m = l(1, c.length - 1);
                        p > 1 && e.remove(a.line + 1, p - 1), e.insert(a.line + 1, m)
                    }
                    Si(e, "change", e, t)
                }

                function Vr(e) {
                    this.lines = e, this.parent = null;
                    for (var t = 0, n = 0; t < e.length; ++t) e[t].parent = this, n += e[t].height;
                    this.height = n
                }

                function Kr(e) {
                    this.children = e;
                    for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
                        var i = e[r];
                        t += i.chunkSize(), n += i.height, i.parent = this
                    }
                    this.size = t, this.height = n, this.parent = null
                }

                function Xr(e, t, n) {
                    function r(e, i, o) {
                        if (e.linked)
                            for (var l = 0; l < e.linked.length; ++l) {
                                var a = e.linked[l];
                                if (a.doc != i) {
                                    var s = o && a.sharedHist;
                                    n && !s || (t(a.doc, s), r(a.doc, e, s))
                                }
                            }
                    }
                    r(e, null, !0)
                }

                function Yr(e, t) {
                    if (t.cm) throw new Error("This document is already in use.");
                    e.doc = t, t.cm = e, l(e), n(e), e.options.lineWrapping || h(e), e.options.mode = t.modeOption, Dt(e)
                }

                function Zr(e, t) {
                    if (t -= e.first, 0 > t || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
                    for (var n = e; !n.lines;)
                        for (var r = 0;; ++r) {
                            var i = n.children[r],
                                o = i.chunkSize();
                            if (o > t) {
                                n = i;
                                break
                            }
                            t -= o
                        }
                    return n.lines[t]
                }

                function Qr(e, t, n) {
                    var r = [],
                        i = t.line;
                    return e.iter(t.line, n.line + 1, function(e) {
                        var o = e.text;
                        i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i
                    }), r
                }

                function Jr(e, t, n) {
                    var r = [];
                    return e.iter(t, n, function(e) {
                        r.push(e.text)
                    }), r
                }

                function ei(e, t) {
                    var n = t - e.height;
                    if (n)
                        for (var r = e; r; r = r.parent) r.height += n
                }

                function ti(e) {
                    if (null == e.parent) return null;
                    for (var t = e.parent, n = Ii(t.lines, e), r = t.parent; r; t = r, r = r.parent)
                        for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
                    return n + t.first
                }

                function ni(e, t) {
                    var n = e.first;
                    e: do {
                        for (var r = 0; r < e.children.length; ++r) {
                            var i = e.children[r],
                                o = i.height;
                            if (o > t) {
                                e = i;
                                continue e
                            }
                            t -= o, n += i.chunkSize()
                        }
                        return n
                    } while (!e.lines);
                    for (var r = 0; r < e.lines.length; ++r) {
                        var l = e.lines[r],
                            a = l.height;
                        if (a > t) break;
                        t -= a
                    }
                    return n + r
                }

                function ri(e) {
                    e = yr(e);
                    for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
                        var i = n.lines[r];
                        if (i == e) break;
                        t += i.height
                    }
                    for (var o = n.parent; o; n = o, o = n.parent)
                        for (var r = 0; r < o.children.length; ++r) {
                            var l = o.children[r];
                            if (l == n) break;
                            t += l.height
                        }
                    return t
                }

                function ii(e) {
                    var t = e.order;
                    return null == t && (t = e.order = la(e.text)), t
                }

                function oi(e) {
                    this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
                }

                function li(e, t) {
                    var n = {
                        from: V(t.from),
                        to: Qo(t),
                        text: Qr(e, t.from, t.to)
                    };
                    return fi(e, n, t.from.line, t.to.line + 1), Xr(e, function(e) {
                        fi(e, n, t.from.line, t.to.line + 1)
                    }, !0), n
                }

                function ai(e) {
                    for (; e.length;) {
                        var t = Wi(e);
                        if (!t.ranges) break;
                        e.pop()
                    }
                }

                function si(e, t) {
                    return t ? (ai(e.done), Wi(e.done)) : e.done.length && !Wi(e.done).ranges ? Wi(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), Wi(e.done)) : void 0
                }

                function ci(e, t, n, r) {
                    var i = e.history;
                    i.undone.length = 0;
                    var o, l = +new Date;
                    if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > l - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = si(i, i.lastOp == r))) {
                        var a = Wi(o.changes);
                        0 == zo(t.from, t.to) && 0 == zo(t.from, a.to) ? a.to = Qo(t) : o.changes.push(li(e, t))
                    } else {
                        var s = Wi(i.done);
                        for (s && s.ranges || hi(e.sel, i.done), o = {
                                changes: [li(e, t)],
                                generation: i.generation
                            }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
                    }
                    i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, a || Wl(e, "historyAdded")
                }

                function ui(e, t, n, r) {
                    var i = t.charAt(0);
                    return "*" == i || "+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
                }

                function di(e, t, n, r) {
                    var i = e.history,
                        o = r && r.origin;
                    n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || ui(e, o, Wi(i.done), t)) ? i.done[i.done.length - 1] = t : hi(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastSelOp = n, r && r.clearRedo !== !1 && ai(i.undone)
                }

                function hi(e, t) {
                    var n = Wi(t);
                    n && n.ranges && n.equals(e) || t.push(e)
                }

                function fi(e, t, n, r) {
                    var i = t["spans_" + e.id],
                        o = 0;
                    e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(n) {
                        n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
                    })
                }

                function pi(e) {
                    if (!e) return null;
                    for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
                    return t ? t.length ? t : null : e
                }

                function mi(e, t) {
                    var n = t["spans_" + e.id];
                    if (!n) return null;
                    for (var r = 0, i = []; r < t.text.length; ++r) i.push(pi(n[r]));
                    return i
                }

                function gi(e, t, n) {
                    for (var r = 0, i = []; r < e.length; ++r) {
                        var o = e[r];
                        if (o.ranges) i.push(n ? ue.prototype.deepCopy.call(o) : o);
                        else {
                            var l = o.changes,
                                a = [];
                            i.push({
                                changes: a
                            });
                            for (var s = 0; s < l.length; ++s) {
                                var c, u = l[s];
                                if (a.push({
                                        from: u.from,
                                        to: u.to,
                                        text: u.text
                                    }), t)
                                    for (var d in u)(c = d.match(/^spans_(\d+)$/)) && Ii(t, Number(c[1])) > -1 && (Wi(a)[d] = u[d], delete u[d])
                            }
                        }
                    }
                    return i
                }

                function vi(e, t, n, r) {
                    n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0)
                }

                function yi(e, t, n, r) {
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = !0;
                        if (o.ranges) {
                            o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
                            for (var a = 0; a < o.ranges.length; a++) vi(o.ranges[a].anchor, t, n, r), vi(o.ranges[a].head, t, n, r)
                        } else {
                            for (var a = 0; a < o.changes.length; ++a) {
                                var s = o.changes[a];
                                if (n < s.from.line) s.from = Fo(s.from.line + r, s.from.ch), s.to = Fo(s.to.line + r, s.to.ch);
                                else if (t <= s.to.line) {
                                    l = !1;
                                    break
                                }
                            }
                            l || (e.splice(0, i + 1), i = 0)
                        }
                    }
                }

                function xi(e, t) {
                    var n = t.from.line,
                        r = t.to.line,
                        i = t.text.length - (r - n) - 1;
                    yi(e.done, n, r, i), yi(e.undone, n, r, i)
                }

                function bi(e) {
                    return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
                }

                function wi(e) {
                    return e.target || e.srcElement
                }

                function ki(e) {
                    var t = e.which;
                    return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), Oo && e.ctrlKey && 1 == t && (t = 3), t
                }

                function Ci(e, t, n) {
                    var r = e._handlers && e._handlers[t];
                    return n ? r && r.length > 0 ? r.slice() : Ol : r || Ol
                }

                function Si(e, t) {
                    function n(e) {
                        return function() {
                            e.apply(null, o)
                        }
                    }
                    var r = Ci(e, t, !1);
                    if (r.length) {
                        var i, o = Array.prototype.slice.call(arguments, 2);
                        Uo ? i = Uo.delayedCallbacks : Il ? i = Il : (i = Il = [], setTimeout(Li, 0));
                        for (var l = 0; l < r.length; ++l) i.push(n(r[l]))
                    }
                }

                function Li() {
                    var e = Il;
                    Il = null;
                    for (var t = 0; t < e.length; ++t) e[t]()
                }

                function Ti(e, t, n) {
                    return "string" == typeof t && (t = {
                        type: t,
                        preventDefault: function() {
                            this.defaultPrevented = !0
                        }
                    }), Wl(e, n || t.type, e, t), bi(t) || t.codemirrorIgnore
                }

                function Mi(e) {
                    var t = e._handlers && e._handlers.cursorActivity;
                    if (t)
                        for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) - 1 == Ii(n, t[r]) && n.push(t[r])
                }

                function Ni(e, t) {
                    return Ci(e, t).length > 0
                }

                function Ai(e) {
                    e.prototype.on = function(e, t) {
                        Al(this, e, t)
                    }, e.prototype.off = function(e, t) {
                        Hl(this, e, t)
                    }
                }

                function Oi() {
                    this.id = null
                }

                function Hi(e) {
                    for (; jl.length <= e;) jl.push(Wi(jl) + " ");
                    return jl[e]
                }

                function Wi(e) {
                    return e[e.length - 1]
                }

                function Ii(e, t) {
                    for (var n = 0; n < e.length; ++n)
                        if (e[n] == t) return n;
                    return -1
                }

                function Ei(e, t) {
                    for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
                    return n
                }

                function Di() {}

                function Pi(e, t) {
                    var n;
                    return Object.create ? n = Object.create(e) : (Di.prototype = e, n = new Di), t && Fi(t, n), n
                }

                function Fi(e, t, n) {
                    t || (t = {});
                    for (var r in e) !e.hasOwnProperty(r) || n === !1 && t.hasOwnProperty(r) || (t[r] = e[r]);
                    return t
                }

                function zi(e) {
                    var t = Array.prototype.slice.call(arguments, 1);
                    return function() {
                        return e.apply(null, t)
                    }
                }

                function Ri(e, t) {
                    return t ? t.source.indexOf("\\w") > -1 && Gl(e) ? !0 : t.test(e) : Gl(e)
                }

                function Bi(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t) && e[t]) return !1;
                    return !0
                }

                function ji(e) {
                    return e.charCodeAt(0) >= 768 && $l.test(e)
                }

                function _i(e, t, n, r) {
                    var i = document.createElement(e);
                    if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) i.appendChild(document.createTextNode(t));
                    else if (t)
                        for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
                    return i
                }

                function qi(e) {
                    for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
                    return e
                }

                function Ui(e, t) {
                    return qi(e).appendChild(t)
                }

                function Gi() {
                    for (var e = document.activeElement; e && e.root && e.root.activeElement;) e = e.root.activeElement;
                    return e
                }

                function $i(e) {
                    return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
                }

                function Vi(e, t) {
                    for (var n = e.split(" "), r = 0; r < n.length; r++) n[r] && !$i(n[r]).test(t) && (t += " " + n[r]);
                    return t
                }

                function Ki(e) {
                    if (document.body.getElementsByClassName)
                        for (var t = document.body.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
                            var r = t[n].CodeMirror;
                            r && e(r)
                        }
                }

                function Xi() {
                    Ql || (Yi(), Ql = !0)
                }

                function Yi() {
                    var e;
                    Al(window, "resize", function() {
                        null == e && (e = setTimeout(function() {
                            e = null, Ki(Ut)
                        }, 100))
                    }), Al(window, "blur", function() {
                        Ki(yn)
                    })
                }

                function Zi(e) {
                    if (null == Kl) {
                        var t = _i("span", "​");
                        Ui(e, _i("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Kl = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(xo && 8 > bo))
                    }
                    var n = Kl ? _i("span", "​") : _i("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
                    return n.setAttribute("cm-text", ""), n
                }

                function Qi(e) {
                    if (null != Xl) return Xl;
                    var t = Ui(e, document.createTextNode("AخA")),
                        n = ql(t, 0, 1).getBoundingClientRect();
                    if (!n || n.left == n.right) return !1;
                    var r = ql(t, 1, 2).getBoundingClientRect();
                    return Xl = r.right - n.right < 3
                }

                function Ji(e) {
                    if (null != ra) return ra;
                    var t = Ui(e, _i("span", "x")),
                        n = t.getBoundingClientRect(),
                        r = ql(t, 0, 1).getBoundingClientRect();
                    return ra = Math.abs(n.left - r.left) > 1
                }

                function eo(e, t, n, r) {
                    if (!e) return r(t, n, "ltr");
                    for (var i = !1, o = 0; o < e.length; ++o) {
                        var l = e[o];
                        (l.from < n && l.to > t || t == n && l.to == t) && (r(Math.max(l.from, t), Math.min(l.to, n), 1 == l.level ? "rtl" : "ltr"), i = !0)
                    }
                    i || r(t, n, "ltr")
                }

                function to(e) {
                    return e.level % 2 ? e.to : e.from
                }

                function no(e) {
                    return e.level % 2 ? e.from : e.to
                }

                function ro(e) {
                    var t = ii(e);
                    return t ? to(t[0]) : 0
                }

                function io(e) {
                    var t = ii(e);
                    return t ? no(Wi(t)) : e.text.length
                }

                function oo(e, t) {
                    var n = Zr(e.doc, t),
                        r = yr(n);
                    r != n && (t = ti(r));
                    var i = ii(r),
                        o = i ? i[0].level % 2 ? io(r) : ro(r) : 0;
                    return Fo(t, o)
                }

                function lo(e, t) {
                    for (var n, r = Zr(e.doc, t); n = gr(r);) r = n.find(1, !0).line, t = null;
                    var i = ii(r),
                        o = i ? i[0].level % 2 ? ro(r) : io(r) : r.text.length;
                    return Fo(null == t ? ti(r) : t, o)
                }

                function ao(e, t) {
                    var n = oo(e, t.line),
                        r = Zr(e.doc, n.line),
                        i = ii(r);
                    if (!i || 0 == i[0].level) {
                        var o = Math.max(0, r.text.search(/\S/)),
                            l = t.line == n.line && t.ch <= o && t.ch;
                        return Fo(n.line, l ? 0 : o)
                    }
                    return n
                }

                function so(e, t, n) {
                    var r = e[0].level;
                    return t == r ? !0 : n == r ? !1 : n > t
                }

                function co(e, t) {
                    oa = null;
                    for (var n, r = 0; r < e.length; ++r) {
                        var i = e[r];
                        if (i.from < t && i.to > t) return r;
                        if (i.from == t || i.to == t) {
                            if (null != n) return so(e, i.level, e[n].level) ? (i.from != i.to && (oa = n), r) : (i.from != i.to && (oa = r), n);
                            n = r
                        }
                    }
                    return n
                }

                function uo(e, t, n, r) {
                    if (!r) return t + n;
                    do t += n; while (t > 0 && ji(e.text.charAt(t)));
                    return t
                }

                function ho(e, t, n, r) {
                    var i = ii(e);
                    if (!i) return fo(e, t, n, r);
                    for (var o = co(i, t), l = i[o], a = uo(e, t, l.level % 2 ? -n : n, r);;) {
                        if (a > l.from && a < l.to) return a;
                        if (a == l.from || a == l.to) return co(i, a) == o ? a : (l = i[o += n], n > 0 == l.level % 2 ? l.to : l.from);
                        if (l = i[o += n], !l) return null;
                        a = n > 0 == l.level % 2 ? uo(e, l.to, -1, r) : uo(e, l.from, 1, r)
                    }
                }

                function fo(e, t, n, r) {
                    var i = t + n;
                    if (r)
                        for (; i > 0 && ji(e.text.charAt(i));) i += n;
                    return 0 > i || i > e.text.length ? null : i
                }
                var po = navigator.userAgent,
                    mo = navigator.platform,
                    go = /gecko\/\d/i.test(po),
                    vo = /MSIE \d/.test(po),
                    yo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(po),
                    xo = vo || yo,
                    bo = xo && (vo ? document.documentMode || 6 : yo[1]),
                    wo = /WebKit\//.test(po),
                    ko = wo && /Qt\/\d+\.\d+/.test(po),
                    Co = /Chrome\//.test(po),
                    So = /Opera\//.test(po),
                    Lo = /Apple Computer/.test(navigator.vendor),
                    To = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(po),
                    Mo = /PhantomJS/.test(po),
                    No = /AppleWebKit/.test(po) && /Mobile\/\w+/.test(po),
                    Ao = No || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(po),
                    Oo = No || /Mac/.test(mo),
                    Ho = /win/i.test(mo),
                    Wo = So && po.match(/Version\/(\d*\.\d*)/);
                Wo && (Wo = Number(Wo[1])), Wo && Wo >= 15 && (So = !1, wo = !0);
                var Io = Oo && (ko || So && (null == Wo || 12.11 > Wo)),
                    Eo = go || xo && bo >= 9,
                    Do = !1,
                    Po = !1;
                m.prototype = Fi({
                    update: function(e) {
                        var t = e.scrollWidth > e.clientWidth + 1,
                            n = e.scrollHeight > e.clientHeight + 1,
                            r = e.nativeBarWidth;
                        if (n) {
                            this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
                            var i = e.viewHeight - (t ? r : 0);
                            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
                        } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
                        if (t) {
                            this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
                            var o = e.viewWidth - e.barLeft - (n ? r : 0);
                            this.horiz.firstChild.style.width = e.scrollWidth - e.clientWidth + o + "px"
                        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
                        return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == r && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
                            right: n ? r : 0,
                            bottom: t ? r : 0
                        }
                    },
                    setScrollLeft: function(e) {
                        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz)
                    },
                    setScrollTop: function(e) {
                        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert)
                    },
                    zeroWidthHack: function() {
                        var e = Oo && !To ? "12px" : "18px";
                        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new Oi, this.disableVert = new Oi
                    },
                    enableZeroWidthBar: function(e, t) {
                        function n() {
                            var r = e.getBoundingClientRect(),
                                i = document.elementFromPoint(r.left + 1, r.bottom - 1);
                            i != e ? e.style.pointerEvents = "none" : t.set(1e3, n)
                        }
                        e.style.pointerEvents = "auto", t.set(1e3, n)
                    },
                    clear: function() {
                        var e = this.horiz.parentNode;
                        e.removeChild(this.horiz), e.removeChild(this.vert)
                    }
                }, m.prototype), g.prototype = Fi({
                    update: function() {
                        return {
                            bottom: 0,
                            right: 0
                        }
                    },
                    setScrollLeft: function() {},
                    setScrollTop: function() {},
                    clear: function() {}
                }, g.prototype), e.scrollbarModel = {
                    "native": m,
                    "null": g
                }, L.prototype.signal = function(e, t) {
                    Ni(e, t) && this.events.push(arguments)
                }, L.prototype.finish = function() {
                    for (var e = 0; e < this.events.length; e++) Wl.apply(null, this.events[e])
                };
                var Fo = e.Pos = function(e, t) {
                        return this instanceof Fo ? (this.line = e, void(this.ch = t)) : new Fo(e, t)
                    },
                    zo = e.cmpPos = function(e, t) {
                        return e.line - t.line || e.ch - t.ch
                    },
                    Ro = null;
                ne.prototype = Fi({
                    init: function(e) {
                        function t(e) {
                            if (!Ti(r, e)) {
                                if (r.somethingSelected()) Ro = r.getSelections(), n.inaccurateSelection && (n.prevInput = "", n.inaccurateSelection = !1, o.value = Ro.join("\n"), _l(o));
                                else {
                                    if (!r.options.lineWiseCopyCut) return;
                                    var t = ee(r);
                                    Ro = t.text, "cut" == e.type ? r.setSelections(t.ranges, null, Pl) : (n.prevInput = "", o.value = t.text.join("\n"), _l(o))
                                }
                                "cut" == e.type && (r.state.cutIncoming = !0)
                            }
                        }
                        var n = this,
                            r = this.cm,
                            i = this.wrapper = re(),
                            o = this.textarea = i.firstChild;
                        e.wrapper.insertBefore(i, e.wrapper.firstChild), No && (o.style.width = "0px"), Al(o, "input", function() {
                            xo && bo >= 9 && n.hasSelection && (n.hasSelection = null), n.poll()
                        }), Al(o, "paste", function(e) {
                            Ti(r, e) || Q(e, r) || (r.state.pasteIncoming = !0, n.fastPoll())
                        }), Al(o, "cut", t), Al(o, "copy", t), Al(e.scroller, "paste", function(t) {
                            Gt(e, t) || Ti(r, t) || (r.state.pasteIncoming = !0, n.focus())
                        }), Al(e.lineSpace, "selectstart", function(t) {
                            Gt(e, t) || Tl(t)
                        }), Al(o, "compositionstart", function() {
                            var e = r.getCursor("from");
                            n.composing && n.composing.range.clear(), n.composing = {
                                start: e,
                                range: r.markText(e, r.getCursor("to"), {
                                    className: "CodeMirror-composing"
                                })
                            }
                        }), Al(o, "compositionend", function() {
                            n.composing && (n.poll(), n.composing.range.clear(), n.composing = null)
                        })
                    },
                    prepareSelection: function() {
                        var e = this.cm,
                            t = e.display,
                            n = e.doc,
                            r = De(e);
                        if (e.options.moveInputWithCursor) {
                            var i = ft(e, n.sel.primary().head, "div"),
                                o = t.wrapper.getBoundingClientRect(),
                                l = t.lineDiv.getBoundingClientRect();
                            r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)), r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left))
                        }
                        return r
                    },
                    showSelection: function(e) {
                        var t = this.cm,
                            n = t.display;
                        Ui(n.cursorDiv, e.cursors), Ui(n.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
                    },
                    reset: function(e) {
                        if (!this.contextMenuPending) {
                            var t, n, r = this.cm,
                                i = r.doc;
                            if (r.somethingSelected()) {
                                this.prevInput = "";
                                var o = i.sel.primary();
                                t = na && (o.to().line - o.from().line > 100 || (n = r.getSelection()).length > 1e3);
                                var l = t ? "-" : n || r.getSelection();
                                this.textarea.value = l, r.state.focused && _l(this.textarea), xo && bo >= 9 && (this.hasSelection = l)
                            } else e || (this.prevInput = this.textarea.value = "", xo && bo >= 9 && (this.hasSelection = null));
                            this.inaccurateSelection = t
                        }
                    },
                    getField: function() {
                        return this.textarea
                    },
                    supportsTouch: function() {
                        return !1
                    },
                    focus: function() {
                        if ("nocursor" != this.cm.options.readOnly && (!Ao || Gi() != this.textarea)) try {
                            this.textarea.focus()
                        } catch (e) {}
                    },
                    blur: function() {
                        this.textarea.blur()
                    },
                    resetPosition: function() {
                        this.wrapper.style.top = this.wrapper.style.left = 0
                    },
                    receivedFocus: function() {
                        this.slowPoll()
                    },
                    slowPoll: function() {
                        var e = this;
                        e.pollingFast || e.polling.set(this.cm.options.pollInterval, function() {
                            e.poll(), e.cm.state.focused && e.slowPoll()
                        })
                    },
                    fastPoll: function() {
                        function e() {
                            var r = n.poll();
                            r || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e))
                        }
                        var t = !1,
                            n = this;
                        n.pollingFast = !0, n.polling.set(20, e)
                    },
                    poll: function() {
                        var e = this.cm,
                            t = this.textarea,
                            n = this.prevInput;
                        if (this.contextMenuPending || !e.state.focused || ta(t) && !n && !this.composing || e.isReadOnly() || e.options.disableInput || e.state.keySeq) return !1;
                        var r = t.value;
                        if (r == n && !e.somethingSelected()) return !1;
                        if (xo && bo >= 9 && this.hasSelection === r || Oo && /[\uf700-\uf7ff]/.test(r)) return e.display.input.reset(), !1;
                        if (e.doc.sel == e.display.selForContextMenu) {
                            var i = r.charCodeAt(0);
                            if (8203 != i || n || (n = "​"), 8666 == i) return this.reset(), this.cm.execCommand("undo")
                        }
                        for (var o = 0, l = Math.min(n.length, r.length); l > o && n.charCodeAt(o) == r.charCodeAt(o);) ++o;
                        var a = this;
                        return At(e, function() {
                            Z(e, r.slice(o), n.length - o, null, a.composing ? "*compose" : null), r.length > 1e3 || r.indexOf("\n") > -1 ? t.value = a.prevInput = "" : a.prevInput = r, a.composing && (a.composing.range.clear(), a.composing.range = e.markText(a.composing.start, e.getCursor("to"), {
                                className: "CodeMirror-composing"
                            }))
                        }), !0
                    },
                    ensurePolled: function() {
                        this.pollingFast && this.poll() && (this.pollingFast = !1)
                    },
                    onKeyPress: function() {
                        xo && bo >= 9 && (this.hasSelection = null), this.fastPoll()
                    },
                    onContextMenu: function(e) {
                        function t() {
                            if (null != l.selectionStart) {
                                var e = i.somethingSelected(),
                                    t = "​" + (e ? l.value : "");
                                l.value = "⇚", l.value = t, r.prevInput = e ? "" : "​", l.selectionStart = 1, l.selectionEnd = t.length, o.selForContextMenu = i.doc.sel
                            }
                        }

                        function n() {
                            if (r.contextMenuPending = !1, r.wrapper.style.cssText = d, l.style.cssText = u, xo && 9 > bo && o.scrollbars.setScrollTop(o.scroller.scrollTop = s), null != l.selectionStart) {
                                (!xo || xo && 9 > bo) && t();
                                var e = 0,
                                    n = function() {
                                        o.selForContextMenu == i.doc.sel && 0 == l.selectionStart && l.selectionEnd > 0 && "​" == r.prevInput ? Ot(i, cl.selectAll)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(n, 500) : o.input.reset()
                                    };
                                o.detectingSelectAll = setTimeout(n, 200)
                            }
                        }
                        var r = this,
                            i = r.cm,
                            o = i.display,
                            l = r.textarea,
                            a = $t(i, e),
                            s = o.scroller.scrollTop;
                        if (a && !So) {
                            var c = i.options.resetSelectionOnContextMenu;
                            c && -1 == i.doc.sel.contains(a) && Ot(i, Te)(i.doc, fe(a), Pl);
                            var u = l.style.cssText,
                                d = r.wrapper.style.cssText;
                            r.wrapper.style.cssText = "position: absolute";
                            var h = r.wrapper.getBoundingClientRect();
                            if (l.style.cssText = "position: absolute; width: 30px; height: 30px; top: " + (e.clientY - h.top - 5) + "px; left: " + (e.clientX - h.left - 5) + "px; z-index: 1000; background: " + (xo ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", wo) var f = window.scrollY;
                            if (o.input.focus(), wo && window.scrollTo(null, f), o.input.reset(), i.somethingSelected() || (l.value = r.prevInput = " "), r.contextMenuPending = !0, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), xo && bo >= 9 && t(), Eo) {
                                Nl(e);
                                var p = function() {
                                    Hl(window, "mouseup", p), setTimeout(n, 20)
                                };
                                Al(window, "mouseup", p)
                            } else setTimeout(n, 50)
                        }
                    },
                    readOnlyChanged: function(e) {
                        e || this.reset()
                    },
                    setUneditable: Di,
                    needsContentAttribute: !1
                }, ne.prototype), ie.prototype = Fi({
                    init: function(e) {
                        function t(e) {
                            if (!Ti(r, e)) {
                                if (r.somethingSelected()) Ro = r.getSelections(), "cut" == e.type && r.replaceSelection("", null, "cut");
                                else {
                                    if (!r.options.lineWiseCopyCut) return;
                                    var t = ee(r);
                                    Ro = t.text, "cut" == e.type && r.operation(function() {
                                        r.setSelections(t.ranges, 0, Pl), r.replaceSelection("", null, "cut")
                                    })
                                }
                                if (e.clipboardData && !No) e.preventDefault(), e.clipboardData.clearData(), e.clipboardData.setData("text/plain", Ro.join("\n"));
                                else {
                                    var n = re(),
                                        i = n.firstChild;
                                    r.display.lineSpace.insertBefore(n, r.display.lineSpace.firstChild), i.value = Ro.join("\n");
                                    var o = document.activeElement;
                                    _l(i), setTimeout(function() {
                                        r.display.lineSpace.removeChild(n), o.focus()
                                    }, 50)
                                }
                            }
                        }
                        var n = this,
                            r = n.cm,
                            i = n.div = e.lineDiv;
                        te(i), Al(i, "paste", function(e) {
                            Ti(r, e) || Q(e, r)
                        }), Al(i, "compositionstart", function(e) {
                            var t = e.data;
                            if (n.composing = {
                                    sel: r.doc.sel,
                                    data: t,
                                    startData: t
                                }, t) {
                                var i = r.doc.sel.primary(),
                                    o = r.getLine(i.head.line),
                                    l = o.indexOf(t, Math.max(0, i.head.ch - t.length));
                                l > -1 && l <= i.head.ch && (n.composing.sel = fe(Fo(i.head.line, l), Fo(i.head.line, l + t.length)))
                            }
                        }), Al(i, "compositionupdate", function(e) {
                            n.composing.data = e.data
                        }), Al(i, "compositionend", function(e) {
                            var t = n.composing;
                            t && (e.data == t.startData || /\u200b/.test(e.data) || (t.data = e.data), setTimeout(function() {
                                t.handled || n.applyComposition(t), n.composing == t && (n.composing = null)
                            }, 50))
                        }), Al(i, "touchstart", function() {
                            n.forceCompositionEnd()
                        }), Al(i, "input", function() {
                            n.composing || !r.isReadOnly() && n.pollContent() || At(n.cm, function() {
                                Dt(r)
                            })
                        }), Al(i, "copy", t), Al(i, "cut", t)
                    },
                    prepareSelection: function() {
                        var e = De(this.cm, !1);
                        return e.focus = this.cm.state.focused, e
                    },
                    showSelection: function(e) {
                        e && this.cm.display.view.length && (e.focus && this.showPrimarySelection(), this.showMultipleSelections(e))
                    },
                    showPrimarySelection: function() {
                        var e = window.getSelection(),
                            t = this.cm.doc.sel.primary(),
                            n = ae(this.cm, e.anchorNode, e.anchorOffset),
                            r = ae(this.cm, e.focusNode, e.focusOffset);
                        if (!n || n.bad || !r || r.bad || 0 != zo(X(n, r), t.from()) || 0 != zo(K(n, r), t.to())) {
                            var i = oe(this.cm, t.from()),
                                o = oe(this.cm, t.to());
                            if (i || o) {
                                var l = this.cm.display.view,
                                    a = e.rangeCount && e.getRangeAt(0);
                                if (i) {
                                    if (!o) {
                                        var s = l[l.length - 1].measure,
                                            c = s.maps ? s.maps[s.maps.length - 1] : s.map;
                                        o = {
                                            node: c[c.length - 1],
                                            offset: c[c.length - 2] - c[c.length - 3]
                                        }
                                    }
                                } else i = {
                                    node: l[0].measure.map[2],
                                    offset: 0
                                };
                                try {
                                    var u = ql(i.node, i.offset, o.offset, o.node)
                                } catch (d) {}
                                u && (!go && this.cm.state.focused ? (e.collapse(i.node, i.offset), u.collapsed || e.addRange(u)) : (e.removeAllRanges(), e.addRange(u)), a && null == e.anchorNode ? e.addRange(a) : go && this.startGracePeriod()), this.rememberSelection()
                            }
                        }
                    },
                    startGracePeriod: function() {
                        var e = this;
                        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
                            e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
                                e.cm.curOp.selectionChanged = !0
                            })
                        }, 20)
                    },
                    showMultipleSelections: function(e) {
                        Ui(this.cm.display.cursorDiv, e.cursors), Ui(this.cm.display.selectionDiv, e.selection)
                    },
                    rememberSelection: function() {
                        var e = window.getSelection();
                        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
                    },
                    selectionInEditor: function() {
                        var e = window.getSelection();
                        if (!e.rangeCount) return !1;
                        var t = e.getRangeAt(0).commonAncestorContainer;
                        return Vl(this.div, t)
                    },
                    focus: function() {
                        "nocursor" != this.cm.options.readOnly && this.div.focus()
                    },
                    blur: function() {
                        this.div.blur()
                    },
                    getField: function() {
                        return this.div
                    },
                    supportsTouch: function() {
                        return !0
                    },
                    receivedFocus: function() {
                        function e() {
                            t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e))
                        }
                        var t = this;
                        this.selectionInEditor() ? this.pollSelection() : At(this.cm, function() {
                            t.cm.curOp.selectionChanged = !0
                        }), this.polling.set(this.cm.options.pollInterval, e)
                    },
                    selectionChanged: function() {
                        var e = window.getSelection();
                        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
                    },
                    pollSelection: function() {
                        if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
                            var e = window.getSelection(),
                                t = this.cm;
                            this.rememberSelection();
                            var n = ae(t, e.anchorNode, e.anchorOffset),
                                r = ae(t, e.focusNode, e.focusOffset);
                            n && r && At(t, function() {
                                Te(t.doc, fe(n, r), Pl), (n.bad || r.bad) && (t.curOp.selectionChanged = !0)
                            })
                        }
                    },
                    pollContent: function() {
                        var e = this.cm,
                            t = e.display,
                            n = e.doc.sel.primary(),
                            r = n.from(),
                            i = n.to();
                        if (r.line < t.viewFrom || i.line > t.viewTo - 1) return !1;
                        var o;
                        if (r.line == t.viewFrom || 0 == (o = zt(e, r.line))) var l = ti(t.view[0].line),
                            a = t.view[0].node;
                        else var l = ti(t.view[o].line),
                            a = t.view[o - 1].node.nextSibling;
                        var s = zt(e, i.line);
                        if (s == t.view.length - 1) var c = t.viewTo - 1,
                            u = t.lineDiv.lastChild;
                        else var c = ti(t.view[s + 1].line) - 1,
                            u = t.view[s + 1].node.previousSibling;
                        for (var d = e.doc.splitLines(ce(e, a, u, l, c)), h = Qr(e.doc, Fo(l, 0), Fo(c, Zr(e.doc, c).text.length)); d.length > 1 && h.length > 1;)
                            if (Wi(d) == Wi(h)) d.pop(), h.pop(), c--;
                            else {
                                if (d[0] != h[0]) break;
                                d.shift(), h.shift(), l++
                            }
                        for (var f = 0, p = 0, m = d[0], g = h[0], v = Math.min(m.length, g.length); v > f && m.charCodeAt(f) == g.charCodeAt(f);) ++f;
                        for (var y = Wi(d), x = Wi(h), b = Math.min(y.length - (1 == d.length ? f : 0), x.length - (1 == h.length ? f : 0)); b > p && y.charCodeAt(y.length - p - 1) == x.charCodeAt(x.length - p - 1);) ++p;
                        d[d.length - 1] = y.slice(0, y.length - p), d[0] = d[0].slice(f);
                        var w = Fo(l, f),
                            k = Fo(c, h.length ? Wi(h).length - p : 0);
                        return d.length > 1 || d[0] || zo(w, k) ? (Wn(e.doc, d, w, k, "+input"), !0) : void 0
                    },
                    ensurePolled: function() {
                        this.forceCompositionEnd()
                    },
                    reset: function() {
                        this.forceCompositionEnd()
                    },
                    forceCompositionEnd: function() {
                        this.composing && !this.composing.handled && (this.applyComposition(this.composing), this.composing.handled = !0, this.div.blur(), this.div.focus())
                    },
                    applyComposition: function(e) {
                        this.cm.isReadOnly() ? Ot(this.cm, Dt)(this.cm) : e.data && e.data != e.startData && Ot(this.cm, Z)(this.cm, e.data, 0, e.sel)
                    },
                    setUneditable: function(e) {
                        e.contentEditable = "false"
                    },
                    onKeyPress: function(e) {
                        e.preventDefault(), this.cm.isReadOnly() || Ot(this.cm, Z)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0)
                    },
                    readOnlyChanged: function(e) {
                        this.div.contentEditable = String("nocursor" != e)
                    },
                    onContextMenu: Di,
                    resetPosition: Di,
                    needsContentAttribute: !0
                }, ie.prototype), e.inputStyles = {
                    textarea: ne,
                    contenteditable: ie
                }, ue.prototype = {
                    primary: function() {
                        return this.ranges[this.primIndex]
                    },
                    equals: function(e) {
                        if (e == this) return !0;
                        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
                        for (var t = 0; t < this.ranges.length; t++) {
                            var n = this.ranges[t],
                                r = e.ranges[t];
                            if (0 != zo(n.anchor, r.anchor) || 0 != zo(n.head, r.head)) return !1
                        }
                        return !0
                    },
                    deepCopy: function() {
                        for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new de(V(this.ranges[t].anchor), V(this.ranges[t].head));
                        return new ue(e, this.primIndex)
                    },
                    somethingSelected: function() {
                        for (var e = 0; e < this.ranges.length; e++)
                            if (!this.ranges[e].empty()) return !0;
                        return !1
                    },
                    contains: function(e, t) {
                        t || (t = e);
                        for (var n = 0; n < this.ranges.length; n++) {
                            var r = this.ranges[n];
                            if (zo(t, r.from()) >= 0 && zo(e, r.to()) <= 0) return n
                        }
                        return -1
                    }
                }, de.prototype = {
                    from: function() {
                        return X(this.anchor, this.head)
                    },
                    to: function() {
                        return K(this.anchor, this.head)
                    },
                    empty: function() {
                        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
                    }
                };
                var Bo, jo, _o, qo = {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    },
                    Uo = null,
                    Go = 0,
                    $o = 0,
                    Vo = 0,
                    Ko = null;
                xo ? Ko = -.53 : go ? Ko = 15 : Co ? Ko = -.7 : Lo && (Ko = -1 / 3);
                var Xo = function(e) {
                    var t = e.wheelDeltaX,
                        n = e.wheelDeltaY;
                    return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), {
                        x: t,
                        y: n
                    }
                };
                e.wheelEventPixels = function(e) {
                    var t = Xo(e);
                    return t.x *= Ko, t.y *= Ko, t
                };
                var Yo = new Oi,
                    Zo = null,
                    Qo = e.changeEnd = function(e) {
                        return e.text ? Fo(e.from.line + e.text.length - 1, Wi(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
                    };
                e.prototype = {
                    constructor: e,
                    focus: function() {
                        window.focus(), this.display.input.focus()
                    },
                    setOption: function(e, t) {
                        var n = this.options,
                            r = n[e];
                        n[e] == t && "mode" != e || (n[e] = t, el.hasOwnProperty(e) && Ot(this, el[e])(this, t, r))
                    },
                    getOption: function(e) {
                        return this.options[e]
                    },
                    getDoc: function() {
                        return this.doc
                    },
                    addKeyMap: function(e, t) {
                        this.state.keyMaps[t ? "push" : "unshift"](Vn(e))
                    },
                    removeKeyMap: function(e) {
                        for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                            if (t[n] == e || t[n].name == e) return t.splice(n, 1), !0
                    },
                    addOverlay: Ht(function(t, n) {
                        var r = t.token ? t : e.getMode(this.options, t);
                        if (r.startState) throw new Error("Overlays may not be stateful.");
                        this.state.overlays.push({
                            mode: r,
                            modeSpec: t,
                            opaque: n && n.opaque
                        }), this.state.modeGen++, Dt(this)
                    }),
                    removeOverlay: Ht(function(e) {
                        for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                            var r = t[n].modeSpec;
                            if (r == e || "string" == typeof e && r.name == e) return t.splice(n, 1), this.state.modeGen++, void Dt(this)
                        }
                    }),
                    indentLine: Ht(function(e, t, n) {
                        "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), ve(this.doc, e) && Bn(this, e, t, n)
                    }),
                    indentSelection: Ht(function(e) {
                        for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
                            var i = t[r];
                            if (i.empty()) i.head.line > n && (Bn(this, i.head.line, e, !0), n = i.head.line, r == this.doc.sel.primIndex && zn(this));
                            else {
                                var o = i.from(),
                                    l = i.to(),
                                    a = Math.max(n, o.line);
                                n = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
                                for (var s = a; n > s; ++s) Bn(this, s, e);
                                var c = this.doc.sel.ranges;
                                0 == o.ch && t.length == c.length && c[r].from().ch > 0 && ke(this.doc, r, new de(o, c[r].to()), Pl)
                            }
                        }
                    }),
                    getTokenAt: function(e, t) {
                        return Wr(this, e, t)
                    },
                    getLineTokens: function(e, t) {
                        return Wr(this, Fo(e), t, !0)
                    },
                    getTokenTypeAt: function(e) {
                        e = me(this.doc, e);
                        var t, n = Dr(this, Zr(this.doc, e.line)),
                            r = 0,
                            i = (n.length - 1) / 2,
                            o = e.ch;
                        if (0 == o) t = n[2];
                        else
                            for (;;) {
                                var l = r + i >> 1;
                                if ((l ? n[2 * l - 1] : 0) >= o) i = l;
                                else {
                                    if (!(n[2 * l + 1] < o)) {
                                        t = n[2 * l + 2];
                                        break
                                    }
                                    r = l + 1
                                }
                            }
                        var a = t ? t.indexOf("cm-overlay ") : -1;
                        return 0 > a ? t : 0 == a ? null : t.slice(0, a - 1)
                    },
                    getModeAt: function(t) {
                        var n = this.doc.mode;
                        return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n
                    },
                    getHelper: function(e, t) {
                        return this.getHelpers(e, t)[0]
                    },
                    getHelpers: function(e, t) {
                        var n = [];
                        if (!ll.hasOwnProperty(t)) return n;
                        var r = ll[t],
                            i = this.getModeAt(e);
                        if ("string" == typeof i[t]) r[i[t]] && n.push(r[i[t]]);
                        else if (i[t])
                            for (var o = 0; o < i[t].length; o++) {
                                var l = r[i[t][o]];
                                l && n.push(l)
                            } else i.helperType && r[i.helperType] ? n.push(r[i.helperType]) : r[i.name] && n.push(r[i.name]);
                        for (var o = 0; o < r._global.length; o++) {
                            var a = r._global[o];
                            a.pred(i, this) && -1 == Ii(n, a.val) && n.push(a.val)
                        }
                        return n
                    },
                    getStateAfter: function(e, t) {
                        var n = this.doc;
                        return e = pe(n, null == e ? n.first + n.size - 1 : e), _e(this, e + 1, t)
                    },
                    cursorCoords: function(e, t) {
                        var n, r = this.doc.sel.primary();
                        return n = null == e ? r.head : "object" == typeof e ? me(this.doc, e) : e ? r.from() : r.to(), ft(this, n, t || "page")
                    },
                    charCoords: function(e, t) {
                        return ht(this, me(this.doc, e), t || "page")
                    },
                    coordsChar: function(e, t) {
                        return e = dt(this, e, t || "page"), gt(this, e.left, e.top)
                    },
                    lineAtHeight: function(e, t) {
                        return e = dt(this, {
                            top: e,
                            left: 0
                        }, t || "page").top, ni(this.doc, e + this.display.viewOffset)
                    },
                    heightAtLine: function(e, t) {
                        var n, r = !1;
                        if ("number" == typeof e) {
                            var i = this.doc.first + this.doc.size - 1;
                            e < this.doc.first ? e = this.doc.first : e > i && (e = i, r = !0), n = Zr(this.doc, e)
                        } else n = e;
                        return ut(this, n, {
                            top: 0,
                            left: 0
                        }, t || "page").top + (r ? this.doc.height - ri(n) : 0)
                    },
                    defaultTextHeight: function() {
                        return yt(this.display)
                    },
                    defaultCharWidth: function() {
                        return xt(this.display)
                    },
                    setGutterMarker: Ht(function(e, t, n) {
                        return jn(this.doc, e, "gutter", function(e) {
                            var r = e.gutterMarkers || (e.gutterMarkers = {});
                            return r[t] = n, !n && Bi(r) && (e.gutterMarkers = null), !0
                        })
                    }),
                    clearGutter: Ht(function(e) {
                        var t = this,
                            n = t.doc,
                            r = n.first;
                        n.iter(function(n) {
                            n.gutterMarkers && n.gutterMarkers[e] && (n.gutterMarkers[e] = null, Pt(t, r, "gutter"), Bi(n.gutterMarkers) && (n.gutterMarkers = null)), ++r
                        })
                    }),
                    lineInfo: function(e) {
                        if ("number" == typeof e) {
                            if (!ve(this.doc, e)) return null;
                            var t = e;
                            if (e = Zr(this.doc, e), !e) return null
                        } else {
                            var t = ti(e);
                            if (null == t) return null
                        }
                        return {
                            line: t,
                            handle: e,
                            text: e.text,
                            gutterMarkers: e.gutterMarkers,
                            textClass: e.textClass,
                            bgClass: e.bgClass,
                            wrapClass: e.wrapClass,
                            widgets: e.widgets
                        }
                    },
                    getViewport: function() {
                        return {
                            from: this.display.viewFrom,
                            to: this.display.viewTo
                        }
                    },
                    addWidget: function(e, t, n, r, i) {
                        var o = this.display;
                        e = ft(this, me(this.doc, e));
                        var l = e.bottom,
                            a = e.left;
                        if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == r) l = e.top;
                        else if ("above" == r || "near" == r) {
                            var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                                c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                            ("above" == r || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? l = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (l = e.bottom), a + t.offsetWidth > c && (a = c - t.offsetWidth)
                        }
                        t.style.top = l + "px", t.style.left = t.style.right = "", "right" == i ? (a = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? a = 0 : "middle" == i && (a = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = a + "px"), n && Dn(this, a, l, a + t.offsetWidth, l + t.offsetHeight)
                    },
                    triggerOnKeyDown: Ht(hn),
                    triggerOnKeyPress: Ht(mn),
                    triggerOnKeyUp: pn,
                    execCommand: function(e) {
                        return cl.hasOwnProperty(e) ? cl[e].call(null, this) : void 0
                    },
                    triggerElectric: Ht(function(e) {
                        J(this, e)
                    }),
                    findPosH: function(e, t, n, r) {
                        var i = 1;
                        0 > t && (i = -1, t = -t);
                        for (var o = 0, l = me(this.doc, e); t > o && (l = qn(this.doc, l, i, n, r), !l.hitSide); ++o);
                        return l
                    },
                    moveH: Ht(function(e, t) {
                        var n = this;
                        n.extendSelectionsBy(function(r) {
                            return n.display.shift || n.doc.extend || r.empty() ? qn(n.doc, r.head, e, t, n.options.rtlMoveVisually) : 0 > e ? r.from() : r.to();
                        }, zl)
                    }),
                    deleteH: Ht(function(e, t) {
                        var n = this.doc.sel,
                            r = this.doc;
                        n.somethingSelected() ? r.replaceSelection("", null, "+delete") : _n(this, function(n) {
                            var i = qn(r, n.head, e, t, !1);
                            return 0 > e ? {
                                from: i,
                                to: n.head
                            } : {
                                from: n.head,
                                to: i
                            }
                        })
                    }),
                    findPosV: function(e, t, n, r) {
                        var i = 1,
                            o = r;
                        0 > t && (i = -1, t = -t);
                        for (var l = 0, a = me(this.doc, e); t > l; ++l) {
                            var s = ft(this, a, "div");
                            if (null == o ? o = s.left : s.left = o, a = Un(this, s, i, n), a.hitSide) break
                        }
                        return a
                    },
                    moveV: Ht(function(e, t) {
                        var n = this,
                            r = this.doc,
                            i = [],
                            o = !n.display.shift && !r.extend && r.sel.somethingSelected();
                        if (r.extendSelectionsBy(function(l) {
                                if (o) return 0 > e ? l.from() : l.to();
                                var a = ft(n, l.head, "div");
                                null != l.goalColumn && (a.left = l.goalColumn), i.push(a.left);
                                var s = Un(n, a, e, t);
                                return "page" == t && l == r.sel.primary() && Fn(n, null, ht(n, s, "div").top - a.top), s
                            }, zl), i.length)
                            for (var l = 0; l < r.sel.ranges.length; l++) r.sel.ranges[l].goalColumn = i[l]
                    }),
                    findWordAt: function(e) {
                        var t = this.doc,
                            n = Zr(t, e.line).text,
                            r = e.ch,
                            i = e.ch;
                        if (n) {
                            var o = this.getHelper(e, "wordChars");
                            (e.xRel < 0 || i == n.length) && r ? --r : ++i;
                            for (var l = n.charAt(r), a = Ri(l, o) ? function(e) {
                                    return Ri(e, o)
                                } : /\s/.test(l) ? function(e) {
                                    return /\s/.test(e)
                                } : function(e) {
                                    return !/\s/.test(e) && !Ri(e)
                                }; r > 0 && a(n.charAt(r - 1));) --r;
                            for (; i < n.length && a(n.charAt(i));) ++i
                        }
                        return new de(Fo(e.line, r), Fo(e.line, i))
                    },
                    toggleOverwrite: function(e) {
                        null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? Zl(this.display.cursorDiv, "CodeMirror-overwrite") : Yl(this.display.cursorDiv, "CodeMirror-overwrite"), Wl(this, "overwriteToggle", this, this.state.overwrite))
                    },
                    hasFocus: function() {
                        return this.display.input.getField() == Gi()
                    },
                    isReadOnly: function() {
                        return !(!this.options.readOnly && !this.doc.cantEdit)
                    },
                    scrollTo: Ht(function(e, t) {
                        null == e && null == t || Rn(this), null != e && (this.curOp.scrollLeft = e), null != t && (this.curOp.scrollTop = t)
                    }),
                    getScrollInfo: function() {
                        var e = this.display.scroller;
                        return {
                            left: e.scrollLeft,
                            top: e.scrollTop,
                            height: e.scrollHeight - $e(this) - this.display.barHeight,
                            width: e.scrollWidth - $e(this) - this.display.barWidth,
                            clientHeight: Ke(this),
                            clientWidth: Ve(this)
                        }
                    },
                    scrollIntoView: Ht(function(e, t) {
                        if (null == e ? (e = {
                                from: this.doc.sel.primary().head,
                                to: null
                            }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                                from: Fo(e, 0),
                                to: null
                            } : null == e.from && (e = {
                                from: e,
                                to: null
                            }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line) Rn(this), this.curOp.scrollToPos = e;
                        else {
                            var n = Pn(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
                            this.scrollTo(n.scrollLeft, n.scrollTop)
                        }
                    }),
                    setSize: Ht(function(e, t) {
                        function n(e) {
                            return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                        }
                        var r = this;
                        null != e && (r.display.wrapper.style.width = n(e)), null != t && (r.display.wrapper.style.height = n(t)), r.options.lineWrapping && lt(this);
                        var i = r.display.viewFrom;
                        r.doc.iter(i, r.display.viewTo, function(e) {
                            if (e.widgets)
                                for (var t = 0; t < e.widgets.length; t++)
                                    if (e.widgets[t].noHScroll) {
                                        Pt(r, i, "widget");
                                        break
                                    }++i
                        }), r.curOp.forceUpdate = !0, Wl(r, "refresh", this)
                    }),
                    operation: function(e) {
                        return At(this, e)
                    },
                    refresh: Ht(function() {
                        var e = this.display.cachedTextHeight;
                        Dt(this), this.curOp.forceUpdate = !0, at(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), u(this), (null == e || Math.abs(e - yt(this.display)) > .5) && l(this), Wl(this, "refresh", this)
                    }),
                    swapDoc: Ht(function(e) {
                        var t = this.doc;
                        return t.cm = null, Yr(this, e), at(this), this.display.input.reset(), this.scrollTo(e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, Si(this, "swapDoc", this, t), t
                    }),
                    getInputField: function() {
                        return this.display.input.getField()
                    },
                    getWrapperElement: function() {
                        return this.display.wrapper
                    },
                    getScrollerElement: function() {
                        return this.display.scroller
                    },
                    getGutterElement: function() {
                        return this.display.gutters
                    }
                }, Ai(e);
                var Jo = e.defaults = {},
                    el = e.optionHandlers = {},
                    tl = e.Init = {
                        toString: function() {
                            return "CodeMirror.Init"
                        }
                    };
                Gn("value", "", function(e, t) {
                    e.setValue(t)
                }, !0), Gn("mode", null, function(e, t) {
                    e.doc.modeOption = t, n(e)
                }, !0), Gn("indentUnit", 2, n, !0), Gn("indentWithTabs", !1), Gn("smartIndent", !0), Gn("tabSize", 4, function(e) {
                    r(e), at(e), Dt(e)
                }, !0), Gn("lineSeparator", null, function(e, t) {
                    if (e.doc.lineSep = t, t) {
                        var n = [],
                            r = e.doc.first;
                        e.doc.iter(function(e) {
                            for (var i = 0;;) {
                                var o = e.text.indexOf(t, i);
                                if (-1 == o) break;
                                i = o + t.length, n.push(Fo(r, o))
                            }
                            r++
                        });
                        for (var i = n.length - 1; i >= 0; i--) Wn(e.doc, t, n[i], Fo(n[i].line, n[i].ch + t.length))
                    }
                }), Gn("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(t, n, r) {
                    t.state.specialChars = new RegExp(n.source + (n.test("	") ? "" : "|	"), "g"), r != e.Init && t.refresh()
                }), Gn("specialCharPlaceholder", Rr, function(e) {
                    e.refresh()
                }, !0), Gn("electricChars", !0), Gn("inputStyle", Ao ? "contenteditable" : "textarea", function() {
                    throw new Error("inputStyle can not (yet) be changed in a running editor")
                }, !0), Gn("rtlMoveVisually", !Ho), Gn("wholeLineUpdateBefore", !0), Gn("theme", "default", function(e) {
                    a(e), s(e)
                }, !0), Gn("keyMap", "default", function(t, n, r) {
                    var i = Vn(n),
                        o = r != e.Init && Vn(r);
                    o && o.detach && o.detach(t, i), i.attach && i.attach(t, o || null)
                }), Gn("extraKeys", null), Gn("lineWrapping", !1, i, !0), Gn("gutters", [], function(e) {
                    f(e.options), s(e)
                }, !0), Gn("fixedGutter", !0, function(e, t) {
                    e.display.gutters.style.left = t ? S(e.display) + "px" : "0", e.refresh()
                }, !0), Gn("coverGutterNextToScrollbar", !1, function(e) {
                    y(e)
                }, !0), Gn("scrollbarStyle", "native", function(e) {
                    v(e), y(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
                }, !0), Gn("lineNumbers", !1, function(e) {
                    f(e.options), s(e)
                }, !0), Gn("firstLineNumber", 1, s, !0), Gn("lineNumberFormatter", function(e) {
                    return e
                }, s, !0), Gn("showCursorWhenSelecting", !1, Ee, !0), Gn("resetSelectionOnContextMenu", !0), Gn("lineWiseCopyCut", !0), Gn("readOnly", !1, function(e, t) {
                    "nocursor" == t ? (yn(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1, e.display.input.readOnlyChanged(t)
                }), Gn("disableInput", !1, function(e, t) {
                    t || e.display.input.reset()
                }, !0), Gn("dragDrop", !0, qt), Gn("allowDropFileTypes", null), Gn("cursorBlinkRate", 530), Gn("cursorScrollMargin", 0), Gn("cursorHeight", 1, Ee, !0), Gn("singleCursorHeightPerLine", !0, Ee, !0), Gn("workTime", 100), Gn("workDelay", 100), Gn("flattenSpans", !0, r, !0), Gn("addModeClass", !1, r, !0), Gn("pollInterval", 100), Gn("undoDepth", 200, function(e, t) {
                    e.doc.history.undoDepth = t
                }), Gn("historyEventDelay", 1250), Gn("viewportMargin", 10, function(e) {
                    e.refresh()
                }, !0), Gn("maxHighlightLength", 1e4, r, !0), Gn("moveInputWithCursor", !0, function(e, t) {
                    t || e.display.input.resetPosition()
                }), Gn("tabindex", null, function(e, t) {
                    e.display.input.getField().tabIndex = t || ""
                }), Gn("autofocus", null);
                var nl = e.modes = {},
                    rl = e.mimeModes = {};
                e.defineMode = function(t, n) {
                    e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2 && (n.dependencies = Array.prototype.slice.call(arguments, 2)), nl[t] = n
                }, e.defineMIME = function(e, t) {
                    rl[e] = t
                }, e.resolveMode = function(t) {
                    if ("string" == typeof t && rl.hasOwnProperty(t)) t = rl[t];
                    else if (t && "string" == typeof t.name && rl.hasOwnProperty(t.name)) {
                        var n = rl[t.name];
                        "string" == typeof n && (n = {
                            name: n
                        }), t = Pi(n, t), t.name = n.name
                    } else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
                    return "string" == typeof t ? {
                        name: t
                    } : t || {
                        name: "null"
                    }
                }, e.getMode = function(t, n) {
                    var n = e.resolveMode(n),
                        r = nl[n.name];
                    if (!r) return e.getMode(t, "text/plain");
                    var i = r(t, n);
                    if (il.hasOwnProperty(n.name)) {
                        var o = il[n.name];
                        for (var l in o) o.hasOwnProperty(l) && (i.hasOwnProperty(l) && (i["_" + l] = i[l]), i[l] = o[l])
                    }
                    if (i.name = n.name, n.helperType && (i.helperType = n.helperType), n.modeProps)
                        for (var l in n.modeProps) i[l] = n.modeProps[l];
                    return i
                }, e.defineMode("null", function() {
                    return {
                        token: function(e) {
                            e.skipToEnd()
                        }
                    }
                }), e.defineMIME("text/plain", "null");
                var il = e.modeExtensions = {};
                e.extendMode = function(e, t) {
                    var n = il.hasOwnProperty(e) ? il[e] : il[e] = {};
                    Fi(t, n)
                }, e.defineExtension = function(t, n) {
                    e.prototype[t] = n
                }, e.defineDocExtension = function(e, t) {
                    Cl.prototype[e] = t
                }, e.defineOption = Gn;
                var ol = [];
                e.defineInitHook = function(e) {
                    ol.push(e)
                };
                var ll = e.helpers = {};
                e.registerHelper = function(t, n, r) {
                    ll.hasOwnProperty(t) || (ll[t] = e[t] = {
                        _global: []
                    }), ll[t][n] = r
                }, e.registerGlobalHelper = function(t, n, r, i) {
                    e.registerHelper(t, n, i), ll[t]._global.push({
                        pred: r,
                        val: i
                    })
                };
                var al = e.copyState = function(e, t) {
                        if (t === !0) return t;
                        if (e.copyState) return e.copyState(t);
                        var n = {};
                        for (var r in t) {
                            var i = t[r];
                            i instanceof Array && (i = i.concat([])), n[r] = i
                        }
                        return n
                    },
                    sl = e.startState = function(e, t, n) {
                        return e.startState ? e.startState(t, n) : !0
                    };
                e.innerMode = function(e, t) {
                    for (; e.innerMode;) {
                        var n = e.innerMode(t);
                        if (!n || n.mode == e) break;
                        t = n.state, e = n.mode
                    }
                    return n || {
                        mode: e,
                        state: t
                    }
                };
                var cl = e.commands = {
                        selectAll: function(e) {
                            e.setSelection(Fo(e.firstLine(), 0), Fo(e.lastLine()), Pl)
                        },
                        singleSelection: function(e) {
                            e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Pl)
                        },
                        killLine: function(e) {
                            _n(e, function(t) {
                                if (t.empty()) {
                                    var n = Zr(e.doc, t.head.line).text.length;
                                    return t.head.ch == n && t.head.line < e.lastLine() ? {
                                        from: t.head,
                                        to: Fo(t.head.line + 1, 0)
                                    } : {
                                        from: t.head,
                                        to: Fo(t.head.line, n)
                                    }
                                }
                                return {
                                    from: t.from(),
                                    to: t.to()
                                }
                            })
                        },
                        deleteLine: function(e) {
                            _n(e, function(t) {
                                return {
                                    from: Fo(t.from().line, 0),
                                    to: me(e.doc, Fo(t.to().line + 1, 0))
                                }
                            })
                        },
                        delLineLeft: function(e) {
                            _n(e, function(e) {
                                return {
                                    from: Fo(e.from().line, 0),
                                    to: e.from()
                                }
                            })
                        },
                        delWrappedLineLeft: function(e) {
                            _n(e, function(t) {
                                var n = e.charCoords(t.head, "div").top + 5,
                                    r = e.coordsChar({
                                        left: 0,
                                        top: n
                                    }, "div");
                                return {
                                    from: r,
                                    to: t.from()
                                }
                            })
                        },
                        delWrappedLineRight: function(e) {
                            _n(e, function(t) {
                                var n = e.charCoords(t.head, "div").top + 5,
                                    r = e.coordsChar({
                                        left: e.display.lineDiv.offsetWidth + 100,
                                        top: n
                                    }, "div");
                                return {
                                    from: t.from(),
                                    to: r
                                }
                            })
                        },
                        undo: function(e) {
                            e.undo()
                        },
                        redo: function(e) {
                            e.redo()
                        },
                        undoSelection: function(e) {
                            e.undoSelection()
                        },
                        redoSelection: function(e) {
                            e.redoSelection()
                        },
                        goDocStart: function(e) {
                            e.extendSelection(Fo(e.firstLine(), 0))
                        },
                        goDocEnd: function(e) {
                            e.extendSelection(Fo(e.lastLine()))
                        },
                        goLineStart: function(e) {
                            e.extendSelectionsBy(function(t) {
                                return oo(e, t.head.line)
                            }, {
                                origin: "+move",
                                bias: 1
                            })
                        },
                        goLineStartSmart: function(e) {
                            e.extendSelectionsBy(function(t) {
                                return ao(e, t.head)
                            }, {
                                origin: "+move",
                                bias: 1
                            })
                        },
                        goLineEnd: function(e) {
                            e.extendSelectionsBy(function(t) {
                                return lo(e, t.head.line)
                            }, {
                                origin: "+move",
                                bias: -1
                            })
                        },
                        goLineRight: function(e) {
                            e.extendSelectionsBy(function(t) {
                                var n = e.charCoords(t.head, "div").top + 5;
                                return e.coordsChar({
                                    left: e.display.lineDiv.offsetWidth + 100,
                                    top: n
                                }, "div")
                            }, zl)
                        },
                        goLineLeft: function(e) {
                            e.extendSelectionsBy(function(t) {
                                var n = e.charCoords(t.head, "div").top + 5;
                                return e.coordsChar({
                                    left: 0,
                                    top: n
                                }, "div")
                            }, zl)
                        },
                        goLineLeftSmart: function(e) {
                            e.extendSelectionsBy(function(t) {
                                var n = e.charCoords(t.head, "div").top + 5,
                                    r = e.coordsChar({
                                        left: 0,
                                        top: n
                                    }, "div");
                                return r.ch < e.getLine(r.line).search(/\S/) ? ao(e, t.head) : r
                            }, zl)
                        },
                        goLineUp: function(e) {
                            e.moveV(-1, "line")
                        },
                        goLineDown: function(e) {
                            e.moveV(1, "line")
                        },
                        goPageUp: function(e) {
                            e.moveV(-1, "page")
                        },
                        goPageDown: function(e) {
                            e.moveV(1, "page")
                        },
                        goCharLeft: function(e) {
                            e.moveH(-1, "char")
                        },
                        goCharRight: function(e) {
                            e.moveH(1, "char")
                        },
                        goColumnLeft: function(e) {
                            e.moveH(-1, "column")
                        },
                        goColumnRight: function(e) {
                            e.moveH(1, "column")
                        },
                        goWordLeft: function(e) {
                            e.moveH(-1, "word")
                        },
                        goGroupRight: function(e) {
                            e.moveH(1, "group")
                        },
                        goGroupLeft: function(e) {
                            e.moveH(-1, "group")
                        },
                        goWordRight: function(e) {
                            e.moveH(1, "word")
                        },
                        delCharBefore: function(e) {
                            e.deleteH(-1, "char")
                        },
                        delCharAfter: function(e) {
                            e.deleteH(1, "char")
                        },
                        delWordBefore: function(e) {
                            e.deleteH(-1, "word")
                        },
                        delWordAfter: function(e) {
                            e.deleteH(1, "word")
                        },
                        delGroupBefore: function(e) {
                            e.deleteH(-1, "group")
                        },
                        delGroupAfter: function(e) {
                            e.deleteH(1, "group")
                        },
                        indentAuto: function(e) {
                            e.indentSelection("smart")
                        },
                        indentMore: function(e) {
                            e.indentSelection("add")
                        },
                        indentLess: function(e) {
                            e.indentSelection("subtract")
                        },
                        insertTab: function(e) {
                            e.replaceSelection("	")
                        },
                        insertSoftTab: function(e) {
                            for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                                var o = n[i].from(),
                                    l = Rl(e.getLine(o.line), o.ch, r);
                                t.push(new Array(r - l % r + 1).join(" "))
                            }
                            e.replaceSelections(t)
                        },
                        defaultTab: function(e) {
                            e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
                        },
                        transposeChars: function(e) {
                            At(e, function() {
                                for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
                                    var i = t[r].head,
                                        o = Zr(e.doc, i.line).text;
                                    if (o)
                                        if (i.ch == o.length && (i = new Fo(i.line, i.ch - 1)), i.ch > 0) i = new Fo(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), Fo(i.line, i.ch - 2), i, "+transpose");
                                        else if (i.line > e.doc.first) {
                                        var l = Zr(e.doc, i.line - 1).text;
                                        l && e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1), Fo(i.line - 1, l.length - 1), Fo(i.line, 1), "+transpose")
                                    }
                                    n.push(new de(i, i))
                                }
                                e.setSelections(n)
                            })
                        },
                        newlineAndIndent: function(e) {
                            At(e, function() {
                                for (var t = e.listSelections().length, n = 0; t > n; n++) {
                                    var r = e.listSelections()[n];
                                    e.replaceRange(e.doc.lineSeparator(), r.anchor, r.head, "+input"), e.indentLine(r.from().line + 1, null, !0)
                                }
                                zn(e)
                            })
                        },
                        toggleOverwrite: function(e) {
                            e.toggleOverwrite()
                        }
                    },
                    ul = e.keyMap = {};
                ul.basic = {
                    Left: "goCharLeft",
                    Right: "goCharRight",
                    Up: "goLineUp",
                    Down: "goLineDown",
                    End: "goLineEnd",
                    Home: "goLineStartSmart",
                    PageUp: "goPageUp",
                    PageDown: "goPageDown",
                    Delete: "delCharAfter",
                    Backspace: "delCharBefore",
                    "Shift-Backspace": "delCharBefore",
                    Tab: "defaultTab",
                    "Shift-Tab": "indentAuto",
                    Enter: "newlineAndIndent",
                    Insert: "toggleOverwrite",
                    Esc: "singleSelection"
                }, ul.pcDefault = {
                    "Ctrl-A": "selectAll",
                    "Ctrl-D": "deleteLine",
                    "Ctrl-Z": "undo",
                    "Shift-Ctrl-Z": "redo",
                    "Ctrl-Y": "redo",
                    "Ctrl-Home": "goDocStart",
                    "Ctrl-End": "goDocEnd",
                    "Ctrl-Up": "goLineUp",
                    "Ctrl-Down": "goLineDown",
                    "Ctrl-Left": "goGroupLeft",
                    "Ctrl-Right": "goGroupRight",
                    "Alt-Left": "goLineStart",
                    "Alt-Right": "goLineEnd",
                    "Ctrl-Backspace": "delGroupBefore",
                    "Ctrl-Delete": "delGroupAfter",
                    "Shift-Ctrl-G": "findPrev",
                    "Shift-Ctrl-F": "replace",
                    "Shift-Ctrl-R": "replaceAll",
                    "Ctrl-[": "indentLess",
                    "Ctrl-]": "indentMore",
                    "Ctrl-U": "undoSelection",
                    "Shift-Ctrl-U": "redoSelection",
                    "Alt-U": "redoSelection",
                    fallthrough: "basic"
                }, ul.emacsy = {
                    "Ctrl-F": "goCharRight",
                    "Ctrl-B": "goCharLeft",
                    "Ctrl-P": "goLineUp",
                    "Ctrl-N": "goLineDown",
                    "Alt-F": "goWordRight",
                    "Alt-B": "goWordLeft",
                    "Ctrl-A": "goLineStart",
                    "Ctrl-E": "goLineEnd",
                    "Ctrl-V": "goPageDown",
                    "Shift-Ctrl-V": "goPageUp",
                    "Ctrl-D": "delCharAfter",
                    "Ctrl-H": "delCharBefore",
                    "Alt-D": "delWordAfter",
                    "Alt-Backspace": "delWordBefore",
                    "Ctrl-K": "killLine",
                    "Ctrl-T": "transposeChars"
                }, ul.macDefault = {
                    "Cmd-A": "selectAll",
                    "Cmd-D": "deleteLine",
                    "Cmd-Z": "undo",
                    "Shift-Cmd-Z": "redo",
                    "Cmd-Y": "redo",
                    "Cmd-Home": "goDocStart",
                    "Cmd-Up": "goDocStart",
                    "Cmd-End": "goDocEnd",
                    "Cmd-Down": "goDocEnd",
                    "Alt-Left": "goGroupLeft",
                    "Alt-Right": "goGroupRight",
                    "Cmd-Left": "goLineLeft",
                    "Cmd-Right": "goLineRight",
                    "Alt-Backspace": "delGroupBefore",
                    "Ctrl-Alt-Backspace": "delGroupAfter",
                    "Alt-Delete": "delGroupAfter",
                    "Cmd-S": "save",
                    "Cmd-F": "find",
                    "Cmd-G": "findNext",
                    "Shift-Cmd-G": "findPrev",
                    "Cmd-Alt-F": "replace",
                    "Shift-Cmd-Alt-F": "replaceAll",
                    "Cmd-[": "indentLess",
                    "Cmd-]": "indentMore",
                    "Cmd-Backspace": "delWrappedLineLeft",
                    "Cmd-Delete": "delWrappedLineRight",
                    "Cmd-U": "undoSelection",
                    "Shift-Cmd-U": "redoSelection",
                    "Ctrl-Up": "goDocStart",
                    "Ctrl-Down": "goDocEnd",
                    fallthrough: ["basic", "emacsy"]
                }, ul["default"] = Oo ? ul.macDefault : ul.pcDefault, e.normalizeKeyMap = function(e) {
                    var t = {};
                    for (var n in e)
                        if (e.hasOwnProperty(n)) {
                            var r = e[n];
                            if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
                            if ("..." == r) {
                                delete e[n];
                                continue
                            }
                            for (var i = Ei(n.split(" "), $n), o = 0; o < i.length; o++) {
                                var l, a;
                                o == i.length - 1 ? (a = i.join(" "), l = r) : (a = i.slice(0, o + 1).join(" "), l = "...");
                                var s = t[a];
                                if (s) {
                                    if (s != l) throw new Error("Inconsistent bindings for " + a)
                                } else t[a] = l
                            }
                            delete e[n]
                        }
                    for (var c in t) e[c] = t[c];
                    return e
                };
                var dl = e.lookupKey = function(e, t, n, r) {
                        t = Vn(t);
                        var i = t.call ? t.call(e, r) : t[e];
                        if (i === !1) return "nothing";
                        if ("..." === i) return "multi";
                        if (null != i && n(i)) return "handled";
                        if (t.fallthrough) {
                            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return dl(e, t.fallthrough, n, r);
                            for (var o = 0; o < t.fallthrough.length; o++) {
                                var l = dl(e, t.fallthrough[o], n, r);
                                if (l) return l
                            }
                        }
                    },
                    hl = e.isModifierKey = function(e) {
                        var t = "string" == typeof e ? e : ia[e.keyCode];
                        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
                    },
                    fl = e.keyName = function(e, t) {
                        if (So && 34 == e.keyCode && e["char"]) return !1;
                        var n = ia[e.keyCode],
                            r = n;
                        return null == r || e.altGraphKey ? !1 : (e.altKey && "Alt" != n && (r = "Alt-" + r), (Io ? e.metaKey : e.ctrlKey) && "Ctrl" != n && (r = "Ctrl-" + r), (Io ? e.ctrlKey : e.metaKey) && "Cmd" != n && (r = "Cmd-" + r), !t && e.shiftKey && "Shift" != n && (r = "Shift-" + r), r)
                    };
                e.fromTextArea = function(t, n) {
                    function r() {
                        t.value = c.getValue()
                    }
                    if (n = n ? Fi(n) : {}, n.value = t.value, !n.tabindex && t.tabIndex && (n.tabindex = t.tabIndex), !n.placeholder && t.placeholder && (n.placeholder = t.placeholder), null == n.autofocus) {
                        var i = Gi();
                        n.autofocus = i == t || null != t.getAttribute("autofocus") && i == document.body
                    }
                    if (t.form && (Al(t.form, "submit", r), !n.leaveSubmitMethodAlone)) {
                        var o = t.form,
                            l = o.submit;
                        try {
                            var a = o.submit = function() {
                                r(), o.submit = l, o.submit(), o.submit = a
                            }
                        } catch (s) {}
                    }
                    n.finishInit = function(e) {
                        e.save = r, e.getTextArea = function() {
                            return t
                        }, e.toTextArea = function() {
                            e.toTextArea = isNaN, r(), t.parentNode.removeChild(e.getWrapperElement()), t.style.display = "", t.form && (Hl(t.form, "submit", r), "function" == typeof t.form.submit && (t.form.submit = l))
                        }
                    }, t.style.display = "none";
                    var c = e(function(e) {
                        t.parentNode.insertBefore(e, t.nextSibling)
                    }, n);
                    return c
                };
                var pl = e.StringStream = function(e, t) {
                    this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0
                };
                pl.prototype = {
                    eol: function() {
                        return this.pos >= this.string.length
                    },
                    sol: function() {
                        return this.pos == this.lineStart
                    },
                    peek: function() {
                        return this.string.charAt(this.pos) || void 0
                    },
                    next: function() {
                        return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
                    },
                    eat: function(e) {
                        var t = this.string.charAt(this.pos);
                        if ("string" == typeof e) var n = t == e;
                        else var n = t && (e.test ? e.test(t) : e(t));
                        return n ? (++this.pos, t) : void 0
                    },
                    eatWhile: function(e) {
                        for (var t = this.pos; this.eat(e););
                        return this.pos > t
                    },
                    eatSpace: function() {
                        for (var e = this.pos;
                            /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
                        return this.pos > e
                    },
                    skipToEnd: function() {
                        this.pos = this.string.length
                    },
                    skipTo: function(e) {
                        var t = this.string.indexOf(e, this.pos);
                        return t > -1 ? (this.pos = t, !0) : void 0
                    },
                    backUp: function(e) {
                        this.pos -= e
                    },
                    column: function() {
                        return this.lastColumnPos < this.start && (this.lastColumnValue = Rl(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Rl(this.string, this.lineStart, this.tabSize) : 0)
                    },
                    indentation: function() {
                        return Rl(this.string, null, this.tabSize) - (this.lineStart ? Rl(this.string, this.lineStart, this.tabSize) : 0)
                    },
                    match: function(e, t, n) {
                        if ("string" != typeof e) {
                            var r = this.string.slice(this.pos).match(e);
                            return r && r.index > 0 ? null : (r && t !== !1 && (this.pos += r[0].length), r)
                        }
                        var i = function(e) {
                                return n ? e.toLowerCase() : e
                            },
                            o = this.string.substr(this.pos, e.length);
                        return i(o) == i(e) ? (t !== !1 && (this.pos += e.length), !0) : void 0
                    },
                    current: function() {
                        return this.string.slice(this.start, this.pos)
                    },
                    hideFirstChars: function(e, t) {
                        this.lineStart += e;
                        try {
                            return t()
                        } finally {
                            this.lineStart -= e
                        }
                    }
                };
                var ml = 0,
                    gl = e.TextMarker = function(e, t) {
                        this.lines = [], this.type = t, this.doc = e, this.id = ++ml
                    };
                Ai(gl), gl.prototype.clear = function() {
                    if (!this.explicitlyCleared) {
                        var e = this.doc.cm,
                            t = e && !e.curOp;
                        if (t && bt(e), Ni(this, "clear")) {
                            var n = this.find();
                            n && Si(this, "clear", n.from, n.to)
                        }
                        for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
                            var l = this.lines[o],
                                a = er(l.markedSpans, this);
                            e && !this.collapsed ? Pt(e, ti(l), "text") : e && (null != a.to && (i = ti(l)), null != a.from && (r = ti(l))), l.markedSpans = tr(l.markedSpans, a), null == a.from && this.collapsed && !kr(this.doc, l) && e && ei(l, yt(e.display))
                        }
                        if (e && this.collapsed && !e.options.lineWrapping)
                            for (var o = 0; o < this.lines.length; ++o) {
                                var s = yr(this.lines[o]),
                                    c = d(s);
                                c > e.display.maxLineLength && (e.display.maxLine = s, e.display.maxLineLength = c, e.display.maxLineChanged = !0)
                            }
                        null != r && e && this.collapsed && Dt(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ae(e.doc)), e && Si(e, "markerCleared", e, this), t && kt(e), this.parent && this.parent.clear()
                    }
                }, gl.prototype.find = function(e, t) {
                    null == e && "bookmark" == this.type && (e = 1);
                    for (var n, r, i = 0; i < this.lines.length; ++i) {
                        var o = this.lines[i],
                            l = er(o.markedSpans, this);
                        if (null != l.from && (n = Fo(t ? o : ti(o), l.from), -1 == e)) return n;
                        if (null != l.to && (r = Fo(t ? o : ti(o), l.to), 1 == e)) return r
                    }
                    return n && {
                        from: n,
                        to: r
                    }
                }, gl.prototype.changed = function() {
                    var e = this.find(-1, !0),
                        t = this,
                        n = this.doc.cm;
                    e && n && At(n, function() {
                        var r = e.line,
                            i = ti(e.line),
                            o = Je(n, i);
                        if (o && (ot(o), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !kr(t.doc, r) && null != t.height) {
                            var l = t.height;
                            t.height = null;
                            var a = Lr(t) - l;
                            a && ei(r, r.height + a)
                        }
                    })
                }, gl.prototype.attachLine = function(e) {
                    if (!this.lines.length && this.doc.cm) {
                        var t = this.doc.cm.curOp;
                        t.maybeHiddenMarkers && -1 != Ii(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
                    }
                    this.lines.push(e)
                }, gl.prototype.detachLine = function(e) {
                    if (this.lines.splice(Ii(this.lines, e), 1), !this.lines.length && this.doc.cm) {
                        var t = this.doc.cm.curOp;
                        (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
                    }
                };
                var ml = 0,
                    vl = e.SharedTextMarker = function(e, t) {
                        this.markers = e, this.primary = t;
                        for (var n = 0; n < e.length; ++n) e[n].parent = this
                    };
                Ai(vl), vl.prototype.clear = function() {
                    if (!this.explicitlyCleared) {
                        this.explicitlyCleared = !0;
                        for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
                        Si(this, "clear")
                    }
                }, vl.prototype.find = function(e, t) {
                    return this.primary.find(e, t)
                };
                var yl = e.LineWidget = function(e, t, n) {
                    if (n)
                        for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
                    this.doc = e, this.node = t
                };
                Ai(yl), yl.prototype.clear = function() {
                    var e = this.doc.cm,
                        t = this.line.widgets,
                        n = this.line,
                        r = ti(n);
                    if (null != r && t) {
                        for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
                        t.length || (n.widgets = null);
                        var o = Lr(this);
                        ei(n, Math.max(0, n.height - o)), e && At(e, function() {
                            Sr(e, n, -o), Pt(e, r, "widget")
                        })
                    }
                }, yl.prototype.changed = function() {
                    var e = this.height,
                        t = this.doc.cm,
                        n = this.line;
                    this.height = null;
                    var r = Lr(this) - e;
                    r && (ei(n, n.height + r), t && At(t, function() {
                        t.curOp.forceUpdate = !0, Sr(t, n, r)
                    }))
                };
                var xl = e.Line = function(e, t, n) {
                    this.text = e, ur(this, t), this.height = n ? n(this) : 1
                };
                Ai(xl), xl.prototype.lineNo = function() {
                    return ti(this)
                };
                var bl = {},
                    wl = {};
                Vr.prototype = {
                    chunkSize: function() {
                        return this.lines.length
                    },
                    removeInner: function(e, t) {
                        for (var n = e, r = e + t; r > n; ++n) {
                            var i = this.lines[n];
                            this.height -= i.height, Nr(i), Si(i, "delete")
                        }
                        this.lines.splice(e, t)
                    },
                    collapse: function(e) {
                        e.push.apply(e, this.lines)
                    },
                    insertInner: function(e, t, n) {
                        this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                        for (var r = 0; r < t.length; ++r) t[r].parent = this
                    },
                    iterN: function(e, t, n) {
                        for (var r = e + t; r > e; ++e)
                            if (n(this.lines[e])) return !0
                    }
                }, Kr.prototype = {
                    chunkSize: function() {
                        return this.size
                    },
                    removeInner: function(e, t) {
                        this.size -= t;
                        for (var n = 0; n < this.children.length; ++n) {
                            var r = this.children[n],
                                i = r.chunkSize();
                            if (i > e) {
                                var o = Math.min(t, i - e),
                                    l = r.height;
                                if (r.removeInner(e, o), this.height -= l - r.height, i == o && (this.children.splice(n--, 1), r.parent = null), 0 == (t -= o)) break;
                                e = 0
                            } else e -= i
                        }
                        if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Vr))) {
                            var a = [];
                            this.collapse(a), this.children = [new Vr(a)], this.children[0].parent = this
                        }
                    },
                    collapse: function(e) {
                        for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
                    },
                    insertInner: function(e, t, n) {
                        this.size += t.length, this.height += n;
                        for (var r = 0; r < this.children.length; ++r) {
                            var i = this.children[r],
                                o = i.chunkSize();
                            if (o >= e) {
                                if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
                                    for (; i.lines.length > 50;) {
                                        var l = i.lines.splice(i.lines.length - 25, 25),
                                            a = new Vr(l);
                                        i.height -= a.height, this.children.splice(r + 1, 0, a), a.parent = this
                                    }
                                    this.maybeSpill()
                                }
                                break
                            }
                            e -= o
                        }
                    },
                    maybeSpill: function() {
                        if (!(this.children.length <= 10)) {
                            var e = this;
                            do {
                                var t = e.children.splice(e.children.length - 5, 5),
                                    n = new Kr(t);
                                if (e.parent) {
                                    e.size -= n.size, e.height -= n.height;
                                    var r = Ii(e.parent.children, e);
                                    e.parent.children.splice(r + 1, 0, n)
                                } else {
                                    var i = new Kr(e.children);
                                    i.parent = e, e.children = [i, n], e = i
                                }
                                n.parent = e.parent
                            } while (e.children.length > 10);
                            e.parent.maybeSpill()
                        }
                    },
                    iterN: function(e, t, n) {
                        for (var r = 0; r < this.children.length; ++r) {
                            var i = this.children[r],
                                o = i.chunkSize();
                            if (o > e) {
                                var l = Math.min(t, o - e);
                                if (i.iterN(e, l, n)) return !0;
                                if (0 == (t -= l)) break;
                                e = 0
                            } else e -= o
                        }
                    }
                };
                var kl = 0,
                    Cl = e.Doc = function(e, t, n, r) {
                        if (!(this instanceof Cl)) return new Cl(e, t, n, r);
                        null == n && (n = 0), Kr.call(this, [new Vr([new xl("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = n;
                        var i = Fo(n, 0);
                        this.sel = fe(i), this.history = new oi(null), this.id = ++kl, this.modeOption = t, this.lineSep = r, this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), $r(this, {
                            from: i,
                            to: i,
                            text: e
                        }), Te(this, fe(i), Pl)
                    };
                Cl.prototype = Pi(Kr.prototype, {
                    constructor: Cl,
                    iter: function(e, t, n) {
                        n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
                    },
                    insert: function(e, t) {
                        for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
                        this.insertInner(e - this.first, t, n)
                    },
                    remove: function(e, t) {
                        this.removeInner(e - this.first, t)
                    },
                    getValue: function(e) {
                        var t = Jr(this, this.first, this.first + this.size);
                        return e === !1 ? t : t.join(e || this.lineSeparator())
                    },
                    setValue: Wt(function(e) {
                        var t = Fo(this.first, 0),
                            n = this.first + this.size - 1;
                        Tn(this, {
                            from: t,
                            to: Fo(n, Zr(this, n).text.length),
                            text: this.splitLines(e),
                            origin: "setValue",
                            full: !0
                        }, !0), Te(this, fe(t))
                    }),
                    replaceRange: function(e, t, n, r) {
                        t = me(this, t), n = n ? me(this, n) : t, Wn(this, e, t, n, r)
                    },
                    getRange: function(e, t, n) {
                        var r = Qr(this, me(this, e), me(this, t));
                        return n === !1 ? r : r.join(n || this.lineSeparator())
                    },
                    getLine: function(e) {
                        var t = this.getLineHandle(e);
                        return t && t.text
                    },
                    getLineHandle: function(e) {
                        return ve(this, e) ? Zr(this, e) : void 0
                    },
                    getLineNumber: function(e) {
                        return ti(e)
                    },
                    getLineHandleVisualStart: function(e) {
                        return "number" == typeof e && (e = Zr(this, e)), yr(e)
                    },
                    lineCount: function() {
                        return this.size
                    },
                    firstLine: function() {
                        return this.first
                    },
                    lastLine: function() {
                        return this.first + this.size - 1
                    },
                    clipPos: function(e) {
                        return me(this, e)
                    },
                    getCursor: function(e) {
                        var t, n = this.sel.primary();
                        return t = null == e || "head" == e ? n.head : "anchor" == e ? n.anchor : "end" == e || "to" == e || e === !1 ? n.to() : n.from()
                    },
                    listSelections: function() {
                        return this.sel.ranges
                    },
                    somethingSelected: function() {
                        return this.sel.somethingSelected()
                    },
                    setCursor: Wt(function(e, t, n) {
                        Ce(this, me(this, "number" == typeof e ? Fo(e, t || 0) : e), null, n)
                    }),
                    setSelection: Wt(function(e, t, n) {
                        Ce(this, me(this, e), me(this, t || e), n)
                    }),
                    extendSelection: Wt(function(e, t, n) {
                        be(this, me(this, e), t && me(this, t), n)
                    }),
                    extendSelections: Wt(function(e, t) {
                        we(this, ye(this, e), t)
                    }),
                    extendSelectionsBy: Wt(function(e, t) {
                        var n = Ei(this.sel.ranges, e);
                        we(this, ye(this, n), t)
                    }),
                    setSelections: Wt(function(e, t, n) {
                        if (e.length) {
                            for (var r = 0, i = []; r < e.length; r++) i[r] = new de(me(this, e[r].anchor), me(this, e[r].head));
                            null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Te(this, he(i, t), n)
                        }
                    }),
                    addSelection: Wt(function(e, t, n) {
                        var r = this.sel.ranges.slice(0);
                        r.push(new de(me(this, e), me(this, t || e))), Te(this, he(r, r.length - 1), n)
                    }),
                    getSelection: function(e) {
                        for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
                            var i = Qr(this, n[r].from(), n[r].to());
                            t = t ? t.concat(i) : i
                        }
                        return e === !1 ? t : t.join(e || this.lineSeparator())
                    },
                    getSelections: function(e) {
                        for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
                            var i = Qr(this, n[r].from(), n[r].to());
                            e !== !1 && (i = i.join(e || this.lineSeparator())), t[r] = i
                        }
                        return t
                    },
                    replaceSelection: function(e, t, n) {
                        for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
                        this.replaceSelections(r, t, n || "+input")
                    },
                    replaceSelections: Wt(function(e, t, n) {
                        for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                            var l = i.ranges[o];
                            r[o] = {
                                from: l.from(),
                                to: l.to(),
                                text: this.splitLines(e[o]),
                                origin: n
                            }
                        }
                        for (var a = t && "end" != t && Sn(this, r, t), o = r.length - 1; o >= 0; o--) Tn(this, r[o]);
                        a ? Le(this, a) : this.cm && zn(this.cm)
                    }),
                    undo: Wt(function() {
                        Nn(this, "undo")
                    }),
                    redo: Wt(function() {
                        Nn(this, "redo")
                    }),
                    undoSelection: Wt(function() {
                        Nn(this, "undo", !0)
                    }),
                    redoSelection: Wt(function() {
                        Nn(this, "redo", !0)
                    }),
                    setExtending: function(e) {
                        this.extend = e
                    },
                    getExtending: function() {
                        return this.extend
                    },
                    historySize: function() {
                        for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t;
                        for (var r = 0; r < e.undone.length; r++) e.undone[r].ranges || ++n;
                        return {
                            undo: t,
                            redo: n
                        }
                    },
                    clearHistory: function() {
                        this.history = new oi(this.history.maxGeneration)
                    },
                    markClean: function() {
                        this.cleanGeneration = this.changeGeneration(!0)
                    },
                    changeGeneration: function(e) {
                        return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
                    },
                    isClean: function(e) {
                        return this.history.generation == (e || this.cleanGeneration)
                    },
                    getHistory: function() {
                        return {
                            done: gi(this.history.done),
                            undone: gi(this.history.undone)
                        }
                    },
                    setHistory: function(e) {
                        var t = this.history = new oi(this.history.maxGeneration);
                        t.done = gi(e.done.slice(0), null, !0), t.undone = gi(e.undone.slice(0), null, !0)
                    },
                    addLineClass: Wt(function(e, t, n) {
                        return jn(this, e, "gutter" == t ? "gutter" : "class", function(e) {
                            var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                            if (e[r]) {
                                if ($i(n).test(e[r])) return !1;
                                e[r] += " " + n
                            } else e[r] = n;
                            return !0
                        })
                    }),
                    removeLineClass: Wt(function(e, t, n) {
                        return jn(this, e, "gutter" == t ? "gutter" : "class", function(e) {
                            var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
                                i = e[r];
                            if (!i) return !1;
                            if (null == n) e[r] = null;
                            else {
                                var o = i.match($i(n));
                                if (!o) return !1;
                                var l = o.index + o[0].length;
                                e[r] = i.slice(0, o.index) + (o.index && l != i.length ? " " : "") + i.slice(l) || null
                            }
                            return !0
                        })
                    }),
                    addLineWidget: Wt(function(e, t, n) {
                        return Tr(this, e, t, n)
                    }),
                    removeLineWidget: function(e) {
                        e.clear()
                    },
                    markText: function(e, t, n) {
                        return Kn(this, me(this, e), me(this, t), n, n && n.type || "range")
                    },
                    setBookmark: function(e, t) {
                        var n = {
                            replacedWith: t && (null == t.nodeType ? t.widget : t),
                            insertLeft: t && t.insertLeft,
                            clearWhenEmpty: !1,
                            shared: t && t.shared,
                            handleMouseEvents: t && t.handleMouseEvents
                        };
                        return e = me(this, e), Kn(this, e, e, n, "bookmark")
                    },
                    findMarksAt: function(e) {
                        e = me(this, e);
                        var t = [],
                            n = Zr(this, e.line).markedSpans;
                        if (n)
                            for (var r = 0; r < n.length; ++r) {
                                var i = n[r];
                                (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                            }
                        return t
                    },
                    findMarks: function(e, t, n) {
                        e = me(this, e), t = me(this, t);
                        var r = [],
                            i = e.line;
                        return this.iter(e.line, t.line + 1, function(o) {
                            var l = o.markedSpans;
                            if (l)
                                for (var a = 0; a < l.length; a++) {
                                    var s = l[a];
                                    null != s.to && i == e.line && e.ch > s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from > t.ch || n && !n(s.marker) || r.push(s.marker.parent || s.marker)
                                }++i
                        }), r
                    },
                    getAllMarks: function() {
                        var e = [];
                        return this.iter(function(t) {
                            var n = t.markedSpans;
                            if (n)
                                for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker)
                        }), e
                    },
                    posFromIndex: function(e) {
                        var t, n = this.first;
                        return this.iter(function(r) {
                            var i = r.text.length + 1;
                            return i > e ? (t = e, !0) : (e -= i, void++n)
                        }), me(this, Fo(n, t))
                    },
                    indexFromPos: function(e) {
                        e = me(this, e);
                        var t = e.ch;
                        return e.line < this.first || e.ch < 0 ? 0 : (this.iter(this.first, e.line, function(e) {
                            t += e.text.length + 1
                        }), t)
                    },
                    copy: function(e) {
                        var t = new Cl(Jr(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);
                        return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
                    },
                    linkedDoc: function(e) {
                        e || (e = {});
                        var t = this.first,
                            n = this.first + this.size;
                        null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
                        var r = new Cl(Jr(this, t, n), e.mode || this.modeOption, t, this.lineSep);
                        return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
                            doc: r,
                            sharedHist: e.sharedHist
                        }), r.linked = [{
                            doc: this,
                            isParent: !0,
                            sharedHist: e.sharedHist
                        }], Zn(r, Yn(this)), r
                    },
                    unlinkDoc: function(t) {
                        if (t instanceof e && (t = t.doc), this.linked)
                            for (var n = 0; n < this.linked.length; ++n) {
                                var r = this.linked[n];
                                if (r.doc == t) {
                                    this.linked.splice(n, 1), t.unlinkDoc(this), Qn(Yn(this));
                                    break
                                }
                            }
                        if (t.history == this.history) {
                            var i = [t.id];
                            Xr(t, function(e) {
                                i.push(e.id)
                            }, !0), t.history = new oi(null), t.history.done = gi(this.history.done, i), t.history.undone = gi(this.history.undone, i)
                        }
                    },
                    iterLinkedDocs: function(e) {
                        Xr(this, e)
                    },
                    getMode: function() {
                        return this.mode
                    },
                    getEditor: function() {
                        return this.cm
                    },
                    splitLines: function(e) {
                        return this.lineSep ? e.split(this.lineSep) : ea(e)
                    },
                    lineSeparator: function() {
                        return this.lineSep || "\n"
                    }
                }), Cl.prototype.eachLine = Cl.prototype.iter;
                var Sl = "iter insert remove copy getEditor constructor".split(" ");
                for (var Ll in Cl.prototype) Cl.prototype.hasOwnProperty(Ll) && Ii(Sl, Ll) < 0 && (e.prototype[Ll] = function(e) {
                    return function() {
                        return e.apply(this.doc, arguments)
                    }
                }(Cl.prototype[Ll]));
                Ai(Cl);
                var Tl = e.e_preventDefault = function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1
                    },
                    Ml = e.e_stopPropagation = function(e) {
                        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                    },
                    Nl = e.e_stop = function(e) {
                        Tl(e), Ml(e)
                    },
                    Al = e.on = function(e, t, n) {
                        if (e.addEventListener) e.addEventListener(t, n, !1);
                        else if (e.attachEvent) e.attachEvent("on" + t, n);
                        else {
                            var r = e._handlers || (e._handlers = {}),
                                i = r[t] || (r[t] = []);
                            i.push(n)
                        }
                    },
                    Ol = [],
                    Hl = e.off = function(e, t, n) {
                        if (e.removeEventListener) e.removeEventListener(t, n, !1);
                        else if (e.detachEvent) e.detachEvent("on" + t, n);
                        else
                            for (var r = Ci(e, t, !1), i = 0; i < r.length; ++i)
                                if (r[i] == n) {
                                    r.splice(i, 1);
                                    break
                                }
                    },
                    Wl = e.signal = function(e, t) {
                        var n = Ci(e, t, !0);
                        if (n.length)
                            for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r)
                    },
                    Il = null,
                    El = 30,
                    Dl = e.Pass = {
                        toString: function() {
                            return "CodeMirror.Pass"
                        }
                    },
                    Pl = {
                        scroll: !1
                    },
                    Fl = {
                        origin: "*mouse"
                    },
                    zl = {
                        origin: "+move"
                    };
                Oi.prototype.set = function(e, t) {
                    clearTimeout(this.id), this.id = setTimeout(t, e)
                };
                var Rl = e.countColumn = function(e, t, n, r, i) {
                        null == t && (t = e.search(/[^\s\u00a0]/), -1 == t && (t = e.length));
                        for (var o = r || 0, l = i || 0;;) {
                            var a = e.indexOf("	", o);
                            if (0 > a || a >= t) return l + (t - o);
                            l += a - o, l += n - l % n, o = a + 1
                        }
                    },
                    Bl = e.findColumn = function(e, t, n) {
                        for (var r = 0, i = 0;;) {
                            var o = e.indexOf("	", r); - 1 == o && (o = e.length);
                            var l = o - r;
                            if (o == e.length || i + l >= t) return r + Math.min(l, t - i);
                            if (i += o - r, i += n - i % n, r = o + 1, i >= t) return r
                        }
                    },
                    jl = [""],
                    _l = function(e) {
                        e.select()
                    };
                No ? _l = function(e) {
                    e.selectionStart = 0, e.selectionEnd = e.value.length
                } : xo && (_l = function(e) {
                    try {
                        e.select()
                    } catch (t) {}
                });
                var ql, Ul = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
                    Gl = e.isWordChar = function(e) {
                        return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Ul.test(e))
                    },
                    $l = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
                ql = document.createRange ? function(e, t, n, r) {
                    var i = document.createRange();
                    return i.setEnd(r || e, n), i.setStart(e, t), i
                } : function(e, t, n) {
                    var r = document.body.createTextRange();
                    try {
                        r.moveToElementText(e.parentNode)
                    } catch (i) {
                        return r
                    }
                    return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r
                };
                var Vl = e.contains = function(e, t) {
                    if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
                    do
                        if (11 == t.nodeType && (t = t.host), t == e) return !0;
                    while (t = t.parentNode)
                };
                xo && 11 > bo && (Gi = function() {
                    try {
                        return document.activeElement
                    } catch (e) {
                        return document.body
                    }
                });
                var Kl, Xl, Yl = e.rmClass = function(e, t) {
                        var n = e.className,
                            r = $i(t).exec(n);
                        if (r) {
                            var i = n.slice(r.index + r[0].length);
                            e.className = n.slice(0, r.index) + (i ? r[1] + i : "")
                        }
                    },
                    Zl = e.addClass = function(e, t) {
                        var n = e.className;
                        $i(t).test(n) || (e.className += (n ? " " : "") + t)
                    },
                    Ql = !1,
                    Jl = function() {
                        if (xo && 9 > bo) return !1;
                        var e = _i("div");
                        return "draggable" in e || "dragDrop" in e
                    }(),
                    ea = e.splitLines = 3 != "\n\nb".split(/\n/).length ? function(e) {
                        for (var t = 0, n = [], r = e.length; r >= t;) {
                            var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                            var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                                l = o.indexOf("\r"); - 1 != l ? (n.push(o.slice(0, l)), t += l + 1) : (n.push(o), t = i + 1)
                        }
                        return n
                    } : function(e) {
                        return e.split(/\r\n?|\n/)
                    },
                    ta = window.getSelection ? function(e) {
                        try {
                            return e.selectionStart != e.selectionEnd
                        } catch (t) {
                            return !1
                        }
                    } : function(e) {
                        try {
                            var t = e.ownerDocument.selection.createRange()
                        } catch (n) {}
                        return t && t.parentElement() == e ? 0 != t.compareEndPoints("StartToEnd", t) : !1
                    },
                    na = function() {
                        var e = _i("div");
                        return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy)
                    }(),
                    ra = null,
                    ia = e.keyNames = {
                        3: "Enter",
                        8: "Backspace",
                        9: "Tab",
                        13: "Enter",
                        16: "Shift",
                        17: "Ctrl",
                        18: "Alt",
                        19: "Pause",
                        20: "CapsLock",
                        27: "Esc",
                        32: "Space",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "Left",
                        38: "Up",
                        39: "Right",
                        40: "Down",
                        44: "PrintScrn",
                        45: "Insert",
                        46: "Delete",
                        59: ";",
                        61: "=",
                        91: "Mod",
                        92: "Mod",
                        93: "Mod",
                        106: "*",
                        107: "=",
                        109: "-",
                        110: ".",
                        111: "/",
                        127: "Delete",
                        173: "-",
                        186: ";",
                        187: "=",
                        188: ",",
                        189: "-",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'",
                        63232: "Up",
                        63233: "Down",
                        63234: "Left",
                        63235: "Right",
                        63272: "Delete",
                        63273: "Home",
                        63275: "End",
                        63276: "PageUp",
                        63277: "PageDown",
                        63302: "Insert"
                    };
                ! function() {
                    for (var e = 0; 10 > e; e++) ia[e + 48] = ia[e + 96] = String(e);
                    for (var e = 65; 90 >= e; e++) ia[e] = String.fromCharCode(e);
                    for (var e = 1; 12 >= e; e++) ia[e + 111] = ia[e + 63235] = "F" + e
                }();
                var oa, la = function() {
                    function e(e) {
                        return 247 >= e ? n.charAt(e) : e >= 1424 && 1524 >= e ? "R" : e >= 1536 && 1773 >= e ? r.charAt(e - 1536) : e >= 1774 && 2220 >= e ? "r" : e >= 8192 && 8203 >= e ? "w" : 8204 == e ? "b" : "L"
                    }

                    function t(e, t, n) {
                        this.level = e, this.from = t, this.to = n
                    }
                    var n = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
                        r = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
                        i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                        o = /[stwN]/,
                        l = /[LRr]/,
                        a = /[Lb1n]/,
                        s = /[1n]/,
                        c = "L";
                    return function(n) {
                        if (!i.test(n)) return !1;
                        for (var r, u = n.length, d = [], h = 0; u > h; ++h) d.push(r = e(n.charCodeAt(h)));
                        for (var h = 0, f = c; u > h; ++h) {
                            var r = d[h];
                            "m" == r ? d[h] = f : f = r
                        }
                        for (var h = 0, p = c; u > h; ++h) {
                            var r = d[h];
                            "1" == r && "r" == p ? d[h] = "n" : l.test(r) && (p = r, "r" == r && (d[h] = "R"))
                        }
                        for (var h = 1, f = d[0]; u - 1 > h; ++h) {
                            var r = d[h];
                            "+" == r && "1" == f && "1" == d[h + 1] ? d[h] = "1" : "," != r || f != d[h + 1] || "1" != f && "n" != f || (d[h] = f), f = r
                        }
                        for (var h = 0; u > h; ++h) {
                            var r = d[h];
                            if ("," == r) d[h] = "N";
                            else if ("%" == r) {
                                for (var m = h + 1; u > m && "%" == d[m]; ++m);
                                for (var g = h && "!" == d[h - 1] || u > m && "1" == d[m] ? "1" : "N", v = h; m > v; ++v) d[v] = g;
                                h = m - 1
                            }
                        }
                        for (var h = 0, p = c; u > h; ++h) {
                            var r = d[h];
                            "L" == p && "1" == r ? d[h] = "L" : l.test(r) && (p = r)
                        }
                        for (var h = 0; u > h; ++h)
                            if (o.test(d[h])) {
                                for (var m = h + 1; u > m && o.test(d[m]); ++m);
                                for (var y = "L" == (h ? d[h - 1] : c), x = "L" == (u > m ? d[m] : c), g = y || x ? "L" : "R", v = h; m > v; ++v) d[v] = g;
                                h = m - 1
                            }
                        for (var b, w = [], h = 0; u > h;)
                            if (a.test(d[h])) {
                                var k = h;
                                for (++h; u > h && a.test(d[h]); ++h);
                                w.push(new t(0, k, h))
                            } else {
                                var C = h,
                                    S = w.length;
                                for (++h; u > h && "L" != d[h]; ++h);
                                for (var v = C; h > v;)
                                    if (s.test(d[v])) {
                                        v > C && w.splice(S, 0, new t(1, C, v));
                                        var L = v;
                                        for (++v; h > v && s.test(d[v]); ++v);
                                        w.splice(S, 0, new t(2, L, v)), C = v
                                    } else ++v;
                                h > C && w.splice(S, 0, new t(1, C, h))
                            }
                        return 1 == w[0].level && (b = n.match(/^\s+/)) && (w[0].from = b[0].length, w.unshift(new t(0, 0, b[0].length))), 1 == Wi(w).level && (b = n.match(/\s+$/)) && (Wi(w).to -= b[0].length, w.push(new t(0, u - b[0].length, u))), 2 == w[0].level && w.unshift(new t(1, w[0].to, w[0].to)), w[0].level != Wi(w).level && w.push(new t(w[0].level, u, u)), w
                    }
                }();
                return e.version = "5.12.1", e
            })
        }, {}],
        8: [function(t, n, r) {
            ! function(i) {
                "object" == typeof r && "object" == typeof n ? i(t("../../lib/codemirror"), t("../markdown/markdown"), t("../../addon/mode/overlay")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror", "../markdown/markdown", "../../addon/mode/overlay"], i) : i(CodeMirror)
            }(function(e) {
                "use strict";
                var t = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;
                e.defineMode("gfm", function(n, r) {
                    function i(e) {
                        return e.code = !1, null
                    }
                    var o = 0,
                        l = {
                            startState: function() {
                                return {
                                    code: !1,
                                    codeBlock: !1,
                                    ateSpace: !1
                                }
                            },
                            copyState: function(e) {
                                return {
                                    code: e.code,
                                    codeBlock: e.codeBlock,
                                    ateSpace: e.ateSpace
                                }
                            },
                            token: function(e, n) {
                                if (n.combineTokens = null, n.codeBlock) return e.match(/^```+/) ? (n.codeBlock = !1, null) : (e.skipToEnd(), null);
                                if (e.sol() && (n.code = !1), e.sol() && e.match(/^```+/)) return e.skipToEnd(), n.codeBlock = !0, null;
                                if ("`" === e.peek()) {
                                    e.next();
                                    var i = e.pos;
                                    e.eatWhile("`");
                                    var l = 1 + e.pos - i;
                                    return n.code ? l === o && (n.code = !1) : (o = l, n.code = !0), null
                                }
                                if (n.code) return e.next(), null;
                                if (e.eatSpace()) return n.ateSpace = !0, null;
                                if ((e.sol() || n.ateSpace) && (n.ateSpace = !1, r.gitHubSpice !== !1)) {
                                    if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)) return n.combineTokens = !0, "link";
                                    if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return n.combineTokens = !0, "link"
                                }
                                return e.match(t) && "](" != e.string.slice(e.start - 2, e.start) && (0 == e.start || /\W/.test(e.string.charAt(e.start - 1))) ? (n.combineTokens = !0, "link") : (e.next(), null)
                            },
                            blankLine: i
                        },
                        a = {
                            underscoresBreakWords: !1,
                            taskLists: !0,
                            fencedCodeBlocks: "```",
                            strikethrough: !0
                        };
                    for (var s in r) a[s] = r[s];
                    return a.name = "markdown", e.overlayMode(e.getMode(n, a), l)
                }, "markdown"), e.defineMIME("text/x-gfm", "gfm")
            })
        }, {
            "../../addon/mode/overlay": 6,
            "../../lib/codemirror": 7,
            "../markdown/markdown": 9
        }],
        9: [function(t, n, r) {
            ! function(i) {
                "object" == typeof r && "object" == typeof n ? i(t("../../lib/codemirror"), t("../xml/xml"), t("../meta")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror", "../xml/xml", "../meta"], i) : i(CodeMirror)
            }(function(e) {
                "use strict";
                e.defineMode("markdown", function(t, n) {
                    function r(n) {
                        if (e.findModeByName) {
                            var r = e.findModeByName(n);
                            r && (n = r.mime || r.mimes[0])
                        }
                        var i = e.getMode(t, n);
                        return "null" == i.name ? null : i
                    }

                    function i(e, t, n) {
                        return t.f = t.inline = n, n(e, t)
                    }

                    function o(e, t, n) {
                        return t.f = t.block = n, n(e, t)
                    }

                    function l(e) {
                        return !e || !/\S/.test(e.string)
                    }

                    function a(e) {
                        return e.linkTitle = !1, e.em = !1, e.strong = !1, e.strikethrough = !1, e.quote = 0, e.indentedCode = !1, C && e.f == c && (e.f = p, e.block = s), e.trailingSpace = 0, e.trailingSpaceNewLine = !1, e.prevLine = e.thisLine, e.thisLine = null, null
                    }

                    function s(e, t) {
                        var o = e.sol(),
                            a = t.list !== !1,
                            s = t.indentedCode;
                        t.indentedCode = !1, a && (t.indentationDiff >= 0 ? (t.indentationDiff < 4 && (t.indentation -= t.indentationDiff), t.list = null) : t.indentation > 0 ? t.list = null : t.list = !1);
                        var c = null;
                        if (t.indentationDiff >= 4) return e.skipToEnd(), s || l(t.prevLine) ? (t.indentation -= 4, t.indentedCode = !0, S.code) : null;
                        if (e.eatSpace()) return null;
                        if ((c = e.match(O)) && c[1].length <= 6) return t.header = c[1].length, n.highlightFormatting && (t.formatting = "header"), t.f = t.inline, h(t);
                        if (!(l(t.prevLine) || t.quote || a || s) && (c = e.match(H))) return t.header = "=" == c[0].charAt(0) ? 1 : 2, n.highlightFormatting && (t.formatting = "header"), t.f = t.inline, h(t);
                        if (e.eat(">")) return t.quote = o ? 1 : t.quote + 1, n.highlightFormatting && (t.formatting = "quote"), e.eatSpace(), h(t);
                        if ("[" === e.peek()) return i(e, t, y);
                        if (e.match(T, !0)) return t.hr = !0, S.hr;
                        if ((l(t.prevLine) || a) && (e.match(M, !1) || e.match(N, !1))) {
                            var d = null;
                            for (e.match(M, !0) ? d = "ul" : (e.match(N, !0), d = "ol"), t.indentation = e.column() + e.current().length, t.list = !0; t.listStack && e.column() < t.listStack[t.listStack.length - 1];) t.listStack.pop();
                            return t.listStack.push(t.indentation), n.taskLists && e.match(A, !1) && (t.taskList = !0), t.f = t.inline, n.highlightFormatting && (t.formatting = ["list", "list-" + d]), h(t)
                        }
                        return n.fencedCodeBlocks && (c = e.match(I, !0)) ? (t.fencedChars = c[1], t.localMode = r(c[2]), t.localMode && (t.localState = t.localMode.startState()), t.f = t.block = u, n.highlightFormatting && (t.formatting = "code-block"), t.code = -1, h(t)) : i(e, t, t.inline)
                    }

                    function c(t, n) {
                        var r = k.token(t, n.htmlState);
                        if (!C) {
                            var i = e.innerMode(k, n.htmlState);
                            ("xml" == i.mode.name && null === i.state.tagStart && !i.state.context && i.state.tokenize.isInText || n.md_inside && t.current().indexOf(">") > -1) && (n.f = p, n.block = s, n.htmlState = null)
                        }
                        return r
                    }

                    function u(e, t) {
                        return t.fencedChars && e.match(t.fencedChars, !1) ? (t.localMode = t.localState = null, t.f = t.block = d, null) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), S.code)
                    }

                    function d(e, t) {
                        e.match(t.fencedChars), t.block = s, t.f = p, t.fencedChars = null, n.highlightFormatting && (t.formatting = "code-block"), t.code = 1;
                        var r = h(t);
                        return t.code = 0, r
                    }

                    function h(e) {
                        var t = [];
                        if (e.formatting) {
                            t.push(S.formatting), "string" == typeof e.formatting && (e.formatting = [e.formatting]);
                            for (var r = 0; r < e.formatting.length; r++) t.push(S.formatting + "-" + e.formatting[r]), "header" === e.formatting[r] && t.push(S.formatting + "-" + e.formatting[r] + "-" + e.header), "quote" === e.formatting[r] && (!n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(S.formatting + "-" + e.formatting[r] + "-" + e.quote) : t.push("error"))
                        }
                        if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;
                        if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;
                        if (e.linkHref ? t.push(S.linkHref, "url") : (e.strong && t.push(S.strong), e.em && t.push(S.em), e.strikethrough && t.push(S.strikethrough), e.linkText && t.push(S.linkText), e.code && t.push(S.code)), e.header && t.push(S.header, S.header + "-" + e.header), e.quote && (t.push(S.quote), !n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(S.quote + "-" + e.quote) : t.push(S.quote + "-" + n.maxBlockquoteDepth)), e.list !== !1) {
                            var i = (e.listStack.length - 1) % 3;
                            i ? 1 === i ? t.push(S.list2) : t.push(S.list3) : t.push(S.list1)
                        }
                        return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null
                    }

                    function f(e, t) {
                        return e.match(W, !0) ? h(t) : void 0
                    }

                    function p(t, r) {
                        var i = r.text(t, r);
                        if ("undefined" != typeof i) return i;
                        if (r.list) return r.list = null, h(r);
                        if (r.taskList) {
                            var l = "x" !== t.match(A, !0)[1];
                            return l ? r.taskOpen = !0 : r.taskClosed = !0, n.highlightFormatting && (r.formatting = "task"), r.taskList = !1, h(r)
                        }
                        if (r.taskOpen = !1, r.taskClosed = !1, r.header && t.match(/^#+$/, !0)) return n.highlightFormatting && (r.formatting = "header"), h(r);
                        var a = t.sol(),
                            s = t.next();
                        if (r.linkTitle) {
                            r.linkTitle = !1;
                            var u = s;
                            "(" === s && (u = ")"), u = (u + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                            var d = "^\\s*(?:[^" + u + "\\\\]+|\\\\\\\\|\\\\.)" + u;
                            if (t.match(new RegExp(d), !0)) return S.linkHref
                        }
                        if ("`" === s) {
                            var f = r.formatting;
                            n.highlightFormatting && (r.formatting = "code"), t.eatWhile("`");
                            var p = t.current().length;
                            if (0 == r.code) return r.code = p, h(r);
                            if (p == r.code) {
                                var v = h(r);
                                return r.code = 0, v
                            }
                            return r.formatting = f, h(r)
                        }
                        if (r.code) return h(r);
                        if ("\\" === s && (t.next(), n.highlightFormatting)) {
                            var y = h(r),
                                x = S.formatting + "-escape";
                            return y ? y + " " + x : x
                        }
                        if ("!" === s && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return t.match(/\[[^\]]*\]/), r.inline = r.f = g, S.image;
                        if ("[" === s && t.match(/.*\](\(.*\)| ?\[.*\])/, !1)) return r.linkText = !0, n.highlightFormatting && (r.formatting = "link"), h(r);
                        if ("]" === s && r.linkText && t.match(/\(.*\)| ?\[.*\]/, !1)) {
                            n.highlightFormatting && (r.formatting = "link");
                            var y = h(r);
                            return r.linkText = !1, r.inline = r.f = g, y
                        }
                        if ("<" === s && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
                            r.f = r.inline = m, n.highlightFormatting && (r.formatting = "link");
                            var y = h(r);
                            return y ? y += " " : y = "", y + S.linkInline
                        }
                        if ("<" === s && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
                            r.f = r.inline = m, n.highlightFormatting && (r.formatting = "link");
                            var y = h(r);
                            return y ? y += " " : y = "", y + S.linkEmail
                        }
                        if ("<" === s && t.match(/^(!--|\w)/, !1)) {
                            var b = t.string.indexOf(">", t.pos);
                            if (-1 != b) {
                                var w = t.string.substring(t.start, b);
                                /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(w) && (r.md_inside = !0)
                            }
                            return t.backUp(1), r.htmlState = e.startState(k), o(t, r, c)
                        }
                        if ("<" === s && t.match(/^\/\w*?>/)) return r.md_inside = !1, "tag";
                        var C = !1;
                        if (!n.underscoresBreakWords && "_" === s && "_" !== t.peek() && t.match(/(\w)/, !1)) {
                            var L = t.pos - 2;
                            if (L >= 0) {
                                var T = t.string.charAt(L);
                                "_" !== T && T.match(/(\w)/, !1) && (C = !0)
                            }
                        }
                        if ("*" === s || "_" === s && !C)
                            if (a && " " === t.peek());
                            else {
                                if (r.strong === s && t.eat(s)) {
                                    n.highlightFormatting && (r.formatting = "strong");
                                    var v = h(r);
                                    return r.strong = !1, v
                                }
                                if (!r.strong && t.eat(s)) return r.strong = s, n.highlightFormatting && (r.formatting = "strong"), h(r);
                                if (r.em === s) {
                                    n.highlightFormatting && (r.formatting = "em");
                                    var v = h(r);
                                    return r.em = !1, v
                                }
                                if (!r.em) return r.em = s, n.highlightFormatting && (r.formatting = "em"), h(r)
                            }
                        else if (" " === s && (t.eat("*") || t.eat("_"))) {
                            if (" " === t.peek()) return h(r);
                            t.backUp(1)
                        }
                        if (n.strikethrough)
                            if ("~" === s && t.eatWhile(s)) {
                                if (r.strikethrough) {
                                    n.highlightFormatting && (r.formatting = "strikethrough");
                                    var v = h(r);
                                    return r.strikethrough = !1, v
                                }
                                if (t.match(/^[^\s]/, !1)) return r.strikethrough = !0, n.highlightFormatting && (r.formatting = "strikethrough"), h(r)
                            } else if (" " === s && t.match(/^~~/, !0)) {
                            if (" " === t.peek()) return h(r);
                            t.backUp(2)
                        }
                        return " " === s && (t.match(/ +$/, !1) ? r.trailingSpace++ : r.trailingSpace && (r.trailingSpaceNewLine = !0)), h(r)
                    }

                    function m(e, t) {
                        var r = e.next();
                        if (">" === r) {
                            t.f = t.inline = p, n.highlightFormatting && (t.formatting = "link");
                            var i = h(t);
                            return i ? i += " " : i = "", i + S.linkInline
                        }
                        return e.match(/^[^>]+/, !0), S.linkInline
                    }

                    function g(e, t) {
                        if (e.eatSpace()) return null;
                        var r = e.next();
                        return "(" === r || "[" === r ? (t.f = t.inline = v("(" === r ? ")" : "]"), n.highlightFormatting && (t.formatting = "link-string"), t.linkHref = !0, h(t)) : "error"
                    }

                    function v(e) {
                        return function(t, r) {
                            var i = t.next();
                            if (i === e) {
                                r.f = r.inline = p, n.highlightFormatting && (r.formatting = "link-string");
                                var o = h(r);
                                return r.linkHref = !1, o
                            }
                            return t.match(w(e), !0) && t.backUp(1), r.linkHref = !0, h(r)
                        }
                    }

                    function y(e, t) {
                        return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = x, e.next(), n.highlightFormatting && (t.formatting = "link"), t.linkText = !0, h(t)) : i(e, t, p)
                    }

                    function x(e, t) {
                        if (e.match(/^\]:/, !0)) {
                            t.f = t.inline = b, n.highlightFormatting && (t.formatting = "link");
                            var r = h(t);
                            return t.linkText = !1, r
                        }
                        return e.match(/^([^\]\\]|\\.)+/, !0), S.linkText
                    }

                    function b(e, t) {
                        return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = p, S.linkHref + " url")
                    }

                    function w(e) {
                        return E[e] || (e = (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), E[e] = new RegExp("^(?:[^\\\\]|\\\\.)*?(" + e + ")")), E[e]
                    }
                    var k = e.getMode(t, "text/html"),
                        C = "null" == k.name;
                    void 0 === n.highlightFormatting && (n.highlightFormatting = !1), void 0 === n.maxBlockquoteDepth && (n.maxBlockquoteDepth = 0), void 0 === n.underscoresBreakWords && (n.underscoresBreakWords = !0), void 0 === n.taskLists && (n.taskLists = !1), void 0 === n.strikethrough && (n.strikethrough = !1), void 0 === n.tokenTypeOverrides && (n.tokenTypeOverrides = {});
                    var S = {
                        header: "header",
                        code: "comment",
                        quote: "quote",
                        list1: "variable-2",
                        list2: "variable-3",
                        list3: "keyword",
                        hr: "hr",
                        image: "tag",
                        formatting: "formatting",
                        linkInline: "link",
                        linkEmail: "link",
                        linkText: "link",
                        linkHref: "string",
                        em: "em",
                        strong: "strong",
                        strikethrough: "strikethrough"
                    };
                    for (var L in S) S.hasOwnProperty(L) && n.tokenTypeOverrides[L] && (S[L] = n.tokenTypeOverrides[L]);
                    var T = /^([*\-_])(?:\s*\1){2,}\s*$/,
                        M = /^[*\-+]\s+/,
                        N = /^[0-9]+([.)])\s+/,
                        A = /^\[(x| )\](?=\s)/,
                        O = n.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
                        H = /^ *(?:\={1,}|-{1,})\s*$/,
                        W = /^[^#!\[\]*_\\<>` "'(~]+/,
                        I = new RegExp("^(" + (n.fencedCodeBlocks === !0 ? "~~~+|```+" : n.fencedCodeBlocks) + ")[ \\t]*([\\w+#]*)"),
                        E = [],
                        D = {
                            startState: function() {
                                return {
                                    f: s,
                                    prevLine: null,
                                    thisLine: null,
                                    block: s,
                                    htmlState: null,
                                    indentation: 0,
                                    inline: p,
                                    text: f,
                                    formatting: !1,
                                    linkText: !1,
                                    linkHref: !1,
                                    linkTitle: !1,
                                    code: 0,
                                    em: !1,
                                    strong: !1,
                                    header: 0,
                                    hr: !1,
                                    taskList: !1,
                                    list: !1,
                                    listStack: [],
                                    quote: 0,
                                    trailingSpace: 0,
                                    trailingSpaceNewLine: !1,
                                    strikethrough: !1,
                                    fencedChars: null
                                }
                            },
                            copyState: function(t) {
                                return {
                                    f: t.f,
                                    prevLine: t.prevLine,
                                    thisLine: t.thisLine,
                                    block: t.block,
                                    htmlState: t.htmlState && e.copyState(k, t.htmlState),
                                    indentation: t.indentation,
                                    localMode: t.localMode,
                                    localState: t.localMode ? e.copyState(t.localMode, t.localState) : null,
                                    inline: t.inline,
                                    text: t.text,
                                    formatting: !1,
                                    linkTitle: t.linkTitle,
                                    code: t.code,
                                    em: t.em,
                                    strong: t.strong,
                                    strikethrough: t.strikethrough,
                                    header: t.header,
                                    hr: t.hr,
                                    taskList: t.taskList,
                                    list: t.list,
                                    listStack: t.listStack.slice(0),
                                    quote: t.quote,
                                    indentedCode: t.indentedCode,
                                    trailingSpace: t.trailingSpace,
                                    trailingSpaceNewLine: t.trailingSpaceNewLine,
                                    md_inside: t.md_inside,
                                    fencedChars: t.fencedChars
                                }
                            },
                            token: function(e, t) {
                                if (t.formatting = !1, e != t.thisLine) {
                                    var n = t.header || t.hr;
                                    if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0) || n) {
                                        if (a(t), !n) return null;
                                        t.prevLine = null
                                    }
                                    t.prevLine = t.thisLine, t.thisLine = e, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.f = t.block;
                                    var r = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;
                                    if (t.indentationDiff = Math.min(r - t.indentation, 4), t.indentation = t.indentation + t.indentationDiff, r > 0) return null
                                }
                                return t.f(e, t)
                            },
                            innerMode: function(e) {
                                return e.block == c ? {
                                    state: e.htmlState,
                                    mode: k
                                } : e.localState ? {
                                    state: e.localState,
                                    mode: e.localMode
                                } : {
                                    state: e,
                                    mode: D
                                }
                            },
                            blankLine: a,
                            getType: h,
                            fold: "markdown"
                        };
                    return D
                }, "xml"), e.defineMIME("text/x-markdown", "markdown")
            })
        }, {
            "../../lib/codemirror": 7,
            "../meta": 10,
            "../xml/xml": 11
        }],
        10: [function(t, n, r) {
            ! function(i) {
                "object" == typeof r && "object" == typeof n ? i(t("../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../lib/codemirror"], i) : i(CodeMirror)
            }(function(e) {
                "use strict";
                e.modeInfo = [{
                    name: "APL",
                    mime: "text/apl",
                    mode: "apl",
                    ext: ["dyalog", "apl"]
                }, {
                    name: "PGP",
                    mimes: ["application/pgp", "application/pgp-keys", "application/pgp-signature"],
                    mode: "asciiarmor",
                    ext: ["pgp"]
                }, {
                    name: "ASN.1",
                    mime: "text/x-ttcn-asn",
                    mode: "asn.1",
                    ext: ["asn", "asn1"]
                }, {
                    name: "Asterisk",
                    mime: "text/x-asterisk",
                    mode: "asterisk",
                    file: /^extensions\.conf$/i
                }, {
                    name: "Brainfuck",
                    mime: "text/x-brainfuck",
                    mode: "brainfuck",
                    ext: ["b", "bf"]
                }, {
                    name: "C",
                    mime: "text/x-csrc",
                    mode: "clike",
                    ext: ["c", "h"]
                }, {
                    name: "C++",
                    mime: "text/x-c++src",
                    mode: "clike",
                    ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
                    alias: ["cpp"]
                }, {
                    name: "Cobol",
                    mime: "text/x-cobol",
                    mode: "cobol",
                    ext: ["cob", "cpy"]
                }, {
                    name: "C#",
                    mime: "text/x-csharp",
                    mode: "clike",
                    ext: ["cs"],
                    alias: ["csharp"]
                }, {
                    name: "Clojure",
                    mime: "text/x-clojure",
                    mode: "clojure",
                    ext: ["clj", "cljc", "cljx"]
                }, {
                    name: "ClojureScript",
                    mime: "text/x-clojurescript",
                    mode: "clojure",
                    ext: ["cljs"]
                }, {
                    name: "Closure Stylesheets (GSS)",
                    mime: "text/x-gss",
                    mode: "css",
                    ext: ["gss"]
                }, {
                    name: "CMake",
                    mime: "text/x-cmake",
                    mode: "cmake",
                    ext: ["cmake", "cmake.in"],
                    file: /^CMakeLists.txt$/
                }, {
                    name: "CoffeeScript",
                    mime: "text/x-coffeescript",
                    mode: "coffeescript",
                    ext: ["coffee"],
                    alias: ["coffee", "coffee-script"]
                }, {
                    name: "Common Lisp",
                    mime: "text/x-common-lisp",
                    mode: "commonlisp",
                    ext: ["cl", "lisp", "el"],
                    alias: ["lisp"]
                }, {
                    name: "Cypher",
                    mime: "application/x-cypher-query",
                    mode: "cypher",
                    ext: ["cyp", "cypher"]
                }, {
                    name: "Cython",
                    mime: "text/x-cython",
                    mode: "python",
                    ext: ["pyx", "pxd", "pxi"]
                }, {
                    name: "Crystal",
                    mime: "text/x-crystal",
                    mode: "crystal",
                    ext: ["cr"]
                }, {
                    name: "CSS",
                    mime: "text/css",
                    mode: "css",
                    ext: ["css"]
                }, {
                    name: "CQL",
                    mime: "text/x-cassandra",
                    mode: "sql",
                    ext: ["cql"]
                }, {
                    name: "D",
                    mime: "text/x-d",
                    mode: "d",
                    ext: ["d"]
                }, {
                    name: "Dart",
                    mimes: ["application/dart", "text/x-dart"],
                    mode: "dart",
                    ext: ["dart"]
                }, {
                    name: "diff",
                    mime: "text/x-diff",
                    mode: "diff",
                    ext: ["diff", "patch"]
                }, {
                    name: "Django",
                    mime: "text/x-django",
                    mode: "django"
                }, {
                    name: "Dockerfile",
                    mime: "text/x-dockerfile",
                    mode: "dockerfile",
                    file: /^Dockerfile$/
                }, {
                    name: "DTD",
                    mime: "application/xml-dtd",
                    mode: "dtd",
                    ext: ["dtd"]
                }, {
                    name: "Dylan",
                    mime: "text/x-dylan",
                    mode: "dylan",
                    ext: ["dylan", "dyl", "intr"]
                }, {
                    name: "EBNF",
                    mime: "text/x-ebnf",
                    mode: "ebnf"
                }, {
                    name: "ECL",
                    mime: "text/x-ecl",
                    mode: "ecl",
                    ext: ["ecl"]
                }, {
                    name: "edn",
                    mime: "application/edn",
                    mode: "clojure",
                    ext: ["edn"]
                }, {
                    name: "Eiffel",
                    mime: "text/x-eiffel",
                    mode: "eiffel",
                    ext: ["e"]
                }, {
                    name: "Elm",
                    mime: "text/x-elm",
                    mode: "elm",
                    ext: ["elm"]
                }, {
                    name: "Embedded Javascript",
                    mime: "application/x-ejs",
                    mode: "htmlembedded",
                    ext: ["ejs"]
                }, {
                    name: "Embedded Ruby",
                    mime: "application/x-erb",
                    mode: "htmlembedded",
                    ext: ["erb"]
                }, {
                    name: "Erlang",
                    mime: "text/x-erlang",
                    mode: "erlang",
                    ext: ["erl"]
                }, {
                    name: "Factor",
                    mime: "text/x-factor",
                    mode: "factor",
                    ext: ["factor"]
                }, {
                    name: "FCL",
                    mime: "text/x-fcl",
                    mode: "fcl"
                }, {
                    name: "Forth",
                    mime: "text/x-forth",
                    mode: "forth",
                    ext: ["forth", "fth", "4th"]
                }, {
                    name: "Fortran",
                    mime: "text/x-fortran",
                    mode: "fortran",
                    ext: ["f", "for", "f77", "f90"]
                }, {
                    name: "F#",
                    mime: "text/x-fsharp",
                    mode: "mllike",
                    ext: ["fs"],
                    alias: ["fsharp"]
                }, {
                    name: "Gas",
                    mime: "text/x-gas",
                    mode: "gas",
                    ext: ["s"]
                }, {
                    name: "Gherkin",
                    mime: "text/x-feature",
                    mode: "gherkin",
                    ext: ["feature"]
                }, {
                    name: "GitHub Flavored Markdown",
                    mime: "text/x-gfm",
                    mode: "gfm",
                    file: /^(readme|contributing|history).md$/i
                }, {
                    name: "Go",
                    mime: "text/x-go",
                    mode: "go",
                    ext: ["go"]
                }, {
                    name: "Groovy",
                    mime: "text/x-groovy",
                    mode: "groovy",
                    ext: ["groovy", "gradle"]
                }, {
                    name: "HAML",
                    mime: "text/x-haml",
                    mode: "haml",
                    ext: ["haml"]
                }, {
                    name: "Haskell",
                    mime: "text/x-haskell",
                    mode: "haskell",
                    ext: ["hs"]
                }, {
                    name: "Haskell (Literate)",
                    mime: "text/x-literate-haskell",
                    mode: "haskell-literate",
                    ext: ["lhs"]
                }, {
                    name: "Haxe",
                    mime: "text/x-haxe",
                    mode: "haxe",
                    ext: ["hx"]
                }, {
                    name: "HXML",
                    mime: "text/x-hxml",
                    mode: "haxe",
                    ext: ["hxml"]
                }, {
                    name: "ASP.NET",
                    mime: "application/x-aspx",
                    mode: "htmlembedded",
                    ext: ["aspx"],
                    alias: ["asp", "aspx"]
                }, {
                    name: "HTML",
                    mime: "text/html",
                    mode: "htmlmixed",
                    ext: ["html", "htm"],
                    alias: ["xhtml"]
                }, {
                    name: "HTTP",
                    mime: "message/http",
                    mode: "http"
                }, {
                    name: "IDL",
                    mime: "text/x-idl",
                    mode: "idl",
                    ext: ["pro"]
                }, {
                    name: "Jade",
                    mime: "text/x-jade",
                    mode: "jade",
                    ext: ["jade"]
                }, {
                    name: "Java",
                    mime: "text/x-java",
                    mode: "clike",
                    ext: ["java"]
                }, {
                    name: "Java Server Pages",
                    mime: "application/x-jsp",
                    mode: "htmlembedded",
                    ext: ["jsp"],
                    alias: ["jsp"]
                }, {
                    name: "JavaScript",
                    mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"],
                    mode: "javascript",
                    ext: ["js"],
                    alias: ["ecmascript", "js", "node"]
                }, {
                    name: "JSON",
                    mimes: ["application/json", "application/x-json"],
                    mode: "javascript",
                    ext: ["json", "map"],
                    alias: ["json5"]
                }, {
                    name: "JSON-LD",
                    mime: "application/ld+json",
                    mode: "javascript",
                    ext: ["jsonld"],
                    alias: ["jsonld"]
                }, {
                    name: "JSX",
                    mime: "text/jsx",
                    mode: "jsx",
                    ext: ["jsx"]
                }, {
                    name: "Jinja2",
                    mime: "null",
                    mode: "jinja2"
                }, {
                    name: "Julia",
                    mime: "text/x-julia",
                    mode: "julia",
                    ext: ["jl"]
                }, {
                    name: "Kotlin",
                    mime: "text/x-kotlin",
                    mode: "clike",
                    ext: ["kt"]
                }, {
                    name: "LESS",
                    mime: "text/x-less",
                    mode: "css",
                    ext: ["less"]
                }, {
                    name: "LiveScript",
                    mime: "text/x-livescript",
                    mode: "livescript",
                    ext: ["ls"],
                    alias: ["ls"]
                }, {
                    name: "Lua",
                    mime: "text/x-lua",
                    mode: "lua",
                    ext: ["lua"]
                }, {
                    name: "Markdown",
                    mime: "text/x-markdown",
                    mode: "markdown",
                    ext: ["markdown", "md", "mkd"]
                }, {
                    name: "mIRC",
                    mime: "text/mirc",
                    mode: "mirc"
                }, {
                    name: "MariaDB SQL",
                    mime: "text/x-mariadb",
                    mode: "sql"
                }, {
                    name: "Mathematica",
                    mime: "text/x-mathematica",
                    mode: "mathematica",
                    ext: ["m", "nb"]
                }, {
                    name: "Modelica",
                    mime: "text/x-modelica",
                    mode: "modelica",
                    ext: ["mo"]
                }, {
                    name: "MUMPS",
                    mime: "text/x-mumps",
                    mode: "mumps",
                    ext: ["mps"]
                }, {
                    name: "MS SQL",
                    mime: "text/x-mssql",
                    mode: "sql"
                }, {
                    name: "MySQL",
                    mime: "text/x-mysql",
                    mode: "sql"
                }, {
                    name: "Nginx",
                    mime: "text/x-nginx-conf",
                    mode: "nginx",
                    file: /nginx.*\.conf$/i
                }, {
                    name: "NSIS",
                    mime: "text/x-nsis",
                    mode: "nsis",
                    ext: ["nsh", "nsi"]
                }, {
                    name: "NTriples",
                    mime: "text/n-triples",
                    mode: "ntriples",
                    ext: ["nt"]
                }, {
                    name: "Objective C",
                    mime: "text/x-objectivec",
                    mode: "clike",
                    ext: ["m", "mm"]
                }, {
                    name: "OCaml",
                    mime: "text/x-ocaml",
                    mode: "mllike",
                    ext: ["ml", "mli", "mll", "mly"]
                }, {
                    name: "Octave",
                    mime: "text/x-octave",
                    mode: "octave",
                    ext: ["m"]
                }, {
                    name: "Oz",
                    mime: "text/x-oz",
                    mode: "oz",
                    ext: ["oz"]
                }, {
                    name: "Pascal",
                    mime: "text/x-pascal",
                    mode: "pascal",
                    ext: ["p", "pas"]
                }, {
                    name: "PEG.js",
                    mime: "null",
                    mode: "pegjs",
                    ext: ["jsonld"]
                }, {
                    name: "Perl",
                    mime: "text/x-perl",
                    mode: "perl",
                    ext: ["pl", "pm"]
                }, {
                    name: "PHP",
                    mime: "application/x-httpd-php",
                    mode: "php",
                    ext: ["php", "php3", "php4", "php5", "phtml"]
                }, {
                    name: "Pig",
                    mime: "text/x-pig",
                    mode: "pig",
                    ext: ["pig"]
                }, {
                    name: "Plain Text",
                    mime: "text/plain",
                    mode: "null",
                    ext: ["txt", "text", "conf", "def", "list", "log"]
                }, {
                    name: "PLSQL",
                    mime: "text/x-plsql",
                    mode: "sql",
                    ext: ["pls"]
                }, {
                    name: "Properties files",
                    mime: "text/x-properties",
                    mode: "properties",
                    ext: ["properties", "ini", "in"],
                    alias: ["ini", "properties"]
                }, {
                    name: "ProtoBuf",
                    mime: "text/x-protobuf",
                    mode: "protobuf",
                    ext: ["proto"]
                }, {
                    name: "Python",
                    mime: "text/x-python",
                    mode: "python",
                    ext: ["py", "pyw"]
                }, {
                    name: "Puppet",
                    mime: "text/x-puppet",
                    mode: "puppet",
                    ext: ["pp"]
                }, {
                    name: "Q",
                    mime: "text/x-q",
                    mode: "q",
                    ext: ["q"]
                }, {
                    name: "R",
                    mime: "text/x-rsrc",
                    mode: "r",
                    ext: ["r"],
                    alias: ["rscript"]
                }, {
                    name: "reStructuredText",
                    mime: "text/x-rst",
                    mode: "rst",
                    ext: ["rst"],
                    alias: ["rst"]
                }, {
                    name: "RPM Changes",
                    mime: "text/x-rpm-changes",
                    mode: "rpm"
                }, {
                    name: "RPM Spec",
                    mime: "text/x-rpm-spec",
                    mode: "rpm",
                    ext: ["spec"]
                }, {
                    name: "Ruby",
                    mime: "text/x-ruby",
                    mode: "ruby",
                    ext: ["rb"],
                    alias: ["jruby", "macruby", "rake", "rb", "rbx"]
                }, {
                    name: "Rust",
                    mime: "text/x-rustsrc",
                    mode: "rust",
                    ext: ["rs"]
                }, {
                    name: "Sass",
                    mime: "text/x-sass",
                    mode: "sass",
                    ext: ["sass"]
                }, {
                    name: "Scala",
                    mime: "text/x-scala",
                    mode: "clike",
                    ext: ["scala"]
                }, {
                    name: "Scheme",
                    mime: "text/x-scheme",
                    mode: "scheme",
                    ext: ["scm", "ss"]
                }, {
                    name: "SCSS",
                    mime: "text/x-scss",
                    mode: "css",
                    ext: ["scss"]
                }, {
                    name: "Shell",
                    mime: "text/x-sh",
                    mode: "shell",
                    ext: ["sh", "ksh", "bash"],
                    alias: ["bash", "sh", "zsh"],
                    file: /^PKGBUILD$/
                }, {
                    name: "Sieve",
                    mime: "application/sieve",
                    mode: "sieve",
                    ext: ["siv", "sieve"]
                }, {
                    name: "Slim",
                    mimes: ["text/x-slim", "application/x-slim"],
                    mode: "slim",
                    ext: ["slim"]
                }, {
                    name: "Smalltalk",
                    mime: "text/x-stsrc",
                    mode: "smalltalk",
                    ext: ["st"]
                }, {
                    name: "Smarty",
                    mime: "text/x-smarty",
                    mode: "smarty",
                    ext: ["tpl"]
                }, {
                    name: "Solr",
                    mime: "text/x-solr",
                    mode: "solr"
                }, {
                    name: "Soy",
                    mime: "text/x-soy",
                    mode: "soy",
                    ext: ["soy"],
                    alias: ["closure template"]
                }, {
                    name: "SPARQL",
                    mime: "application/sparql-query",
                    mode: "sparql",
                    ext: ["rq", "sparql"],
                    alias: ["sparul"]
                }, {
                    name: "Spreadsheet",
                    mime: "text/x-spreadsheet",
                    mode: "spreadsheet",
                    alias: ["excel", "formula"]
                }, {
                    name: "SQL",
                    mime: "text/x-sql",
                    mode: "sql",
                    ext: ["sql"]
                }, {
                    name: "Squirrel",
                    mime: "text/x-squirrel",
                    mode: "clike",
                    ext: ["nut"]
                }, {
                    name: "Swift",
                    mime: "text/x-swift",
                    mode: "swift",
                    ext: ["swift"]
                }, {
                    name: "sTeX",
                    mime: "text/x-stex",
                    mode: "stex"
                }, {
                    name: "LaTeX",
                    mime: "text/x-latex",
                    mode: "stex",
                    ext: ["text", "ltx"],
                    alias: ["tex"]
                }, {
                    name: "SystemVerilog",
                    mime: "text/x-systemverilog",
                    mode: "verilog",
                    ext: ["v"]
                }, {
                    name: "Tcl",
                    mime: "text/x-tcl",
                    mode: "tcl",
                    ext: ["tcl"]
                }, {
                    name: "Textile",
                    mime: "text/x-textile",
                    mode: "textile",
                    ext: ["textile"]
                }, {
                    name: "TiddlyWiki ",
                    mime: "text/x-tiddlywiki",
                    mode: "tiddlywiki"
                }, {
                    name: "Tiki wiki",
                    mime: "text/tiki",
                    mode: "tiki"
                }, {
                    name: "TOML",
                    mime: "text/x-toml",
                    mode: "toml",
                    ext: ["toml"]
                }, {
                    name: "Tornado",
                    mime: "text/x-tornado",
                    mode: "tornado"
                }, {
                    name: "troff",
                    mime: "text/troff",
                    mode: "troff",
                    ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }, {
                    name: "TTCN",
                    mime: "text/x-ttcn",
                    mode: "ttcn",
                    ext: ["ttcn", "ttcn3", "ttcnpp"]
                }, {
                    name: "TTCN_CFG",
                    mime: "text/x-ttcn-cfg",
                    mode: "ttcn-cfg",
                    ext: ["cfg"]
                }, {
                    name: "Turtle",
                    mime: "text/turtle",
                    mode: "turtle",
                    ext: ["ttl"]
                }, {
                    name: "TypeScript",
                    mime: "application/typescript",
                    mode: "javascript",
                    ext: ["ts"],
                    alias: ["ts"]
                }, {
                    name: "Twig",
                    mime: "text/x-twig",
                    mode: "twig"
                }, {
                    name: "VB.NET",
                    mime: "text/x-vb",
                    mode: "vb",
                    ext: ["vb"]
                }, {
                    name: "VBScript",
                    mime: "text/vbscript",
                    mode: "vbscript",
                    ext: ["vbs"]
                }, {
                    name: "Velocity",
                    mime: "text/velocity",
                    mode: "velocity",
                    ext: ["vtl"]
                }, {
                    name: "Verilog",
                    mime: "text/x-verilog",
                    mode: "verilog",
                    ext: ["v"]
                }, {
                    name: "VHDL",
                    mime: "text/x-vhdl",
                    mode: "vhdl",
                    ext: ["vhd", "vhdl"]
                }, {
                    name: "XML",
                    mimes: ["application/xml", "text/xml"],
                    mode: "xml",
                    ext: ["xml", "xsl", "xsd"],
                    alias: ["rss", "wsdl", "xsd"]
                }, {
                    name: "XQuery",
                    mime: "application/xquery",
                    mode: "xquery",
                    ext: ["xy", "xquery"]
                }, {
                    name: "YAML",
                    mime: "text/x-yaml",
                    mode: "yaml",
                    ext: ["yaml", "yml"],
                    alias: ["yml"]
                }, {
                    name: "Z80",
                    mime: "text/x-z80",
                    mode: "z80",
                    ext: ["z80"]
                }, {
                    name: "mscgen",
                    mime: "text/x-mscgen",
                    mode: "mscgen",
                    ext: ["mscgen", "mscin", "msc"]
                }, {
                    name: "xu",
                    mime: "text/x-xu",
                    mode: "mscgen",
                    ext: ["xu"]
                }, {
                    name: "msgenny",
                    mime: "text/x-msgenny",
                    mode: "mscgen",
                    ext: ["msgenny"]
                }];
                for (var t = 0; t < e.modeInfo.length; t++) {
                    var n = e.modeInfo[t];
                    n.mimes && (n.mime = n.mimes[0])
                }
                e.findModeByMIME = function(t) {
                    t = t.toLowerCase();
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var r = e.modeInfo[n];
                        if (r.mime == t) return r;
                        if (r.mimes)
                            for (var i = 0; i < r.mimes.length; i++)
                                if (r.mimes[i] == t) return r
                    }
                }, e.findModeByExtension = function(t) {
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var r = e.modeInfo[n];
                        if (r.ext)
                            for (var i = 0; i < r.ext.length; i++)
                                if (r.ext[i] == t) return r
                    }
                }, e.findModeByFileName = function(t) {
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var r = e.modeInfo[n];
                        if (r.file && r.file.test(t)) return r
                    }
                    var i = t.lastIndexOf("."),
                        o = i > -1 && t.substring(i + 1, t.length);
                    return o ? e.findModeByExtension(o) : void 0
                }, e.findModeByName = function(t) {
                    t = t.toLowerCase();
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var r = e.modeInfo[n];
                        if (r.name.toLowerCase() == t) return r;
                        if (r.alias)
                            for (var i = 0; i < r.alias.length; i++)
                                if (r.alias[i].toLowerCase() == t) return r
                    }
                }
            })
        }, {
            "../lib/codemirror": 7
        }],
        11: [function(t, n, r) {
            ! function(i) {
                "object" == typeof r && "object" == typeof n ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror)
            }(function(e) {
                "use strict";
                var t = {
                        autoSelfClosers: {
                            area: !0,
                            base: !0,
                            br: !0,
                            col: !0,
                            command: !0,
                            embed: !0,
                            frame: !0,
                            hr: !0,
                            img: !0,
                            input: !0,
                            keygen: !0,
                            link: !0,
                            meta: !0,
                            param: !0,
                            source: !0,
                            track: !0,
                            wbr: !0,
                            menuitem: !0
                        },
                        implicitlyClosed: {
                            dd: !0,
                            li: !0,
                            optgroup: !0,
                            option: !0,
                            p: !0,
                            rp: !0,
                            rt: !0,
                            tbody: !0,
                            td: !0,
                            tfoot: !0,
                            th: !0,
                            tr: !0
                        },
                        contextGrabbers: {
                            dd: {
                                dd: !0,
                                dt: !0
                            },
                            dt: {
                                dd: !0,
                                dt: !0
                            },
                            li: {
                                li: !0
                            },
                            option: {
                                option: !0,
                                optgroup: !0
                            },
                            optgroup: {
                                optgroup: !0
                            },
                            p: {
                                address: !0,
                                article: !0,
                                aside: !0,
                                blockquote: !0,
                                dir: !0,
                                div: !0,
                                dl: !0,
                                fieldset: !0,
                                footer: !0,
                                form: !0,
                                h1: !0,
                                h2: !0,
                                h3: !0,
                                h4: !0,
                                h5: !0,
                                h6: !0,
                                header: !0,
                                hgroup: !0,
                                hr: !0,
                                menu: !0,
                                nav: !0,
                                ol: !0,
                                p: !0,
                                pre: !0,
                                section: !0,
                                table: !0,
                                ul: !0
                            },
                            rp: {
                                rp: !0,
                                rt: !0
                            },
                            rt: {
                                rp: !0,
                                rt: !0
                            },
                            tbody: {
                                tbody: !0,
                                tfoot: !0
                            },
                            td: {
                                td: !0,
                                th: !0
                            },
                            tfoot: {
                                tbody: !0
                            },
                            th: {
                                td: !0,
                                th: !0
                            },
                            thead: {
                                tbody: !0,
                                tfoot: !0
                            },
                            tr: {
                                tr: !0
                            }
                        },
                        doNotIndent: {
                            pre: !0
                        },
                        allowUnquoted: !0,
                        allowMissing: !0,
                        caseFold: !0
                    },
                    n = {
                        autoSelfClosers: {},
                        implicitlyClosed: {},
                        contextGrabbers: {},
                        doNotIndent: {},
                        allowUnquoted: !1,
                        allowMissing: !1,
                        caseFold: !1
                    };
                e.defineMode("xml", function(r, i) {
                    function o(e, t) {
                        function n(n) {
                            return t.tokenize = n, n(e, t)
                        }
                        var r = e.next();
                        if ("<" == r) return e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? n(s("atom", "]]>")) : null : e.match("--") ? n(s("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), n(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = s("meta", "?>"), "meta") : (T = e.eat("/") ? "closeTag" : "openTag", t.tokenize = l, "tag bracket");
                        if ("&" == r) {
                            var i;
                            return i = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";"), i ? "atom" : "error"
                        }
                        return e.eatWhile(/[^&<]/), null
                    }

                    function l(e, t) {
                        var n = e.next();
                        if (">" == n || "/" == n && e.eat(">")) return t.tokenize = o, T = ">" == n ? "endTag" : "selfcloseTag", "tag bracket";
                        if ("=" == n) return T = "equals", null;
                        if ("<" == n) {
                            t.tokenize = o, t.state = f, t.tagName = t.tagStart = null;
                            var r = t.tokenize(e, t);
                            return r ? r + " tag error" : "tag error"
                        }
                        return /[\'\"]/.test(n) ? (t.tokenize = a(n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
                    }

                    function a(e) {
                        var t = function(t, n) {
                            for (; !t.eol();)
                                if (t.next() == e) {
                                    n.tokenize = l;
                                    break
                                }
                            return "string"
                        };
                        return t.isInAttribute = !0, t
                    }

                    function s(e, t) {
                        return function(n, r) {
                            for (; !n.eol();) {
                                if (n.match(t)) {
                                    r.tokenize = o;
                                    break
                                }
                                n.next()
                            }
                            return e
                        }
                    }

                    function c(e) {
                        return function(t, n) {
                            for (var r; null != (r = t.next());) {
                                if ("<" == r) return n.tokenize = c(e + 1), n.tokenize(t, n);
                                if (">" == r) {
                                    if (1 == e) {
                                        n.tokenize = o;
                                        break
                                    }
                                    return n.tokenize = c(e - 1), n.tokenize(t, n)
                                }
                            }
                            return "meta"
                        }
                    }

                    function u(e, t, n) {
                        this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = n, (C.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0)
                    }

                    function d(e) {
                        e.context && (e.context = e.context.prev)
                    }

                    function h(e, t) {
                        for (var n;;) {
                            if (!e.context) return;
                            if (n = e.context.tagName, !C.contextGrabbers.hasOwnProperty(n) || !C.contextGrabbers[n].hasOwnProperty(t)) return;
                            d(e)
                        }
                    }

                    function f(e, t, n) {
                        return "openTag" == e ? (n.tagStart = t.column(), p) : "closeTag" == e ? m : f
                    }

                    function p(e, t, n) {
                        return "word" == e ? (n.tagName = t.current(), M = "tag", y) : (M = "error", p)
                    }

                    function m(e, t, n) {
                        if ("word" == e) {
                            var r = t.current();
                            return n.context && n.context.tagName != r && C.implicitlyClosed.hasOwnProperty(n.context.tagName) && d(n), n.context && n.context.tagName == r || C.matchClosing === !1 ? (M = "tag", g) : (M = "tag error", v)
                        }
                        return M = "error", v
                    }

                    function g(e, t, n) {
                        return "endTag" != e ? (M = "error", g) : (d(n), f)
                    }

                    function v(e, t, n) {
                        return M = "error", g(e, t, n)
                    }

                    function y(e, t, n) {
                        if ("word" == e) return M = "attribute", x;
                        if ("endTag" == e || "selfcloseTag" == e) {
                            var r = n.tagName,
                                i = n.tagStart;
                            return n.tagName = n.tagStart = null, "selfcloseTag" == e || C.autoSelfClosers.hasOwnProperty(r) ? h(n, r) : (h(n, r), n.context = new u(n, r, i == n.indented)), f
                        }
                        return M = "error", y
                    }

                    function x(e, t, n) {
                        return "equals" == e ? b : (C.allowMissing || (M = "error"), y(e, t, n))
                    }

                    function b(e, t, n) {
                        return "string" == e ? w : "word" == e && C.allowUnquoted ? (M = "string", y) : (M = "error", y(e, t, n))
                    }

                    function w(e, t, n) {
                        return "string" == e ? w : y(e, t, n)
                    }
                    var k = r.indentUnit,
                        C = {},
                        S = i.htmlMode ? t : n;
                    for (var L in S) C[L] = S[L];
                    for (var L in i) C[L] = i[L];
                    var T, M;
                    return o.isInText = !0, {
                        startState: function(e) {
                            var t = {
                                tokenize: o,
                                state: f,
                                indented: e || 0,
                                tagName: null,
                                tagStart: null,
                                context: null
                            };
                            return null != e && (t.baseIndent = e), t
                        },
                        token: function(e, t) {
                            if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;
                            T = null;
                            var n = t.tokenize(e, t);
                            return (n || T) && "comment" != n && (M = null, t.state = t.state(T || n, e, t), M && (n = "error" == M ? n + " error" : M)), n
                        },
                        indent: function(t, n, r) {
                            var i = t.context;
                            if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + k;
                            if (i && i.noIndent) return e.Pass;
                            if (t.tokenize != l && t.tokenize != o) return r ? r.match(/^(\s*)/)[0].length : 0;
                            if (t.tagName) return C.multilineTagIndentPastTag !== !1 ? t.tagStart + t.tagName.length + 2 : t.tagStart + k * (C.multilineTagIndentFactor || 1);
                            if (C.alignCDATA && /<!\[CDATA\[/.test(n)) return 0;
                            var a = n && /^<(\/)?([\w_:\.-]*)/.exec(n);
                            if (a && a[1])
                                for (; i;) {
                                    if (i.tagName == a[2]) {
                                        i = i.prev;
                                        break
                                    }
                                    if (!C.implicitlyClosed.hasOwnProperty(i.tagName)) break;
                                    i = i.prev
                                } else if (a)
                                    for (; i;) {
                                        var s = C.contextGrabbers[i.tagName];
                                        if (!s || !s.hasOwnProperty(a[2])) break;
                                        i = i.prev
                                    }
                                for (; i && i.prev && !i.startOfLine;) i = i.prev;
                            return i ? i.indent + k : t.baseIndent || 0
                        },
                        electricInput: /<\/[\s\w:]+>$/,
                        blockCommentStart: "<!--",
                        blockCommentEnd: "-->",
                        configuration: C.htmlMode ? "html" : "xml",
                        helperType: C.htmlMode ? "html" : "xml",
                        skipAttribute: function(e) {
                            e.state == b && (e.state = y)
                        }
                    }
                }), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
                    name: "xml",
                    htmlMode: !0
                })
            })
        }, {
            "../../lib/codemirror": 7
        }],
        12: [function(t, n, r) {
            (function(t) {
                (function() {
                    function t(e) {
                        this.tokens = [], this.tokens.links = {}, this.options = e || h.defaults, this.rules = f.normal, this.options.gfm && (this.options.tables ? this.rules = f.tables : this.rules = f.gfm)
                    }

                    function i(e, t) {
                        if (this.options = t || h.defaults, this.links = e, this.rules = p.normal, this.renderer = this.options.renderer || new o, this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");
                        this.options.gfm ? this.options.breaks ? this.rules = p.breaks : this.rules = p.gfm : this.options.pedantic && (this.rules = p.pedantic)
                    }

                    function o(e) {
                        this.options = e || {}
                    }

                    function l(e) {
                        this.tokens = [], this.token = null, this.options = e || h.defaults, this.options.renderer = this.options.renderer || new o, this.renderer = this.options.renderer, this.renderer.options = this.options
                    }

                    function a(e, t) {
                        return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
                    }

                    function s(e) {
                        return e.replace(/&([#\w]+);/g, function(e, t) {
                            return t = t.toLowerCase(), "colon" === t ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
                        })
                    }

                    function c(e, t) {
                        return e = e.source, t = t || "",
                            function n(r, i) {
                                return r ? (i = i.source || i, i = i.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(r, i), n) : new RegExp(e, t)
                            }
                    }

                    function u() {}

                    function d(e) {
                        for (var t, n, r = 1; r < arguments.length; r++) {
                            t = arguments[r];
                            for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        }
                        return e
                    }

                    function h(e, n, r) {
                        if (r || "function" == typeof n) {
                            r || (r = n, n = null), n = d({}, h.defaults, n || {});
                            var i, o, s = n.highlight,
                                c = 0;
                            try {
                                i = t.lex(e, n)
                            } catch (u) {
                                return r(u)
                            }
                            o = i.length;
                            var f = function(e) {
                                if (e) return n.highlight = s, r(e);
                                var t;
                                try {
                                    t = l.parse(i, n)
                                } catch (o) {
                                    e = o
                                }
                                return n.highlight = s, e ? r(e) : r(null, t)
                            };
                            if (!s || s.length < 3) return f();
                            if (delete n.highlight, !o) return f();
                            for (; c < i.length; c++) ! function(e) {
                                return "code" !== e.type ? --o || f() : s(e.text, e.lang, function(t, n) {
                                    return t ? f(t) : null == n || n === e.text ? --o || f() : (e.text = n, e.escaped = !0, void(--o || f()))
                                })
                            }(i[c])
                        } else try {
                            return n && (n = d({}, h.defaults, n)), l.parse(t.lex(e, n), n)
                        } catch (u) {
                            if (u.message += "\nPlease report this to https://github.com/chjj/marked.", (n || h.defaults).silent) return "<p>An error occured:</p><pre>" + a(u.message + "", !0) + "</pre>";
                            throw u
                        }
                    }
                    var f = {
                        newline: /^\n+/,
                        code: /^( {4}[^\n]+\n*)+/,
                        fences: u,
                        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
                        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
                        nptable: u,
                        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
                        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
                        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
                        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
                        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
                        table: u,
                        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
                        text: /^[^\n]+/
                    };
                    f.bullet = /(?:[*+-]|\d+\.)/, f.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, f.item = c(f.item, "gm")(/bull/g, f.bullet)(), f.list = c(f.list)(/bull/g, f.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + f.def.source + ")")(), f.blockquote = c(f.blockquote)("def", f.def)(), f._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", f.html = c(f.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, f._tag)(), f.paragraph = c(f.paragraph)("hr", f.hr)("heading", f.heading)("lheading", f.lheading)("blockquote", f.blockquote)("tag", "<" + f._tag)("def", f.def)(), f.normal = d({}, f), f.gfm = d({}, f.normal, {
                        fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
                        paragraph: /^/,
                        heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
                    }), f.gfm.paragraph = c(f.paragraph)("(?!", "(?!" + f.gfm.fences.source.replace("\\1", "\\2") + "|" + f.list.source.replace("\\1", "\\3") + "|")(), f.tables = d({}, f.gfm, {
                        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
                        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
                    }), t.rules = f, t.lex = function(e, n) {
                        var r = new t(n);
                        return r.lex(e)
                    }, t.prototype.lex = function(e) {
                        return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0)
                    }, t.prototype.token = function(e, t, n) {
                        for (var r, i, o, l, a, s, c, u, d, e = e.replace(/^ +$/gm, ""); e;)
                            if ((o = this.rules.newline.exec(e)) && (e = e.substring(o[0].length), o[0].length > 1 && this.tokens.push({
                                    type: "space"
                                })), o = this.rules.code.exec(e)) e = e.substring(o[0].length), o = o[0].replace(/^ {4}/gm, ""), this.tokens.push({
                                type: "code",
                                text: this.options.pedantic ? o : o.replace(/\n+$/, "")
                            });
                            else if (o = this.rules.fences.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                            type: "code",
                            lang: o[2],
                            text: o[3] || ""
                        });
                        else if (o = this.rules.heading.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                            type: "heading",
                            depth: o[1].length,
                            text: o[2]
                        });
                        else if (t && (o = this.rules.nptable.exec(e))) {
                            for (e = e.substring(o[0].length), s = {
                                    type: "table",
                                    header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                                    align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                    cells: o[3].replace(/\n$/, "").split("\n")
                                }, u = 0; u < s.align.length; u++) /^ *-+: *$/.test(s.align[u]) ? s.align[u] = "right" : /^ *:-+: *$/.test(s.align[u]) ? s.align[u] = "center" : /^ *:-+ *$/.test(s.align[u]) ? s.align[u] = "left" : s.align[u] = null;
                            for (u = 0; u < s.cells.length; u++) s.cells[u] = s.cells[u].split(/ *\| */);
                            this.tokens.push(s)
                        } else if (o = this.rules.lheading.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                            type: "heading",
                            depth: "=" === o[2] ? 1 : 2,
                            text: o[1]
                        });
                        else if (o = this.rules.hr.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                            type: "hr"
                        });
                        else if (o = this.rules.blockquote.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                            type: "blockquote_start"
                        }), o = o[0].replace(/^ *> ?/gm, ""), this.token(o, t, !0), this.tokens.push({
                            type: "blockquote_end"
                        });
                        else if (o = this.rules.list.exec(e)) {
                            for (e = e.substring(o[0].length), l = o[2], this.tokens.push({
                                    type: "list_start",
                                    ordered: l.length > 1
                                }), o = o[0].match(this.rules.item), r = !1, d = o.length, u = 0; d > u; u++) s = o[u], c = s.length, s = s.replace(/^ *([*+-]|\d+\.) +/, ""), ~s.indexOf("\n ") && (c -= s.length, s = this.options.pedantic ? s.replace(/^ {1,4}/gm, "") : s.replace(new RegExp("^ {1," + c + "}", "gm"), "")), this.options.smartLists && u !== d - 1 && (a = f.bullet.exec(o[u + 1])[0], l === a || l.length > 1 && a.length > 1 || (e = o.slice(u + 1).join("\n") + e, u = d - 1)), i = r || /\n\n(?!\s*$)/.test(s), u !== d - 1 && (r = "\n" === s.charAt(s.length - 1), i || (i = r)), this.tokens.push({
                                type: i ? "loose_item_start" : "list_item_start"
                            }), this.token(s, !1, n), this.tokens.push({
                                type: "list_item_end"
                            });
                            this.tokens.push({
                                type: "list_end"
                            })
                        } else if (o = this.rules.html.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                            type: this.options.sanitize ? "paragraph" : "html",
                            pre: !this.options.sanitizer && ("pre" === o[1] || "script" === o[1] || "style" === o[1]),
                            text: o[0]
                        });
                        else if (!n && t && (o = this.rules.def.exec(e))) e = e.substring(o[0].length), this.tokens.links[o[1].toLowerCase()] = {
                            href: o[2],
                            title: o[3]
                        };
                        else if (t && (o = this.rules.table.exec(e))) {
                            for (e = e.substring(o[0].length), s = {
                                    type: "table",
                                    header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                                    align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                    cells: o[3].replace(/(?: *\| *)?\n$/, "").split("\n")
                                }, u = 0; u < s.align.length; u++) /^ *-+: *$/.test(s.align[u]) ? s.align[u] = "right" : /^ *:-+: *$/.test(s.align[u]) ? s.align[u] = "center" : /^ *:-+ *$/.test(s.align[u]) ? s.align[u] = "left" : s.align[u] = null;
                            for (u = 0; u < s.cells.length; u++) s.cells[u] = s.cells[u].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
                            this.tokens.push(s)
                        } else if (t && (o = this.rules.paragraph.exec(e))) e = e.substring(o[0].length), this.tokens.push({
                            type: "paragraph",
                            text: "\n" === o[1].charAt(o[1].length - 1) ? o[1].slice(0, -1) : o[1]
                        });
                        else if (o = this.rules.text.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                            type: "text",
                            text: o[0]
                        });
                        else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
                        return this.tokens
                    };
                    var p = {
                        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
                        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
                        url: u,
                        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
                        link: /^!?\[(inside)\]\(href\)/,
                        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
                        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
                        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
                        em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
                        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
                        br: /^ {2,}\n(?!\s*$)/,
                        del: u,
                        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
                    };
                    p._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, p._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, p.link = c(p.link)("inside", p._inside)("href", p._href)(), p.reflink = c(p.reflink)("inside", p._inside)(), p.normal = d({}, p), p.pedantic = d({}, p.normal, {
                        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
                    }), p.gfm = d({}, p.normal, {
                        escape: c(p.escape)("])", "~|])")(),
                        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
                        del: /^~~(?=\S)([\s\S]*?\S)~~/,
                        text: c(p.text)("]|", "~]|")("|", "|https?://|")()
                    }), p.breaks = d({}, p.gfm, {
                        br: c(p.br)("{2,}", "*")(),
                        text: c(p.gfm.text)("{2,}", "*")()
                    }), i.rules = p, i.output = function(e, t, n) {
                        var r = new i(t, n);
                        return r.output(e)
                    }, i.prototype.output = function(e) {
                        for (var t, n, r, i, o = ""; e;)
                            if (i = this.rules.escape.exec(e)) e = e.substring(i[0].length), o += i[1];
                            else if (i = this.rules.autolink.exec(e)) e = e.substring(i[0].length), "@" === i[2] ? (n = ":" === i[1].charAt(6) ? this.mangle(i[1].substring(7)) : this.mangle(i[1]), r = this.mangle("mailto:") + n) : (n = a(i[1]), r = n), o += this.renderer.link(r, null, n);
                        else if (this.inLink || !(i = this.rules.url.exec(e))) {
                            if (i = this.rules.tag.exec(e)) !this.inLink && /^<a /i.test(i[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(i[0]) && (this.inLink = !1), e = e.substring(i[0].length), o += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(i[0]) : a(i[0]) : i[0];
                            else if (i = this.rules.link.exec(e)) e = e.substring(i[0].length), this.inLink = !0, o += this.outputLink(i, {
                                href: i[2],
                                title: i[3]
                            }), this.inLink = !1;
                            else if ((i = this.rules.reflink.exec(e)) || (i = this.rules.nolink.exec(e))) {
                                if (e = e.substring(i[0].length), t = (i[2] || i[1]).replace(/\s+/g, " "), t = this.links[t.toLowerCase()], !t || !t.href) {
                                    o += i[0].charAt(0), e = i[0].substring(1) + e;
                                    continue
                                }
                                this.inLink = !0, o += this.outputLink(i, t), this.inLink = !1
                            } else if (i = this.rules.strong.exec(e)) e = e.substring(i[0].length), o += this.renderer.strong(this.output(i[2] || i[1]));
                            else if (i = this.rules.em.exec(e)) e = e.substring(i[0].length), o += this.renderer.em(this.output(i[2] || i[1]));
                            else if (i = this.rules.code.exec(e)) e = e.substring(i[0].length), o += this.renderer.codespan(a(i[2], !0));
                            else if (i = this.rules.br.exec(e)) e = e.substring(i[0].length), o += this.renderer.br();
                            else if (i = this.rules.del.exec(e)) e = e.substring(i[0].length), o += this.renderer.del(this.output(i[1]));
                            else if (i = this.rules.text.exec(e)) e = e.substring(i[0].length), o += this.renderer.text(a(this.smartypants(i[0])));
                            else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0))
                        } else e = e.substring(i[0].length), n = a(i[1]), r = n, o += this.renderer.link(r, null, n);
                        return o
                    }, i.prototype.outputLink = function(e, t) {
                        var n = a(t.href),
                            r = t.title ? a(t.title) : null;
                        return "!" !== e[0].charAt(0) ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, a(e[1]))
                    }, i.prototype.smartypants = function(e) {
                        return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
                    }, i.prototype.mangle = function(e) {
                        if (!this.options.mangle) return e;
                        for (var t, n = "", r = e.length, i = 0; r > i; i++) t = e.charCodeAt(i), Math.random() > .5 && (t = "x" + t.toString(16)), n += "&#" + t + ";";
                        return n
                    }, o.prototype.code = function(e, t, n) {
                        if (this.options.highlight) {
                            var r = this.options.highlight(e, t);
                            null != r && r !== e && (n = !0, e = r)
                        }
                        return t ? '<pre><code class="' + this.options.langPrefix + a(t, !0) + '">' + (n ? e : a(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : a(e, !0)) + "\n</code></pre>"
                    }, o.prototype.blockquote = function(e) {
                        return "<blockquote>\n" + e + "</blockquote>\n"
                    }, o.prototype.html = function(e) {
                        return e
                    }, o.prototype.heading = function(e, t, n) {
                        return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n"
                    }, o.prototype.hr = function() {
                        return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
                    }, o.prototype.list = function(e, t) {
                        var n = t ? "ol" : "ul";
                        return "<" + n + ">\n" + e + "</" + n + ">\n"
                    }, o.prototype.listitem = function(e) {
                        return "<li>" + e + "</li>\n"
                    }, o.prototype.paragraph = function(e) {
                        return "<p>" + e + "</p>\n"
                    }, o.prototype.table = function(e, t) {
                        return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n"
                    }, o.prototype.tablerow = function(e) {
                        return "<tr>\n" + e + "</tr>\n"
                    }, o.prototype.tablecell = function(e, t) {
                        var n = t.header ? "th" : "td",
                            r = t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">";
                        return r + e + "</" + n + ">\n"
                    }, o.prototype.strong = function(e) {
                        return "<strong>" + e + "</strong>"
                    }, o.prototype.em = function(e) {
                        return "<em>" + e + "</em>"
                    }, o.prototype.codespan = function(e) {
                        return "<code>" + e + "</code>"
                    }, o.prototype.br = function() {
                        return this.options.xhtml ? "<br/>" : "<br>"
                    }, o.prototype.del = function(e) {
                        return "<del>" + e + "</del>"
                    }, o.prototype.link = function(e, t, n) {
                        if (this.options.sanitize) {
                            try {
                                var r = decodeURIComponent(s(e)).replace(/[^\w:]/g, "").toLowerCase()
                            } catch (i) {
                                return ""
                            }
                            if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:")) return ""
                        }
                        var o = '<a href="' + e + '" target="_blank"';
                        return t && (o += ' title="' + t + '"'), o += ">" + n + "</a>"
                    }, o.prototype.image = function(e, t, n) {
                        if(exportHTML || e.startsWith('blob')) {
                          var r = '<img src="' + e + '" alt="' + n + '"';
                          return t && (r += ' title="' + t + '"'), r += this.options.xhtml ? "/>" : ">";
                        } else {
                          // var r = '<img src="' + e + '" alt="' + n + '"';
                          // return t && (r += ' title="' + t + '"'), r += this.options.xhtml ? "/>" : ">"
                          return '<webview id="' + n + '" src="' + e + '" style="width:67vh; height:45vh" autosize="on"></webview>';
                        }
                    }, o.prototype.text = function(e) {
                        return e
                    }, l.parse = function(e, t, n) {
                        var r = new l(t, n);
                        return r.parse(e)
                    }, l.prototype.parse = function(e) {
                        this.inline = new i(e.links, this.options, this.renderer), this.tokens = e.reverse();
                        for (var t = ""; this.next();) t += this.tok();
                        return t
                    }, l.prototype.next = function() {
                        return this.token = this.tokens.pop()
                    }, l.prototype.peek = function() {
                        return this.tokens[this.tokens.length - 1] || 0
                    }, l.prototype.parseText = function() {
                        for (var e = this.token.text;
                            "text" === this.peek().type;) e += "\n" + this.next().text;
                        return this.inline.output(e)
                    }, l.prototype.tok = function() {
                        switch (this.token.type) {
                            case "space":
                                return "";
                            case "hr":
                                return this.renderer.hr();
                            case "heading":
                                return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
                            case "code":
                                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                            case "table":
                                var e, t, n, r, i, o = "",
                                    l = "";
                                for (n = "", e = 0; e < this.token.header.length; e++) r = {
                                    header: !0,
                                    align: this.token.align[e]
                                }, n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
                                    header: !0,
                                    align: this.token.align[e]
                                });
                                for (o += this.renderer.tablerow(n), e = 0; e < this.token.cells.length; e++) {
                                    for (t = this.token.cells[e], n = "", i = 0; i < t.length; i++) n += this.renderer.tablecell(this.inline.output(t[i]), {
                                        header: !1,
                                        align: this.token.align[i]
                                    });
                                    l += this.renderer.tablerow(n)
                                }
                                return this.renderer.table(o, l);
                            case "blockquote_start":
                                for (var l = "";
                                    "blockquote_end" !== this.next().type;) l += this.tok();
                                return this.renderer.blockquote(l);
                            case "list_start":
                                for (var l = "", a = this.token.ordered;
                                    "list_end" !== this.next().type;) l += this.tok();
                                return this.renderer.list(l, a);
                            case "list_item_start":
                                for (var l = "";
                                    "list_item_end" !== this.next().type;) l += "text" === this.token.type ? this.parseText() : this.tok();
                                return this.renderer.listitem(l);
                            case "loose_item_start":
                                for (var l = "";
                                    "list_item_end" !== this.next().type;) l += this.tok();
                                return this.renderer.listitem(l);
                            case "html":
                                var s = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
                                return this.renderer.html(s);
                            case "paragraph":
                                return this.renderer.paragraph(this.inline.output(this.token.text));
                            case "text":
                                return this.renderer.paragraph(this.parseText())
                        }
                    }, u.exec = u, h.options = h.setOptions = function(e) {
                        return d(h.defaults, e), h
                    }, h.defaults = {
                        gfm: !0,
                        tables: !0,
                        breaks: !1,
                        pedantic: !1,
                        sanitize: !1,
                        sanitizer: null,
                        mangle: !0,
                        smartLists: !1,
                        silent: !1,
                        highlight: null,
                        langPrefix: "lang-",
                        smartypants: !1,
                        headerPrefix: "",
                        renderer: new o,
                        xhtml: !1
                    }, h.Parser = l, h.parser = l.parse, h.Renderer = o, h.Lexer = t, h.lexer = t.lex, h.InlineLexer = i, h.inlineLexer = i.output, h.parse = h, "undefined" != typeof n && "object" == typeof r ? n.exports = h : "function" == typeof e && e.amd ? e(function() {
                        return h
                    }) : this.marked = h
                }).call(function() {
                    return this || ("undefined" != typeof window ? window : t)
                }())
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        13: [function(e, t, n) {
            var r = e("codemirror");
            r.commands.tabAndIndentMarkdownList = function(e) {
                var t = e.listSelections(),
                    n = t[0].head,
                    r = e.getStateAfter(n.line),
                    i = r.list !== !1;
                if (i) return void e.execCommand("indentMore");
                if (e.options.indentWithTabs) e.execCommand("insertTab");
                else {
                    var o = Array(e.options.tabSize + 1).join(" ");
                    e.replaceSelection(o)
                }
            }, r.commands.shiftTabAndUnindentMarkdownList = function(e) {
                var t = e.listSelections(),
                    n = t[0].head,
                    r = e.getStateAfter(n.line),
                    i = r.list !== !1;
                if (i) return void e.execCommand("indentLess");
                if (e.options.indentWithTabs) e.execCommand("insertTab");
                else {
                    var o = Array(e.options.tabSize + 1).join(" ");
                    e.replaceSelection(o)
                }
            }
        }, {
            codemirror: 7
        }],
        14: [function(e, t, n) {
            "use strict";

            function r(e) {
                return e = _ ? e.replace("Ctrl", "Cmd") : e.replace("Cmd", "Ctrl")
            }

            function i(e, t, n) {
                e = e || {};
                var r = document.createElement("a");
                return t = void 0 == t ? !0 : t, e.title && t && (r.title = l(e.title, e.action, n), _ && (r.title = r.title.replace("Ctrl", "⌘"), r.title = r.title.replace("Alt", "⌥"))), r.tabIndex = -1, r.className = e.className, r
            }

            function o() {
                var e = document.createElement("i");
                return e.className = "separator", e.innerHTML = "|", e
            }

            function l(e, t, n) {
                var i, o = e;
                return t && (i = G(t), n[i] && (o += " (" + r(n[i]) + ")")), o
            }

            function a(e, t) {
                t = t || e.getCursor("start");
                var n = e.getTokenAt(t);
                if (!n.type) return {};
                for (var r, i, o = n.type.split(" "), l = {}, a = 0; a < o.length; a++) r = o[a], "strong" === r ? l.bold = !0 : "variable-2" === r ? (i = e.getLine(t.line), /^\s*\d+\.\s/.test(i) ? l["ordered-list"] = !0 : l["unordered-list"] = !0) : "atom" === r ? l.quote = !0 : "em" === r ? l.italic = !0 : "quote" === r ? l.quote = !0 : "strikethrough" === r ? l.strikethrough = !0 : "comment" === r ? l.code = !0 : "link" === r ? l.link = !0 : "tag" === r ? l.image = !0 : r.match(/^header(\-[1-6])?$/) && (l[r.replace("header", "heading")] = !0);
                return l
            }

            function s(e) {
                var t = e.codemirror;
                t.setOption("fullScreen", !t.getOption("fullScreen")), t.getOption("fullScreen") ? (V = document.body.style.overflow, document.body.style.overflow = "hidden") : document.body.style.overflow = V;
                var n = t.getWrapperElement();
                /fullscreen/.test(n.previousSibling.className) ? n.previousSibling.className = n.previousSibling.className.replace(/\s*fullscreen\b/, "") : n.previousSibling.className += " fullscreen";
                var r = e.toolbarElements.fullscreen;
                /active/.test(r.className) ? r.className = r.className.replace(/\s*active\s*/g, "") : r.className += " active";
                var i = t.getWrapperElement().nextSibling;
                /editor-preview-active-side/.test(i.className) && N(e)
            }

            function c(e) {
                I(e, "bold", e.options.blockStyles.bold)
            }

            function u(e) {
                I(e, "italic", e.options.blockStyles.italic)
            }

            function d(e) {
                I(e, "strikethrough", "~~")
            }

            function h(e) {
                function t(e) {
                    if ("object" != typeof e) throw "fencing_line() takes a 'line' object (not a line number, or line text).  Got: " + typeof e + ": " + e;
                    return e.styles && e.styles[2] && -1 !== e.styles[2].indexOf("formatting-code-block")
                }

                function n(e) {
                    return e.state.base.base || e.state.base
                }

                function r(e, r, i, o, l) {
                    i = i || e.getLineHandle(r), o = o || e.getTokenAt({
                        line: r,
                        ch: 1
                    }), l = l || !!i.text && e.getTokenAt({
                        line: r,
                        ch: i.text.length - 1
                    });
                    var a = o.type ? o.type.split(" ") : [];
                    return l && n(l).indentedCode ? "indented" : -1 === a.indexOf("comment") ? !1 : n(o).fencedChars || n(l).fencedChars || t(i) ? "fenced" : "single"
                }

                function i(e, t, n, r) {
                    var i = t.line + 1,
                        o = n.line + 1,
                        l = t.line !== n.line,
                        a = r + "\n",
                        s = "\n" + r;
                    l && o++, l && 0 === n.ch && (s = r + "\n", o--), O(e, !1, [a, s]), e.setSelection({
                        line: i,
                        ch: 0
                    }, {
                        line: o,
                        ch: 0
                    })
                }
                var o, l, a, s = e.options.blockStyles.code,
                    c = e.codemirror,
                    u = c.getCursor("start"),
                    d = c.getCursor("end"),
                    h = c.getTokenAt({
                        line: u.line,
                        ch: u.ch || 1
                    }),
                    f = c.getLineHandle(u.line),
                    p = r(c, u.line, f, h);
                if ("single" === p) {
                    var m = f.text.slice(0, u.ch).replace("`", ""),
                        g = f.text.slice(u.ch).replace("`", "");
                    c.replaceRange(m + g, {
                        line: u.line,
                        ch: 0
                    }, {
                        line: u.line,
                        ch: 99999999999999
                    }), u.ch--, u !== d && d.ch--, c.setSelection(u, d), c.focus()
                } else if ("fenced" === p)
                    if (u.line !== d.line || u.ch !== d.ch) {
                        for (o = u.line; o >= 0 && (f = c.getLineHandle(o), !t(f)); o--);
                        var v, y, x, b, w = c.getTokenAt({
                                line: o,
                                ch: 1
                            }),
                            k = n(w).fencedChars;
                        t(c.getLineHandle(u.line)) ? (v = "", y = u.line) : t(c.getLineHandle(u.line - 1)) ? (v = "", y = u.line - 1) : (v = k + "\n", y = u.line), t(c.getLineHandle(d.line)) ? (x = "", b = d.line, 0 === d.ch && (b += 1)) : 0 !== d.ch && t(c.getLineHandle(d.line + 1)) ? (x = "", b = d.line + 1) : (x = k + "\n", b = d.line + 1), 0 === d.ch && (b -= 1), c.operation(function() {
                            c.replaceRange(x, {
                                line: b,
                                ch: 0
                            }, {
                                line: b + (x ? 0 : 1),
                                ch: 0
                            }), c.replaceRange(v, {
                                line: y,
                                ch: 0
                            }, {
                                line: y + (v ? 0 : 1),
                                ch: 0
                            })
                        }), c.setSelection({
                            line: y + (v ? 1 : 0),
                            ch: 0
                        }, {
                            line: b + (v ? 1 : -1),
                            ch: 0
                        }), c.focus()
                    } else {
                        var C = u.line;
                        if (t(c.getLineHandle(u.line)) && ("fenced" === r(c, u.line + 1) ? (o = u.line, C = u.line + 1) : (l = u.line, C = u.line - 1)), void 0 === o)
                            for (o = C; o >= 0 && (f = c.getLineHandle(o), !t(f)); o--);
                        if (void 0 === l)
                            for (a = c.lineCount(), l = C; a > l && (f = c.getLineHandle(l), !t(f)); l++);
                        c.operation(function() {
                            c.replaceRange("", {
                                line: o,
                                ch: 0
                            }, {
                                line: o + 1,
                                ch: 0
                            }), c.replaceRange("", {
                                line: l - 1,
                                ch: 0
                            }, {
                                line: l,
                                ch: 0
                            })
                        }), c.focus()
                    }
                else if ("indented" === p) {
                    if (u.line !== d.line || u.ch !== d.ch) o = u.line, l = d.line, 0 === d.ch && l--;
                    else {
                        for (o = u.line; o >= 0; o--)
                            if (f = c.getLineHandle(o), !f.text.match(/^\s*$/) && "indented" !== r(c, o, f)) {
                                o += 1;
                                break
                            }
                        for (a = c.lineCount(), l = u.line; a > l; l++)
                            if (f = c.getLineHandle(l), !f.text.match(/^\s*$/) && "indented" !== r(c, l, f)) {
                                l -= 1;
                                break
                            }
                    }
                    var S = c.getLineHandle(l + 1),
                        L = S && c.getTokenAt({
                            line: l + 1,
                            ch: S.text.length - 1
                        }),
                        T = L && n(L).indentedCode;
                    T && c.replaceRange("\n", {
                        line: l + 1,
                        ch: 0
                    });
                    for (var M = o; l >= M; M++) c.indentLine(M, "subtract");
                    c.focus()
                } else {
                    var N = u.line === d.line && u.ch === d.ch && 0 === u.ch,
                        A = u.line !== d.line;
                    N || A ? i(c, u, d, s) : O(c, !1, ["`", "`"])
                }
            }

            function f(e) {
                var t = e.codemirror;
                W(t, "quote")
            }

            function p(e) {
                var t = e.codemirror;
                H(t, "smaller")
            }

            function m(e) {
                var t = e.codemirror;
                H(t, "bigger")
            }

            function g(e) {
                var t = e.codemirror;
                H(t, void 0, 1)
            }

            function v(e) {
                var t = e.codemirror;
                H(t, void 0, 2)
            }

            function y(e) {
                var t = e.codemirror;
                H(t, void 0, 3)
            }

            function x(e) {
                var t = e.codemirror;
                W(t, "unordered-list")
            }

            function b(e) {
                var t = e.codemirror;
                W(t, "ordered-list")
            }

            function w(e) {
                var t = e.codemirror;
                E(t)
            }

            function k(e) {
                var t = e.codemirror,
                    n = a(t),
                    r = e.options,
                    i = "http://";
                return r.promptURLs && (i = prompt(r.promptTexts.link), !i) ? !1 : void O(t, n.link, r.insertTexts.link, i)
            }

            function C(e) {
                var t = e.codemirror,
                    n = a(t),
                    r = e.options,
                    i;
                    if(localImage) {
                      i = localURL;
                    } else if (onlineImage) {
                      i = onlineURL;
                    } else {
                      i = "http://";
                    }
                return r.promptURLs && (i = prompt(r.promptTexts.image), !i) ? !1 : void O(t, n.image, r.insertTexts.image, i)
            }

            function S(e) {
                var t = e.codemirror,
                    n = a(t),
                    r = e.options;
                O(t, n.table, r.insertTexts.table)
            }

            function L(e) {
                var t = e.codemirror,
                    n = a(t),
                    r = e.options;
                O(t, n.image, r.insertTexts.horizontalRule)
            }

            function T(e) {
                var t = e.codemirror;
                t.undo(), t.focus()
            }

            function M(e) {
                var t = e.codemirror;
                t.redo(), t.focus()
            }

            function N(e) {
                var t = e.codemirror,
                    n = t.getWrapperElement(),
                    r = n.nextSibling,
                    i = e.toolbarElements["side-by-side"],
                    o = !1;
                /editor-preview-active-side/.test(r.className) ? (r.className = r.className.replace(/\s*editor-preview-active-side\s*/g, ""), i.className = i.className.replace(/\s*active\s*/g, ""), n.className = n.className.replace(/\s*CodeMirror-sided\s*/g, " ")) : (setTimeout(function() {
                    t.getOption("fullScreen") || s(e), r.className += " editor-preview-active-side"
                }, 1), i.className += " active", n.className += " CodeMirror-sided", o = !0);
                var l = n.lastChild;
                if (/editor-preview-active/.test(l.className)) {
                    l.className = l.className.replace(/\s*editor-preview-active\s*/g, "");
                    var a = e.toolbarElements.preview,
                        c = n.previousSibling;
                    a.className = a.className.replace(/\s*active\s*/g, ""), c.className = c.className.replace(/\s*disabled-for-preview*/g, "")
                }
                var u = function() {
                    r.innerHTML = e.options.previewRender(e.value(), r)
                };
                t.sideBySideRenderingFunction || (t.sideBySideRenderingFunction = u), o ? (r.innerHTML = e.options.previewRender(e.value(), r), t.on("update", t.sideBySideRenderingFunction)) : t.off("update", t.sideBySideRenderingFunction)
            }

            function A(e) {
                var t = e.codemirror,
                    n = t.getWrapperElement(),
                    r = n.previousSibling,
                    i = e.options.toolbar ? e.toolbarElements.preview : !1,
                    o = n.lastChild;
                o && /editor-preview/.test(o.className) || (o = document.createElement("div"), o.className = "editor-preview", n.appendChild(o)), /editor-preview-active/.test(o.className) ? (o.className = o.className.replace(/\s*editor-preview-active\s*/g, ""), i && (i.className = i.className.replace(/\s*active\s*/g, ""), r.className = r.className.replace(/\s*disabled-for-preview*/g, ""))) : (setTimeout(function() {
                    o.className += " editor-preview-active"
                }, 1), i && (i.className += " active", r.className += " disabled-for-preview")), o.innerHTML = e.options.previewRender(e.value(), o);
                var l = t.getWrapperElement().nextSibling;
                /editor-preview-active-side/.test(l.className) && N(e)
            }

            function O(e, t, n, r) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    var i, o = n[0],
                        l = n[1],
                        a = e.getCursor("start"),
                        s = e.getCursor("end");
                    r && (l = l.replace("#url#", r)), t ? (i = e.getLine(a.line), o = i.slice(0, a.ch), l = i.slice(a.ch), e.replaceRange(o + l, {
                        line: a.line,
                        ch: 0
                    })) : (i = e.getSelection(), e.replaceSelection(o + i + l), a.ch += o.length, a !== s && (s.ch += o.length)), e.setSelection(a, s), e.focus()
                }
            }

            function H(e, t, n) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    for (var r = e.getCursor("start"), i = e.getCursor("end"), o = r.line; o <= i.line; o++) ! function(r) {
                        var i = e.getLine(r),
                            o = i.search(/[^#]/);
                        i = void 0 !== t ? 0 >= o ? "bigger" == t ? "###### " + i : "# " + i : 6 == o && "smaller" == t ? i.substr(7) : 1 == o && "bigger" == t ? i.substr(2) : "bigger" == t ? i.substr(1) : "#" + i : 1 == n ? 0 >= o ? "# " + i : o == n ? i.substr(o + 1) : "# " + i.substr(o + 1) : 2 == n ? 0 >= o ? "## " + i : o == n ? i.substr(o + 1) : "## " + i.substr(o + 1) : 0 >= o ? "### " + i : o == n ? i.substr(o + 1) : "### " + i.substr(o + 1), e.replaceRange(i, {
                            line: r,
                            ch: 0
                        }, {
                            line: r,
                            ch: 99999999999999
                        })
                    }(o);
                    e.focus()
                }
            }

            function W(e, t) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    for (var n = a(e), r = e.getCursor("start"), i = e.getCursor("end"), o = {
                            quote: /^(\s*)\>\s+/,
                            "unordered-list": /^(\s*)(\*|\-|\+)\s+/,
                            "ordered-list": /^(\s*)\d+\.\s+/
                        }, l = {
                            quote: "> ",
                            "unordered-list": "* ",
                            "ordered-list": "1. "
                        }, s = r.line; s <= i.line; s++) ! function(r) {
                        var i = e.getLine(r);
                        i = n[t] ? i.replace(o[t], "$1") : l[t] + i, e.replaceRange(i, {
                            line: r,
                            ch: 0
                        }, {
                            line: r,
                            ch: 99999999999999
                        })
                    }(s);
                    e.focus()
                }
            }

            function I(e, t, n, r) {
                if (!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)) {
                    r = "undefined" == typeof r ? n : r;
                    var i, o = e.codemirror,
                        l = a(o),
                        s = n,
                        c = r,
                        u = o.getCursor("start"),
                        d = o.getCursor("end");
                        console.log(u,d);
                    l[t] ? (i = o.getLine(u.line), s = i.slice(0, u.ch), c = i.slice(u.ch), "bold" == t ? (s = s.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, ""), c = c.replace(/(\*\*|__)/, "")) : "italic" == t ? (s = s.replace(/(\*|_)(?![\s\S]*(\*|_))/, ""), c = c.replace(/(\*|_)/, "")) : "strikethrough" == t && (s = s.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, ""), c = c.replace(/(\*\*|~~)/, "")), o.replaceRange(s + c, {
                        line: u.line,
                        ch: 0
                    }, {
                        line: u.line,
                        ch: 99999999999999
                    }), "bold" == t || "strikethrough" == t ? (u.ch -= 2, u !== d && (d.ch -= 2)) : "italic" == t && (u.ch -= 1, u !== d && (d.ch -= 1))) : (i = o.getSelection(), "bold" == t ? (i = i.split("**").join(""), i = i.split("__").join("")) : "italic" == t ? (i = i.split("*").join(""), i = i.split("_").join("")) : "strikethrough" == t && (i = i.split("~~").join("")), o.replaceSelection(s + i + c), u.ch += n.length, d.ch = u.ch + i.length), o.setSelection(u, d), o.focus()
                }
            }

            function E(e) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className))
                    for (var t, n = e.getCursor("start"), r = e.getCursor("end"), i = n.line; i <= r.line; i++) t = e.getLine(i), t = t.replace(/^[ ]*([# ]+|\*|\-|[> ]+|[0-9]+(.|\)))[ ]*/, ""), e.replaceRange(t, {
                        line: i,
                        ch: 0
                    }, {
                        line: i,
                        ch: 99999999999999
                    })
            }

            function D(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (t[n] instanceof Array ? e[n] = t[n].concat(e[n] instanceof Array ? e[n] : []) : null !== t[n] && "object" == typeof t[n] && t[n].constructor === Object ? e[n] = D(e[n] || {}, t[n]) : e[n] = t[n]);
                return e
            }

            function P(e) {
                for (var t = 1; t < arguments.length; t++) e = D(e, arguments[t]);
                return e
            }

            function F(e) {
                var t = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g,
                    n = e.match(t),
                    r = 0;
                if (null === n) return r;
                for (var i = 0; i < n.length; i++) r += n[i].charCodeAt(0) >= 19968 ? n[i].length : 1;
                return r
            }

            function z(e) {
                e = e || {}, e.parent = this;
                var t = !0;
                if (e.autoDownloadFontAwesome === !1 && (t = !1), e.autoDownloadFontAwesome !== !0)
                    for (var n = document.styleSheets, r = 0; r < n.length; r++) n[r].href && n[r].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") > -1 && (t = !1);
                if (t) {
                    var i = document.createElement("link");
                    i.rel = "stylesheet", i.href = "/css/font-awesome.min.css", document.getElementsByTagName("head")[0].appendChild(i)
                }
                if (e.element) this.element = e.element;
                else if (null === e.element) return void console.log("SimpleMDE: Error. No element was found.");
                if (void 0 === e.toolbar) {
                    e.toolbar = [];
                    for (var o in K) K.hasOwnProperty(o) && (-1 != o.indexOf("separator-") && e.toolbar.push("|"), (K[o]["default"] === !0 || e.showIcons && e.showIcons.constructor === Array && -1 != e.showIcons.indexOf(o)) && e.toolbar.push(o))
                }
                e.hasOwnProperty("status") || (e.status = ["autosave", "lines", "words", "cursor"]), e.previewRender || (e.previewRender = function(e) {
                    return this.parent.markdown(e)
                }), e.parsingConfig = P({
                    highlightFormatting: !0
                }, e.parsingConfig || {}), e.insertTexts = P({}, X, e.insertTexts || {}), e.promptTexts = Y, e.blockStyles = P({}, Z, e.blockStyles || {}), e.shortcuts = P({}, U, e.shortcuts || {}), void 0 != e.autosave && void 0 != e.autosave.unique_id && "" != e.autosave.unique_id && (e.autosave.uniqueId = e.autosave.unique_id), this.options = e, this.render(), !e.initialValue || this.options.autosave && this.options.autosave.foundSavedValue === !0 || this.value(e.initialValue)
            }

            function R() {
                if ("object" != typeof localStorage) return !1;
                try {
                    localStorage.setItem("smde_localStorage", 1), localStorage.removeItem("smde_localStorage")
                } catch (e) {
                    return !1
                }
                return !0
            }
            var B = e("codemirror");
            e("codemirror/addon/edit/continuelist.js"), e("./codemirror/tablist"), e("codemirror/addon/display/fullscreen.js"), e("codemirror/mode/markdown/markdown.js"), e("codemirror/addon/mode/overlay.js"), e("codemirror/addon/display/placeholder.js"), e("codemirror/mode/gfm/gfm.js"), e("codemirror/mode/xml/xml.js"), e("spell-checker");
            var j = e("marked"),
                _ = /Mac/.test(navigator.platform),
                q = {
                    toggleBold: c,
                    toggleItalic: u,
                    drawLink: k,
                    toggleHeadingSmaller: p,
                    toggleHeadingBigger: m,
                    drawImage: C,
                    toggleBlockquote: f,
                    toggleOrderedList: b,
                    toggleUnorderedList: x,
                    toggleCodeBlock: h,
                    toggleStrikethrough: d,
                    toggleHeading1: g,
                    toggleHeading2: v,
                    toggleHeading3: y,
                    cleanBlock: w,
                    drawTable: S,
                    drawHorizontalRule: L,
                    undo: T,
                    redo: M,
                    toggleSideBySide: N,
                },
                U = {
                    toggleBold: "Cmd-B",
                    toggleItalic: "Cmd-I",
                    drawLink: "Cmd-K",
                    toggleHeadingSmaller: "Cmd-H",
                    toggleHeadingBigger: "Shift-Cmd-H",
                    cleanBlock: "Cmd-E",
                    drawImage: "Cmd-Alt-I",
                    toggleBlockquote: "Cmd-'",
                    toggleOrderedList: "Cmd-Alt-L",
                    toggleUnorderedList: "Cmd-L",
                    toggleCodeBlock: "Cmd-Alt-C",
                    toggleSideBySide: "F9",
                },
                G = function(e) {
                    for (var t in q)
                        if (q[t] === e) return t;
                    return null
                },
                $ = function() {
                    var e = !1;
                    return function(t) {
                        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
                    }(navigator.userAgent || navigator.vendor || window.opera), e
                },
                V = "",
                K = {
                    bold: {
                        name: "bold",
                        action: c,
                        className: "fa fa-bold",
                        title: "Bold",
                        "default": !0
                    },
                    italic: {
                        name: "italic",
                        action: u,
                        className: "fa fa-italic",
                        title: "Italic",
                        "default": !0
                    },
                    strikethrough: {
                        name: "strikethrough",
                        action: d,
                        className: "fa fa-strikethrough",
                        title: "Strikethrough"
                    },
                    heading: {
                        name: "heading",
                        action: p,
                        className: "fa fa-header",
                        title: "Heading",
                        "default": !0
                    },
                    "heading-smaller": {
                        name: "heading-smaller",
                        action: p,
                        className: "fa fa-header fa-header-x fa-header-smaller",
                        title: "Smaller Heading"
                    },
                    "heading-bigger": {
                        name: "heading-bigger",
                        action: m,
                        className: "fa fa-header fa-header-x fa-header-bigger",
                        title: "Bigger Heading"
                    },
                    "heading-1": {
                        name: "heading-1",
                        action: g,
                        className: "fa fa-header fa-header-x fa-header-1",
                        title: "Big Heading"
                    },
                    "heading-2": {
                        name: "heading-2",
                        action: v,
                        className: "fa fa-header fa-header-x fa-header-2",
                        title: "Medium Heading"
                    },
                    "heading-3": {
                        name: "heading-3",
                        action: y,
                        className: "fa fa-header fa-header-x fa-header-3",
                        title: "Small Heading"
                    },
                    "separator-1": {
                        name: "separator-1"
                    },
                    code: {
                        name: "code",
                        action: h,
                        className: "fa fa-code",
                        title: "Code"
                    },
                    quote: {
                        name: "quote",
                        action: f,
                        className: "fa fa-quote-left",
                        title: "Quote",
                        "default": !0
                    },
                    "unordered-list": {
                        name: "unordered-list",
                        action: x,
                        className: "fa fa-list-ul",
                        title: "Generic List",
                        "default": !0
                    },
                    "ordered-list": {
                        name: "ordered-list",
                        action: b,
                        className: "fa fa-list-ol",
                        title: "Numbered List",
                        "default": !0
                    },
                    "clean-block": {
                        name: "clean-block",
                        action: w,
                        className: "fa fa-eraser fa-clean-block",
                        title: "Clean block"
                    },
                    "separator-2": {
                        name: "separator-2"
                    },
                    link: {
                        name: "link",
                        action: k,
                        className: "fa fa-link",
                        title: "Create Link",
                        "default": !0
                    },
                    image: {
                        name: "image",
                        action: C,
                        className: "fa fa-picture-o",
                        title: "Insert Image",
                        "default": !0
                    },
                    table: {
                        name: "table",
                        action: S,
                        className: "fa fa-table",
                        title: "Insert Table"
                    },
                    "horizontal-rule": {
                        name: "horizontal-rule",
                        action: L,
                        className: "fa fa-minus",
                        title: "Insert Horizontal Line"
                    },
                    "separator-3": {
                        name: "separator-3"
                    },
                    preview: {
                        name: "preview",
                        action: A,
                        className: "fa fa-eye no-disable",
                        title: "Toggle Preview",
                        "default": !0
                    },
                    "side-by-side": {
                        name: "side-by-side",
                        action: N,
                        className: "fa fa-columns no-disable no-mobile",
                        title: "Toggle Side by Side",
                        "default": !0
                    },
                    fullscreen: {
                        name: "fullscreen",
                        action: s,
                        className: "fa fa-arrows-alt no-disable no-mobile",
                        title: "Toggle Fullscreen",
                        "default": !0
                    },
                    "separator-4": {
                        name: "separator-4"
                    },
                    guide: {
                        name: "guide",
                        action: "https://simplemde.com/markdown-guide",
                        className: "fa fa-question-circle",
                        title: "Markdown Guide",
                        "default": !0
                    },
                    "separator-5": {
                        name: "separator-5"
                    },
                    undo: {
                        name: "undo",
                        action: T,
                        className: "fa fa-undo no-disable",
                        title: "Undo"
                    },
                    redo: {
                        name: "redo",
                        action: M,
                        className: "fa fa-repeat no-disable",
                        title: "Redo"
                    }
                },
                X = {
                    link: ["[", "](#url#)"],
                    image: ["![", "](#url#)"],
                    table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
                    horizontalRule: ["", "\n\n-----\n\n"]
                },
                Y = {
                    link: "URL for the link:",
                    image: "URL of the image:"
                },
                Z = {
                    bold: "**",
                    code: "```",
                    italic: "*"
                };
            z.prototype.markdown = function(e) {
                if (j) {
                    var t = {};
                    return this.options && this.options.renderingConfig && this.options.renderingConfig.singleLineBreaks === !1 ? t.breaks = !1 : t.breaks = !0, this.options && this.options.renderingConfig && this.options.renderingConfig.codeSyntaxHighlighting === !0 && window.hljs && (t.highlight = function(e) {
                        return window.hljs.highlightAuto(e).value
                    }), j.setOptions(t), j(e)
                }
            }, z.prototype.render = function(e) {
                if (e || (e = this.element || document.getElementsByTagName("textarea")[0]), !this._rendered || this._rendered !== e) {
                    this.element = e;
                    var t = this.options,
                        n = this,
                        i = {};
                    for (var o in t.shortcuts) null !== t.shortcuts[o] && null !== q[o] && ! function(e) {
                        i[r(t.shortcuts[e])] = function() {
                            q[e](n)
                        }
                    }(o);
                    i.Enter = "newlineAndIndentContinueMarkdownList", i.Tab = "tabAndIndentMarkdownList", i["Shift-Tab"] = "shiftTabAndUnindentMarkdownList", i.Esc = function(e) {
                        e.getOption("fullScreen") && s(n)
                    }, document.addEventListener("keydown", function(e) {
                        e = e || window.event, 27 == e.keyCode && n.codemirror.getOption("fullScreen") && s(n)
                    }, !1);
                    var l, a;
                    if (t.spellChecker !== !1 ? (l = "spell-checker", a = t.parsingConfig, a.name = "gfm", a.gitHubSpice = !1) : (l = t.parsingConfig, l.name = "gfm", l.gitHubSpice = !1), this.codemirror = B.fromTextArea(e, {
                            mode: l,
                            backdrop: a,
                            theme: "paper",
                            tabSize: void 0 != t.tabSize ? t.tabSize : 2,
                            indentUnit: void 0 != t.tabSize ? t.tabSize : 2,
                            indentWithTabs: t.indentWithTabs !== !1,
                            lineNumbers: !1,
                            autofocus: t.autofocus === !0,
                            extraKeys: i,
                            lineWrapping: t.lineWrapping !== !1,
                            allowDropFileTypes: ["text/plain"],
                            placeholder: t.placeholder || e.getAttribute("placeholder") || ""
                        }), t.forceSync === !0) {
                        var c = this.codemirror;
                        c.on("change", function() {
                            c.save()
                        })
                    }
                    this.gui = {}, t.toolbar !== !1 && (this.gui.toolbar = this.createToolbar()), t.status !== !1 && (this.gui.statusbar = this.createStatusbar()), void 0 != t.autosave && t.autosave.enabled === !0 && this.autosave(), this.gui.sideBySide = this.createSideBySide(), this._rendered = this.element
                }
            }, z.prototype.autosave = function() {
                if (R()) {
                    var e = this;
                    if (void 0 == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId) return void console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");
                    null != e.element.form && void 0 != e.element.form && e.element.form.addEventListener("submit", function() {
                        localStorage.removeItem("smde_" + e.options.autosave.uniqueId)
                    }), this.options.autosave.loaded !== !0 && ("string" == typeof localStorage.getItem("smde_" + this.options.autosave.uniqueId) && "" != localStorage.getItem("smde_" + this.options.autosave.uniqueId) && (this.codemirror.setValue(localStorage.getItem("smde_" + this.options.autosave.uniqueId)), this.options.autosave.foundSavedValue = !0), this.options.autosave.loaded = !0), localStorage.setItem("smde_" + this.options.autosave.uniqueId, e.value());
                    var t = document.getElementById("autosaved");
                    if (null != t && void 0 != t && "" != t) {
                        var n = new Date,
                            r = n.getHours(),
                            i = n.getMinutes(),
                            o = "am",
                            l = r;
                        l >= 12 && (l = r - 12, o = "pm"), 0 == l && (l = 12), i = 10 > i ? "0" + i : i, t.innerHTML = "Autosaved: " + l + ":" + i + " " + o
                    }
                    this.autosaveTimeoutId = setTimeout(function() {
                        e.autosave()
                    }, this.options.autosave.delay || 1e4)
                } else console.log("SimpleMDE: localStorage not available, cannot autosave")
            }, z.prototype.clearAutosavedValue = function() {
                if (R()) {
                    if (void 0 == this.options.autosave || void 0 == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId) return void console.log("SimpleMDE: You must set a uniqueId to clear the autosave value");
                    localStorage.removeItem("smde_" + this.options.autosave.uniqueId)
                } else console.log("SimpleMDE: localStorage not available, cannot autosave")
            }, z.prototype.createSideBySide = function() {
                var e = this.codemirror,
                    t = e.getWrapperElement(),
                    n = t.nextSibling;
                n && /editor-preview-side/.test(n.className) || (n = document.createElement("div"), n.className = "editor-preview-side", t.parentNode.insertBefore(n, t.nextSibling));
                var r = !1,
                    i = !1;
                return e.on("scroll", function(e) {
                    if (r) return void(r = !1);
                    i = !0;
                    var t = e.getScrollInfo().height - e.getScrollInfo().clientHeight,
                        o = parseFloat(e.getScrollInfo().top) / t,
                        l = (n.scrollHeight - n.clientHeight) * o;
                    n.scrollTop = l
                }), n.onscroll = function() {
                    if (i) return void(i = !1);
                    r = !0;
                    var t = n.scrollHeight - n.clientHeight,
                        o = parseFloat(n.scrollTop) / t,
                        l = (e.getScrollInfo().height - e.getScrollInfo().clientHeight) * o;
                    e.scrollTo(0, l)
                }, n
            }, z.prototype.createToolbar = function(e) {
                if (e = e || this.options.toolbar, e && 0 !== e.length) {
                    var t;
                    for (t = 0; t < e.length; t++) void 0 != K[e[t]] && (e[t] = K[e[t]]);
                    var n = document.createElement("div");
                    n.className = "editor-toolbar";
                    var r = this,
                        l = {};
                    for (r.toolbar = e, t = 0; t < e.length; t++)
                        if (("guide" != e[t].name || r.options.toolbarGuideIcon !== !1) && !(r.options.hideIcons && -1 != r.options.hideIcons.indexOf(e[t].name) || ("fullscreen" == e[t].name || "side-by-side" == e[t].name) && $())) {
                            if ("|" === e[t]) {
                                for (var s = !1, c = t + 1; c < e.length; c++) "|" === e[c] || r.options.hideIcons && -1 != r.options.hideIcons.indexOf(e[c].name) || (s = !0);
                                if (!s) continue
                            }! function(e) {
                                var t;
                                t = "|" === e ? o() : i(e, r.options.toolbarTips, r.options.shortcuts), e.action && ("function" == typeof e.action ? t.onclick = function() {
                                    e.action(r)
                                } : "string" == typeof e.action && (t.href = e.action, t.target = "_blank")), l[e.name || e] = t, n.appendChild(t)
                            }(e[t])
                        }
                    r.toolbarElements = l;
                    var u = this.codemirror;
                    u.on("cursorActivity", function() {
                        var e = a(u);
                        for (var t in l) ! function(t) {
                            var n = l[t];
                            e[t] ? n.className += " active" : "fullscreen" != t && "side-by-side" != t && (n.className = n.className.replace(/\s*active\s*/g, ""))
                        }(t)
                    });
                    var d = u.getWrapperElement();
                    return d.parentNode.insertBefore(n, d), n
                }
            }, z.prototype.createStatusbar = function(e) {
                e = e || this.options.status;
                var t = this.options,
                    n = this.codemirror;
                if (e && 0 !== e.length) {
                    var r, i, o, l = [];
                    for (r = 0; r < e.length; r++)
                        if (i = void 0, o = void 0, "object" == typeof e[r]) l.push({
                            className: e[r].className,
                            defaultValue: e[r].defaultValue,
                            onUpdate: e[r].onUpdate
                        });
                        else {
                            var a = e[r];
                            "words" === a ? (o = function(e) {
                                e.innerHTML = "0"
                            }, i = function(e) {
                                e.innerHTML = F(n.getValue())
                            }) : "lines" === a ? (o = function(e) {
                                e.innerHTML = "0"
                            }, i = function(e) {
                                e.innerHTML = n.lineCount()
                            }) : "cursor" === a ? (o = function(e) {
                                e.innerHTML = "0:0"
                            }, i = function(e) {
                                var t = n.getCursor();
                                e.innerHTML = t.line + ":" + t.ch
                            }) : "autosave" === a && (o = function(e) {
                                void 0 != t.autosave && t.autosave.enabled === !0 && e.setAttribute("id", "autosaved")
                            }), l.push({
                                className: a,
                                defaultValue: o,
                                onUpdate: i
                            })
                        }
                    var s = document.createElement("div");
                    for (s.className = "editor-statusbar", r = 0; r < l.length; r++) {
                        var c = l[r],
                            u = document.createElement("span");
                        u.className = c.className, "function" == typeof c.defaultValue && c.defaultValue(u), "function" == typeof c.onUpdate && this.codemirror.on("update", function(e, t) {
                            return function() {
                                t.onUpdate(e)
                            }
                        }(u, c)), s.appendChild(u)
                    }
                    var d = this.codemirror.getWrapperElement();
                    return d.parentNode.insertBefore(s, d.nextSibling), s
                }
            }, z.prototype.value = function(e) {
                return void 0 === e ? this.codemirror.getValue() : (this.codemirror.getDoc().setValue(e), this)
            }, z.toggleBold = c, z.toggleItalic = u, z.toggleStrikethrough = d, z.toggleBlockquote = f, z.toggleHeadingSmaller = p, z.toggleHeadingBigger = m, z.toggleHeading1 = g, z.toggleHeading2 = v, z.toggleHeading3 = y, z.toggleCodeBlock = h, z.toggleUnorderedList = x, z.toggleOrderedList = b, z.cleanBlock = w, z.drawLink = k, z.drawImage = C, z.drawTable = S, z.drawHorizontalRule = L, z.undo = T, z.redo = M, z.togglePreview = A, z.toggleSideBySide = N, z.toggleFullScreen = s, z.prototype.toggleBold = function() {
                c(this)
            }, z.prototype.toggleItalic = function() {
                u(this)
            }, z.prototype.toggleStrikethrough = function() {
                d(this)
            }, z.prototype.toggleBlockquote = function() {
                f(this)
            }, z.prototype.toggleHeadingSmaller = function() {
                p(this)
            }, z.prototype.toggleHeadingBigger = function() {
                m(this)
            }, z.prototype.toggleHeading1 = function() {
                g(this)
            }, z.prototype.toggleHeading2 = function() {
                v(this)
            }, z.prototype.toggleHeading3 = function() {
                y(this)
            }, z.prototype.toggleCodeBlock = function() {
                h(this)
            }, z.prototype.toggleUnorderedList = function() {
                x(this)
            }, z.prototype.toggleOrderedList = function() {
                b(this)
            }, z.prototype.cleanBlock = function() {
                w(this)
            }, z.prototype.drawLink = function() {
                k(this)
            }, z.prototype.drawImage = function() {
                C(this)
            }, z.prototype.drawTable = function() {
                S(this)
            }, z.prototype.drawHorizontalRule = function() {
                L(this)
            }, z.prototype.undo = function() {
                T(this)
            }, z.prototype.redo = function() {
                M(this)
            }, z.prototype.togglePreview = function() {
                A(this)
            }, z.prototype.toggleSideBySide = function() {
                N(this)
            }, z.prototype.toggleFullScreen = function() {
                s(this)
            }, z.prototype.isPreviewActive = function() {
                var e = this.codemirror,
                    t = e.getWrapperElement(),
                    n = t.lastChild;
                return /editor-preview-active/.test(n.className)
            }, z.prototype.isSideBySideActive = function() {
                var e = this.codemirror,
                    t = e.getWrapperElement(),
                    n = t.nextSibling;
                return /editor-preview-active-side/.test(n.className)
            }, z.prototype.isFullscreenActive = function() {
                var e = this.codemirror;
                return e.getOption("fullScreen")
            }, z.prototype.getState = function() {
                var e = this.codemirror;
                return a(e)
            }, z.prototype.toTextArea = function() {
                var e = this.codemirror,
                    t = e.getWrapperElement();
                t.parentNode.removeChild(this.gui.toolbar), t.parentNode.removeChild(this.gui.statusbar), t.parentNode.removeChild(this.gui.sideBySide), e.toTextArea(), this.autosaveTimeoutId && (clearTimeout(this.autosaveTimeoutId), this.autosaveTimeoutId = void 0, this.clearAutosavedValue())
            }, t.exports = z
        }, {
            "./codemirror/tablist": 13,
            codemirror: 7,
            "codemirror/addon/display/fullscreen.js": 3,
            "codemirror/addon/display/placeholder.js": 4,
            "codemirror/addon/edit/continuelist.js": 5,
            "codemirror/addon/mode/overlay.js": 6,
            "codemirror/mode/gfm/gfm.js": 8,
            "codemirror/mode/markdown/markdown.js": 9,
            "codemirror/mode/xml/xml.js": 11,
            marked: 12,
            "spell-checker": 1
        }]
    }, {}, [14])(14)
});
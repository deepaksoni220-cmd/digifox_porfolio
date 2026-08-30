"use strict";

function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function e(e) {
    return e && e.__esModule ? e.default : e;
  }
  function t(e, t, r, n) {
    Object.defineProperty(e, t, {
      get: r,
      set: n,
      enumerable: !0,
      configurable: !0
    });
  }
  function r(e) {
    var _o$i;
    if (e = ((_o$i = o.i) === null || _o$i === void 0 ? void 0 : _o$i[e]) || e, !n) try {
      throw Error();
    } catch (r) {
      var t = ("" + r.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
      if (!t) return i + e;
      n = t[0];
    }
    return new URL(i + e, n).toString();
  }
  var n,
    i = "./",
    o = ("u" > (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) ? globalThis : "u" > (typeof self === "undefined" ? "undefined" : _typeof(self)) ? self : "u" > (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : "u" > (typeof global === "undefined" ? "undefined" : _typeof(global)) ? global : {}).parcelRequirecb08,
    s = o.register;
  s("4xQsQ", function (r, n) {
    t(r.exports, "CmpView", function () {
      return S;
    });
    var i = o("h2FSh"),
      s = o("kTJf3"),
      a = o("7nwmn"),
      l = o("7qJ26"),
      c = o("dmwAz"),
      u = o("7u4IU"),
      d = o("8DtZC"),
      p = o("1a1bx"),
      h = o("l8qje"),
      f = o("e08dO"),
      m = o("5e7TB"),
      g = o("i3Ybj"),
      v = o("gTcQ9"),
      y = o("d42QO"),
      b = o("ekaCU"),
      w = o("7mNzs"),
      C = o("j7eCr"),
      E = o("5iTGz"),
      T = o("TZuok"),
      A = o("g2KRE"),
      _ = o("6RNzx"),
      L = o("gHZiw");
    var S = /*#__PURE__*/function () {
      function S(t) {
        var _this = this;
        _classCallCheck(this, S);
        this.privacyButtonStyle = "", this.privacyNoticeStyle = "", this.secondLayerStyle = "", this.toastifyStyle = "", this.wixStyle = "", this.cbStyle = "", this.isCbDerivative = !1, this.isCmsSmallBanner = !1, this.isWidgetBanner = !1, this.currentView = "none", this.currentTabView = "first", this.useScreenReaderShell = /Windows/.test(navigator.userAgent), this._ageVerificationCompleted = !1, this.cmpController = t.cmpController, this.template = t.template, this.partials = this.getMergedPartials([t.partials, null == (r = t.cmpController.theme.custom) ? void 0 : r.hooks, null == (n = t.cmpController.theme.custom) ? void 0 : n.partials]), this.style = t.style, this.currentScreenType = this.cmpController.theme.getScreenType(), this.isWidgetBanner = "WIDGET" === String(null == (a = t.cmpController.theme.cmp) || null == (s = a.default) || null == (o = s.layout) ? void 0 : o.template), this.isCbDerivative = ["wix", "cb", "shopify"].includes(t.cmpController.ui.theme) || ["BAR", "DIALOG"].includes(null == (d = t.cmpController.theme.cmp) || null == (u = d.default) || null == (l = u.layout) ? void 0 : l.template), this.isCmsSmallBanner = ["wix", "shopify"].includes(t.cmpController.ui.theme) && ["FLOAT", "FLAT"].includes(null == (f = t.cmpController.theme.cmp) || null == (h = f.default) || null == (p = h.layout) ? void 0 : p.template) && !["desktop", "tablet"].includes(this.currentScreenType), document.querySelectorAll("#usercentrics-cmp-ui").forEach(function (e) {
          e.remove();
        });
        var r,
          n,
          o,
          s,
          a,
          l,
          u,
          d,
          p,
          h,
          f,
          g = document.createElement("aside");
        g.id = "usercentrics-cmp-ui", "tv" === t.cmpController.ui.theme && (g.style.zIndex = "2147483646", g.style.position = "fixed", g.style.width = "100%", g.style.height = "100%"), "function" != typeof g.attachShadow || window.__ucMock && window.__ucMock.shadow || g.attachShadow({
          mode: "open"
        }), g.setAttribute("data-nosnippet", "1"), this.view = g.shadowRoot || g, document.body ? document.body.appendChild(g) : document.addEventListener("DOMContentLoaded", function () {
          document.body.appendChild(g);
        }), this._ageVerificationCompleted = this.cmpController.getAgeVerificationStatus(), this.setView(this.cmpController.ui.initialView || "none"), (0, T.isGpcToastVisible)(this.cmpController) && ("button" === this.currentView || "none" === this.currentView) && window.addEventListener("UC_UI_INITIALIZED", function () {
          var t, r, n, i, o, s, a, l, c, u, d;
          e(b)({
            text: _this.cmpController.i18n.base.gpcSignalHonored,
            duration: 3e3,
            selector: null == (t = document.getElementById("usercentrics-cmp-ui")) ? void 0 : t.shadowRoot,
            avatar: m.usercentricsShield,
            close: !1,
            gravity: "bottom",
            position: "center",
            stopOnFocus: !1,
            style: {
              background: (null == (s = _this.cmpController.theme.cmp) || null == (o = s.default) || null == (i = o.colors) || null == (n = i.light) || null == (r = n.cmp) ? void 0 : r.background) || "white",
              color: (null == (d = _this.cmpController.theme.cmp) || null == (u = d.default) || null == (c = u.colors) || null == (l = c.light) || null == (a = l.main) ? void 0 : a.text) || "black"
            }
          }).showToast();
        });
        var v = "desktop" === this.cmpController.theme.getScreenTypeZoomIndependent();
        this.zoomLevel = v ? this.cmpController.theme.getZoomLevel() : "zoom-normal", window.addEventListener("resize", function () {
          return (0, i._)(function () {
            var e, t;
            return (0, c._)(this, function (r) {
              switch (r.label) {
                case 0:
                  if (v = "desktop" === this.cmpController.theme.getScreenTypeZoomIndependent(), e = this.cmpController.theme.getScreenType(), !v) return [3, 4];
                  if (t = this.cmpController.theme.getZoomLevel(), e === this.currentScreenType) return [3, 2];
                  return this.currentScreenType = e, [4, this.render()];
                case 1:
                  r.sent(), r.label = 2;
                case 2:
                  if (t === this.zoomLevel) return [3, 4];
                  return this.zoomLevel = t, [4, this.render()];
                case 3:
                  r.sent(), r.label = 4;
                case 4:
                  return [2];
              }
            });
          }).call(_this);
        });
      }
      return _createClass(S, [{
        key: "ageVerificationCompleted",
        get: function get() {
          return this._ageVerificationCompleted;
        },
        set: function set(e) {
          this._ageVerificationCompleted = e;
        }
      }, {
        key: "getMergedPartials",
        value: function getMergedPartials(e) {
          return e.reduce(function (e, t) {
            return t ? (0, s._)({}, e, t) : e;
          }, {});
        }
      }, {
        key: "updatePartials",
        value: function updatePartials(e) {
          this.partials = this.getMergedPartials([this.partials].concat(_toConsumableArray(e))), this.render();
        }
      }, {
        key: "updateTheme",
        value: function updateTheme(e) {
          this.cmpController.updateTheme(e);
        }
      }, {
        key: "getConsentScreen",
        value: function getConsentScreen() {
          switch (this.currentView) {
            case "first":
              return 1;
            case "second":
              return 2;
            default:
              return 0;
          }
        }
      }, {
        key: "isLayerView",
        value: function isLayerView() {
          return this.isFirstLayerView() || this.isSecondLayerView() || this.isPrivacyNoticeView();
        }
      }, {
        key: "isFirstLayerView",
        value: function isFirstLayerView() {
          return "first" === this.currentView;
        }
      }, {
        key: "isSecondLayerView",
        value: function isSecondLayerView() {
          return "second" === this.currentView;
        }
      }, {
        key: "isPrivacyButtonView",
        value: function isPrivacyButtonView() {
          return "button" === this.currentView;
        }
      }, {
        key: "isPrivacyNoticeView",
        value: function isPrivacyNoticeView() {
          return "privacyNotice" === this.currentView;
        }
      }, {
        key: "setTabView",
        value: function setTabView(e) {
          return (0, i._)(function () {
            var t, r, n, i, o, s, a, l, u, d, p, h, f, m;
            return (0, c._)(this, function (c) {
              switch (c.label) {
                case 0:
                  if (t = {
                    purposes: "first",
                    categories: "first",
                    vendors: "second",
                    services: "second"
                  }, !("string" == typeof e && S.ALLOWED_TABS.includes(e))) return [3, 2];
                  return this.currentTabView = null != (r = t[e]) ? r : e, [4, this.render()];
                case 1:
                  return c.sent(), [2, Promise.resolve()];
                case 2:
                  n = [{
                    match: function match(e) {
                      return e.startsWith("category-");
                    },
                    tab: "first"
                  }, {
                    match: function match(e) {
                      return ["purpose-", "feature-", "special-feature-", "special-purpose-"].some(function (t) {
                        return e.startsWith(t);
                      });
                    },
                    tab: "first",
                    scrollType: "purpose"
                  }, {
                    match: function match(e) {
                      return e.startsWith("vendor-");
                    },
                    tab: "second",
                    scrollType: "vendor"
                  }], i = !1, o = !0, s = !1, a = void 0, c.label = 3;
                case 3:
                  c.trys.push([3, 8, 9, 10]), l = n[Symbol.iterator](), c.label = 4;
                case 4:
                  if (o = (u = l.next()).done) return [3, 7];
                  if (p = (d = u.value).match, h = d.tab, f = d.scrollType, !p(e)) return [3, 6];
                  return this.currentTabView = h, [4, this.render()];
                case 5:
                  return c.sent(), f && this.getScrollElementById(e, f), i = !0, [3, 7];
                case 6:
                  return o = !0, [3, 4];
                case 7:
                  return [3, 10];
                case 8:
                  return m = c.sent(), s = !0, a = m, [3, 10];
                case 9:
                  try {
                    o || null == l.return || l.return();
                  } finally {
                    if (s) throw a;
                  }
                  return [7];
                case 10:
                  if (i) return [3, 12];
                  return this.currentTabView = "first", [4, this.render()];
                case 11:
                  c.sent(), this.getScrollElementById(e, "category"), c.label = 12;
                case 12:
                  return [2];
              }
            });
          }).call(this);
        }
      }, {
        key: "scrollAndExpand",
        value: function scrollAndExpand(e) {
          return (0, i._)(function () {
            var t, r;
            return (0, c._)(this, function (n) {
              return (t = this.view.querySelector(e)) && (t.scrollIntoView({
                behavior: "smooth",
                block: "center"
              }), (r = t.querySelector(".list-item-header-expander")) && r.click()), [2];
            });
          }).call(this);
        }
      }, {
        key: "getScrollElementById",
        value: function getScrollElementById(e, t) {
          "purpose" === t ? this.selectPurposeFeatures(e) : "vendor" === t ? this.selectVendor(e) : "category" === t && this.selectCategory(e);
        }
      }, {
        key: "selectPurposeFeatures",
        value: function selectPurposeFeatures(e) {
          var t = this.cmpController.tcf,
            r = void 0 === t ? {} : t,
            n = r.purposes,
            i = r.specialPurposes,
            o = r.features,
            s = r.specialFeatures,
            a = e.split("-"),
            l = a.pop();
          if (l) {
            var c = parseInt(l, 10),
              u = a.join("-");
            ("purpose" === u && (void 0 === n ? {} : n)[c] || "special-purpose" === u && (void 0 === i ? {} : i)[c] || "feature" === u && (void 0 === o ? {} : o)[c] || "special-feature" === u && (void 0 === s ? {} : s)[c]) && this.scrollAndExpand("#".concat(e));
          }
        }
      }, {
        key: "selectVendor",
        value: function selectVendor(e) {
          var t = parseInt(e.replace("vendor-", ""), 10),
            r = this.cmpController.tcf,
            n = void 0 === r ? {} : r,
            i = n.vendors,
            o = n.acm,
            s = (void 0 === o ? {} : o).vendors,
            a = [(void 0 === i ? {} : i)[t] && "#iab-vendor-".concat(t), (void 0 === s ? [] : s).some(function (e) {
              return e.id === t;
            }) && "#acm-vendor-".concat(t)].filter(Boolean);
          if (a.length) return void this.scrollAndExpand(a[0]);
        }
      }, {
        key: "selectCategory",
        value: function selectCategory(e) {
          var t = e.startsWith("uc-category-") ? e.replace("uc-category-", "") : e,
            r = this.cmpController.dps,
            n = (void 0 === r ? {} : r).categories;
          if ((void 0 === n ? {} : n)[t]) {
            var i = "#non-iab-purpose-".concat(t),
              o = "#uc-category-".concat(t);
            this.view.querySelector(i) ? this.scrollAndExpand(i) : this.view.querySelector(o) && this.scrollAndExpand(o);
          }
        }
      }, {
        key: "scrollIntoVendorsList",
        value: function scrollIntoVendorsList() {
          var e = document.getElementById("usercentrics-cmp-ui"),
            t = null == e || null == (r = e.shadowRoot) ? void 0 : r.querySelector("#vendors");
          if (t && t.children.length > 0) {
            null == (n = t.previousElementSibling) || n.scrollIntoView();
            var r,
              n,
              i = t.querySelector(".focusable");
            i && i.focus();
          }
        }
      }, {
        key: "openAndScrollToVendorList",
        value: function openAndScrollToVendorList() {
          var e = document.getElementById("usercentrics-cmp-ui"),
            t = null == e || null == (r = e.shadowRoot) ? void 0 : r.querySelector("#partners");
          if (t && t.children.length > 0) {
            null == t || null == (n = t.firstElementChild) || n.click(), null == t || t.scrollIntoView();
            var r,
              n,
              i = t.querySelector(".focusable");
            i && i.focus();
          }
        }
      }, {
        key: "getLanguages",
        value: function getLanguages(e, t) {
          var r = Object.entries(e).map(function (e) {
              var r = (0, l._)(e, 2),
                n = r[0],
                i = r[1];
              return (0, a._)((0, s._)({
                id: n
              }, i), {
                selected: t === n
              });
            }),
            n = r.findIndex(function (e) {
              return !!e.selected;
            }),
            i = r.find(function (e) {
              return !!e.selected;
            });
          return n > 0 && i && (r.splice(n, 1), r.unshift(i)), r;
        }
      }, {
        key: "getButtonAriaLabel",
        value: function getButtonAriaLabel(e) {
          var t = this.cmpController.i18n.base.ariaLabels;
          switch (e) {
            case "more":
              return t.ccpaMoreInformation;
            case "accept":
              return t.acceptAllButton;
            case "save":
              return t.saveButton;
            case "deny":
              return t.denyAllButton;
            case "ok":
              return "".concat(t.saveButton, ", ").concat(t.ccpaButton);
            default:
              return "";
          }
        }
      }, {
        key: "setView",
        value: function setView(e) {
          ("first" === e || "second" === e) && "first" !== this.currentView && "second" !== this.currentView && this.cmpController.setAnalyticsPixel(p.CMP_EVENT_TYPE.CMP_SHOWN, this.currentView), (this.cmpController.tcf || this.cmpController.isGppActive()) && this.cmpController.signalIABViewChanged(this.currentView, e), this.cmpController.dispatchViewChanged(this.currentView, e), this.currentView = e;
        }
      }, {
        key: "updateToggles",
        value: function updateToggles() {
          var _this2 = this;
          this.view.querySelectorAll('[data-action="toggle"]').forEach(function (e) {
            var t = e.dataset,
              r = e.getAttribute("value") || "";
            switch (t.actionType) {
              case "serviceConsent":
                var n,
                  i,
                  o = (null == (i = _this2.cmpController.dps.getService(r)) || null == (n = i.consent) ? void 0 : n.given) === !0;
                e.checked = o, e.setAttribute("aria-checked", String(o));
                var s = Object.entries(_this2.cmpController.dps.categories || {}).find(function (e) {
                  var t = (0, l._)(e, 2),
                    n = (t[0], t[1]);
                  return (null == n ? void 0 : n.dps) && r in n.dps;
                });
                if (s) {
                  var a = (0, l._)(s, 2),
                    c = a[0],
                    u = Object.values(a[1].dps || {}),
                    d = u.some(Boolean),
                    p = u.every(function (e) {
                      return !1 === e;
                    }),
                    h = !!d && !p,
                    f = _this2.view.querySelector("[data-action=\"toggle\"][data-action-type=\"categoryConsent\"][value=\"".concat(c, "\"]"));
                  f && (f.checked = h, f.setAttribute("aria-checked", String(h)));
                }
                break;
              case "categoryConsent":
                var m = "ALL_DENIED" !== _this2.cmpController.dps.getCategoryConsent(r);
                e.checked = m, e.setAttribute("aria-checked", String(m));
            }
          });
        }
      }, {
        key: "attachToggleEvents",
        value: function attachToggleEvents(e) {
          var _this3 = this;
          var t = this.cmpController,
            r = e.querySelector('[data-action-type="optOutConsent"]');
          r && (this.ccpaOptOutState = "true" === r.getAttribute("aria-checked")), e.querySelectorAll('[data-action="toggle"').forEach(function (e) {
            e.addEventListener("click", function (e) {
              return (0, i._)(function () {
                var r, n, i, o, s, a, l, u, d, p, f, m, g, v, y, b, w, C, E, T, A, _, L;
                return (0, c._)(this, function (c) {
                  switch (c.label) {
                    case 0:
                      e.stopPropagation(), r = e.target, c.label = 1;
                    case 1:
                      switch (c.trys.push([1, 27,, 28]), null !== (n = r.getAttribute("aria-checked")) && (s = "true" === n ? "false" : "true", r.setAttribute("aria-checked", s), r instanceof HTMLInputElement && "checkbox" === r.type && (r.checked = "true" === s), null == (o = r.parentElement) || null == (i = o.querySelector(".uc-toggle")) || i.setAttribute("aria-checked", s)), a = r.getAttribute("value") || "", l = r.dataset.actionType, u = "true" === r.getAttribute("aria-checked"), l) {
                        case "categoryConsent":
                          return [3, 2];
                        case "serviceConsent":
                          return [3, 5];
                        case "purposeConsent":
                          return [3, 7];
                        case "purposeLegitimateInterest":
                          return [3, 9];
                        case "vendorConsent":
                          return [3, 11];
                        case "vendorLegitimateInterest":
                          return [3, 13];
                        case "specialFeatureConsent":
                          return [3, 15];
                        case "stackConsent":
                          return [3, 17];
                        case "acmVendorConsent":
                          return [3, 19];
                        case "optOutConsent":
                          return [3, 21];
                      }
                      return [3, 26];
                    case 2:
                      return v = (m = null == (f = this.cmpController) || null == (p = f.dps) || null == (d = p.categories) ? void 0 : d[a]) ? Object.keys(null != (g = m.dps) ? g : {}) : [], [4, t.updateCategoryConsent({
                        id: a,
                        consent: u
                      })];
                    case 3:
                      return c.sent(), [4, Promise.allSettled(v.map(function (e) {
                        return t.updateServiceConsent({
                          id: e,
                          consent: u
                        });
                      }))];
                    case 4:
                    case 6:
                      return c.sent(), this.updateToggles(), [3, 26];
                    case 5:
                      return [4, t.updateServiceConsent({
                        id: a,
                        consent: u
                      })];
                    case 7:
                      return [4, null == (y = t.tcf) ? void 0 : y.setPurposeConsent(Number(a), u)];
                    case 8:
                    case 10:
                    case 12:
                    case 14:
                    case 18:
                    case 20:
                      return c.sent(), [3, 26];
                    case 9:
                      return [4, null == (b = t.tcf) ? void 0 : b.setPurposeLegitimateInterestConsent(Number(a), u)];
                    case 11:
                      return [4, null == (w = t.tcf) ? void 0 : w.setVendorConsent(Number(a), u)];
                    case 13:
                      return [4, null == (C = t.tcf) ? void 0 : C.setVendorLegitimateInterestConsent(Number(a), u)];
                    case 15:
                      return [4, null == (E = t.tcf) ? void 0 : E.setSpecialFeatureConsent(Number(a), u)];
                    case 16:
                      return c.sent(), (A = null == (T = r.parentNode) ? void 0 : T.querySelector(".text")) && (0, h.isTcfCmpController)(this.cmpController) && !this.isCbDerivative && (A.innerHTML = u ? this.cmpController.i18n.tcf.toggles.specialFeaturesOn : this.cmpController.i18n.tcf.toggles.specialFeaturesOff), [3, 26];
                    case 17:
                      return [4, null == (_ = t.tcf) ? void 0 : _.setStackConsent(Number(a), u)];
                    case 19:
                      return [4, null == (L = t.tcf) ? void 0 : L.setAcmVendorConsent(Number(a), u)];
                    case 21:
                      if (this.ccpaOptOutState = u, !u) return [3, 23];
                      return [4, t.denyAllConsents()];
                    case 22:
                      return c.sent(), [3, 25];
                    case 23:
                      return [4, t.acceptAllConsents()];
                    case 24:
                      c.sent(), c.label = 25;
                    case 25:
                      return [3, 26];
                    case 26:
                      return [3, 28];
                    case 27:
                      return c.sent(), console.error("NOT A TOGGLE ELEMENT", r), [3, 28];
                    case 28:
                      return [2];
                  }
                });
              }).call(_this3);
            });
          });
        }
      }, {
        key: "applyConsentEvent",
        value: function applyConsentEvent(e, t) {
          return (0, i._)(function () {
            var r, n, i, o, s, a, l, u, d, f, m, g, v, y;
            return (0, c._)(this, function (c) {
              switch (c.label) {
                case 0:
                  switch (r = this.cmpController, t) {
                    case "age-yes":
                      return [3, 1];
                    case "age-no":
                      return [3, 3];
                    case "accept":
                      return [3, 7];
                    case "deny":
                      return [3, 11];
                    case "save":
                      return [3, 17];
                    case "close":
                      return [3, 22];
                    case "pure-close":
                      return [3, 26];
                    case "more":
                      return [3, 28];
                    case "more-vendors":
                      return [3, 30];
                    case "more-privacy":
                      return [3, 35];
                    case "less":
                      return [3, 37];
                    case "show":
                      return [3, 39];
                    case "dsrUcForm":
                      return [3, 41];
                  }
                  return [3, 43];
                case 1:
                  return r.setAnalyticsPixel(p.CMP_EVENT_TYPE.AGE_VERIFICATION_ACCEPT, this.currentView), r.saveAgeVerification(!0), this.ageVerificationCompleted = !0, [4, this.render()];
                case 2:
                case 10:
                case 14:
                case 16:
                case 19:
                case 23:
                case 27:
                case 29:
                case 36:
                case 38:
                case 40:
                case 42:
                  return c.sent(), [3, 43];
                case 3:
                  return r.setAnalyticsPixel(p.CMP_EVENT_TYPE.AGE_VERIFICATION_DENY, this.currentView), [4, r.denyAllConsents()];
                case 4:
                  return c.sent(), [4, r.saveConsents("EXPLICIT", !1, (0, h.isUsCmpController)(r))];
                case 5:
                  return c.sent(), i = null == (n = this.getAgeVerificationConfig()) ? void 0 : n.redirectUrl, [4, this.closeCmp(!1)];
                case 6:
                  return c.sent(), i && window.location.assign(i), [3, 43];
                case 7:
                  return r.setAnalyticsPixel(p.CMP_EVENT_TYPE.ACCEPT_ALL, this.currentView), [4, r.acceptAllConsents()];
                case 8:
                case 12:
                  return c.sent(), (0, h.isTcfCmpController)(r) && r.tcf.updateConsentScreen(this.getConsentScreen()), [4, r.saveConsents()];
                case 9:
                  return c.sent(), [4, this.closeCmp(!1)];
                case 11:
                  return this.cmpController.setAnalyticsPixel(p.CMP_EVENT_TYPE.DENY_ALL, this.currentView), [4, r.denyAllConsents()];
                case 13:
                  if (c.sent(), !((0, h.isTcfCmpController)(r) && r.isConsentOrPayEnabled() && !r.areAllRequiredConsentsAccepted())) return [3, 15];
                  return [4, this.showFirstLayer()];
                case 15:
                case 20:
                  return [4, this.closeCmp(!1)];
                case 17:
                  return s = null != (o = this.ccpaOptOutState) && o, (0, h.isTcfCmpController)(r) && (r.tcf.updateConsentScreen(this.getConsentScreen()), r.isConsentOrPayEnabled() && r.acceptMandatoryConsents()), [4, r.saveConsents("EXPLICIT", !1, s)];
                case 18:
                  if (c.sent(), !((0, h.isTcfCmpController)(r) && r.isConsentOrPayEnabled() && !r.areAllRequiredConsentsAccepted())) return [3, 20];
                  return [4, this.showFirstLayer()];
                case 21:
                  return c.sent(), (0, h.isUsCmpController)(r) ? (l = r.isOptedOut(), u = !!(null == (a = r.consent) ? void 0 : a.gpcSignal), d = l ? u ? p.CMP_EVENT_TYPE.DENY_ALL_IMPLICIT_CMP_SHOWN : p.CMP_EVENT_TYPE.DENY_ALL_EXPLICIT : p.CMP_EVENT_TYPE.ACCEPT_EXPLICIT, r.setAnalyticsPixel(d, this.currentView)) : r.setAnalyticsPixel(p.CMP_EVENT_TYPE.SAVE, this.currentView), [3, 43];
                case 22:
                  if ((0, h.isUsCmpController)(r) && (m = r.isOptedOut(), g = !!(null == (f = r.consent) ? void 0 : f.gpcSignal), v = m ? g ? p.CMP_EVENT_TYPE.DENY_ALL_IMPLICIT_CMP_SHOWN : p.CMP_EVENT_TYPE.DENY_ALL_EXPLICIT : p.CMP_EVENT_TYPE.ACCEPT_EXPLICIT, r.setAnalyticsPixel(v, this.currentView)), !((0, h.isTcfCmpController)(r) && r.isConsentOrPayEnabled() && !r.areAllRequiredConsentsAccepted())) return [3, 24];
                  return [4, this.showFirstLayer()];
                case 24:
                  return [4, this.closeCmp(!0)];
                case 25:
                  return c.sent(), (0, h.isUsCmpController)(r) && (null == (y = r.consent) ? void 0 : y.gpcSignal) && r.setAnalyticsPixel(p.CMP_EVENT_TYPE.DENY_ALL_IMPLICIT_CMP_SHOWN, this.currentView), [3, 43];
                case 26:
                  return this.cmpController.setPrivacyNoticeStatus(), [4, this.closeCmp(!0)];
                case 28:
                  return r.setAnalyticsPixel(p.CMP_EVENT_TYPE.MORE_INFORMATION_LINK, this.currentView), E.focusEvents.addFocusQueueId(e.id), [4, this.showSecondLayer()];
                case 30:
                  if (!(this.isCbDerivative && this.cmpController.tcf)) return [3, 33];
                  return [4, this.setTabView("third")];
                case 31:
                  return c.sent(), [4, this.render()];
                case 32:
                  return c.sent(), this.openAndScrollToVendorList(), [3, 43];
                case 33:
                  return r.setAnalyticsPixel(p.CMP_EVENT_TYPE.MORE_INFORMATION_LINK, this.currentView), E.focusEvents.addFocusQueueId(e.id), [4, this.showSecondLayer("second")];
                case 34:
                  return c.sent(), "tv" === this.cmpController.ui.theme && this.scrollIntoVendorsList(), [3, 43];
                case 35:
                case 39:
                  return E.focusEvents.addFocusQueueId(e.id), [4, this.showSecondLayer()];
                case 37:
                  return "tv" === this.cmpController.ui.theme && this.cmpController.reset(), [4, this.showFirstLayer()];
                case 41:
                  return [4, this.showDsrForm()];
                case 43:
                  return [2];
              }
            });
          }).call(this);
        }
      }, {
        key: "attachConsentEvents",
        value: function attachConsentEvents(e) {
          var _this4 = this;
          e.querySelectorAll('[data-action="consent"]').forEach(function (e) {
            ["click"].forEach(function (t) {
              e.addEventListener(t, function () {
                return (0, i._)(function () {
                  var t, r;
                  return (0, c._)(this, function (n) {
                    var _this5 = this;
                    return (r = (t = e).dataset.actionType) && setTimeout(function () {
                      _this5.applyConsentEvent(t, r);
                    }, 0), [2];
                  });
                }).call(_this4);
              });
            });
          });
        }
      }, {
        key: "attachLinkEvents",
        value: function attachLinkEvents(e) {
          var _this6 = this;
          var t = this.cmpController;
          e.querySelectorAll('[data-action="link"]').forEach(function (e) {
            e.addEventListener("click", function () {
              return (0, i._)(function () {
                var r, n, i;
                return (0, c._)(this, function (o) {
                  switch (e.dataset.actionType) {
                    case "privacyPolicy":
                      t.setAnalyticsPixel(p.CMP_EVENT_TYPE.PRIVACY_POLICY_LINK, this.currentView);
                      break;
                    case "imprint":
                      t.setAnalyticsPixel(p.CMP_EVENT_TYPE.IMPRINT_LINK, this.currentView);
                      break;
                    case "cookiePolicy":
                      t.setAnalyticsPixel(p.CMP_EVENT_TYPE.COOKIE_POLICY_LINK, this.currentView);
                      break;
                    case "mine":
                      t.setAnalyticsPixel(p.CMP_EVENT_TYPE.SAY_MINE_LINK, this.currentView);
                  }
                  return (n = (r = e.getAttribute("href")) && r.match(/^#onUc(.*)Click$/)) && n.length && (i = new window.CustomEvent(n[0].substr(1)), window.dispatchEvent(i)), [2];
                });
              }).call(_this6);
            });
          });
        }
      }, {
        key: "attachActivateEvents",
        value: function attachActivateEvents(e) {
          var t = e.querySelectorAll('[data-action="activate"]'),
            r = t.length;
          t.forEach(function (n, o) {
            n.addEventListener("click", function () {
              return (0, i._)(function () {
                var t, r, i;
                return (0, c._)(this, function (o) {
                  return r = (t = n.dataset).target, i = t.source, r && i && (e.querySelectorAll(i).forEach(function (t) {
                    var r = t.dataset.target;
                    r && (e.querySelectorAll(r).forEach(function (e) {
                      e.classList.toggle("active", !1);
                    }), t.classList.toggle("active", !1), t.classList.contains("active") ? (t.setAttribute("tabindex", "0"), t.setAttribute("aria-selected", "true")) : (t.setAttribute("tabindex", "-1"), t.setAttribute("aria-selected", "false")));
                  }), e.querySelectorAll(r).forEach(function (e) {
                    e.classList.toggle("active", !0);
                  }), n.classList.toggle("active", !0), n.classList.contains("active") ? (n.setAttribute("tabindex", "0"), n.setAttribute("aria-selected", "true")) : (n.setAttribute("tabindex", "-1"), n.setAttribute("aria-selected", "false"))), [2];
                });
              })();
            }), n.addEventListener("keydown", function (e) {
              ("ArrowRight" === e.key || "ArrowLeft" === e.key) && (n.blur(), "ArrowRight" === e.key && (o === r - 1 ? (t[0].focus(), t[0].click()) : (t[o + 1].focus(), t[o + 1].click())), "ArrowLeft" === e.key && (0 === o ? (t[r - 1].focus(), t[r - 1].click()) : (t[o - 1].focus(), t[o - 1].click())));
            });
          });
        }
      }, {
        key: "attachExpandEvents",
        value: function attachExpandEvents(e) {
          var _this7 = this;
          e.querySelectorAll('[data-action="expand"]').forEach(function (e) {
            var t = e.querySelector('[role="button"]'),
              r = e.querySelector(".uc-card-title");
            t && r && ("false" === t.getAttribute("aria-expanded") || null === t.getAttribute("aria-expanded") ? t.setAttribute("aria-label", "".concat(_this7.cmpController.i18n.base.ariaLabels.expand, " ").concat(r.innerHTML)) : t.setAttribute("aria-label", "".concat(_this7.cmpController.i18n.base.ariaLabels.collapse, " ").concat(r.innerHTML)));
          }), e.querySelectorAll('[data-action="expand"]').forEach(function (t) {
            t.addEventListener("click", function (r) {
              return (0, i._)(function () {
                var n, i;
                return (0, c._)(this, function (o) {
                  var _this8 = this;
                  return (n = r.target) && n.classList.contains("disabled") || n && n.hasAttribute("href") && "#" !== n.getAttribute("href") || ((i = t.dataset.target) ? e.querySelectorAll(i).forEach(function (e) {
                    e.classList.toggle("expanded"), e.querySelectorAll(".list-item-header-expander").forEach(function (e) {
                      if ("false" === e.getAttribute("aria-expanded") || null === e.getAttribute("aria-expanded")) {
                        e.setAttribute("aria-expanded", "true");
                        var t = e.getAttribute("aria-label") || "",
                          r = t.substring(t.indexOf(" ") + 1);
                        e.setAttribute("aria-label", "".concat(_this8.cmpController.i18n.base.ariaLabels.collapse, " ").concat(r));
                      } else {
                        e.setAttribute("aria-expanded", "false");
                        var n = e.getAttribute("aria-label") || "",
                          i = n.substring(n.indexOf(" ") + 1);
                        e.setAttribute("aria-label", "".concat(_this8.cmpController.i18n.base.ariaLabels.expand, " ").concat(i));
                      }
                    });
                  }) : t.classList.toggle("expanded")), [2];
                });
              }).call(_this7);
            });
          });
        }
      }, {
        key: "attachEscapeEvents",
        value: function attachEscapeEvents(e) {
          e.addEventListener("click", function (t) {
            e.querySelectorAll(".escapable.visible").forEach(function (e) {
              var r = t.target;
              r.closest(".language-selector-button") || r.closest(".language-selector-button-mobile") || e.contains(t.target) || (e.classList.remove("visible"), e.setAttribute("visibility", "false"));
            });
          });
        }
      }, {
        key: "attachFocusEvents",
        value: function attachFocusEvents(e) {
          var _this9 = this;
          var t = this.cmpController,
            r = document.getElementById("usercentrics-cmp-ui"),
            n = e.querySelector("#uc-main-dialog"),
            i = e.querySelector("#uc-screen-reader-shell"),
            o = !!e.querySelector("#uc-overlay"),
            s = e.querySelector("#language-selector-menu");
          s && (E.focusEvents.attachFocusLock(document, s), s.addEventListener("keydown", function (e) {
            if ("ArrowDown" === e.key) {
              e.preventDefault();
              var t = _this9.view.querySelector(":focus-visible");
              t && t.nextElementSibling && t.nextElementSibling.focus(), t && !t.nextElementSibling && s.children[0].focus();
            }
            if ("ArrowUp" === e.key) {
              e.preventDefault();
              var r = _this9.view.querySelector(":focus-visible");
              r && r.previousElementSibling && r.previousElementSibling.focus(), r && !r.previousElementSibling && s.children[s.children.length - 1].focus();
            }
          }));
          var a = this.useScreenReaderShell ? i : n;
          o && a && E.focusEvents.attachFocusLock(document, a), !n || (null == r ? void 0 : r.getAttribute("keyboard-events")) || (null == r || r.setAttribute("keyboard-events", "true"), e.addEventListener("keydown", function (e) {
            if (window.UC_TV_KEYMAP && window.UC_TV_KEYMAP.ok ? window.UC_TV_KEYMAP.ok.includes(e.keyCode) : 13 === e.keyCode) {
              e.stopPropagation(), e.preventDefault();
              try {
                var t,
                  r,
                  n = _this9.view.querySelector(":focus-visible"),
                  i = e.target;
                null == (t = e.target) || t.click(), i.classList.contains("slider") && n === i && (null == (r = e.target) || r.focus());
              } catch (t) {
                var o,
                  s,
                  a = _this9.view.querySelector(":focus"),
                  l = e.target;
                null == (o = e.target) || o.click(), l.classList.contains("slider") && a === l && (null == (s = e.target) || s.focus());
              }
            }
          }), e.addEventListener("keydown", function (r) {
            var n,
              i = window.UC_TV_KEYMAP && window.UC_TV_KEYMAP.back ? window.UC_TV_KEYMAP.back.includes(r.keyCode) : "Escape" === r.key || 27 === r.keyCode,
              o = e.querySelector(".modal-wrapper");
            if ("tv" !== _this9.cmpController.ui.theme && i && !o) {
              var s = e.querySelector(".language-selector-menu.visible");
              if (s) {
                s.classList.remove("visible"), s.setAttribute("visibility", "false"), null == (n = e.querySelector("#uc-language-button")) || n.focus({
                  preventScroll: !0
                });
                return;
              }
              if (!e.querySelector("#uc-overlay") && t.getIsConsentRequired()) return void _this9.moveFocusToFirstPageElement();
              t.getIsConsentRequired() || _this9.closeCmp();
            }
          }));
          var l = this.useScreenReaderShell && this.isLayerView() ? i : n;
          if ((l && !E.focusEvents.focusQueue.length || l && this.isSecondLayerView()) && window.location === window.parent.location && l.focus({
            preventScroll: !0
          }), E.focusEvents.focusQueue.length && this.isFirstLayerView()) {
            var c,
              u = E.focusEvents.consumeFocusQueueId();
            u && (null == (c = e.querySelector(u)) || c.focus());
          }
        }
      }, {
        key: "moveFocusToFirstPageElement",
        value: function moveFocusToFirstPageElement() {
          var e = document.getElementById("usercentrics-cmp-ui"),
            t = Array.from(document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(function (t) {
              return t !== e;
            }),
            r = !0,
            n = !1,
            i = void 0;
          try {
            for (var o, s, a, l = t[Symbol.iterator](); !(r = (a = l.next()).done); r = !0) {
              var c = a.value;
              if (c.focus(), document.activeElement === c) return;
            }
          } catch (e) {
            n = !0, i = e;
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (n) throw i;
            }
          }
          var u = null != (o = this.view.querySelector(":focus")) ? o : document.activeElement;
          null == u || null == (s = u.blur) || s.call(u);
        }
      }, {
        key: "attachGenericEvents",
        value: function attachGenericEvents(e) {
          this.attachToggleEvents(e), this.attachConsentEvents(e), this.attachLinkEvents(e), this.attachActivateEvents(e), this.attachEscapeEvents(e), this.attachExpandEvents(e), this.attachFocusEvents(e), this.applyDynamicStyles(e);
        }
      }, {
        key: "applyDynamicStyles",
        value: function applyDynamicStyles(e) {
          e.querySelectorAll("img[data-uc-img-height]").forEach(function (e) {
            var t = e.dataset.ucImgHeight;
            t && (e.style.height = "".concat(t, "px"));
          });
        }
      }, {
        key: "attachEvents",
        value: function attachEvents() {
          var _this0 = this;
          this.attachGenericEvents(this.view);
          var e = this.cmpController,
            t = this.view,
            r = e.getCmpTheme(this.isFirstLayerView() ? "first" : "second");
          t.querySelectorAll('[data-action="language"]').forEach(function (r) {
            r.addEventListener("change", function (r) {
              return (0, i._)(function () {
                var n;
                return (0, c._)(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [4, e.changeLanguage(r.target.value)];
                    case 1:
                      return i.sent(), [4, this.render()];
                    case 2:
                      return i.sent(), null == (n = t.querySelector("#uc-language-button")) || n.focus({
                        preventScroll: !0
                      }), [2];
                  }
                });
              }).call(_this0);
            });
          }), t.querySelectorAll(".language-selector-button").forEach(function (e) {
            e.addEventListener("click", function () {
              return (0, i._)(function () {
                return (0, c._)(this, function (e) {
                  var _this1 = this;
                  return t.querySelectorAll(".language-selector-menu").forEach(function (e) {
                    e.classList.add("visible"), e.setAttribute("visibility", "true");
                    var t = _this1.view.querySelector("#language-selector-menu");
                    t.children.length > 0 && t.children[0].focus();
                  }), [2];
                });
              }).call(_this0);
            });
          }), t.querySelectorAll(".language-selector-menu > li").forEach(function (r) {
            r.addEventListener("click", function () {
              return (0, i._)(function () {
                var n, i;
                return (0, c._)(this, function (o) {
                  switch (o.label) {
                    case 0:
                      if (!(n = r.dataset.language)) return [3, 3];
                      return [4, e.changeLanguage(n)];
                    case 1:
                      return o.sent(), [4, this.render()];
                    case 2:
                      o.sent(), null == (i = t.querySelector("#uc-language-button")) || i.focus({
                        preventScroll: !0
                      }), o.label = 3;
                    case 3:
                      return [2];
                  }
                });
              }).call(_this0);
            });
          }), t.querySelectorAll("[data-load-action]").forEach(function (n) {
            n.addEventListener("click", function (s) {
              return (0, i._)(function () {
                var i, a, l, u, d;
                return (0, c._)(this, function (c) {
                  var _this10 = this;
                  if (s.target && s.target.classList.contains("disabled")) return [2];
                  if (a = (i = n.dataset).loadTarget, l = i.loadId, u = i.loadAction, !a) throw Error("data-load-target not defined");
                  if ((d = t.querySelector(a)) && u && l) switch (u) {
                    case "serviceDetails":
                      e.getServiceInfo(l, !0).then(function (e) {
                        e && o("lgbCL").then(function (t) {
                          var r = new t.ServiceDetailsView(_this10.cmpController, e);
                          d.innerHTML = "", d.appendChild(r.render()), _this10.attachGenericEvents(d);
                        });
                      });
                      break;
                    case "categoryDetails":
                      o("eTUg0").then(function (e) {
                        var t = new e.CategoryDetailsView(_this10.cmpController, l, r.visibility.hideServicesToggles, _this10.partials);
                        d.innerHTML = "", d.appendChild(t.render()), _this10.attachGenericEvents(d);
                      });
                  }
                  return [2];
                });
              }).call(_this0);
            });
          });
          var n = t.querySelector(".controller-id-item-button");
          null == n || n.addEventListener("click", function () {
            var t = e.getControllerId() + ":" + e.setting.getId();
            navigator.clipboard.writeText(t), n.querySelectorAll(".copy-icon").forEach(function (e) {
              e.classList.toggle("active"), setTimeout(function () {
                e.classList.toggle("active");
              }, 3e3);
            });
          });
          var s = !["desktop", "tablet"].includes(this.currentScreenType);
          if (!s && "FLOAT" === r.layout.template || this.isCmsSmallBanner || this.isWidgetBanner) {
            var a = t.querySelector("#mid-container"),
              l = t.querySelector(".privacy-text"),
              u = t.querySelector(".show-more-button");
            l && l.scrollHeight <= l.clientHeight && (this.isWidgetBanner || s) && (null == u || u.setAttribute("style", "display: none;")), l && u && u.addEventListener("click", function () {
              var t = l.classList.toggle("is-expanded");
              s && a && a.classList.toggle("is-expanded"), t ? (l.style.height = "auto", u.textContent = e.i18n.base.showLess, u.setAttribute("aria-expanded", "true")) : (_this0.isWidgetBanner || (l.style.height = "38px"), u.textContent = e.i18n.base.showMore, u.setAttribute("aria-expanded", "false"));
            }), this.checkFloatDescriptionOverflow();
          }
          this.observeOverflow("#uc-cmp-description"), this.observeOverflow(".tablet-view");
        }
      }, {
        key: "showFirstLayer",
        value: function showFirstLayer() {
          return (0, i._)(function () {
            var e;
            return (0, c._)(this, function (t) {
              return "tv" === this.cmpController.ui.theme && ((e = document.getElementById("usercentrics-cmp-ui")) && (e.style.zIndex = "2147483646"), this.cmpController.initAbortController()), this.setView("first"), this.render(), [2];
            });
          }).call(this);
        }
      }, {
        key: "showSecondLayer",
        value: function showSecondLayer(e) {
          return (0, i._)(function () {
            var t;
            return (0, c._)(this, function (r) {
              switch (r.label) {
                case 0:
                  if ("tv" === this.cmpController.ui.theme && ((t = document.getElementById("usercentrics-cmp-ui")) && (t.style.zIndex = "2147483646"), this.cmpController.initAbortController()), !(this.isCbDerivative && this.cmpController.tcf)) return [3, 3];
                  return [4, this.setTabView("second")];
                case 1:
                  return r.sent(), [4, this.render()];
                case 2:
                  return r.sent(), [2];
                case 3:
                  return e || this.cmpController.setAnalyticsPixel(p.CMP_EVENT_TYPE.CMP_REQUEST_DISPLAY, this.currentView), [4, this.setView("second")];
                case 4:
                  return r.sent(), [4, this.setTabView(e || "first")];
                case 5:
                  return r.sent(), this.observeOverflow(".sections-body"), [2];
              }
            });
          }).call(this);
        }
      }, {
        key: "observeOverflow",
        value: function observeOverflow(e) {
          var t = this.view.querySelector(e);
          if (t) {
            var r = function r() {
              t.scrollHeight >= t.clientHeight ? t.classList.add("overflow") : t.classList.remove("overflow");
            };
            r(), new ResizeObserver(r).observe(t);
          }
        }
      }, {
        key: "checkFloatDescriptionOverflow",
        value: function checkFloatDescriptionOverflow() {
          var e = this.view.querySelector(".privacy-text"),
            t = this.view.querySelector(".privacy-text-detailed");
          if (e && t) {
            var r = null,
              n = function n() {
                if (!e.isConnected) {
                  null == r || r.disconnect(), r = null;
                  return;
                }
                var n = e.scrollHeight - e.clientHeight > 1;
                t.classList.toggle("has-overflow", n);
              };
            requestAnimationFrame(n), setTimeout(n, 0), (r = new ResizeObserver(function () {
              return n();
            })).observe(e);
          }
        }
      }, {
        key: "showServiceDetails",
        value: function showServiceDetails(e) {
          return (0, i._)(function () {
            return (0, c._)(this, function (t) {
              var _this11 = this;
              switch (t.label) {
                case 0:
                  return [4, Promise.all([o("lgbCL"), o("amMgL")]).then(function (t) {
                    var r = (0, l._)(t, 2),
                      n = r[0].ServiceDetailsView,
                      o = r[1].ModalView;
                    return (0, i._)(function () {
                      return (0, c._)(this, function (t) {
                        var _this12 = this;
                        switch (t.label) {
                          case 0:
                            return [4, this.cmpController.getServiceInfo(e, !0).then(function (e) {
                              return (0, i._)(function () {
                                var t, r, i, s;
                                return (0, c._)(this, function (a) {
                                  var _this13 = this;
                                  switch (a.label) {
                                    case 0:
                                      if (!e) return [3, 3];
                                      if (t = new n(this.cmpController, e), r = this.cmpController.theme.getScreenType(), i = {
                                        titleLabel: e.i18n.name,
                                        backLabel: this.cmpController.i18n.base.back,
                                        closeAriaLabel: this.cmpController.i18n.base.ariaLabels.closeButton,
                                        currentScreenType: r
                                      }, this.isLayerView()) return [3, 2];
                                      return s = this.currentView, this.setView("first"), [4, this.render({
                                        cssOnly: !0
                                      })];
                                    case 1:
                                      a.sent(), a.label = 2;
                                    case 2:
                                      new o(i, function () {
                                        s && (_this13.setView(s), _this13.render());
                                      }).appendContent(t.render()), a.label = 3;
                                    case 3:
                                      return [2];
                                  }
                                });
                              }).call(_this12);
                            })];
                          case 1:
                            return t.sent(), [2];
                        }
                      });
                    }).call(_this11);
                  })];
                case 1:
                  return t.sent(), [2];
              }
            });
          }).call(this);
        }
      }, {
        key: "resetAgeVerification",
        value: function resetAgeVerification() {
          this._ageVerificationCompleted = !1;
        }
      }, {
        key: "isAgeVerificationEnabled",
        value: function isAgeVerificationEnabled() {
          var e = this.getAgeVerificationConfig();
          return !!((0, h.isUsCmpController)(this.cmpController) && (null == e ? void 0 : e.enabled) && (null == e ? void 0 : e.verificationMethod) === d.AGE_VERIFICATION_METHOD.YES_NO);
        }
      }, {
        key: "isAgeVerificationRequired",
        value: function isAgeVerificationRequired() {
          return this.isAgeVerificationEnabled() && !this.ageVerificationCompleted;
        }
      }, {
        key: "showAutoblockerMoreInfoView",
        value: function showAutoblockerMoreInfoView(e, t) {
          return (0, i._)(function () {
            var r, n, s;
            return (0, c._)(this, function (a) {
              var _this14 = this;
              switch (a.label) {
                case 0:
                  return n = this.cmpController.theme.getScreenType(), s = {
                    titleLabel: (null == (r = this.cmpController.i18n.firstLayer) ? void 0 : r.buttons.more) || "More information",
                    backLabel: this.cmpController.i18n.base.back,
                    closeAriaLabel: this.cmpController.i18n.base.ariaLabels.closeButton,
                    currentScreenType: n
                  }, [4, Promise.all([o("e5B8N"), o("amMgL")]).then(function (r) {
                    var n = (0, l._)(r, 2),
                      o = n[0].AutoblockerMoreInfoView,
                      a = n[1].ModalView;
                    return (0, i._)(function () {
                      var r, n;
                      return (0, c._)(this, function (i) {
                        var _this15 = this;
                        return r = new a(s, function () {
                          _this15.setView("none"), null == t || t();
                        }), n = new o(this.cmpController, {
                          cssData: this.getCmpCssProps(this.cmpController.getCmpTheme("second")),
                          serviceIDs: e
                        }, this.partials), r.appendContent(n.render()), [2];
                      });
                    }).call(_this14);
                  })];
                case 1:
                  return a.sent(), [2];
              }
            });
          }).call(this);
        }
      }, {
        key: "showDsrForm",
        value: function showDsrForm() {
          return (0, i._)(function () {
            return (0, c._)(this, function (e) {
              return f.UCConsole.warn("CmpView - showDsrForm", "DSR UC Form not yet implemented"), [2];
            });
          })();
        }
      }, {
        key: "closeCmp",
        value: function closeCmp() {
          var e = !(arguments.length > 0) || void 0 === arguments[0] || arguments[0];
          return (0, i._)(function () {
            var t, r, n;
            return (0, c._)(this, function (i) {
              switch (i.label) {
                case 0:
                  return t = "tv" === this.cmpController.ui.theme, r = "tv" === this.cmpController.ui.theme ? "none" : this.cmpController.ui.closedView, this.cmpController.signalIABViewChanged(this.currentView, r), this.cmpController.dispatchViewChanged(this.currentView, r), e && this.cmpController.reset(), this.currentView = r, t && (y.default.uninit(), this.cmpController.abortController.abort(), (n = document.getElementById("usercentrics-cmp-ui")) && (n.style.zIndex = "-1")), this.disconnectObservers(), [4, this.render()];
                case 1:
                  return i.sent(), [2];
              }
            });
          }).call(this);
        }
      }, {
        key: "getAgeVerificationConfig",
        value: function getAgeVerificationConfig() {
          return this.cmpController.getAgeVerificationConfig();
        }
      }, {
        key: "getAgeVerificationTemplateData",
        value: function getAgeVerificationTemplateData(e) {
          if ((0, h.isUsCmpController)(this.cmpController) && (null == e ? void 0 : e.enabled) && e.verificationMethod === d.AGE_VERIFICATION_METHOD.YES_NO && !this.ageVerificationCompleted) {
            var t = this.cmpController.i18n,
              r = (null == t ? void 0 : t.base.ageVerificationTitle) || e.contentTitle,
              n = (null == t ? void 0 : t.base.ageVerificationDescription) || e.contentText,
              i = (null == t ? void 0 : t.base.ageVerificationYes) || e.buttonOverAgeText,
              o = (null == t ? void 0 : t.base.ageVerificationNo) || e.buttonUnderAgeText;
            return (0, a._)((0, s._)({
              title: r
            }, n && {
              description: n
            }), {
              yesLabel: i,
              noLabel: o,
              yesAriaLabel: i,
              noAriaLabel: o
            });
          }
        }
      }, {
        key: "getData",
        value: function getData() {
          return (0, i._)(function () {
            var e, t, r, n, i, o, d, p, f, v, y, b, C, E, T, A, k, x, I, N, M, O, P, D, V, B, R, F, $, U, z, Y, j, W, q, H, K, G, X, Z, Q, J, ee, et, er, en, ei, eo, es, ea, el, ec, eu, ed, ep, eh, ef, em, eg, ev, ey;
            return (0, c._)(this, function (c) {
              var _this16 = this;
              if (e = this, t = e.cmpController, r = e.currentScreenType, n = e.zoomLevel, "none" === this.currentView) return [2];
              if (i = this.getAgeVerificationConfig(), o = this.getAgeVerificationTemplateData(i)) return p = t.getCmpTheme("first"), f = t.i18n, v = {
                view: {
                  cmp: !0,
                  ageVerification: !0,
                  type: "cmp ageVerification"
                },
                theme: {
                  direction: p.layout.direction,
                  position: "center",
                  useOverlay: !1,
                  screenType: r,
                  zoomLevel: n
                },
                ageVerification: o,
                buttons: [],
                links: []
              }, (null == i ? void 0 : i.logoUrl) ? v.logo = {
                url: i.logoUrl,
                alt: i.logoAltTag || "",
                size: i.logoSize || 32
              } : (null == (d = p.elements.logo) ? void 0 : d.url) && "" !== p.elements.logo.url.trim() ? v.logo = {
                url: p.elements.logo.url,
                alt: p.elements.logo.alt || ""
              } : v.logo = {
                url: m.usercentricsShieldWhite,
                alt: "Usercentrics",
                size: 64
              }, p.visibility.hideLanguageSwitch || (v.language = {
                languages: this.getLanguages(t.languages.languages, this.cmpController.getLanguage()).map(function (e, t) {
                  return (0, a._)((0, s._)({}, e), {
                    index: t + 1
                  });
                }),
                ariaLabel: f.base.ariaLabels.languageSelector
              }, v.hasActions = v.language.languages.length > 0), [2, {
                cmpTheme: p,
                templateData: v,
                cssProps: this.getCmpCssProps(p) + this.getAgeVerificationCssProps(i)
              }];
              if (this.isPrivacyNoticeView()) return (M = null == (y = t.ui.informationOnlyLayer) ? void 0 : y.isBannerEnabled, O = this.cmpController.isPrivacyNoticeDismissed(), !M || O) ? [2] : (D = (P = t.getPrivacyNoticeTheme()).position, V = P.direction, B = t.getCmpTheme("first"), R = null == (b = this.cmpController.i18n.base.links.privacyPolicy) ? void 0 : b.url, F = (null == (C = t.ui.informationOnlyLayer) ? void 0 : C.moreInformationRedirect) === "PRIVACY_POLICY_PAGE" && R, $ = (null == (E = t.ui.informationOnlyLayer) ? void 0 : E.trigger) === "LINK_IN_BANNER_MESSAGE", U = (null == (T = t.ui.informationOnlyLayer) ? void 0 : T.trigger) === "MORE_LINK_BUTTON", z = (null == (A = t.ui.informationOnlyLayer) ? void 0 : A.bannerMessage) || "", Y = (0, L.sanitizeBannerMessageLinks)(z), [2, {
                templateData: (0, s._)({
                  view: {
                    type: "privacyNotice",
                    privacyNotice: !0
                  },
                  theme: {
                    screenType: r,
                    position: D,
                    direction: V,
                    zoomLevel: n,
                    isPrivacyNotice: !0,
                    useOverlay: !1
                  },
                  isMoreInfoLink: (null == (k = t.ui.informationOnlyLayer) ? void 0 : k.trigger) === "LINK",
                  isMoreInfoButton: (null == (x = t.ui.informationOnlyLayer) ? void 0 : x.trigger) === "BUTTON",
                  isMoreInfoLinkButton: U,
                  isLinkInBannerMessage: $,
                  privacyPolicyLink: R,
                  redirectToPrivacyPolicyLink: F,
                  privacyLabels: {
                    bannerMessage: Y,
                    buttonAcceptAllLabel: null == (I = t.ui.informationOnlyLayer) ? void 0 : I.buttonAcceptAllLabel,
                    buttonMoreInfoLabel: null == (N = t.ui.informationOnlyLayer) ? void 0 : N.buttonMoreInfoLabel
                  }
                }, B.elements.logo && B.elements.logo.url && {
                  logo: (0, a._)((0, s._)({}, B.elements.logo), {
                    position: this.isFirstLayerView() ? B.elements.logo.position : "left"
                  })
                }),
                cssProps: this.getCmpCssProps(B)
              }]);
              if (this.isPrivacyButtonView()) return (j = document.location.href, W = document.querySelector("body"), this.disconnectObservers(), this.privacyButtonObserver = new MutationObserver(function (e) {
                j !== document.location.href && (j = document.location.href, _this16.render());
              }), W && this.privacyButtonObserver.observe(W, {
                childList: !0,
                subtree: !0
              }), H = (q = t.getPrivacyButtonTheme()).position, K = q.direction, G = q.icon, (X = q.pages).length > 0 && !X.some(function (e) {
                return (0, _.matchesPage)(e);
              })) ? [2] : [2, {
                privacyButtonTheme: q,
                templateData: {
                  view: {
                    type: "privacyButton",
                    privacyButton: !0
                  },
                  button: {
                    ariaLabel: t.i18n.base.privacyButton,
                    testId: g.CMP_PRIVACY_BUTTON,
                    icon: G
                  },
                  theme: {
                    screenType: r,
                    position: H,
                    direction: K,
                    useOverlay: !1,
                    zoomLevel: n
                  }
                },
                cssProps: this.getPrivacyButtonCssProps(q)
              }];
              if (this.isLayerView()) {
                if (ee = t.getCmpTheme(this.isFirstLayerView() ? "first" : "second"), this.currentTabView || "second" !== this.currentView || (this.currentTabView = "first" === ee.layout.defaultTab ? "first" : "second"), er = (et = t.i18n).firstLayer, en = et.secondLayer, !(ei = "first" === this.currentView ? er : en)) throw Error("No layer i18n data");
                return eo = "desktop" !== r && ei.privacy.shortMobileDescription || ei.privacy.shortDescription || "", es = t.getIsConsentRequired(), ea = ee.features.denyConsentsOnClose || "second" === this.currentView || !es, el = ee.features.denyConsentsOnClose && "first" === this.currentView ? "deny" : "second" === this.currentView && es ? "less" : "close", ec = ea && {
                  actionType: el,
                  name: et.base.ariaLabels.closeButton
                }, eu = et.base.poweredBy.links.uc, ep = null != (ed = null == (Z = this.cmpController.getLanguage().replace(/_/g, "-").split("-")[0]) ? void 0 : Z.toLowerCase()) ? ed : "", (eh = null != eu ? eu : "") && S.POWERED_BY_UC_SUPPORTED_NON_EN_LANGS.includes(ep) && (ef = eh.split("/")).length >= 3 && (ef.splice(3, 0, ep), eh = ef.join("/")), em = eh ? "".concat(eh).concat(eh.includes("?") ? "&" : "?", "utm_source=banner_uc&utm_medium=referral&utm_content=v3") : eh, eg = (0, a._)((0, s._)({}, et.base.poweredBy), {
                  links: (0, a._)((0, s._)({}, et.base.poweredBy.links), {
                    uc: em
                  })
                }), ev = (0, w.checkBrowserSupport)(), (ey = (0, s._)((0, a._)((0, s._)({
                  view: {
                    cmp: !0,
                    first: this.isFirstLayerView(),
                    second: this.isSecondLayerView(),
                    type: "cmp ".concat(this.currentView),
                    gdpr: "GDPR" === t.setting.type,
                    ccpa: "US" === t.setting.type,
                    tcf: "TCF" === t.setting.type
                  },
                  theme: (0, s._)({
                    direction: ee.layout.direction,
                    position: ee.layout.position,
                    useOverlay: ee.features.overlay.enabled,
                    screenType: r,
                    isMobile: "desktop" !== r,
                    isCbDerivative: this.isCbDerivative,
                    isWix: "wix" === t.ui.theme,
                    isFlat: "FLAT" === ee.layout.template,
                    isFloat: "FLOAT" === ee.layout.template,
                    isCmsSmallBanner: this.isCmsSmallBanner,
                    isWidgetBanner: this.isWidgetBanner,
                    isBanner: "bottom" === ee.layout.position,
                    isPoweredByLogoCb: "CB" === t.ui.poweredByLogo && et.base.poweredBy.isEnabled,
                    isPoweredByLogoUc: "UC" === t.ui.poweredByLogo && et.base.poweredBy.isEnabled,
                    isWixBottomBannerShield: this.isWixBottomBannerVariant(ee) && "UC" === t.ui.poweredByLogo && et.base.poweredBy.isEnabled,
                    linksInFooter: "bottom" === ee.layout.position && "desktop" === r,
                    linksInMain: "bottom" !== ee.layout.position || "desktop" !== r,
                    zoomLevel: n,
                    actionsPosition: "shopify" !== this.cmpController.ui.theme && ee.elements.logo && this.isFirstLayerView() && "right" === ee.elements.logo.position ? "left" : "right"
                  }, this.isSecondLayerView() && {
                    hideServicesToggles: ee.visibility.hideServicesToggles
                  })
                }, ee.visibility.showAcceptAndCloseText && ei.buttons.cnil && {
                  cnil: {
                    label: ei.buttons.cnil
                  }
                }, ec && {
                  closeButton: ec
                }, !ev.supported && {
                  browserWarning: {
                    message: et.base.unsupportedBrowserMessage
                  }
                }, function () {
                  var e = ee.elements.logo;
                  if ("wix" === t.ui.theme) {
                    var r = t.getCmpTheme("first").elements.logo,
                      n = (null == e ? void 0 : e.url) || (null == r ? void 0 : r.url);
                    return n ? {
                      logo: (0, a._)((0, s._)({}, e || r), {
                        url: n,
                        position: "left"
                      })
                    } : {};
                  }
                  return (null == e ? void 0 : e.url) ? {
                    logo: (0, a._)((0, s._)({}, e), {
                      position: _this16.isFirstLayerView() ? e.position : "left"
                    })
                  } : {};
                }()), {
                  poweredBy: eg,
                  privacy: (0, s._)({
                    title: ei.privacy.title,
                    details: et.base.details,
                    text: "".concat(ei.privacy.description)
                  }, eo && {
                    summary: eo,
                    more: et.base.showMore,
                    less: et.base.readLess
                  }, ei.privacy.thirdPartyText && {
                    thirdPartyText: ei.privacy.thirdPartyText
                  }),
                  showMoreLabel: et.base.showMore,
                  buttons: ee.elements.buttons.order.map(function (e, t) {
                    return e.map(function (e) {
                      return {
                        isFirst: 0 === t,
                        type: e,
                        actionType: e,
                        label: ei.buttons[e],
                        ariaLabel: ei.buttons[e],
                        testId: e,
                        id: e
                      };
                    });
                  }),
                  links: Object.entries(et.base.links).map(function (e) {
                    var t,
                      r = (0, l._)(e, 2),
                      n = r[0],
                      i = r[1];
                    if (i && "integrations" !== n) return (0, s._)({
                      id: n,
                      action: "link",
                      actionType: n,
                      openNewTab: i.url && !(null == (t = i.url.match(/^#onUc(.*)Click$/)) ? void 0 : t.length)
                    }, i);
                  }).filter(function (e) {
                    return e;
                  }).sort(function (e, t) {
                    return e.order - t.order;
                  }),
                  linksNavAriaLabel: ("bottom" === ee.layout.position && "desktop" === r ? et.base.ariaLabels.usercentricsCMPButtons : et.base.ariaLabels.usercentricsCMPHeader) || void 0
                }), !ee.visibility.hideLanguageSwitch && {
                  language: {
                    languages: this.getLanguages(t.languages.languages, this.cmpController.getLanguage()).map(function (e, t) {
                      return (0, a._)((0, s._)({}, e), {
                        index: t + 1
                      });
                    }),
                    ariaLabel: et.base.ariaLabels.languageSelector
                  }
                })).hasActions = !1 !== ec || (null == (Q = ey.language) ? void 0 : Q.languages.length) > 0, this.isFirstLayerView() && et.base.links.integrations && et.base.links.integrations.forEach(function (e, t) {
                  ey.links.push({
                    id: "".concat(u.A11Y_CMP_INTEGRATION_LINK, "-").concat(t),
                    label: e.label,
                    url: e.url,
                    action: "link",
                    actionType: e.type
                  });
                }), this.isSecondLayerView() && "tv" === this.cmpController.ui.theme && (ey = (0, a._)((0, s._)({}, ey), {
                  saveButtonLabel: (null == (J = et.secondLayer) ? void 0 : J.buttons.save) || "Save Settings"
                })), t.tcf && this.isFirstLayerView() && (0, h.isTcfCmpController)(t) && ey.links.push({
                  label: t.i18n.tcf.vendor.list,
                  ariaLabel: t.i18n.tcf.vendor.list,
                  id: u.A11Y_CMP_VENDORLIST,
                  action: "consent",
                  actionType: "more-vendors"
                }), ei.buttons.more && ee.visibility.showMoreInformationLink && ("BAR" === ee.layout.template || "bottom" === ee.layout.position && "cb" === t.ui.theme ? (ey.moreLink = {
                  id: u.A11Y_CMP_MORE_LINK,
                  label: et.base.details,
                  ariaLabel: et.base.details,
                  action: "consent",
                  actionType: "more"
                }, ey.showTogglesSection = !0) : ey.links.push({
                  id: u.A11Y_CMP_MORE_LINK,
                  label: ei.buttons.more,
                  ariaLabel: ei.buttons.more,
                  action: "consent",
                  actionType: "more"
                })), ey.links.length > 0 && (ey.links[ey.links.length - 1] = (0, a._)((0, s._)({}, ey.links[ey.links.length - 1]), {
                  isLast: !0
                })), [2, {
                  cmpTheme: ee,
                  templateData: ey,
                  cssProps: this.getCmpCssProps(ee)
                }];
              }
              return [2];
            });
          }).call(this);
        }
      }, {
        key: "disconnectObservers",
        value: function disconnectObservers() {
          this.privacyButtonObserver && (this.privacyButtonObserver.disconnect(), this.privacyButtonObserver = void 0);
        }
      }, {
        key: "getDialogShellStyle",
        value: function getDialogShellStyle(e) {
          return e ? "" : "#uc-screen-reader-shell {\n            pointer-events: none;\n          }\n          #uc-screen-reader-shell > * {\n            pointer-events: auto;\n          }";
        }
      }, {
        key: "getPrivacyButtonCssProps",
        value: function getPrivacyButtonCssProps(e) {
          return "\n      .privacyButton {\n        --color-bg: ".concat(e.backgroundColor, ";\n        --color-icon: ").concat(e.icon.color, ";\n        --button-size: ").concat(e.size, "px;\n        --icon-url: url(").concat(e.icon.url, ");\n      }\n    ");
        }
      }, {
        key: "getAgeVerificationCssProps",
        value: function getAgeVerificationCssProps(e) {
          if (!e) return "";
          var t,
            r = (null != (t = e.backgroundOpacity) ? t : 70) / 100,
            n = e.backgroundColor || "#0063AB",
            i = this.hexToRgb(n),
            o = "rgba(".concat(i, ", ").concat(r, ")");
          return "\n      .av-wall {\n        --color-av-background-rgba: ".concat(o, ";\n        --color-av-text: ").concat(e.textColor || "#ffffff", ";\n        --color-av-above-age-background: ").concat(e.aboveAgeBackgroundColor || "#ffffff", ";\n        --color-av-above-age-text: ").concat(e.aboveAgeTextColor || "#000000", ";\n        --color-av-under-age-background: ").concat(e.underAgeBackgroundColor || "#ffffff", ";\n        --color-av-under-age-text: ").concat(e.underAgeTextColor || "#000000", ";\n      }\n    ");
        }
      }, {
        key: "getLogoPositionForWix",
        value: function getLogoPositionForWix(e) {
          var t;
          return this.isFirstLayerView() ? "FLAT" === e.layout.template ? "right" : (null == (t = e.elements.logo) ? void 0 : t.position) || "right" : "left";
        }
      }, {
        key: "hexToRgb",
        value: function hexToRgb(e) {
          3 === (e = e.replace("#", "")).length && (e = e.split("").map(function (e) {
            return e + e;
          }).join(""));
          var t = parseInt(e, 16);
          return "".concat(t >> 16 & 255, ", ").concat(t >> 8 & 255, ", ").concat(255 & t);
        }
      }, {
        key: "pxToRem",
        value: function pxToRem(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 16,
            r = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--uc-typography-scale").trim()) || 1;
          return "".concat(r * e / t, "rem");
        }
      }, {
        key: "getCmpCssProps",
        value: function getCmpCssProps(e) {
          var t,
            r,
            n,
            i,
            o,
            s,
            a,
            l,
            c,
            u,
            d = e.layout,
            p = e.colors,
            h = e.features,
            f = e.elements,
            m = e.typography,
            g = p.light,
            v = p.dark,
            y = d.spacing,
            b = h.themeMode.enabled && h.themeMode.autoDetect && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? v : g;
          return "\n        .overlay {\n          --color-cmp-overlay: ".concat(b.cmp.overlay, ";\n          --feature-overlay-opacity: ").concat(h.overlay.opacity, ";\n        }\n        .cmp, .modal-wrapper, .privacyNotice {\n          direction: ").concat(d.direction, ";\n          --color-main-primary: ").concat(b.main.primary, ";\n          --color-main-text: ").concat(b.main.text, ";\n          --color-links-anchor: ").concat(b.links.anchor, ";\n          --color-cmp-background: ").concat(b.cmp.background, ";\n          --color-cmp-background-rgb: ").concat(this.hexToRgb(b.cmp.background), ";\n          --color-tabs-container-background: ").concat(b.tabs.containerBackground, ";\n          --color-tabs-tab-active: ").concat(b.tabs.tabActive, ";\n          --color-tabs-tab-inactive: ").concat(b.tabs.tabInactive, ";\n          --color-main-border: ").concat(b.main.border, ";\n          --color-cookiebot-logo: ").concat("light" === (0, A.lightOrDark)(b.cmp.background) ? "#141414" : "#FFFFFF", ";\n          --color-cookiebot-powered-by: ").concat("light" === (0, A.lightOrDark)(b.cmp.background) ? "#666666" : "#FFFFFF", ";\n          --color-wix-uc-logo: ").concat("light" === (0, A.lightOrDark)(b.cmp.background) ? "#141414" : "#FFFFFF", ";\n          --color-focus: ").concat("light" === (0, A.lightOrDark)(b.cmp.background) ? "#141414" : "#FFFFFF", ";\n          --color-cmp-scrollbar-thumb: ").concat(b.cmp.scrollbarThumb, ";\n          --color-buttons-deny-background: ").concat((null == (t = b.buttons.deny) ? void 0 : t.background) || b.buttons.default.background, ";\n          --color-buttons-deny-text: ").concat((null == (r = b.buttons.deny) ? void 0 : r.text) || b.buttons.default.text, ";\n          --color-buttons-accept-background: ").concat((null == (n = b.buttons.accept) ? void 0 : n.background) || b.buttons.primary.background, ";\n          --color-buttons-accept-text: ").concat((null == (i = b.buttons.accept) ? void 0 : i.text) || b.buttons.primary.text, ";\n          --color-buttons-save-background: ").concat((null == (o = b.buttons.save) ? void 0 : o.background) || b.buttons.default.background, ";\n          --color-buttons-save-text: ").concat((null == (s = b.buttons.save) ? void 0 : s.text) || b.buttons.default.text, ";\n          --color-buttons-more-background: ").concat((null == (a = b.buttons.more) ? void 0 : a.background) || b.buttons.default.background, ";\n          --color-buttons-more-text: ").concat((null == (l = b.buttons.more) ? void 0 : l.text) || b.buttons.default.text, ";\n          --color-buttons-ok-background: ").concat((null == (c = b.buttons.ok) ? void 0 : c.background) || b.buttons.primary.background, ";\n          --color-buttons-ok-text: ").concat((null == (u = b.buttons.ok) ? void 0 : u.text) || b.buttons.primary.text, ";\n          --color-toggle-background-active: ").concat(b.toggle.background.active, ";\n          --color-toggle-handle-active: ").concat(b.toggle.handle.active, ";\n          --color-toggle-background-inactive: ").concat(b.toggle.background.inactive, ";\n          --color-toggle-handle-inactive: ").concat(b.toggle.handle.inactive, ";\n          --color-toggle-background-disabled: ").concat(b.toggle.background.disabled, ";\n          --color-toggle-handle-disabled: ").concat(b.toggle.handle.disabled, ";\n          --spacing-xxs: ").concat(y.xxs, ";\n          --spacing-xs: ").concat(y.xs, ";\n          --spacing-sm: ").concat(y.sm, ";\n          --spacing-md: ").concat(y.md, ";\n          --spacing-lg: ").concat(y.lg, ";\n          --spacing-xl: ").concat(y.xl, ";\n          --spacing-xxl: ").concat(y.xxl, ";\n          --spacing-xxxl: ").concat(y.xxxl, ";\n          --spacing-xxxxl: ").concat(y.xxxxl, ";\n          --layout-border-radius: ").concat(d.borderRadius, ";\n          --layout-border-width: ").concat(this.isWix() || this.isShopify() ? d.borderWidth : "0px", ";\n          --layout-border-color: ").concat(this.isWix() || this.isShopify() ? d.borderColor : "", ";\n          --color-toggle-border: ").concat(this.isWix() || this.isShopify() ? "transparent" : "white", ";\n          --element-buttons-border-radius: ").concat(f.buttons.borderRadius, ";\n          --typography-font: ").concat(m.font || "Helvetica", ",Arial,sans-serif;\n          --typography-size: ").concat(m.fixedSize ? "".concat(m.size, "px") : this.pxToRem(m.size), ";\n          --typography-size-title: 1.125em;\n          --typography-size-text: 1em;\n          --typography-size-label: 0.75em;\n          --typography-size-link: 0.875em;\n          --typography-size-cb: 1.071em;\n          --typography-size-cop-card-title: 1.2em;\n        }\n    ");
        }
      }, {
        key: "isWix",
        value: function isWix() {
          return "wix" === this.cmpController.ui.theme;
        }
      }, {
        key: "isShopify",
        value: function isShopify() {
          return "shopify" === this.cmpController.ui.theme;
        }
      }, {
        key: "isWixBottomBannerVariant",
        value: function isWixBottomBannerVariant(e) {
          return this.isWix() && this.isFirstLayerView() && ("desktop" === this.currentScreenType || "tablet" === this.currentScreenType) && "bottom" === e.layout.position && "FLOAT" !== e.layout.template;
        }
      }, {
        key: "getPosition",
        value: function getPosition(e, t, r) {
          return "float" === r && ("left" === e || "right" === e) && "desktop" !== t ? "bottom" : e;
        }
      }, {
        key: "isCb",
        value: function isCb(e) {
          return "cb" === this.cmpController.ui.theme || "uc" === this.cmpController.ui.theme && e && ("BAR" === e.layout.template || "DIALOG" === e.layout.template);
        }
      }, {
        key: "isIos26InAppBrowser",
        value: function isIos26InAppBrowser(e) {
          var t,
            r = (0, C.detectIosEnvironment)(),
            n = "in-app-browser" === r.type,
            i = ["mobile", "xs"].includes(e),
            o = r.userAgent.includes("Version/26") || (null == (t = r.iosVersion) ? void 0 : t.split(".")[0]) === "26";
          return i && n && o;
        }
      }, {
        key: "isCustomCategory",
        value: function isCustomCategory(e) {
          return e.startsWith("customcategory-");
        }
      }, {
        key: "getHtml",
        value: function getHtml(t) {
          return (0, i._)(function () {
            var r, n, i, s, a, l, u, d, p, h, m, g, y, b, w, C, E, A, _, L, S, k, x, I, N, M, O, P, D, V, B, R, F, $, U, z, Y, j, W, q, H, K, G, X, Z, Q, J, ee, et, er, en, ei, eo;
            return (0, c._)(this, function (c) {
              switch (c.label) {
                case 0:
                  if ("none" !== this.currentView) return [3, 5];
                  if (!(0, T.isGpcToastVisible)(this.cmpController)) return [3, 4];
                  if (this.toastifyStyle) return [3, 3];
                  return [4, o("7kiSb")];
                case 1:
                  return l = c.sent().getToastifyStyle, u = this, [4, l()];
                case 2:
                  u.toastifyStyle = c.sent(), c.label = 3;
                case 3:
                  return [2, "<style".concat((0, f.getNonceAttribute)(), ">").concat(this.toastifyStyle, "</style>")];
                case 4:
                  return [2, ""];
                case 5:
                  return [4, this.getData()];
                case 6:
                  if (!(d = c.sent())) return [2, ""];
                  if (p = d.cmpTheme, h = d.templateData, m = d.cssProps, g = h.view, y = h.theme, b = this, w = b.cmpController, C = b.style, E = b.template, A = b.partials, !(!this.wixStyle && this.isWix())) return [3, 9];
                  return [4, o("dSHJo")];
                case 7:
                  return _ = c.sent().getWixStyles, L = this, [4, _()];
                case 8:
                  L.wixStyle = c.sent(), c.label = 9;
                case 9:
                  if (!(!this.cbStyle && this.isCb(p))) return [3, 12];
                  return [4, o("deIXJ")];
                case 10:
                  return S = c.sent().geCbStyles, k = this, [4, S()];
                case 11:
                  k.cbStyle = c.sent(), c.label = 12;
                case 12:
                  if (this.secondLayerStyle) return [3, 15];
                  return [4, o("jI8M2")];
                case 13:
                  return x = c.sent().getSecondLayerStyles, I = this, [4, x()];
                case 14:
                  I.secondLayerStyle = c.sent(), c.label = 15;
                case 15:
                  if (!(!this.privacyButtonStyle && this.isPrivacyButtonView())) return [3, 18];
                  return [4, o("8ByCj")];
                case 16:
                  return N = c.sent().getPrivacyButtonStyles, M = this, [4, N()];
                case 17:
                  M.privacyButtonStyle = c.sent(), c.label = 18;
                case 18:
                  if (!(!this.privacyNoticeStyle && this.isPrivacyNoticeView())) return [3, 21];
                  return [4, o("crrMY")];
                case 19:
                  return O = c.sent().getPrivacyNoticeStyles, P = this, [4, O()];
                case 20:
                  P.privacyNoticeStyle = c.sent(), c.label = 21;
                case 21:
                  return [4, o("7kiSb")];
                case 22:
                  return D = c.sent().getToastifyStyle, V = this, [4, D()];
                case 23:
                  if (V.toastifyStyle = c.sent(), B = "\n        <style".concat((0, f.getNonceAttribute)(), ">\n          ").concat(m, "\n          ").concat(C, "\n          ").concat(this.secondLayerStyle, "\n          ").concat(this.privacyButtonStyle, "\n          ").concat(this.toastifyStyle, "\n          ").concat(this.privacyNoticeStyle, "\n          ").concat(this.wixStyle, "\n          ").concat(this.cbStyle, "\n          ").concat((null == (r = w.theme.custom) ? void 0 : r.css) || "", "\n          ").concat(this.useScreenReaderShell ? this.getDialogShellStyle(y.useOverlay) : "", "\n        </style>\n      "), null == t ? void 0 : t.cssOnly) return [2, B];
                  return R = (null == p ? void 0 : p.layout.template) ? p.layout.template.toLowerCase() : "", F = w.shouldRenderWatermark(), $ = w.setting.type.toLowerCase(), U = "cmp-wrapper ".concat(g.type).concat(this.isWix() ? " wix" : "").concat(this.isShopify() ? " shopify" : "", " ").concat(this.isCb(p) ? " cb" : "", " ").concat(this.getPosition(y.position, y.screenType, R), " ").concat(y.screenType, " ").concat(y.zoomLevel, " ").concat(R, " ").concat(F ? "uc-draft-watermark" : "", " ").concat(this.isIos26InAppBrowser(y.screenType) ? "ios-26-in-app-browser" : ""), z = "tv" === this.cmpController.ui.theme && this.isPrivacyButtonView() ? "tv-privacy-button-hidden" : "", Y = "".concat(g.type, " ").concat(this.getPosition(y.position, y.screenType, R), " ").concat(y.screenType, " ").concat(y.direction, " ").concat($, " ").concat(this.isPrivacyButtonView() && this.isIos26InAppBrowser(y.screenType) ? "ios-26-in-app-browser" : "", " ").concat(z), W = (j = w.i18n).firstLayer, q = j.secondLayer, H = "first" === this.currentView ? W : q, K = this.isPrivacyNoticeView(), G = (null == (n = w.ui.informationOnlyLayer) ? void 0 : n.buttonMoreInfoLabel) || (null == (i = w.ui.informationOnlyLayer) ? void 0 : i.buttonAcceptAllLabel) || (null == W || null == (s = W.privacy) ? void 0 : s.title) || "", X = !!(null == (a = h.view) ? void 0 : a.ageVerification), Z = this.isLayerView(), J = this.getDialogAriaAttrs(Z, {
                    isAgeVerificationView: X,
                    isPrivacyNoticeView: K,
                    privacyNoticeAriaLabel: G,
                    layerTitle: null != (Q = null == H ? void 0 : H.privacy.title) ? Q : ""
                  }), er = (ee = this.useScreenReaderShell) ? this.getShellAttributes(Z, y.useOverlay, null != (et = w.i18n.base.ariaLabels.usercentricsCMPUI) ? et : "") : "", en = this.getDialogRoleAttributes(Z, y.useOverlay), eo = "\n      ".concat(ee ? "<div id=\"uc-screen-reader-shell\" ".concat(er, ">") : "", "\n      ").concat(y.useOverlay ? '<div id="uc-overlay" class="overlay"></div>' : "", "\n      ").concat(Z ? "<div class=\"".concat(U, "\">") : "", "\n        <div\n          id=\"uc-main-dialog\"\n          class=\"").concat(Y, "\"\n          ").concat(en, "\n          ").concat(this.isPrivacyButtonView() ? "aria-label=\"".concat(null != (ei = null == H ? void 0 : H.privacy.title) ? ei : "", "\"") : "", "\n          ").concat(J, "\n          ").concat(Z && !ee ? 'tabindex="0"' : "", "\n        >\n          ").concat(E, "\n        </div>\n      ").concat(Z ? "</div>" : "", "\n      ").concat(ee ? "</div>" : "", "\n    "), [2, "\n      ".concat(B, "\n      ").concat(e(v).render(eo, h, A), "\n    ")];
              }
            });
          }).call(this);
        }
      }, {
        key: "getDialogAriaAttrs",
        value: function getDialogAriaAttrs(e, t) {
          var r = t.isAgeVerificationView,
            n = t.isPrivacyNoticeView,
            i = t.privacyNoticeAriaLabel,
            o = t.layerTitle;
          return e ? r ? 'aria-labelledby="uc-av-title" aria-describedby="uc-av-description"' : n ? "aria-label=\"".concat(i, "\"") : this.isCmsSmallBanner ? "aria-label=\"".concat(o, "\"") : 'aria-labelledby="uc-privacy-title" aria-describedby="uc-privacy-description"' : "";
        }
      }, {
        key: "getShellAttributes",
        value: function getShellAttributes(e, t, r) {
          return e && !t ? "tabindex=\"0\" role=\"region\" aria-label=\"".concat(r, "\"") : "tabindex=\"0\" role=\"group\" aria-label=\"".concat(r, "\"");
        }
      }, {
        key: "getDialogRoleAttributes",
        value: function getDialogRoleAttributes(e, t) {
          return e ? t ? 'role="dialog" aria-modal="true"' : 'role="dialog"' : "";
        }
      }, {
        key: "render",
        value: function render(e) {
          return (0, i._)(function () {
            return (0, c._)(this, function (e) {
              return [2];
            });
          })();
        }
      }]);
    }();
    S.POWERED_BY_UC_SUPPORTED_NON_EN_LANGS = ["de", "fr", "es", "it", "pt"], S.ALLOWED_TABS = ["first", "second", "third", "fourth", "vendors", "services", "purposes", "categories"];
  }), s("7u4IU", function (e, r) {
    t(e.exports, "A11Y_CMP_MORE_LINK", function () {
      return n;
    }), t(e.exports, "A11Y_CMP_INTEGRATION_LINK", function () {
      return i;
    }), t(e.exports, "A11Y_CMP_VENDORLIST", function () {
      return o;
    });
    var n = "uc-more-link",
      i = "uc-integration-link",
      o = "uc-vendorlist-button";
  }), s("8DtZC", function (e, r) {
    t(e.exports, "AGE_VERIFICATION_METHOD", function () {
      return n;
    });
    var n = {
      YES_NO: "yesno",
      DATE_OF_BIRTH: "dob"
    };
  }), s("5e7TB", function (e, r) {
    t(e.exports, "usercentricsShield", function () {
      return n;
    }), t(e.exports, "usercentricsShieldWhite", function () {
      return i;
    });
    var n = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNjYgMjQxLjY2Ij4KICA8ZyBkYXRhLW5hbWU9IkRlc2lnbiI+CiAgICA8cGF0aCBkPSJNMCAwdjEyMC44M2MwIDY2LjYzIDU0LjIgMTIwLjgzIDEyMC44MyAxMjAuODNzMTIwLjgzLTU0LjIxIDEyMC44My0xMjAuODNWMEgwWm0yMDYuMjYgMTIwLjgyYzAgNDcuMS0zOC4zMiA4NS40Mi04NS40MyA4NS40MnMtODUuNDItMzguMzItODUuNDItODUuNDJWMzUuNGgxNzAuODV2ODUuNDJaIi8+CiAgICA8cGF0aCBkPSJNOTYuMTQgMTY0LjM1aDQxLjA5bC0uMDktLjE2IDQ3LjA0LTk5LjJoLTQwLjkzbC0yOC40MiA1OS45NC0xMy41NS0yMy44NEg2MC4zNmwzNS44NiA2My4xLS4wOC4xNnoiLz4KICA8L2c+Cjwvc3ZnPg==",
      i = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNjYgMjQxLjY2Ij4KICA8ZyBkYXRhLW5hbWU9IkRlc2lnbiIgZmlsbD0iI2ZmZmZmZiI+CiAgICA8cGF0aCBkPSJNMCAwdjEyMC44M2MwIDY2LjYzIDU0LjIgMTIwLjgzIDEyMC44MyAxMjAuODNzMTIwLjgzLTU0LjIxIDEyMC44My0xMjAuODNWMEgwWm0yMDYuMjYgMTIwLjgyYzAgNDcuMS0zOC4zMiA4NS40Mi04NS40MyA4NS40MnMtODUuNDItMzguMzItODUuNDItODUuNDJWMzUuNGgxNzAuODV2ODUuNDJaIi8+CiAgICA8cGF0aCBkPSJNOTYuMTQgMTY0LjM1aDQxLjA5bC0uMDktLjE2IDQ3LjA0LTk5LjJoLTQwLjkzbC0yOC40MiA1OS45NC0xMy41NS0yMy44NEg2MC4zNmwzNS44NiA2My4xLS4wOC4xNnoiLz4KICA8L2c+Cjwvc3ZnPgo=";
  }), s("d42QO", function (e, r) {
    t(e.exports, "default", function () {
      return K;
    });
    "use strict";
    var n = o("kTJf3"),
      i = o("7nwmn"),
      s = {
        selector: "",
        straightOnly: !1,
        straightOverlapThreshold: .5,
        distanceMode: !1,
        rememberSource: !1,
        disabled: !1,
        defaultElement: "",
        enterTo: "",
        leaveFor: null,
        restrict: "self-first",
        tabIndexIgnoreList: "a, input, select, textarea, button, iframe, [contentEditable=true]",
        navigableFilter: null
      },
      a = {},
      l = function l() {
        var e = Object.keys(window.UC_TV_KEYMAP).reduce(function (e, t) {
          return [].concat(_toConsumableArray(e), [window.UC_TV_KEYMAP[t]]);
        }, []);
        if (6 !== e.length) {
          var t = [];
          ["back", "down", "left", "ok", "right", "up"].forEach(function (e) {
            e in window.UC_TV_KEYMAP || t.push(e);
          }), t.length > 0 && console.error("window.UC_TV_KEYMAP missing the following keys \"".concat(t, "\", unexpected behaviour might occur"));
        }
        return e;
      };
    if (window.UC_TV_KEYMAP) {
      var c = l(),
        u = new Set(c).size === c.length;
      c.every(function (e) {
        return !Array.isArray(e);
      }) && (window.UC_TV_KEYMAP = {
        back: [window.UC_TV_KEYMAP.back],
        down: [window.UC_TV_KEYMAP.down],
        left: [window.UC_TV_KEYMAP.left],
        ok: [window.UC_TV_KEYMAP.ok],
        right: [window.UC_TV_KEYMAP.right],
        up: [window.UC_TV_KEYMAP.up]
      }, l()), u || console.error("window.UC_TV_KEYMAP key values must be unique, unexpected behaviour might occur"), a = {}, window.UC_TV_KEYMAP.left.forEach(function (e) {
        return a[e] = "left";
      }), window.UC_TV_KEYMAP.up.forEach(function (e) {
        return a[e] = "up";
      }), window.UC_TV_KEYMAP.right.forEach(function (e) {
        return a[e] = "right";
      }), window.UC_TV_KEYMAP.down.forEach(function (e) {
        return a[e] = "down";
      });
    } else a = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
    var d = {
        left: "right",
        up: "down",
        right: "left",
        down: "up"
      },
      p = 0,
      h = !1,
      f = !1,
      m = {},
      g = 0,
      v = "",
      y = "",
      b = !1,
      w = null,
      C = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || function (e) {
        var t = (this.parentNode || this.document).querySelectorAll(e);
        return [].slice.call(t).indexOf(this) >= 0;
      };
    function E(e) {
      var t = e.getBoundingClientRect(),
        r = {
          left: t.left,
          top: t.top,
          right: t.right,
          bottom: t.bottom,
          width: t.width,
          height: t.height
        };
      return r.element = e, r.center = {
        x: r.left + Math.floor(r.width / 2),
        y: r.top + Math.floor(r.height / 2)
      }, r.center.left = r.center.right = r.center.x, r.center.top = r.center.bottom = r.center.y, r;
    }
    function T(e, t, r) {
      for (var n = [[], [], [], [], [], [], [], [], []], i = 0; i < e.length; i++) {
        var o,
          s,
          a = e[i],
          l = a.center;
        o = l.x < t.left ? 0 : l.x <= t.right ? 1 : 2, n[s = 3 * (l.y < t.top ? 0 : l.y <= t.bottom ? 1 : 2) + o].push(a), -1 !== [0, 2, 6, 8].indexOf(s) && (a.left <= t.right - t.width * r && (2 === s ? n[1].push(a) : 8 === s && n[7].push(a)), a.right >= t.left + t.width * r && (0 === s ? n[1].push(a) : 6 === s && n[7].push(a)), a.top <= t.bottom - t.height * r && (6 === s ? n[3].push(a) : 8 === s && n[5].push(a)), a.bottom >= t.top + t.height * r && (0 === s ? n[3].push(a) : 2 === s && n[5].push(a)));
      }
      return n;
    }
    function A(e, t, r, n) {
      if (!e || !t || !r || !r.length) return null;
      for (var i = [], o = 0; o < r.length; o++) {
        var s = E(r[o]);
        s && i.push(s);
      }
      if (!i.length) return null;
      var a = E(e);
      if (!a) return null;
      var l = {
          nearPlumbLineIsBetter: function nearPlumbLineIsBetter(e) {
            var t;
            return (t = e.center.x < a.center.x ? a.center.x - e.right : e.left - a.center.x) < 0 ? 0 : t;
          },
          nearHorizonIsBetter: function nearHorizonIsBetter(e) {
            var t;
            return (t = e.center.y < a.center.y ? a.center.y - e.bottom : e.top - a.center.y) < 0 ? 0 : t;
          },
          nearTargetLeftIsBetter: function nearTargetLeftIsBetter(e) {
            var t;
            return (t = e.center.x < a.center.x ? a.left - e.right : e.left - a.left) < 0 ? 0 : t;
          },
          nearTargetTopIsBetter: function nearTargetTopIsBetter(e) {
            var t;
            return (t = e.center.y < a.center.y ? a.top - e.bottom : e.top - a.top) < 0 ? 0 : t;
          },
          topIsBetter: function topIsBetter(e) {
            return e.top;
          },
          bottomIsBetter: function bottomIsBetter(e) {
            return -1 * e.bottom;
          },
          leftIsBetter: function leftIsBetter(e) {
            return e.left;
          },
          rightIsBetter: function rightIsBetter(e) {
            return -1 * e.right;
          },
          nearDistanceIsBetter: function nearDistanceIsBetter(e) {
            var t, r;
            return r = e.center.y < a.center.y ? a.top - e.bottom : e.top - a.bottom, Math.sqrt((t = (t = e.center.x < a.center.x ? a.left - e.right : e.left - a.right) < 0 ? 0 : t) * t + (r = r < 0 ? 0 : r) * r);
          }
        },
        c = T(i, a, n.straightOverlapThreshold),
        u = T(c[4], a.center, n.straightOverlapThreshold);
      if (!0 === n.distanceMode) {
        var d,
          p,
          h = [],
          f = [];
        switch (t) {
          case "left":
            p = [0, 3, 6];
            break;
          case "right":
            p = [2, 5, 8];
            break;
          case "up":
            p = [0, 1, 2];
            break;
          case "down":
            p = [6, 7, 8];
        }
        p.forEach(function (e) {
          h = h.concat(u[e]), f = f.concat(c[e]);
        }), d = [{
          group: h,
          distance: [l.nearDistanceIsBetter]
        }, {
          group: f,
          distance: [l.nearDistanceIsBetter]
        }];
      } else switch (t) {
        case "left":
          d = [{
            group: u[0].concat(u[3]).concat(u[6]),
            distance: [l.nearPlumbLineIsBetter, l.topIsBetter]
          }, {
            group: c[3],
            distance: [l.nearPlumbLineIsBetter, l.topIsBetter]
          }, {
            group: c[0].concat(c[6]),
            distance: [l.nearHorizonIsBetter, l.rightIsBetter, l.nearTargetTopIsBetter]
          }];
          break;
        case "right":
          d = [{
            group: u[2].concat(u[5]).concat(u[8]),
            distance: [l.nearPlumbLineIsBetter, l.topIsBetter]
          }, {
            group: c[5],
            distance: [l.nearPlumbLineIsBetter, l.topIsBetter]
          }, {
            group: c[2].concat(c[8]),
            distance: [l.nearHorizonIsBetter, l.leftIsBetter, l.nearTargetTopIsBetter]
          }];
          break;
        case "up":
          d = [{
            group: u[0].concat(u[1]).concat(u[2]),
            distance: [l.nearHorizonIsBetter, l.leftIsBetter]
          }, {
            group: c[1],
            distance: [l.nearHorizonIsBetter, l.leftIsBetter]
          }, {
            group: c[0].concat(c[2]),
            distance: [l.nearPlumbLineIsBetter, l.bottomIsBetter, l.nearTargetLeftIsBetter]
          }];
          break;
        case "down":
          d = [{
            group: u[6].concat(u[7]).concat(u[8]),
            distance: [l.nearHorizonIsBetter, l.leftIsBetter]
          }, {
            group: c[7],
            distance: [l.nearHorizonIsBetter, l.leftIsBetter]
          }, {
            group: c[6].concat(c[8]),
            distance: [l.nearPlumbLineIsBetter, l.topIsBetter, l.nearTargetLeftIsBetter]
          }];
          break;
        default:
          return null;
      }
      n.straightOnly && d.pop();
      var m = function (e) {
        for (var t = null, r = 0; r < e.length; r++) if (e[r].group.length) {
          t = e[r];
          break;
        }
        if (!t) return null;
        var n = t.distance;
        return t.group.sort(function (e, t) {
          for (var r = 0; r < n.length; r++) {
            var i = n[r],
              o = i(e) - i(t);
            if (o) return o;
          }
          return 0;
        }), t.group;
      }(d);
      if (!m) return null;
      var g = null;
      if (n.rememberSource && n.previous && n.previous.destination === e && n.previous.reverse === t) {
        for (var v = 0; v < m.length; v++) if (m[v].element === n.previous.target) {
          g = m[v].element;
          break;
        }
      }
      return g || (g = m[0].element), g;
    }
    function _(e) {
      var t = [];
      try {
        e && ("string" == typeof e ? t = [].slice.call(w.querySelectorAll(e)) : "object" == _typeof(e) && e.length ? t = [].slice.call(e) : "object" == _typeof(e) && 1 === e.nodeType && (t = [e]));
      } catch (e) {
        console.error(e);
      }
      return t;
    }
    function L(e, t) {
      return "string" == typeof t ? C.call(e, t) : "object" == _typeof(t) && t.length ? t.indexOf(e) >= 0 : "object" == _typeof(t) && 1 === t.nodeType && e === t;
    }
    function S() {
      var e = w.activeElement;
      if (e && e !== document.body && e !== w) return e;
    }
    function k(e) {
      e = e || {};
      for (var t = 1; t < arguments.length; t++) if (arguments[t]) for (var r in arguments[t]) arguments[t].hasOwnProperty(r) && void 0 !== arguments[t][r] && (e[r] = arguments[t][r]);
      return e;
    }
    function x(e, t) {
      Array.isArray(t) || (t = [t]);
      for (var r, n = 0; n < t.length; n++) (r = e.indexOf(t[n])) >= 0 && e.splice(r, 1);
      return e;
    }
    function I(e, t, r) {
      if (!e || !t || !m[t] || m[t].disabled || e.offsetWidth <= 0 && e.offsetHeight <= 0 || e.hasAttribute("disabled") || r && !L(e, m[t].selector)) return !1;
      if ("function" == typeof m[t].navigableFilter) {
        if (!1 === m[t].navigableFilter(e, t)) return !1;
      } else if ("function" == typeof s.navigableFilter && !1 === s.navigableFilter(e, t)) return !1;
      return !0;
    }
    function N(e) {
      for (var t in m) if (!m[t].disabled && L(e, m[t].selector)) return t;
    }
    function M(e) {
      return _(m[e].selector).filter(function (t) {
        return I(t, e);
      });
    }
    function O(e) {
      var t = _(m[e].defaultElement).find(function (t) {
        return I(t, e, !0);
      });
      return t || null;
    }
    function P(e) {
      var t = m[e].lastFocusedElement;
      return I(t, e, !0) ? t : null;
    }
    function D(e, t, r, o) {
      arguments.length < 4 && (o = !0);
      var s = document.createEvent("CustomEvent");
      return s.initCustomEvent("sn:" + t, !0, o, (0, i._)((0, n._)({}, r), {
        elem: e
      })), window.dispatchEvent(s);
    }
    function V(e, t, r) {
      if (!e) return !1;
      var n = S(),
        i = function i() {
          n && n.blur(), e.focus(), B(e, t);
        };
      if (b) return i(), !0;
      if (b = !0, f) return i(), b = !1, !0;
      if (n) {
        var o = {
          nextElement: e,
          nextSectionId: t,
          direction: r,
          native: !1
        };
        if (!D(n, "willunfocus", o)) return b = !1, !1;
        n.blur(), D(n, "unfocused", o, !1);
      }
      var s = {
        previousElement: n,
        sectionId: t,
        direction: r,
        native: !1
      };
      return D(e, "willfocus", s) ? (e.focus(), D(e, "focused", s, !1), b = !1, B(e, t), !0) : (b = !1, !1);
    }
    function B(e, t) {
      t || (t = N(e)), t && (m[t].lastFocusedElement = e, y = t);
    }
    function R(e, t) {
      if ("@" == e.charAt(0)) if (1 == e.length) return F();else return F(e.substr(1));
      var r = _(e)[0];
      if (r) {
        var n = N(r);
        if (I(r, n)) return V(r, n, t);
      }
      return !1;
    }
    function F(e) {
      var t = [],
        r = function r(e) {
          e && 0 > t.indexOf(e) && m[e] && !m[e].disabled && t.push(e);
        };
      e ? r(e) : (r(v), r(y), Object.keys(m).map(r));
      for (var n = 0; n < t.length; n++) {
        var i,
          o = t[n];
        if (i = "last-focused" == m[o].enterTo ? P(o) || O(o) || M(o)[0] : O(o) || P(o) || M(o)[0]) return V(i, o);
      }
      return !1;
    }
    function $(e, t) {
      D(e, "navigatefailed", {
        direction: t
      }, !1);
    }
    function U(e, t) {
      if (m[e].leaveFor && void 0 !== m[e].leaveFor[t]) {
        var r = m[e].leaveFor[t];
        if ("string" == typeof r) return "" === r ? null : R(r, t);
        var n = N(r);
        if (I(r, n)) return V(r, n, t);
      }
      return !1;
    }
    function z(e, t, r) {
      var n = t.getAttribute("data-sn-" + e);
      if ("string" == typeof n) return "" !== n && !!R(n, e) || ($(t, e), !1);
      var i = {},
        o = [];
      for (var a in m) i[a] = M(a), o = o.concat(i[a]);
      var l = k({}, s, m[r]);
      if ("self-only" == l.restrict || "self-first" == l.restrict) {
        var c = i[r];
        (p = A(t, e, x(c, t), l)) || "self-first" != l.restrict || (p = A(t, e, x(o, c), l));
      } else p = A(t, e, x(o, t), l);
      if (p) {
        m[r].previous = {
          target: t,
          destination: p,
          reverse: d[e]
        };
        var u = N(p);
        if (r != u) {
          var p,
            h,
            f = U(r, e);
          if (f) return !0;
          if (null === f) return $(t, e), !1;
          switch (m[u].enterTo) {
            case "last-focused":
              h = P(u) || O(u);
              break;
            case "default-element":
              h = O(u);
          }
          h && (p = h);
        }
        return V(p, u, e);
      }
      return !!U(r, e) || ($(t, e), !1);
    }
    function Y(e) {
      if (g && !f && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        var t,
          r = function r() {
            return e.preventDefault(), e.stopPropagation(), !1;
          },
          n = a[e.keyCode];
        if (!n) {
          var i = [13];
          return (window.UC_TV_KEYMAP && (i = window.UC_TV_KEYMAP.ok), i.includes(e.keyCode) && (t = S()) && N(t) && !D(t, "enter-down")) ? r() : void 0;
        }
        if (!(t = S()) && (y && (t = P(y)), !t)) return F(), r();
        var o = N(t);
        if (o) return D(t, "willmove", {
          direction: n,
          sectionId: o,
          cause: "keydown"
        }) && z(n, t, o), r();
      }
    }
    function j(e) {
      if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        var t = [13];
        if (window.UC_TV_KEYMAP && (t = window.UC_TV_KEYMAP.ok), !f && g && t.includes(e.keyCode)) {
          var r = S();
          r && N(r) && !D(r, "enter-up") && (e.preventDefault(), e.stopPropagation());
        }
      }
    }
    function W(e) {
      var t = e.target;
      if (t !== window && t !== document && g && !b) {
        var r = N(t);
        if (r) {
          if (f) return void B(t, r);
          var n = {
            sectionId: r,
            native: !0
          };
          D(t, "willfocus", n) ? (D(t, "focused", n, !1), B(t, r)) : (b = !0, t.blur(), b = !1);
        }
      }
    }
    function q(e) {
      var t = e.target;
      if (t !== window && t !== document && !f && g && !b && N(t)) {
        var r = {
          native: !0
        };
        D(t, "willunfocus", r) ? D(t, "unfocused", r, !1) : (b = !0, setTimeout(function () {
          t.focus(), b = !1;
        }));
      }
    }
    var H = {
        init: function init() {
          var e;
          h || (window.addEventListener("keydown", Y), window.addEventListener("keyup", j), window.addEventListener("focus", W, !0), window.addEventListener("blur", q, !0), h = !0), w = null == (e = document.getElementById("usercentrics-cmp-ui")) ? void 0 : e.shadowRoot;
        },
        uninit: function uninit() {
          window.removeEventListener("blur", q, !0), window.removeEventListener("focus", W, !0), window.removeEventListener("keyup", j), window.removeEventListener("keydown", Y), H.clear(), p = 0, h = !1;
        },
        clear: function clear() {
          m = {}, g = 0, v = "", y = "", b = !1;
        },
        set: function set() {
          var e, t;
          if ("object" == _typeof(arguments[0])) t = arguments[0];else if ("string" != typeof arguments[0] || "object" != _typeof(arguments[1])) return;else if (e = arguments[0], t = arguments[1], !m[e]) throw Error('Section "' + e + "\" doesn't exist!");
          for (var r in t) void 0 !== s[r] && (e ? m[e][r] = t[r] : void 0 !== t[r] && (s[r] = t[r]));
          e && (m[e] = k({}, m[e]));
        },
        add: function add() {
          var e,
            t = {};
          if ("object" == _typeof(arguments[0]) ? t = arguments[0] : "string" == typeof arguments[0] && "object" == _typeof(arguments[1]) && (e = arguments[0], t = arguments[1]), e || (e = "string" == typeof t.id ? t.id : function () {
            for (var e; m[e = "section-" + String(++p)];);
            return e;
          }()), m[e]) throw Error('Section "' + e + '" has already existed!');
          return m[e] = {}, g++, H.set(e, t), e;
        },
        remove: function remove(e) {
          if (!e || "string" != typeof e) throw Error('Please assign the "sectionId"!');
          return !!m[e] && (m[e] = void 0, m = k({}, m), g--, y === e && (y = ""), !0);
        },
        disable: function disable(e) {
          return !!m[e] && (m[e].disabled = !0, !0);
        },
        enable: function enable(e) {
          return !!m[e] && (m[e].disabled = !1, !0);
        },
        pause: function pause() {
          f = !0;
        },
        resume: function resume() {
          f = !1;
        },
        focus: function focus(e, t) {
          var r = !1;
          void 0 === t && "boolean" == typeof e && (t = e, e = void 0);
          var n = !f && t;
          if (n && H.pause(), e) {
            if ("string" == typeof e) r = m[e] ? F(e) : R(e);else {
              var i = N(e);
              I(e, i) && (r = V(e, i));
            }
          } else r = F();
          return n && H.resume(), r;
        },
        move: function move(e, t) {
          if (!d[e = e.toLowerCase()]) return !1;
          var r = t ? _(t)[0] : S();
          if (!r) return !1;
          var n = N(r);
          return !!n && !!D(r, "willmove", {
            direction: e,
            sectionId: n,
            cause: "api"
          }) && z(e, r, n);
        },
        makeFocusable: function makeFocusable(e) {
          var t = function t(e) {
            var t = void 0 !== e.tabIndexIgnoreList ? e.tabIndexIgnoreList : s.tabIndexIgnoreList;
            _(e.selector).forEach(function (e) {
              L(e, t) || e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1");
            });
          };
          if (e) {
            if (m[e]) t(m[e]);else throw Error('Section "' + e + "\" doesn't exist!");
          } else for (var r in m) t(m[r]);
        },
        getCurrentFocusedElement: function getCurrentFocusedElement() {
          var e = w.activeElement;
          if (e && e !== document.body && e !== w) return e;
        },
        setDefaultSection: function setDefaultSection(e) {
          if (e) {
            if (m[e]) v = e;else throw Error('Section "' + e + "\" doesn't exist!");
          } else v = "";
        }
      },
      K = H;
  }), s("ekaCU", function (e, t) {
    var r, n;
    r = e.exports, n = function n(e) {
      var _t = function t(e) {
        return new _t.lib.init(e);
      };
      function r(e, t) {
        return t.offset[e] ? isNaN(t.offset[e]) ? t.offset[e] : t.offset[e] + "px" : "0px";
      }
      function n(e, t) {
        if (e && "string" == typeof t && e.className && e.className.trim().split(/\s+/gi).indexOf(t) > -1) return !0;
        return !1;
      }
      return _t.defaults = {
        oldestFirst: !0,
        text: "Toastify is awesome!",
        node: void 0,
        duration: 3e3,
        selector: void 0,
        callback: function callback() {},
        destination: void 0,
        newWindow: !1,
        close: !1,
        gravity: "toastify-top",
        positionLeft: !1,
        position: "",
        backgroundColor: "",
        avatar: "",
        className: "",
        stopOnFocus: !0,
        onClick: function onClick() {},
        offset: {
          x: 0,
          y: 0
        },
        escapeMarkup: !0,
        ariaLive: "polite",
        style: {
          background: ""
        }
      }, _t.lib = _t.prototype = {
        toastify: "1.12.0",
        constructor: _t,
        init: function init(e) {
          return e || (e = {}), this.options = {}, this.toastElement = null, this.options.text = e.text || _t.defaults.text, this.options.node = e.node || _t.defaults.node, this.options.duration = 0 === e.duration ? 0 : e.duration || _t.defaults.duration, this.options.selector = e.selector || _t.defaults.selector, this.options.callback = e.callback || _t.defaults.callback, this.options.destination = e.destination || _t.defaults.destination, this.options.newWindow = e.newWindow || _t.defaults.newWindow, this.options.close = e.close || _t.defaults.close, this.options.gravity = "bottom" === e.gravity ? "toastify-bottom" : _t.defaults.gravity, this.options.positionLeft = e.positionLeft || _t.defaults.positionLeft, this.options.position = e.position || _t.defaults.position, this.options.backgroundColor = e.backgroundColor || _t.defaults.backgroundColor, this.options.avatar = e.avatar || _t.defaults.avatar, this.options.className = e.className || _t.defaults.className, this.options.stopOnFocus = void 0 === e.stopOnFocus ? _t.defaults.stopOnFocus : e.stopOnFocus, this.options.onClick = e.onClick || _t.defaults.onClick, this.options.offset = e.offset || _t.defaults.offset, this.options.escapeMarkup = void 0 !== e.escapeMarkup ? e.escapeMarkup : _t.defaults.escapeMarkup, this.options.ariaLive = e.ariaLive || _t.defaults.ariaLive, this.options.style = e.style || _t.defaults.style, e.backgroundColor && (this.options.style.background = e.backgroundColor), this;
        },
        buildToast: function buildToast() {
          if (!this.options) throw "Toastify is not initialized";
          var e = document.createElement("div");
          for (var t in e.className = "toastify on " + this.options.className, this.options.position ? e.className += " toastify-" + this.options.position : !0 === this.options.positionLeft ? (e.className += " toastify-left", console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")) : e.className += " toastify-right", e.className += " " + this.options.gravity, this.options.backgroundColor && console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.'), this.options.style) e.style[t] = this.options.style[t];
          if (this.options.ariaLive && e.setAttribute("aria-live", this.options.ariaLive), this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) e.appendChild(this.options.node);else if (this.options.escapeMarkup ? e.innerText = this.options.text : e.innerHTML = this.options.text, "" !== this.options.avatar) {
            var n = document.createElement("img");
            n.src = this.options.avatar, n.className = "toastify-avatar", "left" == this.options.position || !0 === this.options.positionLeft ? e.appendChild(n) : e.insertAdjacentElement("afterbegin", n);
          }
          if (this.options.close) {
            var i = document.createElement("button");
            i.type = "button", i.setAttribute("aria-label", "Close"), i.className = "toast-close", i.innerHTML = "&#10006;", i.addEventListener("click", function (e) {
              e.stopPropagation(), this.removeElement(this.toastElement), window.clearTimeout(this.toastElement.timeOutValue);
            }.bind(this));
            var o = window.innerWidth > 0 ? window.innerWidth : screen.width;
            ("left" == this.options.position || !0 === this.options.positionLeft) && o > 360 ? e.insertAdjacentElement("afterbegin", i) : e.appendChild(i);
          }
          if (this.options.stopOnFocus && this.options.duration > 0) {
            var s = this;
            e.addEventListener("mouseover", function (t) {
              window.clearTimeout(e.timeOutValue);
            }), e.addEventListener("mouseleave", function () {
              e.timeOutValue = window.setTimeout(function () {
                s.removeElement(e);
              }, s.options.duration);
            });
          }
          if (void 0 !== this.options.destination && e.addEventListener("click", function (e) {
            e.stopPropagation(), !0 === this.options.newWindow ? window.open(this.options.destination, "_blank") : window.location = this.options.destination;
          }.bind(this)), "function" == typeof this.options.onClick && void 0 === this.options.destination && e.addEventListener("click", function (e) {
            e.stopPropagation(), this.options.onClick();
          }.bind(this)), "object" == _typeof(this.options.offset)) {
            var a = r("x", this.options),
              l = r("y", this.options),
              c = "left" == this.options.position ? a : "-" + a,
              u = "toastify-top" == this.options.gravity ? l : "-" + l;
            e.style.transform = "translate(" + c + "," + u + ")";
          }
          return e;
        },
        showToast: function showToast() {
          if (this.toastElement = this.buildToast(), !(e = "string" == typeof this.options.selector ? document.getElementById(this.options.selector) : this.options.selector instanceof HTMLElement || "u" > (typeof ShadowRoot === "undefined" ? "undefined" : _typeof(ShadowRoot)) && this.options.selector instanceof ShadowRoot ? this.options.selector : document.body)) throw "Root element is not defined";
          var e,
            r = _t.defaults.oldestFirst ? e.firstChild : e.lastChild;
          return e.insertBefore(this.toastElement, r), _t.reposition(), this.options.duration > 0 && (this.toastElement.timeOutValue = window.setTimeout(function () {
            this.removeElement(this.toastElement);
          }.bind(this), this.options.duration)), this;
        },
        hideToast: function hideToast() {
          this.toastElement.timeOutValue && clearTimeout(this.toastElement.timeOutValue), this.removeElement(this.toastElement);
        },
        removeElement: function removeElement(e) {
          e.className = e.className.replace(" on", ""), window.setTimeout(function () {
            this.options.node && this.options.node.parentNode && this.options.node.parentNode.removeChild(this.options.node), e.parentNode && e.parentNode.removeChild(e), this.options.callback.call(e), _t.reposition();
          }.bind(this), 400);
        }
      }, _t.reposition = function () {
        for (var e, t = {
            top: 15,
            bottom: 15
          }, r = {
            top: 15,
            bottom: 15
          }, i = {
            top: 15,
            bottom: 15
          }, o = document.getElementsByClassName("toastify"), s = 0; s < o.length; s++) {
          e = !0 === n(o[s], "toastify-top") ? "toastify-top" : "toastify-bottom";
          var a = o[s].offsetHeight;
          e = e.substr(9, e.length - 1), (window.innerWidth > 0 ? window.innerWidth : screen.width) <= 360 ? (o[s].style[e] = i[e] + "px", i[e] += a + 15) : !0 === n(o[s], "toastify-left") ? (o[s].style[e] = t[e] + "px", t[e] += a + 15) : (o[s].style[e] = r[e] + "px", r[e] += a + 15);
        }
        return this;
      }, _t.lib.init.prototype = _t.lib, _t;
    }, e.exports ? e.exports = n() : r.Toastify = n();
  }), s("7mNzs", function (e, r) {
    t(e.exports, "checkBrowserSupport", function () {
      return i;
    });
    var n = {
      chrome: 124,
      edge: 124,
      safari: 17,
      firefox: 125
    };
    function i() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : navigator.userAgent,
        t = function (e) {
          var t = e.match(/Edg\/(\d+)/);
          if (t) return {
            name: "edge",
            version: parseInt(t[1], 10)
          };
          var r = e.match(/Chrome\/(\d+)/);
          if (r && !/Edg\//.test(e) && !/SamsungBrowser\//.test(e)) return {
            name: "chrome",
            version: parseInt(r[1], 10)
          };
          var n = e.match(/Firefox\/(\d+)/);
          if (n) return {
            name: "firefox",
            version: parseInt(n[1], 10)
          };
          var i = e.match(/Version\/(\d+)/);
          return i && /Safari\//.test(e) && !/Chrome|Chromium|FxiOS/.test(e) ? {
            name: "safari",
            version: parseInt(i[1], 10)
          } : null;
        }(e);
      if (!t) return {
        supported: !0
      };
      var r = n[t.name],
        i = t.version >= r;
      return i || console.error("[CMP] Your browser (".concat(t.name, " v").concat(t.version, ") is not supported. The CMP requires ").concat(t.name, " v").concat(r, " or higher and may not function correctly.")), {
        supported: i,
        browserName: t.name,
        detectedVersion: t.version,
        minVersion: r
      };
    }
  }), s("j7eCr", function (e, r) {
    t(e.exports, "detectIosEnvironment", function () {
      return n;
    });
    function n() {
      var e = navigator.userAgent || "",
        t = /iP(ad|hone|od)/.test(e),
        r = /WebKit/.test(e),
        n = /Safari/.test(e),
        i = /Version\/[\d.]+/.test(e),
        o = e.match(/OS (\d+)[._](\d+)(?:[._](\d+))?/),
        s = o ? [o[1], o[2], o[3]].filter(Boolean).join(".") : void 0;
      if (!t) return {
        type: "non-ios",
        userAgent: e
      };
      var a = e.match(/(Twitter|(X for iPhone))/i);
      return a ? {
        type: "in-app-browser",
        app: {
          Twitter: "Twitter",
          "X for iPhone": "X Twitter"
        }[a[1]] || a[1],
        iosVersion: s,
        userAgent: e
      } : /CriOS/.test(e) ? {
        type: "browser",
        browser: "chrome",
        iosVersion: s,
        userAgent: e
      } : /FxiOS/.test(e) ? {
        type: "browser",
        browser: "firefox",
        iosVersion: s,
        userAgent: e
      } : /EdgiOS/.test(e) ? {
        type: "browser",
        browser: "edge",
        iosVersion: s,
        userAgent: e
      } : r && i && n ? {
        type: "browser",
        browser: "safari",
        iosVersion: s,
        userAgent: e
      } : !r || n && i ? {
        type: "unknown",
        iosVersion: s,
        userAgent: e
      } : {
        type: "webview",
        iosVersion: s,
        userAgent: e
      };
    }
  }), s("g2KRE", function (e, r) {
    t(e.exports, "lightOrDark", function () {
      return n;
    });
    var n = function n(e) {
      var t, r, n, i, o;
      return (e.match(/^rgb/) ? (o = e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) && (t = parseInt(o[1], 10), r = parseInt(o[2], 10), n = parseInt(o[3], 10)) : (t = (o = e.length < 5 ? +("0x" + e.slice(1).replace(/./g, "$&$&")) : +("0x" + e.slice(1))) >> 16, r = o >> 8 & 255, n = 255 & o), t && r && n && (i = Math.sqrt(t * t * .299 + r * r * .587 + n * n * .114)), i && i > 127.5) ? "light" : "dark";
    };
  }), s("6RNzx", function (e, r) {
    t(e.exports, "matchesPage", function () {
      return i;
    });
    var n = function n(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.origin;
        try {
          return new URL(e, t).pathname.replace(/\/$/, "") || "/";
        } catch (t) {
          return e.replace(/\/$/, "") || "/";
        }
      },
      i = function i(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href,
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : location.origin,
          i = n(t, r),
          o = n(e, r);
        return "/" === o ? "/" === i : i === o || i.startsWith(o + "/");
      };
  }), s("gHZiw", function (r, n) {
    t(r.exports, "sanitizeBannerMessageLinks", function () {
      return s;
    });
    var i = o("ffxZQ"),
      s = function s(t) {
        if (!t || "string" != typeof t) return "";
        var r = t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        return e(i).sanitize(r, {
          FORBID_TAGS: ["a"],
          FORBID_ATTR: ["href"]
        });
      };
  }), s("ffxZQ", function (e, t) {
    var r = o("7qJ26");
    e.exports = function () {
      "use strict";

      var e,
        t = Object.entries,
        n = Object.setPrototypeOf,
        i = Object.isFrozen,
        o = Object.getPrototypeOf,
        s = Object.getOwnPropertyDescriptor,
        a = Object.freeze,
        l = Object.seal,
        c = Object.create,
        u = "u" > (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && Reflect,
        d = u.apply,
        p = u.construct;
      a || (a = function a(e) {
        return e;
      }), l || (l = function l(e) {
        return e;
      }), d || (d = function d(e, t) {
        for (var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), i = 2; i < r; i++) n[i - 2] = arguments[i];
        return e.apply(t, n);
      }), p || (p = function p(e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
        return _construct(e, r);
      });
      var h = S(Array.prototype.forEach),
        f = S(Array.prototype.lastIndexOf),
        m = S(Array.prototype.pop),
        g = S(Array.prototype.push),
        v = S(Array.prototype.splice),
        y = S(String.prototype.toLowerCase),
        b = S(String.prototype.toString),
        w = S(String.prototype.match),
        C = S(String.prototype.replace),
        E = S(String.prototype.indexOf),
        T = S(String.prototype.trim),
        A = S(Object.prototype.hasOwnProperty),
        _ = S(RegExp.prototype.test),
        L = (e = TypeError, function () {
          for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
          return p(e, r);
        });
      function S(e) {
        return function (t) {
          t instanceof RegExp && (t.lastIndex = 0);
          for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) n[i - 1] = arguments[i];
          return d(e, t, n);
        };
      }
      function k(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : y;
        n && n(e, null);
        for (var o = t.length; o--;) {
          var s = t[o];
          if ("string" == typeof s) {
            var a = r(s);
            a !== s && (i(t) || (t[o] = a), s = a);
          }
          e[s] = !0;
        }
        return e;
      }
      function x(e) {
        var n = c(null),
          i = !0,
          o = !1,
          s = void 0;
        try {
          for (var a, l = t(e)[Symbol.iterator](); !(i = (a = l.next()).done); i = !0) {
            var u = (0, r._)(a.value, 2),
              d = u[0],
              p = u[1];
            A(e, d) && (Array.isArray(p) ? n[d] = function (e) {
              for (var t = 0; t < e.length; t++) A(e, t) || (e[t] = null);
              return e;
            }(p) : p && "object" == _typeof(p) && p.constructor === Object ? n[d] = x(p) : n[d] = p);
          }
        } catch (e) {
          o = !0, s = e;
        } finally {
          try {
            i || null == l.return || l.return();
          } finally {
            if (o) throw s;
          }
        }
        return n;
      }
      function I(e, t) {
        for (; null !== e;) {
          var r = s(e, t);
          if (r) {
            if (r.get) return S(r.get);
            if ("function" == typeof r.value) return S(r.value);
          }
          e = o(e);
        }
        return function () {
          return null;
        };
      }
      var N = a(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
        M = a(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
        O = a(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
        P = a(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
        D = a(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]),
        V = a(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
        B = a(["#text"]),
        R = a(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]),
        F = a(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
        $ = a(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
        U = a(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
        z = l(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
        Y = l(/<%[\w\W]*|[\w\W]*%>/gm),
        j = l(/\$\{[\w\W]*/gm),
        W = l(/^data-[\-\w.\u00B7-\uFFFF]+$/),
        q = l(/^aria-[\-\w]+$/),
        H = l(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
        K = l(/^(?:\w+script|data):/i),
        G = l(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
        X = l(/^html$/i),
        Z = Object.freeze({
          __proto__: null,
          ARIA_ATTR: q,
          ATTR_WHITESPACE: G,
          CUSTOM_ELEMENT: l(/^[a-z][.\w]*(-[.\w]+)+$/i),
          DATA_ATTR: W,
          DOCTYPE_NAME: X,
          ERB_EXPR: Y,
          IS_ALLOWED_URI: H,
          IS_SCRIPT_OR_DATA: K,
          MUSTACHE_EXPR: z,
          TMPLIT_EXPR: j
        }),
        Q = function Q(e, t) {
          if ("object" != _typeof(e) || "function" != typeof e.createPolicy) return null;
          var r = null,
            n = "data-tt-policy-suffix";
          t && t.hasAttribute(n) && (r = t.getAttribute(n));
          var i = "dompurify" + (r ? "#" + r : "");
          try {
            return e.createPolicy(i, {
              createHTML: function createHTML(e) {
                return e;
              },
              createScriptURL: function createScriptURL(e) {
                return e;
              }
            });
          } catch (e) {
            return console.warn("TrustedTypes policy " + i + " could not be created."), null;
          }
        },
        J = function J() {
          return {
            afterSanitizeAttributes: [],
            afterSanitizeElements: [],
            afterSanitizeShadowDOM: [],
            beforeSanitizeAttributes: [],
            beforeSanitizeElements: [],
            beforeSanitizeShadowDOM: [],
            uponSanitizeAttribute: [],
            uponSanitizeElement: [],
            uponSanitizeShadowNode: []
          };
        };
      return function e() {
        var r,
          n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "u" < (typeof window === "undefined" ? "undefined" : _typeof(window)) ? null : window,
          i = function i(t) {
            return e(t);
          };
        if (i.version = "3.3.2", i.removed = [], !n || !n.document || 9 !== n.document.nodeType || !n.Element) return i.isSupported = !1, i;
        var o = n.document,
          s = o,
          l = s.currentScript,
          u = n.DocumentFragment,
          d = n.HTMLTemplateElement,
          p = n.Node,
          S = n.Element,
          z = n.NodeFilter,
          Y = n.NamedNodeMap,
          j = void 0 === Y ? n.NamedNodeMap || n.MozNamedAttrMap : Y,
          W = n.HTMLFormElement,
          q = n.DOMParser,
          K = n.trustedTypes,
          G = S.prototype,
          ee = I(G, "cloneNode"),
          et = I(G, "remove"),
          er = I(G, "nextSibling"),
          en = I(G, "childNodes"),
          ei = I(G, "parentNode");
        if ("function" == typeof d) {
          var eo = o.createElement("template");
          eo.content && eo.content.ownerDocument && (o = eo.content.ownerDocument);
        }
        var es = "",
          ea = o.implementation,
          el = o.createNodeIterator,
          ec = o.createDocumentFragment,
          eu = o.getElementsByTagName,
          ed = s.importNode,
          ep = J();
        i.isSupported = "function" == typeof t && "function" == typeof ei && ea && void 0 !== ea.createHTMLDocument;
        var eh = Z.MUSTACHE_EXPR,
          ef = Z.ERB_EXPR,
          em = Z.TMPLIT_EXPR,
          eg = Z.DATA_ATTR,
          ev = Z.ARIA_ATTR,
          ey = Z.IS_SCRIPT_OR_DATA,
          eb = Z.ATTR_WHITESPACE,
          ew = Z.CUSTOM_ELEMENT,
          eC = Z.IS_ALLOWED_URI,
          eE = null,
          eT = k({}, [].concat(_toConsumableArray(N), _toConsumableArray(M), _toConsumableArray(O), _toConsumableArray(D), _toConsumableArray(B))),
          eA = null,
          e_ = k({}, [].concat(_toConsumableArray(R), _toConsumableArray(F), _toConsumableArray($), _toConsumableArray(U))),
          eL = Object.seal(c(null, {
            tagNameCheck: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: null
            },
            attributeNameCheck: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: null
            },
            allowCustomizedBuiltInElements: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: !1
            }
          })),
          eS = null,
          ek = null,
          ex = Object.seal(c(null, {
            tagCheck: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: null
            },
            attributeCheck: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: null
            }
          })),
          eI = !0,
          eN = !0,
          eM = !1,
          eO = !0,
          eP = !1,
          eD = !0,
          eV = !1,
          eB = !1,
          eR = !1,
          eF = !1,
          e$ = !1,
          eU = !1,
          ez = !0,
          eY = !1,
          ej = !0,
          eW = !1,
          eq = {},
          eH = null,
          eK = k({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]),
          eG = null,
          eX = k({}, ["audio", "video", "img", "source", "image", "track"]),
          eZ = null,
          eQ = k({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
          eJ = "http://www.w3.org/1998/Math/MathML",
          e0 = "http://www.w3.org/2000/svg",
          e1 = "http://www.w3.org/1999/xhtml",
          e2 = e1,
          e4 = !1,
          e3 = null,
          e8 = k({}, [eJ, e0, e1], b),
          e5 = k({}, ["mi", "mo", "mn", "ms", "mtext"]),
          e6 = k({}, ["annotation-xml"]),
          e7 = k({}, ["title", "style", "font", "a", "script"]),
          e9 = null,
          te = ["application/xhtml+xml", "text/html"],
          tt = null,
          tr = null,
          tn = o.createElement("form"),
          ti = function ti(e) {
            return e instanceof RegExp || e instanceof Function;
          },
          to = function to() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!tr || tr !== e) {
              if (e && "object" == _typeof(e) || (e = {}), e = x(e), tt = "application/xhtml+xml" === (e9 = -1 === te.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE) ? b : y, eE = A(e, "ALLOWED_TAGS") ? k({}, e.ALLOWED_TAGS, tt) : eT, eA = A(e, "ALLOWED_ATTR") ? k({}, e.ALLOWED_ATTR, tt) : e_, e3 = A(e, "ALLOWED_NAMESPACES") ? k({}, e.ALLOWED_NAMESPACES, b) : e8, eZ = A(e, "ADD_URI_SAFE_ATTR") ? k(x(eQ), e.ADD_URI_SAFE_ATTR, tt) : eQ, eG = A(e, "ADD_DATA_URI_TAGS") ? k(x(eX), e.ADD_DATA_URI_TAGS, tt) : eX, eH = A(e, "FORBID_CONTENTS") ? k({}, e.FORBID_CONTENTS, tt) : eK, eS = A(e, "FORBID_TAGS") ? k({}, e.FORBID_TAGS, tt) : x({}), ek = A(e, "FORBID_ATTR") ? k({}, e.FORBID_ATTR, tt) : x({}), eq = !!A(e, "USE_PROFILES") && e.USE_PROFILES, eI = !1 !== e.ALLOW_ARIA_ATTR, eN = !1 !== e.ALLOW_DATA_ATTR, eM = e.ALLOW_UNKNOWN_PROTOCOLS || !1, eO = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR, eP = e.SAFE_FOR_TEMPLATES || !1, eD = !1 !== e.SAFE_FOR_XML, eV = e.WHOLE_DOCUMENT || !1, eF = e.RETURN_DOM || !1, e$ = e.RETURN_DOM_FRAGMENT || !1, eU = e.RETURN_TRUSTED_TYPE || !1, eR = e.FORCE_BODY || !1, ez = !1 !== e.SANITIZE_DOM, eY = e.SANITIZE_NAMED_PROPS || !1, ej = !1 !== e.KEEP_CONTENT, eW = e.IN_PLACE || !1, eC = e.ALLOWED_URI_REGEXP || H, e2 = e.NAMESPACE || e1, e5 = e.MATHML_TEXT_INTEGRATION_POINTS || e5, e6 = e.HTML_INTEGRATION_POINTS || e6, eL = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && ti(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (eL.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && ti(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (eL.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (eL.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), eP && (eN = !1), e$ && (eF = !0), eq && (eE = k({}, B), eA = c(null), !0 === eq.html && (k(eE, N), k(eA, R)), !0 === eq.svg && (k(eE, M), k(eA, F), k(eA, U)), !0 === eq.svgFilters && (k(eE, O), k(eA, F), k(eA, U)), !0 === eq.mathMl && (k(eE, D), k(eA, $), k(eA, U))), A(e, "ADD_TAGS") || (ex.tagCheck = null), A(e, "ADD_ATTR") || (ex.attributeCheck = null), e.ADD_TAGS && ("function" == typeof e.ADD_TAGS ? ex.tagCheck = e.ADD_TAGS : (eE === eT && (eE = x(eE)), k(eE, e.ADD_TAGS, tt))), e.ADD_ATTR && ("function" == typeof e.ADD_ATTR ? ex.attributeCheck = e.ADD_ATTR : (eA === e_ && (eA = x(eA)), k(eA, e.ADD_ATTR, tt))), e.ADD_URI_SAFE_ATTR && k(eZ, e.ADD_URI_SAFE_ATTR, tt), e.FORBID_CONTENTS && (eH === eK && (eH = x(eH)), k(eH, e.FORBID_CONTENTS, tt)), e.ADD_FORBID_CONTENTS && (eH === eK && (eH = x(eH)), k(eH, e.ADD_FORBID_CONTENTS, tt)), ej && (eE["#text"] = !0), eV && k(eE, ["html", "head", "body"]), eE.table && (k(eE, ["tbody"]), delete eS.tbody), e.TRUSTED_TYPES_POLICY) {
                if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML) throw L('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL) throw L('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                es = (r = e.TRUSTED_TYPES_POLICY).createHTML("");
              } else void 0 === r && (r = Q(K, l)), null !== r && "string" == typeof es && (es = r.createHTML(""));
              a && a(e), tr = e;
            }
          },
          ts = k({}, [].concat(_toConsumableArray(M), _toConsumableArray(O), _toConsumableArray(P))),
          ta = k({}, [].concat(_toConsumableArray(D), _toConsumableArray(V))),
          tl = function tl(e) {
            var t = ei(e);
            t && t.tagName || (t = {
              namespaceURI: e2,
              tagName: "template"
            });
            var r = y(e.tagName),
              n = y(t.tagName);
            return !!e3[e.namespaceURI] && (e.namespaceURI === e0 ? t.namespaceURI === e1 ? "svg" === r : t.namespaceURI === eJ ? "svg" === r && ("annotation-xml" === n || e5[n]) : !!ts[r] : e.namespaceURI === eJ ? t.namespaceURI === e1 ? "math" === r : t.namespaceURI === e0 ? "math" === r && e6[n] : !!ta[r] : e.namespaceURI === e1 ? (t.namespaceURI !== e0 || !!e6[n]) && (t.namespaceURI !== eJ || !!e5[n]) && !ta[r] && (e7[r] || !ts[r]) : "application/xhtml+xml" === e9 && !!e3[e.namespaceURI]);
          },
          tc = function tc(e) {
            g(i.removed, {
              element: e
            });
            try {
              ei(e).removeChild(e);
            } catch (t) {
              et(e);
            }
          },
          tu = function tu(e, t) {
            try {
              g(i.removed, {
                attribute: t.getAttributeNode(e),
                from: t
              });
            } catch (e) {
              g(i.removed, {
                attribute: null,
                from: t
              });
            }
            if (t.removeAttribute(e), "is" === e) if (eF || e$) try {
              tc(t);
            } catch (e) {} else try {
              t.setAttribute(e, "");
            } catch (e) {}
          },
          td = function td(e) {
            var t = null,
              n = null;
            if (eR) e = "<remove></remove>" + e;else {
              var i = w(e, /^[\r\n\t ]+/);
              n = i && i[0];
            }
            "application/xhtml+xml" === e9 && e2 === e1 && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
            var s = r ? r.createHTML(e) : e;
            if (e2 === e1) try {
              t = new q().parseFromString(s, e9);
            } catch (e) {}
            if (!t || !t.documentElement) {
              t = ea.createDocument(e2, "template", null);
              try {
                t.documentElement.innerHTML = e4 ? es : s;
              } catch (e) {}
            }
            var a = t.body || t.documentElement;
            return (e && n && a.insertBefore(o.createTextNode(n), a.childNodes[0] || null), e2 === e1) ? eu.call(t, eV ? "html" : "body")[0] : eV ? t.documentElement : a;
          },
          tp = function tp(e) {
            return el.call(e.ownerDocument || e, e, z.SHOW_ELEMENT | z.SHOW_COMMENT | z.SHOW_TEXT | z.SHOW_PROCESSING_INSTRUCTION | z.SHOW_CDATA_SECTION, null);
          },
          th = function th(e) {
            return e instanceof W && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || !(e.attributes instanceof j) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore || "function" != typeof e.hasChildNodes);
          },
          tf = function tf(e) {
            return "function" == typeof p && e instanceof p;
          };
        function tm(e, t, r) {
          h(e, function (e) {
            e.call(i, t, r, tr);
          });
        }
        var tg = function tg(e) {
            var t = null;
            if (tm(ep.beforeSanitizeElements, e, null), th(e)) return tc(e), !0;
            var r = tt(e.nodeName);
            if (tm(ep.uponSanitizeElement, e, {
              tagName: r,
              allowedTags: eE
            }), eD && e.hasChildNodes() && !tf(e.firstElementChild) && _(/<[/\w!]/g, e.innerHTML) && _(/<[/\w!]/g, e.textContent) || 7 === e.nodeType || eD && 8 === e.nodeType && _(/<[/\w]/g, e.data)) return tc(e), !0;
            if (!(ex.tagCheck instanceof Function && ex.tagCheck(r)) && (!eE[r] || eS[r])) {
              if (!eS[r] && ty(r) && (eL.tagNameCheck instanceof RegExp && _(eL.tagNameCheck, r) || eL.tagNameCheck instanceof Function && eL.tagNameCheck(r))) return !1;
              if (ej && !eH[r]) {
                var n = ei(e) || e.parentNode,
                  o = en(e) || e.childNodes;
                if (o && n) for (var s = o.length, a = s - 1; a >= 0; --a) {
                  var l = ee(o[a], !0);
                  l.__removalCount = (e.__removalCount || 0) + 1, n.insertBefore(l, er(e));
                }
              }
              return tc(e), !0;
            }
            return e instanceof S && !tl(e) || ("noscript" === r || "noembed" === r || "noframes" === r) && _(/<\/no(script|embed|frames)/i, e.innerHTML) ? (tc(e), !0) : (eP && 3 === e.nodeType && (t = e.textContent, h([eh, ef, em], function (e) {
              t = C(t, e, " ");
            }), e.textContent !== t && (g(i.removed, {
              element: e.cloneNode()
            }), e.textContent = t)), tm(ep.afterSanitizeElements, e, null), !1);
          },
          tv = function tv(e, t, r) {
            if (ek[t] || ez && ("id" === t || "name" === t) && (r in o || r in tn)) return !1;
            if (eN && !ek[t] && _(eg, t)) ;else if (eI && _(ev, t)) ;else if (ex.attributeCheck instanceof Function && ex.attributeCheck(t, e)) ;else if (!eA[t] || ek[t]) {
              if (!(ty(e) && (eL.tagNameCheck instanceof RegExp && _(eL.tagNameCheck, e) || eL.tagNameCheck instanceof Function && eL.tagNameCheck(e)) && (eL.attributeNameCheck instanceof RegExp && _(eL.attributeNameCheck, t) || eL.attributeNameCheck instanceof Function && eL.attributeNameCheck(t, e)) || "is" === t && eL.allowCustomizedBuiltInElements && (eL.tagNameCheck instanceof RegExp && _(eL.tagNameCheck, r) || eL.tagNameCheck instanceof Function && eL.tagNameCheck(r)))) return !1;
            } else if (eZ[t]) ;else if (_(eC, C(r, eb, ""))) ;else if (("src" === t || "xlink:href" === t || "href" === t) && "script" !== e && 0 === E(r, "data:") && eG[e]) ;else if (eM && !_(ey, C(r, eb, ""))) ;else if (r) return !1;
            return !0;
          },
          ty = function ty(e) {
            return "annotation-xml" !== e && w(e, ew);
          },
          tb = function tb(e) {
            tm(ep.beforeSanitizeAttributes, e, null);
            var t = e.attributes;
            if (!(!t || th(e))) {
              for (var n = {
                  attrName: "",
                  attrValue: "",
                  keepAttr: !0,
                  allowedAttributes: eA,
                  forceKeepAttr: void 0
                }, o = t.length; o--;) !function () {
                var s = t[o],
                  a = s.name,
                  l = s.namespaceURI,
                  c = s.value,
                  u = tt(a),
                  d = "value" === a ? c : T(c);
                if (n.attrName = u, n.attrValue = d, n.keepAttr = !0, n.forceKeepAttr = void 0, tm(ep.uponSanitizeAttribute, e, n), d = n.attrValue, eY && ("id" === u || "name" === u) && (tu(a, e), d = "user-content-" + d), eD && _(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, d) || "attributename" === u && w(d, "href")) return tu(a, e);
                if (!n.forceKeepAttr) {
                  if (!n.keepAttr || !eO && _(/\/>/i, d)) return tu(a, e);
                  eP && h([eh, ef, em], function (e) {
                    d = C(d, e, " ");
                  });
                  var p = tt(e.nodeName);
                  if (!tv(p, u, d)) return tu(a, e);
                  if (r && "object" == _typeof(K) && "function" == typeof K.getAttributeType) if (l) ;else switch (K.getAttributeType(p, u)) {
                    case "TrustedHTML":
                      d = r.createHTML(d);
                      break;
                    case "TrustedScriptURL":
                      d = r.createScriptURL(d);
                  }
                  if (d !== c) try {
                    l ? e.setAttributeNS(l, a, d) : e.setAttribute(a, d), th(e) ? tc(e) : m(i.removed);
                  } catch (t) {
                    tu(a, e);
                  }
                }
              }();
              tm(ep.afterSanitizeAttributes, e, null);
            }
          },
          tw = function e(t) {
            var r = null,
              n = tp(t);
            for (tm(ep.beforeSanitizeShadowDOM, t, null); r = n.nextNode();) tm(ep.uponSanitizeShadowNode, r, null), tg(r), tb(r), r.content instanceof u && e(r.content);
            tm(ep.afterSanitizeShadowDOM, t, null);
          };
        return i.sanitize = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = null,
            o = null,
            a = null,
            l = null;
          if ((e4 = !e) && (e = "\x3c!--\x3e"), "string" != typeof e && !tf(e)) if ("function" == typeof e.toString) {
            if ("string" != typeof (e = e.toString())) throw L("dirty is not a string, aborting");
          } else throw L("toString is not a function");
          if (!i.isSupported) return e;
          if (eB || to(t), i.removed = [], "string" == typeof e && (eW = !1), eW) {
            if (e.nodeName) {
              var c = tt(e.nodeName);
              if (!eE[c] || eS[c]) throw L("root node is forbidden and cannot be sanitized in-place");
            }
          } else if (e instanceof p) 1 === (o = (n = td("\x3c!----\x3e")).ownerDocument.importNode(e, !0)).nodeType && "BODY" === o.nodeName || "HTML" === o.nodeName ? n = o : n.appendChild(o);else {
            if (!eF && !eP && !eV && -1 === e.indexOf("<")) return r && eU ? r.createHTML(e) : e;
            if (!(n = td(e))) return eF ? null : eU ? es : "";
          }
          n && eR && tc(n.firstChild);
          for (var d = tp(eW ? e : n); a = d.nextNode();) tg(a), tb(a), a.content instanceof u && tw(a.content);
          if (eW) return e;
          if (eF) {
            if (e$) for (l = ec.call(n.ownerDocument); n.firstChild;) l.appendChild(n.firstChild);else l = n;
            return (eA.shadowroot || eA.shadowrootmode) && (l = ed.call(s, l, !0)), l;
          }
          var f = eV ? n.outerHTML : n.innerHTML;
          return eV && eE["!doctype"] && n.ownerDocument && n.ownerDocument.doctype && n.ownerDocument.doctype.name && _(X, n.ownerDocument.doctype.name) && (f = "<!DOCTYPE " + n.ownerDocument.doctype.name + ">\n" + f), eP && h([eh, ef, em], function (e) {
            f = C(f, e, " ");
          }), r && eU ? r.createHTML(f) : f;
        }, i.setConfig = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          to(e), eB = !0;
        }, i.clearConfig = function () {
          tr = null, eB = !1;
        }, i.isValidAttribute = function (e, t, r) {
          return tr || to({}), tv(tt(e), tt(t), r);
        }, i.addHook = function (e, t) {
          "function" == typeof t && g(ep[e], t);
        }, i.removeHook = function (e, t) {
          if (void 0 !== t) {
            var r = f(ep[e], t);
            return -1 === r ? void 0 : v(ep[e], r, 1)[0];
          }
          return m(ep[e]);
        }, i.removeHooks = function (e) {
          ep[e] = [];
        }, i.removeAllHooks = function () {
          ep = J();
        }, i;
      }();
    }();
  }), s("lgbCL", function (e, t) {
    e.exports = Promise.all([o("iXnEM")(r("4KBWk")), o("iXnEM")(r("jUt2k"))]).then(function () {
      return o("3UO6A");
    });
  }), s("iXnEM", function (e, t) {
    var r = {};
    e.exports = function (e) {
      return r[e] || (r[e] = new Promise(function (t, n) {
        if ([].concat(document.getElementsByTagName("script")).some(function (t) {
          return t.src === e;
        })) return void t();
        var i = ("u" > (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) ? globalThis : "u" > (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : self)[Symbol.for("usercentrics.csp.nonce")] || "",
          o = document.createElement("link");
        o.href = e, o.rel = "preload", o.as = "script", i && o.setAttribute("nonce", i), document.head.appendChild(o);
        var s = document.createElement("script");
        s.async = !0, s.type = "text/javascript", s.src = e, i && (s.nonce = i, s.setAttribute("nonce", i)), s.onerror = function (t) {
          var i = TypeError("Failed to fetch dynamically imported module: " + e + ". Error: " + t.message);
          s.onerror = s.onload = null, s.remove(), delete r[e], n(i);
        }, s.onload = function () {
          s.onerror = s.onload = null, t();
        }, document.getElementsByTagName("head")[0].appendChild(s);
      }).catch(function (t) {
        throw delete r[e], t;
      })), r[e];
    };
  }), s("eTUg0", function (e, t) {
    e.exports = Promise.all([o("iXnEM")(r("4KBWk")), o("iXnEM")(r("jUt2k")), o("iXnEM")(r("6xYuv"))]).then(function () {
      return o("ddlqd");
    });
  }), s("amMgL", function (e, t) {
    e.exports = o("iXnEM")(r("4KBWk")).then(function () {
      return o("jU4qC");
    });
  }), s("e5B8N", function (e, t) {
    e.exports = o("iXnEM")(r("6z4NJ")).then(function () {
      return o("8ZnzI");
    });
  }), s("7kiSb", function (e, t) {
    e.exports = o("iXnEM")(r("i8ZeD")).then(function () {
      return o("2fND1");
    });
  }), s("dSHJo", function (e, t) {
    e.exports = o("iXnEM")(r("fzw8Y")).then(function () {
      return o("kJXTG");
    });
  }), s("deIXJ", function (e, t) {
    e.exports = o("iXnEM")(r("3DZaC")).then(function () {
      return o("6GQP4");
    });
  }), s("jI8M2", function (e, t) {
    e.exports = o("iXnEM")(r("dqYqA")).then(function () {
      return o("kA3JJ");
    });
  }), s("8ByCj", function (e, t) {
    e.exports = o("iXnEM")(r("dblYi")).then(function () {
      return o("bNjUf");
    });
  }), s("crrMY", function (e, t) {
    e.exports = o("iXnEM")(r("1Ua38")).then(function () {
      return o("6bWIo");
    });
  }), s("lK1wa", function (e, r) {
    function n(e) {
      var t;
      return e.actions && e.actions.length > 0 && (null == (t = e.actions[0]) ? void 0 : t.value) ? e.actions[0].value.toLowerCase() : e.value ? e.value.toLowerCase() : "";
    }
    t(e.exports, "sortCategoriesByTheme", function () {
      return o;
    });
    var i = ["essential", "preferences", "statistics", "functional", "marketing"];
    function o(e, t) {
      if ("cb" !== t) return e;
      var r = new Map();
      return i.forEach(function (e, t) {
        r.set(e, t);
      }), _toConsumableArray(e).sort(function (e, t) {
        var i = n(e),
          o = n(t),
          s = r.get(i),
          a = r.get(o);
        return void 0 !== s && void 0 !== a ? s - a : void 0 !== s ? -1 : void 0 !== a ? 1 : i.localeCompare(o);
      });
    }
  });
})();
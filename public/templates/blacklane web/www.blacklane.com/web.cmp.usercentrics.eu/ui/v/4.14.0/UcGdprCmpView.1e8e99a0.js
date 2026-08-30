"use strict";

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
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function e(e) {
    return e && e.__esModule ? e.default : e;
  }
  function t(e, t, i, a) {
    Object.defineProperty(e, t, {
      get: i,
      set: a,
      enumerable: !0,
      configurable: !0
    });
  }
  var i,
    a = "../../",
    n = ("u" > (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) ? globalThis : "u" > (typeof self === "undefined" ? "undefined" : _typeof(self)) ? self : "u" > (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : "u" > (typeof global === "undefined" ? "undefined" : _typeof(global)) ? global : {}).parcelRequirecb08,
    o = n.register;
  o("50TIk", function (i, a) {
    t(i.exports, "initGdprCmpView", function () {
      return d;
    });
    var o = n("h2FSh"),
      r = n("dmwAz"),
      s = n("7CwjK"),
      l = n("83eRk"),
      c = n("gerwp"),
      d = function d(t) {
        return (0, o._)(function () {
          var i, a;
          return (0, r._)(this, function (o) {
            switch (o.label) {
              case 0:
                return [4, n("bYVFI")];
              case 1:
                return i = o.sent(), [4, (a = new (0, l.GdprCmpView)({
                  cmpController: t,
                  template: e(c),
                  partials: s,
                  style: i
                })).render()];
              case 2:
                return o.sent(), [2, a];
            }
          });
        })();
      };
  }), o("7CwjK", function (i, a) {
    t(i.exports, "ageVerification", function () {
      return e(n("5qeXU"));
    }), t(i.exports, "ageVerificationButtons", function () {
      return e(n("1l7MV"));
    }), t(i.exports, "ageVerificationWall", function () {
      return e(n("5DZtJ"));
    }), t(i.exports, "browserWarning", function () {
      return e(n("ivWUm"));
    }), t(i.exports, "consentOrPayWall", function () {
      return e(n("93Y8H"));
    }), t(i.exports, "buttons", function () {
      return e(n("dNjL4"));
    }), t(i.exports, "closeButton", function () {
      return e(n("4evpv"));
    }), t(i.exports, "cnil", function () {
      return e(n("1nyVG"));
    }), t(i.exports, "controllerId", function () {
      return e(n("lerqM"));
    }), t(i.exports, "dataTransferFilter", function () {
      return e(n("gmt2C"));
    }), t(i.exports, "dsrLink", function () {
      return e(n("7n9ho"));
    }), t(i.exports, "gpcSignal", function () {
      return e(n("8MfQ3"));
    }), t(i.exports, "header", function () {
      return e(n("2jVhL"));
    }), t(i.exports, "languageSelector", function () {
      return e(n("lM0SD"));
    }), t(i.exports, "languageSelectorMenu", function () {
      return e(n("6y5Vv"));
    }), t(i.exports, "logo", function () {
      return e(n("fcC0i"));
    }), t(i.exports, "links", function () {
      return e(n("eMVNJ"));
    }), t(i.exports, "poweredBy", function () {
      return e(n("3ZoyK"));
    }), t(i.exports, "privacyText", function () {
      return e(n("jaTum"));
    }), t(i.exports, "privacyButton", function () {
      return e(n("v7amt"));
    }), t(i.exports, "privacyNotice", function () {
      return e(n("d8eD7"));
    }), t(i.exports, "toggle", function () {
      return e(n("8dbA9"));
    }), t(i.exports, "toggleCcpa", function () {
      return e(n("cEbsa"));
    }), t(i.exports, "toggleFirstLayer", function () {
      return e(n("gz9lz"));
    }), t(i.exports, "toggleSecondLayer", function () {
      return e(n("eMtIL"));
    }), t(i.exports, "loadingSpinner", function () {
      return e(n("jIV6i"));
    }), t(i.exports, "vendorCount", function () {
      return e(n("eBFNJ"));
    }), t(i.exports, "ucBanner", function () {
      return e(n("izjsV"));
    }), t(i.exports, "widgetView", function () {
      return e(n("i61wR"));
    }), n("5qeXU"), n("1l7MV"), n("5DZtJ"), n("93Y8H"), n("ivWUm"), n("dNjL4"), n("4evpv"), n("1nyVG"), n("lerqM"), n("gmt2C"), n("7n9ho"), n("8MfQ3"), n("2jVhL"), n("lM0SD"), n("6y5Vv"), n("eMVNJ"), n("jIV6i"), n("fcC0i"), n("3ZoyK"), n("v7amt"), n("d8eD7"), n("jaTum"), n("8dbA9"), n("cEbsa"), n("gz9lz"), n("eMtIL"), n("izjsV"), n("eBFNJ"), n("i61wR");
    var o,
      r = n("coqK3");
    o = i.exports, Object.keys(r).forEach(function (e) {
      "default" === e || "__esModule" === e || Object.prototype.hasOwnProperty.call(o, e) || Object.defineProperty(o, e, {
        enumerable: !0,
        get: function get() {
          return r[e];
        }
      });
    });
  }), o("5qeXU", function (e, t) {
    e.exports = '{{#ageVerification}}\n  <div id="uc-age-verification" class="age-verification" role="group" aria-labelledby="uc-age-verification-title">\n    <span aria-level="2" role="heading" class="privacy-title" id="uc-age-verification-title">{{title}}</span>\n    {{#description}}\n      <div class="privacy-text" id="uc-age-verification-description">{{description}}</div>\n    {{/description}}\n  </div>\n{{/ageVerification}}\n';
  }), o("1l7MV", function (e, t) {
    e.exports = '{{#ageVerification}}\n<div class="av-buttons">\n  <button\n    class="av-button av-button-yes"\n    data-action="consent"\n    data-action-type="age-yes"\n    id="uc-age-yes-button"\n    aria-label="{{yesAriaLabel}}"\n    tabindex="0"\n  >{{yesLabel}}</button>\n  <button\n    class="av-button av-button-no"\n    data-action="consent"\n    data-action-type="age-no"\n    id="uc-age-no-button"\n    aria-label="{{noAriaLabel}}"\n    tabindex="0"\n  >{{noLabel}}</button>\n</div>\n{{/ageVerification}}\n';
  }), o("5DZtJ", function (e, t) {
    e.exports = '{{#view.ageVerification}}\n  <div class="av-wall">\n    <div class="av-container">\n      {{#logo}}\n        <div class="av-logo">\n          <img src="{{url}}" alt="{{alt}}" {{#size}}data-uc-img-height="{{size}}"{{/size}} />\n        </div>\n      {{/logo}}\n      {{#hasActions}}\n        <div class="av-language">\n          {{> languageSelector}}\n          {{> languageSelectorMenu}}\n        </div>\n      {{/hasActions}}\n      <div class="av-content">\n        <h1 class="av-title" id="uc-av-title">{{ageVerification.title}}</h1>\n        {{#ageVerification.description}}\n          <p class="av-description" id="uc-av-description">{{ageVerification.description}}</p>\n        {{/ageVerification.description}}\n      </div>\n      {{> ageVerificationButtons}}\n    </div>\n  </div>\n{{/view.ageVerification}}\n';
  }), o("93Y8H", function (e, t) {
    e.exports = '{{#view.consentOrPay}}\n  {{> languageSelectorMenu}}\n  <div id="main-view" class="main-wrapper">\n    <header id="uc-cmp-header">\n      {{#consentOrPay}}\n        <div class="cop-header {{#logo}}cop-header-with-logo{{/logo}}">\n          {{> logo}}\n          {{#headerTitle}}\n            <h1 class="cop-wall-title" id="uc-cop-wall-title">{{headerTitle}}</h1>\n          {{/headerTitle}}\n          <div class="actions cop-actions">\n            {{> languageSelector}}\n          </div>\n        </div>\n      \n        <div class="cop-cards">\n          <div class="cop-card cop-card-subscribe">\n            {{#rejectAndSubscribeTitle}}\n              <h2 class="cop-card-title">{{rejectAndSubscribeTitle}}</h2>\n            {{/rejectAndSubscribeTitle}}\n            {{#rejectAndSubscribeBannerMessage}}\n              <p class="cop-card-description">{{rejectAndSubscribeBannerMessage}}</p>\n            {{/rejectAndSubscribeBannerMessage}}\n            {{#pricingText}}\n              <p class="cop-card-pricing">{{pricingText}}</p>\n            {{/pricingText}}\n            <a\n              class="cop-subscribe-button"\n              href="{{rejectLink}}"\n              id="uc-cop-subscribe-button"\n              tabindex="0"\n              rel="noopener"\n            >{{rejectButtonText}}</a>\n            {{#loginHyperlinkLabel}}\n              <p class="cop-login-text">\n                {{loginHyperlinkLabel}}\n                {{#loginLink}}\n                  <a class="cop-login-link" href="{{loginLink}}" rel="noopener" tabindex="0">{{subscriberLoginHyperlinkText}}</a>\n                {{/loginLink}}\n              </p>\n            {{/loginHyperlinkLabel}}\n          </div>\n          <div class="cop-card cop-card-consent">\n            {{#optinBannerTitle}}\n              <h2 class="cop-card-title">{{optinBannerTitle}}</h2>\n            {{/optinBannerTitle}}\n            {{#optinBannerMessage}}\n              <p class="cop-card-description">{{optinBannerMessage}}</p>\n            {{/optinBannerMessage}}\n            <button\n              class="cop-subscribe-button"\n              data-action="consent"\n              data-action-type="accept"\n              id="uc-cop-accept-button"\n              tabindex="0"\n            >{{acceptButtonText}}</button>\n          </div>\n        </div>\n      {{/consentOrPay}}\n      {{#consentOrPay}}\n        {{#bannerMessage}}\n          <p class="cop-banner-message">{{{bannerMessage}}}</p>\n        {{/bannerMessage}}\n        {{#granularConsentMessage}}\n          <p class="cop-granular-message">{{granularConsentMessage}}</p>\n        {{/granularConsentMessage}}\n      {{/consentOrPay}}\n      {{> links}}\n      {{#consentOrPay}}\n        {{> tcfFirstLayerLists}}\n      {{/consentOrPay}}\n    </header>\n  </div>\n  <footer id="uc-cmp-footer" class="{{theme.position}}" data-testid="uc-footer" tabindex="-1">\n    {{> poweredBy}}\n  </footer>\n{{/view.consentOrPay}}\n';
  }), o("ivWUm", function (e, t) {
    e.exports = '{{#browserWarning}}\n  <div class="uc-browser-warning" role="alert">\n    <span class="uc-browser-warning__icon" aria-hidden="true"></span>\n    <span class="uc-browser-warning__message">{{message}}</span>\n  </div>\n{{/browserWarning}}\n';
  }), o("dNjL4", function (e, t) {
    e.exports = '<div class="buttons">\n  {{^isCcpa}}\n    {{#buttons}}\n      <div class="buttons-row">\n        {{#.}}\n          <button\n            data-action="consent"\n            data-action-type="{{#actionType}}{{actionType}}{{/actionType}}{{^actionType}}{{type}}{{/actionType}}"\n            class="{{type}} uc-{{type}}-button"\n            id="{{id}}"\n            aria-label="{{ariaLabel}}"\n            tabindex="0"\n          >\n            {{#icon}}\n              <span class="icon {{icon}}" aria-hidden="true"></span>\n            {{/icon}}\n            {{label}}\n          </button>\n        {{/.}}\n      </div>\n    {{/buttons}}\n  {{/isCcpa}}\n  {{#isCcpa}}\n    <div class="buttons-row">\n      {{#optOut}}\n        {{> toggle}}\n      {{/optOut}}\n      {{#okButton}}\n        <button data-action="consent" data-action-type="save" class="ok uc-ok-button" id="{{testId}}" tabindex="0">{{name}}</button>\n      {{/okButton}}\n    </div>\n  {{/isCcpa}}\n</div>\n';
  }), o("4evpv", function (e, t) {
    e.exports = '{{#closeButton}}\n  <button\n    id="uc-close-button"\n    type="button"\n    name="{{closeButton.name}}"\n    aria-label="{{closeButton.name}}"\n    tabindex="0"\n    class="closeButton"\n    title="{{closeButton.name}}"\n    data-action="consent"\n    data-action-type="{{actionType}}"\n    data-testid="uc-close-button">\n  </button>\n{{/closeButton}}\n';
  }), o("1nyVG", function (e, t) {
    e.exports = '{{#cnil}}\n  {{! A11Y Maybe we should change this to a button instead of an a }}\n  <div class="cnil" tabindex="0">\n    <a id="uc-close-icon" data-action="consent" data-action-type="deny">{{label}}</a>\n  </div>\n{{/cnil}}\n\n';
  }), o("lerqM", function (e, t) {
    e.exports = '<div class="uc-expandable-card list-item controller-id expandable controller-id-tcf" id="controller-id-item">\n  <div role="button" class="list-item-header" data-action="expand" data-target="#controller-id-item" tabindex="0">\n    <div class="list-item-header-content">\n      <div class="uc-card-title list-item-header-title" role="presentation">{{listItemLabel}}</div>\n    </div>\n    <div class="list-item-header-expander"></div>\n  </div>\n  <div class="list-item-body" id="list-item-body-controller-id">\n    <div class="controller-id-item-container">\n      <div class="controller-id-item-text">{{id}}</div>\n      <button tabindex="0" aria-label="{{copyLabel}}" class="controller-id-item-button" title="{{copyLabel}}">\n        <span class="copy-icon initial active"></span>\n        <span class="copy-icon success icon-container">\n          <span class="success-text">{{copiedLabel}}</span>\n          <span class="success-icon"></span>\n        </span>\n      </button>\n    </div>\n  </div>\n</div>\n';
  }), o("gmt2C", function (e, t) {
    e.exports = '<div role="radiogroup" class="data-transfer-filter">\n  <button id="data-transfer-filter-all"\n      class="data-transfer-filter-button active"\n      role="radio"\n      aria-checked="true">{{ allLabel }}</button>\n  <button id="data-transfer-filter-third-country"\n      class="data-transfer-filter-button"\n      role="radio"\n      aria-checked="false">{{ thirdCountryLabel }}</button>\n</div>\n';
  }), o("7n9ho", function (e, t) {
    e.exports = '<div id="uc-dsr-link">\n  {{#linkUrl}}\n    <a\n      tabindex="0"\n      href="{{linkUrl}}"\n      aria-label="{{ariaLabel}}"\n      id="dsr-client-link"\n      rel="noopener noreferrer"\n      target="_blank"\n      data-action="link"\n      data-action-type="dsrClientForm"\n    >\n      {{linkText}}\n    </a>\n  {{/linkUrl}}\n  {{^linkUrl}}\n    <a\n      role="button"\n      tabindex="0"\n      aria-label="{{ariaLabel}}"\n      id="dsr-uc-link"\n      data-action="consent"\n      data-action-type="dsrUcForm"\n    >\n      {{linkText}}\n    </a>\n  {{/linkUrl}}\n</div>';
  }), o("8MfQ3", function (e, t) {
    e.exports = '<div id="uc-gpc-signal">\n    <div id="uc-gpc-icon"></div>\n    <span id="uc-gcp-text">\n        {{gpcSignal.label}}\n    </span>\n</div>';
  }), o("2jVhL", function (e, t) {
    e.exports = '<header class="{{#logo}}has-custom-logo{{/logo}}">\n	{{> hookHeaderStart}}\n	{{#view.first}}\n		{{> hookFirstLayerHeaderStart}}\n	{{/view.first}}\n	{{#view.second}}\n		{{> hookSecondLayerHeaderStart}}\n	{{/view.second}}\n	<div class="actions {{theme.actionsPosition}}">\n		{{#theme.isWix}}\n			{{^logo}}\n			{{> poweredBy}}\n			{{/logo}}\n		{{/theme.isWix}}\n		{{> languageSelector}}\n		{{#theme.isWix}}\n			{{> languageSelectorMenu}}\n		{{/theme.isWix}}\n		{{> closeButton}}\n	</div>\n	{{> logo}}\n	{{#ageVerification}}\n		{{> ageVerification}}\n	{{/ageVerification}}\n	{{^ageVerification}}\n		{{> privacyText }}\n	{{/ageVerification}}\n	{{#dsrDetails}}\n		{{> dsrLink}}\n	{{/dsrDetails}}\n	{{#gpcSignal}}\n		{{> gpcSignal}}\n	{{/gpcSignal}}\n	{{#theme.linksInMain}}\n		{{> links}}\n	{{/theme.linksInMain}}\n	{{#view.gdpr}}\n		{{#view.first}}\n			{{#categories.length}}\n				<div class="categories">\n					{{#categories}}\n						{{#actions}}\n							{{> toggleFirstLayer}}\n						{{/actions}}\n					{{/categories}}\n				</div>\n			{{/categories.length}}\n		{{/view.first}}\n	{{/view.gdpr}}\n	{{> hookHeaderEnd}}\n	{{#view.first}}\n		{{> hookSecondLayerHeaderEnd}}\n	{{/view.first}}\n	{{#view.second}}\n		{{> hookSecondLayerHeaderEnd}}\n	{{/view.second}}\n</header>\n';
  }), o("lM0SD", function (e, t) {
    e.exports = '{{#language.languages.length}}\n  {{^theme.isMobile}}\n    <button\n      type="button"\n      class="language-selector-button"\n      id="uc-language-button"\n      aria-label="{{language.ariaLabel}}"\n      aria-haspopup="listbox"\n      aria-controls="language-selector-menu"\n    >\n      <span class="language-selector">\n        <span class="language-selector-icon" aria-hidden="true"></span>\n      </span>\n    </button>\n  {{/theme.isMobile}}\n  {{#theme.isMobile}}\n    <div class="language-selector-button-mobile">\n      <select\n        data-action="language"\n        autocomplete="language"\n        id="uc-language-button"\n        aria-label="{{language.ariaLabel}}"\n        class="language-selector-mobile"\n      >\n        {{#language.languages}}\n          <option value="{{id}}"{{#selected}} aria-selected="true" selected="selected"{{/selected}}>{{name}}</option>\n        {{/language.languages}}\n      </select>\n      <span class="language-selector-label-mobile" aria-hidden="true"></span>\n    </div>\n  {{/theme.isMobile}}\n{{/language.languages.length}}\n';
  }), o("6y5Vv", function (e, t) {
    e.exports = '{{#language.languages.length}}\n  <ul class="language-selector-menu escapable" role="listbox" visibility="false" id="language-selector-menu" aria-labelledby="uc-language-button">\n    {{#language.languages}}\n      <li\n        tabindex="0"\n        role="option"\n        lang="{{id}}"\n        aria-posinset="{{index}}"\n        aria-setsize="{{language.languages.length}}"\n        data-language="{{id}}"\n        aria-label="{{name}}"\n        {{#selected}}\n          aria-selected="true"\n          class="language-selected"\n        {{/selected}}\n      >\n        {{name}}\n      </li>\n    {{/language.languages }}\n  </ul>\n{{/language.languages.length}}\n';
  }), o("eMVNJ", function (e, t) {
    e.exports = '{{#links.length}}\n  <nav class="links"{{#linksNavAriaLabel}} aria-label="{{linksNavAriaLabel}}"{{/linksNavAriaLabel}}>\n    {{#links}}\n      {{#url}}\n        <a\n          class="uc-button-link"\n          tabindex="0"\n          href="{{url}}"\n          aria-label="{{ariaLabel}}"\n          id="{{id}}"\n          rel="noopener"\n          {{#openNewTab}}\n            target="_blank"\n          {{/openNewTab}}\n          {{#action}}\n            data-action="{{action}}"\n          {{/action}}\n          {{#actionType}}\n            data-action-type="{{actionType}}"\n          {{/actionType}}\n        >\n          {{label}}\n        </a>\n      {{/url}}\n      {{^url}}\n        <a\n          class="uc-button-link"\n          role="button"\n          tabindex="0"\n          aria-label="{{ariaLabel}}"\n          id="{{id}}"\n          {{#action}}\n            data-action="{{action}}"\n          {{/action}}\n          {{#actionType}}\n            data-action-type="{{actionType}}"\n          {{/actionType}}\n        >\n          {{label}}\n        </a>\n      {{/url}}\n    {{/links}}\n  </nav>\n{{/links.length}}\n';
  }), o("jIV6i", function (e, t) {
    e.exports = '<div class="spinner-container" tabindex="-1">\n  <div class="spinner" tabindex="-1"></div>\n</div>\n';
  }), o("fcC0i", function (e, t) {
    e.exports = '{{#logo}}\n  <img class="logo {{position}}" src="{{url}}" alt="{{alt}}" />\n{{/logo}}\n';
  }), o("3ZoyK", function (e, t) {
    e.exports = '{{#poweredBy.isEnabled}}\n  {{#poweredBy}}\n    <span class="poweredBy">\n     <a href="{{{links.uc}}}" target="_blank" rel="noopener nofollow" tabindex="0"> {{labels.prefix}} {{labels.uc}}</a>\n      {{#labels.partner}}\n       <a href="{{links.partner}}" target="_blank" rel="noopener nofollow" tabindex="0">  & {{labels.partner}}</a>\n      {{/labels.partner}}\n  </span>\n  {{/poweredBy}}\n{{/poweredBy.isEnabled}}\n';
  }), o("v7amt", function (e, t) {
    e.exports = '{{#button}}\n  <button\n    class="{{icon.type}}"\n    aria-label="{{ariaLabel}}"\n    id="{{testId}}"\n    data-action="consent"\n    data-action-type="more-privacy"\n    tabindex="0"\n  ></button>\n{{/button}}\n';
  }), o("d8eD7", function (e, t) {
    e.exports = '<div id="main-view" class="main-wrapper">\n  {{#logo}}\n    <div id="logo-container">\n      <img class="logo {{position}}" src="{{url}}" alt="{{alt}}" />\n    </div>\n  {{/logo}}\n  <div id="mid-container">\n    {{^isLinkInBannerMessage}}\n      {{^isMoreInfoLinkButton}}\n        {{#privacyLabels}}\n          <span class="privacy-notice-description">{{{bannerMessage}}}</span>\n        {{/privacyLabels}}\n      {{/isMoreInfoLinkButton}}\n    {{/isLinkInBannerMessage}}\n    \n    {{#isLinkInBannerMessage}}\n      <span class="privacy-notice-description">\n        {{{privacyLabels.bannerMessage}}}\n        {{#redirectToPrivacyPolicyLink}}\n          <a\n            id="privacy-notice-inline-link"\n            href="{{privacyPolicyLink}}"\n            data-action="link"\n            data-action-type="privacyPolicy"\n            target="_blank"\n            rel="noopener noreferrer"\n            aria-label="{{privacyLabels.buttonMoreInfoLabel}}"\n          >\n            {{privacyLabels.buttonMoreInfoLabel}}\n          </a>\n        {{/redirectToPrivacyPolicyLink}}\n        {{^redirectToPrivacyPolicyLink}}\n          <a\n            role="button"\n            id="privacy-notice-inline-link"\n            data-action="consent"\n            data-action-type="less"\n            aria-label="{{privacyLabels.buttonMoreInfoLabel}}"\n            tabindex="0"\n          >\n            {{privacyLabels.buttonMoreInfoLabel}}\n          </a>\n        {{/redirectToPrivacyPolicyLink}}\n      </span>\n    {{/isLinkInBannerMessage}}\n\n    {{#isMoreInfoLinkButton}}\n      <span class="privacy-notice-description">\n        {{{privacyLabels.bannerMessage}}}\n        {{#redirectToPrivacyPolicyLink}}\n          <a\n            id="privacy-notice-link-button"\n            href="{{privacyPolicyLink}}"\n            data-action="link"\n            data-action-type="privacyPolicy"\n            target="_blank"\n            rel="noopener noreferrer"\n            aria-label="{{privacyLabels.buttonMoreInfoLabel}}"\n          >\n            {{privacyLabels.buttonMoreInfoLabel}}\n          </a>\n        {{/redirectToPrivacyPolicyLink}}\n        {{^redirectToPrivacyPolicyLink}}\n          <a\n            role="button"\n            id="privacy-notice-link-button"\n            data-action="consent"\n            data-action-type="less"\n            aria-label="{{privacyLabels.buttonMoreInfoLabel}}"\n            tabindex="0"\n          >\n            {{privacyLabels.buttonMoreInfoLabel}}\n          </a>\n        {{/redirectToPrivacyPolicyLink}}\n      </span>\n    {{/isMoreInfoLinkButton}}\n    \n    {{#isMoreInfoLink}}\n      <a\n        role="button"\n        aria-label="{{privacyLabels.buttonMoreInfoLabel}}"\n        id="privacy-notice-link"\n        {{#redirectToPrivacyPolicyLink}}\n          href="{{privacyPolicyLink}}"\n          data-action="link"\n          data-action-type="privacyPolicy"\n          target="_blank"\n        {{/redirectToPrivacyPolicyLink}}\n        {{^redirectToPrivacyPolicyLink}}\n          data-action="consent"\n          data-action-type="less"\n        {{/redirectToPrivacyPolicyLink}}\n      >\n        {{privacyLabels.buttonMoreInfoLabel}}\n      </a>\n    {{/isMoreInfoLink}}\n  </div>\n  <div id="button-container">\n    {{#isMoreInfoButton}}\n      {{#redirectToPrivacyPolicyLink}}\n        <a\n          role="button"\n          aria-label="{{privacyLabels.buttonMoreInfoLabel}}"\n          id="privacy-notice-more-button"\n          href="{{privacyPolicyLink}}"\n          data-action="link"\n          data-action-type="privacyPolicy"\n          target="_blank"\n        >\n          {{privacyLabels.buttonMoreInfoLabel}}\n        </a>\n      {{/redirectToPrivacyPolicyLink}}\n      {{^redirectToPrivacyPolicyLink}}\n        <button\n          data-action="consent"\n          data-action-type="less"\n          id="privacy-notice-more-button"\n          tabindex="0"\n        >\n          {{privacyLabels.buttonMoreInfoLabel}}\n        </button>\n      {{/redirectToPrivacyPolicyLink}}\n    {{/isMoreInfoButton}}\n    <button\n      data-action="consent"\n      data-action-type="pure-close"\n      id="privacy-notice-ok-button"\n      tabindex="0"\n    >\n      {{privacyLabels.buttonAcceptAllLabel}}\n    </button>\n  </div>\n</div>';
  }), o("jaTum", function (e, t) {
    e.exports = '{{#privacy}}\n  <div id="uc-cmp-description">\n    <span aria-level="2" role="heading" class="privacy-title" id="uc-privacy-title">{{title}}</span>\n    <div class="privacy-text {{#summary}}expandable{{/summary}}" data-action="{{#summary}}expand{{/summary}}"\n         id="uc-privacy-description">\n      {{#summary}}\n        <span class="privacy-text-summary">{{{summary}}}</span>\n      {{/summary}}\n      <span class="privacy-text-detailed">{{> privacyTextDetailed}}</span>\n      {{#summary}}\n        <a href="#" class="privacy-text-more">{{more}}</a>\n        <a href="#" class="privacy-text-less">{{less}}</a>\n      {{/summary}}\n    </div>\n  </div>\n{{/privacy}}\n\n';
  }), o("8dbA9", function (e, t) {
    e.exports = '<div class="uc-toggle-container {{#size}} switch-{{.}}{{/size}} {{#disabled}}disabled{{/disabled}}" {{#disabled}}aria-hidden="true"{{/disabled}}>\n{{#name}}\n  <span\n    tabindex="-1"\n    class="text {{#disabled}} disabled{{/disabled}}"\n    {{#testId}}id="{{testId}}-label"{{/testId}}>\n    {{name}} {{#showGdprVendorCount}}<span class="uc-badge badge">{{count}}</span>{{/showGdprVendorCount}}\n  </span>\n{{/name}}\n  <button\n    type="button"\n    role="switch"\n    {{#checked}}checked="checked"{{/checked}}\n    {{#checked}}aria-checked="true"{{/checked}}\n    {{^checked}}aria-checked="false"{{/checked}}\n    {{#disabled}}aria-disabled="true" disabled="disabled" aria-readonly="true" tabindex="-1" aria-hidden="true"{{/disabled}}\n    {{^disabled}}aria-readonly="false"{{/disabled}}\n    {{#name}}aria-labelledby="{{testId}}-label"{{/name}}\n    {{#testId}}id="{{testId}}-toggle"{{/testId}}\n    class="uc-switch {{#size}}switch-{{.}}{{/size}} {{#disabled}}disabled{{/disabled}}"\n    data-action="{{action}}"\n    data-action-type="{{actionType}}"\n    value="{{value}}"\n    {{^name}}\n      {{#id}}\n        aria-labelledby="{{id}}-item-title"\n      {{/id}}\n      {{^id}}\n        aria-labelledby="{{value}}-item-title"\n      {{/id}}\n    {{/name}}\n  >\n    <span class="icon close {{#disabled}} disabled{{/disabled}}" tabindex="-1" {{#disabled}}aria-hidden="true"{{/disabled}}></span>\n    <span class="icon check {{#disabled}} disabled{{/disabled}}" tabindex="-1" {{#disabled}}aria-hidden="true"{{/disabled}}></span>\n  </button>\n</div>\n';
  }), o("cEbsa", function (e, t) {
    e.exports = '<div class="uc-toggle-container {{#size}} switch-{{.}}{{/size}} {{#disabled}}disabled{{/disabled}}" {{#disabled}}aria-hidden="true"{{/disabled}}>\n  <button\n    type="button"\n    role="switch"\n    {{#checked}}checked="checked"{{/checked}}\n    {{#checked}}aria-checked="true"{{/checked}}\n    {{^checked}}aria-checked="false"{{/checked}}\n    {{#disabled}}aria-disabled="true" disabled="disabled" aria-readonly="true" tabindex="-1" aria-hidden="true"{{/disabled}}\n    {{^disabled}}aria-readonly="false"{{/disabled}}\n    {{#name}}aria-labelledby="{{testId}}-label"{{/name}}\n    {{#testId}}id="{{testId}}-toggle"{{/testId}}\n    class="uc-switch"\n    data-action="{{action}}"\n    data-action-type="{{actionType}}"\n    value="{{value}}"\n  >\n    <span class="icon close {{#disabled}} disabled{{/disabled}}" tabindex="-1" {{#disabled}}aria-hidden="true"{{/disabled}}></span>\n    <span class="icon check {{#disabled}} disabled{{/disabled}}" tabindex="-1" {{#disabled}}aria-hidden="true"{{/disabled}}></span>\n  </button>\n  <span\n    tabindex="-1"\n    class="text {{#disabled}} disabled{{/disabled}}"\n    {{#testId}}id="{{testId}}-label"{{/testId}}>\n    {{name}}\n  </span>\n</div>';
  }), o("gz9lz", function (e, t) {
    e.exports = "{{> toggle}}\n";
  }), o("eMtIL", function (e, t) {
    e.exports = "{{> toggle}}\n";
  }), o("izjsV", function (e, t) {
    e.exports = '{{#view.cmp}}\n  {{#view.ageVerification}}\n    {{> ageVerificationWall}}\n  {{/view.ageVerification}}\n  {{^view.ageVerification}}\n    {{> cnil}}\n    {{> browserWarning}}\n    {{> languageSelectorMenu}}\n    <div id="main-view" class="main-wrapper">\n      {{> header}}\n      {{#view.second}}\n        {{#secondLayerSections}}\n          {{> secondLayerSections}}\n        {{/secondLayerSections}}\n        {{#categories.length}}\n          <div class="main-content">\n            <div role="list">\n              {{#categories}}\n                {{> listItem}}\n              {{/categories}}\n            </div>\n            {{#controllerId}}\n              {{> controllerId}}\n            {{/controllerId}}\n          </div>\n        {{/categories.length}}\n      {{/view.second}}\n    </div>\n    <footer {{^isCcpa}}id="uc-cmp-footer"{{/isCcpa}} class="{{theme.position}}" data-testid="uc-footer" tabindex="-1">\n      {{#theme.linksInMain}}\n        {{> buttons}}\n        {{> poweredBy}}\n      {{/theme.linksInMain}}\n      {{#theme.linksInFooter}}\n        <div class="left-container">\n          {{> links}}\n          {{> poweredBy}}\n        </div>\n        {{> buttons}}\n      {{/theme.linksInFooter}}\n    </footer>\n  {{/view.ageVerification}}\n{{/view.cmp}}\n';
  }), o("eBFNJ", function (e, t) {
    e.exports = '<span class="vendorCount">({{vendorCount}})</span>\n';
  }), o("i61wR", function (e, t) {
    e.exports = '<div id="main-view" class="main-wrapper widget-view">\n  <div id="top-container">\n    {{#logo}}\n      <div class="logo-container">\n        {{> logo}}\n      </div>\n    {{/logo}}\n    {{^logo}}\n      <div class="no-logo-container"></div>\n    {{/logo}}\n    {{> languageSelector}}\n    {{> languageSelectorMenu}}\n  </div>\n  <div id="mid-container">\n    {{#privacy}}\n      <div id="uc-cmp-description">\n        <span aria-level="2" role="heading" class="privacy-title" id="uc-privacy-title">{{title}}</span>\n        <div class="privacy-text" id="uc-privacy-description">\n          <span class="privacy-text-detailed">{{> privacyTextDetailed}}</span>\n        </div>\n        <button class="show-more-button" aria-controls="uc-privacy-description" aria-expanded="false">\n          {{showMoreLabel}}\n        </button>\n      </div>\n    {{/privacy}}\n    {{#dsrDetails}}\n      {{> dsrLink}}\n    {{/dsrDetails}}\n    {{#isCcpa}}\n      {{#moreInformationLink}}\n        <a\n          class="uc-button-link"\n          role="button"\n          tabindex="0"\n          aria-label="{{ariaLabel}}"\n          id="{{id}}"\n          {{#action}}\n            data-action="{{action}}"\n          {{/action}}\n          {{#actionType}}\n            data-action-type="{{actionType}}"\n          {{/actionType}}\n        >\n          {{label}}\n        </a>\n      {{/moreInformationLink}}\n    {{/isCcpa}}\n    {{^isCcpa}}\n      {{> links}}\n    {{/isCcpa}}\n  </div>\n  <div id="bottom-container">\n    {{#isCcpa}}\n      <div class="ccpa-footer">\n        {{#optOut}}\n          <div class="switch-container">\n            {{> toggle}}\n          </div>\n        {{/optOut}}\n        {{#okButton}}\n          <button data-action="consent" data-action-type="save" class="small-ok-button" id="{{testId}}" tabindex="0">{{name}}</button>\n        {{/okButton}}\n      </div>\n    {{/isCcpa}}\n    {{^isCcpa}}\n      {{> buttons}}\n    {{/isCcpa}}\n  </div>\n</div>';
  }), o("coqK3", function (i, a) {
    t(i.exports, "privacyTextDetailed", function () {
      return e(n("eyqsA"));
    }), n("eyqsA");
  }), o("eyqsA", function (e, t) {
    e.exports = "{{{text}}}\n";
  }), o("83eRk", function (e, i) {
    t(e.exports, "GdprCmpView", function () {
      return m;
    });
    var a = n("h2FSh"),
      o = n("kTJf3"),
      r = n("7nwmn"),
      s = n("jgqlC"),
      l = n("7qJ26"),
      c = n("dmwAz"),
      d = n("i3Ybj"),
      p = n("4xQsQ"),
      g = n("lK1wa");
    var m = /*#__PURE__*/function (_p$CmpView) {
      function m(e) {
        var _this;
        _classCallCheck(this, m);
        _this = _callSuper(this, m, [e]), _this.cmpController = e.cmpController, _this.transfersToThirdCountry = !1;
        return _this;
      }
      _inherits(m, _p$CmpView);
      return _createClass(m, [{
        key: "getData",
        value: function getData() {
          var _this2 = this;
          var e = this,
            t = function t() {
              return _superPropGet(m, "getData", _this2, 1);
            };
          return (0, a._)(function () {
            var i, a, p, m, u, h, b, v, x, f, w, y, k, C, T, D, E, F, L, q, M, z, I, _, B, P, V, S, O, A, j, R, G, H, U, Z;
            return (0, c._)(this, function (c) {
              var _this3 = this,
                _z;
              switch (c.label) {
                case 0:
                  return [4, t().call(e)];
                case 1:
                  if (!(v = c.sent())) return [2];
                  return x = v.cmpTheme, f = v.templateData, y = (w = this.cmpController).i18n, k = w.dsrInfo, C = this.cmpController.ui.showGpcLabel, T = this.isFirstLayerView() && (null == x || null == (i = x.visibility) ? void 0 : i.showCategoriesToggles) === !0 || this.isSecondLayerView() && (null == x || null == (a = x.visibility) ? void 0 : a.hideDataProcessingServices), D = {
                    listItemLabel: y.base.controllerId,
                    copiedLabel: y.base.copied,
                    copyLabel: y.base.copy,
                    id: w.getControllerId()
                  }, E = "wix" === w.ui.theme || "cb" === w.ui.theme, F = "wix" === w.ui.theme, L = "GDPR" === w.setting.type && (null == (p = w.i18n.gdpr) ? void 0 : p.addVendorCount), q = Object.entries(w.dps.categories).filter(function (e) {
                    var t = (0, l._)(e, 2),
                      i = t[0],
                      a = t[1];
                    return _this3.isCategoryVisible(i, a, F);
                  }).length, M = Object.entries(w.dps.categories).map(function (e) {
                    var t,
                      i = (0, l._)(e, 2),
                      a = i[0],
                      n = i[1];
                    if (!(n.hidden || _this3.isFirstLayerView() && E && ("Unknown" === y.categories[a].name || "wixcategory0" === a.toLocaleLowerCase())) && _this3.isCategoryVisible(a, n, F)) {
                      var s = "ALL_ACCEPTED" === n.state || "SOME_ACCEPTED" === n.state;
                      return (0, o._)({
                        title: y.categories[a].name,
                        subtitle: y.categories[a].description,
                        id: "".concat(d.CATEGORY_TOGGLE_PREFIX).concat(a),
                        showGdprVendorCount: L,
                        count: (E || L) && n.dps ? Object.entries(n.dps).length : 0,
                        toggleClass: 1 === q ? "single" : q <= 4 ? "border" : "",
                        toggleCount: q > 6 ? 6 : q,
                        actions: [(0, r._)((0, o._)({
                          action: "toggle",
                          actionType: "categoryConsent",
                          checked: s,
                          disabled: n.essential || !!n.consentOrPayRequired
                        }, _this3.isFirstLayerView() && {
                          name: y.categories[a].name
                        }), {
                          testId: "".concat(d.CATEGORY_TOGGLE_PREFIX).concat(a),
                          value: a
                        })]
                      }, !(null == x || null == (t = x.visibility) ? void 0 : t.hideDataProcessingServices) && {
                        body: {
                          load: {
                            target: "categoryDetails".concat(a),
                            action: "categoryDetails",
                            id: a
                          }
                        }
                      });
                    }
                  }).filter(function (e) {
                    return void 0 !== e;
                  }), -1 !== (I = (z = (0, g.sortCategoriesByTheme)(M, w.ui.theme)).findIndex(function (e) {
                    var t, i, a;
                    return (null == (a = e.actions) || null == (i = a[0]) || null == (t = i.value) ? void 0 : t.toLocaleLowerCase()) === "wixcategory0";
                  })) && (_z = z).push.apply(_z, _toConsumableArray(z.splice(I, 1))), B = k && {
                    linkUrl: k.linkUrl,
                    linkText: y.base.dsr,
                    ariaLabel: null != (_ = y.base.ariaLabels.dsrButton) ? _ : "Open Data Subject Request Form"
                  }, P = !(null == x || null == (m = x.visibility) ? void 0 : m.hideDataProcessingServices), E && (V = (0, o._)({
                    consent: {
                      active: "first" === this.currentTabView,
                      title: y.base.tabs.consent
                    },
                    details: {
                      active: "second" === this.currentTabView,
                      title: y.base.tabs.details,
                      data: z.map(function (e) {
                        var t, i;
                        return (0, r._)((0, o._)({}, e), {
                          actions: null != (i = null == (t = e.actions) ? void 0 : t.map(function (e) {
                            return e.name, (0, s._)(e, ["name"]);
                          })) ? i : []
                        });
                      })
                    }
                  }, "cb" === w.ui.theme && {
                    about: {
                      active: "third" === this.currentTabView,
                      title: y.base.tabs.about,
                      data: (null == (u = y.secondLayer) ? void 0 : u.privacy.description) || (null == (h = y.firstLayer) ? void 0 : h.privacy.about)
                    }
                  })), (this.isSecondLayerView() || E) && (P ? (G = Object.entries(w.dps.services).map(function (e) {
                    var t,
                      i,
                      a = (0, l._)(e, 2),
                      n = a[0],
                      o = a[1];
                    if (!o.hidden && y.categories[o.category]) {
                      var r = null == (t = o.consent) ? void 0 : t.given,
                        s = Object.entries(o.subservices || {}).length,
                        c = o.thirdCountryDataTransfer;
                      return c && (_this3.transfersToThirdCountry = !0), {
                        title: o.name,
                        subtitle: y.categories[o.category].name + (s > 1 ? " \u2022 ".concat(s, " ").concat(y.base.subservices) : s > 0 ? " \u2022 ".concat(s, " ").concat(y.base.subservice) : ""),
                        id: "".concat(d.SERVICE_TOGGLE_PREFIX).concat(n),
                        actions: [{
                          checked: r,
                          value: n,
                          disabled: o.essential || !!(null == (i = w.dps.categories[o.category]) ? void 0 : i.consentOrPayRequired),
                          action: "toggle",
                          actionType: "serviceConsent",
                          testId: "".concat(d.SERVICE_TOGGLE_PREFIX).concat(n)
                        }],
                        serviceId: n,
                        body: {
                          load: {
                            target: "serviceDetails".concat(n),
                            action: "serviceDetails",
                            id: n
                          }
                        },
                        dataTransferFilterClass: c ? "shares-data-outside-eu" : "shares-data-inside-eu"
                      };
                    }
                  }).filter(function (e) {
                    return e;
                  }), H = w.consent.getDomains(), S = (0, o._)({
                    categories: {
                      active: "first" === this.currentTabView,
                      title: y.base.tabs.categories,
                      data: z
                    },
                    services: (0, r._)((0, o._)({
                      active: "second" === this.currentTabView,
                      title: y.base.tabs.services,
                      data: G
                    }, this.transfersToThirdCountry && {
                      dataTransferFilter: {
                        allLabel: y.base.dataTransferFilter.all,
                        thirdCountryLabel: y.base.dataTransferFilter.thirdCountry
                      }
                    }, H.length && {
                      crossDomainConsent: (0, r._)((0, o._)({
                        title: y.base.crossDomainConsent.title,
                        subtitle: y.base.crossDomainConsent.appliesTo
                      }, E && {
                        count: {
                          length: H.length
                        }
                      }), {
                        list: {
                          title: y.base.crossDomainConsent.listOfDomains,
                          data: H
                        }
                      })
                    }), {
                      controllerId: D
                    })
                  }, E && {
                    about: {
                      active: "third" === this.currentTabView,
                      title: y.base.tabs.about,
                      data: (null == (j = y.secondLayer) ? void 0 : j.privacy.description) || (null == (R = y.firstLayer) ? void 0 : R.privacy.about)
                    }
                  })) : E && (S = {
                    categories: {
                      active: "first" === this.currentTabView,
                      title: y.base.tabs.categories,
                      data: z
                    },
                    about: {
                      active: "second" === this.currentTabView,
                      title: y.base.tabs.about,
                      data: (null == (O = y.secondLayer) ? void 0 : O.privacy.description) || (null == (A = y.firstLayer) ? void 0 : A.privacy.about)
                    }
                  })), U = this, Z = [{}, this.partials], [4, n("15VEs")];
                case 2:
                  return U.partials = o._.apply(void 0, Z.concat([c.sent()])), [2, (0, r._)((0, o._)({}, v), {
                    templateData: (0, r._)((0, o._)({}, f, B && this.isFirstLayerView() && {
                      dsrDetails: B
                    }, C && {
                      gpcSignal: {
                        label: y.base.gpcSignalHonored
                      }
                    }, T && {
                      categories: z
                    }, V && {
                      firstLayerSections: V
                    }, S && {
                      secondLayerSections: S
                    }, this.isSecondLayerView() && (null == x || null == (b = x.visibility) ? void 0 : b.hideDataProcessingServices) && {
                      controllerId: D
                    }), {
                      showTogglesSection: !!(T || f.moreLink)
                    })
                  })];
              }
            });
          }).call(this);
        }
      }, {
        key: "isCategoryVisible",
        value: function isCategoryVisible(e, t, i) {
          return !(t.hidden || this.isFirstLayerView() && i && this.isCustomCategory(e)) && (!i || "wixcategory0" !== e.toLocaleLowerCase() || !!t.dps && 0 !== Object.keys(t.dps).length);
        }
      }, {
        key: "attachEvents",
        value: function attachEvents() {
          var _this4 = this;
          _superPropGet(m, "attachEvents", this, 3)([]);
          var e = this.view.querySelector("#data-transfer-filter-all"),
            t = this.view.querySelector("#data-transfer-filter-third-country"),
            i = this.view.querySelector("#servicesPanel");
          e && e.addEventListener("click", function () {
            e.classList.add("active"), e.setAttribute("aria-checked", "true"), null == t || t.classList.remove("active"), null == t || t.setAttribute("aria-checked", "false"), null == i || i.classList.remove("show-only-third-country-services");
          }), t && t.addEventListener("click", function () {
            t.classList.add("active"), t.setAttribute("aria-checked", "true"), null == e || e.classList.remove("active"), null == e || e.setAttribute("aria-checked", "false"), null == i || i.classList.add("show-only-third-country-services");
          }), "tv" === this.cmpController.ui.theme && Promise.resolve(n("d42QO")).then(function (e) {
            var t = e.default;
            t.init(), _this4.isFirstLayerView() && (t.add({
              selector: ".text-focusable",
              distanceMode: !0,
              rememberSource: !0
            }), t.add("firstLayerButtons", {
              selector: ".button-focusable",
              distanceMode: !0,
              rememberSource: !0
            }), t.setDefaultSection("firstLayerButtons")), _this4.isSecondLayerView() && (t.add({
              selector: ".save-focusable",
              distanceMode: !0,
              rememberSource: !0
            }), t.add("sndLayerLeftContent", {
              selector: ".categoryConsent-focusable",
              distanceMode: !0,
              rememberSource: !0
            }), t.add({
              selector: ".serviceConsent-focusable",
              distanceMode: !0,
              rememberSource: !0
            })), t.makeFocusable(), t.focus();
          });
        }
      }, {
        key: "render",
        value: function render(e) {
          return (0, a._)(function () {
            var t;
            return (0, c._)(this, function (i) {
              switch (i.label) {
                case 0:
                  return t = this.view, [4, this.getHtml(e)];
                case 1:
                  return t.innerHTML = i.sent(), this.attachEvents(), [2];
              }
            });
          }).call(this);
        }
      }]);
    }(p.CmpView);
  }), o("jgqlC", function (e, i) {
    t(e.exports, "_", function () {
      return o;
    });
    var a = n("eqFri");
    function o(e, t) {
      if (null == e) return {};
      var i,
        n,
        o,
        r = {};
      if ("u" > (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && Reflect.ownKeys) {
        for (o = 0, i = Reflect.ownKeys(Object(e)); o < i.length; o++) n = i[o], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
        return r;
      }
      if (r = (0, a._)(e, t), Object.getOwnPropertySymbols) for (o = 0, i = Object.getOwnPropertySymbols(e); o < i.length; o++) n = i[o], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
      return r;
    }
  }), o("eqFri", function (e, i) {
    t(e.exports, "_", function () {
      return a;
    });
    function a(e, t) {
      if (null == e) return {};
      var i,
        a,
        n = {},
        o = Object.getOwnPropertyNames(e);
      for (a = 0; a < o.length; a++) i = o[a], !(t.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(e, i) && (n[i] = e[i]);
      return n;
    }
  }), o("i3Ybj", function (e, i) {
    t(e.exports, "CATEGORY_TOGGLE_PREFIX", function () {
      return a;
    }), t(e.exports, "SERVICE_TOGGLE_PREFIX", function () {
      return n;
    }), t(e.exports, "PURPOSE_TOGGLE_PREFIX", function () {
      return o;
    }), t(e.exports, "FEATURE_TOGGLE_PREFIX", function () {
      return r;
    }), t(e.exports, "VENDOR_TOGGLE_PREFIX", function () {
      return s;
    }), t(e.exports, "ACM_VENDOR_PREFIX", function () {
      return l;
    }), t(e.exports, "STACK_TOGGLE_PREFIX", function () {
      return c;
    }), t(e.exports, "EMBEDDING_CATEGORY_TOGGLE_PREFIX", function () {
      return d;
    }), t(e.exports, "EMBEDDING_SERVICE_TOGGLE_PREFIX", function () {
      return p;
    }), t(e.exports, "EMBEDDING_ATP_VENDOR_TOGGLE_PREFIX", function () {
      return g;
    }), t(e.exports, "EMBEDDING_VENDOR_TOGGLE_PREFIX", function () {
      return m;
    }), t(e.exports, "EMBEDDING_PURPOSE_TOGGLE_PREFIX", function () {
      return u;
    }), t(e.exports, "EMBEDDING_FEATURE_TOGGLE_PREFIX", function () {
      return h;
    }), t(e.exports, "CMP_CCPA_OK_BUTTON", function () {
      return b;
    }), t(e.exports, "CMP_CCPA_TOGGLE_BUTTON", function () {
      return v;
    }), t(e.exports, "CMP_PRIVACY_BUTTON", function () {
      return x;
    });
    var a = "uc-category-",
      n = "uc-service-",
      o = "uc-purpose-",
      r = "uc-feature-",
      s = "uc-vendor-",
      l = "uc-acm-vendor",
      c = "uc-stack-",
      d = "uc-embedding-category-",
      p = "uc-embedding-service-",
      g = "uc-embedding-atp-vendor-",
      m = "uc-embedding-vendor-",
      u = "uc-embedding-purpose-",
      h = "uc-embedding-feature-",
      b = "uc-ccpa-ok-button",
      v = "uc-ccpa-toggle-button",
      x = "uc-privacy-button";
  }), o("15VEs", function (e, t) {
    e.exports = n("iXnEM")(function (e, _n$i) {
      if (e = ((_n$i = n.i) === null || _n$i === void 0 ? void 0 : _n$i[e]) || e, !i) try {
        throw Error();
      } catch (n) {
        var t = ("" + n.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (!t) return a + e;
        i = t[0];
      }
      return new URL(a + e, i).toString();
    }("cQLBC")).then(function () {
      return n("6HbvZ");
    });
  }), o("gerwp", function (e, t) {
    e.exports = "{{#theme.isWidgetBanner}}\n  {{#view.first}}\n    {{> widgetView}}\n  {{/view.first}}\n  {{#view.second}}\n    {{> ucBanner}}\n  {{/view.second}}\n{{/theme.isWidgetBanner}}\n{{^theme.isWidgetBanner}}\n  {{> ucBanner}}\n{{/theme.isWidgetBanner}}\n{{#view.privacyButton}}\n  {{> privacyButton}}\n{{/view.privacyButton}}\n";
  }), o("bYVFI", function (e, t) {
    e.exports = Promise.resolve('*{box-sizing:border-box}a{color:var(--color-links-anchor);text-decoration:none}a:hover{text-decoration:underline}legend{padding:0;display:table}fieldset{border:0;min-width:0;margin:0;padding:.01em 0 0}body:not(:-moz-handler-blocked) fieldset{display:table-cell}::-webkit-scrollbar{background:0 0;width:8px}::-webkit-scrollbar-thumb{background:var(--color-cmp-scrollbar-thumb);-webkit-border-radius:1ex}.icon{background-color:var(--color-main-text);width:16px;height:16px;display:inline-block;-webkit-mask-size:contain;mask-size:contain}.icon.arrow-forward{-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M459%20874q-8-8-8-21t8-21l226-226H190q-13%200-21.5-8.5T160%20576t8.5-21.5T190%20546h495L459%20320q-8-8-8-21.5t8-21.5%2021-8%2021%208l278%20278q5%205%207%2010t2%2011q0%205-2%2010.5t-7%2010.5L501%20875q-8%208-21%207.5t-21-8.5%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M459%20874q-8-8-8-21t8-21l226-226H190q-13%200-21.5-8.5T160%20576t8.5-21.5T190%20546h495L459%20320q-8-8-8-21.5t8-21.5%2021-8%2021%208l278%20278q5%205%207%2010t2%2011q0%205-2%2010.5t-7%2010.5L501%20875q-8%208-21%207.5t-21-8.5%22%2F%3E%3C%2Fsvg%3E)}.icon.check{-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M378%20810%20154%20586l43-43%20181%20181%20384-384%2043%2043Z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M378%20810%20154%20586l43-43%20181%20181%20384-384%2043%2043Z%22%2F%3E%3C%2Fsvg%3E)}.icon.close{-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22m249%20849-42-42%20231-231-231-231%2042-42%20231%20231%20231-231%2042%2042-231%20231%20231%20231-42%2042-231-231Z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22m249%20849-42-42%20231-231-231-231%2042-42%20231%20231%20231-231%2042%2042-231%20231%20231%20231-42%2042-231-231Z%22%2F%3E%3C%2Fsvg%3E)}.switch{cursor:pointer;min-width:40px;height:22px;display:inline-block;position:relative}.switch.switch-xs{height:18px}.switch.switch-xs input:checked+.slider:before{transform:translate(16px)}.switch.switch-xs .icon{width:12px;height:12px}.switch.switch-xs .icon.close{left:16px}.switch.switch-xs .slider{width:34px}.switch.switch-xs .slider:before{width:12px;height:12px}.switch.switch-xs .slider.round{border-radius:12px}.rtl .switch+.switch{margin-left:0;margin-right:var(--spacing-sm)}.switch input{opacity:0;position:absolute;right:0}.switch input+.slider .icon.close{opacity:1}.switch input+.slider .icon.check{opacity:0}.switch input:checked+.slider{background-color:var(--color-toggle-background-active)}.switch input:checked+.slider .icon.close{opacity:0}.switch input:checked+.slider .icon.check{opacity:1}.switch input:checked+.slider:before{background-color:var(--color-toggle-handle-active);transform:translate(18px)}.switch input:disabled+.slider{cursor:not-allowed;background-color:var(--color-toggle-background-disabled)}.switch input:disabled+.slider:before{background-color:var(--color-toggle-handle-disabled)}.switch input:disabled+.slider+.text{cursor:not-allowed}.switch .text{color:var(--color-main-text);font-size:var(--typography-size-label);white-space:pre;padding-right:44px;line-height:22px;display:inline-block}.rtl .switch .text{padding-left:0;padding-right:44px}.switch .icon{pointer-events:none;background-size:contain;width:14px;height:14px;transition:all .3s;position:absolute;top:50%;transform:translateY(-50%)}.switch .icon.check{background-color:var(--color-toggle-handle-active);left:4px}.switch .icon.close{background-color:var(--color-toggle-handle-inactive);left:20px}.switch .slider{cursor:pointer;background-color:var(--color-toggle-background-inactive);width:40px;margin-left:auto;transition:all .3s;position:absolute;top:0;bottom:0;left:0;right:0}.switch .slider:before{content:"";background-color:var(--color-toggle-handle-inactive);width:16px;height:16px;transition:all .3s;position:absolute;bottom:2px;left:2px}.switch .slider.round{border:1px solid var(--color-toggle-border,white);border-radius:34px}.switch .slider.round:before{border-radius:50%}.switch .slider.round:focus-visible{outline:2px solid var(--color-focus);outline-offset:2px}.uc-toggle-container{cursor:pointer;align-items:center;min-width:40px;height:22px;display:flex;position:relative}.uc-toggle-container.disabled{cursor:not-allowed}.uc-toggle-container button.uc-switch{vertical-align:middle;text-align:center;border:1px solid var(--color-toggle-border,white);border-radius:34px;min-width:40px;height:22px;margin:0;padding:0;transition:background .15s ease-in-out;display:inline-block;position:relative}.uc-toggle-container button.uc-switch:focus{outline:none}.uc-toggle-container button.uc-switch:focus-visible{outline:2px solid var(--color-focus);outline-offset:2px}.uc-toggle-container button.uc-switch.switch-xs{min-width:34px;height:18px}.uc-toggle-container button.uc-switch.switch-xs .icon{width:12px;height:12px}.uc-toggle-container button.uc-switch.switch-xs .icon.close{left:16px}.uc-toggle-container button.uc-switch.switch-xs:after{border-radius:50%;width:12px;height:12px;bottom:2px;left:2px}.uc-toggle-container button.uc-switch.switch-xs[aria-checked=true]:after{left:18px}.uc-toggle-container button.uc-switch.switch-sm{min-width:36px;height:20px}.uc-toggle-container button.uc-switch.switch-sm .icon{width:13px;height:13px}.uc-toggle-container button.uc-switch.switch-sm .icon.close{left:18px}.uc-toggle-container button.uc-switch.switch-sm:after{border-radius:50%;width:14px;height:14px;bottom:2px;left:2px}.uc-toggle-container button.uc-switch.switch-sm[aria-checked=true]:after{left:19px}.uc-toggle-container button.uc-switch .icon{pointer-events:none;background-size:contain;width:14px;height:14px;transition:all .3s;position:absolute;top:50%;transform:translateY(-50%)}.uc-toggle-container button.uc-switch .icon.check{background-color:var(--color-toggle-handle-active);left:4px}.uc-toggle-container button.uc-switch .icon.close{background-color:var(--color-toggle-handle-inactive);left:20px}.uc-toggle-container button.uc-switch:after{content:"";background-color:var(--color-toggle-handle-inactive);will-change:left;border-radius:50%;width:16px;height:16px;transition:left .15s ease-in-out;position:absolute;bottom:2px;left:2px}.uc-toggle-container button.uc-switch[aria-checked=true]{background:var(--color-toggle-background-active)}.uc-toggle-container button.uc-switch[aria-checked=true]:after{left:20px}.uc-toggle-container button.uc-switch[aria-checked=false]{background:var(--color-toggle-background-inactive)}.uc-toggle-container button.uc-switch:disabled{cursor:not-allowed;background:var(--color-toggle-background-disabled)}.uc-toggle-container button.uc-switch:disabled:after{background-color:var(--color-toggle-handle-disabled)}.uc-toggle-container span.text{color:var(--color-main-text);font-size:var(--typography-size-label);white-space:nowrap;cursor:default;pointer-events:none;margin-right:4px;line-height:22px;display:inline-block}.rtl .uc-toggle-container span.text{margin-left:4px;margin-right:0}.large-toggle .uc-toggle-container button.uc-switch{min-width:56px;height:32px;padding:0}.large-toggle .uc-toggle-container button.uc-switch:after{width:22px;height:22px;bottom:4px;left:4px}.large-toggle .uc-toggle-container button.uc-switch[aria-checked=true]:after{left:27px}button{color:#303030;border-radius:var(--element-buttons-border-radius);padding:var(--spacing-sm) var(--spacing-md);cursor:pointer;font-weight:700;font-size:inherit;background-color:#f5f5f5;border:none;outline:none;font-family:inherit}button:focus-visible{outline:2px solid var(--color-focus);outline-offset:4px}@media (max-width:767px){button:focus-visible{outline-offset:2px}}button.accept{background-color:var(--color-buttons-accept-background);color:var(--color-buttons-accept-text)}button.deny{background-color:var(--color-buttons-deny-background);color:var(--color-buttons-deny-text)}button.save{background-color:var(--color-buttons-save-background);color:var(--color-buttons-save-text)}button.more{background-color:var(--color-buttons-more-background);color:var(--color-buttons-more-text)}button.ok{background-color:var(--color-buttons-ok-background);color:var(--color-buttons-ok-text)}button .icon{margin-right:var(--spacing-xs);vertical-align:middle;background-color:currentColor}.spinner-container{justify-content:center;align-items:center;min-height:80px;display:flex}.spinner{border:3px solid rgba(3,138,255,.3);border-top-color:rgba(0,0,0,.3);border-radius:50%;width:36px;height:36px;animation:1s ease-in-out infinite spin;display:inline-block}@keyframes spin{to{-webkit-transform:rotate(360deg)}}.av-wall{z-index:2147483647;background-color:var(--color-av-background-rgba,var(--color-cmp-background,#fff));width:100vw;height:100vh;color:var(--color-av-text,#fff);box-sizing:border-box;font-family:var(--typography-font);font-size:var(--typography-size);justify-content:center;align-items:center;padding:24px;line-height:1.25;display:flex;position:fixed;top:0;left:0;overflow:auto}.av-container{text-align:center;flex-direction:column;align-items:center;gap:24px;width:100%;max-width:600px;display:flex}.av-logo img{max-width:100%;height:auto;display:block}.av-language{color:inherit;position:absolute;top:24px;right:24px}.rtl .av-language{left:24px;right:auto}.av-language .language-selector,.av-language .language-selector-label-mobile{background-color:var(--color-av-text,#fff)}.av-content{flex-direction:column;gap:12px;display:flex}.av-title{font-size:var(--typography-size-title);color:inherit;margin:0;font-weight:700;line-height:1.3}.av-description{font-size:var(--typography-size-text);color:inherit;opacity:.85;margin:0;font-weight:400;line-height:1.5}.av-buttons{flex-direction:row;justify-content:center;gap:12px;width:100%;display:flex}.av-button{border-radius:var(--element-buttons-border-radius);font-weight:700;font-size:var(--typography-size);font-family:var(--typography-font);padding:var(--spacing-sm) var(--spacing-md);cursor:pointer;border:none;outline:none}.av-button:focus-visible{outline:2px solid var(--color-focus);outline-offset:4px}@media (max-width:767px){.av-button:focus-visible{outline-offset:2px}}.av-button-yes{background-color:var(--color-av-above-age-background,#fff);color:var(--color-av-above-age-text,#000)}.av-button-no{background-color:var(--color-av-under-age-background,#fff);color:var(--color-av-under-age-text,#000)}@media (max-width:480px){.av-wall{padding:16px}.av-container{gap:20px;max-width:100%}.av-buttons{flex-direction:column;width:100%}.av-buttons button{width:100%}.av-language{top:16px;right:16px}.rtl .av-language{left:16px;right:auto}}.cop-header{margin-bottom:var(--spacing-lg);justify-content:space-between;align-items:center;display:flex}.cop-header .cop-wall-title{font-size:var(--typography-size-text);color:var(--color-main-text,#000);font-weight:700;line-height:24px}.cop-header .cop-actions{justify-content:flex-end;display:flex}.cop-header.cop-header-with-logo{row-gap:var(--spacing-sm);flex-wrap:wrap}.cop-header.cop-header-with-logo>img.logo{object-fit:contain;object-position:left center;order:1;max-width:300px;height:48px;max-height:48px;display:block}.cop-header.cop-header-with-logo>.cop-actions{order:2}.cop-header.cop-header-with-logo>.cop-wall-title{flex:0 0 100%;order:3;margin:0}.cop-cards{gap:var(--spacing-sm);margin-bottom:var(--spacing-lg);flex-direction:row;display:flex}.cop-card{gap:var(--spacing-md);background-color:var(--color-layer-background,#f5f5f5);border-radius:var(--element-border-radius,8px);padding:var(--spacing-md);flex-direction:column;flex:1;display:flex}.cop-card-title{font-size:var(--typography-size-cop-card-title);color:var(--color-main-text,#000);margin:0;font-weight:600}.cop-card-description{font-size:var(--typography-size-text);color:var(--color-main-text,#000);margin:0}.cop-card-pricing{text-align:center;font-size:var(--typography-size-text);color:var(--color-main-text,#000);margin:0}.cop-subscribe-button{text-align:center;border-radius:var(--element-buttons-border-radius);font-weight:700;font-size:var(--typography-size);font-family:var(--typography-font);padding:var(--spacing-sm) var(--spacing-md);background-color:var(--color-cop-reject-background,var(--color-accept-button-background,#1a1a1a));color:var(--color-cop-reject-text,var(--color-accept-button-text,#fff));cursor:pointer;box-sizing:border-box;margin-top:auto;text-decoration:none;display:block}.cop-subscribe-button:focus{outline:auto 1px -webkit-focus-ring-color;outline-offset:4px}.cop-login-text{font-size:var(--typography-size-text);color:var(--color-main-text,#000);text-align:center;margin:0}.cop-login-link:focus{outline:auto 1px -webkit-focus-ring-color;outline-offset:2px}@media (max-width:480px){.cop-cards{flex-direction:column}.cop-card-subscribe{order:1}.cop-card-consent{order:2}}.cop-mandatory-badge{vertical-align:middle;margin-left:var(--spacing-xs,4px);font-size:var(--typography-size-link);white-space:nowrap;color:#0045a5;background:#ebf1f8;border:1px solid rgba(0,69,165,.1);border-radius:99px;padding:2px 8px;font-weight:600;display:inline-block}.cop-banner-inline-link{cursor:pointer}.cop-banner-inline-link:focus{outline:auto 1px -webkit-focus-ring-color;outline-offset:2px}.cop-granular-message{margin:0 0 var(--spacing-md);font-size:var(--typography-size-text);color:var(--color-main-text,#000)}#uc-cmp-description{margin-bottom:var(--spacing-lg)}.cmp-wrapper.consentOrPay .fieldset-section{margin-top:var(--spacing-lg)}.uc-browser-warning{align-items:center;gap:var(--spacing-xs);padding:var(--spacing-sm) var(--spacing-xl);background-color:#fef2eb;display:flex}.uc-browser-warning__icon{background-color:#eb6435;flex-shrink:0;width:20px;height:20px;display:block;-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cmask%20id%3D%22mask0_15309_95%22%20width%3D%2220%22%20height%3D%2220%22%20x%3D%220%22%20y%3D%220%22%20maskUnits%3D%22userSpaceOnUse%22%20style%3D%22mask-type%3Aalpha%22%3E%3Cpath%20fill%3D%22%23303030%22%20d%3D%22M0%200h20v20H0Z%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url%28%23mask0_15309_95%29%22%3E%3Cpath%20fill%3D%22%23eb6435%22%20d%3D%22M.833%2017.5%2010%201.667%2019.167%2017.5Zm2.875-1.667h12.583L10%205ZM10%2015q.354%200%20.594-.24t.24-.593a.8.8%200%200%200-.24-.594.8.8%200%200%200-.594-.24.8.8%200%200%200-.594.24.8.8%200%200%200-.24.594q0%20.354.24.593.24.24.594.24m-.833-2.5h1.667V8.333H9.166Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cmask%20id%3D%22mask0_15309_95%22%20width%3D%2220%22%20height%3D%2220%22%20x%3D%220%22%20y%3D%220%22%20maskUnits%3D%22userSpaceOnUse%22%20style%3D%22mask-type%3Aalpha%22%3E%3Cpath%20fill%3D%22%23303030%22%20d%3D%22M0%200h20v20H0Z%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url%28%23mask0_15309_95%29%22%3E%3Cpath%20fill%3D%22%23eb6435%22%20d%3D%22M.833%2017.5%2010%201.667%2019.167%2017.5Zm2.875-1.667h12.583L10%205ZM10%2015q.354%200%20.594-.24t.24-.593a.8.8%200%200%200-.24-.594.8.8%200%200%200-.594-.24.8.8%200%200%200-.594.24.8.8%200%200%200-.24.594q0%20.354.24.593.24.24.594.24m-.833-2.5h1.667V8.333H9.166Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E);-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.uc-browser-warning__message{color:var(--color-main-text)}.closeButton{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;background:0 0;border:none;width:28px;height:28px;padding:0;display:inline-block}.closeButton:focus-visible{outline:2px solid var(--color-focus);outline-offset:2px}.closeButton:after{content:"";background-color:var(--color-main-text);width:100%;height:100%;display:block;-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22m249%20849-42-42%20231-231-231-231%2042-42%20231%20231%20231-231%2042%2042-231%20231%20231%20231-42%2042-231-231Z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22m249%20849-42-42%20231-231-231-231%2042-42%20231%20231%20231-231%2042%2042-231%20231%20231%20231-42%2042-231-231Z%22%2F%3E%3C%2Fsvg%3E);-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:26px;mask-size:26px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.closeButton.modal-close-button{background-color:unset}.cnil{text-align:right;cursor:pointer;border-bottom:1px solid #dedede;font-weight:500}.cnil>a{padding:var(--spacing-sm) var(--spacing-xl);align-items:center;width:-moz-max-content;width:max-content;font-size:.875em;display:flex}.cnil>a:hover{text-decoration:none}.cnil>a:after{content:"";margin-left:var(--spacing-xxs);background-size:contain;background-color:var(--color-links-anchor);width:16px;height:16px;-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M459%20874q-8-8-8-21t8-21l226-226H190q-13%200-21.5-8.5T160%20576t8.5-21.5T190%20546h495L459%20320q-8-8-8-21.5t8-21.5%2021-8%2021%208l278%20278q5%205%207%2010t2%2011q0%205-2%2010.5t-7%2010.5L501%20875q-8%208-21%207.5t-21-8.5%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M459%20874q-8-8-8-21t8-21l226-226H190q-13%200-21.5-8.5T160%20576t8.5-21.5T190%20546h495L459%20320q-8-8-8-21.5t8-21.5%2021-8%2021%208l278%20278q5%205%207%2010t2%2011q0%205-2%2010.5t-7%2010.5L501%20875q-8%208-21%207.5t-21-8.5%22%2F%3E%3C%2Fsvg%3E);-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:17px;mask-size:17px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.ltr .cnil>a{margin-left:auto}.ltr .cnil>a>span{margin-left:var(--spacing-xxs)}.rtl .cnil>a{margin-right:auto}.rtl .cnil>a>span{margin-right:var(--spacing-xxs)}.rtl .cnil>a:after{margin-left:0;margin-right:var(--spacing-xxs);transform:rotate(180deg)}.links+.list{margin-top:var(--spacing-xl)}.controller-id-tcf{margin-top:var(--spacing-sm)}.list-xs .list-item+.list-item{border-top:none}.list-xs .list-item-header{padding:0}.list-xs .list-item-header-title{font-weight:400}.list+.list{margin-top:var(--spacing-xl)}.list-title{margin-bottom:var(--spacing-sm);color:var(--color-main-text);font-weight:700;display:block}.list-item{background-color:var(--color-cmp-background)}.list-item+.list-item{border-top:1px solid var(--color-main-border)}.list-item.expandable{border:1px solid var(--color-main-border);border-radius:4px}.list-item.expandable+.list-item.expandable{margin-top:var(--spacing-sm)}.list-item.expandable .list-xs .list-item:not(:last-child){margin-bottom:var(--spacing-xs)}.list-item.expandable .list-xs .list-item-header-content{padding:0 var(--spacing-xs) 0 0}.list-item:not(.expandable)[id^=uc-category-]{border:1px solid var(--color-main-border);padding:var(--spacing-xs) var(--spacing-sm) var(--spacing-xs) var(--spacing-xs);border-radius:4px}.list-item:not(.expandable)[id^=uc-category-]:not(:first-of-type){margin-top:var(--spacing-sm)}.list-item-header{padding:var(--spacing-sm) 0;justify-content:left;align-items:center;display:flex}.list-item-header-content{flex-direction:column;flex-grow:1;display:flex}.expandable .list-item-header-content{padding:var(--spacing-xs);cursor:pointer}.list-item-header-title{color:var(--color-main-text);font-weight:700}.list-item-header-subtitle{opacity:.7;white-space:pre-wrap;margin-top:var(--spacing-xxs);font-size:.875em}.list-item-header-actions{align-items:center;gap:var(--spacing-xs);display:flex}.list-item-header-expander{cursor:pointer;width:32px;height:32px;margin-right:var(--spacing-sm);flex-shrink:0;display:inline-block}.expanded .list-item-header-expander{transform:rotate(180deg)}.list-item-header-expander:focus-visible{outline:2px solid var(--color-focus);outline-offset:2px}.list-item-header-expander:after{content:"";background-color:var(--color-main-text);width:100%;height:100%;display:block;-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M480%20711%20240%20471l43-43%20197%20198%20197-197%2043%2043Z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M480%20711%20240%20471l43-43%20197%20198%20197-197%2043%2043Z%22%2F%3E%3C%2Fsvg%3E);-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.list-item-body{border-top:1px solid var(--color-main-border);padding:var(--spacing-sm);display:none}.list-item-body .list-item-header-content{cursor:default}.expanded .list-item-body{display:block}.list.purposes-list .list-item:not(.expandable),.list.features-list .list-item:not(.expandable),.list.special-features-list .list-item:not(.expandable){border-bottom:1px solid var(--color-main-border);border-top:unset}.cmp.first .list.non-iab-purposes-list .list-item:not(.expandable) .list-item-header-title,.cmp.first .list.purposes-list .list-item:not(.expandable) .list-item-header-title,.cmp.first .list.features-list .list-item:not(.expandable) .list-item-header-title,.cmp.first .list.special-features-list .list-item:not(.expandable) .list-item-header-title,.cmp.first .list.categories-list .list-item:not(.expandable) .list-item-header-title{font-weight:400}.cmp.tablet .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header,.cmp.mobile .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header,.cmp.xs .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header{flex-wrap:wrap}.cmp.tablet .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-content,.cmp.mobile .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-content,.cmp.xs .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-content{border-bottom:1px solid var(--color-main-border);width:100%;padding-bottom:var(--spacing-md)}.cmp.tablet .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-actions,.cmp.mobile .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-actions,.cmp.xs .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-actions,.cmp.tablet .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header>.list-item-header-action,.cmp.mobile .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header>.list-item-header-action,.cmp.xs .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header>.list-item-header-action{padding-top:var(--spacing-sm);padding-left:var(--spacing-sm);flex-grow:1}.cmp.tablet .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-expander,.cmp.mobile .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-expander,.cmp.xs .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header-expander{margin-top:var(--spacing-sm);margin-left:0}.cmp.tablet .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header .uc-toggle-container button.uc-switch,.cmp.mobile .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header .uc-toggle-container button.uc-switch,.cmp.xs .list:not(.list-xs):not(.categories-list) .list-item.expandable.has-toggles .list-item-header .uc-toggle-container button.uc-switch{margin-left:auto}.cmp.tablet .list.categories-list>.list-item>.list-item-header,.cmp.mobile .list.categories-list>.list-item>.list-item-header,.cmp.xs .list.categories-list>.list-item>.list-item-header{flex-wrap:wrap}.cmp.tablet .list.categories-list>.list-item>.list-item-header .list-item-header-content,.cmp.mobile .list.categories-list>.list-item>.list-item-header .list-item-header-content,.cmp.xs .list.categories-list>.list-item>.list-item-header .list-item-header-content{border-bottom:1px solid var(--color-main-border);width:100%;padding-bottom:var(--spacing-md)}.cmp.tablet .list.categories-list>.list-item>.list-item-header .list-item-header-actions,.cmp.mobile .list.categories-list>.list-item>.list-item-header .list-item-header-actions,.cmp.xs .list.categories-list>.list-item>.list-item-header .list-item-header-actions,.cmp.tablet .list.categories-list>.list-item>.list-item-header>.list-item-header-action,.cmp.mobile .list.categories-list>.list-item>.list-item-header>.list-item-header-action,.cmp.xs .list.categories-list>.list-item>.list-item-header>.list-item-header-action{padding-top:var(--spacing-sm);padding-left:var(--spacing-sm);flex-grow:1}.cmp.tablet .list.categories-list>.list-item>.list-item-header .list-item-header-actions>div:nth-child(2),.cmp.mobile .list.categories-list>.list-item>.list-item-header .list-item-header-actions>div:nth-child(2),.cmp.xs .list.categories-list>.list-item>.list-item-header .list-item-header-actions>div:nth-child(2){margin-top:var(--spacing-sm)}.cmp.tablet .list.categories-list>.list-item>.list-item-header .list-item-header-expander,.cmp.mobile .list.categories-list>.list-item>.list-item-header .list-item-header-expander,.cmp.xs .list.categories-list>.list-item>.list-item-header .list-item-header-expander{margin-top:var(--spacing-sm);margin-left:0}.cmp.tablet .list.categories-list>.list-item>.list-item-header .uc-toggle-container button.uc-switch,.cmp.mobile .list.categories-list>.list-item>.list-item-header .uc-toggle-container button.uc-switch,.cmp.xs .list.categories-list>.list-item>.list-item-header .uc-toggle-container button.uc-switch{margin-left:auto}.cmp.tablet.rtl .list:not(.list-xs):not(.categories-list) .list-item-header-expander,.cmp.mobile.rtl .list:not(.list-xs):not(.categories-list) .list-item-header-expander,.cmp.xs.rtl .list:not(.list-xs):not(.categories-list) .list-item-header-expander{margin-right:0;margin-left:var(--spacing-sm)}.cmp.tablet.rtl .list:not(.list-xs):not(.categories-list) .list-item-header-actions,.cmp.mobile.rtl .list:not(.list-xs):not(.categories-list) .list-item-header-actions,.cmp.xs.rtl .list:not(.list-xs):not(.categories-list) .list-item-header-actions,.cmp.tablet.rtl .list:not(.list-xs):not(.categories-list) .list-item-header>.list-item-header-action,.cmp.mobile.rtl .list:not(.list-xs):not(.categories-list) .list-item-header>.list-item-header-action,.cmp.xs.rtl .list:not(.list-xs):not(.categories-list) .list-item-header>.list-item-header-action{padding-right:var(--spacing-sm);flex-grow:1}.cmp.tablet.rtl .list.categories-list>.list-item>.list-item-header .list-item-header-expander,.cmp.mobile.rtl .list.categories-list>.list-item>.list-item-header .list-item-header-expander,.cmp.xs.rtl .list.categories-list>.list-item>.list-item-header .list-item-header-expander,.cmp.tablet.rtl #uc-services-list>.list-item>.list-item-header .list-item-header-expander,.cmp.mobile.rtl #uc-services-list>.list-item>.list-item-header .list-item-header-expander,.cmp.xs.rtl #uc-services-list>.list-item>.list-item-header .list-item-header-expander{margin-left:0;margin-right:auto}.cmp.tablet.rtl .list.categories-list>.list-item>.list-item-header .list-item-header-actions,.cmp.mobile.rtl .list.categories-list>.list-item>.list-item-header .list-item-header-actions,.cmp.xs.rtl .list.categories-list>.list-item>.list-item-header .list-item-header-actions,.cmp.tablet.rtl #uc-services-list>.list-item>.list-item-header .list-item-header-actions,.cmp.mobile.rtl #uc-services-list>.list-item>.list-item-header .list-item-header-actions,.cmp.xs.rtl #uc-services-list>.list-item>.list-item-header .list-item-header-actions,.cmp.tablet.rtl .list.categories-list>.list-item>.list-item-header>.list-item-header-action,.cmp.mobile.rtl .list.categories-list>.list-item>.list-item-header>.list-item-header-action,.cmp.xs.rtl .list.categories-list>.list-item>.list-item-header>.list-item-header-action,.cmp.tablet.rtl #uc-services-list>.list-item>.list-item-header>.list-item-header-action,.cmp.mobile.rtl #uc-services-list>.list-item>.list-item-header>.list-item-header-action,.cmp.xs.rtl #uc-services-list>.list-item>.list-item-header>.list-item-header-action{padding-left:0;padding-right:var(--spacing-sm);margin-left:auto}.cmp.xs .list:not(.list-xs):not(.categories-list) .list-item-header-actions,.cmp.mobile .list:not(.list-xs):not(.categories-list) .list-item-header-actions{align-items:unset;flex-direction:column}.cmp.xs .list:not(.list-xs):not(.categories-list) .list-item-header-actions>div:nth-child(2),.cmp.mobile .list:not(.list-xs):not(.categories-list) .list-item-header-actions>div:nth-child(2){margin-top:var(--spacing-sm)}.cmp.xs .list .list-item.expandable:not(.list-item.expandable:first-of-type),.cmp.mobile .list .list-item.expandable:not(.list-item.expandable:first-of-type){margin-top:var(--spacing-lg)}.cmp.first.tablet .list.categories-list .list-item-header,.cmp.first.mobile .list.categories-list .list-item-header,.cmp.first.xs .list.categories-list .list-item-header{flex-wrap:unset}.cmp.first.tablet .list.categories-list .list-item-header .list-item-header-content,.cmp.first.mobile .list.categories-list .list-item-header .list-item-header-content,.cmp.first.xs .list.categories-list .list-item-header .list-item-header-content{border-bottom:none;width:auto}.cmp.first.tablet .list.categories-list .list-item-header .list-item-header-actions,.cmp.first.mobile .list.categories-list .list-item-header .list-item-header-actions,.cmp.first.xs .list.categories-list .list-item-header .list-item-header-actions,.cmp.first.tablet .list.categories-list .list-item-header>.list-item-header-action,.cmp.first.mobile .list.categories-list .list-item-header>.list-item-header-action,.cmp.first.xs .list.categories-list .list-item-header>.list-item-header-action{padding:var(--spacing-sm) 0;flex-grow:0}.overlay{background-color:var(--color-cmp-overlay);opacity:var(--feature-overlay-opacity);z-index:2147483646;position:fixed;top:0;bottom:0;left:0;right:0}.cmp-wrapper{z-index:2147483646;width:100%;max-width:625px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}.cmp-wrapper .cmp{background-color:var(--color-cmp-background);border-radius:var(--layout-border-radius);border:var(--layout-border-width) solid var(--layout-border-color);max-width:625px;max-height:80vh;font-family:var(--typography-font);font-size:var(--typography-size);width:100%;color:var(--color-main-text);outline:0;flex-flow:column;display:flex;overflow:hidden;box-shadow:0 32px 68px rgba(0,0,0,.3)}.cmp-wrapper.cb header{padding-bottom:var(--spacing-xl)}.cmp-wrapper.second.right,.cmp-wrapper.second.left{top:0;bottom:0;left:unset;right:unset;transform:unset;width:100%}.cmp-wrapper.second.right .main-wrapper,.cmp-wrapper.second.left .main-wrapper{height:100%}.cmp-wrapper.second.right .cmp,.cmp-wrapper.second.left .cmp{max-height:unset;height:100%}.cmp-wrapper.second.right{right:0}.cmp-wrapper.second.left{left:0}.cmp-wrapper.second .main-wrapper{background-color:var(--color-tabs-container-background)}.cmp-wrapper.second .main-wrapper header{padding-bottom:var(--spacing-xl);background-color:var(--color-cmp-background)}.cmp-wrapper.bottom{width:100%;max-width:100%;top:unset;border-bottom-right-radius:0;border-bottom-left-radius:0;bottom:0;transform:translate(-50%)}.cmp-wrapper.bottom .cmp{max-width:unset}.cmp-wrapper.mobile,.cmp-wrapper.xs{top:unset;transform:unset;width:100%;max-width:unset;border-bottom-right-radius:0;border-bottom-left-radius:0;bottom:0;left:0}.cmp-wrapper.mobile.ios-26-in-app-browser,.cmp-wrapper.xs.ios-26-in-app-browser{width:95%;bottom:10%;left:50%;transform:translate(-50%)}.cmp-wrapper.mobile.ios-26-in-app-browser .cmp,.cmp-wrapper.xs.ios-26-in-app-browser .cmp{border-radius:10px}.cmp-wrapper.mobile .cmp,.cmp-wrapper.xs .cmp{max-width:unset}.cmp-wrapper.mobile .categories,.cmp-wrapper.xs .categories{gap:var(--spacing-xs) var(--spacing-sm);flex-wrap:wrap;display:flex}.cmp-wrapper.zoom-xxl .cmp{height:100vh;max-height:100vh}.cmp-wrapper.ageVerification{left:unset;top:unset;width:unset;max-width:unset;z-index:unset;position:static;transform:none}.cmp-wrapper.ageVerification .cmp{max-width:unset;max-height:unset;box-shadow:none;background-color:transparent;border:none;border-radius:0;position:static}.cmp-wrapper.consentOrPay{max-width:760px}.cmp-wrapper.consentOrPay .cmp{max-width:760px;max-height:90vh;overflow-y:auto}.main-wrapper{font-family:var(--typography-font);font-size:1em;line-height:1.25;overflow-y:auto}.main-wrapper>header{padding:var(--spacing-xl);padding-bottom:0}.main-wrapper>header>.categories{margin:var(--spacing-md) 0 var(--spacing-md);gap:var(--spacing-xs) var(--spacing-sm);flex-wrap:wrap;line-height:1;display:flex}.cmp.bottom .main-wrapper>header>.categories{margin-top:var(--spacing-md)}.main-wrapper>header>.links{margin-top:var(--spacing-md);font-size:var(--typography-size-link)}.main-wrapper>header>.links a+a{margin-left:var(--spacing-sm)}.rtl .main-wrapper>header>.links a+a{margin-left:0;margin-right:var(--spacing-sm)}.main-wrapper>header>.links .uc-button-link{cursor:pointer}.main-wrapper>header>.logo{object-fit:contain;object-position:left 0;max-width:300px;height:48px;max-height:48px;margin-bottom:var(--spacing-xl);display:block}.main-wrapper>header>.logo.left{margin-right:auto}.rtl .main-wrapper>header>.logo.left{margin-left:auto;margin-right:0}.main-wrapper>header>.logo.center{margin:0 auto var(--spacing-xl) auto}.main-wrapper>header>.logo.right{margin-left:auto}.rtl .main-wrapper>header>.logo.right{margin-left:0;margin-right:auto}.main-wrapper>header>.actions{grid-column-gap:var(--spacing-xs);margin-top:-4px;display:flex}.main-wrapper>header>.actions.right{float:right;margin-right:-4px}.rtl .main-wrapper>header>.actions.right{float:left;margin-left:-4px;margin-right:0}.main-wrapper>header>.actions.left{float:left;margin-left:-4px}.rtl .main-wrapper>header>.actions.left{float:right;margin-left:0;margin-right:-4px}.main-wrapper>header #uc-dsr-link{margin-top:var(--spacing-sm)}.main-wrapper>header #uc-dsr-link a{color:var(--color-links-anchor);font-size:var(--typography-size-link);cursor:pointer}.main-wrapper>.main-content{padding:var(--spacing-xl);padding-top:0}.uc-draft-watermark:before{content:"DRAFT";letter-spacing:.08em;white-space:nowrap;color:rgba(128,128,128,.35);pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:90px;font-weight:800;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)rotate(-20deg)}footer{padding:var(--spacing-sm) var(--spacing-xl)}footer.bottom{flex-flow:wrap;display:flex}footer.bottom .left-container{flex:auto}footer.bottom .left-container .poweredBy{text-align:left}.rtl footer.bottom .left-container .poweredBy{text-align:right}footer.bottom .buttons{flex:2 auto}footer .buttons-row{grid-column-gap:var(--spacing-md);justify-content:center;align-items:stretch;display:flex}footer .buttons-row>button,footer .buttons-row label{flex-grow:1;flex-basis:0}footer .buttons-row+.buttons-row{margin-top:var(--spacing-xs)}footer .buttons.mobile,footer .buttons.xs{gap:var(--spacing-md);flex-direction:column}footer .buttons.mobile>button,footer .buttons.xs>button{padding:var(--spacing-md)}footer .poweredBy{margin-top:var(--spacing-sm);text-align:center;width:100%;font-size:var(--typography-size-label);display:block}footer .poweredBy a{color:var(--color-main-text)}footer .poweredBy a:focus-visible{outline:2px solid var(--color-focus);outline-offset:2px}footer.show-border,.cmp.second footer,.cmp.tcf footer,.cmp.cb footer{border-top:1px solid var(--color-main-border)}.cmp.us footer .buttons{align-items:center}.cmp.us footer .buttons .uc-toggle-container .text{font-weight:700;font-size:var(--typography-size-text)}.cmp.us footer .buttons .buttons-row{align-items:center}.cmp.us footer .buttons .uc-toggle-container{flex-grow:unset;flex-basis:auto;width:auto}.cmp.us.tablet footer{margin-top:unset;flex-direction:column-reverse}.cmp.us.tablet footer .poweredBy{text-align:left;margin-top:unset;margin-bottom:var(--spacing-sm)}.cmp.us.tablet.rtl .poweredBy{text-align:right}.cmp.us.mobile footer .buttons-row,.cmp.us.xs footer .buttons-row{gap:var(--spacing-xxxxl);flex-direction:column}.cmp.us.mobile footer .uc-toggle-container,.cmp.us.xs footer .uc-toggle-container{margin-right:auto}.cmp.us.mobile footer #uc-ccpa-ok-button,.cmp.us.xs footer #uc-ccpa-ok-button{width:100%}@media screen and (orientation:landscape){.cmp.us:not(.desktop) footer .buttons-row{flex-direction:row;justify-content:space-between;align-items:center}.cmp.us:not(.desktop) footer #uc-ccpa-ok-button{width:auto;max-width:312px}}.cmp.bottom footer{margin-top:var(--spacing-sm)}.cmp.bottom footer .links{font-size:var(--typography-size-link)}.cmp.bottom footer .links a+a{margin-left:var(--spacing-sm)}.rtl .cmp.bottom footer .links a+a{margin-left:0;margin-right:var(--spacing-sm)}.cmp.bottom footer .links .uc-button-link{cursor:pointer}.cmp.mobile footer>.poweredBy,.cmp.xs footer>.poweredBy{margin:var(--spacing-lg) 0}.cmp.mobile .buttons-row button,.cmp.xs .buttons-row button{padding:var(--spacing-md)}.cmp.zoom-xxl footer{font-size:12px}.cmp.zoom-xxl .buttons{grid-row-gap:var(--spacing-md);grid-column-gap:var(--spacing-md);justify-content:center;align-items:stretch;display:flex}.cmp.zoom-xxl .buttons .buttons-row{flex:auto;margin:0}.cmp.first.widget .main-wrapper.widget-view{padding:var(--spacing-xl);display:flex;overflow:auto;flex-direction:column!important}.cmp.first.widget .main-wrapper.widget-view #top-container,.cmp.first.widget .main-wrapper.widget-view #bottom-container{flex-direction:row;justify-content:space-between;display:flex}.cmp.first.widget .main-wrapper.widget-view #top-container{gap:var(--spacing-lg);align-items:flex-start}.cmp.first.widget .main-wrapper.widget-view #top-container .logo-container{padding-bottom:var(--spacing-sm)}.cmp.first.widget .main-wrapper.widget-view #top-container .logo-container .logo{max-height:26px}.cmp.first.widget .main-wrapper.widget-view #mid-container{gap:var(--spacing-sm);flex-direction:column;display:flex}.cmp.first.widget .main-wrapper.widget-view #mid-container .privacy-text{-webkit-line-clamp:3;text-overflow:ellipsis;max-height:calc(var(--line-height) * 3);-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.cmp.first.widget .main-wrapper.widget-view #mid-container .privacy-text.is-expanded{-webkit-line-clamp:unset;display:block;overflow:visible}.cmp.first.widget .main-wrapper.widget-view #mid-container .privacy-text-detailed{min-height:0;overflow:auto}.cmp.first.widget .main-wrapper.widget-view #mid-container .show-more-button{margin-top:var(--spacing-xs);color:var(--color-main-text);align-items:center;gap:var(--spacing-xxs);background-color:transparent;padding:0;font-weight:400;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;display:inline-flex}.cmp.first.widget .main-wrapper.widget-view #mid-container .show-more-button:after{content:"";background-color:var(--color-main-text);width:var(--spacing-xl);height:var(--spacing-xl);margin-top:var(--spacing-xxs);display:block;-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M480%20711%20240%20471l43-43%20197%20198%20197-197%2043%2043Z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M480%20711%20240%20471l43-43%20197%20198%20197-197%2043%2043Z%22%2F%3E%3C%2Fsvg%3E);-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.cmp.first.widget .main-wrapper.widget-view #mid-container .uc-button-link:hover{cursor:pointer}.cmp.first.widget .main-wrapper.widget-view #mid-container .links{flex-wrap:wrap;align-items:center;display:flex}.cmp.first.widget .main-wrapper.widget-view #mid-container .links a{margin-right:var(--spacing-md);margin-bottom:var(--spacing-xs)}.cmp.first.widget .main-wrapper.widget-view #bottom-container{align-items:center}.cmp.first.widget .main-wrapper.widget-view #bottom-container>.links,.cmp.first.widget .main-wrapper.widget-view #bottom-container>.buttons{width:100%}.cmp.first.widget .main-wrapper.widget-view #bottom-container .buttons{padding-top:0}.cmp.first.widget .main-wrapper.widget-view #bottom-container .buttons .buttons-row{justify-content:space-between;gap:var(--spacing-sm);display:flex}.cmp.first.widget .main-wrapper.widget-view #bottom-container .buttons .buttons-row:not(:first-child){margin-top:var(--spacing-sm)}.cmp.first.widget .main-wrapper.widget-view #bottom-container .buttons .buttons-row>button{flex:1 1 0}.cmp.first.widget .main-wrapper.widget-view #bottom-container .ccpa-footer{gap:var(--spacing-xs);width:100%;display:flex}.cmp.first.widget .main-wrapper.widget-view #bottom-container .ccpa-footer .switch-container{flex:1}.cmp.first.widget .main-wrapper.widget-view #bottom-container .ccpa-footer .switch-container .uc-toggle-container{flex-direction:row-reverse;justify-content:flex-end;margin-left:0}.cmp.first.widget .main-wrapper.widget-view #bottom-container .ccpa-footer .switch-container .text{margin-left:var(--spacing-xxs);font-size:var(--typography-size-text);padding-right:0;font-weight:500}.cmp.first.widget .main-wrapper.widget-view #bottom-container .ccpa-footer .small-ok-button{flex:1;max-height:40px}.cmp.first.widget.desktop{padding:var(--spacing-xxxl);width:556px}.cmp.first.widget.desktop.right{top:auto;bottom:0;left:auto;right:0;transform:none}.cmp.first.widget.desktop.left{top:auto;bottom:0;left:0;right:auto;transform:none}.cmp.first.widget.desktop #bottom-container .ccpa-footer{align-items:center}.cmp.first.widget.desktop #bottom-container .ccpa-footer .small-ok-button{padding:var(--spacing-sm) var(--spacing-xl)}.cmp.first.widget.mobile #bottom-container{margin-top:var(--spacing-md)}.cmp.first.widget.mobile #bottom-container .ccpa-footer{flex-direction:column;align-items:flex-start;display:flex}.cmp.first.widget.mobile #bottom-container .ccpa-footer .small-ok-button{width:100%;padding:var(--spacing-lg) var(--spacing-xl)}.cmp.first.widget.mobile #bottom-container .buttons{margin-top:var(--spacing-sm)}.privacy-title{margin-bottom:var(--spacing-sm);font-weight:700;font-size:var(--typography-size-title);color:var(--color-main-text);display:block}.privacy-text{pointer-events:none;color:var(--color-main-text)}.privacy-text:hover .privacy-text-more,.privacy-text:hover .privacy-text-less{text-decoration:underline}.expandable.expanded .privacy-text-summary{display:none}.privacy-text-summary a{pointer-events:all;text-decoration:underline}.expandable .privacy-text-detailed{display:none}.expandable.expanded .privacy-text-detailed{display:block}.privacy-text-detailed a{pointer-events:all;text-decoration:underline}.privacy-text-more,.privacy-text-less{margin-top:var(--spacing-xxs);pointer-events:all;font-size:small;display:block}.expandable.expanded .privacy-text-more,.privacy-text-less{display:none}.expandable.expanded .privacy-text-less{display:block}.language-selector-button{cursor:pointer;background-color:transparent;border:none;border-radius:0;padding:0}.language-selector-button:focus-visible{outline:2px solid var(--color-focus);outline-offset:2px}.language-selector-button-mobile{cursor:pointer;position:relative}.language-selector-mobile{cursor:pointer;opacity:0;width:100%;height:100%;position:absolute;top:0;left:0}.language-selector-label-mobile{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--color-main-text);pointer-events:none;border:none;width:28px;height:28px;display:inline-block;-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M480%20976q-84%200-157-31.5T196%20859t-85-127.5T80%20574t31-156.5T196%20291t127-84.5T480%20176t157%2030.5T764%20291t85%20126.5T880%20574t-31%20157.5T764%20859t-127%2085.5T480%20976m0-58q35-36%2058.5-82.5T577%20725H384q14%2060%2037.5%20108t58.5%2085m-85-12q-25-38-43-82t-30-99H172q38%2071%2088%20111.5T395%20906m171-1q72-23%20129.5-69T788%20725H639q-13%2054-30.5%2098T566%20905M152%20665h159q-3-27-3.5-48.5T307%20574q0-25%201-44.5t4-43.5H152q-7%2024-9.5%2043t-2.5%2045%202.5%2046.5T152%20665m221%200h215q4-31%205-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4%2031-5%2049.5t-1%2038.5q0%2021%201%2040.5t5%2050.5m275%200h160q7-24%209.5-44.5T820%20574t-2.5-45-9.5-43H649q3%2035%204%2053.5t1%2034.5q0%2022-1.5%2041.5T648%20665m-10-239h150q-33-69-90.5-115T565%20246q25%2037%2042.5%2080T638%20426m-254%200h194q-11-53-37-102.5T480%20236q-32%2027-54%2071t-42%20119m-212%200h151q11-54%2028-96.5t43-82.5q-75%2019-131%2064t-91%20115%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M480%20976q-84%200-157-31.5T196%20859t-85-127.5T80%20574t31-156.5T196%20291t127-84.5T480%20176t157%2030.5T764%20291t85%20126.5T880%20574t-31%20157.5T764%20859t-127%2085.5T480%20976m0-58q35-36%2058.5-82.5T577%20725H384q14%2060%2037.5%20108t58.5%2085m-85-12q-25-38-43-82t-30-99H172q38%2071%2088%20111.5T395%20906m171-1q72-23%20129.5-69T788%20725H639q-13%2054-30.5%2098T566%20905M152%20665h159q-3-27-3.5-48.5T307%20574q0-25%201-44.5t4-43.5H152q-7%2024-9.5%2043t-2.5%2045%202.5%2046.5T152%20665m221%200h215q4-31%205-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4%2031-5%2049.5t-1%2038.5q0%2021%201%2040.5t5%2050.5m275%200h160q7-24%209.5-44.5T820%20574t-2.5-45-9.5-43H649q3%2035%204%2053.5t1%2034.5q0%2022-1.5%2041.5T648%20665m-10-239h150q-33-69-90.5-115T565%20246q25%2037%2042.5%2080T638%20426m-254%200h194q-11-53-37-102.5T480%20236q-32%2027-54%2071t-42%20119m-212%200h151q11-54%2028-96.5t43-82.5q-75%2019-131%2064t-91%20115%22%2F%3E%3C%2Fsvg%3E);-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:24px;mask-size:24px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.language-selector{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--color-main-text);pointer-events:none;border:none;width:28px;height:28px;display:inline-block;-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M480%20976q-84%200-157-31.5T196%20859t-85-127.5T80%20574t31-156.5T196%20291t127-84.5T480%20176t157%2030.5T764%20291t85%20126.5T880%20574t-31%20157.5T764%20859t-127%2085.5T480%20976m0-58q35-36%2058.5-82.5T577%20725H384q14%2060%2037.5%20108t58.5%2085m-85-12q-25-38-43-82t-30-99H172q38%2071%2088%20111.5T395%20906m171-1q72-23%20129.5-69T788%20725H639q-13%2054-30.5%2098T566%20905M152%20665h159q-3-27-3.5-48.5T307%20574q0-25%201-44.5t4-43.5H152q-7%2024-9.5%2043t-2.5%2045%202.5%2046.5T152%20665m221%200h215q4-31%205-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4%2031-5%2049.5t-1%2038.5q0%2021%201%2040.5t5%2050.5m275%200h160q7-24%209.5-44.5T820%20574t-2.5-45-9.5-43H649q3%2035%204%2053.5t1%2034.5q0%2022-1.5%2041.5T648%20665m-10-239h150q-33-69-90.5-115T565%20246q25%2037%2042.5%2080T638%20426m-254%200h194q-11-53-37-102.5T480%20236q-32%2027-54%2071t-42%20119m-212%200h151q11-54%2028-96.5t43-82.5q-75%2019-131%2064t-91%20115%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M480%20976q-84%200-157-31.5T196%20859t-85-127.5T80%20574t31-156.5T196%20291t127-84.5T480%20176t157%2030.5T764%20291t85%20126.5T880%20574t-31%20157.5T764%20859t-127%2085.5T480%20976m0-58q35-36%2058.5-82.5T577%20725H384q14%2060%2037.5%20108t58.5%2085m-85-12q-25-38-43-82t-30-99H172q38%2071%2088%20111.5T395%20906m171-1q72-23%20129.5-69T788%20725H639q-13%2054-30.5%2098T566%20905M152%20665h159q-3-27-3.5-48.5T307%20574q0-25%201-44.5t4-43.5H152q-7%2024-9.5%2043t-2.5%2045%202.5%2046.5T152%20665m221%200h215q4-31%205-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4%2031-5%2049.5t-1%2038.5q0%2021%201%2040.5t5%2050.5m275%200h160q7-24%209.5-44.5T820%20574t-2.5-45-9.5-43H649q3%2035%204%2053.5t1%2034.5q0%2022-1.5%2041.5T648%20665m-10-239h150q-33-69-90.5-115T565%20246q25%2037%2042.5%2080T638%20426m-254%200h194q-11-53-37-102.5T480%20236q-32%2027-54%2071t-42%20119m-212%200h151q11-54%2028-96.5t43-82.5q-75%2019-131%2064t-91%20115%22%2F%3E%3C%2Fsvg%3E);-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:24px;mask-size:24px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.language-selector select{cursor:pointer;width:28px;height:28px;display:none}.xs .language-selector select,.mobile .language-selector select,.tablet .language-selector select{opacity:0;display:block}.language-selector-icon{pointer-events:none;width:28px;height:28px}.language-selector-menu{z-index:4;background-color:#fff;border-radius:4px;min-width:160px;max-height:123px;margin:8px;padding:0;list-style:none;display:none;position:absolute;top:0;overflow-y:auto;box-shadow:0 1px 10px rgba(0,0,0,.12),0 4px 5px rgba(0,0,0,.14),0 2px 4px -1px rgba(0,0,0,.2)}.ltr .language-selector-menu{right:0}.rtl .language-selector-menu{left:0}.language-selector-menu.visible{display:block}.language-selector-menu li{width:224px;color:var(--text-text-color-100,#000);background-position:right 12px center;background-repeat:no-repeat;padding:14px 64px 14px 16px;font-size:14px;font-weight:500;line-height:20px;transition:background-color .2s ease-in-out}.language-selector-menu li:hover{cursor:pointer;background-color:#f5f5f5}.rtl .language-selector-menu li{background-position:12px;padding:12px 16px 12px 64px}.language-selector-menu li.language-selected{background-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%2096%20960%20960%22%3E%3Cpath%20d%3D%22M378%20810%20154%20586l43-43%20181%20181%20384-384%2043%2043Z%22%2F%3E%3C%2Fsvg%3E);background-size:16px;font-weight:700}#uc-gpc-signal{margin-top:var(--spacing-md);align-items:center;display:flex}#uc-gpc-signal #uc-gpc-icon{background-color:var(--color-main-text);width:18px;height:18px;margin-right:var(--spacing-xxs);display:block;-webkit-mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cdefs%3E%3Cpath%20id%3D%22checkmark-rounded-icon-path-a%22%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202M9.55%2015.753l-2.906-2.996a.84.84%200%200%201-.236-.588c0-.221.085-.433.236-.589a.79.79%200%200%201%201.142%200l2.34%202.404%205.57-5.742a.79.79%200%200%201%201.141%200%20.85.85%200%200%201%200%201.176l-6.145%206.335a.79.79%200%200%201-1.141%200Z%22%2F%3E%3C%2Fdefs%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20id%3D%22checkmark-rounded-icon-path-b%22%20fill%3D%22%23fff%22%3E%3Cuse%20href%3D%22%23checkmark-rounded-icon-path-a%22%2F%3E%3C%2Fmask%3E%3Cg%20fill%3D%22currentColor%22%20mask%3D%22url%28%23checkmark-rounded-icon-path-b%29%22%3E%3Cpath%20d%3D%22M0%200h24v24H0Z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E);mask-image:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cdefs%3E%3Cpath%20id%3D%22checkmark-rounded-icon-path-a%22%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202M9.55%2015.753l-2.906-2.996a.84.84%200%200%201-.236-.588c0-.221.085-.433.236-.589a.79.79%200%200%201%201.142%200l2.34%202.404%205.57-5.742a.79.79%200%200%201%201.141%200%20.85.85%200%200%201%200%201.176l-6.145%206.335a.79.79%200%200%201-1.141%200Z%22%2F%3E%3C%2Fdefs%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20id%3D%22checkmark-rounded-icon-path-b%22%20fill%3D%22%23fff%22%3E%3Cuse%20href%3D%22%23checkmark-rounded-icon-path-a%22%2F%3E%3C%2Fmask%3E%3Cg%20fill%3D%22currentColor%22%20mask%3D%22url%28%23checkmark-rounded-icon-path-b%29%22%3E%3Cpath%20d%3D%22M0%200h24v24H0Z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E);-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}#uc-gpc-signal #uc-gcp-text{line-height:0}.modal-wrapper{z-index:2147483647;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);width:100vw;height:100vh;font-size:var(--typography-size);position:fixed;top:0;left:0}.modal-wrapper.fadeout{animation:.25s cubic-bezier(.39,.575,.565,1) both fade-out-bottom}.modal-wrapper.mobile .modal-container{height:100vh}.modal-wrapper.mobile .modal-container .modal-header{padding:var(--spacing-xs) var(--spacing-lg)}.modal-wrapper.mobile .modal-container .modal-body{max-height:unset;height:100%;padding-bottom:100px;padding-top:calc(var(--spacing-xxxxl)*2 + var(--spacing-xs) + var(--spacing-md))}.modal-wrapper.mobile .modal-container footer{background-color:var(--color-cmp-background);width:100%;position:-webkit-sticky;position:sticky;bottom:0}.modal-wrapper :not(.desktop) .modal-header{z-index:2;width:100%;position:fixed}.modal-container{background:var(--color-cmp-background);border-radius:var(--layout-border-radius);width:100%;max-width:650px;color:var(--color-main-text);font-size:1em;position:fixed;top:50%;left:50%;overflow:hidden;transform:translate(-50%,-50%);box-shadow:0 32px 68px rgba(0,0,0,.3)}.modal-container.fadein{animation:.2s cubic-bezier(.39,.575,.565,1) both fade-in-bottom}.modal-container .modal-body{padding:var(--spacing-xxxxl);max-height:70vh;padding-top:calc(var(--spacing-xxxxl) + var(--spacing-xs) + var(--spacing-md))}.modal-container .modal-header{background:var(--color-cmp-background);border-bottom:1px solid var(--color-main-border);padding:var(--spacing-xs) var(--spacing-sm);justify-content:space-between;align-items:center;font-weight:700;display:flex;position:-webkit-sticky;position:sticky;top:0}.modal-container .modal-title{font-size:var(--typography-size-title)}.modal-container footer{border-top:1px solid var(--color-main-border);justify-content:center;display:flex}.modal-container footer button{background:var(--color-buttons-accept-background);color:var(--color-buttons-accept-text);padding:var(--spacing-sm) var(--spacing-xxl)}@keyframes fade-in-bottom{0%{opacity:0;transform:translate(-50%,-45%)}to{opacity:1;transform:translate(-50%,-50%)}}@keyframes fade-out-bottom{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(2.5%)}}');
  }), o("gTcQ9", function (e, t) {
    e.exports, e.exports = function () {
      "use strict";

      var e = Object.prototype.toString,
        t = Array.isArray || function (t) {
          return "[object Array]" === e.call(t);
        };
      function i(e) {
        return "function" == typeof e;
      }
      function a(e) {
        return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      }
      function n(e, t) {
        return null != e && "object" == _typeof(e) && t in e;
      }
      var o = RegExp.prototype.test,
        r = /\S/,
        s = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#x2F;",
          "`": "&#x60;",
          "=": "&#x3D;"
        },
        l = /\s*/,
        c = /\s+/,
        d = /\s*=/,
        p = /\s*\}/,
        g = /#|\^|\/|>|\{|&|=|!/;
      function m(e) {
        this.string = e, this.tail = e, this.pos = 0;
      }
      function u(e, t) {
        this.view = e, this.cache = {
          ".": this.view
        }, this.parent = t;
      }
      function h() {
        this.templateCache = {
          _cache: {},
          set: function set(e, t) {
            this._cache[e] = t;
          },
          get: function get(e) {
            return this._cache[e];
          },
          clear: function clear() {
            this._cache = {};
          }
        };
      }
      m.prototype.eos = function () {
        return "" === this.tail;
      }, m.prototype.scan = function (e) {
        var t = this.tail.match(e);
        if (!t || 0 !== t.index) return "";
        var i = t[0];
        return this.tail = this.tail.substring(i.length), this.pos += i.length, i;
      }, m.prototype.scanUntil = function (e) {
        var t,
          i = this.tail.search(e);
        switch (i) {
          case -1:
            t = this.tail, this.tail = "";
            break;
          case 0:
            t = "";
            break;
          default:
            t = this.tail.substring(0, i), this.tail = this.tail.substring(i);
        }
        return this.pos += t.length, t;
      }, u.prototype.push = function (e) {
        return new u(e, this);
      }, u.prototype.lookup = function (e) {
        var t = this.cache;
        if (t.hasOwnProperty(e)) r = t[e];else {
          for (var a, o, r, s, l, c, d = this, p = !1; d;) {
            if (e.indexOf(".") > 0) for (s = d.view, l = e.split("."), c = 0; null != s && c < l.length;) c === l.length - 1 && (p = n(s, l[c]) || (a = s, o = l[c], null != a && "object" != _typeof(a) && a.hasOwnProperty && a.hasOwnProperty(o))), s = s[l[c++]];else s = d.view[e], p = n(d.view, e);
            if (p) {
              r = s;
              break;
            }
            d = d.parent;
          }
          t[e] = r;
        }
        return i(r) && (r = r.call(this.view)), r;
      }, h.prototype.clearCache = function () {
        void 0 !== this.templateCache && this.templateCache.clear();
      }, h.prototype.parse = function (e, i) {
        var n = this.templateCache,
          s = e + ":" + (i || b.tags).join(":"),
          u = void 0 !== n,
          h = u ? n.get(s) : void 0;
        return void 0 == h && (h = function (e, i) {
          if (!e) return [];
          var n,
            s,
            u,
            h,
            v,
            x,
            f,
            w,
            y,
            k = !1,
            C = [],
            T = [],
            D = [],
            E = !1,
            F = !1,
            L = "",
            q = 0;
          function M() {
            if (E && !F) for (; D.length;) delete T[D.pop()];else D = [];
            E = !1, F = !1;
          }
          function z(e) {
            if ("string" == typeof e && (e = e.split(c, 2)), !t(e) || 2 !== e.length) throw Error("Invalid tags: " + e);
            n = RegExp(a(e[0]) + "\\s*"), s = RegExp("\\s*" + a(e[1])), u = RegExp("\\s*" + a("}" + e[1]));
          }
          z(i || b.tags);
          for (var I = new m(e); !I.eos();) {
            if (h = I.pos, x = I.scanUntil(n)) for (var _ = 0, B = x.length; _ < B; ++_) !function (e) {
              return !o.call(r, e);
            }(f = x.charAt(_)) ? (F = !0, k = !0, L += " ") : (D.push(T.length), L += f), T.push(["text", f, h, h + 1]), h += 1, "\n" === f && (M(), L = "", q = 0, k = !1);
            if (!I.scan(n)) break;
            if (E = !0, v = I.scan(g) || "name", I.scan(l), "=" === v ? (x = I.scanUntil(d), I.scan(d), I.scanUntil(s)) : "{" === v ? (x = I.scanUntil(u), I.scan(p), I.scanUntil(s), v = "&") : x = I.scanUntil(s), !I.scan(s)) throw Error("Unclosed tag at " + I.pos);
            if (w = ">" == v ? [v, x, h, I.pos, L, q, k] : [v, x, h, I.pos], q++, T.push(w), "#" === v || "^" === v) C.push(w);else if ("/" === v) {
              if (!(y = C.pop())) throw Error('Unopened section "' + x + '" at ' + h);
              if (y[1] !== x) throw Error('Unclosed section "' + y[1] + '" at ' + h);
            } else "name" === v || "{" === v || "&" === v ? F = !0 : "=" === v && z(x);
          }
          if (M(), y = C.pop()) throw Error('Unclosed section "' + y[1] + '" at ' + I.pos);
          return function (e) {
            for (var t, i = [], a = i, n = [], o = 0, r = e.length; o < r; ++o) switch ((t = e[o])[0]) {
              case "#":
              case "^":
                a.push(t), n.push(t), a = t[4] = [];
                break;
              case "/":
                n.pop()[5] = t[2], a = n.length > 0 ? n[n.length - 1][4] : i;
                break;
              default:
                a.push(t);
            }
            return i;
          }(function (e) {
            for (var t, i, a = [], n = 0, o = e.length; n < o; ++n) (t = e[n]) && ("text" === t[0] && i && "text" === i[0] ? (i[1] += t[1], i[3] = t[3]) : (a.push(t), i = t));
            return a;
          }(T));
        }(e, i), u && n.set(s, h)), h;
      }, h.prototype.render = function (e, t, i, a) {
        var n = this.getConfigTags(a),
          o = this.parse(e, n),
          r = t instanceof u ? t : new u(t, void 0);
        return this.renderTokens(o, r, i, e, a);
      }, h.prototype.renderTokens = function (e, t, i, a, n) {
        for (var o, r, s, l = "", c = 0, d = e.length; c < d; ++c) s = void 0, "#" === (r = (o = e[c])[0]) ? s = this.renderSection(o, t, i, a, n) : "^" === r ? s = this.renderInverted(o, t, i, a, n) : ">" === r ? s = this.renderPartial(o, t, i, n) : "&" === r ? s = this.unescapedValue(o, t) : "name" === r ? s = this.escapedValue(o, t, n) : "text" === r && (s = this.rawValue(o)), void 0 !== s && (l += s);
        return l;
      }, h.prototype.renderSection = function (e, a, n, o, r) {
        var s = this,
          l = "",
          c = a.lookup(e[1]);
        if (c) {
          if (t(c)) for (var d = 0, p = c.length; d < p; ++d) l += this.renderTokens(e[4], a.push(c[d]), n, o, r);else if ("object" == _typeof(c) || "string" == typeof c || "number" == typeof c) l += this.renderTokens(e[4], a.push(c), n, o, r);else if (i(c)) {
            if ("string" != typeof o) throw Error("Cannot use higher-order sections without the original template");
            null != (c = c.call(a.view, o.slice(e[3], e[5]), function (e) {
              return s.render(e, a, n, r);
            })) && (l += c);
          } else l += this.renderTokens(e[4], a, n, o, r);
          return l;
        }
      }, h.prototype.renderInverted = function (e, i, a, n, o) {
        var r = i.lookup(e[1]);
        if (!r || t(r) && 0 === r.length) return this.renderTokens(e[4], i, a, n, o);
      }, h.prototype.indentPartial = function (e, t, i) {
        for (var a = t.replace(/[^ \t]/g, ""), n = e.split("\n"), o = 0; o < n.length; o++) n[o].length && (o > 0 || !i) && (n[o] = a + n[o]);
        return n.join("\n");
      }, h.prototype.renderPartial = function (e, t, a, n) {
        if (a) {
          var o = this.getConfigTags(n),
            r = i(a) ? a(e[1]) : a[e[1]];
          if (null != r) {
            var s = e[6],
              l = e[5],
              c = e[4],
              d = r;
            0 == l && c && (d = this.indentPartial(r, c, s));
            var p = this.parse(d, o);
            return this.renderTokens(p, t, a, d, n);
          }
        }
      }, h.prototype.unescapedValue = function (e, t) {
        var i = t.lookup(e[1]);
        if (null != i) return i;
      }, h.prototype.escapedValue = function (e, t, i) {
        var a = this.getConfigEscape(i) || b.escape,
          n = t.lookup(e[1]);
        if (null != n) return "number" == typeof n && a === b.escape ? String(n) : a(n);
      }, h.prototype.rawValue = function (e) {
        return e[1];
      }, h.prototype.getConfigTags = function (e) {
        return t(e) ? e : e && "object" == _typeof(e) ? e.tags : void 0;
      }, h.prototype.getConfigEscape = function (e) {
        return e && "object" == _typeof(e) && !t(e) ? e.escape : void 0;
      };
      var b = {
          name: "mustache.js",
          version: "4.2.0",
          tags: ["{{", "}}"],
          clearCache: void 0,
          escape: void 0,
          parse: void 0,
          render: void 0,
          Scanner: void 0,
          Context: void 0,
          Writer: void 0,
          set templateCache(cache) {
            v.templateCache = cache;
          },
          get templateCache() {
            return v.templateCache;
          }
        },
        v = new h();
      return b.clearCache = function () {
        return v.clearCache();
      }, b.parse = function (e, t) {
        return v.parse(e, t);
      }, b.render = function (e, i, a, n) {
        if ("string" != typeof e) throw TypeError('Invalid template! Template should be a "string" but "' + (t(e) ? "array" : _typeof(e)) + '" was given as the first argument for mustache#render(template, view, partials)');
        return v.render(e, i, a, n);
      }, b.escape = function (e) {
        return String(e).replace(/[&<>"'`=\/]/g, function (e) {
          return s[e];
        });
      }, b.Scanner = m, b.Context = u, b.Writer = h, b;
    }();
  }), o("5iTGz", function (e, i) {
    t(e.exports, "focusEvents", function () {
      return n;
    });
    var a = /*#__PURE__*/function () {
      function a() {
        _classCallCheck(this, a);
        this.lockHandlers = new Map(), this.focusQueue = [];
      }
      return _createClass(a, [{
        key: "getFocusQueue",
        value: function getFocusQueue() {
          return this.focusQueue;
        }
      }, {
        key: "addFocusQueueId",
        value: function addFocusQueueId(e) {
          this.focusQueue.push("#".concat(e));
        }
      }, {
        key: "consumeFocusQueueId",
        value: function consumeFocusQueueId() {
          return this.focusQueue.pop();
        }
      }, {
        key: "attachFocusLock",
        value: function attachFocusLock(e, t) {
          var _this5 = this;
          var i,
            n = null == (i = document.getElementById("usercentrics-cmp-ui")) ? void 0 : i.shadowRoot,
            o = function o(e) {
              if (("Tab" === e.key || 9 === e.keyCode) && t && _this5.isVisible(t)) {
                var i = Array.from(t.querySelectorAll(a.FOCUSABLE_SELECTOR)),
                  o = ("0" === t.getAttribute("tabindex") ? [t].concat(i) : i).filter(function (e) {
                    return _this5.isVisible(e);
                  });
                if (o.length) {
                  e.stopPropagation();
                  var r = o[0],
                    s = o[o.length - 1],
                    l = null == n ? void 0 : n.activeElement,
                    c = o.indexOf(l);
                  e.shiftKey ? 0 === c ? (s.focus({
                    preventScroll: !0
                  }), e.preventDefault()) : c > 0 && o[c - 1] === t && (t.focus({
                    preventScroll: !0
                  }), e.preventDefault()) : c === o.length - 1 && (r.focus({
                    preventScroll: !0
                  }), e.preventDefault());
                }
              }
            },
            r = t.id,
            s = r ? this.lockHandlers.get(r) : void 0;
          s && s.target.removeEventListener("keydown", s.handler), e.addEventListener("keydown", o), r && this.lockHandlers.set(r, {
            target: e,
            handler: o
          });
        }
      }, {
        key: "isVisible",
        value: function isVisible(e) {
          var t = getComputedStyle(e);
          return "none" !== t.display && "hidden" !== t.visibility && (null !== e.offsetParent || "fixed" === t.position);
        }
      }]);
    }();
    a.FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    var n = new a();
  });
})();
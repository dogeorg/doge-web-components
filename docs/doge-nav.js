// import { setBasePath } from '../../resources/blocks/shoelace@2.12.0/utilities/base-path.js';

const resourceBasePath = "https://fetch.dogecoin.org/resources";

function dogeComponentInit() {
	// Ensures the page utilising the component has the base doge components stylesheet
	addStylesheetsIfNotPresent(stylesheetPaths);

	// Ensures components utilising elements from shoelace have an accurate shoelace basepath set.
	// setBasePath('https://fetch.dogecoin.org/resources/blocks/shoelace@2.12.0');
}

let stylesheetPaths = [
	`${resourceBasePath}/css/doge-components.css`,
];

function addStylesheetsIfNotPresent(stylesheetPaths) {
	try {

		const existingSheets = Array.from(document.styleSheets);

		stylesheetPaths.forEach((path) => {
			const sheetExists = existingSheets.some((sheet) => sheet.href === path);

			if (!sheetExists) {
				const newSheet = document.createElement("link");
				newSheet.setAttribute("rel", "stylesheet");
				newSheet.setAttribute("href", path);
				document.head.appendChild(newSheet);
			}
		});
	} catch (err) {
		console.error(err);
	}
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),e=new WeakMap;class n{constructor(t,s,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=s;}get styleSheet(){let t=this.i;const i=this.t;if(s&&void 0===t){const s=void 0!==i&&1===i.length;s&&(t=e.get(i)),void 0===t&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&e.set(i,t));}return t}toString(){return this.cssText}}const r=t=>new n("string"==typeof t?t:t+"",void 0,i),o=(t,...s)=>{const e=1===t.length?t[0]:s.reduce(((s,i,e)=>s+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[e+1]),t[0]);return new n(e,t,i)},h=(i,e)=>{if(s)i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const s of e){const e=document.createElement("style"),n=t.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=s.cssText,i.appendChild(e);}},c=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const i of t.cssRules)s+=i.cssText;return r(s)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:l,defineProperty:a,getOwnPropertyDescriptor:u,getOwnPropertyNames:d,getOwnPropertySymbols:f,getPrototypeOf:p}=Object,v=globalThis,y=v.trustedTypes,m=y?y.emptyScript:"",b=v.reactiveElementPolyfillSupport,g=(t,s)=>t,w={toAttribute(t,s){switch(s){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},_=(t,s)=>!l(t,s),S={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,s=S){if(s.state&&(s.attribute=!1),this.o(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),e=this.getPropertyDescriptor(t,i,s);void 0!==e&&a(this.prototype,t,e);}}static getPropertyDescriptor(t,s,i){const{get:e,set:n}=u(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);n.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static o(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(g("properties"))){const t=this.properties,s=[...d(t),...f(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this.u=new Map;for(const[t,s]of this.elementProperties){const i=this.p(t,s);void 0!==i&&this.u.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(t){const s=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)s.unshift(c(t));}else void 0!==t&&s.push(c(t));return s}static p(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._();}_(){this.S=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this.P??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this.P?.delete(t);}$(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return h(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this.P?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}C(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor.p(t,i);if(void 0!==e&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(s,i.type);this.m=t,null==n?this.removeAttribute(e):this.setAttribute(e,n),this.m=null;}}_$AK(t,s){const i=this.constructor,e=i.u.get(t);if(void 0!==e&&this.m!==e){const t=i.getPropertyOptions(e),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this.m=e,this[e]=n.fromAttribute(s,t.type),this.m=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??_)(this[t],s))return;this.T(t,s,i);}!1===this.isUpdatePending&&(this.S=this.A());}T(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this.m!==t&&(this.M??=new Set).add(t);}async A(){this.isUpdatePending=!0;try{await this.S;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(const[t,s]of this.v)this[t]=s;this.v=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.T(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this.P?.forEach((t=>t.hostUpdate?.())),this.update(s)):this.k();}catch(s){throw t=!1,this.k(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this.P?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}k(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return !0}update(t){this.M&&=this.M.forEach((t=>this.C(t,this[t]))),this.k();}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[g("elementProperties")]=new Map,$[g("finalized")]=new Map,b?.({ReactiveElement:$}),(v.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T=globalThis,x=T.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${(Math.random()+"").slice(9)}$`,A="?"+P,k=`<${A}>`,M=document,U=()=>M.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,R=t=>O(t)||"function"==typeof t?.[Symbol.iterator],N="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,j=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,W=t=>(s,...i)=>({_$litType$:t,strings:s,values:i}),Z=W(1),F=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),J=new WeakMap,K=M.createTreeWalker(M,129);function Y(t,s){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(s):s}const Q=(t,s)=>{const i=t.length-1,e=[];let n,r=2===s?"<svg>":"",o=z;for(let s=0;s<i;s++){const i=t[s];let h,c,l=-1,a=0;for(;a<i.length&&(o.lastIndex=a,c=o.exec(i),null!==c);)a=o.lastIndex,o===z?"!--"===c[1]?o=L:void 0!==c[1]?o=j:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=H):void 0!==c[3]&&(o=H):o===H?">"===c[0]?(o=n??z,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,h=c[1],o=void 0===c[3]?H:'"'===c[3]?D:I):o===D||o===I?o=H:o===L||o===j?o=z:(o=H,n=void 0);const u=o===H&&t[s+1].startsWith("/>")?" ":"";r+=o===z?i+k:l>=0?(e.push(h),i.slice(0,l)+C+i.slice(l)+P+u):i+P+(-2===l?s:u);}return [Y(t,r+(t[i]||"<?>")+(2===s?"</svg>":"")),e]};class X{constructor({strings:t,_$litType$:s},i){let e;this.parts=[];let n=0,r=0;const o=t.length-1,h=this.parts,[c,l]=Q(t,s);if(this.el=X.createElement(c,i),K.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(e=K.nextNode())&&h.length<o;){if(1===e.nodeType){if(e.hasAttributes())for(const t of e.getAttributeNames())if(t.endsWith(C)){const s=l[r++],i=e.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(s);h.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?nt:"?"===o[1]?rt:"@"===o[1]?ot:et}),e.removeAttribute(t);}else t.startsWith(P)&&(h.push({type:6,index:n}),e.removeAttribute(t));if(B.test(e.tagName)){const t=e.textContent.split(P),s=t.length-1;if(s>0){e.textContent=x?x.emptyScript:"";for(let i=0;i<s;i++)e.append(t[i],U()),K.nextNode(),h.push({type:2,index:++n});e.append(t[s],U());}}}else if(8===e.nodeType)if(e.data===A)h.push({type:2,index:n});else {let t=-1;for(;-1!==(t=e.data.indexOf(P,t+1));)h.push({type:7,index:n}),t+=P.length-1;}n++;}}static createElement(t,s){const i=M.createElement("template");return i.innerHTML=t,i}}function tt(t,s,i=t,e){if(s===F)return s;let n=void 0!==e?i.U?.[e]:i.N;const r=V(s)?void 0:s._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,e)),void 0!==e?(i.U??=[])[e]=n:i.N=n),void 0!==n&&(s=tt(t,n._$AS(t,s.values),n,e)),s}class st{constructor(t,s){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=s;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){const{el:{content:s},parts:i}=this._$AD,e=(t?.creationScope??M).importNode(s,!0);K.currentNode=e;let n=K.nextNode(),r=0,o=0,h=i[0];for(;void 0!==h;){if(r===h.index){let s;2===h.type?s=new it(n,n.nextSibling,this,t):1===h.type?s=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(s=new ht(n,this,t)),this._$AV.push(s),h=i[++o];}r!==h?.index&&(n=K.nextNode(),r++);}return K.currentNode=M,e}R(t){let s=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,s),s+=i.strings.length-2):i._$AI(t[s])),s++;}}class it{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,s,i,e){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=s,this._$AM=i,this.options=e,this.V=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const s=this._$AM;return void 0!==s&&11===t?.nodeType&&(t=s.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,s=this){t=tt(this,t,s),V(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==F&&this.L(t):void 0!==t._$litType$?this.I(t):void 0!==t.nodeType?this.j(t):R(t)?this.D(t):this.L(t);}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t));}L(t){this._$AH!==G&&V(this._$AH)?this._$AA.nextSibling.data=t:this.j(M.createTextNode(t)),this._$AH=t;}I(t){const{values:s,_$litType$:i}=t,e="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===e)this._$AH.R(s);else {const t=new st(e,this),i=t.O(this.options);t.R(s),this.j(i),this._$AH=t;}}_$AC(t){let s=J.get(t.strings);return void 0===s&&J.set(t.strings,s=new X(t)),s}D(t){O(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,e=0;for(const n of t)e===s.length?s.push(i=new it(this.H(U()),this.H(U()),this,this.options)):i=s[e],i._$AI(n),e++;e<s.length&&(this._$AR(i&&i._$AB.nextSibling,e),s.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s;}}setConnected(t){void 0===this._$AM&&(this.V=t,this._$AP?.(t));}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,s,i,e,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=s,this._$AM=e,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G;}_$AI(t,s=this,i,e){const n=this.strings;let r=!1;if(void 0===n)t=tt(this,t,s,0),r=!V(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else {const e=t;let o,h;for(t=n[0],o=0;o<n.length-1;o++)h=tt(this,e[i+o],s,o),h===F&&(h=this._$AH[o]),r||=!V(h)||h!==this._$AH[o],h===G?t=G:t!==G&&(t+=(h??"")+n[o+1]),this._$AH[o]=h;}r&&!e&&this.B(t);}B(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class nt extends et{constructor(){super(...arguments),this.type=3;}B(t){this.element[this.name]=t===G?void 0:t;}}class rt extends et{constructor(){super(...arguments),this.type=4;}B(t){this.element.toggleAttribute(this.name,!!t&&t!==G);}}class ot extends et{constructor(t,s,i,e,n){super(t,s,i,e,n),this.type=5;}_$AI(t,s=this){if((t=tt(this,t,s,0)??G)===F)return;const i=this._$AH,e=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==G&&(i===G||e);e&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class ht{constructor(t,s,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i;}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t);}}const lt=T.litHtmlPolyfillSupport;lt?.(X,it),(T.litHtmlVersions??=[]).push("3.1.2");const at=(t,s,i)=>{const e=i?.renderBefore??s;let n=e._$litPart$;if(void 0===n){const t=i?.renderBefore??null;e._$litPart$=n=new it(s.insertBefore(U(),t),t,void 0,i??{});}return n._$AI(t),n};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ut extends ${constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=at(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1);}render(){return F}}ut._$litElement$=!0,ut[("finalized")]=!0,globalThis.litElementHydrateSupport?.({LitElement:ut});const dt=globalThis.litElementPolyfillSupport;dt?.({LitElement:ut});(globalThis.litElementVersions??=[]).push("4.0.4");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut=t=>(...s)=>({_$litDirective$:t,values:s});class Vt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,s,i){this.nt=t,this._$AM=s,this.rt=i;}_$AS(t,s){return this.update(t,s)}update(t,s){return this.render(...s)}}
const Jt=Ut(
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Vt{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((s=>t[s])).join(" ")+" "}update(t,[s]){if(void 0===this.gt){this.gt=new Set,void 0!==t.strings&&(this.wt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!this.wt?.has(t)&&this.gt.add(t);return this.render(s)}const i=t.element.classList;for(const t of this.gt)t in s||(i.remove(t),this.gt.delete(t));for(const t in s){const e=!!s[t];e===this.gt.has(t)||this.wt?.has(t)||(e?(i.add(t),this.gt.add(t)):(i.remove(t),this.gt.delete(t)));}return F}});class ps extends Vt{constructor(t){if(super(t),this.bt=G,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===G||null==t)return this.kt=void 0,this.bt=t;if(t===F)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;const s=[t];return s.raw=s,this.kt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}ps.directiveName="unsafeHTML",ps.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ys extends ps{}ys.directiveName="unsafeSVG",ys.resultType=2;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");

class DogeNav extends ut {
  static styles = o`
    :host {
      width: 100%;
      display: block;
      position: fixed;
      top: 0px;
      z-index: 999;

      /* make themeable */
      background: var(--doge-black);
      font-size: 1.1rem;
    }
    header {
      margin: 0px auto;
      display: flex;
      max-height: 100px;
      width: 100%;
      max-width: 1440px;
      align-items: center;
      justify-content: space-between;

      color: #a9a9b3;
    }

    header .logo {
      display: inline-block;
      padding: 7px;
    }

    header div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      z-index: 99;
    }

    header nav {
      display: none;
      @media only screen and (min-width: 980px) {
        display: flex;
      }
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 0 15px;

      /* TODO: theme */
      font-family: var(--doge-font-fancy);
    }

    ::slotted(a),
    ::slotted(a:visited) {
      color: #a9a9b3;
      text-decoration: none;
      white-space: nowrap;
    }

    ::slotted(a) {
      display: inline-block;
      margin: 0 9px;
    }

    ::slotted(a:hover) {
      color: #ffffff;
      text-decoration: underline;
    }

    ::slotted(a[active]) {
      color: var(--doge-yellow);
      text-decoration: underline;
    }

    ::slotted(div) {
      margin: 1px 9px 0px 9px;
    }
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    dogeComponentInit();
   }

  render() {
    return Z`
      <header>
        <div>
          <slot name="brand" class="logo"></slot>
        </div>
        <nav>
          <slot></slot>
        </nav>
        <slot name="mobile"></slot>
      </header>
    `;
  }
}
customElements.define("doge-nav", DogeNav);

class DogeNavList extends ut {
  static styles = o`
    .wrapper {
      position: relative;
      overflow: visible;
      padding: 0px 9px;
    }

    .inner {
      position: absolute;
      background: var(--doge-black);
      display: none;
      right: 0px;
      text-align: right;
      padding-top: 18px;
      padding-bottom: 9px;
    }

    ::slotted(a),
    ::slotted(a:visited) {
      color: #a9a9b3;
      text-decoration: none;
    }

    ::slotted(a:first-child) {
      padding: 0px;
    }

    ::slotted(a) {
      padding: 4.5px 18px;
      white-space: nowrap;
      display: block;
    }

    ::slotted(a[active]) {
      display: block;
    }

    ::slotted(a:hover) {
      color: white;
      text-decoration: underline;
    }

    .wrapper:hover .inner {
      display: block;
    }

    .arrow {
      font-size: 1.1rem;
      position: absolute;
      top: 18px;
      right: -5px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return Z`
      <div class="wrapper">
        <slot name="selected"></slot>
        <div class="inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("doge-nav-list", DogeNavList);

class DogeSitePicker extends ut {
  static properties = {
    selected: { attribute: true, reflect: true },
    active: { attribute: true, reflect: true },
    spa: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = o`
    :host([active="true"]) .dropdown-content {
      display: block;
    }

    .wrapper {
      position: relative;
      display: inline-block;
      background-color: var(--doge-black);
    }

    .wrapper:hover .dropdown-content {
      display: block;
    }

    .dropdown-content.active {
      display: block;
    }

    .selected-item-wrap img {
      height: 42px;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      overflow: hidden;
      width: 285px;
      font-size: 1.1rem;
      line-height: 1.3;
    }
  `;

  constructor() {
    super();
    this.selected = "foundation";
    this.active = false;
    this.spa;
  }

  connectedCallback() {
    super.connectedCallback();
    dogeComponentInit();
  }

  _getURL() {
    switch (this.selected) {
      case "dogecoin":
        return "https://dogecoin.com";
      case "developers":
        return "https://dogecoin.org/developers";
      case "community":
        return "https://dogecoin.org/community";
      case "foundation":
        return "https://dogecoin.org";
    }
  }

  _itemClickHandler(e) {
    if (this.spa) {
      this.selected =
        e.target === e.currentTarget ? "container" : e.target.name;
    }
  }

  _logoClickHandler(e) {
    this.active = !this.active;
  }

  // Render the UI as a function of component state
  render() {
    return Z`
      <div class="wrapper">
        <a @click=${this._logoClickHandler} class="selected-item-wrap">
          <img
            src="https://fetch.dogecoin.org/resources/img/logos/text/logo-text-foundation.png"
            alt="${this.selected} logo ${this.spa}"
          />
        </a>
        <div class="dropdown-content" @click="${this._itemClickHandler}">
          <doge-site-picker-item
            name="dogecoin"
            spa=${this.spa}
          ></doge-site-picker-item>
          <doge-site-picker-item
            name="developers"
            spa=${this.spa}
          ></doge-site-picker-item>
          <doge-site-picker-item
            name="community"
            spa=${this.spa}
          ></doge-site-picker-item>
        </div>
      </div>
    `;
  }
}
customElements.define("doge-site-picker", DogeSitePicker);

class DogeSitePickerItem extends ut {
  static properties = {
    name: {},
    spa: {},
  };
  static styles = o`
    :host {
      /* selects the wrapping element eg: <doge-site-picker-item> */
    }

    a {
      color: black;
      text-decoration: none;
    }

    a.item {
      display: flex;
      align-items: center;
      text-align: left;
      padding: 12px 16px;
      flex-wrap: wrap;
    }

    a.item:hover {
      background-color: #ffc107;
      color: black;
    }

    .item-logo {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      flex-shrink: 0;
    }

    .item-text {
      flex-grow: 1;
    }

    .item-title {
      text-transform: capitalize;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-byline {
      font-size: smaller;
      color: #666;
      word-wrap: break-word;
      white-space: normal;
      font-family: var(--doge-font-fancy);
    }

    a.item.community:hover {
      background-color: #ff27a1;
    }

    a.item.developers:hover {
      background-color: #834aff;
    }

    a.item:hover .item-byline {
      color: #222;
    }
  `;

  constructor() {
    super();
  }

  getURL() {
    switch (this.name) {
      case "dogecoin":
        return "https://dogecoin.com";
      case "developers":
        return "https://dogecoin.org/developers";
      case "community":
        return "https://dogecoin.org/community";
      case "foundation":
        return "https://dogecoin.org";
    }
  }

  getByline() {
    switch (this.name) {
      case "dogecoin":
        return "The Fun and Friendly Internet Currency Pioneering the Way for Community-Driven Crypto!";
      case "developers":
        return "Unleashing Creativity, One Shibe at a Time: The hub for Dogecoin Developers.";
      case "community":
        return "Join the Pack: Dogecoin's Thriving Community - Where Camaraderie, Cryptocurrency and Memes Collide!";
    }
  }

  _linkClick(e) {
    if (this.spa) {
      e.preventDefault();
    }
  }

  // Render the UI as a function of component state
  render() {
    return Z`
      <a
        @click="${this._linkClick}"
        href="${this.getURL()}"
        class="item ${this.name}"
      >
        <img
          class="item-logo"
          src="${resourceBasePath}/img/logos/circle/logo-circle-${this
            .name}.png"
        />
        <div class="item-text">
          <div class="item-title">${this.name}</div>
          <div class="item-byline">${this.getByline()}</div>
        </div>
      </a>
    `;
  }
}
customElements.define("doge-site-picker-item", DogeSitePickerItem);

class DogeNavMobile extends ut {
  static styles = o`
    :host {
      @media only screen and (min-width: 980px) {
        display: none;
      }

      display: flex;
      font-size: 1.1rem;
      ::slotted(a),
    }
    .menu-trigger {
      @media only screen and (min-width: 980px) {
        display: none;
      }

      display: inline-block;
      margin-right: 15px;
      fill: currentColor;
      margin-top: 2px;

      cursor: pointer;
    }

    nav {
      @media only screen and (min-width: 980px) {
        display: none;
      }

      display: flex;
      flex-direction: column;
      text-align: right;
      font-family: var(--doge-font-fancy);
      
      position: absolute;
      top: 60px;
      right: 0px;
      z-index: 99;
      
      width: auto;
      
      background: black;
      padding: .5em .7em;

    }
    ::slotted(a) {
      padding:.3em;
    }

    ::slotted(a),
    ::slotted(a:visited) {
      color: #a9a9b3;
      text-decoration: none;
    }

    ::slotted(a:hover) {
      color: white;
      text-decoration: underline;
    }

    ::slotted(a[active]) {
      color: var(--doge-yellow);
      text-decoration: underline;
    }
    ::slotted(span) {
      display: block;
      margin-top: 1em;
          color: var(--doge-purple);
          font-family: sans-serif;
          font-size: 0.8rem;
          padding:.3em;
          padding-bottom: 0em;
      }
    .hidden {
      display: none;
    }
  `;

  static properties = {
    isListHidden: {}
  }

  constructor() {
    super();
    this.isListHidden = true;
  }

  connectedCallback() {
    super.connectedCallback();
      dogeComponentInit();
    }

    _handleNavMenuClick() {
      this.isListHidden = !this.isListHidden;
    }

  render() {
    const classes = { hidden: this.isListHidden };
    return Z`
      <span class="menu-trigger" @click=${this._handleNavMenuClick}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 18v1H0v-1h24zm0-6v1H0v-1h24zm0-6v1H0V6h24z" fill="#1040e2"></path><path d="M24 19H0v-1h24v1zm0-6H0v-1h24v1zm0-6H0V6h24v1z"></path></svg>
      </span>
      <nav class=${Jt(classes)}>
        <slot name="controls"></slot>
        <slot></slot>
      </nav>
    `;
  }
}
customElements.define("doge-nav-mobile", DogeNavMobile);

export { DogeNav, DogeNavList, DogeNavMobile, DogeSitePicker };

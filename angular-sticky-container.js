(function() {
    'use strict';

    angular.module('hj.stickyContainer', []);

    angular.module('hj.stickyContainer').constant('Hamster', Hamster);

    angular.module('hj.stickyContainer').service('customModernizr', ['$window', function($window) {
            /*! modernizr 3.0.0-alpha.3 (Custom Build) | MIT *
             * http://v3.modernizr.com/download/#-csspositionsticky-domprefixes-prefixed-prefixedcss-prefixes !*/
            return function(e,n,t){function r(e,n){return typeof e===n}function i(){var e,n,t,i,o,s,f;for(var a in h){if(e=[],n=h[a],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(i=r(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)s=e[o],f=s.split("."),1===f.length?Modernizr[f[0]]=i:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),Modernizr[f[0]][f[1]]=i),y.push((i?"":"no-")+f.join("-"))}}function o(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_.className=n)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function f(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function a(e,n){return!!~(""+e).indexOf(n)}function u(e,n){return function(){return e.apply(n,arguments)}}function l(e,n,t){var i;for(var o in e)if(e[o]in n)return t===!1?e[o]:(i=n[e[o]],r(i,"function")?u(i,t||n):i);return!1}function p(){var e=n.body;return e||(e=w("body"),e.fake=!0),e}function c(e,n,t,r){var i,o,s,f,a="modernizr",u=w("div"),l=p();if(parseInt(t,10))for(;t--;)s=w("div"),s.id=r?r[t]:a+(t+1),u.appendChild(s);return i=["&#173;",'<style id="s',a,'">',e,"</style>"].join(""),u.id=a,(l.fake?l:u).innerHTML+=i,l.appendChild(u),l.fake&&(l.style.background="",l.style.overflow="hidden",f=_.style.overflow,_.style.overflow="hidden",_.appendChild(l)),o=n(u,e),l.fake?(l.parentNode.removeChild(l),_.style.overflow=f,_.offsetHeight):u.parentNode.removeChild(u),!!o}function d(n,r){var i=n.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(f(n[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+f(n[i])+":"+r+")");return o=o.join(" or "),c("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function m(e,n,i,o){function f(){l&&(delete j.style,delete j.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var u=d(e,i);if(!r(u,"undefined"))return u}var l,p,c,m,v;for(j.style||(l=!0,j.modElem=w("modernizr"),j.style=j.modElem.style),c=e.length,p=0;c>p;p++)if(m=e[p],v=j.style[m],a(m,"-")&&(m=s(m)),j.style[m]!==t){if(o||r(i,"undefined"))return f(),"pfx"==n?m:!0;try{j.style[m]=i}catch(y){}if(j.style[m]!=v)return f(),"pfx"==n?m:!0}return f(),!1}function v(e,n,t,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),f=(e+" "+b.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?m(f,n,i,o):(f=(e+" "+S.join(s+" ")+s).split(" "),l(f,n,t))}var y=[],h=[],g={_version:"3.0.0-alpha.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){h.push({name:e,fn:n,options:t})},addAsyncTest:function(e){h.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=g,Modernizr=new Modernizr;var C=g._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];g._prefixes=C;var _=n.documentElement,x="Moz O ms Webkit",S=g._config.usePrefixes?x.toLowerCase().split(" "):[];g._domPrefixes=S;var w=function(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):n.createElement.apply(n,arguments)};Modernizr.addTest("csspositionsticky",function(){var e="position:",n="sticky",t=w("modernizr"),r=t.style;return r.cssText=e+C.join(n+";"+e).slice(0,-e.length),-1!==r.position.indexOf(n)});var b=g._config.usePrefixes?x.split(" "):[];g._cssomPrefixes=b;var z=function(n){var r,i=C.length,o=e.CSSRule;if("undefined"==typeof o)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+n;for(var s=0;i>s;s++){var f=C[s],a=f.toUpperCase()+"_"+r;if(a in o)return"@-"+f.toLowerCase()+"-"+n}return!1},E={elem:w("modernizr")};Modernizr._q.push(function(){delete E.elem});var j={style:E.elem.style};Modernizr._q.unshift(function(){delete j.style}),g.testAllProps=v;{var k=g.prefixed=function(e,n,t){return 0===e.indexOf("@")?z(e):(-1!=e.indexOf("-")&&(e=s(e)),n?v(e,n,t):v(e,"pfx"))};g.prefixedCSS=function(e){var n=k(e);return n&&f(n)}}i(),o(y),delete g.addTest,delete g.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();return Modernizr;}($window,$window.document);
    }]);

    angular.module('hj.stickyContainer').directive('hjStickyContainer', ['$window', '$document', 'Hamster', 'customModernizr',
        function($window, $document, Hamster, customModernizr) {
            return {
                restrict: 'A',
                link: function($scope, $element, $attrs) {

                    var defaults = {
                        targetSelector: '[hj-sticky-target]',
                        stickyClass: 'sticky',
                        leavingClass: 'sticky-leaving',
                        goneClass: 'sticky-gone',
                        translate: true
                    };

                    var options = angular.extend(defaults, $scope.$eval($attrs.hjStickyContainer));

                    var prefix = (function() {
                        var styles = window.getComputedStyle(document.documentElement, ''),
                            pre = (Array.prototype.slice
                                .call(styles)
                                .join('')
                                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                            )[1],
                            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
                        return {
                            dom: dom,
                            lowercase: pre,
                            css: '-' + pre + '-',
                            js: pre[0].toUpperCase() + pre.substr(1)
                        };
                    })();

                    // Normalise scrolling/wheel event (fixes jank)
                    var hamster = new Hamster($document[0].documentElement);
                    hamster.wheel(angular.noop);

                    var prefixedTransform = customModernizr.prefixed('transform');

                    var targets;

                    if (customModernizr.csspositionsticky) {
                        targets = angular.element($element[0].querySelectorAll(options.targetSelector));

                        angular.forEach(targets, function(target) {
                            var hjStickyScrollOffset = parseInt(angular.element(target).attr('hj-sticky-scroll-offset'));

                            target = angular.element(target);

                            target.css('position', 'sticky');
                            target.css('position', prefix.css + 'sticky');
                            target.css('top', hjStickyScrollOffset + 'px');
                        });

                        return;
                    }

                    var _parents = function(node, ps) {
                        if (node.parentNode === null) {
                            return ps;
                        }

                        return _parents(node.parentNode, ps.concat([node]));
                    };

                    var _style = function(node, prop) {
                        return $window.getComputedStyle(node, null).getPropertyValue(prop);
                    };

                    var _overflow = function(node) {
                        return _style(node, 'overflow') + _style(node, 'overflow-y') + _style(node, 'overflow-x');
                    };

                    var _scroll = function(node) {
                        return (/(auto|scroll)/).test(_overflow(node));
                    };

                    var scrollParent = function(node) {
                        if (!(node instanceof HTMLElement)) {
                            return;
                        }

                        var ps = _parents(node.parentNode, []);

                        for (var i = 0; i < ps.length; i += 1) {
                            if (_scroll(ps[i])) {
                                return ps[i];
                            }
                        }

                        return $window;
                    };

                    var scroller = scrollParent($element[0]);

                    scroller = scroller === $document[0].documentElement ? $window : scroller;

                    var findRect = function(obj) {
                        var obj2 = obj,
                            x = 0,
                            y = 0,
                            w, h;

                        while ((obj && obj.offsetParent) || (obj && obj.parentNode)) {
                            var style = $window.getComputedStyle(obj);

                            if (!w || !h) {
                                w = parseInt(style.getPropertyValue('width'), 10) - parseInt(style.getPropertyValue('padding-left'), 10) - parseInt(style.getPropertyValue('padding-right'), 10);
                                h = parseInt(style.getPropertyValue('height'), 10) - parseInt(style.getPropertyValue('padding-top'), 10) - parseInt(style.getPropertyValue('padding-bottom'), 10);
                            }

                            if (style.position === 'fixed') {
                                x += parseInt(style.left, 10) + $document[0].body.scrollLeft;
                                y += parseInt(style.top, 10) + $document[0].body.scrollTop;
                            } else {
                                x += obj.offsetLeft - obj.scrollLeft;
                                y += obj.offsetTop - obj.scrollTop;
                            }

                            obj = obj.offsetParent;
                            obj2 = obj2.parentNode;

                            while (obj2 !== obj && style.position !== 'fixed') {
                                x -= !isNaN(obj2.scrollLeft) ? obj2.scrollLeft : 0;
                                y -= !isNaN(obj2.scrollTop) ? obj2.scrollTop : 0;
                                obj2 = obj2.parentNode;
                            }
                        }

                        return [x, y, w, h];
                    };

                    var scroll = function() {

                        var rect = findRect($element[0]);
                        
                        targets = angular.element($element[0].querySelectorAll(options.targetSelector));

                        angular.forEach(targets, function(target) {

                            var hjStickyScrollOffset = parseInt(angular.element(target).attr('hj-sticky-scroll-offset')),
                                hjStickyElementOffset = parseInt(angular.element(target).attr('hj-sticky-element-offset')),
                                parentPaddingTop = parseInt(_style($element[0].parentNode, 'padding-top')),
                                top = parseInt(_style(target, 'top')),
                                marginTop = parseInt(_style(target, 'margin-top')),

                                scrollOffset = !isNaN(hjStickyScrollOffset) ? hjStickyScrollOffset :
                                !isNaN(parentPaddingTop) ? parentPaddingTop :
                                !isNaN(marginTop) ? marginTop : 0,

                                elOffset = !isNaN(hjStickyElementOffset) ? hjStickyElementOffset :
                                !isNaN(top) ? top :
                                !isNaN(marginTop) ? marginTop : 0,

                                elTop = rect[1] - scrollOffset,
                                elHeight = rect[3],

                                targetHeight = target.clientHeight;

                            if (elTop + elHeight < 0) {
                                $element
                                    .removeClass(options.stickyClass)
                                    .removeClass(options.leavingClass)
                                    .addClass(options.goneClass);

                            } else if (elTop + elHeight - targetHeight < 0) {
                                $element
                                    .removeClass(options.stickyClass)
                                    .removeClass(options.goneClass)
                                    .addClass(options.leavingClass);

                            } else if (elTop <= 0) {
                                $element
                                    .removeClass(options.goneClass)
                                    .removeClass(options.leavingClass)
                                    .addClass(options.stickyClass);

                            } else {
                                $element
                                    .removeClass(options.stickyClass)
                                    .removeClass(options.leavingClass)
                                    .removeClass(options.goneClass);
                            }

                            if (options.translate) {
                                if (elTop + elHeight - elOffset - targetHeight < 0) {
                                    target.style[prefixedTransform] = 'translateY(' + (elHeight - elOffset - targetHeight) + 'px)';

                                } else {
                                    target.style[prefixedTransform] = 'translateY(' + Math.max(0, 0 - elTop) + 'px)';
                                }
                            }

                        });

                    };

                    var throttleOnAnimationFrame = function(func) {
                        var timeout;
                        return function() {
                            var context = this,
                                args = arguments;
                            $window.cancelAnimationFrame(timeout);
                            timeout = $window.requestAnimationFrame(function() {
                                func.apply(context, args);
                                timeout = null;
                            });
                        };
                    };

                    var throttledScroll = throttleOnAnimationFrame(scroll);

                    var resize = function() {
                        throttledScroll();
                    };

                    resize();

                    angular.element($window).on('resize', resize);
                    angular.element(scroller).on('scroll', throttledScroll);

                    $scope.$on('$destroy', function() {
                        angular.element($window).off('resize', resize);
                        angular.element(scroller).off('scroll', throttledScroll);
                    });

                }
            };
        }
    ]);

})();

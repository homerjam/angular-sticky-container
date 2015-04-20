(function() {
    'use strict';

    angular.module('hj.stickyContainer', []);

    angular.module('hj.stickyContainer').constant('Hamster', Hamster);

    angular.module('hj.stickyContainer').service('customModernizr', ['$window', function($window) {
        /* Modernizr 2.8.3 (Custom Build) | MIT & BSD
         * Build: http://modernizr.com/download/#-touch-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
         */
        return function(a, b, c) {
            function y(a) {
                i.cssText = a
            }

            function z(a, b) {
                return y(l.join(a + ";") + (b || ""))
            }

            function A(a, b) {
                return typeof a === b
            }

            function B(a, b) {
                return !!~("" + a).indexOf(b)
            }

            function C(a, b) {
                for (var d in a) {
                    var e = a[d];
                    if (!B(e, "-") && i[e] !== c) return b == "pfx" ? e : !0
                }
                return !1
            }

            function D(a, b, d) {
                for (var e in a) {
                    var f = b[a[e]];
                    if (f !== c) return d === !1 ? a[e] : A(f, "function") ? f.bind(d || b) : f
                }
                return !1
            }

            function E(a, b, c) {
                var d = a.charAt(0).toUpperCase() + a.slice(1),
                    e = (a + " " + n.join(d + " ") + d).split(" ");
                return A(b, "string") || A(b, "undefined") ? C(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), D(e, b, c))
            }
            var d = "2.8.3",
                e = {},
                f = b.documentElement,
                g = "modernizr",
                h = b.createElement(g),
                i = h.style,
                j, k = {}.toString,
                l = " -webkit- -moz- -o- -ms- ".split(" "),
                m = "Webkit Moz O ms",
                n = m.split(" "),
                o = m.toLowerCase().split(" "),
                p = {},
                q = {},
                r = {},
                s = [],
                t = s.slice,
                u, v = function(a, c, d, e) {
                    var h, i, j, k, l = b.createElement("div"),
                        m = b.body,
                        n = m || b.createElement("body");
                    if (parseInt(d, 10))
                        while (d--) j = b.createElement("div"), j.id = e ? e[d] : g + (d + 1), l.appendChild(j);
                    return h = ["&#173;", '<style id="s', g, '">', a, "</style>"].join(""), l.id = g, (m ? l : n).innerHTML += h, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = f.style.overflow, f.style.overflow = "hidden", f.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), f.style.overflow = k), !!i
                },
                w = {}.hasOwnProperty,
                x;
            !A(w, "undefined") && !A(w.call, "undefined") ? x = function(a, b) {
                return w.call(a, b)
            } : x = function(a, b) {
                return b in a && A(a.constructor.prototype[b], "undefined")
            }, Function.prototype.bind || (Function.prototype.bind = function(b) {
                var c = this;
                if (typeof c != "function") throw new TypeError;
                var d = t.call(arguments, 1),
                    e = function() {
                        if (this instanceof e) {
                            var a = function() {};
                            a.prototype = c.prototype;
                            var f = new a,
                                g = c.apply(f, d.concat(t.call(arguments)));
                            return Object(g) === g ? g : f
                        }
                        return c.apply(b, d.concat(t.call(arguments)))
                    };
                return e
            }), p.touch = function() {
                var c;
                return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : v(["@media (", l.join("touch-enabled),("), g, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                    c = a.offsetTop === 9
                }), c
            };
            for (var F in p) x(p, F) && (u = F.toLowerCase(), e[u] = p[F](), s.push((e[u] ? "" : "no-") + u));
            return e.addTest = function(a, b) {
                if (typeof a == "object")
                    for (var d in a) x(a, d) && e.addTest(d, a[d]);
                else {
                    a = a.toLowerCase();
                    if (e[a] !== c) return e;
                    b = typeof b == "function" ? b() : b, typeof enableClasses != "undefined" && enableClasses && (f.className += " " + (b ? "" : "no-") + a), e[a] = b
                }
                return e
            }, y(""), h = j = null, e._version = d, e._prefixes = l, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function(a) {
                return C([a])
            }, e.testAllProps = E, e.testStyles = v, e.prefixed = function(a, b, c) {
                return b ? E(a, b, c) : E(a, "pfx")
            }, e
        }($window, $window.document);
    }]);

    angular.module('hj.stickyContainer').directive('hjStickyContainer', ['$window', '$document', 'Hamster', 'customModernizr',
        function($window, $document, Hamster, customModernizr) {
            return {
                restrict: 'A',
                link: function($scope, $element, $attrs) {

                    // Normalise scrolling/wheel event (fixes jank)
                    var hamster = new Hamster($document[0].documentElement);
                    hamster.wheel(angular.noop);

                    var prefixedTransform = customModernizr.prefixed('transform');

                    var defaults = {
                        targetSelector: '[hj-sticky-target]',
                        stickyClass: 'sticky',
                        leavingClass: 'sticky-leaving',
                        goneClass: 'sticky-gone',
                        translate: true
                    };

                    var options = angular.extend(defaults, $scope.$eval($attrs.hjStickyContainer));

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

                        var rect = findRect($element[0]),
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

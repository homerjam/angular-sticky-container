(function () {
  'use strict';

  angular.module('hj.stickyContainer', [])

    .directive('hjStickyContainer', ['$window', '$document', '$timeout', 'customModernizr',
      function ($window, $document, $timeout, customModernizr) {
        return {
          restrict: 'A',
          link: function ($scope, $element, $attrs) {

            var defaults = {
              targetSelector: '[hj-sticky-target]',
              stickyClass: 'sticky',
              leavingClass: 'sticky-leaving',
              goneClass: 'sticky-gone',
              enableTranslate: true,
              enableSticky: true,
            };

            var options = angular.extend(defaults, $scope.$eval($attrs.hjStickyContainer));

            var prefix = (function () {
              var styles = window.getComputedStyle(document.documentElement, '');
              var pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                )[1];
              var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
              return {
                dom: dom,
                lowercase: pre,
                css: '-' + pre + '-',
                js: pre[0].toUpperCase() + pre.substr(1),
              };
            })();

            // Normalise scrolling/wheel event (fixes some jank)
            var hamster = new Hamster($document[0].documentElement);
            hamster.wheel(angular.noop);

            var prefixedTransform = customModernizr.prefixed('transform');

            var targets;

            if (customModernizr.csspositionsticky && options.enableSticky) {
              targets = angular.element($element[0].querySelectorAll(options.targetSelector));

              angular.forEach(targets, function (target) {
                var hjStickyScrollOffset = parseInt(angular.element(target).attr('hj-sticky-scroll-offset')) || 0;

                target = angular.element(target);

                target.css('position', 'sticky');
                target.css('position', prefix.css + 'sticky');
                target.css('top', hjStickyScrollOffset + 'px');
              });
            }

            var _parents = function (node, ps) {
              if (node.parentNode === null) {
                return ps;
              }

              return _parents(node.parentNode, ps.concat([node]));
            };

            var _style = function (node, prop) {
              return $window.getComputedStyle(node, null).getPropertyValue(prop);
            };

            var _overflow = function (node) {
              return _style(node, 'overflow') + _style(node, 'overflow-y') + _style(node, 'overflow-x');
            };

            var _scroll = function (node) {
              return (/(auto|scroll)/).test(_overflow(node));
            };

            var scrollParent = function (node) {
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

            var findRect = function (obj) {
              var obj2 = obj;
              var x = 0;
              var y = 0;
              var w = 0;
              var h = 0;

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

            var checkPosition = function () {

              var rect = findRect($element[0]);

              targets = angular.element($element[0].querySelectorAll(options.targetSelector));

              angular.forEach(targets, function (target) {

                var hjStickyScrollOffset = parseInt(angular.element(target).attr('hj-sticky-scroll-offset'));
                var hjStickyElementOffset = parseInt(angular.element(target).attr('hj-sticky-element-offset'));
                var parentPaddingTop = $element[0].parentNode ? parseInt(_style($element[0].parentNode, 'padding-top')) : 0;
                var top = parseInt(_style(target, 'top'));
                var marginTop = parseInt(_style(target, 'margin-top'));

                var scrollOffset = !isNaN(hjStickyScrollOffset) ? hjStickyScrollOffset :
                  !isNaN(parentPaddingTop) ? parentPaddingTop :
                    !isNaN(marginTop) ? marginTop : 0;

                var elOffset = !isNaN(hjStickyElementOffset) ? hjStickyElementOffset :
                  !isNaN(top) ? top :
                    !isNaN(marginTop) ? marginTop : 0;

                var elTop = rect[1] - scrollOffset;
                var elHeight = rect[3];

                var targetHeight = target.clientHeight;

                if (elTop + elHeight < 0) {
                  $element
                    .removeClass(options.stickyClass)
                    .removeClass(options.leavingClass)
                    .addClass(options.goneClass);

                } else if (elTop + (elHeight - targetHeight) < 0) {
                  $element
                    .removeClass(options.stickyClass)
                    .removeClass(options.goneClass)
                    .addClass(options.leavingClass);

                } else {
                  $element
                    .removeClass(options.leavingClass)
                    .removeClass(options.goneClass)
                    .addClass(options.stickyClass);
                }

                if (options.enableTranslate && !customModernizr.csspositionsticky) {
                  if (elTop + elHeight - elOffset - targetHeight < 0) {
                    target.style[prefixedTransform] = 'translateY(' + (elHeight - elOffset - targetHeight) + 'px)';

                  } else {
                    target.style[prefixedTransform] = 'translateY(' + Math.max(0, 0 - elTop) + 'px)';
                  }
                }

              });

            };

            var throttleOnAnimationFrame = function (func) {
              var timeout;
              return function () {
                var context = this;
                var args = arguments;
                $window.cancelAnimationFrame(timeout);
                timeout = $window.requestAnimationFrame(function () {
                  func.apply(context, args);
                  timeout = null;
                });
              };
            };

            var throttledCheckPosition = throttleOnAnimationFrame(checkPosition);

            var resize = function () {
              throttledCheckPosition();
            };

            checkPosition();

            angular.element($window).on('resize', resize);
            angular.element(scroller).on('scroll', throttledCheckPosition);

            $scope.$on('$destroy', function () {
              angular.element($window).off('resize', resize);
              angular.element(scroller).off('scroll', throttledCheckPosition);
            });

          }
        };
      }
    ]);

})();

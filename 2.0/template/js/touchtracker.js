// Generated by CoffeeScript 1.8.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.TouchTracker = (function() {
    function TouchTracker(element, params) {
      var _ref, _ref1, _ref2, _ref3, _ref4;
      this.element = element;
      if (params == null) {
        params = {};
      }
      this.touchEndHandler = __bind(this.touchEndHandler, this);
      this.touchStartHandler = __bind(this.touchStartHandler, this);
      this.tapThreshold = (_ref = params.tapThreshold) != null ? _ref : 20;
      this.tapTimeoud = (_ref1 = params.tapTimeoud) != null ? _ref1 : 500;
      this.tapSlideOff = (_ref2 = params.tapSlideOff) != null ? _ref2 : false;
      this.swipeThreshold = (_ref3 = params.swipeThreshold) != null ? _ref3 : 300;
      this.swipeSlideOff = (_ref4 = params.swipeSlideOff) != null ? _ref4 : false;
      ({
        startX: (function(_this) {
          return function() {
            return 0;
          };
        })(this),
        startY: (function(_this) {
          return function() {
            return 0;
          };
        })(this),
        endX: (function(_this) {
          return function() {
            return 0;
          };
        })(this),
        endY: (function(_this) {
          return function() {
            return 0;
          };
        })(this)
      });
      this.element.bind("touchstart", (function(_this) {
        return function(e) {
          return _this.touchStartHandler(e);
        };
      })(this));
      this.element.bind("touchend", (function(_this) {
        return function(e) {
          return _this.touchEndHandler(e);
        };
      })(this));
    }

    TouchTracker.prototype.touchStartHandler = function(e) {
      this.startX = e.originalEvent.targetTouches[0].pageX;
      return this.startY = e.originalEvent.targetTouches[0].pageY;
    };

    TouchTracker.prototype.touchEndHandler = function(e) {
      var distance, swipeEvent;
      this.endX = e.originalEvent.changedTouches[0].pageX;
      this.endY = e.originalEvent.changedTouches[0].pageY;
      distance = Math.sqrt(Math.pow(this.startX - this.endX, 2) + Math.pow(this.startY - this.endY, 2));
      console.log("Distance: ", distance);
      swipeEvent = distance > this.swipeThreshold ? "Yes" : "No";
      return console.log("Swipe Event? ", swipeEvent);
    };

    return TouchTracker;

  })();

  jQuery(function() {});

}).call(this);

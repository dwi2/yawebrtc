(function(exports) {
  var mozLove = navigator.mozGetUserMedia;

  navigator.gUM = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  var VideoController = function vc_ctor(elem, halfWidth) {
    if (elem) {
      this._element = elem;
      if (halfWidth) {
        this._element.width = window.innerWidth / 2;
      } else {
        this._element.width = window.innerWidth;
      }
    } else {
      throw new Error('No video element');
    }
  };

  VideoController.prototype = {
    _element: undefined,
    _onSuccess: function(stream) {
      var that = this;
      if (mozLove) {
        that._element.mozSrcObject = stream;
      } else {
        that._element.src = window.URL.createObjectURL(stream);
      }
      that._element.onloadedmetadata = function(e) {
         // Do something with the video here.
         that._element.play();
      };
    },
    _onError: function(error) {
      console.warn('Error occurs: ' + error);
      console.dir(error);
    },
    start: function() {
      navigator.gUM({video: true},
        this._onSuccess.bind(this),
        this._onError.bind(this));
      return this;
    },
    stop: function() {
      this._element.stop();
    }
  };

  exports.VideoController = VideoController;
}(window));
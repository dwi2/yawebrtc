(function(exports) {
  var remoteVideoElement = document.getElementById('remote-video'),
    remoteVideo = new VideoController(remoteVideoElement);

  remoteVideo.start();
}(window));
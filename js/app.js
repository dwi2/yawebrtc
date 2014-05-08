(function(exports) {
  var remoteVideoElement = document.getElementById('remote-video'),
    localVideoElement = document.getElementById('local-video'),
    localNameElement = document.getElementById('local-name'),
    localName = undefined,
    loginButton = document.getElementById('login'),
    logoutButton = document.getElementById('logout'),
    state = 'logout',
    peer = undefined,
    peerId = undefined;

  // register event
  localNameElement.addEventListener('keyup', function (evt) {
    if (localNameElement.value && localNameElement.value.length > 0) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  });

  loginButton.addEventListener('click', function (evt) {
    localName = localNameElement.value;
    logoutButton.disabled = false;
    peer = new Peer({host: 'b2g.dwi2.com', port: 9000, key: 'webrtc'});
    peer.on('open', function(id) {
      peerId = id;
      document.getElementById('local-peer-id').textContent = peerId;
      state = 'login';
    });
  });

  logoutButton.addEventListener('click', function (evt) {
    if (state !== 'logout') {
      peer.disconnect();
      document.getElementById('local-peer-id').textContent = '';
      logoutButton.disabled = true;
    }
  });

}(window));
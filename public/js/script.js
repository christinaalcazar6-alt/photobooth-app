let localStream = null;
let peer = null;
let currentCall = null;
let capturedCanvases = [];

const myPeerIdEl = document.getElementById('my-peer-id');
const remotePeerIdInput = document.getElementById('remote-peer-id');
const connectBtn = document.getElementById('connect-btn');
const copyBtn = document.getElementById('copy-btn');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const snapBtn = document.getElementById('snap-btn');
const countdownEl = document.getElementById('countdown-display');
const stripSection = document.getElementById('strip-section');
const stripPhotosContainer = document.getElementById('strip-photos-container');
const stripDate = document.getElementById('strip-date');
const downloadBtn = document.getElementById('download-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize Local Webcam
async function initWebcam() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
  } catch (err) {
    alert('Unable to access webcam/microphone: ' + err.message);
  }
}

// Initialize PeerJS
function initPeer() {
  peer = new Peer();

  peer.on('open', (id) => {
    myPeerIdEl.innerText = id;
  });

  // Handle incoming calls
  peer.on('call', (call) => {
    call.answer(localStream);
    currentCall = call;
    call.on('stream', (remoteStream) => {
      remoteVideo.srcObject = remoteStream;
    });
  });
}

// Connect to Partner
connectBtn.addEventListener('click', () => {
  const remoteId = remotePeerIdInput.value.trim();
  if (!remoteId) return alert('Please enter your partner ID');

  const call = peer.call(remoteId, localStream);
  currentCall = call;

  call.on('stream', (remoteStream) => {
    remoteVideo.srcObject = remoteStream;
  });
});

// Copy ID Button
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(myPeerIdEl.innerText);
  alert('Peer ID copied to clipboard!');
});

// Take 4 Pictures with Countdown
snapBtn.addEventListener('click', async () => {
  capturedCanvases = [];
  stripPhotosContainer.innerHTML = '';
  snapBtn.disabled = true;

  for (let i = 0; i < 4; i++) {
    await countdown(3);
    capturePairPhoto();
  }

  countdownEl.innerText = 'Done!';
  snapBtn.disabled = false;
  renderStrip();
});

function countdown(seconds) {
  return new Promise((resolve) => {
    let counter = seconds;
    countdownEl.innerText = counter;
    const interval = setInterval(() => {
      counter--;
      if (counter > 0) {
        countdownEl.innerText = counter;
      } else {
        clearInterval(interval);
        countdownEl.innerText = '📸 CHEESE!';
        setTimeout(resolve, 500);
      }
    }, 1000);
  });
}

// Combine Local and Remote Video Frame into one Canvas
function capturePairPhoto() {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');

  // Draw local video (Left side)
  if (localVideo.readyState === localVideo.HAVE_ENOUGH_DATA) {
    ctx.drawImage(localVideo, 0, 0, 320, 240);
  }

  // Draw remote video (Right side)
  if (remoteVideo.readyState === remoteVideo.HAVE_ENOUGH_DATA) {
    ctx.drawImage(remoteVideo, 320, 0, 320, 240);
  } else {
    // Fill blank if partner hasn't connected
    ctx.fillStyle = '#ccc';
    ctx.fillRect(320, 0, 320, 240);
  }

  capturedCanvases.push(canvas);
}

// Render Photo Strip View
function renderStrip() {
  stripSection.classList.remove('hidden');
  stripDate.innerText = new Date().toLocaleDateString();

  capturedCanvases.forEach((canvas) => {
    stripPhotosContainer.appendChild(canvas);
  });
}

// Apply Filter to Canvases00:10
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');
    capturedCanvases.forEach((canvas) => {
      canvas.style.filter = filterValue;
    });
  });
});

// Download Feature
downloadBtn.addEventListener('click', () => {
  const finalCanvas = document.createElement('canvas');
  const ctx = finalCanvas.getContext('2d');

  finalCanvas.width = 280;
  finalCanvas.height = 1050;

  // Background
  ctx.fillStyle = '#f8bbd0';
  ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

  // Title
  ctx.fillStyle = '#880e4f';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('US PHOTOBOOTH', 140, 40);

  // Draw images
  const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
  let yOffset = 60;

  capturedCanvases.forEach((c) => {
    ctx.filter = activeFilter;
    ctx.drawImage(c, 20, yOffset, 240, 180);
    ctx.filter = 'none';
    yOffset += 190;
  });

  // Footer
  ctx.fillStyle = '#880e4f';
  ctx.font = '14px sans-serif';
  ctx.fillText(new Date().toLocaleDateString(), 140, yOffset + 30);

  // Trigger Download
  const link = document.createElement('a');
  link.download = 'photobooth-strip.png';
  link.href = finalCanvas.toDataURL('image/png');
  link.click();
});

// Start camera on load
initWebcam();
initPeer();
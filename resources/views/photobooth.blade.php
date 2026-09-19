<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Virtual Photobooth</title>
  <link rel="stylesheet" href="{{ asset('css/styles.css') }}" />
  <script src="https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js"></script>
</head>
<body>
  <div class="app-container">
    <header>
      <h1>Virtual Photobooth</h1>
      <p>Take pictures together no matter the distance!</p>
    </header>

    <!-- Connection Section -->
    <section id="setup-section" class="card">
      <div class="connection-box">
        <h3>1. Your Connection ID:</h3>
        <div class="id-display">
          <span id="my-peer-id">Generating ID...</span>
          <button id="copy-btn">Copy ID</button>
        </div>
      </div>

      <div class="connection-box">
        <h3>2. Connect to Your Partner:</h3>
        <input type="text" id="remote-peer-id" placeholder="Paste partner's ID here" />
        <button id="connect-btn">Connect Video</button>
      </div>
    </section>

    <!-- Video Booth Section -->
    <section id="booth-section" class="card">
      <div class="video-grid">
        <div class="video-wrapper">
          <video id="local-video" autoplay playsinline muted></video>
          <span>You</span>
        </div>
        <div class="video-wrapper">
          <video id="remote-video" autoplay playsinline></video>
          <span>Partner</span>
        </div>
      </div>

      <div class="controls">
        <button id="snap-btn" class="primary-btn">📸 Capture Photo Strip</button>
        <span id="countdown-display"></span>
      </div>
    </section>

    <!-- Filter & Preview Section -->
    <section id="strip-section" class="card hidden">
      <h2>Your Photo Strip</h2>
      
      <div class="filter-options">
        <button class="filter-btn active" data-filter="none">Normal</button>
        <button class="filter-btn" data-filter="grayscale(100%)">Mono</button>
        <button class="filter-btn" data-filter="sepia(60%) contrast(110%)">Retro</button>
        <button class="filter-btn" data-filter="contrast(120%) brightness(90%)">Film</button>
      </div>

      <div class="strip-container" id="photo-strip">
        <div id="strip-header">OUR PHOTOBOOTH</div>
        <div class="strip-photos" id="strip-photos-container"></div>
        <div id="strip-footer">
          <span id="strip-date"></span>
          <small>Long Distance Memories</small>
        </div>
      </div>

      <button id="download-btn" class="primary-btn">Download Photo Strip</button>
    </section>
  </div>

  <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>
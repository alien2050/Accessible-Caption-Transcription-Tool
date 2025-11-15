// Web Speech API (with webkit prefix fallback for Chrome)
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const unsupportedEl = document.getElementById("unsupported");
const toggleBtn = document.getElementById("toggleBtn");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const spotlightEl = document.getElementById("spotlightText");
const historyEl = document.getElementById("historyTranscript");
const downloadBtn = document.getElementById("downloadBtn");

const MAX_CAPTION_WORDS = 20;

// Stores all final entries for download/history
const transcriptEntries = [];

// Rolling buffer of words shown in the caption
let captionWords = [];

// ---------------- Helpers: caption & limits ----------------

function getMaxWords() {
  return MAX_CAPTION_WORDS;
}

function showPlaceholder() {
  spotlightEl.textContent = "Waiting for speech…";
  spotlightEl.classList.add("spotlight-placeholder");
}

function updateSpotlightFromWords() {
  if (!captionWords.length) {
    showPlaceholder();
    return;
  }

  // Set content from words
  spotlightEl.textContent = captionWords.join(" ");
  spotlightEl.classList.remove("spotlight-placeholder");

  // Enforce that it fits visually in the box.
  // If there's overflow, drop words from the front until it fits.
  // Make sure .spotlight-box/.spotlightText has fixed height + overflow hidden/auto in CSS.
  let safety = 200; // avoid infinite loop just in case

  while (
    captionWords.length > 1 &&
    spotlightEl.scrollHeight > spotlightEl.clientHeight &&
    safety > 0
  ) {
    captionWords.shift();
    spotlightEl.textContent = captionWords.join(" ");
    safety--;
  }
}

function resetCaptionWords() {
  captionWords = [];
  updateSpotlightFromWords();
}

function addFinalTextToCaption(text) {
  const newWords = (text || "")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);

  if (!newWords.length) return;

  // Append new words
  captionWords.push(...newWords);

  // Soft cap by configured limit
  const maxWords = getMaxWords();
  if (captionWords.length > maxWords) {
    captionWords = captionWords.slice(-maxWords);
  }

  // Then adjust using DOM overflow to guarantee it fits
  updateSpotlightFromWords();
}

// ---------------- History / status helpers ----------------

function appendToHistory(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return;

  const lastEntry = transcriptEntries[transcriptEntries.length - 1];
  if (lastEntry && lastEntry === trimmed) return;

  transcriptEntries.push(trimmed);

  const line = document.createElement("div");
  line.className = "history-line";
  line.textContent = trimmed;
  historyEl.appendChild(line);

  historyEl.scrollTop = historyEl.scrollHeight;
  downloadBtn.disabled = transcriptEntries.length === 0;
}

function setStatus(state, message) {
  statusText.textContent = message;
  statusDot.classList.remove("listening", "error");
  if (state === "listening") statusDot.classList.add("listening");
  if (state === "error") statusDot.classList.add("error");
}

// ---------------- Main speech logic ----------------
if (!SpeechRecognition) {
  unsupportedEl.style.display = "block";
  toggleBtn.disabled = true;
  downloadBtn.disabled = true;
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Keep listening
  recognition.interimResults = true; // Show partial results in real time
  recognition.lang = "en-GB";

  let isListening = false;
  let restartPending = false;

  function safelyStopRecognition() {
    try {
      recognition.stop();
    } catch (err) {
      console.error("Failed to stop recognition:", err);
    }
  }

  toggleBtn.addEventListener("click", () => {
    if (!isListening) {
      try {
        recognition.start();
        isListening = true;
        restartPending = false;
        toggleBtn.textContent = "Stop listening";
        toggleBtn.classList.add("listening");
        setStatus("listening", "Listening…");
      } catch (err) {
        console.error(err);
      }
    } else {
      isListening = false;
      restartPending = false;
      safelyStopRecognition();
      toggleBtn.textContent = "Start listening";
      toggleBtn.classList.remove("listening");
      setStatus("idle", "Stopped");
      resetCaptionWords();
    }
  });

  recognition.onresult = (event) => {
    let interimText = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const text = result[0].transcript.trim();

      if (result.isFinal) {
        if (text) {
          const lastEntry = transcriptEntries[transcriptEntries.length - 1];
          if (lastEntry && lastEntry === text) {
            continue;
          }

          // Store full phrase in history (unchanged)
          appendToHistory(text);

          // Add final words to rolling caption, fitted to box
          addFinalTextToCaption(text);
        }
      } else {
        // Interim (live) text preview
        interimText += text + " ";
      }
    }

    const interimTrimmed = interimText.trim();

    // Interim preview *overrides* caption visually but does NOT update captionWords
    if (interimTrimmed) {
      spotlightEl.textContent = interimTrimmed;
      spotlightEl.classList.remove("spotlight-placeholder");
    } else {
      // No interim: fall back to rolling caption
      updateSpotlightFromWords();
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event);

    // Some errors are transient; don't always kill listening.
    if (event.error === "no-speech" || event.error === "network") {
      setStatus("error", `Error: ${event.error} – trying to restart…`);
      if (isListening && !restartPending) {
        restartPending = true;
        safelyStopRecognition();
      }
    } else {
      // Fatal-ish errors
      setStatus("error", `Error: ${event.error}`);
      isListening = false;
      restartPending = false;
      safelyStopRecognition();
      toggleBtn.textContent = "Start listening";
      toggleBtn.classList.remove("listening");
    }
  };

  recognition.onend = () => {
    if (isListening) {
      setStatus("idle", "Restarting…");
      restartPending = false;
      try {
        recognition.start();
        setStatus("listening", "Listening…");
      } catch (err) {
        console.error("Failed to restart recognition:", err);
        setStatus("error", "Could not restart listening");
        isListening = false;
        toggleBtn.textContent = "Start listening";
        toggleBtn.classList.remove("listening");
      }
    } else {
      setStatus("idle", "Idle");
    }
  };

  resetCaptionWords();
}

// ---------------- Download transcript ----------------
downloadBtn.addEventListener("click", () => {
  if (!transcriptEntries.length) return;

  const blob = new Blob([transcriptEntries.join("\n")], { type: "text/plain" });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  link.href = blobUrl;
  link.download = `transcript-${timestamp}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
});

let skipTime = 15;
let forwardKey = "k";
let backwardKey = "j";

chrome.storage.sync.get(["skipTime", "forwardKey", "backwardKey"], (data) => {
  skipTime = data.skipTime !== undefined ? data.skipTime : 15;
  forwardKey = data.forwardKey || "k";
  backwardKey = data.backwardKey || "j";
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") {
    if (changes.skipTime) {
      skipTime = changes.skipTime.newValue;
    }
    if (changes.forwardKey) {
      forwardKey = changes.forwardKey.newValue;
    }
    if (changes.backwardKey) {
      backwardKey = changes.backwardKey.newValue;
    }
  }
});

document.addEventListener("keydown", (e) => {
  const video = document.querySelector("video");
  if (!video) return;
  if (e.key === forwardKey) {
    video.currentTime += skipTime;
  } else if (e.key === backwardKey) {
    video.currentTime -= skipTime;
  }
});

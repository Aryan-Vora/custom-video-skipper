let skipTime = 15;

chrome.storage.sync.get("skipTime", (data) => {
  if (data.skipTime) skipTime = data.skipTime;
  console.log("Initial skipTime:", skipTime);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.skipTime) {
    skipTime = changes.skipTime.newValue;
    console.log("Updated skipTime:", skipTime);
  }
});

document.addEventListener("keydown", (e) => {
  const video = document.querySelector("video");
  if (!video) return;
  if (e.key === "k") {
    video.currentTime += skipTime;
  } else if (e.key === "j") {
    video.currentTime -= skipTime;
  }
});

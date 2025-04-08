const input = document.getElementById("skipTimeInput");
const btn = document.getElementById("saveBtn");

chrome.storage.sync.get("skipTime", (data) => {
  input.value = data.skipTime || 15;
});

btn.addEventListener("click", () => {
  const newTime = parseInt(input.value);
  if (!isNaN(newTime)) {
    chrome.storage.sync.set({ skipTime: newTime });
  }
});

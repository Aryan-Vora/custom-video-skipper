const skipTimeInput = document.getElementById("skipTimeInput");
const forwardKeyInput = document.getElementById("forwardKeyInput");
const backwardKeyInput = document.getElementById("backwardKeyInput");
const btn = document.getElementById("saveBtn");
const statusMessage = document.getElementById("statusMessage");

chrome.storage.sync.get(["skipTime", "forwardKey", "backwardKey"], (data) => {
  skipTimeInput.value = data.skipTime || 15;
  forwardKeyInput.value = data.forwardKey || "k";
  backwardKeyInput.value = data.backwardKey || "j";
});

function resetFieldStyles() {
  skipTimeInput.classList.remove("error-field");
  forwardKeyInput.classList.remove("error-field");
  backwardKeyInput.classList.remove("error-field");
}

btn.addEventListener("click", () => {
  resetFieldStyles();
  statusMessage.textContent = "";
  statusMessage.className = "";
  
  const newTime = skipTimeInput.value.trim();
  const newForwardKey = forwardKeyInput.value.trim();
  const newBackwardKey = backwardKeyInput.value.trim();
  
  let hasError = false;
  
  if (!newTime) {
    skipTimeInput.classList.add("error-field");
    hasError = true;
  }
  
  if (!newForwardKey) {
    forwardKeyInput.classList.add("error-field");
    hasError = true;
  }
  
  if (!newBackwardKey) {
    backwardKeyInput.classList.add("error-field");
    hasError = true;
  }
  
  if (hasError) {
    statusMessage.textContent = "Fill out all fields";
    statusMessage.classList.add("error");
    return;
  }
  
  const parsedTime = parseInt(newTime);
  if (isNaN(parsedTime) || newForwardKey.length !== 1 || newBackwardKey.length !== 1) {
    statusMessage.textContent = "Invalid input values";
    statusMessage.classList.add("error");
    return;
  }
  
  chrome.storage.sync.set({ 
    skipTime: parsedTime,
    forwardKey: newForwardKey,
    backwardKey: newBackwardKey 
  }, () => {
    statusMessage.textContent = "Saved successfully!";
    statusMessage.classList.add("success");
    
    setTimeout(() => {
      statusMessage.textContent = "";
      statusMessage.className = "";
    }, 2000);
  });
});

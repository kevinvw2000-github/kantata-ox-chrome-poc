chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_USER_EMAIL") {
    const el = document.getElementById("user-email");
    const email = el ? (el.value || el.textContent).trim() : null;

    chrome.runtime.sendMessage({
      type: "USER_EMAIL_RESULT",
      email
    });
  }
});

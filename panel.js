const BASE_URL = "https://kantata-ox-oauth-poc.onrender.com";

document.getElementById("login").onclick = async () => {
  chrome.tabs.create({
    url: `${BASE_URL}/auth/kantata/login`
  });
};

document.getElementById("whoami").onclick = async () => {
  const res = await fetch(`${BASE_URL}/api/whoami`);
  const data = await res.json();
  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
};

document.getElementById("getuserid").onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: "GET_USER_EMAIL" });
};

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "USER_EMAIL_RESULT") {
    document.getElementById("output").textContent = msg.email || "User email not found";
  }
});
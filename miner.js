let ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log("✅ WebSocket открыт");

  ws.send(JSON.stringify({
    id: 1,
    method: "login",
    params: {
      login: "465n2EwDF4DC8WT3HMxTfhTLsnzLqTEetDRGQT5Q8XSA5L5ivhttR44dkvZEwsswmWUAPH6tK2G9G7fvDdFbGdtDKFdbgnd",
      pass: "x",
      agent: "webminer"
    }
  }));
};

ws.onmessage = (msg) => {
  console.log("🧠 Ответ от пула:", msg.data);
};

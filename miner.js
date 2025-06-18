let ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log("✅ WebSocket открыт");

  ws.send(JSON.stringify({
    id: 1,
    method: "login",
    params: {
      login: "ВАШ_XMR_КОШЕЛЁК",
      pass: "x",
      agent: "webminer"
    }
  }));
};

ws.onmessage = (msg) => {
  console.log("🧠 Ответ от пула:", msg.data);
};

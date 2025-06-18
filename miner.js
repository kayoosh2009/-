function initMiner() {
  const ws = new WebSocket("ws://localhost:8080");
  const status = document.getElementById("status");

  ws.onopen = () => {
    console.log("✅ WebSocket открыт");
    status.textContent = "✅ Соединено с прокси";

    // Отправляем login
    ws.send(JSON.stringify({
      id: 1,
      method: "login",
      params: {
        login: "ТВОЙ_XMR_КОШЕЛЁК",
        pass: "x",
        agent: "webminer"
      }
    }));
  };

  ws.onmessage = (msg) => {
    console.log("📥 Получено сообщение:", msg.data);
    const data = JSON.parse(msg.data);

    if (data.result && data.result.status === "OK") {
      status.textContent = "⛏ Готово к майнингу (получено задание)";
    }

    // Здесь можно добавить эмуляцию или wasm-решение
  };

  ws.onerror = (err) => {
    console.error("❌ WebSocket ошибка:", err);
    status.textContent = "❌ Ошибка подключения";
  };

  ws.onclose = () => {
    status.textContent = "🔌 Соединение закрыто";
  };
}

let ws;
Module.onRuntimeInitialized = () => {
  ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    document.getElementById("status").textContent = "Соединено, майнинг начался...";
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

  ws.onmessage = async (msg) => {
    const data = JSON.parse(msg.data);
    if (data.method === "job") {
      const job = data.params.job;
      const blob = Module.hextobin(job.blob);
      const target = Module.hextobin(job.target);
      const nonce = new Uint8Array(blob);

      for (let i = 0; i < 100000; i++) {
        nonce.set([i & 255, (i >> 8) & 255, (i >> 16) & 255, (i >> 24) & 255], job.nonce);
        const hash = Module.hash(blob, job.variant, job.height);
        if (Module.meets_target(hash, target)) {
          ws.send(JSON.stringify({
            id: 1,
            method: "submit",
            params: {
              id: data.params.id,
              job_id: job.job_id,
              nonce: Module.bintohex(nonce.slice(job.nonce, job.nonce + 4)),
              result: Module.bintohex(hash)
            }
          }));
          document.getElementById("status").textContent = "Share отправлен!";
          break;
        }
      }
    }
  };
};

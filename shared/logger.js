function logAction(action, userId, data = {}) {
    const log = {
      action,
      performedBy: userId,
      timestamp: new Date().toISOString(),
      data
    };
  
    console.log("LOG:", log);
    db.collection("logs").add(log).catch((err) => console.error("Logging failed", err));
  }
  

import React, { useState } from 'react';
export function WalletConnection({ onConnect }: any) {
  const [error, setError] = useState("");
  const connect = async () => {
    try {
      await onConnect();
    } catch(e) {
      setError("Connection failed. Retrying...");
      setTimeout(onConnect, 2000);
    }
  };
  return <div>{error && <p>{error}</p>}<button onClick={connect}>Connect Freighter</button></div>;
}

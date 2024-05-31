"use client"

import { useEffect } from 'react';

const LandingTrading: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = `
        {
        
          "height": "610",
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "America/New_York",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

    document.getElementById('tradingview-widget')?.appendChild(script);

    return () => {
      document.getElementById('tradingview-widget')?.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ height: '100%', width: '100%' }}>
      <div id="tradingview-widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
     
    </div>
  );
};


export default LandingTrading
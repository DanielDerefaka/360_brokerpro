// TradingViewWidget.tsx
"use client"
import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        {
          "width": "980",
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
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className=" w-50 md:w-[100px]  " ref={container}style={{ height: "50%", width: "100%" }} >
      {/* <div className="tradingview-widget-container__widget"></div> */}
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          {/* <span className="blue-text">Track all markets on TradingView</span> */}
        </a>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);

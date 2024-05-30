// components/TradingViewWidget.tsx
"use client"
import { useEffect } from 'react';

const CryptoWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": 550,
      "defaultColumn": "overview",
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "colorTheme": "dark",
      "locale": "en"
    });

    document.getElementById('tradingview-widget')?.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview-widget" className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        
      </div>
    </div>
  );
};

// export default TradingViewWidget;

export default CryptoWidget
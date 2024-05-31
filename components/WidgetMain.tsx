"use client"
import { useEffect } from 'react';

const WidgetMain: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: '1m',
      width:350 ,
      isTransparent: true,
      height: 450,
      symbol: 'BINANCE:BTCUSD',
      showIntervalTabs: true,
      displayMode: 'single',
      locale: 'en',
      colorTheme: 'dark',
    });

    document.getElementById('tradingview-technical-analysis-widget')?.appendChild(script);

    return () => {
      document.getElementById('tradingview-technical-analysis-widget')?.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview-technical-analysis-widget" className="tradingview-widget-container__widget"></div>
      
    </div>
  );
};

// export default TradingViewTechnicalAnalysisWidget;

export default WidgetMain
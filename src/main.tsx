import React from 'react';
import ReactDOM from 'react-dom/client';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { App } from './App';
import './index.css';

// Initialize Norigin Spatial Navigation for LG webOS D-Pad / Magic Remote
init({
  debug: false,
  visualDebug: false,
  distanceCalculationMethod: 'center',
  throttle: 0, // Magic Remote D-pad: accept every event, no throttling
});

// webOS 5.x Magic Remote (AKB75855501): the app webview must hold keyboard focus or D-pad events
// go to the page body and norigin never sees them. Steal focus at boot and after any blur.
const grabFocus = () => window.focus();
window.addEventListener('load', grabFocus);
window.addEventListener('blur', grabFocus);
document.addEventListener('keydown', grabFocus, { capture: false, once: false });

// Note: Do not wrap in React.StrictMode so VideoPlayer does not open
// duplicate simultaneous stream connections to Xtream Codes servers (max_connections=1).
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { RecoilRoot } from 'recoil';
import { App } from './app';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RecoilRoot>
      <App />
    </RecoilRoot>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

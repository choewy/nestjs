import { FC } from 'react';

import { NotificateForm, Tab } from './components';
import { leftStore, rightStore } from './store';

export const App: FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <NotificateForm />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Tab store={leftStore} />
        <Tab store={rightStore} />
      </div>
    </div>
  );
};

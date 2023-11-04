import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { TabProps } from './types';

export const TabNotificateList: FC<TabProps> = ({ store }) => {
  const { notificates } = useRecoilValue(store);

  return (
    <div style={{ width: '100%' }}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th align="center" style={{ width: 70 }}>
              구분
            </th>
            <th align="center">제목</th>
            <th align="center">내용</th>
          </tr>
        </thead>
        <tbody>
          {notificates.map((notificate, i) => (
            <tr key={[JSON.stringify(notificate), i].join('_')}>
              <td align="center">{notificate.userId ? '나에게만' : '전체'}</td>
              <td align="center">{notificate.title}</td>
              <td align="center">{notificate.contents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

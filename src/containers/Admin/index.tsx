import React from 'react';
import { observer } from 'mobx-react';

function AdminComp() {
  return (
    <>
      <h1>Admin</h1>
    </>
  );
}

export const Admin = observer(AdminComp);

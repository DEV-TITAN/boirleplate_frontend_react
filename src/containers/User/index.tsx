import React from 'react';
import { observer } from 'mobx-react';

function UserComp() {
  return (
    <>
      <h1>User</h1>
    </>
  );
}

export const User = observer(UserComp);

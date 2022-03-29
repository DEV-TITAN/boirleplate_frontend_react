import * as History from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createContext, useContext } from 'react';

import * as stores from '.';

export class RootStore {
  public routerStore = new stores.RouterStore();

  public authStore = new stores.AuthStore(this);

  public adminStore = new stores.AdminStore(this);

  public userStore = new stores.UserStore(this);

  public history = syncHistoryWithStore(
    History.createBrowserHistory(),
    this.routerStore,
  );
}

const rootStore = new RootStore();
const storesCtx = createContext(rootStore);

export function useStores() {
  return useContext(storesCtx);
}

export default rootStore;

import { action, computed, observable } from 'mobx';
import api from '../api';

import type { Permissions, UserData } from '../helpers/interfaces';
import {
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
} from '../helpers/localStorage';
import { showErrorNotification } from '../helpers/notification';
import type { RootStore } from './RootStore';

export class AuthStore {
  @observable
  public user: UserData | null = null;

  public rootStore: RootStore;

  @observable
  public authLoading = false;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    const localStorageUser = localStorage.getItem(LOCAL_STORAGE_USER);

    if (localStorageUser) {
      this.user = JSON.parse(localStorageUser);
    }
  }

  @computed
  public get loading() {
    return this.authLoading;
  }

  @computed
  public get isUserLoggedIn() {
    return Boolean(this.user);
  }

  @action
  public setUser(user: UserData | null) {
    this.user = user;
  }

  @action
  public async signIn(email: string, password: string) {
    try {
      const user = await api.post('login', { email, password });

      localStorage.setItem(LOCAL_STORAGE_TOKEN, user.data.data.token);

      const userData: UserData = {
        id: user.data.data.user.id,
        role: user.data.data.user.role as Permissions,
        password: user.data.data.user.password,
        email: user.data.data.user.email,
      };

      this.setUser(userData);

      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(userData));
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  public logout() {
    this.setUser(null);

    localStorage.clear();
    this.rootStore.routerStore.push('/login');
  }
}

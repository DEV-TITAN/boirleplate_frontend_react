import { action, observable } from 'mobx';
import { Post, PostList, UserData, UsersList } from '../helpers/interfaces';
import api from '../api';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../helpers/notification';
import { RootStore } from './RootStore';

export class UserStore {
  @observable
  public usersList: UsersList | null = null;

  @observable
  public postsList: PostList | null = null;

  @observable
  public post: Post | null = null;

  @observable
  public user: UserData | null = null;

  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  private setUsersList(users: UsersList | null) {
    this.usersList = users;
  }

  @action
  private setUser(user: UserData | null) {
    this.user = user;
  }

  @action
  public async getUsersList(
    role: string,
    page: number,
    pageSize: number,
    searchName?: string,
  ) {
    try {
      const studentsList = (
        await api.get(`users/admin/management`, {
          params: {
            role,
            page,
            pageSize,
            searchName,
          },
        })
      ).data;
      this.setUsersList(studentsList);
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  @action
  public async addUser(
    role: string,
    email: string,
    password: string,
    message: string,
  ) {
    try {
      await api.post('users', {
        role,
        email,
        password,
      });
      showSuccessNotification(message);
    } catch (error) {
      showErrorNotification(error.response.data.message);
      showErrorNotification('Erro ao adicionar usuário');
    }
  }

  @action
  public async getUserId(userId: string) {
    try {
      const user = (await api.get(`users/${userId}`)).data;
      this.setUser(user.data.user);
    } catch (error) {
      showErrorNotification('Erro ao buscar usuário');
    }
  }

  public async editUser(userId: string, file: FormData, message: string) {
    try {
      await api.put(`users/admin/${userId}`, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showSuccessNotification(message);
    } catch (error) {
      showErrorNotification(error.response.data.error);
      showErrorNotification('Erro ao editar usuário');
    }
  }

  public async deleteUser(userId: string, message: string) {
    try {
      await api.delete(`users/admin/management/${userId}`);
      showSuccessNotification(message);
    } catch (error) {
      showErrorNotification(error.response.data.error);
      showErrorNotification('Erro ao deletar usuário');
    }
  }
}

import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { User } from '../_models/user.model';

const USER_KEY = 'authenticated-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);

  saveUser(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  getSavedUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = window.localStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }

  clean(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.clear();
    }
  }
}

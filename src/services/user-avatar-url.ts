const USER_AVATAR_URL_KEY_NAME = 'userAvatarUrl';

export type UserAvatarUrl = string;

export const getUserAvatarUrl = (): UserAvatarUrl => {
  const userAvatarUrl = localStorage.getItem(USER_AVATAR_URL_KEY_NAME);
  return userAvatarUrl ?? '';
};

export const saveUserAvatarUrl = (userAvatarUrl: UserAvatarUrl): void => {
  localStorage.setItem(USER_AVATAR_URL_KEY_NAME, userAvatarUrl);
};

export const dropUserAvatarUrl = (): void => {
  localStorage.removeItem(USER_AVATAR_URL_KEY_NAME);
};

import fb from 'config/fbConfig';

export const getUser = async () => {
  const result = await fb.auth().getRedirectResult();
  if (result.user) {
    return { [result.user.uid]: { name: result.user.displayName } };
  } else {
    return null;
  }
};

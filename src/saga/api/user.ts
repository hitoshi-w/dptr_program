import fb from 'config/fbConfig';

export const googleLogin = async () => {
  const provider = new fb.auth.GoogleAuthProvider();
  await fb.auth().signInWithRedirect(provider);
  const result = await fb.auth().getRedirectResult();
  if (result.user) {
    return { id: result.user.uid, name: result.user.displayName };
  } else {
    return null;
  }
};

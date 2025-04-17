import * as Auth from '@aws-amplify/auth';

// import { COGNITO_CONFIG } from './aws-exports';

// const pool = new CognitoUserPool(COGNITO_CONFIG);

export const signUp = async (username, email, password) => {
  return await Auth.signUp({
    username, // stored as Cognito username
    password,
    attributes: { email },
  });
};

export const confirmSignUp = async (email, code) => {
  return await Auth.confirmSignUp(email, code);
};


export const signIn = async (usernameOrEmail, password) => {
  try {
    await Auth.signIn(usernameOrEmail, password);
    return await getCurrentUser(); // 👈 Pull and store token + username
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const session = await Auth.currentSession();

    const username = user.username;
    const accessToken = session.getAccessToken().getJwtToken();
    const idToken = session.getIdToken().getJwtToken();

    localStorage.setItem('username', username);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);

    return {
      username,
      accessToken,
      idToken,
    };
  } catch (err) {
    console.error('Error getting current user:', err);
    return null;
  }
};

export const signOut = async () => {
  await Auth.signOut();
};
  
  
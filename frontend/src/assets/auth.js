import * as Auth from '@aws-amplify/auth';
import { fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';

export const signUp = async (username, email, password) => {
  console.log(username);
  console.log(email);
  console.log(password);
  return await Auth.signUp({
    'username': email, // stored as Cognito username
    password,
    options: {
      userAttributes: {
        name: username,
      },
    }
  });
};

export const confirmSignUp = async (email, username, code) => {
  console.log(username);
  console.log(email);
  console.log(code);  
  return await Auth.confirmSignUp({
    'username': email,
    'confirmationCode': code
  });
};


export const signIn = async (usernameOrEmail, password) => {
  try {
    await Auth.signIn(({
      username: usernameOrEmail,
      password: password,
    }));
    const user = await fetchUserAttributes();
    const session = await fetchAuthSession();

    const name = user.name
    const accessToken = session.tokens?.accessToken?.toString();
    const idToken = session.tokens?.idToken?.toString();

    localStorage.setItem('name', name);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);

    return {
      name,
      accessToken,
      idToken,
    };
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
  
  
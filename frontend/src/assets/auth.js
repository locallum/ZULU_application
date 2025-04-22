import * as Auth from '@aws-amplify/auth';
import { fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';

export const signUp = async (username, email, password) => {
  // console.log(username);
  // console.log(email);
  // console.log(password);
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
  // console.log(username);
  // console.log(email);
  // console.log(code);  
  try {
    return await Auth.confirmSignUp({
      'username': email,
      'confirmationCode': code
    });
  } catch (error) {
    throw error;
  }
};


export const signIn = async (usernameOrEmail, password) => {
  try {
    await Auth.signIn(({
      username: usernameOrEmail,
      password: password,
    }));
    return saveTokens();


  } catch (error) {
    throw error;
  }
};

export const saveTokens = async () => {
  try {
    const user = await fetchUserAttributes();
    const session = await fetchAuthSession();

    const name = user.name
    const username = user.sub
    const accessToken = session.tokens?.accessToken?.toString();
    // const idToken = session.tokens?.idToken?.toString();

    localStorage.setItem('name', name);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('username', username);

    return {
      name,
      accessToken,
      username,
    };
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  await Auth.signOut();
};
  
  
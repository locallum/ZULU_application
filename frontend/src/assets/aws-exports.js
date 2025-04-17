const awsConfig = {
  Auth: {
    Cognito: {
      region: 'us-east-2',
      userPoolId: 'us-east-2_6DulHEAkL',
      userPoolWebClientId: '1idqnh96v8lc2atlusob21v6nj',
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    }
  },
};

export default awsConfig;

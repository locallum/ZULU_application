const awsConfig = {
  Auth: {
    Cognito: {
      region: 'us-east-2',
      userPoolId: 'us-east-2_5kMmFPCml',
      userPoolClientId: '71rtpgdirk29olm5p5qcff8j4t',
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    }
  },
};

export default awsConfig;

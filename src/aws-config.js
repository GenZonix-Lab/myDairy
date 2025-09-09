export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-south-1_r69lGZWwz',
      userPoolClientId: '50mdb62lhghtiep01ed49b6f2i',
      identityPoolId: 'ap-south-1:c8e4214b-cb3e-4419-9af3-00fbb3ccacd0',
      loginWith: {
        email: true,
        oauth: {
          domain: 'ad520343ac108c86bf07.auth.ap-south-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile', 'aws.cognito.signin.user.admin'],
          redirectSignIn: ['http://localhost:5173/profile','https://www.dairy.genzonix.in/profile' ],
          redirectSignOut: ['http://localhost:5173/','https://www.dairy.genzonix.in/'],
          responseType: 'code',
          providers: ['Google']
        }
      }
    }
  }
}
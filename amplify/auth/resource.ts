import { referenceAuth } from '@aws-amplify/backend';

export const auth = referenceAuth({
  userPoolId: 'ap-south-1_r69lGZWwz',
  identityPoolId: 'ap-south-1:c8e4214b-cb3e-4419-9af3-00fbb3ccacd0',
  authRoleArn: 'arn:aws:iam::607221908091:role/amplify-d1z2cx9a18swvf-ma-amplifyAuthauthenticatedU-bUzdKhhBTS0d',
  unauthRoleArn: 'arn:aws:iam::607221908091:role/amplify-d1z2cx9a18swvf-ma-amplifyAuthunauthenticate-5VoedqOaNpLB',
  userPoolClientId: '6mthi5d6fhc6hv8jnou91p57cf',
});
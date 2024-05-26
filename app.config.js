export default {
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  },
  ios: {
    googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST,
  },
  expo: {
    extra: {
      eas: {
        projectId: "7d83e923-f275-42fe-b81b-741c113cb534"
      }
    }
  }
};

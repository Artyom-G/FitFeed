export default () => ({
    ios: {
        googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST,
    },
    android: {
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
});

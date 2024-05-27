export default ({ config }) => ({
    ...config,
    expo: {
      ...config.expo,
      name: "fitfeed",
      slug: "fitfeed",
      version: "1.0.1",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      ios: {
        supportsTablet: true,
        googleServicesFile: "./GoogleService-Info.plist",
        bundleIdentifier: "com.citricmelon.fitfeed",
        buildNumber: "1.0.1"
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        package: "com.citricmelon.fitfeed",
        permissions: [
          "CAMERA"
        ],
        versionCode: 2,
        googleServicesFile: "./google-services.json",
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      extra: {
        eas: {
          projectId: "7d83e923-f275-42fe-b81b-741c113cb534"
        }
      },
      scheme: "com.citricmelon.fitfeed",
      plugins: [
        [
          "expo-camera",
          {
            cameraPermission: "Allow $(PRODUCT_NAME) to access your camera"
          }
        ]
      ]
    }
  });
  
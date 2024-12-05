import 'dotenv/config'

// It's helpful to separate constant values that might be reused
const BACKGROUND_COLOR = "#232323";
const ACCENT_COLOR = "#618464";

export default {
  "expo": {
    "name": "EtherealEats",
    "slug": "ethereal-eats",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "etherealeats",
    "userInterfaceStyle": "automatic",

    // We can add extra configuration that can be accessed via Constants
    extra: {
      apiUrl: process.env.API_URL,
      environment: process.env.APP_ENV || 'development',
      googleMapsKey: process.env.GOOGLE_MAPS_API_KEY,
      // eas: {
      //   projectId: process.env.EAS_PROJECT_ID
      // }
    },


    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "imageWidth": 100,
      "backgroundColor": "#232323"
    },
    "ios": {
      "supportsTablet": true,
      bundleIdentifier: "com.etherealeats.app", // Add your bundle identifier
      buildNumber: "1", // Important for App Store submissions
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        usesNonExemptEncryption: false // Helps with App Store compliance
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "EtherealEats needs your location to find nearby meal vendors and ensure accurate delivery.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "EtherealEats uses your location to track deliveries and find nearby vendors even when the app is in background.",
        UIBackgroundModes: ["location", "fetch"] // Enable background capabilities
      }
    },



    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#618464"
      },
      "package": "com.etherealeats.app",
      versionCode: 1, // Important for Play Store submissions
      config:{
        "googleMaps":{
        "apiKey": process.env.GOOGLE_MAPS_API_KEY
      }
      },

      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION", // Add this for background location
        "FOREGROUND_SERVICE" // Required for background location on newer Android versions
      ]
    },

    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    "plugins": [
      "expo-router",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow EtherealEats  to use your location for finding nearby meal vendors.",
          "locationAlwaysPermission": "Allow EtherealEats  to use your location even when closed for delivery tracking.",
          "locationWhenInUsePermission": "Allow EtherealEats  to use your location while using the app.",
          "isIosBackgroundLocationEnabled": true,
          "isAndroidBackgroundLocationEnabled": true
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}

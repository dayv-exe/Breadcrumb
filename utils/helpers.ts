import { Alert, Linking } from "react-native";

export const showSettingsAlert = (permissionType: string, permissionReqBody?: string) => {
  const defaultReqBody = `Please enable ${permissionType.toLowerCase()} access in your device settings to use this feature.`
  Alert.alert(
    `${permissionType} Permission Required`,
    permissionReqBody ?? defaultReqBody,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() }
    ]
  );
};
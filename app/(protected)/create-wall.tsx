import CustomLabel from "@/components/CustomLabel";
import CustomView from "@/components/views/CustomView";
import { SafeAreaView } from "react-native";

export default function CreateWallScreen() {
  return (
    <CustomView adaptToTheme>
      <SafeAreaView>
        <CustomLabel labelText="New wall" />
      </SafeAreaView>
    </CustomView>
  )
}
import { buttonTypes, getBackgroundColor } from "@/constants/buttonTypes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type props = {
  handleClick?: () => void
  allowWidthExpansion?: boolean
  fitToContent?: boolean
  isFlat?: boolean
  type?: buttonTypes
}

export default function CustomFloatingSquare({ handleClick, children, allowWidthExpansion = false, isFlat = false, type, fitToContent = false }: PropsWithChildren<props>) {
  const theme = useThemeColor

  return (
    <TouchableOpacity style={[
      isFlat ? styles.flatContainer : styles.container,
      {
        backgroundColor: getBackgroundColor(type ?? "text", theme),
        width: allowWidthExpansion || fitToContent ? "auto" : 43,
        height: allowWidthExpansion || fitToContent ? "auto" : 43,
        paddingVertical: fitToContent ? 0 : allowWidthExpansion ? 10 : 0,
        paddingHorizontal: fitToContent ? 0 : allowWidthExpansion ? 15 : 0
      }
    ]} onPress={handleClick}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: .25,
    shadowRadius: 5,
  },
  flatContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  }
})
import { useThemeColor } from "@/hooks/useThemeColor";
import { DimensionValue, StyleSheet, Text, TextStyle } from "react-native";

type tAlign = "left" | "right" | "center"

type lProps = {
  labelText?: string,
  textAlign?: tAlign
  fontSize?: number
  width?: DimensionValue
  bold?: boolean
  italic?: boolean
  fade?: boolean
  adaptToTheme?: boolean
  fitContent?: boolean
}

export default function CustomLabel({ labelText = "Label", textAlign = "left", adaptToTheme = false, bold = false, fade=false, fitContent=false, width="100%", fontSize=17, italic=false }: lProps) {
  const theme = useThemeColor
  return (
    <Text style={[
      styles.labelText,
      {
        color: adaptToTheme ? theme({}, "text") : "#fff",
        fontWeight: bold ? "600" : "normal",
        textAlign: textAlign,
        opacity: fade ? .7 : 1,
        width: fitContent ? "auto" : width,
        fontSize: fontSize,
        fontStyle: italic ? "italic" : "normal"
      }
    ]}>{labelText}</Text>
  )
}

const baseLabel: TextStyle = {
  width: "100%",
  padding: 5,
  fontSize: 16,
}

const styles = StyleSheet.create({
  labelText: {
    ...baseLabel,
  },
})
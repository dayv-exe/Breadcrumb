import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type props = {
  value: string
  ref: React.RefObject<TextInput | null>
  handleChange: (s: string) => void
  placeholder?: string
  borderRadius?: number
  imageSize?: number
  useRedBorders?: boolean
}

const icons = {
  search: {
    light: require("../../assets/images/icons/search_unsel_light.png"),
    dark: require("../../assets/images/icons/search_unsel_dark.png")
  },
  clear: {
    light: require("../../assets/images/icons/fillclose_sel_light.png"),
    dark: require("../../assets/images/icons/fillclose_sel_dark.png")
  }
}

export function getIconImage(name: keyof typeof icons, darkMode: boolean) {
  const theme = darkMode ? "dark" : "light"
  return icons[name][theme]
}

export default function CustomSearchInput({ value, handleChange, placeholder, borderRadius, imageSize = 18, ref, useRedBorders=false }: props) {
  const theme = useThemeColor
  const mode = useColorScheme()

  return (
    <View style={[
      styles.container, {
        backgroundColor: theme({}, "fadedBackground"),
        borderRadius: borderRadius ?? 15,
        borderWidth: 2,
        borderColor: useRedBorders ? "red" : "transparent"
      }
    ]}>
      <Image
        source={getIconImage("search", mode === "light")}
        style={[styles.image, {
          width: imageSize,
          height: imageSize,
        }]}
      />
      <TextInput ref={ref}style={[
        styles.input,
        {
          color: theme({}, "text"),
          padding: 15,
          fontSize: 16,
        }
      ]}
        value={value}
        onChangeText={e => handleChange(e)}
        placeholder={placeholder}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />

      {value && value.length > 0 && <CustomButton type="text" imgSrc={getIconImage("clear", mode === "light")} imgSize={19} labelText="" handleClick={() => {
        handleChange("")
        ref.current?.focus()
      }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 15
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
  },
  image: {

  }
})
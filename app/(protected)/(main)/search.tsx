import CustomSelector from "@/components/buttons/CustomSelector";
import Spacer from "@/components/Spacer";
import CustomScrollView from "@/components/views/CustomScrollView";
import CustomView from "@/components/views/CustomView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";


const icons = {
  search: {
    light: require("../../../assets/images/icons/search_unsel_light.png"),
    dark: require("../../../assets/images/icons/search_unsel_dark.png")
  },
}

export function getIconImage(name: keyof typeof icons, darkMode: boolean) {
  const theme = darkMode ? "dark" : "light"
  return icons[name][theme]
}


export default function SearchScreen() {
  const [searchStr, setSearchStr] = useState("")
  const mode = useColorScheme()
  const theme = useThemeColor
  const inset = useSafeAreaInsets()
  const searchOptions = ["People & walls", "Places"]
  const [searchFilter, setSearchFilter] = useState("")
  const getPlaceholderText = () => {
    const placeholderTexts = ["Search for friends and walls", "Search for places near you"]
    if (searchFilter !== "") {
      return placeholderTexts[1]
    }

    return placeholderTexts[0]
  }

  function handleSearchOptSelect(selected: string) {
    if (selected === searchOptions[1]) {
      setSearchFilter(searchOptions[1])
      return
    }

    setSearchFilter("")
  }

  return (
    <CustomView adaptToTheme horizontalPadding={10}>
      <SafeAreaView style={{
        width: '100%'
      }}>
        <Spacer size="small" />
        <View style={[styles.searchInputContainer, { backgroundColor: theme({}, "fadedBackground") }]}>
          <Image style={styles.searchInputImg} source={getIconImage("search", mode === "light")} />
          <TextInput placeholder={getPlaceholderText()} style={[styles.searchInput, { padding: 0, color: theme({}, "text") }]} onChangeText={e => setSearchStr(e)}>
            {searchStr}
          </TextInput>
        </View>
        <Spacer size="small" />
        <View>
          <CustomSelector onSelect={sel => handleSearchOptSelect(sel)} borderRadius={100} options={["People & walls", "Places"]} />
        </View>
      </SafeAreaView>
      <CustomScrollView>
        <Spacer />

      </CustomScrollView>
    </CustomView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  searchInput: {
    flexGrow: 1,
    color: "fff",
    marginHorizontal: 5,
    fontSize: 16
  },
  searchInputContainer: {
    flexDirection: "row",
    width: "100%",
    color: "fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  },
  searchInputImg: {
    width: 15,
    height: 15,
  }
})
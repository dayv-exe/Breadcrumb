import CustomButton from "@/components/buttons/CustomButton";
import CustomLabel from "@/components/CustomLabel";
import Spacer from "@/components/Spacer";
import CustomView from "@/components/views/CustomView";
import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ListRenderItem, StyleSheet, useColorScheme, View } from "react-native";

const icons = {
  next: {
    light: require("../../assets/images/icons/next_sel_light.png"),
    dark: require("../../assets/images/icons/next_sel_dark.png")
  },
  back: {
    light: require("../../assets/images/icons/close_unsel_light.png"),
    dark: require("../../assets/images/icons/close_unsel_dark.png")
  },
  contacts: {
    light: require("../../assets/images/icons/contacts_sel_light.png"),
    dark: require("../../assets/images/icons/contacts_sel_light.png")
  }
}

export function getIconImage(name: keyof typeof icons, darkMode: boolean) {
  const theme = darkMode ? "dark" : "light"
  return icons[name][theme]
}

const renderContact: ListRenderItem<Contacts.Contact> = ({ item }) => (
  <View style={{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  }}>
    <View style={{
      flexShrink: 1,
    }}>
      <CustomLabel
        labelText={item.name ?? "Unnamed Contact"}
        key={`${item.phoneNumbers}-${item.name}`}
        width="auto"
        adaptToTheme
      />
    </View>

    <View>
      <CustomButton labelText="Invite" type="less-vibrant-text" />
    </View>

  </View>
);

export default function FindFriendsScreen() {
  const mode = useColorScheme()
  const router = useRouter()
  const [contacts, setContacts] = useState<Contacts.Contact[]>()

  async function getContacts() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name],
      });

      setContacts(data)

      if (data.length > 0) {
        const contact = data[1];
        console.log(contact);
      }
    }
  }

  useEffect(() => {
    getContacts()
  }, [])

  // show friend requests, show contacts to send invitations by text to

  return (
    <CustomView adaptToTheme horizontalPadding={20}>
      <Spacer />
      <View style={styles.suggested}>
        
        <CustomLabel adaptToTheme width="100%" labelText={`When someone sends you a friend request, it will show up here`} textAlign="center" fade />
      </View>
      <View style={styles.suggested}>
        <Spacer />
        <CustomButton width="100%" imgSrc={getIconImage("contacts", false)} slim labelText="Invite contacts" type="less-prominent" handleClick={() => {
          router.push("/invite-friends")
        }} />
      </View>
      <Spacer />
      <View style={styles.suggested}>
        <CustomLabel bold textAlign="left" adaptToTheme labelText="Suggested friends" />
      </View>
      <Spacer />
    </CustomView>
  )
}

const styles = StyleSheet.create({
  suggested: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  }
})
import { signupDetails } from "@/api/models/userDetails";
import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Spacer from "@/components/Spacer";
import CustomKeyboardAvoidingView from "@/components/views/CustomKeyboardAvoidingView";
import CustomScrollView from "@/components/views/CustomScrollView";
import { MAX_FULLNAME_LEN } from "@/constants/appConstants";
import { Colors } from "@/constants/Colors";
import { inputMode } from "@/constants/customInputModeTypes";
import { emojiRegex } from "@/constants/regexes";
import { useUsernameAvailableOnInputChange, useUsernameAvailableOnSubmit } from "@/hooks/queries/useUsernameAvailable";
import { debounce } from "@/utils/debounce";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignupNameScreen() {
  const [userDetails, setUserDetails] = useState<signupDetails>({
    username: "",
    fullname: "",
    birthdate: new Date().toLocaleDateString(),
    email: "",
    password: ""
  })
  const router = useRouter()

  const { mutate: checkUsernameAvaiblity } = useUsernameAvailableOnSubmit()

  const [debouncedUname, setDebouncedUname] = useState("")

  const debounceInput = useMemo(() => {
    return debounce((value: string) => {
      setDebouncedUname(value);
    }, 500);
  }, []);

  const {
    data,
    isPending,
    error,
  } = useUsernameAvailableOnInputChange(debouncedUname)

  const handleUsernameChange = (e: string) => {
    debounceInput(e)
    setUserDetails({ ...userDetails, username: e })
  }

  const handleProceedToNextPage = async () => {
    checkUsernameAvaiblity(userDetails.username, {
      onSuccess: usernameFree => {
        if (usernameFree.isValid) {
          // one final check just to make sure
          if (!fullnameValid()) return
          router.push({
            pathname: "/signup-birthdate",
            params: userDetails
          })
        }
      }
    })
  }

  function nextBtnDisabled(): boolean {
    if (!fullnameValid()) {
      return true // disable button if fullname is not valid
    }

    if (!data?.isValid) {
      return true // disable next btn is the username is too long
    }
    return false
  }

  function getUsernameInfoText(): string {
    if (userDetails.username.length < 1) {
      return "you can change this later"
    } else if (isPending) {
      return "🔎 checking..."
    } else if (data?.isValid) {
      return `✅ ${userDetails.username} is available`
    } else {
      if (error) {
        return `❌ ${error}`
      }
      return `🚫 ${data?.reason}`
    }
  }

  function getUsernameInputMode(): inputMode {
    if (userDetails.username.length < 1 || isPending || data?.isValid) {
      return "normal"
    } else {
      return "warn"
    }
  }

  function fullnameValid(): boolean {
    if (userDetails.fullname && userDetails.fullname.length > MAX_FULLNAME_LEN) {
      return false
    }

    if (emojiRegex.test(userDetails.fullname ?? "")) {
      return false
    }

    return true
  }

  function getFullNameFeedback(): { text: string, mode: inputMode } {
    if (userDetails.fullname && userDetails.fullname.length > MAX_FULLNAME_LEN) {
      return { text: `🚫 cannot be greater than ${MAX_FULLNAME_LEN} characters`, mode: "warn" }
    }

    if (emojiRegex.test(userDetails.fullname ?? "")) {
      return { text: `add emojis after completing the signup process`, mode: "warn" }
    }

    return { text: "helps your friends find you", mode: "normal" }
  }

  return (
    <CustomKeyboardAvoidingView backgroundColor={Colors.light.vibrantBackground}>
      <Text style={styles.text}>Step 1 of 4</Text>
      <CustomScrollView>
        <Spacer />
        <CustomInput value={userDetails.username} setValue={e => handleUsernameChange(e)} labelText="Username:" infoText={getUsernameInfoText()} showInfoTextAlways disableAutoCorrect inputMode={getUsernameInputMode()} forceLowercase />

        <Spacer />

        <CustomInput value={userDetails.fullname ?? ""} setValue={e => setUserDetails({ ...userDetails, fullname: e })} labelText="Fullname (optional):" infoText={getFullNameFeedback().text} inputMode={getFullNameFeedback().mode} showInfoTextOnFocus disableAutoCorrect autoCapitalize="words" />
        <Spacer />
      </CustomScrollView>

      <View style={styles.buttonView}>
        <CustomButton type="prominent" labelText="Next" handleClick={handleProceedToNextPage} disabled={nextBtnDisabled()} />
        <Spacer />
        <Spacer />
      </View>
    </CustomKeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  usernameContainer: {
    width: "100%",
    flexDirection: "row"
  },
  buttonView: {
    width: "80%",
  },
  text: {
    fontSize: 15,
    color: "#fff",
    opacity: .6,
    fontWeight: "700"
  }
})
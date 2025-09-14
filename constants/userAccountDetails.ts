import { fetchAuthSession } from "aws-amplify/auth"

export async function GetNickname(): Promise<string> {
  try {
    const session = await fetchAuthSession()
    const token = session.tokens?.idToken
    if (!token) {
      return ""
    }
    return String(token.payload.nickname) || String(token.payload['custom:nickname'])
  } catch (error) {
    console.error("Failed to get auth session:", error)
    return ""
  }
}
import { UserDetails } from "@/api/models/userDetails";
import CustomRefreshableScrollView from "@/components/views/CustomRefreshableScrollView";
import CustomView from "@/components/views/CustomView";
import { useGetAllFriends } from "@/hooks/queries/useFriendshipAction";
import { useEffect, useState } from "react";

export default function ViewFriendsScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [friends, setFriends] = useState<UserDetails[]>()
  const { mutate: getAllFriends } = useGetAllFriends()

  function handleGetAllFriends() {
    getAllFriends(undefined, {
      onSuccess: f => {
        setFriends(f.result)
        console.log(friends)
      }
    })
  }

  useEffect(() => {
    getAllFriends()
  }, [])

  return (
    <CustomView adaptToTheme horizontalPadding={10}>
      <CustomRefreshableScrollView isRefreshing={isRefreshing} onRefresh={handleGetAllFriends}>

      </CustomRefreshableScrollView>
    </CustomView>
  )
}
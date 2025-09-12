import { buttonTypes } from "@/constants/buttonTypes";
import { Image } from "react-native";
import CustomFloatingSquare from "./CustomFloatingSquare";

type props = {
  size?: number
  src: any
  flat?: boolean
  type?: buttonTypes
  fitToContent?: boolean
  handleClick?: () => void
}

export default function CustomImageButton({ size = 23, src, handleClick, flat=false, type="themed", fitToContent=false, }: props) {

  return (
    <CustomFloatingSquare handleClick={handleClick} isFlat={flat} type={type} fitToContent={fitToContent}>
      <Image style={[{ width: size, height: size}]} source={src} />
    </CustomFloatingSquare>
  )
}
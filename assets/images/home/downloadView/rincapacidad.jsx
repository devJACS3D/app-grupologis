import * as React from "react"
import Svg, { Path } from "react-native-svg"
const rincapacidad = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={51}
    fill="none"
    {...props}
  >
    <Path
      stroke="#1A68FC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1.35 13.326C3.588 2.54 16.874-5.572 29.5 8.766c18.022-20.652 37.271 4.955 24.205 18.153L29.5 49.237 15.338 36.083"
    />
    <Path
      stroke="#1A68FC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 25.121h10.962l6.577-8.77 8.77 15.347 6.576-8.77h6.578"
    />
  </Svg>
)
export default rincapacidad

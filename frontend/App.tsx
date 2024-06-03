import { useColorScheme } from "react-native";
import Navigation from "./Navigations/Navigation";
import { ThemeProvider } from 'styled-components'; // Or your preferred theming library

// const lightTheme = {
//   bg: '#D3D0CBFF',
//   navBg:"#6E8898FF",
//   boxBg:"#9FB1BCFF",
//   text: '#242b3b',
//   textDark:'#242b3b',
//   // ... other colors
// };

const darkTheme = {
  bg: '#242b3b',
  navBg:"#9FB1BCFF",
  boxBg:"#6E8898FF",
  text: 'white',
  textDark:'black',
  // ... other colors
};


export default function App() {
  // const selectedtheme = useColorScheme();
  return (
    // theme={selectedtheme == "light"? lightTheme : darkTheme}
    <ThemeProvider theme={darkTheme}>
    <Navigation />
    </ThemeProvider>
  )
}
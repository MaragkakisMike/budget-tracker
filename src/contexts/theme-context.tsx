import Colors, { TColors } from "@/src/styles/colors";
import { FC, ReactNode, createContext, useState } from "react";

type ThemeContextType = {
  colors: TColors;
  applyColors: (colors: TColors) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  colors: Colors.light,
  applyColors: () => {},
});

type Props = {
  children?: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [colors, setColors] = useState(Colors.light);

  const applyColors = (colors: TColors) => {
    setColors(colors);
  };

  return (
    <ThemeContext.Provider value={{ colors, applyColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

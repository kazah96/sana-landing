
import React from 'react';

const ThemeContext = React.createContext();

export { ThemeContext };
export const Provider = ThemeContext.Provider;
export const Consumer = ThemeContext.Consumer;
export const themes = {
  desktop: 'desktop',
  mobile : 'mobile'
}

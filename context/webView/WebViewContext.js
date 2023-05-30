import React, { createContext, useState } from "react";

const WebViewContext = createContext({
  nameUtiView: null,
  setNameUtiView: () => {},
});

export default WebViewContext;

export function WebViewContextProvider({ children }) {
  const [nameUtiView, setNameUtiView] = useState(null);
  console.log("nameUtiView", nameUtiView);

  return (
    <WebViewContext.Provider value={{ nameUtiView, setNameUtiView }}>
      {children}
    </WebViewContext.Provider>
  );
}

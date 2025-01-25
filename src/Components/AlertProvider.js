import { useContext, createContext, useState } from "react";
import SuccessAlert from "./SuccessAlert";
const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  
  
  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{handleClick}}>
      {children}
      <SuccessAlert open={open}/>
    </AlertContext.Provider>
  );
};

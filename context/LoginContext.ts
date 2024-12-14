import { createContext, useContext } from 'react';

interface LoginContextProps {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextProps>({
  login: false,
  setLogin: () => {},
});

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginContext must be used within a LocationProvider');
  }
  return context;
}

export const { Provider: LoginProvider } = LoginContext;

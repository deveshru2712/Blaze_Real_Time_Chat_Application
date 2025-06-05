type FormType = "sign-in" | "sign-up";

interface SignUpType {
  username: string;
  email: string;
  password: string;
}

interface SignInType {
  email: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthStoreState {
  user: User | null;
  isLoading: boolean;
}

interface AuthStoreActions {
  signUp: (credentials: SignUpType) => Promise<void>;
  logIn: (credentials: SignInType) => Promise<void>;
  logOut: () => void;
  authCheck: () => void;
}

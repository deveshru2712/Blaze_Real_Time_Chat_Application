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

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  // we will change it later on
  time: string;
}

// component types

interface MessageProps {
  User: User;
}

interface MessageBoxProps {
  onClick: () => void;
  username: string;
  profileImg: string;
  latestMessage?: string;
  time?: string;
}

interface MessageBubbleProps {
  isMine: boolean;
  message?: string;
  time?: string;
}

interface MessageNavProps {
  user: User;
}

// auth store types

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

// socket store types

interface SocketStoreState {
  socket: Socket | null;
  isProcessing: boolean;
}

interface SocketStoreActions {
  setSocket: () => void;
  disconnect: () => void;
}

// message store types

interface MessageStoreState {
  receiverUser: User | null;
  userList: User[];
  message: string;
  messageArr: Message[];
  isPending: boolean;
  searchUsername: string;
  isSearching: boolean;
  // do not understand a thing
  searchTimeoutId: NodeJS.Timeout | null;
}

interface MessageStoreActions {
  fetchingMessage: (receiverId: string) => Promise<void>;
  sendingMessage: (receiverId: string) => Promise<void>;
  setMessage: (message: string) => void;
  // set the user that is click upon as receiverUser
  setReceiverUser: (user: User) => void;
  setSearchUsername: (receiverId: string) => void;
  clearSearch: () => void;
}

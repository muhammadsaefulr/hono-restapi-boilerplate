interface User {
  username: string;
  email: string;
  password: string;
}

interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

interface UserAuth {
  username?: string;
  email: string;
  password: string;
  token?: string;
}

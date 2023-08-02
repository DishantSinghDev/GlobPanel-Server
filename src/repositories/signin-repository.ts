export interface SigninCreateData {
  name?: string;
  email?: string;
}

export interface SigninRepository {
  create: (data: SigninCreateData) => Promise<void>;
}

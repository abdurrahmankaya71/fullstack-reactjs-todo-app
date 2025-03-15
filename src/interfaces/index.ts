export interface IRegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface IRegisterForm {
  name: keyof IRegisterInput;
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface ILoginInput {
  identifier: string;
  password: string;
}

export interface ILoginForm {
  name: keyof ILoginInput;
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface IErrorResponse {
 error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface ITodo {
  id: number;
  title: string;
  description: string;
  documentId?: string;
}

export class AuthTokenError extends Error{
  code: number;
  constructor(){

    super('Error with authentication token')

    this.code = 401;
  }
}
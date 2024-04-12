export interface JwtConfigInterface {
  secret: string;
  expiresIn: number;
}
export interface UserPayloadInterface {
  _id: string;
}

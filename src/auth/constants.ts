export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
};

export const SALT = +process.env.CRYPT_SALT;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
export const TOKEN_REFRESH_EXPIRE_TIME = process.env.TOKEN_REFRESH_EXPIRE_TIME;

import JWT from 'jsonwebtoken'

export const generateAccessToken = (payload) => {
    // this is to sign the token
    const token = JWT.sign({ user: payload.id }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
    });
    return token;
  };
  

  export const generateRefreshToken = (payload) => {
    //this is to sign the token
    const token = JWT.sign(
      { user: payload.id },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
      }
    );
    return token;
  };
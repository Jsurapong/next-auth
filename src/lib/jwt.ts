import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = { expiresIn: "24h" };

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;

  const secret_key_type_string = secret_key!; // add "!" suffix remove type undefined if variable has two type like string|undefined

  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decode = jwt.verify(token, secret_key!);
    return decode as JwtPayload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

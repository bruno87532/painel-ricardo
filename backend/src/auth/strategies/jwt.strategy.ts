import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        if (req && req.cookies) {
          return req.cookies["access_token"]
        }
        return null
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET_KEY") ?? "",
    });

  }

  async validate(payload: { id: string }) {
    return { 
      id: payload.id, 
    }
  }
}
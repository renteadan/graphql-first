import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Role } from '../enums/role.enum';

export interface RequestUserInterface extends Request {
  user: AuthUserInterface;
}

export interface AuthUserInterface extends DecodedIdToken {
  internal_id: number;
  role: Role;
}

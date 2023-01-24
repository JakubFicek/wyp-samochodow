import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestPracownik } from 'src/typy/requestPracownik.interface';
import JwtAuthenticationGuardPracownik from 'src/weryfikacja/guards/jwt-authenticationP.guard';
import Rola from '../enum/role.enum';

export const RoleGuard = (rolaPodana: Rola): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuardPracownik {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestPracownik>();
      const user = request.user;

      return user?.rola === rolaPodana;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;

import { CanActivateFn } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { inject } from '@angular/core';

export const isTeacherGuard: CanActivateFn = (route, state) => {
  const userservice = inject(UserService)
  if (userservice.getRole() == 'teacher')
    return true
  else if (userservice.getRole() == 'student' || userservice.getRole() == 'admin')
    alert('אין לך הרשאת גישה לדף זה.\nהרשאה למורים בלבד!')
  return false
};

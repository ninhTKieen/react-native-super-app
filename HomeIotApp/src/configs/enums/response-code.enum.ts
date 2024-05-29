export enum EResponseCode {
  Success = 0,

  // Common error
  InternalServerError = 1,
  BadRequestError = 2,
  UnauthorizedError = 3,
  ForbiddenError = 4,
  NotFoundError = 5,
  TimeoutError = 6,

  // Auth error
  AuthEmailExist = 10001,
  AuthUsernameExist = 10002,
  AuthEmailNotExist = 10003,
  AuthUsernameNotExist = 10004,
  AuthWrongPassword = 10005,
  AuthUsernameOrEmailNotExist = 10006,
}

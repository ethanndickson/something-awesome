from werkzeug.exceptions import HTTPException

class AuthError(HTTPException):
    code = 400
    message = ''

class InputError(HTTPException):
    code = 400
    message = ''

class CoffeeError(HTTPException):
    code = 418
    message = "Attempted to brew coffee with a teapot"
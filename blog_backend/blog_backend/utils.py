
from rest_framework.response import Response as DefaultResponse

def Response(data, code, status, message):
    if isinstance(data, list):
        ready_data = []
        for d in data:
            ready_data.append(d)

    else:
        ready_data = data

    response = {
        "status": status,
        "message": message,
        "code": code,
        "data": ready_data
    }

    return DefaultResponse(response, status=code)



class ResponseMessage(object):
    SUCCESS = "Success"
    LOGOUT = "Succesfully logout"
    FORGOT_PASSWORD_OTP = "Forgot password verification code print on your backend terminal"
    RESET_PASSWORD_MAIL_SEND_SUCCESS = "Reset password verification code sent to your email"
    USER_NOT_FOUND_BY_USERNAME = "User Not found with this username"
    SOMETHING_WENT_WRONG = "Something went wrong. Please try again"
    Invalid_OTP = "Invalid OTP"
    PASSWORD_CHANGED = "Password Succesfylly Chnaged"
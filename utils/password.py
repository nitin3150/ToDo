from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def hash_pass(password: str):
    return pwd_context.hash(password)

def verify(user_cred, user_pass):
    return pwd_context.verify(user_cred,user_pass)
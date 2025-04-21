from schema.schema import UserLogin
from sqlalchemy.orm import Session
from db.models import User
from fastapi import HTTPException,status
from utils.password import verify

def user_login(user_credential: UserLogin, db: Session):
    print(user_credential)
    user = db.query(User).filter(User.email == user_credential.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Email not found")
    user_pass = verify(user_credential.password, user.password)

    if not user_pass:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Wrong password")
    print("looged in")
    return {"data": "Logged in"}
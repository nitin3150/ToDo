from schema.schema import UserLogin
from sqlalchemy.orm import Session
from db.models import User
from fastapi import HTTPException,status,Depends
from utils.password import verify
from utils.auth import create_access_token

def user_login(db: Session, user_credential):
    user = db.query(User).filter(User.email == user_credential.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Email not found")
    user_pass = verify(user_credential.password, user.password)

    if not user_pass:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Wrong password")
    secret_token = create_access_token(data={"user_id": user.id})
    return {"token": secret_token}
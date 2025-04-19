from fastapi import HTTPException,status
from schema.schema import UserCreate
from sqlalchemy.orm import Session
from db.models import User
from utils.password import hash_pass

def create_user(user: UserCreate,db: Session):
    check = db.query(User).filter(User.email == user['email']).first()
    if check:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email already registered")
    
    new_user = User(name = user['name'], email = user['email'], password = hash_pass(user['password']))
    db.add(new_user)
    db.commit()
    print("new user created")
    return {f'welcome {user['name']}'}
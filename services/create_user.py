from db.database import get_db
from schema.schema import UserCreate
from fastapi import Depends
from sqlalchemy.orm import Session
from db.models import User

def create_user(user: UserCreate,db: Session):
    new_user = User(name = user['name'], email = user['email'], password = user['password'])
    db.add(new_user)
    db.commit()
    print("new user created")
    return {f'welcome {user['name']}'}
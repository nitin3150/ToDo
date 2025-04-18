# from db.database import get_db
from schema.schema import UserCreate
# from fastapi import Depends
from sqlalchemy.orm import Session
from db.models import User
from utils.pass_hash import hash_pass

def create_user(user: UserCreate,db: Session):
    new_user = User(name = user['name'], email = user['email'], password = hash_pass(user['password']))
    db.add(new_user)
    db.commit()
    print("new user created")
    return {f'welcome {user['name']}'}
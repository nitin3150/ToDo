from sqlalchemy.orm import Session
from services.create_user import create_user
from services.login import user_login
from fastapi import Depends, APIRouter
from db.database import get_db
from db.models import User
from fastapi.params import Body

router = APIRouter(
    prefix = "/user",
    tags=["Users"]
)

@router.post('/')
async def new_user(user: dict = Body(...), db: Session = Depends(get_db)):
    print(user)
    return create_user(user,db)


@router.post('/login')
async def test(user_credential: dict = Body(...), db : Session = Depends(get_db)):
    return user_login(user_credential,db)
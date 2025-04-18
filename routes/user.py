from sqlalchemy.orm import Session
from services.create_user import create_user
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


@router.get('/get-user')
async def test(db : Session = Depends(get_db)):
    users = db.query(User).all()
    return {"Data": users}
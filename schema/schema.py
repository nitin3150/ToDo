from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class CreateTask(BaseModel):
    description: str
    priority: int
    user_id: int
    id : int

class UserLogin(BaseModel):
    email: EmailStr
    password: str
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class CreateTask(BaseModel):
    description: str
    priority: int
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class CreateTask(BaseModel):
    description: str
    priority: int
    user_id: int = None
    completed: bool = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: int = None

class UpdateTask(BaseModel):
    description: str = None
    priority: int = None
    user_id: int = None
    completed: bool = None
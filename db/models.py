from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, func
from db.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, index=True, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, index=True, primary_key=True)
    description = Column(String,nullable=False)
    user_id = Column(Integer,ForeignKey('users.id'), primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    priority = Column(Integer, nullable = False)
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str
    ipAddress:str
    role:str

class User(BaseModel):
    id: int
    name: str
    surname: str
    email: str
    password: str
    ipAddress: str
    role: str
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    name: str
    surname: str
    email: str
    password: str
    ipAddress: str
    role: str
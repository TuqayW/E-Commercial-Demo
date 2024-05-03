from pydantic import BaseModel

class UserCreate(BaseModel):
    name:str
    surname:str
    password:str
    email:str

class User(BaseModel):
    id:int
    name:str
    surname:str
    password:str 
    email:str

    class Config:
        from_attributes=True
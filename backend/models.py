from sqlalchemy import Integer,String,Column,Float
from database import Base

class User(Base):
    __tablename__ = "Users"
    id=Column(Integer,primary_key=True)
    name=Column(String(256))
    surname=Column(String(256))
    password=Column(String(256))
    email=Column(String(256))
    ipAddress=Column(String(256))
    role=Column(String(256))

class Product(Base):
    __tablename__ = "Products"
    id=Column(Integer,primary_key=True)
    imageurl=Column(String(256))
    title=Column(String(256))
    description=Column(String(256))
    price=Column(String(256))
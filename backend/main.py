from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import FastAPI, Depends, HTTPException, status, Body, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session
from database import Base, SessionLocal, engine
import schemas, models

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 5

Base.metadata.create_all(engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

app = FastAPI(docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

def create_access_token(ipAddress: str, data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    SECRET_KEY = ipAddress
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.get("/")
def index():
    return "Hello World!"

@app.post("/signup", response_model=schemas.Token)
def add_student(new_person: schemas.UserCreate, session: Session = Depends(get_session)):
    passo = new_person.password
    secret_key = new_person.ipAddress
    payload = {"data": passo}
    encoded_jwt = jwt.encode(payload, secret_key, algorithm="HS256")
    
    user = session.query(models.User).filter(models.User.email == new_person.email).first()
    if user:
        raise HTTPException(status_code=400, detail="This user already exists")

    user = models.User(
        name=new_person.name,
        surname=new_person.surname,
        email=new_person.email,
        password=encoded_jwt,
        ipAddress=new_person.ipAddress,
        role=new_person.role
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        user.ipAddress, data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer","ipAddress":user.ipAddress,"role":user.role}

@app.get("/getAllUsers", response_model=List[schemas.User])
def getAllUsers(session: Session = Depends(get_session)):
    users = session.query(models.User).all()
    return users

@app.delete("/deleteUser/{id}")
def deleteUserById(id: int, session: Session = Depends(get_session)):
    user = session.query(models.User).get(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {"message": "User deleted successfully"}

@app.get("/getUserById/{id}")
def getUserById(id: int, session: Session = Depends(get_session)):
    user = session.query(models.User).get(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.name

@app.post("/login", response_model=schemas.Token)
def login(email: str = Body(..., embed=True), password: str = Body(..., embed=True), session: Session = Depends(get_session)):
    user = session.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    try:
        decoded_password = jwt.decode(user.password, user.ipAddress, algorithms=[ALGORITHM])["data"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if decoded_password != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        user.ipAddress, data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer","ipAddress":user.ipAddress,"role":user.role}

@app.get("/verify-token")
@app.post("/verify-token")
def verify_token(token: str = Body(..., embed=True), ipAddress: str = Body(..., embed=True)):
    try:
        payload = jwt.decode(token, ipAddress, algorithms=[ALGORITHM])
        exp = payload.get("exp")
        print("Token expiration time:", datetime.utcfromtimestamp(exp))
        print("Current time:", datetime.utcnow())
        return {"valid": True}
    except JWTError as e:
        print("JWT Error:", e)
        return {"valid": False}

@app.post("/add-item")
@app.get("/add-item")
def add_item(new_product:schemas.ProductCreate,session:Session=Depends(get_session)):
    product=models.Product(
        imageurl=new_product.imageurl,
        title=new_product.title,
        description=new_product.description,
        price=new_product.price
    )
    session.add(product)
    session.commit()
    session.refresh(product)
    return {"id":product.id,"imageurl":product.imageurl,"title":product.title,"description":product.description,"price":product.price}

@app.delete("/deleteProduct/{id}")
def deleteUserById(id: int, session: Session = Depends(get_session)):
    user = session.query(models.Product).get(id)
    if not user:
        raise HTTPException(status_code=404, detail="Product not found")
    session.delete(user)
    session.commit()
    return {"message": "Product deleted successfully"}
@app.get("/getAllProducts", response_model=List[schemas.Product])
def getAllProducts(session: Session = Depends(get_session)):
    users = session.query(models.Product).all()
    return users
@app.get("/getProductById/{id}")
def getProductById(id: int, session: Session = Depends(get_session)):
    product = session.query(models.Product).get(id)
    if not product:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id":product.id,"imageurl":product.imageurl,"title":product.title,"description":product.description,"price":product.price}
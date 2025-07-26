from fastapi import APIRouter, HTTPException, status, Depends,Query
from core.database import users_collection,sample_collection
from fastapi.security import OAuth2PasswordRequestForm
from models import user_model
from models.user_model import hash_password
from authentication.auth import create_token
from pydantic import BaseModel, EmailStr
from authentication.auth import get_current_user
from schemas.cart_schema import cartEntityList
from utils.email import send_email
from bson import ObjectId

router = APIRouter()

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

@router.post("/register")
def register(user: UserRegister):
    existing = user_model.find_user_by_email(users_collection, user.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_data = user.dict()
    user_id = user_model.create_user(users_collection, user_data)
    return {"message": "User Registered Successfully", "user_id": user_id}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = user_model.find_user_by_email(users_collection, form_data.username)

    if not user or not user_model.verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer", "role" :user["role"]}

@router.get("/users")
def get_all_users(current_user = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Access Forbidden")
    
    # Get all users except admins
    users = list(users_collection.find({"role": {"$ne": "admin"}}))
    
    # Clean up sensitive info (like password) if needed
    for user in users:
        user["_id"] = str(user["_id"])
        user.pop("password", None)

    return users

@router.get("/total-orders")
def get_total_orders(current_user=Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Access Forbidden")

    # Aggregate the total length of all cart arrays
    pipeline = [
        {
            "$group": {
                "_id": None,
                "total_orders": {"$sum": {"$size": "$cart"}}
            }
        }
    ]

    result = list(users_collection.aggregate(pipeline))
    total_orders = result[0]["total_orders"] if result else 0
    return {"total_orders": total_orders}

@router.get("/admin/user-orders")
def get_all_user_orders(current_user=Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Access Forbidden")

    users = list(users_collection.find({"role": {"$ne": "admin"}}))

    result = []
    for user in users:
        cart_items = user.get("cart", [])
        result.append({
            "email": user["email"],
            "orders": cart_items
        })

    return result


@router.delete("/users/email/{email}")
def delete_user(email: str, current_user=Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Access Forbidden")
    
    result = users_collection.delete_one({"email": email})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": f"User with email {email} deleted successfully"}



@router.post("/checkout")
async def checkout(current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("_id")
    user_email = current_user.get("email")

    # Find the user in DB
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    cart_items = user.get("cart", [])
    if not cart_items:
        raise HTTPException(status_code=404, detail="Your cart is empty")

    # Prepare email invoice
    total_amount = 0
    email_body = f"🧾 Hello {user.get('name', '')},\n\nYour Bookstore Invoice:\n\n"

    for item in cart_items:
        title = item.get("title", "Unknown Book")
        quantity = item.get("quantity", 1)
        book_id = item.get("book_id")

        # Fetch price from books_collection
        book = sample_collection.find_one({"_id": ObjectId(book_id)})
        if book:
            price = book.get("price", 0)
            line_total = price * quantity
            total_amount += line_total
            email_body += f"- {title} (x{quantity}) - ₹{line_total}\n"
        else:
            email_body += f"- {title} (x{quantity}) - ₹??\n"

    email_body += f"\n📦 Total Amount: ₹{total_amount}\n\nThank you for shopping with Pustak! 📚"

    # Send the email
    send_email(
        subject="🧾 Your Pustak Invoice",
        body=email_body,
        to_email=user_email
    )

    # Optionally: Clear user's cart
    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"cart": []}}
    )

    return {"msg": "Checkout successful and invoice emailed."}

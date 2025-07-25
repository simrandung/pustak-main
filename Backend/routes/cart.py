from fastapi import APIRouter, HTTPException, Depends
from core.database import users_collection
from authentication.auth import get_current_user
from schemas.cart_schema import cartEntityList,cartEntity
from pydantic import BaseModel

cart_router = APIRouter()

class CartUpdate(BaseModel):
    title: str
    quantity: int

@cart_router.post("/cart/add")
def add_to_cart(book: dict, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403, detail="Only users can add to cart")
    
    user_email = current_user["email"]
    book_title = book.get("title")

    if not book_title:
        raise HTTPException(status_code=400, detail="Book title is required")
    user = users_collection.find_one({"email":user_email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    cart = user.get("cart",[])
    updated = False

    for item in cart:
        if item["title"] == book_title:
            item["quantity"] +=1
            updated = True
            break
    if not updated:
        cart.append({
            "book_id": book.get("id"),
        "title": book.get("title"),
        "quantity": book.get("quantity", 1)

        })



    result = users_collection.update_one(
        {"email": current_user["email"]},
        {"$set": {"cart": cart}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to add to cart")

    return {"msg": f"Book added to {current_user['email']}'s cart"}

@cart_router.get("/cart")
def get_all_items_cart(current_user:dict = Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403,detail="Only users can access their cart")
    user = users_collection.find_one({"email": current_user["email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return  {
        # "email": user["email"],
        "cart": user.get("cart",[])
    }

@cart_router.put("/cart/update")
def update_cart(item: CartUpdate, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403, detail="Only users can update cart")

    user_email = current_user["email"]
    user = users_collection.find_one({"email": user_email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    cart = user.get("cart", [])
    updated = False

    for cart_item in cart:
        if cart_item["title"] == item.title:
            cart_item["quantity"] = item.quantity
            updated = True
            break

    if not updated:
        raise HTTPException(status_code=404, detail="Item not found in cart")

    result = users_collection.update_one(
        {"email": user_email},
        {"$set": {"cart": cart}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update cart")

    return {"msg": f"Updated quantity for '{item.title}'", "cart": cart}

class CartRemove(BaseModel):
    title: str

@cart_router.put("/cart/remove")
def remove_from_cart(data: CartRemove, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403, detail="Only users can remove from cart")

    user_email = current_user["email"]
    user = users_collection.find_one({"email": user_email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    cart = user.get("cart", [])
    new_cart = [item for item in cart if item["title"] != data.title]

    if len(new_cart) == len(cart):
        raise HTTPException(status_code=404, detail="Item not found in cart")

    result = users_collection.update_one(
        {"email": user_email},
        {"$set": {"cart": new_cart}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to remove item")

    return {"msg": f"Removed '{data.title}' from cart", "cart": new_cart}

@cart_router.put("/cart/clear")
def clear_cart(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403, detail="Only users can clear cart")

    result = users_collection.update_one(
        {"email": current_user["email"]},
        {"$set": {"cart": []}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to clear cart")

    return {"msg": "Cart cleared"}



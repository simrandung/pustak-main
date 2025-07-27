from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from core.database import users_collection, sample_collection
from authentication.auth import get_current_user
from bson import ObjectId
from datetime import datetime

from pydantic import BaseModel


router = APIRouter()

class WishlistBook(BaseModel):
    id: str
    title: str


def send_email_unavailable(email: str, book_title: str):
    print(f"[EMAIL] To: {email} | '{book_title}' is currently out of stock.")

@router.get("/wishlist")
def get_user_wishlist(current_user=Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403, detail="Only users can view wishlist")

    user = users_collection.find_one({"email": current_user["email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"wishlist": user.get("wishlist", [])}

@router.post("/wishlist/add")
def add_to_wishlist(book: WishlistBook, background_tasks: BackgroundTasks, current_user=Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403, detail="Only users can add to wishlist")

    email = current_user["email"]
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    book_id = book.id
    title = book.title

    book_data = sample_collection.find_one({"_id": ObjectId(book_id)})
    if not book_data:
        raise HTTPException(status_code=404, detail="Book not found")

    if any(item["book_id"] == book_id for item in user.get("wishlist", [])):
        raise HTTPException(status_code=400, detail="Book already in wishlist")

    notified_unavailable = False
    if not book_data.get("in_stock", False):
        background_tasks.add_task(send_email_unavailable, email, title)
        notified_unavailable = True

    wishlist_item = {
        "book_id": book_id,
        "title": title,
        "notified_unavailable": notified_unavailable,
        "notified_available": False,
        "created_at": datetime.utcnow()
    }

    users_collection.update_one(
        {"email": email},
        {"$push": {"wishlist": wishlist_item}}
    )

    return {"msg": f"Book '{title}' added to wishlist"}


@router.delete("/wishlist/remove/{book_id}")
def remove_from_wishlist(book_id: str, current_user=Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403, detail="Only users can remove from wishlist")

    email = current_user["email"]
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Remove the book from wishlist
    result = users_collection.update_one(
        {"email": email},
        {"$pull": {"wishlist": {"book_id": book_id}}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Book not found in wishlist")

    return {"msg": f"Book with ID '{book_id}' removed from wishlist"}


from pymongo import MongoClient

conn= MongoClient("mongodb://localhost:27017/")
db = conn["bookstore"]
sample_collection = db["books"]
cart_collection = db["cart"]
users_collection = db["users"]
wishlist_collection = db["wishlist"]

def get_user_collection():
 return users_collection


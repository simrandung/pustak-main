def user_helper(user) -> dict:
    return {
        "id" : str(user["_id"]),
        "username" : user["username"],
        "email" : user["email"],
        "role" : user["role"]
    }



# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str
#     cart: Optional[List[str]] = []
#     wishlist: Optional[List[str]] = []
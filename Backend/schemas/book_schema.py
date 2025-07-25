def bookEntity(item) -> dict:
    return {
        "id":str(item["_id"]),
        "title": item["title"],
        "author": item["author"],
        "price": item["price"],
        "cover_image": item["cover_image"],
        "in_stock": item["in_stock"]
    }
def booksEntity(entity) ->list:
    return [bookEntity(item) for item in entity]
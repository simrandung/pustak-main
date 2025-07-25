from models.book_model import Book
from fastapi import HTTPException, Path

books_db =[
    {
        "id": 1,
        "title": "Sample Book",
        "author": "John Doe",
        "price": 19.99,
        "cover_image": "http://example.com/cover.jpg"
    }
]

async def fetch_books(title):
    if title: 
      filtered_books = [book for book in books_db if title.lower() in book['title'].lower()]
      return filtered_books
    return books_db

async def get_book(book_id:int = Path(..., description="The ID of the book to retrieve")):
    for book in books_db:
        if book['id'] == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

async def add_book(book: Book):
    for existing_book in books_db:
        if existing_book['id'] == book.id:
            raise HTTPException(status_code=400, detail="Book with this ID already exists")
    new_book = book.model_dump()
    new_book['id'] = len(books_db) + 1 
    books_db.append(new_book)
    return new_book

async def update_book(book_id: int, book: Book):
    for index, existing_book in enumerate(books_db):
        if existing_book['id'] == book_id:
            updated_book = book.model_dump()
            updated_book['id'] = book_id  
            books_db[index] = updated_book
            return updated_book
    raise HTTPException(status_code=404, detail="Book not found")
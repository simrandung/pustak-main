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
    # {
    #     "id": 2,
    #     "title": "Another Book",
    #     "author": "Jane Smith",
    #     "price": 29.99,
    #     "cover_image": "http://example.com/another_cover.jpg"
    # }
]

#get all books
async def fetch_books(title):
    # fetches all boooks in my db
    if title: 
      filtered_books = [book for book in books_db if title.lower() in book['title'].lower()]
      return filtered_books
    return books_db

#get book by id
async def get_book(book_id:int = Path(..., description="The ID of the book to retrieve")):
    # fetches book by id
    for book in books_db:
        if book['id'] == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

#add a book
async def add_book(book: Book):
    for existing_book in books_db:
        if existing_book['id'] == book.id:
            raise HTTPException(status_code=400, detail="Book with this ID already exists")
    # adds a book to the db
    new_book = book.model_dump()
    new_book['id'] = len(books_db) + 1  # Simple ID generation
    books_db.append(new_book)
    return new_book

#update a book
async def update_book(book_id: int, book: Book):
    # updates a book in the db
    for index, existing_book in enumerate(books_db):
        if existing_book['id'] == book_id:
            updated_book = book.model_dump()
            updated_book['id'] = book_id  # Maintain the same ID
            books_db[index] = updated_book
            return updated_book
    raise HTTPException(status_code=404, detail="Book not found")
# def get_data():
#    sample = sample.find({})
import random

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from data import RandomPayloadDTO, CardInfoDTO

app = FastAPI()

# TODO: DELETE FOLLOWING SECURITY HOLES:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/random")
def random_number() -> RandomPayloadDTO:
    rand = random.randint(1, 10)
    message = "hello world"
    dto = RandomPayloadDTO(
        message=message,
        number=rand
    )
    return dto

@app.get("/random-card-list")
def random_card_list() -> list[CardInfoDTO]:
    return [
        CardInfoDTO(name="example name", description="example description of how a card works"),
        CardInfoDTO(name="example name 2", description="example description of how a different card works"),
    ]

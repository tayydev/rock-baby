from pydantic import BaseModel


class RandomPayloadDTO(BaseModel):
    message: str
    number: int


class CardInfoDTO(BaseModel):
    name: str  # icon is conventionally [name].png
    description: str

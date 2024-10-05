from pydantic import BaseModel


class RandomPayloadDTO(BaseModel):
    message: str
    number: int

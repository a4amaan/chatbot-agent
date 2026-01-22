# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Markdown ChatBot API")

# CORS configuration to allow React frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request model
class Question(BaseModel):
    message: str


# Chat endpoint returning Markdown
@app.post("/chat")
def chat_bot(data: Question):
    markdown_text = f"""
# ChatBot Reply

You asked:

> {data.message}

---

## Text Formatting

- **Bold text**
- *Italic text*
- ~~Strikethrough~~
- `Inline code`

## Links & Images

- [FastAPI Website](https://fastapi.tiangolo.com)
- ![FastAPI Logo](https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png)

## Code Block

```python
def hello():
    print("Hello from FastAPI")
```

This is a sample response.
"""

    return {"response": markdown_text}

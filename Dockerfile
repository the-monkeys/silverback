FROM python:3.12-slim

WORKDIR /app

ENV DJANGO_SECRET_KEY=${DJANGO_SECRET_KEY}
ENV CREDENTIALS=${CREDENTIALS}
ENV DEBUG=${DEBUG} 

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install uvicorn

COPY . /app

EXPOSE 8000

CMD ["uvicorn", "silverback.asgi:application", "--host", "0.0.0.0"]

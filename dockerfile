FROM python:3.9.13-slim

# set work directory
WORKDIR /BEREBEL

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /BEREBEL

# install dependencies
RUN pip install flask

# copy project
ADD /back-end/ /BEREBEL/app/
ADD /front-end/ /BEREBEL/front/
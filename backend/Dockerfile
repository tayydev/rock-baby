FROM python:3.12.1 AS demo-python-image
# set working directory
WORKDIR /usr/src/
# copy from current directory in real space to current directory in linux space
COPY . .

# Install python dependencies (note this is technically not the right way to install poetry)
RUN pip install poetry
RUN poetry env use $(which python)
RUN poetry install

CMD poetry run python src

# mafia
Mafia Web Application

## How to install and run
git clone https://github.com/Fernando-LopezGarcia/mafia.git

cd mafia/back-end/

The next two lines is just to create a virtual enviroment:

python3 -m venv ~/.virtualenvs/tempenv

source ~/.virtualenvs/tempenv/bin/activate

pip install -r requirements.txt

export FLASK_APP=application.py

flask run

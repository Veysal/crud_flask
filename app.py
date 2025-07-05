import sqlite3
from flask import Flask, render_template, request, redirect, url_for

# Создание базы даных users
conn = sqlite3.connect("users.db")
cursor = conn.cursor()

# Создаем таблицу users
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,         
        last_name TEXT NOT NULL,
        gender TEXT NOT NULL,
        age INTEGER NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        salary REAL NOT NULL
    )
""")

conn.commit()
conn.close()

app = Flask(__name__)

def get_db_conn():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def main():
    conn = get_db_conn()
    sort_by = request.args.get("sort_by", "last_name")
    search_query = request.args.get("search", "")

    conn.close()
    return render_template("index.html")

@app.route("/add", methods = ["GET", "POST"])
def add_user():
    if request.method == "POST":
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        gender = request.form.get("gender")
        age = int(request.form.get("age"))
        phone = request.form.get("phone")
        email = request.form.get("email")
        address = request.form.get("addres")
        salary = float(request.form.get("salary"))

        conn = get_db_conn()
        conn.execute("""
            INSERT INTO users(first_name, last_name, gender, age, phone, email, address, salary)
            VALUES(?,?,?,?,?,?,?,?)
        """, (first_name, last_name, gender, age, phone, email, address, salary))
        conn.commit()
        conn.close()
        return redirect(url_for('main'))
    return render_template("add_user.html")


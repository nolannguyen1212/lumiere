<h2 align="center">━━━━━━ ❖ ━━━━━━</h2>

<div align="center" style="margin: 20px 0;">

![](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)
![](https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white)
![](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

</div>

<h1 align="center">🛒 XSHOP</h1>
<h3 align="center">Modern E-Commerce Backend with Django & Stripe</h3>

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/william1nguyen/xshop?style=social)](https://github.com/william1nguyen/xshop)
[![GitHub forks](https://img.shields.io/github/forks/william1nguyen/xshop?style=social)](https://github.com/william1nguyen/xshop/fork)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

</div>

---

## ✨ Features

- 🔐 **Authentication**: Secure user registration/login with Bcrypt hashing
- 🛍️ **Product Management**: Full CRUD operations via Django Admin
- 💳 **Stripe Integration**: Payment processing with Stripe Elements
- 🌍 **Multi-Region Support**: US & Vietnam addresses
- 📊 **Admin Dashboard**: Django Admin interface
- ✅ **Test Coverage**: 81% test coverage

---

## 🏗️ Tech Stack

| Component           | Technology/Package    |
| ------------------- | --------------------- |
| **Framework**       | Django REST Framework |
| **Database**        | MySQL                 |
| **Payment Gateway** | Stripe API            |
| **Frontend**        | React.js              |
| **Auth**            | Bcrypt                |
| **Testing**         | Coverage.py           |

---

## 🚀 Quick Start

### 📋 Prerequisites

- Python 3.10+
- MySQL Server 8.0+
- Stripe Account

### ⚙️ Setup

```bash
$ git clone https://github.com/william1nguyen/xshop.git

$ cd xshop
$ brew install mysql-client pkg-config
$ export PKG_CONFIG_PATH="$(brew --prefix)/opt/mysql-client/lib/pkgconfig"
$ pipenv install && pipenv shell
$ cp .env.example .env

# Update .env values
$ python manage.py migrate
$ python manage.py runserver
```

### 💳 Stripe Testing

```yaml
Card Number: 4242 4242 4242 4242
Expiry: 04/44
CVC: 444
```

### 🧪 Testing

```bash
$ coverage run manage.py test tests
$ coverage report -m
```

### 📂 Project Structure

```bash
xshop/
├── authen/
├── client/
├── ecommerce/
├── payment/
├── static/
├── store/
├── tests/
├── Dockerfile
├── Pipfile
├── Pipfile.lock
└── manage.py
```

### 📜 License

MIT License • See LICENSE for details

<div align="center"> <p>Made with ❤️ by Nova</p> <a href="https://github.com/william1nguyen"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"> </a> </div> ```

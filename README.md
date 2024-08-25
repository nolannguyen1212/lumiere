# ECOINBE

- This is backend for **Ecoin** ecommerce website.
- **Admin Site :** `Django` provide us a wonderful Admin Management Site.
- **Payment Method :** We are using `Stripe` (Stripe Elements) for virtualing a payment.
  - Region: We currently support `US` and `VN` using Stripe Address Elements.
  - Default Development Stripe Card:
    - `Card number`: 4242 4242 4242 4242
    - `Expiration`: 04/44
    - `CVC`: 444

### How to update/view Product/Order

- Open Admin Site

  ```
  python manage.py runserver
  ```

- Access `BASE_URL/admin`.

## Architecture & Relate Packages

- `Django Rest Framework`
- `ReactJs`
- `Bcrypt`
- `Stripe` **(for payment)**
  > [!WARNING]
  > React Alert: `react-hot-toast`
  > I use `ReacJS` for **Frontend**, so before deploying, **ReactJS** was exported.

- `Coverage & Django testing module` **(for testing)**: cover 81%.

## Requirements

- `Python ~ 3.12`

## Setup virtual env (Optional)

### Setup `Pipenv`

- See how to install [asdf](https://asdf-vm.com/guide/getting-started.html)
- Setup `pipenv`:

  ```
  $ pipenv shell
  ```

- Choose suitable version by modifying python version in Pipfile and run

  ```
  $ pipenv install
  ```

  > [!WARNING] > `pipenv` will create `Pipfile` and `Pipfile.lock` file in order to determine `python version` and packages used.

## Optional Setup Database

- In this project I use `db.sqlite3` thanks to it's easiness.
- You can use another like `MySQL, PostgresSQL, ...` by setting in `Settings.py`

  ```
  DATABASES = {
      "default": {
          "ENGINE": "django.db.backends.sqlite3",
          "NAME": BASE_DIR / "db.sqlite3",
      }
  }
  ```

  $\rightarrow$ Change `ENGINE` to other databases that are supported.

## How to run

### Local setup

- **Install packages**
  ```
  $ pipenv shell
  $ pipenv install
  ```
- **Configure Environment**
  Create a .env file from the provided .env.example and update the values accordingly.
  ```
  $ cp .env.example .env
  $ export $(grep -v '^#' .env | xargs)
  ```
- **Initialize models database with Django**
  ```
  $ python manage.py migrate
  ```
- **Run the Application**

  ```
  $ python manage.py runserver
  ```

- **Run tests after updating modules**

  ```
  $ coverage run manage.py test tests
  $ coverage report
  ```

# Lumière

Django REST + React ordering platform for a fine-dining restaurant, with Stripe checkout.

## Tech Stack

| Component  | Technology             |
| ---------- | ----------------------- |
| Backend    | Django REST Framework   |
| Database   | SQLite                  |
| Realtime   | Django Channels (WebSocket notifications) |
| Payments   | Stripe API              |
| Frontend   | React + Vite            |
| Auth       | JWT (djangorestframework-simplejwt) |
| Dependency management | uv (backend), npm (frontend) |

## Quick Start

### Prerequisites

- Python 3.12+
- [uv](https://docs.astral.sh/uv/)
- Node.js 20+
- A Stripe account (for payment testing)

### Backend

```bash
git clone https://github.com/nolannguyen1212/lumiere.git
cd lumiere

uv sync
cp .env.example .env
# fill in .env values

uv run python manage.py migrate
uv run python manage.py seed_menu
uv run python manage.py runserver
```

### Frontend

```bash
cd client
npm install
cp .env.example .env
# fill in .env values

npm run dev
```

Or use the `Makefile` shortcuts: `make install`, `make migrate`, `make api`, `make web`, `make dev`.

### Stripe Testing

```yaml
Card Number: 4242 4242 4242 4242
Expiry: 04/44
CVC: 444
```

### Testing

```bash
uv run coverage run manage.py test tests
uv run coverage report -m
```

Frontend:

```bash
cd client
npm run lint
npm run build
```

### Project Structure

```
lumiere/
├── authen/          # user model, auth endpoints
├── client/           # React frontend
├── menu/             # menu items, orders, cart
├── notifications/    # WebSocket notifications
├── payment/          # Stripe checkout endpoints
├── lumiere/           # Django project settings/urls
├── tests/            # backend test suite
├── Dockerfile
├── pyproject.toml
├── uv.lock
├── Makefile
└── manage.py
```

### License

MIT License • See LICENSE for details

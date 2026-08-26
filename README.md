# Lumière

Fine-dining ordering platform. Django (DRF + Channels) backend, React SPA frontend, Stripe checkout, real-time notifications.

## Architecture

```mermaid
%%{init: {'flowchart': {'curve': 'basis'}}}%%
graph TD
  subgraph Client["React SPA"]
    UI[Pages / Components]
    CTX[Contexts]
    API[axios + JWT interceptor]
    WS[WebSocket client]
  end

  UI --> CTX --> API
  UI --> WS

  subgraph Server["Django · Daphne (ASGI)"]
    REST[DRF views]
    CHAN[Channels consumer]
    APPS[authen · menu · payment · notifications]
  end

  API -->|"/api/*"| REST
  WS -->|"/ws/notifications?token="| CHAN
  REST --> APPS
  APPS -->|"notify_user to group_send"| CHAN

  APPS --> DB[(SQLite)]
  APPS --> STRIPE[Stripe API]
```

## Data Model

```mermaid
erDiagram
  USER ||--o| USERINFO : has
  USER ||--o{ ORDER : places
  USER ||--o{ NOTIFICATION : receives
  MENUITEM ||--o{ ORDERITEM : "ordered as"
  ORDER ||--o{ ORDERITEM : contains
  ORDER ||--o{ PAYMENT : "paid by"
  ORDER ||--o{ NOTIFICATION : "about"

  USER {
    uuid id
    string email
    string role
  }
  USERINFO {
    uuid id
    string firstname
    string lastname
    string phone
  }
  MENUITEM {
    uuid id
    string name
    decimal price
    string category
    bool is_chef_special
  }
  ORDER {
    uuid id
    bool complete
    datetime date_ordered
  }
  ORDERITEM {
    uuid id
    int quantity
  }
  PAYMENT {
    uuid id
    string status
    decimal amount
  }
  NOTIFICATION {
    uuid id
    string kind
    string message
    bool read
  }
```

## Order Flow

```mermaid
sequenceDiagram
  participant C as Client
  participant M as menu
  participant P as payment
  participant S as Stripe
  participant N as notifications

  C->>M: POST /api/order-items
  C->>P: POST /payment/create-checkout-session
  P->>S: create PaymentIntent (server-computed total)
  C->>S: confirm payment (Stripe Elements)
  C->>M: PUT /api/orders (complete)
  M->>N: notify_user()
  N-->>C: push via WebSocket
```

## Auth Flow

```mermaid
sequenceDiagram
  participant C as App code
  participant I as axios interceptor
  participant A as authen

  C->>I: POST /api/users/login
  I->>A: forward
  A-->>C: access_token + refresh_token

  Note over C,A: ...access_token expires...

  C->>I: any request
  I->>A: forward with access_token
  A-->>I: 401
  I->>A: POST /api/users/token/refresh
  A-->>I: new access_token
  I->>A: retry original request
  A-->>I: 200
  I-->>C: 200 (expiry invisible to caller)
```

## Quick Start

```bash
uv sync
cp .env.example .env
uv run python manage.py migrate
uv run python manage.py seed_menu
uv run python manage.py runserver

cd client
npm install
cp .env.example .env
npm run dev
```

---
layout: single
comments: true
title: Design Deliveroo
date: 2026-01-06 00:00:00-0000
categories: ['System Design']
---

# Deliveroo System Design

This post provides a detailed system design for Deliveroo, including functional and non-functional requirements, capacity estimations, database schema, API design, microservice architecture, and detailed operation flows.

## Functional Requirements

The following core features constitute the minimum viable product (MVP):

1. **Search & Discovery:** Customers can search for restaurants and view menus.  
2. **Ordering:** Customers can select items and place orders.  
3. **Order Acceptance:** Restaurants receive and accept or reject orders.  
4. **Dispatching:** The system assigns a rider to the order automatically or manually.  
5. **Tracking:** Customers can track the rider's location in real-time.  

## Non-Functional Requirements

Key system qualities include:

- **High Availability:** Ensure system operability during peak hours (e.g., lunch/dinner).  
- **Low Latency:** Critical for browsing menus and tracking riders.  
- **Scalability:** Handle spikes in traffic, such as Friday night dinner rush.  

### Consistency Trade-offs (CAP Theorem)

- **Strong Consistency:** Required for payments and order inventory to prevent double-booking.  
- **Eventual Consistency:** Acceptable for rider location and menu/pricing updates to prioritize availability.  

## Capacity Estimations

### Traffic & Volume Estimates

- **Total Users:** 100 million  
- **Daily Active Users (DAU) placing orders:** ~1 million (1% of total)  
- **Total Orders Per Day:** 1 million  

### Throughput (Requests Per Second)

| Metric          | Average Load | Peak Load (10x) |
|-----------------|--------------|-----------------|
| Orders (Writes)  | ~12 RPS      | ~120 RPS        |
| Browsing (Reads) | ~120 RPS     | ~1,200 RPS      |
| Rider Updates   | 200,000 RPS | 200,000 RPS     |

*Rider updates occur continuously while riders are active and represent a consistently high load.*

### Architecture Takeaways

- **Order Service:** Low volume (~120 RPS) but requires strong consistency (ACID transactions).  
- **Rider Location Service:** Extremely high volume (200k RPS), data is ephemeral and supports eventual consistency.  

## Database Schema

### 1. User Service

**users**

- user_id (PK)  
- name  
- email (Unique)  
- phone_number  
- password_hash  

**saved_addresses**

- address_id (PK)  
- user_id (FK)  
- label (e.g., "Home", "Work")  
- street_address  
- city  
- zip_code  
- latitude / longitude  

### 2. Restaurant Service

**restaurants**

- restaurant_id (PK)  
- name  
- phone_contact  
- is_active (Boolean)  
- cuisine_type  

**restaurant_hours**

- restaurant_id (FK)  
- day_of_week (0=Sunday)  
- open_time  
- close_time  

**menu_items**

- item_id (PK)  
- restaurant_id (FK)  
- name  
- description  
- base_price  
- is_available (Boolean)  

### 3. Order Service

**orders**

- order_id (PK)  
- user_id (FK)  
- restaurant_id (FK)  
- rider_id (FK, Nullable)  
- delivery_address_id (FK)  
- status (PLACED, PREPARING, PICKED_UP, DELIVERED, CANCELLED)  
- total_amount  
- created_at  

**order_items**

- order_id (FK)  
- item_id (FK)  
- quantity  
- price_at_purchase  

### 4. Rider Service

**riders**

- rider_id (PK)  
- name  
- phone_number  
- vehicle_type  
- current_status (OFFLINE, IDLE, BUSY)  

> Live GPS coordinates are stored in Redis, not in the database.

## API Design

### Consumer-Facing APIs

**Place Order:**  
- POST `/v1/orders`  
- Request:  
```json
{
  "restaurant_id": "r_123",
  "address_id": "addr_555",
  "items": [
    { "item_id": "i_99", "quantity": 1, "options": ["spicy"] }
  ]
}
```
- Response:  
```json
{ "order_id": "o_777", "status": "PLACED" }
```

**Get Order Status:** GET `/v1/orders/{order_id}`  

- Response:  
```json
{
  "order_id": "o_777",
  "status": "PICKED_UP",
  "rider_id": "rid_789",
  "delivery_address_id": "addr_555",
  "items": [
    { "item_id": "i_99", "quantity": 1, "name": "Spicy Chicken Wings", "price": 12.00 }
  ],
  "total_amount": 25.00,
  "created_at": "2026-01-06T12:00:00Z",
  "rider_location": {
    "lat": 51.5074,
    "long": -0.1278,
    "timestamp": 1678901234
  }
}
```

**Get Order History:** GET `/v1/orders?limit=10&offset=0`  

- Response:  
```json
[
  {
    "order_id": "o_776",
    "status": "DELIVERED",
    "total_amount": 18.50,
    "created_at": "2026-01-05T18:30:00Z"
  },
  {
    "order_id": "o_777",
    "status": "PICKED_UP",
    "total_amount": 25.00,
    "created_at": "2026-01-06T12:00:00Z"
  }
]
```

**Restaurant Search:** GET `/restaurants/search`  

- Response:  
```json
[
  {
    "restaurant_id": "r_123",
    "name": "London Pizza",
    "cuisine_type": "Italian",
    "is_active": true
  }
]
```

**Menu Fetch:** GET `/restaurants/{id}/menu`  

- Response:  
```json
[
  {
    "item_id": "i_99",
    "name": "Spicy Chicken Wings",
    "description": "Hot and crispy wings with special sauce",
    "base_price": 12.00,
    "is_available": true
  },
  {
    "item_id": "i_100",
    "name": "Margherita Pizza",
    "description": "Classic cheese and tomato",
    "base_price": 10.00,
    "is_available": true
  }
]
```

### Restaurant APIs

- Poll for new orders: GET `/v1/orders?status=PLACED&restaurant_id={id}`  
- Accept/update order: PATCH `/v1/orders/{order_id}/status`  
```json
{ "status": "ACCEPTED", "prep_time_minutes": 15 }
```
- Menu management: POST `/v1/restaurants/{id}/menu-items` (add), PATCH `/v1/restaurants/{id}/menu-items/{item_id}` (update availability)  

### Rider APIs

- Location updates (200k RPS): POST `/v1/rider/location`  
```json
{ "lat": 51.507, "long": -0.127, "timestamp": 1678900000 }
```
- Job management:  
  - POST `/v1/orders/{id}/accept`  
  - POST `/v1/orders/{id}/pickup`  
  - POST `/v1/orders/{id}/deliver`  

### Internal Services

- Dispatch Service: POST `/internal/dispatch/match` (Input: order details, Output: best rider)  
- Payment Service: POST `/internal/payments/charge`  

## End-to-End Operation Flows

### Customer Flow

1. The customer searches for restaurants and browses menus via the Restaurant & Menu service. `GET /restaurants/search?query=pizza&location=London`
2. When placing an order, the Order service validates the request, calculates totals, and creates an order record with status `PLACED`. `POST /v1/orders`
3. The Payment service processes the customer's payment securely and updates order payment status. `POST /internal/payments/charge`
4. Upon successful payment, the Dispatch service is triggered to assign the most optimal rider automatically based on proximity, availability, and workload. `POST /internal/dispatch/match`
5. The customer receives real-time push notifications about order acceptance, rider assignment, and delivery status via the Notification service.
6. The customer can track the rider's live location through the Driver Location service, which streams GPS updates in real-time. `GET /v1/orders/o_777/status`

### Restaurant Flow

1. Restaurants poll for new orders from the Order service. `GET /v1/orders?status=PLACED&restaurant_id=r_123`
2. Upon receiving an order, the restaurant accepts or rejects it by updating order status. `PATCH /v1/orders/o_777/status`
3. Once accepted, the restaurant prepares the order and updates the status to `PREPARING`. `PATCH /v1/orders/o_777/status`
4. Real-time push notifications notify the restaurant of rider assignment and order pickup.
5. The restaurant can manage menu items and availability through the Restaurant & Menu service APIs. `POST /v1/restaurants/r_123/menu-items`

### Rider Flow

1. Riders continuously send location updates to the Driver Location service at high throughput. `POST /v1/rider/location`
2. When a new order is assigned by the Dispatch service, riders receive a notification with order details.
3. Riders accept the job, update status to `BUSY`, and proceed to pick up the order `POST /v1/orders/o_777/accept`
4. Upon pickup, the rider updates the order status to `PICKED_UP`. `POST /v1/orders/o_777/pickup`
5. Riders deliver the order and update the status to `DELIVERED`. `POST /v1/orders/o_777/deliver`
6. Throughout the delivery, the rider’s live location is streamed for customer tracking.

### Payment Flow

1. When an order is placed, the Payment service securely charges the customer's payment method.  `POST /internal/payments/charge`
2. Payment status is updated in the Order service to ensure strong consistency.
3. The Payment service handles refunds or cancellations if needed. `POST /internal/payments/refund`
4. Payment events trigger notifications to customers and restaurants about payment confirmation or issues.

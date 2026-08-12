
````markdown
# Purchase Request

A responsive Purchase Request frontend application designed for outlet branches to request operational supplies directly from Head Office.

This project was developed as part of the **Technical Test UI/UX & Frontend - Purchase Requests**.

The application focuses on providing a simple, clear, and efficient ordering flow for outlet coordinators or owners, from browsing products to reviewing and submitting a purchase request.

---

## 🔗 Submission Links

- **Live Demo:** https://web-outlet-os.vercel.app/
- **Figma Design:** https://www.figma.com/design/KSVYCLOQUm0DgAuyAMYaaM/web-buat-tes?node-id=0-1&t=MzBD7IuE3SPHeY19-1
- **GitHub Repository:** https://github.com/XsanZ02/web-outlet-os

> The Live Demo provides access to the deployed frontend application.
>
> Figma is provided with view access as required by the technical test.

---

## 🛠️ Technology Stack

### Core Technologies

- **Next.js** - React framework used as the main application framework and project structure.
- **React** - Used to build reusable and interactive UI components.
- **TypeScript** - Used for type-safe development and better code maintainability.
- **Tailwind CSS** - Used for responsive styling and consistent UI implementation.
- **ESLint** - Used to maintain code quality and consistency.

### Frontend Architecture

The application uses a **feature-based component architecture**.

Purchase Request related components, hooks, data, types, and utilities are grouped together inside the `purchase-request` feature.

Client-side state is used to manage:

- Shopping cart
- Product quantity
- Request form state
- Notification state
- Submission state

The application is currently **frontend-only** and uses mock/static data. No backend or database connection is required for the technical test.

---

## ✨ Features

### Product Catalog

- Display operational products available for purchase.
- Product information includes:
  - Product name
  - Category
  - Price
  - Available stock
  - Product image
- Search products.
- Filter products by category.
- Display available and out-of-stock states.

### Shopping Cart

- Add products to the cart.
- Increase product quantity.
- Decrease product quantity.
- Remove products from the cart.
- Automatically calculate:
  - Total items
  - Subtotal
  - Line total
- Prevent quantity from exceeding available stock.
- Prevent quantity from becoming negative.
- Display an empty cart state.
- Provide immediate visual feedback when a product has been added to the cart.
- Allow quantity adjustment directly from the product catalog.

### Purchase Request

- Review selected products before submission.
- Select a payment method.
- Fill in the required request details.
- Validate request information before submission.
- Display loading state during submission.
- Prevent repeated submission while processing.
- Display a successful submission state.
- View submitted request details.
- Display request status information.

### Notifications

- Display notification indicator in the application header.
- Display unread notification count.
- Open notification list.
- Mark individual notifications as read.
- Mark all notifications as read.

### Responsive Design

The application is designed for:

- Desktop
- Tablet
- Mobile

The core ordering flow remains accessible across different screen sizes.

---

# 🎨 UI/UX Decisions

The interface was designed around the assumption that the primary users are **outlet coordinators or outlet staff who need to request operational supplies quickly and with minimal friction**.

The main UI/UX decisions are described below.

### 1. Product-first ordering flow

The product catalog is placed as the primary content area because selecting operational supplies is the main task.

The ordering flow is intentionally kept simple:

```text
Browse Products
      ↓
Search / Filter
      ↓
Add to Cart
      ↓
Adjust Quantity
      ↓
Review Cart
      ↓
Fill Request Details
      ↓
Submit Request
````

This reduces unnecessary navigation and keeps the user focused on completing the purchase request.

### 2. Immediate cart feedback

When a product is added to the cart, the product card immediately changes from the **"Add to Cart"** action into a quantity control and displays an **"In Cart"** state.

This was chosen to avoid ambiguity about whether an item has been successfully added.

Users can also adjust the quantity directly from the product card without having to open the cart first.

### 3. Stock-aware quantity controls

Quantity controls respect the available product stock.

Users cannot increase the requested quantity beyond the available stock.

This provides immediate frontend validation and helps prevent invalid purchase requests.

### 4. Clear information hierarchy

The interface separates important information into clear visual groups:

* Product information
* Category
* Price
* Stock
* Cart actions
* Request information
* Submission status

Typography, spacing, cards, badges, and button hierarchy are used to help users scan information quickly.

### 5. Persistent header

The header remains accessible while scrolling so important actions such as:

* Cart
* Notifications
* Navigation

remain easy to access without requiring the user to scroll back to the top.

### 6. Clear submission feedback

After submitting a purchase request, the application displays a dedicated success state instead of silently navigating away.

The success state communicates that the request has been submitted and provides access to the submitted request details.

### 7. Responsive interaction

The layout adapts to different screen sizes while maintaining the same core ordering flow.

On smaller screens, content is stacked vertically to prioritize readability and touch interaction.

### 8. Interaction feedback

Interactive elements provide visual feedback through:

* Hover states
* Active states
* Disabled states
* Loading states
* Cart state changes
* Notification indicators
* Page/view transitions

The goal is to make important user actions feel acknowledged and predictable.

### 9. Minimal visual complexity

The interface intentionally avoids unnecessary decorative elements.

The primary goal is to make the purchasing workflow clear and efficient rather than making the interface visually complex.

---

# 🧠 Assumptions

Because the technical test focuses on UI/UX and frontend implementation and does not provide a complete backend specification, several assumptions were made during development.

### 1. Frontend-only implementation

The application is implemented without a backend or database.

Product data, cart state, and notification data are handled on the client side using mock/static data.

In a production environment, these would be connected to backend APIs and persistent storage.

### 2. Authentication is outside the scope

The technical test does not specify an authentication flow.

Therefore, the application assumes that the current user is already authenticated as an outlet user.

### 3. Product inventory is provided by the system

The product catalog contains predefined products with:

* Product name
* Category
* Price
* Image
* Stock quantity

Frontend validation is used to prevent users from requesting more items than the displayed stock.

In production, final stock validation should always be handled by the backend.

### 4. Purchase requests require approval

A submitted purchase request is assumed to require further review or approval from Head Office or the procurement team.

Because of this assumption, the interface provides request status information and a request details view.

### 5. Notification data is mocked

Notifications are currently represented using local/mock data.

In a production implementation, notification data would be retrieved from a backend service and could potentially use real-time communication.

### 6. Payment method is informational

The selected payment method represents the intended payment method for the purchase request.

Actual payment processing is outside the scope of this technical test.

### 7. Request persistence is not implemented

Submitted request information is represented within the frontend application for demonstration purposes.

A production implementation would persist the request through an API and associate it with the authenticated outlet/user.

---

# 🧩 Component Architecture

The application follows a component-based architecture to keep UI elements reusable and responsibilities clearly separated.

A simplified structure is:

```text
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── QuantityInput.tsx
│   │   ├── Badge.tsx
│   │   ├── EmptyState.tsx
│   │   └── LoadingSpinner.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       └── PageContainer.tsx
│
├── features/
│   └── purchase-request/
│       ├── components/
│       │   ├── ProductCard.tsx
│       │   ├── ProductCatalog.tsx
│       │   ├── ProductFilters.tsx
│       │   ├── Cart.tsx
│       │   ├── CartItem.tsx
│       │   ├── CartModal.tsx
│       │   ├── RequestDetailsForm.tsx
│       │   ├── RequestSuccess.tsx
│       │   ├── RequestDetailsView.tsx
│       │   └── RequestStatusTimeline.tsx
│       │
│       ├── data/
│       │   └── products.ts
│       │
│       ├── hooks/
│       │   └── usePurchaseCart.ts
│       │
│       ├── types/
│       │   └── purchase-request.ts
│       │
│       └── utils/
│           └── getPaymentMethodLabel.ts
│
└── lib/
    └── utils.ts

app/
├── globals.css
├── layout.tsx
└── page.tsx
```

### Component Responsibilities

| Component               | Responsibility                                     |
| ----------------------- | -------------------------------------------------- |
| `ProductCatalog`        | Renders the product collection                     |
| `ProductCard`           | Displays product information and cart interactions |
| `ProductFilters`        | Handles product search and category filtering      |
| `Cart`                  | Displays the cart summary                          |
| `CartItem`              | Handles individual cart item quantity and removal  |
| `CartModal`             | Provides the expanded cart interface               |
| `RequestDetailsForm`    | Collects request and payment information           |
| `RequestSuccess`        | Displays successful request submission             |
| `RequestDetailsView`    | Displays submitted request information             |
| `RequestStatusTimeline` | Displays request progress and status               |
| `Header`                | Provides global navigation and primary actions     |
| `QuantityInput`         | Reusable quantity adjustment control               |
| `usePurchaseCart`       | Centralizes cart state and cart operations         |

---

# 📐 Design Principles

The interface follows several principles throughout the implementation:

* **Clarity over decoration**
* **Minimal steps to complete a request**
* **Immediate feedback for user actions**
* **Consistent spacing and component behavior**
* **Responsive by default**
* **Reusable UI components**
* **Clear handling of loading, empty, disabled, and success states**
* **Maintainable component structure**

The design intentionally keeps the purchasing workflow as the primary focus.

---

# 🚀 Getting Started

## Requirements

* Node.js 18+
* npm

## Installation

```bash
git clone https://github.com/XsanZ02/web-outlet-os.git

cd web-outlet-os

npm install
```

## Run Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
```

## Run Lint

```bash
npm run lint
```

---

# 📦 Project Scope

This project focuses on the **UI/UX and frontend implementation** of a Purchase Request workflow.

## Included

* Product catalog
* Product search and filtering
* Shopping cart management
* Stock-aware quantity control
* Request details form
* Payment method selection
* Request submission flow
* Request success state
* Request details view
* Notification interaction
* Responsive UI
* Reusable component architecture
* Interactive UI states and transitions

## Not Included

* Backend API
* Database
* Authentication
* Real payment processing
* Real-time inventory synchronization
* Production notification service

These areas can be integrated through backend APIs in a production environment.

---

# 🧪 Validation

The application can be validated using the following commands:

```bash
npm run lint
npm run build
```

The build process is used to verify that the application compiles successfully and that the TypeScript implementation does not contain blocking errors.

---

# 👨‍💻 Technical Test

**Technical Test UI/UX & Frontend - Purchase Requests**

The implementation prioritizes:

1. Usability
2. Clear information hierarchy
3. Efficient purchase flow
4. Responsive interaction
5. Reusable component architecture
6. Maintainable TypeScript code
7. Clear handling of loading, empty, disabled, and success states
8. Immediate feedback for important user interactions

---

## 📌 Final Notes

This project represents a frontend implementation of the Purchase Request workflow based on the requirements provided in the technical test.

The application is intentionally structured so that the current mock data and client-side state can later be replaced with real API integrations without requiring a complete redesign of the UI architecture.

````
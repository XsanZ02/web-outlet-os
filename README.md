# Purchase Request

A responsive Purchase Request frontend application designed for outlet branches to request operational supplies directly from Head Office.

This project was developed as part of the **Technical Test UI/UX & Frontend - Purchase Requests**.

The application focuses on providing a simple, clear, and efficient ordering flow for outlet coordinators or owners, from browsing products to submitting a purchase request.

---

## 🔗 Submission Links

- **Figma Design:** `https://www.figma.com/design/KSVYCLOQUm0DgAuyAMYaaM/web-buat-tes?node-id=0-1&t=MzBD7IuE3SPHeY19-1`
- **GitHub Repository:** `https://github.com/XsanZ02/web-outlet-os`

> Figma is provided with view access as required by the technical test.

---

## 🛠️ Technology Stack

- **Next.js** - React framework for the frontend application
- **React** - Component-based UI development
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code quality and consistency

The application is implemented as a frontend-only project using mock/static data. No backend or database connection is required.

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

### Purchase Request

- Review selected products before submission.
- Select a payment method.
- Fill in the required request details.
- Validate request information before submission.
- Display loading state during submission.
- Prevent repeated submission while processing.
- Display a successful submission state.
- View submitted request details.

### Notifications

- Display notification indicator in the application header.
- Open notification list.
- Mark individual notifications as read.
- Mark all notifications as read.
- Display unread notification count.

### Responsive Design

The application is designed for:

- Desktop
- Tablet
- Mobile

The ordering flow and core functionality remain accessible across different screen sizes.

---

## 🧩 Component Architecture

The application follows a component-based architecture to keep UI elements reusable and responsibilities clearly separated.

A simplified structure is:

```text
src/
├── components/
│   ├── ui/
│   │   ├── Button
│   │   ├── Input
│   │   ├── QuantityInput
│   │   ├── Badge
│   │   └── EmptyState
│   │
│   └── layout/
│       ├── Header
│       └── PageContainer
│
├── features/
│   └── purchase-request/
│       ├── components/
│       │   ├── ProductCard
│       │   ├── ProductCatalog
│       │   ├── ProductFilters
│       │   ├── CartItem
│       │   ├── CartModal
│       │   ├── RequestDetailsForm
│       │   ├── RequestSuccess
│       │   ├── RequestDetailsView
│       │   └── NotificationDropdown
│       │
│       ├── data/
│       │   └── products
│       │
│       ├── hooks/
│       │   ├── usePurchaseCart
│       │   └── useNotifications
│       │
│       └── types/
│           └── purchase-request
│
└── app/
    └── request/
        └── [id]/
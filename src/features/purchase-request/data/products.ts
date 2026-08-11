import type { Product } from '../types/purchase-request';

export const products: Product[] = [
  {
    id: 'product-paper-a4',
    name: 'Printer Paper A4',
    category: 'Office Supplies',
    price: 48000,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80',
    description: 'Bulk A4 copy paper for daily outlet documentation and admin use.',
    status: 'available'
  },
  {
    id: 'product-thermal-paper',
    name: 'Thermal Receipt Paper',
    category: 'POS Supplies',
    price: 25000,
    stock: 16,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80',
    description: 'Core roll stock for POS printers and customer receipt printing.',
    status: 'available'
  },
  {
    id: 'product-ink-cartridge',
    name: 'Ink Cartridge',
    category: 'Stationery',
    price: 129000,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80',
    description: 'Compatible ink cartridge for outlet printer and document workflows.',
    status: 'low-stock'
  },
  {
    id: 'product-packaging-box',
    name: 'Packaging Box',
    category: 'Packaging',
    price: 14500,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80',
    description: 'Retail-ready packaging box for safe item dispatch and customer handling.',
    status: 'available'
  },
  {
    id: 'product-pos-roll',
    name: 'POS Roll',
    category: 'POS Supplies',
    price: 21000,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80',
    description: 'Replacement POS roll for high-speed counter printer operations.',
    status: 'available'
  },
  {
    id: 'product-shipping-label',
    name: 'Shipping Label',
    category: 'Logistics',
    price: 33000,
    stock: 2,
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80',
    description: 'Pre-cut shipping labels for dispatch and logistics documentation.',
    status: 'low-stock'
  },
  {
    id: 'product-cleaning-supplies',
    name: 'Cleaning Supplies',
    category: 'Store Essentials',
    price: 64000,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80',
    description: 'Outlet cleaning kit for sanitation, maintenance, and daily floor care.',
    status: 'available'
  },
  {
    id: 'product-plastic-packaging',
    name: 'Plastic Packaging',
    category: 'Packaging',
    price: 9500,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
    description: 'Flexible plastic packaging used for product preparation and packing.',
    status: 'out-of-stock'
  }
];

export const productCategories = Array.from(new Set(products.map((product) => product.category)));

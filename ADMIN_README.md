# 🎨 NEO FIGURE - ADMIN PANEL

Hệ thống quản trị toàn diện cho NEO FIGURE e-commerce platform.

## 📁 CẤU TRÚC ADMIN

```
frontend/src/
├── layouts/
│   └── AdminLayout.jsx           # Admin layout với sidebar
├── pages/admin/
│   ├── Dashboard.jsx             # Dashboard tổng quan
│   ├── ProductManagement.jsx     # Quản lý sản phẩm
│   ├── OrderManagement.jsx       # Quản lý đơn hàng
│   ├── CategoryManagement.jsx    # Quản lý danh mục
│   └── AgentsDashboard.jsx       # AI Agents dashboard
└── services/
    └── adminApi.js               # Admin API services
```

## 🚀 TRUY CẬP ADMIN

### URL

```
http://localhost:5173/admin
```

### Menu Navigation

1. **Dashboard** (`/admin`)
   - Tổng quan thống kê
   - Recent orders
   - Quick actions

2. **Products** (`/admin/products`)
   - Danh sách sản phẩm
   - Tìm kiếm, lọc, sắp xếp
   - Thêm/Sửa/Xóa sản phẩm

3. **Orders** (`/admin/orders`)
   - Quản lý đơn hàng
   - Cập nhật trạng thái
   - Filter theo status

4. **Categories** (`/admin/categories`)
   - Quản lý danh mục
   - Thêm/Sửa/Xóa categories

5. **AI Agents** (`/admin/agents`)
   - Test Shopping Assistant
   - Test Product Discovery
   - Test Data Enrichment
   - Test Content Generation

## 📊 DASHBOARD FEATURES

### Statistics Cards

- Total Products
- Total Orders
- Total Revenue
- Total Categories

### Recent Orders

- 5 đơn hàng gần nhất
- Status badges
- Quick view

### Quick Actions

- Add Product
- Add Category
- View Orders
- AI Agents

## 🛍️ PRODUCT MANAGEMENT

### Features

- ✅ Danh sách sản phẩm với pagination
- ✅ Search by name, SKU, tags
- ✅ Sort: newest, price, popular
- ✅ Filter by category
- ✅ View product details
- ✅ Edit product
- ✅ Delete product
- ✅ Stock status indicator
- ✅ Hot/Featured badges

### Table Columns

- Product (thumbnail + name + SKU)
- Category
- Price (với original price nếu sale)
- Stock
- Status (Hot, Featured, Out of Stock)
- Actions (View, Edit, Delete)

## 📦 ORDER MANAGEMENT

### Features

- ✅ Danh sách đơn hàng
- ✅ Filter by status (All, Pending, Paid, Shipped)
- ✅ Search by customer name, phone, order ID
- ✅ Status badges với icons
- ✅ Update order status
- ✅ View order details

### Order Status Flow

```
Pending → Paid → Shipped → Delivered
         └─────→ Cancelled
```

### Status Actions

- **Pending**: "Confirm" → Paid
- **Paid**: "Ship" → Shipped
- **Shipped**: Mark as Delivered
- **Any**: Cancel order

## 🏷️ CATEGORY MANAGEMENT

### Features

- ✅ Grid view categories
- ✅ Add new category
- ✅ Edit category
- ✅ Delete category
- ✅ Auto-generate slug
- ✅ Category icon
- ✅ Modal form

### Category Form

- Name (required)
- Slug (auto-generated, editable)
- Description (optional)

## 🤖 AI AGENTS DASHBOARD

### 1. Shopping Assistant

- **Test Chat Interface**
- Session management
- Real-time conversation
- Message history
- Stats: Session ID, Message count

**Example Queries:**

```
- "Tìm mô hình Gundam"
- "Có sản phẩm nào đang sale?"
- "Giá mô hình Gundam RG Nu là bao nhiêu?"
```

### 2. Product Discovery

- **Intelligent Search**
- Natural language query
- Processing time
- Result preview (top 4)
- Filter suggestions

**Example Queries:**

```
- "gundam dưới 1 triệu"
- "figure anime đánh giá cao"
- "mô hình hot đang sale"
```

### 3. Data Enrichment

- **Single Product Enrichment**
- Enter Product ID
- View confidence score
- See suggestions
- **Batch Enrichment**
- Process 50 products
- View results summary

### 4. Content Generation

- **Generate Content Types:**
  - Full Description
  - Short Description
  - SEO Metadata
  - Email Content
- Preview generated content
- Copy/Use directly

## 🎨 DESIGN SYSTEM

### Colors

- **Primary**: `#00f5ff` (Neon Blue)
- **Danger**: `#ff003c` (Neon Red)
- **Success**: `#00ff88`
- **Warning**: `#ffaa00`
- **Dark**: `#0a0a0a`
- **Dark Card**: `#121212`

### Components

- **Sidebar**: Collapsible, icon-based
- **Cards**: Dark theme với border glow
- **Tables**: Hover effects, responsive
- **Buttons**: Primary, secondary, danger
- **Badges**: Status indicators
- **Modals**: Dark overlay

## 🔧 API INTEGRATION

### Admin API (`adminApi`)

```javascript
import { adminApi } from './services/adminApi';

// Products
adminApi.createProduct(data);
adminApi.updateProduct(id, data);
adminApi.deleteProduct(id);

// Categories
adminApi.createCategory(data);
adminApi.updateCategory(id, data);
adminApi.deleteCategory(id);

// Orders
adminApi.updateOrderStatus(id, status);

// Upload
adminApi.uploadImage(file);
```

### Agent API (`agentApi`)

```javascript
import { agentApi } from './services/adminApi';

// Shopping Assistant
agentApi.chat(sessionId, message, userId);
agentApi.getConversation(sessionId);
agentApi.clearConversation(sessionId);

// Product Discovery
agentApi.intelligentSearch(query, limit);
agentApi.autocomplete(query, limit);
agentApi.getTrendingSearches();

// Data Enrichment
agentApi.enrichProduct(productId);
agentApi.batchEnrich(limit);
agentApi.validateProduct(productId);

// Content Generation
agentApi.generateContent(productId, type);
agentApi.generateSocialContent(productId, platform);
```

## 📱 RESPONSIVE DESIGN

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features

- Collapsible sidebar
- Responsive tables
- Stack cards vertically
- Touch-friendly buttons

## 🔐 AUTHENTICATION (TODO)

### Planned Features

- Admin login
- Role-based access (Admin, Manager, Staff)
- Session management
- Protected routes
- JWT tokens

### Current State

- Open access (development)
- Logout button (clears localStorage)
- Back to Store link

## 🚀 DEPLOYMENT

### Development

```bash
cd frontend
npm install
npm run dev
```

Access: `http://localhost:5173/admin`

### Production

```bash
npm run build
```

Build output: `frontend/dist/`

## 📈 FUTURE ENHANCEMENTS

### Phase 2

- [ ] User management page
- [ ] Analytics & Reports
- [ ] Inventory management
- [ ] Discount/Coupon management
- [ ] Customer management
- [ ] Settings page

### Phase 3

- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Export data (CSV, Excel)
- [ ] Bulk operations
- [ ] Advanced filters
- [ ] Dashboard widgets customization

## 🎯 BEST PRACTICES

### Code Organization

- Separate admin pages in `/pages/admin/`
- Dedicated admin layout
- Reusable components
- API services abstraction

### Performance

- Lazy loading routes
- Pagination for large lists
- Debounced search
- Optimized images
- Caching strategies

### UX/UI

- Loading states
- Error handling
- Confirmation dialogs
- Success/Error messages
- Keyboard shortcuts

## 🐛 TROUBLESHOOTING

### Common Issues

**Sidebar not showing:**

- Check AdminLayout import in App.jsx
- Verify route nesting

**API errors:**

- Check backend is running (port 3009)
- Verify CORS settings
- Check API base URL in api.js

**Styling issues:**

- Ensure Tailwind classes are correct
- Check custom color classes in tailwind.config
- Verify imports

## 📚 DOCUMENTATION

### Component Props

**AdminLayout:**

- No props, uses React Router Outlet

**Dashboard:**

- Fetches data automatically
- No props needed

**ProductManagement:**

- Handles own state
- Uses adminApi for CRUD

**OrderManagement:**

- Auto-refresh on status update
- Filter management

**CategoryManagement:**

- Modal-based forms
- Inline actions

**AgentsDashboard:**

- Tab-based interface
- Real-time testing

## 🤝 CONTRIBUTING

### Adding New Admin Page

1. Create component in `/pages/admin/`
2. Add route in `App.jsx`
3. Add menu item in `AdminLayout.jsx`
4. Create API endpoints in `adminApi.js`
5. Test functionality
6. Update documentation

### Code Style

- Use functional components
- Hooks for state management
- Tailwind for styling
- Consistent naming
- Error handling
- Loading states

---

**Version:** 1.0.0
**Last Updated:** March 5, 2026
**Maintained by:** NEO FIGURE Development Team

**Access:** [http://localhost:5173/admin](http://localhost:5173/admin)

# KiranaAI - Smart Grocery Store Management & Billing

A modern, AI-powered grocery store management and billing application built for small Indian retailers. This demo application showcases conversational AI interfaces, real-time inventory tracking, nearby distributor connections, and comprehensive checkout functionality with GST billing.

## 🚀 Features

### 1. **AI-Powered Dashboard**
- Real-time inventory tracking for grocery and home items
- Low stock alerts with automatic distributor suggestions
- Sales performance analytics with interactive charts
- Quick action shortcuts for daily store operations

### 2. **Conversational AI Assistant**
- Text and voice-based interactions in Hindi and English
- Natural language inventory queries for grocery items
- Intelligent business insights and restock recommendations
- Real-time stock level monitoring and distributor alerts

### 3. **Nearby Distributors & Wholesalers**
- Connect with local distributors and wholesale markets
- Compare bulk prices and availability
- View distributor ratings and contact information
- Track market trends for grocery categories

### 4. **GST-Compliant Checkout System**
- Product catalog with grocery and home items
- Shopping cart management with quantity tracking
- Customer information collection
- GST-compliant invoice generation (18% GST)
- Print receipts for customers

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **UI Framework**: Material-UI (MUI)
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Currency**: Indian Rupees (₹)
- **Tax System**: GST (18%) compliant billing

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saphack
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174`

## 🎯 Usage

### Dashboard
- View key metrics including total items, inventory value (in ₹), and sales
- Monitor low stock alerts for grocery items
- Analyze sales performance with category-wise charts
- Access quick actions for inventory management

### AI Assistant
- Use voice commands or type queries about your grocery inventory
- Ask questions like "What dal items have low stock?" or "Show me this month's sales"
- Get intelligent recommendations for restocking from distributors
- Receive business insights based on local market data

### Distributors
- Connect with nearby wholesale markets and distributors
- Compare bulk prices for items like rice, dal, oil, etc.
- View distributor contact information and ratings
- Analyze market trends and opportunities

### Checkout
- Add grocery and home items to cart from available inventory
- Collect customer information for GST billing
- Process payments with 18% GST calculation
- Generate and print GST-compliant invoices

## 🏪 Sample Inventory

The demo includes typical Indian grocery store items:
- **Staples**: Basmati Rice, Wheat Flour, Sugar
- **Pulses**: Toor Dal, Moong Dal
- **Oils**: Sunflower Oil, Mustard Oil
- **Beverages**: Tea Leaves, Coffee
- **Home Care**: Detergent Powder, Toilet Paper

## � Pricing & Currency

- All prices displayed in Indian Rupees (₹)
- GST-compliant billing with 18% tax calculation
- Bulk pricing information from distributors
- Local market rate comparisons

## 🏬 Distributor Network

Connect with popular distributors:
- **Metro Cash & Carry** - Bulk groceries specialist
- **Reliance Smart Bazaar** - FMCG & personal care
- **D-Mart Wholesale** - Daily essentials & bulk items

## 🔧 Configuration

The application uses realistic Indian grocery store data. To integrate with real systems:

1. Replace mock data with actual inventory APIs
2. Configure GST billing and compliance systems
3. Set up payment gateway integration (UPI, cards, etc.)
4. Connect to distributor and supplier databases

## 📱 Responsive Design

Optimized for Indian retail environments:
- Works on tablets for counter operations
- Mobile-friendly for inventory checks
- Desktop support for detailed analytics

## 🎤 Voice Features

AI assistant supports:
- Hindi and English voice commands
- Common grocery-related queries
- Distributor contact requests
- Stock level inquiries

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx         # Grocery inventory dashboard
│   ├── ChatInterface.jsx     # AI assistant for grocery queries
│   ├── NearbyStores.jsx      # Distributor connections
│   └── Checkout.jsx          # GST-compliant billing
├── App.jsx                   # Main application
└── index.css                 # Styling
```

## 📊 Demo Data

Includes realistic Indian grocery store data:
- Common grocery items with Indian pricing
- Distributor information for major cities
- Seasonal sales patterns
- GST-compliant invoice formats

## 🔮 Future Enhancements

- Integration with popular Indian POS systems
- UPI payment integration
- Multi-language support (Hindi, regional languages)
- Seasonal demand forecasting
- Government scheme integration (Ration shop connectivity)
- Barcode scanning for quick inventory

## 🤝 Perfect For

- Small grocery stores (Kirana stores)
- Home essentials retailers
- Local supermarkets
- Neighborhood convenience stores

---

Built with ❤️ for Indian grocery retailers who want to modernize their business with AI-powered insights.

# Patrimony Tracker

A modern web application to track and summarize your wealth across bank accounts and investments. Built with React, TypeScript, and Tailwind CSS.

## Features

### 📊 Dashboard
- **Wealth Overview**: View your total wealth at a glance
- **Visual Charts**: Interactive pie charts and bar charts showing wealth distribution
- **Investment Performance**: Track gains/losses with percentage indicators
- **Account Type Breakdown**: See how your money is distributed across different account types

### 🏦 Bank Account Management
- Add multiple bank accounts (Checking, Savings, Money Market, CDs)
- Track balances across different currencies
- Edit and update account information
- Delete accounts when no longer needed

### 📈 Investment Portfolio
- Track various investment types (Stocks, Bonds, ETFs, Crypto, Real Estate, etc.)
- Monitor current vs. purchase prices
- Calculate real-time gains and losses
- Support for stock symbols and detailed tracking

### 💾 Data Persistence
- All data stored locally in your browser
- No external servers or accounts required
- Data persists across browser sessions
- Export/backup capabilities

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd patrimony-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Adding Bank Accounts
1. Navigate to the "Bank Accounts" tab
2. Click "Add Account" 
3. Fill in account details (name, bank, type, balance, currency)
4. Click "Add Account" to save

### Adding Investments
1. Navigate to the "Investments" tab
2. Click "Add Investment"
3. Enter investment details (name, type, symbol, quantity, prices)
4. Click "Add Investment" to save

### Viewing Your Wealth Summary
The Dashboard provides:
- Total wealth calculation
- Bank accounts vs. investments breakdown
- Investment performance metrics
- Visual charts for easy understanding

### Editing and Managing Data
- Click the edit icon on any account or investment card to modify details
- Click the trash icon to delete items
- All changes are automatically saved to local storage

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Storage**: Browser localStorage

## Data Privacy

This application stores all data locally in your browser's localStorage. No data is sent to external servers, ensuring complete privacy of your financial information.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Future Enhancements

- [ ] Data export/import functionality
- [ ] Real-time stock price integration
- [ ] Transaction history tracking
- [ ] Goal setting and progress tracking
- [ ] Multi-currency conversion
- [ ] Mobile app version
- [ ] Cloud sync (optional)

---

**Note**: This is a personal finance tracking tool. Please ensure you're comfortable with storing financial data locally and consider your security needs when using any financial software.

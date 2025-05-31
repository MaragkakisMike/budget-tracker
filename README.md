# Budget Tracker

Budget Tracker is a React Native app built with Expo to help users manage their finances efficiently. It allows users to track their income and expenses, categorize transactions, and analyze their spending habits.

## Features

- **User Accounts**

  - Create an account
  - Preview account details
  - Update account information

- **Expense Management**

  - Create expense transactions
  - Delete expense history records
  - Update account balance accordingly

- **Categories**

  - Create, edit, and delete categories for transactions

- **Settings**
  - Toggle **Dark Mode** for a better visual experience
  - Select preferred **language** for localization support

## Navigation Structure

The app follows a **tab-based navigation** system with the following pages:

- **Home** - Overview of recent transactions and account summary
- **Analysis** - Insights into spending patterns and financial analysis
- **Actions** - A button triggers an ActionSheet to pick a transaction action
- **Categories** - Manage expense and income categories
- **Settings** - Customize preferences such as theme and language

## Technologies Used

- **React Native** (Expo)
- **React Navigation** (Tab Navigation)
- **Context API / Redux** (for state management)
- **AsyncStorage** (for local data persistence)
- **Styled Components / NativeWind** (for UI styling)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/MaragkakisMike/BudgetTracker.git
   cd BudgetTracker
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the Expo development server:
   ```sh
   expo start
   ```
4. Open the Expo Go app on your mobile device and scan the QR code to run the app. Alternatively, you can run the app on an emulator.
   (If you want to run on an emulator, you can press `a` for Android emulator or `i` for iOS simulator in the terminal, while an emulator is running.)

## Generate APK

1. npx expo prebuild
2. npx expo run:android --variant release (Make sure an android emulator is running, or a physical device is connected)

3. After the build is complete, you can download the apk file from the Expo dashboard.

## License

This project is licensed under the **MIT License**.

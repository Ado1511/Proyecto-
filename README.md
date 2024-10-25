# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


BizSnap
Overview
BizSnap is a web application designed to create and manage business cards for clients and companies. The platform allows users to easily create, edit, and share digital business cards, enabling better networking and promotional opportunities.

Features
User Registration and Authentication: Users can create an account and securely log in to access their dashboard.
Create Business Cards: Users can input details such as name, email, phone number, and address to generate custom business cards.
Edit and Delete Cards: Users have the ability to modify existing cards or remove them entirely from their profile.
User-Friendly Interface: The application is designed with a responsive UI for a seamless user experience across devices.
Dark Mode Support: Users can switch between light and dark modes for comfortable viewing.
Validation and Error Handling: The application includes form validations to ensure data integrity and provide users with feedback on errors.
Toast Notifications: Users receive notifications on successful actions or errors.
Technologies Used
Frontend:

React
TypeScript
Flowbite for UI components
React Hook Form for form handling
React Toastify for notifications
Backend:

Node.js
Express
MongoDB for data storage
APIs:

Custom REST API for user and card management
Getting Started
Prerequisites
Node.js and npm installed on your machine.
MongoDB database set up and running.
Installation
Clone the repository:

bash
Copiar código
git clone https://github.com/yourusername/bizsnap.git
cd bizsnap
Install the required dependencies:

bash
Copiar código
npm install
Start the development server:

bash
Copiar código
npm start
Navigate to http://localhost:3000 in your web browser to view the application.

API Endpoints
POST /bcard2/users - Register a new user.
POST /bcard2/auth/register - User authentication.
GET /bcard2/cards - Retrieve user’s business cards.
POST /bcard2/cards - Create a new business card.
DELETE /bcard2/cards/:id - Delete a business card.
Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss improvements or features.

License
This project is licensed under the MIT License.
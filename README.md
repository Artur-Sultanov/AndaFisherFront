# Anda Fisher Application

## 🌊 Overview

The **Anda Fisher** application is designed to manage beaches, fish species, and provide real-time weather data. The project has been refactored to include a clean modular structure, lazy-loaded routes, and optimized organization for scalability and maintainability.

The backend for this project can be found here: [AndaFisher Backend Repository](https://github.com/Artur-Sultanov/AndaFisher.git)

---

## 🚀 Features

- **Lazy Loading**: Optimized routing for improved performance.
- **Modular Structure**: Features split into standalone components and modules.
- **Routing Configuration**: Dynamic routing for backend endpoints.
- **Authentication**: JWT-based authentication integrated into routing.

---

## 🏗️ Project Structure

```
anda-fisher
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── interceptors
│   │   │   │   └── jwt.interceptor.ts
│   │   ├── features
│   │   │   ├── beaches
│   │   │   │   ├── beaches.routes.ts
│   │   │   │   └── pages
│   │   │   ├── fish
│   │   │   │   ├── fish.routes.ts
│   │   │   │   └── pages
│   │   │   ├── auth
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── pages
│   │   │   ├── map
│   │   │       ├── map.component.ts
│   │   │       ├── map.component.html
│   │   │       └── map.component.css
│   │   ├── shared
│   │   │   ├── components
│   │   │   │   ├── footer
│   │   │   │   └── header
│   │   └── app.component.ts
│   │   └── app.routes.ts
│   └── assets
├── angular.json
├── package.json
├── README.md
└── tsconfig.json
```

---

## 📦 Installation

### Prerequisites

- Node.js v16+ and npm installed.
- Angular CLI installed globally:
  ```bash
  npm install -g @angular/cli
  ```

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd anda-fisher
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Open the application in your browser at:
   ```
   http://localhost:4200
   ```

---

## 🌐 Routing Overview

### **Backend Endpoints**

| Path       | Description                       |
| ---------- | --------------------------------- |
| `/beaches` | Manages beaches (CRUD operations) |
| `/fish`    | Manages fish species              |
| `/auth`    | Authentication (login/register)   |

---

## 🛠️ Development

### Add a New Feature

1. Create a new directory under `src/app/features`.
2. Define lazy-loaded routes for the feature in `feature-name.routes.ts`.
3. Implement standalone components in the `pages` directory.

### Add a Shared Component

1. Add the component under `src/app/shared/components`.
2. Export the component as standalone.
3. Import it into the required parent component.

---

## ✅ Planned Features

- Add Preloading Strategy with 'withPreloading' to optimize lazy-loaded module performance.
- Integrate Google Maps API for route generation.
- Display beach locations on a map using Leaflet.js.
- Add dynamic popups with beach details and images on the map.
- Implement filters for displaying beaches based on water type, location, and name.

---

## 📝 License

## This project is licensed under the [MIT License](LICENSE).

**Developed by Anda Fisher Team** 🌊🐟

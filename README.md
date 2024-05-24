# Next.js E-commerce

This is a Next.js 13.3 based E-commerce application. It includes features such as product listings, categories, and a responsive navbar with a mobile menu.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Approach](#approach)
- [Trade-offs](#trade-offs)

## Features

- Product listing
- Category filtering
- Dynamic routing
- API integration for fetching data
- Mobile-friendly navigation with burger menu
- Responsive design

## Technologies Used

- Next.js 13.3
- React 18
- TypeScript
- SWR
- CSS Modules
- Jest
- React Testing Library

## Installation

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/sominparrrk/e-commerce-app.git
   cd e-commerce-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

To start the development server:

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the app, or you can also try the deployment [here](https://next-js-e-commerce-five.vercel.app/).

## Testing

### Running Tests

To run the tests:

```bash
npm run test
```

## Approach

### Next.js 13 Pages and Layouts

Next.js 13's file-based [routing and nested layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) are used to structure the codebase of this project. Each major section of the app (e.g. Main(Home & products), Newsletter) has its own layout and page file to maintain a consistent structure and navigation.

### Dynamic Routes

Dynamic routes are used for product categories, enabling navigation to different category pages. This is achieved using Next.js' [dynamic routing](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes), where folder names enclosed in square brackets (`[category]`) define dynamic segments.

### Data Fetching with SWR

[SWR](https://swr.vercel.app/) is used for data fetching and it's [recommended officially](https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side). It provides a caching mechanism and optimises data fetching by revalidating data in the background. This ensures that users see the most up-to-date data without compromising performance.

### `localStorage` for Persistent State

The search input value is persisted across page transitions using `localStorage`. This allows the input value to be retained even when the user navigates to different pages or refreshes the browser. The value is stored and retrieved from `localStorage`, ensuring a seamless user experience.

## Trade-offs

### `localStorage` vs. Context API

Using `localStorage` for persisting the search input value is a straightforward solution that works well for small amounts of data. However, it introduces a dependency on the browser's storage capabilities and may not be suitable for all scenarios. For more complex state management needs, using the Context API or a state management library like Redux might be necessary.

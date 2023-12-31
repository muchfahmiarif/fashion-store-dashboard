<h1 align="center">
  <a href="#" rel="noreferrer">
    <img src="https://user-images.githubusercontent.com/94236726/265000131-b2e72152-5276-4ff1-961c-bc98fa1cf9e1.png" alt="banner zephyra store" />
  </a>
</h1>

<h2 align="center">
Zephyra Store
</h2> 

Zephyra store is a web application that allows you to buy and sell products. This application for excerise with NextJs 13 (app router) and Payment Gateway (Stripe). You can see the demo dashboard page in [here ↗️](https://zephyra-store.vercel.app/).Don't forget to give a star if you like this project and comment if you have any questions.
Thank you :)

### 🚀 Dependencies

- [NextJs 13 (App Router)](https://nextjs.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Cloudinary](https://cloudinary.com/)
- [Clerk](https://clerk.dev/)
- [Planetscale](https://planetscale.com/)
- [Stripe](https://stripe.com/)
- [React Hot Toast](https://react-hot-toast.com/)


### ⚡ Features

- [x] Login / Register Dashboard
- [ ] Payment Gateway ([Stripe](https://stripe.com/))
- [ ] Responsive Design
- [ ] Dark Mode
- [x] Typescript Support
- [ ] Lazy Loading 

### 📦 How to Install

1. Clone this project

```bash
git clone https://github.com/muchfahmiarif/fashion-store-dashboard.git
```

2. Install dependencies

```bash
npm install
```

3. Copy .env.example to .env and fill the value

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_public_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL='your_database_url'

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
```

4. Connet with planetscale and push the database

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server

```bash
npm run dev
```

6. Open your browser and go to http://localhost:3000


### 🔖 Reference
- [Coding with Antonio](https://www.youtube.com/watch?v=5miHyP6lExg)
- [Jost tried coding](https://www.youtube.com/watch?v=dD1fpoGHuC8)

### 💬 Comment and Suggestion

- [Create Issue ↗️](https://github.com/muchfahmiarif/fashion-store-dashboard/issues)
- [Email ↗️](mailto:fahmiarif.dev@gmail.com)
<br>

<h5 align="center">
Follow my social media
</h5> 
<p align="center" >
  <a href="https://instagram.com/muchfahmiarif" rel="noreferrer" >
    <img src="https://user-images.githubusercontent.com/122178246/265005753-00a7fe08-2e2e-476d-bcd7-dfba07c137b4.png" alt="instagram" />
  </a>
  <a href="https://t.me/muchfahmiarif" rel="noreferrer" style="margin-inline:20px">
    <img src="https://user-images.githubusercontent.com/122178246/265005750-8908bd25-cc11-4f95-9214-c5d6da928573.png" alt="telegram" />
  </a>
  <a href="https://www.linkedin.com/in/muchfahmiarif/" rel="noreferrer">
    <img src="https://user-images.githubusercontent.com/122178246/265005741-02dc9ef1-aa40-4d4e-814a-d97b1112ed2a.png" alt="linkedin" />
  </a>
</p>
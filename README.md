# ✨Zenspire✨

<div align="center">
  <a href="https://github.com/tantowish/zenspire-be">
    <img src="https://raw.githubusercontent.com/tantowish/toshka-images/main/zenspire/mockup%20handphone.png" alt="Logo" width="700" >
  </a>
</div>

<div align="center">
    <a href="" style="text-decoration: none;">
        Official Website
    </a>
</div>

## ℹ️About

Zenspire is a revolutionary mental health companion app that transforms how individuals access mental health care. Zenspire harnesses the power of AI, cloud computing, real-time data, and advanced large language models (LLMs) to deliver instant, personalized support. By making cutting-edge mental health resources universally accessible, Zenspire not only enhances well-being but also champions key Sustainable Development Goals (SDGs). Get ready to redefine your mental wellness journey with Zenspire!

## 🔧Getting started

**Clone**

```
git clone https://github.com/tantowish/zenspire-be.git
cd zenspire-be
```

**Setup Environment**

```
cp .env.example .env
```

**Install local dependencies**

```
npm install
```

**Generate & Migrate the database**

```
npx prisma generate
npx prisma migrate dev
```

**Running Service**

```
npm run dev
```

## 🛠️Technologies (Backend)

**TypeScript** : A statically typed superset of JavaScript used for building scalable and maintainable back-end applications.

**Express** : A minimal and flexible Node.js framework for handling HTTP requests and building web APIs.

**Large Language Model (LLM)** : Advanced AI technology for natural language understanding and generation, used in chatbots and text analysis.

## 📁Project Structure (Backend)

```
|-- doc/                # API Documentation folder
|-- prisma/             # Database related folder
|-- src/
|   |-- app/
|       |-- app.ts      # Main server code
|       |-- controller/ # Controller using service
|       |-- error/      # Error handler logic
|       |-- middleware/ # Middleware
|       |-- model/      # Model type for database
|       |-- routes/     # Routes logic
|       |-- service/    # Service Application logic
|       |-- types/      # Extended type for model
|       |-- util/       # Utilities helper
|       |-- validation/ # Request validation
|-- test/               # Testing folder
```

## 🛢Database ERD

https://drive.google.com/file/d/1hl_IAd1Dvs4QXhHkOvIllhAfTvu_aI7c/view?usp=sharing

## 📓API Spec Documentation

https://github.com/tantowish/zenify-be/tree/main/doc

## 🗄️Backend Application

https://github.com/tantowish/zenspire-be

## 📱Frontend Application

https://github.com/1langit/Zenspire

## 🌐Web Application (Landing page)

https://github.com/tantowish/zenspire-web

## 🧾License

This project is licensed under the [MIT](https://github.com/tantowish/zenspire-be/blob/main/MIT-LICENSE.txt) License. You are free to use, modify, and distribute the code as you see fit.

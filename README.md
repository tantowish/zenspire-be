# Zenspire

Zenspire is a mental health app that supports global goals for health, education, and gender equality. Zenspire helps individuals improve their well-being while contributing to Sustainable Development Goals 3 (Good Health and Well-being), 4 (Quality Education), and 5 (Gender Equality).

## Getting started

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
nodemon run
```

## Database ERD

https://drive.google.com/file/d/1hl_IAd1Dvs4QXhHkOvIllhAfTvu_aI7c/view?usp=sharing

## API Spec Documentation

https://github.com/tantowish/zenify-be/tree/main/doc

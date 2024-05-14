# Zenspire

Zenspire is a cutting-edge mental health companion app designed to provide essential support for individuals seeking mental health care but who may be hesitant or unable to see a psychologist. By leveraging technology, Zenspire makes mental health resources accessible and promotes overall well-being, contributing to key Sustainable Development Goals (SDGs). 

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

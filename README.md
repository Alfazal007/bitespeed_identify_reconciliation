# Bytespeed assignment

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

1. Clone the repository

```bash
git clone https://github.com/Alfazal007/bitespeed_identify_reconciliation
```

2. Install dependencies:

```bash
bun install
```

3. Generate Prisma client:

```bash
bunx prisma generate
```

4. Configure your environment variables by creating a `.env` file in the root
   directory and add your PostgreSQL database URL:

```
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
```

### Running the Application

Start the development server:

```bash
bun index.ts
```

## Deployment

Live application: [http://35.78.246.156:8000/identify](http://35.78.246.156:8000/identify)

## Tech Stack

- **Runtime**: Bun
- **ORM**: Prisma
- **Database**: PostgreSQL



backend/ # Root backend folder
│
├── src/ # All backend source code lives here
│
│ ├── config/ # Configuration for services and environment
│ │ ├── env.ts # Loads and validates environment variables
│ │ ├── database.ts # Database configuration and connection setup
│ │ └── mailer.ts # Email service configuration (Nodemailer)
│ │
│ ├── controllers/ # Handles HTTP request logic and business operations
│ │ ├── auth.controller.ts # Authentication logic(register, login,logout)
│ │ ├── user.controller.ts # User related operations (profile, update)
│ │ ├── resource.controller.ts # Example business entity controller
│ │ └── workflow.controller.ts # Handles complex workflows or background jobs
│ │
│ ├── database/ # Database related utilities
│ │ └── mongodb.ts # MongoDB connection logic using Mongoose
│ │
│ ├── middlewares/ # Express middleware functions
│ │ ├── auth.middleware.ts # Authentication / authorization middleware
│ │ ├── security.middleware.ts # Security middleware (rate limiting, headers, etc.)
│ │ └── error.middleware.ts # Centralized error handling middleware
│ │
│ ├── models/ # Mongoose schemas and models
│ │ ├── user.model.ts # User schema and model definition
│ │ └── resource.model.ts # Example resource schema
│ │
│ ├── routes/ # API route definitions
│ │ ├── auth.routes.ts # Authentication API endpoints
│ │ ├── user.routes.ts # User related API endpoints
│ │ ├── resource.routes.ts # Resource CRUD endpoints
│ │ └── workflow.routes.ts # Routes triggering workflows or background jobs
│ │
│ ├── utils/ # Reusable helper utilities
│ │ ├── send-email.ts # Utility function to send emails
│ │ ├── email-template.ts # Email template generator
│ │ └── helpers.ts # General helper functions (formatting, validation, etc.)
│ │
│ ├── app.ts # Express Entry point & app setup (middlewares, routes, configs)
│
│
├── .env # Environment variables (not committed to git)
├── .gitignore # Files and folders ignored by Git
├── README.md # Project documentation
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── package-lock.json # Locked dependency versions

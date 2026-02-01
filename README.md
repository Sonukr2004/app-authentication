# 🔐 Next.js Authentication App (Email Verification)

A full-stack **authentication system built with Next.js App Router**, featuring **signup, login, logout, email verification**, protected routes, and profile pages. Emails are tested using **Mailtrap**.

---

## 🧱 Tech Stack

* **Node.js 18+**
* **Next.js 13+ (App Router)**
* **MongoDB + Mongoose**
* **Nodemailer** (emails)
* **Mailtrap** (SMTP testing)
* **bcryptjs** (password & token hashing)
* **JWT** (auth tokens)
* **Tailwind CSS** (styling)

---

## 🛠️ Environment Setup (From Scratch)

### 1️⃣ Install Node.js

```bash
node -v
npm -v
```

If missing, install **Node.js LTS (18+)**.

---

### 2️⃣ Create the Next.js App

```bash
npx create-next-app@latest app-authentication
cd app-authentication
```

Recommended options:

* TypeScript: **Yes**
* App Router: **Yes** ✅
* Import alias: **@/**

---

### 3️⃣ Install Dependencies

```bash
npm install mongoose nodemailer bcryptjs jsonwebtoken
```

Dev types:

```bash
npm install -D @types/bcryptjs @types/jsonwebtoken
```

---

### 4️⃣ Environment Variables

Create **`.env.local`**:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster/db
DOMAIN=http://localhost:3000

MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass

JWT_SECRET=your_jwt_secret
```

---

### 5️⃣ Run the App

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```text
src
├── app
│   ├── api
│   │   └── users
│   │       ├── login/route.ts        # Login API
│   │       ├── logout/route.ts       # Logout API
│   │       ├── me/route.ts           # Get current user
│   │       ├── signup/route.ts       # Signup API
│   │       └── verifyemail/route.ts  # Email verification
│   ├── login/page.tsx                # Login UI
│   ├── signup/page.tsx               # Signup UI
│   ├── verifyemail/page.tsx          # Email verification UI
│   ├── profile
│   │   ├── [id]/page.tsx             # Dynamic profile page
│   │   └── page.tsx                  # Profile index
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── components
│   └── Background3D.tsx              # UI component
├── dbconfig
│   └── dbconfig.ts                   # MongoDB connection
├── helper
│   ├── getDataFromToken.ts           # JWT decode helper
│   └── mailer.ts                     # Nodemailer + Mailtrap
├── middleware.ts                     # Route protection
├── model
│   └── userModel.js                  # User schema
```

---

## 🔐 Authentication Flow

### Signup

* User submits email & password
* Password is hashed
* User saved with `isVerified = false`
* Verification email sent

### Verify Email

* User clicks link from email
* Token validated + expiry checked
* User marked verified

### Login

* Credentials validated
* JWT issued
* Protected routes enabled

### Logout

* JWT cleared

### Profile

* Protected via `middleware.ts`
* Supports dynamic routes `/profile/[id]`

---

## ✉️ Email (Mailtrap)

* Emails are captured in Mailtrap inbox
* No real emails sent in development

---

## 🛡️ Security

* Password hashing (bcrypt)
* Hashed, expiring email tokens
* JWT-based auth
* Middleware route protection

---

## 🚀 Production Notes

* Replace Mailtrap with Gmail/Resend/SendGrid
* Use HTTPS domain
* Add rate limiting
* Index token fields in MongoDB

---

## 🧪 Helpful Commands

```bash
# Show folder structure
tree src -L 4

# Git workflow
git add .
git commit -m "Auth with email verification"
git push
```

---

## 👨‍💻 Author

Sonu Kumar — Built with ❤️ using Next.js App Router

# Digifox Portfolio - Local CMS Guide

This project includes a **Local-First CMS** that allows you to easily edit images, videos, and text locally without needing an external cloud database. 

## How to use the Admin Dashboard

### 1. Start the servers
Open your terminal in this folder and run:
```bash
# This starts both the frontend and the local backend server
npm run dev
npm run admin
```
*(You will need two terminal windows open: one for `npm run dev` and one for `npm run admin`)*

### 2. Open the Dashboard Link
Click the link below to access your Local Content Manager:

🔗 **[http://localhost:5009/admin](http://localhost:5009/admin)**

> **Note:** This link will only work while your local servers are running. It will not be accessible on the live internet, keeping your production site completely secure!

### 3. Save & Publish
After making changes in the dashboard and clicking "Save Changes", stop your servers and run:
```bash
git add .
git commit -m "Update portfolio media"
git push origin main
```
Your live website will automatically rebuild with the new images and videos!

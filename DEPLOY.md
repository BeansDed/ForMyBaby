# ☁️ How to Deploy Online

To make your website accessible from anywhere on the internet, you can deploy it to **Render**.

## Prerequisites

1.  **GitHub Account:** You need to push this code to a GitHub repository.
2.  **Render Account:** Sign up at [render.com](https://render.com).

## Step 1: Push to GitHub

1.  Create a new repository on GitHub.
2.  Run these commands in your project folder (if you haven't initialized git yet):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

## Step 2: Deploy on Render

1.  Log in to the [Render Dashboard](https://dashboard.render.com).
2.  Click **New +** and select **Blueprint**.
3.  Connect your GitHub repository.
4.  Render will automatically detect the `render.yaml` file and set everything up.
5.  Click **Apply**.

## 💾 Persistent Data (Important!)

This project uses SQLite. On the **Free Tier** of most hosting platforms, files are deleted when the server restarts.

*   **We configured a Disk** in `render.yaml` to save your `database.sqlite` safely.
*   However, **Render Disks require a paid plan (Starter, ~$7/mo)**.
*   **If you stick to the Free Tier**, your database (memories, etc.) **will reset** every time the server restarts (which happens often on free plans).

### Free Alternative for Database

If you want to stay 100% free:
1.  You'll need to switch the database from SQLite to **PostgreSQL**.
2.  Render provides a free PostgreSQL database.
3.  This requires code changes in `backend/config/database.js` to use `pg` instead of `sqlite3`.

## 🌍 Your Website URL

Once deployed, Render will give you a URL like `https://forbaby-app.onrender.com`.
You can use this URL on your phone or share it with your partner!

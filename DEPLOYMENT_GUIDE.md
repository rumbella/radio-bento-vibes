# Deployment Guide: Backend on Render

This guide will walk you through deploying the Node.js backend to Render and, most importantly, configuring your frontend to communicate with it.

## Step 1: Deploy the Backend to Render

1.  **Log in to Render** and go to your Dashboard.
2.  Click **"New +"** and select **"Web Service"**.
3.  Connect your GitHub account and select the repository for this project.
4.  On the settings page, configure your service as follows:
    *   **Name:** Give your service a name (e.g., `radio-amble-backend`).
    *   **Root Directory:** `backend` (This tells Render to look inside the `backend` folder).
    *   **Environment:** `Node`.
    *   **Build Command:** `npm install`
    *   **Start Command:** `npm start`
5.  Click **"Create Web Service"**. Render will now build and deploy your backend.

## Step 2: Get Your Live Backend URL

*   Once the deployment is complete, go to your service's dashboard on Render.
*   You will see a URL at the top of the page (e.g., `https://radio-amble-backend.onrender.com`). **This is the public URL of your backend. Copy it.**

## Step 3: Configure Your Frontend Hosting

This is the most critical step to fix the "Failed to load settings" error. You must tell your frontend where the live backend is.

1.  Go to the dashboard of your frontend hosting provider (e.g., Netlify, Vercel, etc.).
2.  Find the settings for your site, specifically the section for **Environment Variables**.
3.  Create a **new environment variable**:
    *   **Key:** `VITE_API_BASE_URL`
    *   **Value:** Paste the URL you copied from Render (e.g., `https://radio-amble-backend.onrender.com`). **Do not add a `/` at the end.**
4.  **Trigger a new deploy/rebuild** of your frontend site. This is essential for the new environment variable to be applied.

## Step 4: Verify

Once your frontend has finished redeploying, open the live URL. The error should be gone, and the content should load correctly. Any changes made in the admin panel will now be saved to your live backend.
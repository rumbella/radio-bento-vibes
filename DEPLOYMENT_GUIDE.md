# Deployment Guide: Backend on Render

This guide will walk you through deploying the Node.js backend to Render and configuring your frontend to communicate with it.

## Prerequisites

*   A [GitHub](https://github.com/) account.
*   A [Render](https://render.com/) account.
*   Your project code pushed to a GitHub repository.

## Step 1: Deploy the Backend to Render

1.  **Log in to Render** and go to your Dashboard.
2.  Click **"New +"** and select **"Web Service"**.
3.  Connect your GitHub account and select the repository for this project.
4.  On the settings page, configure your service as follows:
    *   **Name:** Give your service a name (e.g., `radio-amble-backend`).
    *   **Root Directory:** `backend` (This is crucial, as it tells Render where to find the server code).
    *   **Environment:** `Node`.
    *   **Build Command:** `npm install`
    *   **Start Command:** `npm start`
5.  Click **"Create Web Service"**. Render will now build and deploy your backend.

## Step 2: Get Your Backend URL

*   Once the deployment is complete, go to your service's dashboard on Render.
*   You will see a URL at the top of the page (e.g., `https://radio-amble-backend.onrender.com`). This is the public URL for your backend. **Copy this URL.**

## Step 3: Configure Your Frontend

Your frontend application needs to know where to send its API requests. You will set this using an environment variable in your frontend's hosting provider (e.g., Netlify, Vercel, or wherever your static site is hosted).

1.  Go to your frontend hosting provider's dashboard.
2.  Find the settings for your site, specifically the section for **Environment Variables**.
3.  Create a new environment variable:
    *   **Key:** `VITE_API_BASE_URL`
    *   **Value:** Paste the URL you copied from Render (e.g., `https://radio-amble-backend.onrender.com`).
4.  **Redeploy your frontend** to apply the new environment variable.

## Step 4: Verify

Once both the backend and frontend have been deployed with the new settings, open your live frontend application. The content should now load correctly, and any changes you make in the admin panel should be persistent.
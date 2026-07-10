# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Backend API configuration (Codespaces / Vite env)

This frontend expects an environment variable named `VITE_CODESPACE_NAME` when the backend is hosted in a GitHub Codespace. `import.meta.env.VITE_CODESPACE_NAME` is used to construct the API base URL:

https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/

If `VITE_CODESPACE_NAME` is not set the app will safely fall back to a relative API path (`/api`) to avoid building malformed URLs like `https://undefined-8000.app.github.dev`.

To set the env locally create a `.env.local` in the `frontend` folder with:

VITE_CODESPACE_NAME=your-codespace-id

Replace `your-codespace-id` with the codespace name shown in GitHub Codespaces. When running locally without Codespaces you can omit this variable and the app will use the `/api` fallback.

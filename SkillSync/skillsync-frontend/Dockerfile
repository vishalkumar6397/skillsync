# 1. Use Node
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first (for cache)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the app
COPY . .

# 6. Expose Vite port
EXPOSE 8080

# 7. Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]

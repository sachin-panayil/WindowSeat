FROM node:20-alpine

WORKDIR /app

# Copy shared package first
COPY shared/ ./shared/

# Copy server
COPY server/ ./server/

# Install shared deps 
WORKDIR /app/shared
RUN npm install

# Install and build server
WORKDIR /app/server
RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
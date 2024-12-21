FROM node:20
RUN npm install -g @ionic/cli
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["ionic", "serve", "--host=0.0.0.0", "--port=3000"]

# Gunakan Node.js versi terbaru sebagai base image
FROM node:20

# Set direktori kerja di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi
RUN npm install

# Copy seluruh kode aplikasi ke dalam container
COPY . .

# Tentukan port yang akan digunakan di container
EXPOSE 8000

# Perintah untuk menjalankan aplikasi dengan benar
CMD ["npm", "run", "dev"]

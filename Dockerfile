FROM node:18-alpine

# Tạo thư mục group2-fams trong container
WORKDIR /group2-fams

# Copy mã nguồn vào container
COPY . /group2-fams/

# Cài đặt các gói npm
RUN npm install

# Expose cổng 9999 cho ứng dụng
EXPOSE 9999

# Chạy ứng dụng khi container được khởi động
CMD ["npm", "run", "dev"]
FROM ghcr.io/puppeteer/puppeteer:20.9.0

# Use root user to ensure permission changes
USER root

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

# Ensure the public directory exists and has the right permissions
RUN mkdir -p /usr/src/app/public && chmod -R 777 /usr/src/app/public

CMD ["node", "src/index.js"]

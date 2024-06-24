FROM ghcr.io/puppeteer/puppeteer:20.9.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

# Check the current state of the filesystem
RUN ls -la /usr/src/app

# Ensure the public directory has the right permissions
RUN mkdir -p /usr/src/app/public
RUN ls -la /usr/src/app

# Attempt to set more specific permissions
RUN chmod 755 /usr/src/app/public
RUN ls -la /usr/src/app/public

CMD ["node", "src/index.js"]

FROM node:16

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Add user so we don't need --no-sandbox.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set correct permissions
RUN chown -R pptruser:pptruser /usr/src/app

# Create a directory for temporary files with correct permissions
RUN mkdir -p /tmp/marp-work && chown -R pptruser:pptruser /tmp/marp-work

# Run everything after as non-privileged user.
USER pptruser

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
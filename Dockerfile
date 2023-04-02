FROM node:18

WORKDIR /usr/src/app

# Install dependencies in their own step early on to prevent
# docker build cache misses when only code itself has changed
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

# init prisma. In a real project, the DB migrations wouldn't be done
# in the docker build, but would migrate an external DB on release
RUN npx prisma db push
RUN npx prisma db seed
RUN npx prisma generate

# actually build the thing
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
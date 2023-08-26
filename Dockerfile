FROM node:16

RUN echo "UTC" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

RUN apt-get install -y wget
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \ 
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get -y install google-chrome-stable

WORKDIR /usr/src
COPY ["package.json", "package-lock.json", "/usr/src/"]
RUN npm install -g sequelize sequelize-auto tedious
RUN npm install

COPY . .

EXPOSE 80

CMD npm start
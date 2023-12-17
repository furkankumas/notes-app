FROM nginx:alpine
RUN rm /etc/nginx/*
COPY . /etc/nginx/
RUN ln -s /etc/nginx/sites-available/furkankumas /etc/nginx/sites-enabled
FROM nginx:1.27-alpine

COPY cicd/docker/dist/ /usr/share/nginx/html/

RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;
  absolute_redirect off;

  location / {
    try_files $uri $uri.html $uri/ =404;
  }

  error_page 404 /404.html;
}
EOF

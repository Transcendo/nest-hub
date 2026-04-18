FROM nginx:1.27-alpine

COPY cicd/docker/dist/ /usr/share/nginx/html/

RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ $uri.html =404;
  }

  error_page 404 /404.html;
}
EOF

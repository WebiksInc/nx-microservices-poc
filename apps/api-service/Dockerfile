# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build api-service`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t api-service`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=8080

WORKDIR /app

RUN addgroup --system api-service && \
          adduser --system -G api-service api-service

COPY dist/apps/api-service api-service
RUN chown -R api-service:api-service .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix api-service --omit=dev -f install

CMD [ "node", "api-service" ]

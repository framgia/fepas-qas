FROM yeuem1vannam/c9ide:core

ENV NODE_ENV=development
COPY ./package.json /workspace
RUN cd /workspace && npm install
ADD . /workspace

EXPOSE 5000

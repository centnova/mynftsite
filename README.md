Docker instructions from:
- from https://community.hetzner.com/tutorials/deploy-nodejs-with-docker
- https://steveholgado.com/nginx-for-nextjs/#final-nginx-configuration

docker build -t mynftsite .

Fixing an issue:
https://stackoverflow.com/questions/44215856/docker-cant-install-npm-packages

Was experiencing:
'''
tep 4/7 : RUN npm ci --only=production
 ---> Running in 2986afeb8be9
npm ERR! code EAI_AGAIN
npm ERR! errno EAI_AGAIN
npm ERR! request to https://registry.npmjs.org/next/-/next-11.1.2.tgz failed, reason: getaddrinfo EAI_AGAIN registry.npmjs.org
'''

To fix:
```
docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
6c628812deb3   bridge    bridge    local
6416adcf4bfb   host      host      local
4c4a4214a8b6   none      null      local

docker build --network=host -t mynftsite .
```
and the process will finish
However the issue was solved without the need to use the host network by just restarting docker (the docker0 network
did not have an assigned ip)

----
Note: using the `RUN npm ci --only=production" resulted in not finding module 'ethers'

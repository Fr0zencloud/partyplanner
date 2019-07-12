sshpass -p "$DEPLOY_PW" ssh -o StrictHostKeyChecking=no root@"$DEPLOY_MACHINE"
echo "$DOCKER_PW" | docker login -u "$DOCKER_USER" --password-stdin
docker pull niki2k1/partyplanner
docker stop partyplanner
docker rm partyplanner
docker run -d --name="partyplanner" -p3333:3333 niki2k1/partyplanner
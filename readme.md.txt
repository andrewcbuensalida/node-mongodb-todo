https://www.youtube.com/watch?v=5QEwqX5U_2M codedamn
trying to deploy through elastic beanstalk but asking for a local source code file
not github. so i just selected script.js. takes forever to build environment.
lightsail has $3.5 per month.
trying amplify with no monorepo, but webpage cant be found.
best way might be ec2. ubuntu. install node. change port to 4000. then security
group allow 4000. clone. checkout branch. npm i forever -g, then 
sudo forever start script.js
to get the url todo.anhonestobserver.com, follow 
https://stackoverflow.com/questions/19349287/route-53-record-set-on-different-port
buy a domain name in route 53, then create an s3 bucket for both naked and www, 
then hosted zone create record type a pointing to bucket. bucket should be pointing
to todoapp.anhonestobserver.com:4000. 
interesting, tried front end on amplify and crud to the backend in ec2 node
it functions but doesnt persist upon refreshing page.
to get rid of the :4000 at the end of the url, might have to set port to
process.env.port || 4000 instead of just 4000.
try elastic beanstalk next time with code pipeline 
https://www.youtube.com/watch?v=b0g-FJ5Zbb8
or ec2 again but with codedeploy but might be overly complicated.
https://www.youtube.com/watch?v=Buh3GjHPmjo
next day, alias doesnt point to the url. turns out, just needed to clear chache
on local browser. best so far is amplify.
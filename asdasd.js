let i = 0;
var Service = require('./models/service');
Service.find({}, (err, services) => {
    console.log(err);
    console.log(services);
});
/**/
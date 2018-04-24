GrankModel = require('../models/grankModel');

module.exports = {
    get: async (ctx, next) => {
    
        if (!ctx.query.domain) ctx.throw(400,'Missing domain param'); 
        if (!ctx.query.kwlist) ctx.throw(400,'Missing kwlist param');

        await GrankModel.getRankForKWList(ctx.query.domain, ctx.query.kwlist)
           .then(res => {
               ctx.body = res;
               next();
           });
   }
}
GrankModel = require('../models/grankModel');

module.exports = {
    get: function(ctx, next) {

        if (!ctx.request.query) ctx.response.status = 400;
        else if (!ctx.request.query.kwlist || !ctx.request.query.domain) ctx.response.status = 400;
        else {
            GrankModel.getRankForKWList(ctx.request.query.domain, ctx.request.query.kwlist);

            ctx.body = {
                asdf: "Mamalo",
                query: ctx.request.query.kwlist
            };
        }
        next();
    }
}
module.exports = {
    NODE_ENV: process.env.npm_lifecycle_event && process.env.npm_lifecycle_event,
    NODE_ARG: process.env.npm_config_argv && JSON.parse(process.env.npm_config_argv),
    NODE_PAGE_BUILD: require('./build.page')
};

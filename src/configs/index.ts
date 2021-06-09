const env = process.env.NODE_ENV;

const environments = {
  development: require('./env/dev.env.json'),
  production: require('./env/prod.env.json'),
};

// export config for the current environment
export default environments[env] || environments['production'];

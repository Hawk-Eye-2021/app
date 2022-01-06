export interface DatabaseConfig {
    url: string
    options: object
}
export interface Config {
    database: DatabaseConfig
}

const env = process.env.NODE_ENV

const production: Config = {
    database: {
        url: 'postgres://ipbqaqvcfikisr:9686e8a7238931f4eb2c9276e49a9097363d0081ebb248887a28dd85395d73b1@ec2-54-204-128-96.compute-1.amazonaws.com:5432/d4bcg6ud8fb51c',
        options: {
            dialectOptions: {
                ssl: true,
                rejectUnauthorized: false
            }
        }
    }
}

const local: Config = {
    database: {
        url: 'postgres://hawkeye:hawkeye@localhost:2345/hawkeye',
        options: {}
    }
}

const config = env === 'production' ? production : local

export default config
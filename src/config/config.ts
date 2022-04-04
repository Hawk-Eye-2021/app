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
        url: 'postgres://postgres:Marianoesuncapo1998@database-1.cott7chq3rbw.us-east-1.rds.amazonaws.com:5432/d4bcg6ud8fb51c',
        options: {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    }
}

const local: Config = {
    database: {
        url: 'postgres://postgres:Marianoesuncapo1998@database-1.cott7chq3rbw.us-east-1.rds.amazonaws.com:5432/d4bcg6ud8fb51c',
        options: {}
    }
}

const config = env === 'production' ? production : local

export default config
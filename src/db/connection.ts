import {Sequelize } from "sequelize"

export function getConnection() {
    const sequelize = new Sequelize({
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        database: "school_orm",
        username: 'student_server',
        password: 'cijur200',
        logging: (sql) => {
            console.log("Query: %s", sql)
        }
    })
    return sequelize;
} 
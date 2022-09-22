import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomerOrder1663738586277 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS CustomerOrders (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                street VARCHAR(255) NOT NULL,
                houseNumber INT NOT NULL,
                orderComment TEXT,
                entrance INT NOT NULL,
                flour INT NOT NULL,
                office INT NOT NULL,
                intercom INT NOT NULL,
                addressComment TEXT,
                usedOrderType VARCHAR(255) NOT NULL,
                servetStatus TINYINT(1) DEFAULT(false) NOT NULL,
                totalOrderCount INT NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP,
                FOREIGN KEY (email) REFERENCES Users (email)
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS CustomerOrders
        `);
    }
}

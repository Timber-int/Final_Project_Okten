import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomerOrderSelfPickup1663761518044 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS CustomerSelfPickupOrders (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                orderComment TEXT,
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
            DROP TABLE IF EXISTS CustomerSelfPickupOrders
        `);
    }
}

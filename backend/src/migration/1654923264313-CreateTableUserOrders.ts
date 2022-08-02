import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserOrders1654923264313 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS UserOrders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productName  VARCHAR(255) NOT NULL,
        productPhoto VARCHAR(255) NOT NULL,
        productBigPhoto VARCHAR(255),
        productIngredients VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        productPrice INT CHECK (productPrice >= 0),
        productWeight INT CHECK (productWeight >= 0),
        totalCount INT CHECK (totalCount >= 1) DEFAULT(1),
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST UserOrders
        `);
    }
}

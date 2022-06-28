import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProducts1654923224270 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productName  VARCHAR(255) NOT NULL UNIQUE,
        productPhoto VARCHAR(255) NOT NULL,
        productBigPhoto VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        productPrice INT CHECK (productPrice >= 0),
        productWeight INT CHECK (productWeight >= 0),
        categoryId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES Categories (id)
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST Products
        `);
    }
}

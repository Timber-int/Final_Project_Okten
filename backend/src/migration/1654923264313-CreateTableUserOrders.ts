import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserOrders1654923264313 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS UserOrders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productName  VARCHAR(255) NOT NULL UNIQUE,
        productPhoto VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        productPrice INT CHECK (productPrice >= 0),
        productWeight INT CHECK (productWeight >= 0),
        totalPrice INT CHECK (totalPrice >= 0) DEFAULT(0),
        userId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES Users (id)
         ON DELETE RESTRICT
          ON UPDATE CASCADE
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST UserOrders
        `);
    }
}

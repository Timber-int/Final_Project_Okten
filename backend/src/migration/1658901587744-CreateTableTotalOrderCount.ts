import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTotalOrderCount1658901587744 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS totalOrderCount(
        id INT PRIMARY KEY AUTO_INCREMENT,
        productPrice INT NOT NULL DEFAULT(0),
        productId INT NOT NULL,
        categoryId INT NOT NULL,
        productUniqueData VARCHAR(255) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES Categories (id),
          FOREIGN KEY (productId) REFERENCES Products (id)
           ON DELETE CASCADE
           ON UPDATE CASCADE
             )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS totalOrderCount
        `);
    }
}

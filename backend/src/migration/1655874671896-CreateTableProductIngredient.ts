import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductIngredient1655874671896 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS ProductIngredient (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productIngredientName  VARCHAR(255) NOT NULL UNIQUE,
        productPhoto VARCHAR(255) NOT NULL,
        productPrice INT CHECK (productPrice >= 0),
        productWeight INT CHECK (productWeight >= 0),
        status BOOLEAN DEFAULT(false),
        categoryId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES Categories (id)
           ON DELETE CASCADE
          ON UPDATE CASCADE
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST ProductIngredient
        `);
    }
}

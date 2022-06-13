import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductInformation1654930894924 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS ProductInformation (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productProteins INT CHECK (productProteins >= 0),
        productCarbohydrates INT CHECK (productCarbohydrates >= 0),
        productFats INT CHECK (productFats >= 0),
        productCalories INT CHECK (productCalories >= 0),
        productId INT NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (productId) REFERENCES Products (id)
         ON DELETE CASCADE
          ON UPDATE CASCADE
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST ProductInformation
        `);
    }
}

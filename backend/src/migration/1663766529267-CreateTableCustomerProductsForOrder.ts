import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomerProductsForOrder1663766529267 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
   CREATE TABLE IF NOT EXISTS CustomerProductsForOrder (
   id INT PRIMARY KEY AUTO_INCREMENT,
   productName  VARCHAR(255) NOT NULL,
   productPhoto VARCHAR(255) NOT NULL,
   productBigPhoto VARCHAR(255),
   productIngredients VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   categoryId INT NOT NULL,
   productId INT NOT NULL,
   customerId INT NOT NULL,
   productPrice INT CHECK (productPrice >= 0),
   productWeight INT CHECK (productWeight >= 0),
   totalCount INT CHECK (totalCount >= 1) DEFAULT(1),
   createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
   deletedAt TIMESTAMP,
   FOREIGN KEY (customerId) REFERENCES CustomerOrders (id)
   )
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS CustomerProductsForOrder
        `);
    }
}

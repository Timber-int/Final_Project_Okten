import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCityAddress1656917558806 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS CityAddress (
        id INT PRIMARY KEY AUTO_INCREMENT,
        addressName  VARCHAR(255) NOT NULL UNIQUE,
        cityId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (cityId) REFERENCES Cities (id)
           ON DELETE CASCADE
          ON UPDATE CASCADE
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST CityAddress
        `);
    }
}

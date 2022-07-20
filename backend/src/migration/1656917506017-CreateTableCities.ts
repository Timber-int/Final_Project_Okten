import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCities1656917506017 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Cities (
        id INT PRIMARY KEY AUTO_INCREMENT,
        cityName  VARCHAR(255) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Cities
        `);
    }
}

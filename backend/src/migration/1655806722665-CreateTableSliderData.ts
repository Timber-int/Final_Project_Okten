import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSliderData1655806722665 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS SliderData (
        id INT PRIMARY KEY AUTO_INCREMENT,
        pathUrl VARCHAR(255) NOT NULL,
        text MEDIUMTEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST SliderData
        `);
    }
}

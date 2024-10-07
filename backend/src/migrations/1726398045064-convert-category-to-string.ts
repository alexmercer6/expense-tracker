import { MigrationInterface, QueryRunner } from "typeorm";

export class ConvertCategoryToString1726398045064 implements MigrationInterface {
    name = 'ConvertCategoryToString1726398045064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_item" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "expense_item" ADD "category" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_item" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "expense_item" ADD "category" ntext NOT NULL`);
    }

}

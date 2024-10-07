import { MigrationInterface, QueryRunner } from "typeorm";

export class IncludeSubCategories1726399417553 implements MigrationInterface {
    name = 'IncludeSubCategories1726399417553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unique_sub_category" ("id" int NOT NULL IDENTITY(1,1), "category" nvarchar(255) NOT NULL, CONSTRAINT "UQ_18d5168105f6c0c58ff375e3efc" UNIQUE ("category"), CONSTRAINT "PK_28a9be78ac153da032b2edc39e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "unique_sub_category"`);
    }

}

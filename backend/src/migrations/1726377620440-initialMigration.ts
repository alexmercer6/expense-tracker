import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726377620440 implements MigrationInterface {
    name = 'InitialMigration1726377620440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unique_item" ("id" int NOT NULL IDENTITY(1,1), "item" nvarchar(255) NOT NULL, CONSTRAINT "UQ_d2131d51ea957acbea8a9fa8d9d" UNIQUE ("item"), CONSTRAINT "PK_137dfab8d87f2f68ac90adbe323" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense_item" ("id" int NOT NULL IDENTITY(1,1), "item" nvarchar(255) NOT NULL, "cost" decimal NOT NULL, "category" ntext NOT NULL, "isNecessary" bit NOT NULL, "isExpected" bit NOT NULL, "date" nvarchar(255) NOT NULL, CONSTRAINT "PK_4ed5a1d3b753e73808271546979" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense" ("id" int NOT NULL IDENTITY(1,1), "description" nvarchar(255) NOT NULL, "amount" decimal NOT NULL, "date" date NOT NULL, "isExpected" bit NOT NULL CONSTRAINT "DF_c75db079582813d48c6e6a216d6" DEFAULT 0, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unique_category" ("id" int NOT NULL IDENTITY(1,1), "category" nvarchar(255) NOT NULL, CONSTRAINT "UQ_d05e456afb6a09d247a0c1a2552" UNIQUE ("category"), CONSTRAINT "PK_a9aa9c03e76816d527ac7a88cc5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "unique_category"`);
        await queryRunner.query(`DROP TABLE "expense"`);
        await queryRunner.query(`DROP TABLE "expense_item"`);
        await queryRunner.query(`DROP TABLE "unique_item"`);
    }

}

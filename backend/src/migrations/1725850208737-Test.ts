import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1725850208737 implements MigrationInterface {
    name = 'Test1725850208737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense" ("id" int NOT NULL IDENTITY(1,1), "description" nvarchar(255) NOT NULL, "amount" decimal NOT NULL, "date" date NOT NULL, "isExpected" bit NOT NULL CONSTRAINT "DF_c75db079582813d48c6e6a216d6" DEFAULT 0, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expense"`);
    }

}

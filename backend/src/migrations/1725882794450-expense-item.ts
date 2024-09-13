import { MigrationInterface, QueryRunner } from "typeorm";

export class ExpenseItem1725882794450 implements MigrationInterface {
    name = 'ExpenseItem1725882794450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense_item" ("id" int NOT NULL IDENTITY(1,1), "item" nvarchar(255) NOT NULL, "cost" decimal NOT NULL, "category" ntext NOT NULL, "isNecessary" bit NOT NULL, "isExpected" bit NOT NULL, "date" nvarchar(255) NOT NULL, CONSTRAINT "PK_4ed5a1d3b753e73808271546979" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expense_item"`);
    }

}

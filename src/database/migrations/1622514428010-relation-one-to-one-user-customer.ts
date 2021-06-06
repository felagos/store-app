import {MigrationInterface, QueryRunner} from "typeorm";

export class relationOneToOneUserCustomer1622514428010 implements MigrationInterface {
    name = 'relationOneToOneUserCustomer1622514428010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "id_customer" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_7411fd2691a45db98b94626f90f" UNIQUE ("id_customer")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7411fd2691a45db98b94626f90f" FOREIGN KEY ("id_customer") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7411fd2691a45db98b94626f90f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_7411fd2691a45db98b94626f90f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id_customer"`);
    }

}

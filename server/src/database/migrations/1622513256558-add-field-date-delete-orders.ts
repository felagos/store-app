import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldDateDeleteOrders1622513256558 implements MigrationInterface {
    name = 'addFieldDateDeleteOrders1622513256558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "createdAt"`);
    }

}

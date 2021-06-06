import {MigrationInterface, QueryRunner} from "typeorm";

export class indexPriceStock1622941000546 implements MigrationInterface {
    name = 'indexPriceStock1622941000546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_4fbc36ad745962e5c11001e1a8"`);
    }

}

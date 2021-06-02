import {MigrationInterface, QueryRunner} from "typeorm";

export class relationProductBrand1622588289680 implements MigrationInterface {
    name = 'relationProductBrand1622588289680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "id_brand" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1176fff99583b66d8df8a53deeb" FOREIGN KEY ("id_brand") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1176fff99583b66d8df8a53deeb"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id_brand"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class joinTableProductCategory1622689368659 implements MigrationInterface {
    name = 'joinTableProductCategory1622689368659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products_category" ("productsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_de7ad21dc6aa47a6669b70e5a60" PRIMARY KEY ("productsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1b82fbf927ae4de27e56a5ea1e" ON "products_category" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2149255cfc64c2cdda4219e0b9" ON "products_category" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products_category" ADD CONSTRAINT "FK_1b82fbf927ae4de27e56a5ea1e2" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_category" ADD CONSTRAINT "FK_2149255cfc64c2cdda4219e0b9e" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_category" DROP CONSTRAINT "FK_2149255cfc64c2cdda4219e0b9e"`);
        await queryRunner.query(`ALTER TABLE "products_category" DROP CONSTRAINT "FK_1b82fbf927ae4de27e56a5ea1e2"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP INDEX "IDX_2149255cfc64c2cdda4219e0b9"`);
        await queryRunner.query(`DROP INDEX "IDX_1b82fbf927ae4de27e56a5ea1e"`);
        await queryRunner.query(`DROP TABLE "products_category"`);
    }

}

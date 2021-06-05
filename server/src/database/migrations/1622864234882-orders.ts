import {MigrationInterface, QueryRunner} from "typeorm";

export class orders1622864234882 implements MigrationInterface {
    name = 'orders1622864234882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_category" DROP CONSTRAINT "FK_1b82fbf927ae4de27e56a5ea1e2"`);
        await queryRunner.query(`ALTER TABLE "products_category" DROP CONSTRAINT "FK_2149255cfc64c2cdda4219e0b9e"`);
        await queryRunner.query(`CREATE TABLE "orders_items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "id_product" integer, "id_order" integer, CONSTRAINT "PK_0fd87b790d35ac255b17f6a3bd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_customer" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders_items" ADD CONSTRAINT "FK_0f3019f9535dff117ffda3582f6" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_items" ADD CONSTRAINT "FK_2c37fb65e763c13d049cf4cb5ac" FOREIGN KEY ("id_order") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_46c387232807620bc0b8604cca0" FOREIGN KEY ("id_customer") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_category" ADD CONSTRAINT "FK_1b82fbf927ae4de27e56a5ea1e2" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_category" ADD CONSTRAINT "FK_2149255cfc64c2cdda4219e0b9e" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_category" DROP CONSTRAINT "FK_2149255cfc64c2cdda4219e0b9e"`);
        await queryRunner.query(`ALTER TABLE "products_category" DROP CONSTRAINT "FK_1b82fbf927ae4de27e56a5ea1e2"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_46c387232807620bc0b8604cca0"`);
        await queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "FK_2c37fb65e763c13d049cf4cb5ac"`);
        await queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "FK_0f3019f9535dff117ffda3582f6"`);
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orders_items"`);
        await queryRunner.query(`ALTER TABLE "products_category" ADD CONSTRAINT "FK_2149255cfc64c2cdda4219e0b9e" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_category" ADD CONSTRAINT "FK_1b82fbf927ae4de27e56a5ea1e2" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

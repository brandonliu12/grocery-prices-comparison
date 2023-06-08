-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "brands" (
    "brand_id" INTEGER   NOT NULL,
    "brand_name" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_brands" PRIMARY KEY (
        "brand_id"
     )
);

CREATE TABLE "stores" (
    "store_id" INTEGER   NOT NULL,
    "store_name" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_stores" PRIMARY KEY (
        "store_id"
     )
);

CREATE TABLE "edmonton" (
    "id" INTEGER   NOT NULL,
    "product_brand" VARCHAR(255)   NOT NULL,
    "product_name" VARCHAR(255)   NOT NULL,
    "edmonton_price" NUMERIC(10,2)   NOT NULL,
    "brand_id" INT   NOT NULL,
    CONSTRAINT "pk_edmonton" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "toronto" (
    "id" INTEGER   NOT NULL,
    "product_brand" VARCHAR(255)   NOT NULL,
    "product_name" VARCHAR(255)   NOT NULL,
    "toronto_price" NUMERIC(10,2)   NOT NULL,
    "brand_id" INT   NOT NULL,
    CONSTRAINT "pk_toronto" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "ottowa" (
    "id" INTEGER   NOT NULL,
    "product_brand" VARCHAR(255)   NOT NULL,
    "product_name" VARCHAR(255)   NOT NULL,
    "ottowa_price" NUMERIC(10,2)   NOT NULL,
    "brand_id" INT   NOT NULL,
    CONSTRAINT "pk_ottowa" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "vancouver" (
    "id" INTEGER   NOT NULL,
    "product_brand" VARCHAR(255)   NOT NULL,
    "product_name" VARCHAR(255)   NOT NULL,
    "vancouver_price" NUMERIC(10,2)   NOT NULL,
    "brand_id" INT   NOT NULL,
    CONSTRAINT "pk_vancouver" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "edmonton" ADD CONSTRAINT "fk_edmonton_brand_id" FOREIGN KEY("brand_id")
REFERENCES "brands" ("brand_id");

ALTER TABLE "toronto" ADD CONSTRAINT "fk_toronto_brand_id" FOREIGN KEY("brand_id")
REFERENCES "brands" ("brand_id");

ALTER TABLE "ottowa" ADD CONSTRAINT "fk_ottowa_brand_id" FOREIGN KEY("brand_id")
REFERENCES "brands" ("brand_id");

ALTER TABLE "vancouver" ADD CONSTRAINT "fk_vancouver_brand_id" FOREIGN KEY("brand_id")
REFERENCES "brands" ("brand_id");


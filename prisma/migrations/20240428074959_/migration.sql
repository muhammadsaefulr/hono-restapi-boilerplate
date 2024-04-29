-- CreateTable
CREATE TABLE "userModel" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "userModel_pkey" PRIMARY KEY ("id")
);

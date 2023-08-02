-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "screenshot" TEXT,
    "name" TEXT,
    "email" TEXT,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signined" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailSent" BOOLEAN NOT NULL,

    CONSTRAINT "signined_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signined_email_key" ON "signined"("email");

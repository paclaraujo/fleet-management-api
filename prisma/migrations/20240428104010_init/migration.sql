-- CreateTable
CREATE TABLE "taxis" (
    "id" SERIAL NOT NULL,
    "plate" VARCHAR(255) NOT NULL,

    CONSTRAINT "taxis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trajectories" (
    "id" SERIAL NOT NULL,
    "taxi_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "trajectories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trajectories" ADD CONSTRAINT "trajectories_taxi_id_fkey" FOREIGN KEY ("taxi_id") REFERENCES "taxis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

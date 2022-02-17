-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT,
    "mot_de_passe" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_secret" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendrier" (
    "id" SERIAL NOT NULL,
    "auteur_id" INTEGER NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calendrier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilisateursCalendriers" (
    "utilisateur_id" INTEGER NOT NULL,
    "calendrier_id" INTEGER NOT NULL,
    "date_utilisation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UtilisateursCalendriers_pkey" PRIMARY KEY ("utilisateur_id","calendrier_id")
);

-- CreateTable
CREATE TABLE "CultureInstance" (
    "id" SERIAL NOT NULL,
    "date_demarrage" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calendrier_id" INTEGER NOT NULL,
    "culture_id" INTEGER NOT NULL,

    CONSTRAINT "CultureInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CultureRecommandee" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "en_construction" BOOLEAN NOT NULL DEFAULT true,
    "recommandation_basse" INTEGER NOT NULL,
    "recommandation_haute" INTEGER NOT NULL,
    "nom_latin" TEXT,
    "duree_cycle" INTEGER NOT NULL,
    "produit" TEXT,
    "variete" TEXT,

    CONSTRAINT "CultureRecommandee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationCulturale" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "origine_intervalle_possible" INTEGER NOT NULL,
    "intervalle_possible" INTEGER NOT NULL,
    "description" TEXT,
    "statut" TEXT NOT NULL,
    "culture_id" INTEGER NOT NULL,

    CONSTRAINT "OperationCulturale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Calendrier" ADD CONSTRAINT "Calendrier_auteur_id_fkey" FOREIGN KEY ("auteur_id") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilisateursCalendriers" ADD CONSTRAINT "UtilisateursCalendriers_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilisateursCalendriers" ADD CONSTRAINT "UtilisateursCalendriers_calendrier_id_fkey" FOREIGN KEY ("calendrier_id") REFERENCES "Calendrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultureInstance" ADD CONSTRAINT "CultureInstance_calendrier_id_fkey" FOREIGN KEY ("calendrier_id") REFERENCES "Calendrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultureInstance" ADD CONSTRAINT "CultureInstance_culture_id_fkey" FOREIGN KEY ("culture_id") REFERENCES "CultureRecommandee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationCulturale" ADD CONSTRAINT "OperationCulturale_culture_id_fkey" FOREIGN KEY ("culture_id") REFERENCES "CultureRecommandee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

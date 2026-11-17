/* 180° Barbershop — maquette locale. Prestations, prix, durées et prénoms : EXEMPLES à confirmer. */
window.SITE_CONFIG = {
 "SITE_ID": "s180",
 "PHONE": "0549769637",
 "PHONE_DISPLAY": "0549 76 96 37",
 "TZ_OFFSET_MIN": 60,
 "STEP_MIN": 30,
 "DAYS_AHEAD": 14,
 "BARBERS": [
  {
   "id": 1,
   "name": "Barbier 1",
   "bio": "Prénom à confirmer"
  },
  {
   "id": 2,
   "name": "Barbier 2",
   "bio": "Prénom à confirmer"
  }
 ],
 "SERVICES": [
  {
   "id": 1,
   "name": "Coupe homme",
   "description": "Coupe tondeuse ou ciseaux, finitions et coiffage.",
   "price_da": 500,
   "duration_min": 30,
   "to_confirm": true
  },
  {
   "id": 2,
   "name": "Barbe",
   "description": "Taille, contours et finitions.",
   "price_da": 300,
   "duration_min": 20,
   "to_confirm": true
  },
  {
   "id": 3,
   "name": "Coupe + barbe",
   "description": "Coupe complète avec taille de barbe.",
   "price_da": 700,
   "duration_min": 45,
   "to_confirm": true
  },
  {
   "id": 4,
   "name": "Coupe enfant",
   "description": "Pour les moins de 12 ans.",
   "price_da": 400,
   "duration_min": 25,
   "to_confirm": true
  },
  {
   "id": 5,
   "name": "Soin / brushing",
   "description": "Shampoing, soin et mise en forme.",
   "price_da": 600,
   "duration_min": 30,
   "to_confirm": true
  },
  {
   "id": 6,
   "name": "Rasage au rasoir",
   "description": "Rasage traditionnel (service cité dans un avis Google).",
   "price_da": 300,
   "duration_min": 20,
   "to_confirm": true
  }
 ],
 "HOURS": [
  {
   "dow": 0,
   "closed": true,
   "open_min": 600,
   "close_min": 1380
  },
  {
   "dow": 1,
   "closed": false,
   "open_min": 0,
   "close_min": 1440
  },
  {
   "dow": 2,
   "closed": false,
   "open_min": 0,
   "close_min": 1440
  },
  {
   "dow": 3,
   "closed": false,
   "open_min": 0,
   "close_min": 1440
  },
  {
   "dow": 4,
   "closed": false,
   "open_min": 0,
   "close_min": 1440
  },
  {
   "dow": 5,
   "closed": false,
   "open_min": 0,
   "close_min": 1440
  },
  {
   "dow": 6,
   "closed": false,
   "open_min": 0,
   "close_min": 1440
  }
 ]
};

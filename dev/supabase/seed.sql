-- 180° Barbershop — données de départ (une seule fois). Horaires = fiche Google Maps (nov. 2026) : 24h/24 lun–sam, fermé le dimanche.
-- Barbiers, prestations et prix : EXEMPLES à confirmer avec le salon (to_confirm = true).
insert into barber180.hours (dow, closed, open_min, close_min) values
 (0,true,0,1440),(1,false,0,1440),(2,false,0,1440),(3,false,0,1440),
 (4,false,0,1440),(5,false,0,1440),(6,false,0,1440)
on conflict (dow) do nothing;
insert into barber180.barbers (name, bio, sort)
select * from (values ('Barbier 1','Prénom à confirmer',1),('Barbier 2','Prénom à confirmer',2)) v where not exists (select 1 from barber180.barbers);
insert into barber180.services (name, description, price_da, duration_min, to_confirm, sort)
select * from (values
 ('Coupe homme','Coupe tondeuse ou ciseaux, finitions et coiffage.',500,30,true,1),
 ('Barbe','Taille, contours et finitions.',300,20,true,2),
 ('Coupe + barbe','Coupe complète avec taille de barbe.',700,45,true,3),
 ('Coupe enfant','Pour les moins de 12 ans.',400,25,true,4),
 ('Soin / brushing','Shampoing, soin et mise en forme.',600,30,true,5),
 ('Rasage au rasoir','Rasage traditionnel (service cité dans un avis Google).',300,20,true,6)
) v where not exists (select 1 from barber180.services);

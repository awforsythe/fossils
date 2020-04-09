begin;

with s as (insert into fossil.species (name) values ('acanthostega') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'acanthostega');

with s as (insert into fossil.species (name) values ('amber') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'amber');

with s as (insert into fossil.species (name) values ('ammonite') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'ammonite');

with s as (insert into fossil.species (name) values ('ankylosaurus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'ankylo skull'),
    ((select id from s), 'ankylo torso'),
    ((select id from s), 'ankylo tail');

with s as (insert into fossil.species (name) values ('anomalocaris') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'anomalocaris');

with s as (insert into fossil.species (name) values ('archaeopteryx') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'archaeopteryx');

with s as (insert into fossil.species (name) values ('archelon') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'archelon skull'),
    ((select id from s), 'archelon tail');

with s as (insert into fossil.species (name) values ('australopith') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'australopith');

with s as (insert into fossil.species (name) values ('brachiosaurus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'brachio skull'),
    ((select id from s), 'brachio chest'),
    ((select id from s), 'brachio pelvis'),
    ((select id from s), 'brachio tail');

with s as (insert into fossil.species (name) values ('coprolite') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'coprolite');

with s as (insert into fossil.species (name) values ('deinonychus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'deinonychus torso'),
    ((select id from s), 'deinonychus tail');

with s as (insert into fossil.species (name) values ('dimetrodon') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'dimetrodon skull'),
    ((select id from s), 'dimetrodon torso'),
    ((select id from s), 'dimetrodon tail');

with s as (insert into fossil.species (name) values ('dinosaur track') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'dinosaur track');

with s as (insert into fossil.species (name) values ('diplodocus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'diplo skull'),
    ((select id from s), 'diplo neck'),
    ((select id from s), 'diplo chest'),
    ((select id from s), 'diplo pelvis'),
    ((select id from s), 'diplo tail'),
    ((select id from s), 'diplo tail tip');

with s as (insert into fossil.species (name) values ('dunkleosteus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'dunkleosteus');

with s as (insert into fossil.species (name) values ('eusthenopteron') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'eusthenopteron');

with s as (insert into fossil.species (name) values ('iguanodon') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'iguanodon skull'),
    ((select id from s), 'iguanodon torso'),
    ((select id from s), 'iguanodon tail');

with s as (insert into fossil.species (name) values ('juramaia') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'juramaia');

with s as (insert into fossil.species (name) values ('mammoth') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'mammoth skull'),
    ((select id from s), 'mammoth torso');

with s as (insert into fossil.species (name) values ('megacerops') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'megacero skull'),
    ((select id from s), 'megacero torso'),
    ((select id from s), 'megacero tail');

with s as (insert into fossil.species (name) values ('megaloceros') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'megalo left side'),
    ((select id from s), 'megalo right side');

with s as (insert into fossil.species (name) values ('myllokunmingia') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'myllokunmingia');

with s as (insert into fossil.species (name) values ('ophthalmosaurus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'ophthalmo skull'),
    ((select id from s), 'ophthalmo torso'),
    ((select id from s), 'ophthalmo tail');

with s as (insert into fossil.species (name) values ('pachycephalosaurus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'pachy skull'),
    ((select id from s), 'pachy torso'),
    ((select id from s), 'pachy tail');

with s as (insert into fossil.species (name) values ('parasaurolophus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'parasaur skull'),
    ((select id from s), 'parasaur torso'),
    ((select id from s), 'parasaur tail');

with s as (insert into fossil.species (name) values ('plesiosaurus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'plesio skull'),
    ((select id from s), 'plesio neck'),
    ((select id from s), 'plesio torso');

with s as (insert into fossil.species (name) values ('pteranodon') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'ptera body'),
    ((select id from s), 'left ptera wing'),
    ((select id from s), 'right ptera wing');

with s as (insert into fossil.species (name) values ('quetzalcoatlus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'quetzal torso'),
    ((select id from s), 'left quetzal wing'),
    ((select id from s), 'right quetzal wing');

with s as (insert into fossil.species (name) values ('sabertooth tiger') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'sabertooth skull'),
    ((select id from s), 'sabertooth torso');

with s as (insert into fossil.species (name) values ('shark-tooth pattern') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'shark-tooth pattern');

with s as (insert into fossil.species (name) values ('spinosaurus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'spino skull'),
    ((select id from s), 'spino torso'),
    ((select id from s), 'spino tail');

with s as (insert into fossil.species (name) values ('stegosaurus') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'stego skull'),
    ((select id from s), 'stego torso'),
    ((select id from s), 'stego tail');

with s as (insert into fossil.species (name) values ('tyrannosaurus rex') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 't. rex skull'),
    ((select id from s), 't. rex torso'),
    ((select id from s), 't. rex tail');

with s as (insert into fossil.species (name) values ('triceratops') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'tricera skull'),
    ((select id from s), 'tricera torso'),
    ((select id from s), 'tricera tail');

with s as (insert into fossil.species (name) values ('trilobite') returning id)
insert into fossil.piece (species_id, name) values
    ((select id from s), 'trilobite');

commit;

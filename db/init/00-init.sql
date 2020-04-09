begin;

create schema fossil;
create schema fossil_private;

create table fossil.species (
  id          serial primary key,
  name        text unique not null check (char_length(name) < 128)
);
comment on table fossil.species is 'Prepopulated with all known fossil species, each of which has one or more pieces';
comment on column fossil.species.id is 'Unique ID for a fossil species';
comment on column fossil.species.name is 'Name of the fossil species, e.g. "ankylosaurus"';

create table fossil.piece (
  id          serial primary key,
  species_id  integer not null references fossil.species(id),
  name        text not null check (char_length(name) < 128),
  unique (species_id, name)
);
comment on table fossil.piece is 'A single body part in a fossil set: some sets only have one piece';
comment on column fossil.piece.id is 'Unique ID for a fossil piece';
comment on column fossil.piece.species_id is 'Identifies the species that the fossil piece belongs to';
comment on column fossil.piece.name is 'Name of the in-game item, e.g. "ankylo skull" - for single-piece species, matches the species name';

create table fossil.cohort (
  id          serial primary key,
  code        text unique not null check (char_length(code) < 128)
);
comment on table fossil.cohort is 'A group of players who are using this app to track their fossils and organize trades';
comment on column fossil.cohort.id is 'Unique, not-at-all secret ID, used internally to associate players with the cohort';
comment on column fossil.cohort.code is 'A sorta-secret identifier, used to create a private URL that can be shared among the cohort members';

create table fossil.player (
  id          serial primary key,
  cohort_id   integer not null references fossil.cohort(id),
  name        text not null check (char_length(name) < 128),
  unique(cohort_id, name)
);
comment on table fossil.player is 'Represents a single player who is collecting fossils along with other players in a single cohort';
comment on column fossil.player.id is 'Unique ID for a player';
comment on column fossil.player.cohort_id is 'Identifies the cohort that the player belongs to; note that a player can only be in one cohort by design';
comment on column fossil.player.name is 'User-entered name for this player';

create table fossil.have (
  player_id   integer references fossil.player(id),
  piece_id    integer references fossil.piece(id),
  primary key (player_id, piece_id)
);
comment on table fossil.have is 'Association table tracking which players have which fossils';
comment on column fossil.have.player_id is 'ID of a single player';
comment on column fossil.have.piece_id is 'ID of a single piece which that player owns';

commit;

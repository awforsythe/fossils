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

create table fossil.team (
  id          serial primary key,
  code        text unique not null check (char_length(code) < 128),
  name        text not null check (char_length(name) < 128)
);
comment on table fossil.team is 'A group of players who are using this app to track their fossils and organize trades';
comment on column fossil.team.id is 'Unique, not-at-all secret ID, used internally to associate players with the team';
comment on column fossil.team.code is 'A sorta-secret identifier, used to create a private URL that can be shared among the team members';
comment on column fossil.team.name is 'A human-readable name for the team, just to give it some character';

create table fossil.player (
  id          serial primary key,
  team_id     integer not null references fossil.team(id),
  name        text not null check (char_length(name) < 128),
  unique(team_id, name)
);
comment on table fossil.player is 'Represents a single player who is collecting fossils along with other players in a single team';
comment on column fossil.player.id is 'Unique ID for a player';
comment on column fossil.player.team_id is 'Identifies the team that the player belongs to; note that a player can only be in one team by design';
comment on column fossil.player.name is 'User-entered name for this player';

create table fossil.have (
  player_id   integer references fossil.player(id),
  piece_id    integer references fossil.piece(id),
  primary key (player_id, piece_id)
);
comment on table fossil.have is 'Association table tracking which players have which fossils';
comment on column fossil.have.player_id is 'ID of a single player';
comment on column fossil.have.piece_id is 'ID of a single piece which that player owns';

create function notify_row_change() returns trigger as $trigger$
declare
  rec record;
begin
  case TG_OP
    when 'INSERT', 'UPDATE' then rec := NEW;
    when 'DELETE' then rec := OLD;
    else raise exception 'Unknown TG_OP: "%s"', TG_OP;
  end case;
  perform pg_notify('db_events', json_build_object('table', TG_TABLE_NAME, 'op', lower(TG_OP), 'row', row_to_json(rec))::text);
  return rec;
end;
$trigger$ language plpgsql;

create function notify_have_change() returns trigger as $trigger$
declare
  rec record;
  resolved_team_id integer;
begin
  case TG_OP
    when 'DELETE' then rec := OLD;
    else rec := NEW;
  end case;
  select team_id into resolved_team_id from fossil.player where id = rec.player_id;
  perform pg_notify('db_events', json_build_object('team_id', resolved_team_id, 'table', TG_TABLE_NAME, 'op', lower(TG_OP), 'row', row_to_json(rec))::text);
  return rec;
end;
$trigger$ language plpgsql;

create trigger on_team_change
  after update on fossil.team
  for each row execute function notify_row_change();

create trigger on_player_change
  after insert or update or delete on fossil.player
  for each row execute function notify_row_change();

create trigger on_have_change
  after insert or delete on fossil.have
  for each row execute function notify_have_change();

commit;

import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {Pokebox} from '@/types/game/pokebox';
import {PokeInBoxData} from '@/types/mongo/pokebox';
import {isNotNullish} from '@/utils/type';


const getCollection = async (): Promise<Collection<PokeInBoxData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<PokeInBoxData>('pokebox');
};

export const getUserPokebox = async (owner: string | undefined): Promise<Pokebox> => {
  if (!owner) {
    return {};
  }

  const pokeboxArray = await (await getCollection())
    .find({owner}, {projection: {owner: false, _id: false}})
    .toArray();

  return Object.fromEntries(pokeboxArray.map((pokeInBox) => [pokeInBox.uuid, pokeInBox]));
};

export const updateUserPokebox = async (owner: string, pokebox: Pokebox) => {
  await (await mongoPromise).withSession(async (session) => {
    await session.withTransaction(async () => {
      const collection = await getCollection();

      await collection.deleteMany({owner}, {session});
      const pokeboxAsArray = Object.values(pokebox).filter(isNotNullish);
      if (pokeboxAsArray.length) {
        await collection.insertMany(
          pokeboxAsArray.map((pokemon): PokeInBoxData => ({...pokemon, owner})),
          {session},
        );
      }
    });
  });
};

const addPokeboxIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({owner: 1}),
    collection.createIndex({uuid: 1}, {unique: true}),
  ]);
};

addPokeboxIndex()
  .catch((e) => console.error('MongoDB failed to add Pokebox index', e));

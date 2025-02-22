import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


export type PokeboxImporterCommonProps = {
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  ingredientChainMap: IngredientChainMap,
  onPokeboxPicked: (pokeInBox: PokeInBox) => void,
};

export type PokeInBoxForFilter = Omit<PokeInBox, 'name' | 'pokemon'> & {
  name: string,
  search: string[],
  pokemon: PokemonInfo,
};

export type PokeboxImporterFilter = PokemonInputFilter & {
  name: string,
};

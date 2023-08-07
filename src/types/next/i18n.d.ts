type UiMessages = typeof import('./src/translations/ui-en.json');
type GameMessages = typeof import('./src/translations/ui-en.json');

type I18nMetadata = {
  Title: string,
};

type PageWithIndividual = {
  Index: I18nMetadata,
  Page: I18nMetadata,
};

type GameObjectIdToString = {[id in string]: string};

declare interface IntlMessages extends UiMessages, GameMessages {
  UI: {
    Common: {
      Candy: string,
      Day: string,
      DreamShards: string,
      Exp: string,
      Rank: string,
      Rewards: string,
      Shiny: string,
    },
    Metadata: {
      SiteName: string,
      Home: I18nMetadata,
      Pokedex: PageWithIndividual,
      Analysis: PageWithIndividual,
      Cooking: I18nMetadata,
      Meal: PageWithIndividual,
      Ingredient: PageWithIndividual,
      Map: PageWithIndividual,
      Team: {
        Calculate: I18nMetadata,
        Index: I18nMetadata,
        Maker: I18nMetadata,
      },
      Info: {
        Index: I18nMetadata,
        Pot: I18nMetadata,
        Nature: I18nMetadata,
      },
      Skill: PageWithIndividual,
      Incense: PageWithIndividual,
    },
    InPage: {
      Home: {
        Welcome: string,
      },
      Pokedex: {
        Info: {
          Berry: string,
          Ingredient: string,
          MainSkill: string,
          Map: string,
          Name: string,
          PokemonLevel: string,
          PokemonType: string,
          SleepType: string,
          Specialty: string,
          Stats: string,
        },
        Stats: {
          Energy: {
            Daily: string,
            Name: string,
            Weekly: string,
          },
          Frequency: string,
          Friendship: string,
          MaxCarry: string,
          Recruit: string,
        },
        Sort: {
          Id: string,
          IngredientEnergy: string,
          IngredientCount: string,
          BerryEnergy: string,
          BerryCount: string,
          FriendshipPoint: string,
        },
      },
      Analysis: {
        FirstAppearance: string,
        LastSleepStyle: string,
      },
      Cooking: {
        Energy: string,
        Ingredient: string,
        MealDisplayType: {
          EnergyRange: string,
          Ingredient: string,
        },
        MealType: string,
        PotCapacity: string,
        RecipeLevel: string,
      },
      Ingredient: {
        Energy: string,
      },
      Map: {
        Energy: string,
        Pokemon: string,
        SleepStyle: string,
      },
      Team: {
        CurrentEnergy: string,
        SnorlaxFavorite: string,
      },
      Info: {
        Pot: {
          Capacity: string,
          Expand: string,
          UnlockedRecipes: string,
        },
      },
    },
    UserControl: {
      Login: string,
      Logout: string,
    },
  },
  Game: {
    Berry: GameObjectIdToString,
    Field: GameObjectIdToString,
    Food: GameObjectIdToString,
    MainSkill: {
      Name: GameObjectIdToString,
      Description: GameObjectIdToString,
    },
    MealType: GameObjectIdToString,
    Nature: GameObjectIdToString,
    NatureEffect: GameObjectIdToString,
    PokemonType: GameObjectIdToString,
    PokemonName: GameObjectIdToString,
    RankTitle: GameObjectIdToString,
    SleepFace: {
      onSnorlax: {Default: string},
      [pokemonId: string]: GameObjectIdToString
    },
    SleepType: GameObjectIdToString,
    Specialty: GameObjectIdToString,
    SubSkill: GameObjectIdToString,
  }
}

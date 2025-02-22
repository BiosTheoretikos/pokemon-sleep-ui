import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {useTeamAnalysisPokemonPopup} from '@/ui/team/analysis/setup/pokemon/popup/hook';
import {TeamAnalysisPokemonPopupType, TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


export type TeamAnalysisPokemonPopupState = {
  show: boolean,
  type: TeamAnalysisPokemonPopupType | null,
};

export type TeamAnalysisPokemonPopupControl = ReturnType<typeof useTeamAnalysisPokemonPopup>;

export type TeamAnalysisPokemonPopupCommonProps = TeamAnalysisPokemonProps & {
  state: TeamAnalysisPokemonPopupControl,
  ratingControl: RatingPopupControl,
};

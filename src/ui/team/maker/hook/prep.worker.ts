import {getTeamMakerCalcPrepOpts} from '@/ui/team/maker/calc/main/prep';
import {GetTeamMakerCalcPrepOpts} from '@/ui/team/maker/hook/type';


const onMessage = ({data}: MessageEvent<GetTeamMakerCalcPrepOpts>) => {
  const result = getTeamMakerCalcPrepOpts(data);

  postMessage(result);
};

addEventListener('message', onMessage);

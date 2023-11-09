import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {getAllActivationsOfSource} from '@/controller/user/activation/util';
import {scanActivations} from '@/handler/call/activation/poll/scan/main';
import {scanPatreonActivationInDatabase} from '@/handler/call/activation/poll/scan/patreon/activation';
import {scanPatron} from '@/handler/call/activation/poll/scan/patreon/member';
import {mergeScanResult} from '@/handler/call/activation/poll/scan/utils';
import {getCurrentCampaignMembers} from '@/handler/shared/patreon/api/campaign/main';
import {toActivationPayloadFromPatreon} from '@/handler/shared/patreon/utils';


export const callPatreonActivationPoll = async () => {
  const [
    members,
    activations,
    presetLookup,
  ] = await Promise.all([
    getCurrentCampaignMembers(),
    getAllActivationsOfSource('patreon'),
    getActivationPresetLookupOfSource('patreon'),
  ]);

  return scanActivations({
    source: 'patreon',
    data: mergeScanResult({
      results: [
        scanPatron({members, activations}),
        scanPatreonActivationInDatabase({members, activations}),
      ],
      getId: ({member}) => member.id,
    }),
    toPayload: async ({member}) => await toActivationPayloadFromPatreon({
      member: member.member,
      presetLookup,
    }),
    presetLookup,
  });
};

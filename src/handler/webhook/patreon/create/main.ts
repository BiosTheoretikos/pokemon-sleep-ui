import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {actionSendActivationEmail} from '@/handler/action/activation/main';
import {toActivationPayloadFromPatreon} from '@/handler/patreon/utils';
import {PatreonWebhookPayload} from '@/types/patreon/webhook';


export const handlePatreonPledgeCreated = async (
  payload: PatreonWebhookPayload,
) => {
  const presetLookup = await getActivationPresetLookupOfSource('patreon');

  return actionSendActivationEmail({
    payload: await toActivationPayloadFromPatreon({member: payload.data, presetLookup}),
    sourceNote: 'Patreon Webhook',
    getWarnOnNullActivation: ({email}) => `Patreon member is inactive for email: ${email}`,
  });
};

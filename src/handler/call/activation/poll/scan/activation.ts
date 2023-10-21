import {ScanPatronOpts, ScanPatronResult} from '@/handler/call/activation/poll/scan/type';
import {isPatronActive} from '@/utils/external/patreon';


export const scanActivations = ({memberData, activations}: ScanPatronOpts): ScanPatronResult => {
  const result: ScanPatronResult = {
    toUpdateExpiry: [],
    toDeactivate: [],
    toSendActivation: [],
  };

  for (const {key, source, contact} of activations) {
    if (source !== 'patreon') {
      continue;
    }

    const memberDataSelected = memberData
      .find(({member}) => member.attributes.email === contact.patreon);
    if (!memberDataSelected) {
      continue;
    }

    if (isPatronActive(memberDataSelected.member)) {
      continue;
    }

    result.toDeactivate.push({memberData: memberDataSelected, key});
  }

  return result;
};

import {StaminaCalcRecoveryRateConfig, StaminaEventLog} from '@/types/game/producing/stamina';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';


type UpdateLogStaminaFromLastOpts = {
  source: StaminaEventLog,
  last: StaminaEventLog,
};

export const updateLogStaminaFromLast = ({source, last}: UpdateLogStaminaFromLastOpts): StaminaEventLog => {
  const duration = source.timing - last.timing;

  const stamina = getStaminaAfterDuration({
    start: last.stamina.after,
    duration,
  });
  const staminaUnderlying = getStaminaAfterDuration({
    start: last.staminaUnderlying.after,
    duration,
  });

  return {
    ...source,
    stamina: {
      before: stamina.inGame,
      after: stamina.inGame,
    },
    staminaUnderlying: {
      before: staminaUnderlying.actual,
      after: staminaUnderlying.actual,
    },
  };
};

type GenerateSleepEventFromLastOpts = {
  newLogs: StaminaEventLog[],
  sleepLog: StaminaEventLog,
};

export const generateSleepEventFromLast = ({newLogs, sleepLog}: GenerateSleepEventFromLastOpts): StaminaEventLog => {
  const last = newLogs[newLogs.length - 1];

  return updateLogStaminaFromLast({source: sleepLog, last});
};

type OffsetEventLogStaminaOpts = {
  log: StaminaEventLog,
  offset: number,
};

export const offsetEventLogStamina = ({log, offset}: OffsetEventLogStaminaOpts): StaminaEventLog => {
  const {staminaUnderlying} = log;

  return {
    ...log,
    stamina: {
      before: Math.max(0, staminaUnderlying.before + offset),
      after: Math.max(0, staminaUnderlying.after + offset),
    },
    staminaUnderlying: {
      before: staminaUnderlying.before + offset,
      after: staminaUnderlying.after + offset,
    },
  };
};

type GetActualRecoveryAmountOpts = {
  amount: number,
  recoveryRate: StaminaCalcRecoveryRateConfig,
  isSleep: boolean,
};

export const getActualRecoveryAmount = ({amount, recoveryRate, isSleep}: GetActualRecoveryAmountOpts) => {
  const {general, sleep} = recoveryRate;

  return Math.ceil(amount * general * (isSleep ? sleep : 1));
};

export enum ProcessState {
  INIT,
  PROCESSING,
  COMPLETED,
  EMPTIED
}

export interface ErrorState {
  errorMsg: string;
}

export type CallState = ProcessState | ErrorState;

export const getCallStateError = (callState: CallState): string | void => {
  if ((callState as ErrorState)?.errorMsg !== undefined) {
    return (callState as ErrorState).errorMsg;
  }
};

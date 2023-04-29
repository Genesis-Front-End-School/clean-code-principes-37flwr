export const HOTKEY_PARAMS = [
  { key: '1', action: '0.5' },
  { key: '2', action: '0.75' },
  { key: '3', action: '1' },
  { key: '4', action: '1.5' },
  { key: '5', action: '2' },
];

export interface IHotkeyParam {
  key: string;
  action: string;
}

export type IHotkeyParams = Array<IHotkeyParam>;

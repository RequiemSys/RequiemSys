export const BURIAL_UNIT_TYPES = [
  'Individual',
  'Familiar',
  'Perpétuo',
  'Ossário',
  'Columbário',
  'Gaveta',
];

export const BURIAL_UNIT_LOCATIONS = [
  'Setor A',
  'Setor B',
  'Setor C',
  'Setor D',
  'Quadra 1',
  'Quadra 2',
  'Quadra 3',
  'Mausoléu',
];

export const BURIAL_UNIT_STATUS = [
  { value: 'Disponível', label: 'Disponível' },
  { value: 'Ocupado', label: 'Ocupado' },
  { value: 'Reservado', label: 'Reservado' },
  { value: 'Em manutenção', label: 'Em manutenção' },
];

export function formatBurialUnitStatus(status?: string): string {
  const found = BURIAL_UNIT_STATUS.find((item) => item.value === status);
  return found?.label ?? status ?? '-';
}

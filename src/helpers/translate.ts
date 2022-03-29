export function translateWeekday(value: string) {
  switch (value) {
    case 'mon':
      return 'Toda segunda';
    case 'tue':
      return 'Toda terça';
    case 'wed':
      return 'Toda quarta';
    case 'thu':
      return 'Toda quinta';
    case 'fri':
      return 'Toda sexta';
    case 'sat':
      return 'Todo sábado';
    case 'sun':
      return 'Todo domingo';
    default:
      return 'Houve algum erro';
  }
}

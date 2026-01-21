export type HorarioColetaDia = {
  dia: string;
  horarios: string[];
  observacao?: string;
};

export const HORARIOS_COLETA: HorarioColetaDia[] = [
  {
    dia: 'Segunda-feira',
    horarios: ['07:00 - 11:00', '13:00 - 17:00'],
  },
  {
    dia: 'Terça-feira',
    horarios: ['07:00 - 11:00'],
  },
  {
    dia: 'Quarta-feira',
    horarios: ['13:00 - 17:00'],
  },
  {
    dia: 'Quinta-feira',
    horarios: ['07:00 - 11:00'],
  },
  {
    dia: 'Sexta-feira',
    horarios: ['07:00 - 11:00'],
  },
  {
    dia: 'Sábado',
    horarios: ['08:00 - 12:00'],
  },
  {
    dia: 'Domingo',
    horarios: [],
    observacao: 'Sem coleta.',
  },
];

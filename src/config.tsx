export const KINDS_OF_WIN_CHECKER = [
  // Row
  [
    [1, 0],
    [-1, 0],
  ],
  // Col
  [
    [0, 1],
    [0, -1],
  ],
  // Dash
  [
    [1, 1],
    [-1, -1],
  ],
  // Slash
  [
    [1, -1],
    [-1, 1],
  ],
];

export const ROOM_TAB_LIST = ['all', 'waiting', 'playing'];

export const RANK_LIST = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

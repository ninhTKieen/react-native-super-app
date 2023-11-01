const mType = new Map<number | undefined, number>();
mType.set(24, 3);
mType.set(2401, 3);
// mType.set(2402, 2);
mType.set(2403, 3);
mType.set(2404, 3);
mType.set(2405, 3);
mType.set(2406, 3);
mType.set(2407, 3);
mType.set(2408, 3);
mType.set(2409, 3);
mType.set(1001, 3);
mType.set(1002, 3);
mType.set(1003, 3);
mType.set(1004, 3);
mType.set(1005, 3);
mType.set(1006, 3);
mType.set(1007, 3);
mType.set(1008, 3);
mType.set(1009, 3);
mType.set(1010, 3);
mType.set(1011, 3);
mType.set(1012, 3);
mType.set(1013, 3);

mType.set(3201, 2);
// mType.set(3202, 2);
mType.set(3203, 2);
mType.set(3204, 2);
mType.set(3205, 2);

mType.set(2901, 3);
mType.set(2902, 3);
mType.set(2903, 3);
mType.set(2904, 3);
mType.set(2905, 3);
mType.set(2906, 3);
mType.set(2907, 3);
mType.set(2908, 3);
mType.set(2909, 3);
mType.set(2910, 3);
mType.set(2911, 3);
mType.set(2912, 3);
mType.set(2913, 3);

mType.set(1201, 2);
mType.set(1202, 2);
mType.set(1203, 2);
mType.set(1204, 2);

mType.set(33, 2);
mType.set(3301, 2);
mType.set(3302, 2);
mType.set(3303, 2);
mType.set(3304, 2);
mType.set(3305, 2);
mType.set(3306, 2);

mType.set(27, 2);
mType.set(2701, 3);
mType.set(2707, 3);
mType.set(2708, 3);
mType.set(2709, 3);

mType.set(25, 2);
mType.set(2501, 2);
mType.set(2502, 2);
mType.set(2503, 2);
mType.set(2504, 2);
mType.set(2505, 2);
mType.set(2506, 2);
mType.set(2507, 2);
mType.set(2508, 2);

mType.set(5, 3);
mType.set(501, 3);
mType.set(502, 3);
mType.set(503, 3);
mType.set(504, 3);
mType.set(505, 3);
mType.set(506, 3);
mType.set(507, 3);
mType.set(508, 3);
mType.set(509, 3);
mType.set(510, 3);

mType.set(6, 2);
mType.set(601, 2);
mType.set(602, 2);
mType.set(603, 2);
mType.set(604, 2);
mType.set(605, 2);
mType.set(606, 2);
mType.set(607, 2);
mType.set(608, 2);
mType.set(609, 2);
mType.set(610, 2);

// mType.set(34, 3);
// mType.set(3401, 3);
// mType.set(3402, 3);
// mType.set(3403, 3);
// mType.set(3404, 3);
// mType.set(3405, 3);
// mType.set(3406, 3);
// mType.set(3407, 3);
// mType.set(3408, 3);
// mType.set(3409, 3);

mType.set(undefined, 1);
export const useTypeStore = (type: number | undefined) => {
  return mType.get(type) ?? 1;
};

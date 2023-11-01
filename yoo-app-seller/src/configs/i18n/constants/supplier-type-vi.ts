export const PROVIDER_PURPOSE_TYPE = {
  GOODS: 1,
  BOOKING: 2,
  SERVICE: 3,
};
export interface ISupplierType {
  value: number;
  label: string;
  type?: number;
}

export const providerBusinessGroupsTypesVi = [
  {
    label: 'Cửa hàng',
    value: 2,
  },
  // {
  //   label: 'Khác',
  //   value: 4,
  // },
  {
    label: 'Sửa chữa',
    value: 5,
  },
  {
    label: 'Giải trí',
    value: 6,
  },
  {
    label: 'Việc làm',
    value: 9,
  },
  {
    label: 'Giáo dục',
    value: 10,
  },
  {
    label: 'Ẩm thực',
    value: 12,
  },
  {
    label: 'Y tế',
    value: 24,
  },
  {
    label: 'Thể thao',
    value: 25,
  },
  {
    label: 'Du lịch',
    value: 27,
  },
  {
    label: 'Giao thông',
    value: 29,
  },
  {
    label: 'Chăm sóc sức khỏe',
    value: 32,
  },
  {
    label: 'Lưu trú',
    value: 33,
  },
  {
    label: 'Làng nghề truyền thống',
    value: 34,
  },
];

export const providerBusinessTypesVi: ISupplierType[] = [
  {
    label: 'Thú cưng',
    value: 207,
  },
  {
    label: 'Cửa hàng tiện lợi',
    value: 208,
  },
  {
    label: 'Thiết bị home IOT',
    value: 212,
  },
  {
    label: 'Thực phẩm',
    value: 213,
  },
  {
    label: 'Thời trang nam',
    value: 214,
  },
  {
    label: 'Thời trang nữ',
    value: 215,
  },
  {
    label: 'Nhà cửa & Đời sống',
    value: 216,
  },
  {
    label: 'Bách hoá online',
    value: 217,
  },
  {
    label: 'Nhà sách online',
    value: 218,
  },
  {
    label: 'Balo & Túi ví',
    value: 219,
  },
  {
    label: 'Đồ chơi',
    value: 220,
  },
  {
    label: 'Thiết bị điện tử',
    value: 221,
  },
  {
    label: 'Máy tính & Laptop',
    value: 222,
  },
  {
    label: 'Giày dép nữ',
    value: 223,
  },
  {
    label: 'Giày dép nam',
    value: 224,
  },
  {
    label: 'Khác',
    value: 4,
  },
  {
    label: 'Điện tử, điện lạnh',
    value: 501,
  },
  {
    label: 'Điện nước',
    value: 502,
  },
  {
    label: 'Nội thất',
    value: 503,
  },
  {
    label: 'Cứu hộ',
    value: 504,
  },
  {
    label: 'Ô tô',
    value: 505,
  },
  {
    label: 'Giặt là',
    value: 506,
  },
  {
    label: 'Xe máy, xe đạp',
    value: 507,
  },
  {
    label: 'Điện thoại',
    value: 508,
  },
  {
    label: 'Máy tính',
    value: 509,
  },
  {
    label: 'Rạp chiều phim',
    value: 601,
  },
  {
    label: 'Rạp hát-nhà hát',
    value: 602,
  },
  {
    label: 'Phòng trà',
    value: 603,
  },
  {
    label: 'Karaoke',
    value: 604,
  },
  {
    label: 'Nhà múa rối',
    value: 605,
  },
  {
    label: 'Quán bar',
    value: 606,
  },
  {
    label: 'Quán game - quán net',
    value: 607,
  },
  {
    label: 'Trung tâm vui chơi',
    value: 608,
  },
  {
    label: 'Công viên',
    value: 609,
  },
  {
    label: 'Rạp xiếc',
    value: 610,
  },
  {
    label: 'Giúp việc',
    value: 901,
  },
  {
    label: 'Môi giới việc làm',
    value: 902,
  },
  {
    label: 'Mầm non',
    value: 1001,
  },
  {
    label: 'Tiểu học',
    value: 1002,
  },
  {
    label: 'Trung học cơ sở',
    value: 1003,
  },
  {
    label: 'Trung tâm GDTX',
    value: 1004,
  },
  {
    label: 'Trung học phổ thông',
    value: 1005,
  },
  {
    label: 'Trung cấp',
    value: 1006,
  },
  {
    label: 'Cao đẳng',
    value: 1007,
  },
  {
    label: 'Đại học',
    value: 1008,
  },
  {
    label: 'Trung tâm dạy nhạc',
    value: 1009,
  },
  {
    label: 'Trung tâm tiếng Anh',
    value: 1010,
  },
  {
    label: 'Trung tâm luyện thi THPT',
    value: 1011,
  },
  {
    label: 'Trung tâm dạy nghề',
    value: 1012,
  },
  {
    label: 'Gia sư',
    value: 1013,
  },
  {
    label: 'Nhà hàng',
    value: 1201,
  },
  {
    label: 'Quán cafe',
    value: 1202,
  },
  {
    label: 'Trung tâm tổ chức sự kiện',
    value: 1203,
  },
  {
    label: 'Ẩm thực đường phố',
    value: 1204,
  },
  {
    label: 'Nhà thuốc',
    value: 2402,
  },
  {
    label: 'Trạm y tế',
    value: 2404,
  },
  {
    label: 'Nha khoa',
    value: 2405,
  },
  {
    label: 'Y tế tại gia',
    value: 2406,
  },
  {
    label: 'Bệnh viện',
    value: 2407,
  },
  {
    label: 'Phòng khám thú y',
    value: 2408,
  },
  {
    label: 'Phòng khám tư nhân',
    value: 2409,
  },
  {
    label: 'Bóng đá',
    value: 2501,
  },
  {
    label: 'Cầu lông',
    value: 2502,
  },
  {
    label: 'Bóng rổ',
    value: 2503,
  },
  {
    label: 'Quần vợt',
    value: 2504,
  },
  {
    label: 'Bóng chuyền',
    value: 2505,
  },
  {
    label: 'Bi-a',
    value: 2506,
  },
  {
    label: 'Golf',
    value: 2507,
  },
  {
    label: 'Điểm du lịch',
    value: 2701,
  },
  {
    label: 'Di tích lịch sử',
    value: 2707,
  },
  {
    label: 'Camping',
    value: 2708,
  },
  {
    label: 'Vườn Quốc gia',
    value: 2709,
  },
  {
    label: 'Trung tâm đào tạo lái xe',
    value: 2902,
  },
  {
    label: 'Cửa hàng bán xe đạp',
    value: 2906,
  },
  {
    label: 'Thuê ô tô dịch vụ',
    value: 2907,
  },
  {
    label: 'Thuê xe đạp',
    value: 2909,
  },
  {
    label: 'Thuê xe máy',
    value: 2910,
  },
  {
    label: 'Cửa hàng bán xe máy',
    value: 2911,
  },
  {
    label: 'Showroom Otô',
    value: 2912,
  },
  {
    label: 'Điểm dừng xe buýt',
    value: 2913,
  },
  {
    label: 'Thẩm mỹ',
    value: 3201,
  },
  {
    label: 'Mỹ phẩm',
    value: 3202,
  },
  {
    label: 'Tiệm làm tóc',
    value: 3203,
  },
  {
    label: 'Nail',
    value: 3204,
  },
  {
    label: 'Spa',
    value: 3205,
  },
  {
    label: 'Homestay',
    value: 3301,
  },
  {
    label: 'Nhà trọ',
    value: 3302,
  },
  {
    label: 'Resort',
    value: 3303,
  },
  {
    label: 'Nhà nghỉ',
    value: 3304,
  },
  {
    label: 'Gỗ',
    value: 3401,
  },
  {
    label: 'Gốm sứ',
    value: 3402,
  },
  {
    label: 'Thủ công mỹ nghệ',
    value: 3403,
  },
  {
    label: 'Làng nghề mây tre đan truyền thống',
    value: 3404,
  },
  {
    label: 'Làng nghề sơn mài truyền thống',
    value: 3405,
  },
  {
    label: 'Làng nghề chằm nón truyền thống',
    value: 3406,
  },
  {
    label: 'Làng nghề đúc khuôn truyền thống',
    value: 3407,
  },
  {
    label: 'Làng nghề tơ lụa truyền thống',
    value: 3408,
  },
  {
    label: 'Làng nghề làm tranh dân gian truyền thống',
    value: 3409,
  },
];

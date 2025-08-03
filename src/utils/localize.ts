const messages: Record<string, Record<string, string>> = {
  vi: {
    SUCCESS: 'Thành công',
    ERROR: 'Lỗi xảy ra',
    UNAUTHORIZED: 'Bạn chưa đăng nhập',
    NOT_FOUND: 'Không tìm thấy dữ liệu',
    // thêm các key khác tại đây
  },
  en: {
    SUCCESS: 'Success',
    ERROR: 'An error occurred',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Data not found',
    // thêm các key khác tại đây
  },
};

export function getMessage(key: string, lang: string = 'vi'): string {
  const language = messages[lang] || messages.vi;
  return language[key] || key;
}

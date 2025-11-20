import { Step } from './types';

export const STEPS: Step[] = [
  { id: 1, title: "Thừa nhận rằng đang có vấn đề", shortDesc: "Nhận diện rõ ràng hiệu suất kém và tác động của nó.", color: "border-cyan-500" },
  { id: 2, title: "Ngồi lại nói chuyện thẳng thắn", shortDesc: "Tổ chức một buổi gặp riêng tư, cởi mở để thảo luận.", color: "border-cyan-600" },
  { id: 3, title: "Nhắc lại tiêu chuẩn công việc", shortDesc: "Làm rõ lại các KPI, yêu cầu và kỳ vọng của vai trò.", color: "border-teal-500" },
  { id: 4, title: "Điều chỉnh lại kỳ vọng hai bên", shortDesc: "Thống nhất lại mục tiêu khả thi trong ngắn hạn.", color: "border-teal-600" },
  { id: 5, title: "Cùng lập kế hoạch cải thiện", shortDesc: "Xây dựng PIP (Performance Improvement Plan) cụ thể.", color: "border-indigo-500" },
  { id: 6, title: "Theo dõi thường xuyên", shortDesc: "Kiểm tra tiến độ định kỳ (hàng tuần/hàng ngày).", color: "border-indigo-600" },
  { id: 7, title: "Ghi nhận từng tiến bộ nhỏ", shortDesc: "Động viên kịp thời để tạo động lực tích cực.", color: "border-amber-500" },
  { id: 8, title: "Coaching 1:1 khi cần", shortDesc: "Hướng dẫn trực tiếp, cầm tay chỉ việc nếu cần thiết.", color: "border-amber-600" },
  { id: 9, title: "Góp ý thẳng thắn nhưng tôn trọng", shortDesc: "Phản hồi mang tính xây dựng, không công kích cá nhân.", color: "border-purple-500" },
  { id: 10, title: "Ghi chép lại toàn bộ quá trình", shortDesc: "Lưu giữ biên bản họp, email để làm bằng chứng.", color: "border-purple-600" },
  { id: 11, title: "Ra quyết định nếu vẫn không cải thiện", shortDesc: "Cân nhắc các biện pháp kỷ luật hoặc thay đổi.", color: "border-blue-600" },
  { id: 12, title: "Khuyến khích cân bằng cuộc sống", shortDesc: "Tìm hiểu xem vấn đề cá nhân có ảnh hưởng công việc không.", color: "border-blue-700" },
  { id: 13, title: "Cân nhắc điều chỉnh mô tả công việc", shortDesc: "Thay đổi phạm vi công việc cho phù hợp năng lực hiện tại.", color: "border-indigo-700" },
  { id: 14, title: "Xem xét lại mức độ phù hợp vai trò", shortDesc: "Có thể họ giỏi nhưng đang ngồi sai vị trí?", color: "border-orange-500" },
  { id: 15, title: "Gợi ý các chương trình hỗ trợ (EAP)", shortDesc: "Hỗ trợ tâm lý, sức khỏe hoặc đào tạo bổ sung.", color: "border-orange-600" },
];

export const DEFAULT_SYSTEM_INSTRUCTION = `Bạn là một chuyên gia nhân sự (HR Expert) và quản lý cấp cao với 20 năm kinh nghiệm. 
Nhiệm vụ của bạn là hỗ trợ người quản lý giải quyết vấn đề với nhân viên kém hiệu quả theo quy trình 15 bước.
Hãy đưa ra lời khuyên ngắn gọn, súc tích, thiết thực. 
Nếu cần thiết, hãy đề xuất mẫu câu hội thoại (kịch bản nói chuyện) hoặc mẫu email.
Luôn giữ thái độ chuyên nghiệp, nhân văn nhưng kiên quyết hướng tới hiệu quả công việc.
Trả lời bằng Tiếng Việt.`;

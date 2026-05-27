<p align="center">
  <a href="../../SECURITY.md">English</a> |
  <a href="SECURITY.zh-CN.md">简体中文</a> |
  <a href="SECURITY.ja-JP.md">日本語</a> |
  <a href="SECURITY.ko-KR.md">한국어</a> |
  <strong>Tiếng Việt</strong> |
  <a href="SECURITY.pt-BR.md">Portugues</a>
</p>

# Chính sách Bảo mật

## Phiên bản được hỗ trợ

| Phiên bản | Được hỗ trợ |
|---------|-----------|
| Release mới nhất | Có |
| Phiên bản cũ hơn | Không |

## Báo cáo lỗ hổng bảo mật

**KHÔNG mở public issue cho các lỗ hổng bảo mật.**

Thay vào đó, dùng GitHub Security Advisories để báo cáo lỗ hổng một cách riêng tư:

[Báo cáo lỗ hổng](https://github.com/withkynam/vibecode-pro-max-kit/security/advisories/new)

> **Lưu ý:** Private Vulnerability Reporting phải được bật trong repository settings thì nút "Report a vulnerability" mới hiện.

### Timeline phản hồi

- **48 giờ** xác nhận đã nhận báo cáo của bạn
- **7 ngày** đánh giá ban đầu và phân loại severity
- Chúng tôi sẽ cập nhật tiến độ cho bạn xuyên suốt quá trình

## Phạm vi

### Trong phạm vi

- **Hook scripts** (`privacy-block.cjs`, `scout-block.cjs`) — lỗ hổng bypass cho phép agents truy cập tài nguyên bị chặn
- **install.sh** — supply chain attacks, command injection, hoặc path traversal
- **Agent prompts** — prompt injection bypass phase-locking hoặc tool restrictions
- **Privacy leaks** — agent truy cập credentials, API keys, hoặc sensitive files bất chấp guardrails
- **System-reminder / subagent-init injection** — context injection attacks thao túng hành vi agent

### Ngoài phạm vi

- Lỗ hổng trong chính Claude Code hoặc Codex (báo cho Anthropic hoặc OpenAI tương ứng)
- Vấn đề trong user project code (không phải harness)
- Social engineering attacks nhắm vào maintainers

## Timeline công bố

- Chúng tôi hướng đến việc fix các lỗ hổng đã xác nhận trong **30 ngày**
- Coordinated disclosure sau khi bản fix được release
- Credit cho người báo cáo trong release notes (trừ khi bạn muốn ẩn danh)

## Safe Harbor

Chúng tôi coi security research được thực hiện với thiện chí là được ủy quyền. Chúng tôi sẽ không thực hiện hành động pháp lý đối với researchers hành động thiện chí và tuân thủ chính sách này.

Nếu bạn không chắc liệu research của mình có đủ điều kiện không, hãy liên hệ trước khi test — chúng tôi sẵn lòng làm rõ phạm vi.

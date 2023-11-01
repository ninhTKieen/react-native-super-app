# IMAX_SUPPLIER

## Code convention

1. Cài extension `ESLint`
2. Các block code nên cách dòng
3. Trước khi commit, kiểm tra format code và lint:
   ```bash
   $ yarn format
   $ yarn lint
   ```
4. Trước khi commit, kiểm tra và loại bỏ những dòng `log` không cần thiết
5. Import file bằng absolute path đã config (root path sẽ là `src/...`, `assets/...`)
6. Thống nhất cách đặt tên `folder`, tên `file`, viết chữ thường (`under_score`) hoặc chữ hoa (`PascalCase`), tránh lẫn lộn giữa cách đặt tên file-folder và tên biến.

   > Ví dụ folder `loginScreen` -> `LoginScreen` hoặc `login_screen` hay `login-screen`.

7. Đặt tên biến, hàm theo kiểu `camelCase`, tránh dùng `PascalCase` bừa bãi. Những biến kiểu `constant` thì `UPPERCASE` hết. (Ngoại trừ tên các `component` thì viết hoàn toàn kiểu `PascalCase`).

8. Nếu không chắc chắn, nên cài thêm extension để check spell (chính tả) của những từ tiếng anh, tránh sai chính tả, cũng rất khó để debug.

9. Uninstall những thư viện không dùng ngay (sau khi thử 1 vài thư viện), tránh app phình to về sau.

## Commit convention

### Commit message header

```
<type>: <short summary>
```

`The <type> and <summary> fields are mandatory.`

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
- **chore**: add something without touching production code (Eg: update npm dependencies)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Reverts a previous commit
- **style**: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
  > Note: If your commit is not user-facing, you can use `chore` instead of `fix` or `feat`.

> Example: `chore: update dependencies`

`scope` là _optional_, phạm vi ảnh hưởng của commit hiện tại

`subject` là nội dung của commit

### Revert commits

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.

The content of the commit message body should contain:

- information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`,
- a clear description of the reason for reverting the commit message.

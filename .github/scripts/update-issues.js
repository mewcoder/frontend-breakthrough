const fs = require("fs");
const path = require("path");
const github = require("@actions/github");
const core = require("@actions/core");

async function updateReadmeWithIssues() {
  try {
    // 获取GitHub token和仓库信息
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.REPO || github.context.repo;
    const octokit = github.getOctokit(token);

    // 解析仓库信息
    const [owner, repoName] =
      typeof repo === "string" ? repo.split("/") : [repo.owner, repo.repo];

    core.info(`Fetching issues for ${owner}/${repoName}...`);

    // 获取issue列表（只获取open状态的issue，正序排列）
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo: repoName,
      state: "open",
      per_page: 100, // 获取最多100个issue
      sort: "created",
      direction: "asc", // 改为正序排列，最旧的在前面
    });

    // 筛选作者为mewcoder的issue
    const filteredIssues = issues.filter(
      (issue) => issue.user && issue.user.login === "mewcoder"
    );
    core.info(`Found ${filteredIssues.length} issues by mewcoder`);

    // 获取文件路径
    const readmeBasePath = path.join(process.cwd(), "README_BASE.md");
    const readmePath = path.join(process.cwd(), "README.md");

    // 初始化README内容
    let readmeContent = "";

    try {
      readmeContent = fs.readFileSync(readmeBasePath, "utf8");
      core.info("Successfully read README_BASE.md");
    } catch (error) {
      core.info("README_BASE.md not found or cannot be read, using default content");
      readmeContent = "# 前端破局之道\n\n> 本知识库文章使用 Issues 编写和管理，使用 Action 自动拉取到 README.md 文件中。\n";
    }

    // 获取当前日期，格式化为"-2025.11.14"的形式
    const currentDate = new Date();
    const dateString = `-${currentDate.getFullYear()}.${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

    // 生成issue列表的Markdown内容
    const issuesMarkdown =
      filteredIssues.length > 0
        ? filteredIssues
            .map(
              (issue) => `- [${issue.title}${dateString}](${issue.html_url})`
            )
            .join("\n")
        : "- No issues by mewcoder";

    // 定义issue列表的标记
    const issuesHeader = "## 文章列表";
    const issuesSection = `${issuesHeader}\n\n${issuesMarkdown}\n`;

    // 更新README内容
    let updatedContent = "";

    // 定义正则表达式来匹配现有的issue部分
    const issuesHeaderRegex = new RegExp(
      `${issuesHeader}[\\s\\S]*?(?=^##|$)`,
      "m"
    );

    if (issuesHeaderRegex.test(readmeContent)) {
      // 如果已存在issue部分，更新它
      updatedContent = readmeContent.replace(issuesHeaderRegex, issuesSection);
    } else {
      // 否则，添加到末尾
      updatedContent =
        readmeContent +
        (readmeContent.endsWith("\n") ? "" : "\n") +
        "\n" +
        issuesSection;
    }

    // 写回README.md
    fs.writeFileSync(readmePath, updatedContent, "utf8");
    core.info("README.md updated successfully");
  } catch (error) {
    core.setFailed(`Error updating README with issues: ${error.message}`);
    throw error;
  }
}

// 执行更新
updateReadmeWithIssues();
